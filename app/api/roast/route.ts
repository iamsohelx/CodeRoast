import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { code, spiciness } = await req.json();

    if (!code) {
      return NextResponse.json(
        { error: "Code is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      generationConfig: { responseMimeType: "application/json" }
    });

    let toneInstruction = "";
    if (spiciness === "junior") {
      toneInstruction = "Tone: Gentle, encouraging, like a kind mentor. Use small words. Don't be mean.";
    } else if (spiciness === "senior") {
      toneInstruction = "Tone: Strict, professional but annoyed. Point out bad practices clearly. No mercy for incompetence.";
    } else {
      toneInstruction = "Tone: SAVAGE. ROAST THEM. Be sarcastic, mean, and funny. channeled Linus Torvalds. Make them regret becoming a developer.";
    }

    const prompt = `
      Role: You are a elite software architect evaluating code.
      Task: Review the following code snippet.
      ${toneInstruction}

      Your output MUST be valid JSON with this exact schema:
      {
        "roast": "The critique/insult string",
        "fix": "The corrected code block in Markdown format",
        "pain_score": integer (1-10)
      }

      Code to review:
      ${code}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up markdown code blocks if Gemini wraps the JSON
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      const jsonResponse = JSON.parse(cleanText);
      return NextResponse.json(jsonResponse);
    } catch (e) {
      console.error("Failed to parse Gemini response:", text);
      return NextResponse.json(
        { error: "AI response was not valid JSON", raw: text },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
