import { NextResponse } from "next/server";

export async function POST(req) {


  return NextResponse.json({
    transcript:
      "The team discussed project progress, deadlines, and upcoming tasks. The frontend is nearly complete and the demo is scheduled.",
  });
}
