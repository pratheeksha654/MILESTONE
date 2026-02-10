export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to handle the API call with a retry
async function generateWithRetry(model, prompt, retries = 2) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    if (retries > 0 && error.message?.includes("429")) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s
      return generateWithRetry(model, prompt, retries - 1);
    }
    throw error;
  }
}

export async function POST(req) {
  try {
    const { title, transcript } = await req.json();

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json({ result: "Transcript is empty" }, { status: 400 });
    }

    // UPDATED FOR FEB 2026: gemini-2.5-flash-lite is the free workhorse
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite", 
    });

    const prompt = `Summarize this meeting: "${title || 'Meeting'}"\n\nTranscript:\n${transcript}\n\nProvide a summary and action items.`;

    const text = await generateWithRetry(model, prompt);

    return NextResponse.json({ result: text });

  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      { result: "API Error: " + (error.status === 404 ? "Model Retired - Use 2.5-flash-lite" : error.message) },
      { status: 500 }
    );
  }
}