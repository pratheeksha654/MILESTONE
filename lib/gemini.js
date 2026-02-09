
import { GoogleGenerativeAI } from '@google/generative-ai';


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export async function generateMeetingSummary(transcript) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are an AI assistant specialized in analyzing meeting transcripts. 
Analyze the following meeting transcript and provide:

1. **Summary**: A concise 2-3 paragraph summary of the meeting
2. **Key Points**: 5-7 main discussion points (as bullet points)
3. **Action Items**: Specific tasks and decisions with assignees if mentioned (as bullet points)
4. **Participants**: List of people mentioned (if any)

Format your response as JSON with this structure:
{
  "summary": "...",
  "keyPoints": ["point 1", "point 2", ...],
  "actionItems": ["action 1", "action 2", ...],
  "participants": ["person 1", "person 2", ...]
}

Meeting Transcript:
${transcript}
`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
  
    let jsonText = text;
    if (text.includes('```json')) {
      jsonText = text.split('```json')[1].split('```')[0].trim();
    } else if (text.includes('```')) {
      jsonText = text.split('```')[1].split('```')[0].trim();
    }
    
    const aiData = JSON.parse(jsonText);
    
    return {
      success: true,
      data: aiData
    };
  } catch (error) {
    console.error('Gemini AI Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}


export async function transcribeAudioWithGemini(audioData) {
  try {
 
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = "Please transcribe this audio file accurately. Provide the complete transcript.";

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: audioData.mimeType,
          data: audioData.base64Data
        }
      }
    ]);

    const response = await result.response;
    const transcript = response.text();

    return {
      success: true,
      transcript: transcript
    };
  } catch (error) {
    console.error('Gemini Audio Transcription Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}


export function getWebSpeechAPICode() {
  return `
// Client-side transcription using Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  console.error('Speech Recognition not supported');
  return;
}

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

let finalTranscript = '';

recognition.onresult = (event) => {
  let interimTranscript = '';
  
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript + ' ';
    } else {
      interimTranscript += transcript;
    }
  }
  
  // Update UI with transcripts
  console.log('Final:', finalTranscript);
  console.log('Interim:', interimTranscript);
};

// Start transcription
recognition.start();
`;
}
