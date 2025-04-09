import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { resumeText } = body;

    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 });
    }

    // Define prompts
    const prompt1 = `You have to behave as an ats score checker and rate this resume out of 100. 
        return only in this format:(Dont give text in bold or italics)
        score_here/100
        Resume content:
        ${resumeText}`;

    const prompt2 = `Analyze this resume and based on it give suggestions on how one can improve it (make sure that I have given you text only, so don't give suggestions on the structure and format because you can't see it).(Dont give text in bold or italics)
        
        Give in this format:
        Suggestions(give 5):
        (space)
        1. ..
        2. ..
        so on
        
        Resume content:
        ${resumeText}`;

    // Gemini API URL
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    // Fetch responses concurrently
    const [response1, response2] = await Promise.all([
      fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt1 }] }] }),
      }),
      fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt2 }] }] }),
      }),
    ]);

    // Check for API errors
    if (!response1.ok || !response2.ok) {
      const errorData1 = await response1.text();
      const errorData2 = await response2.text();
      console.error("Gemini API Error Response 1:", errorData1);
      console.error("Gemini API Error Response 2:", errorData2);
      throw new Error("Failed to generate content from Gemini API");
    }

    // Parse API responses
    const data1 = await response1.json();
    const data2 = await response2.json();

    // Extract ATS Score
    const atsScoreText = data1?.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No ATS score received";
    const atsScoreMatch = atsScoreText.match(/(\d+)\/100/);
    const atsScore = atsScoreMatch ? parseInt(atsScoreMatch[1]) : 0;

    // Extract Suggestions
    const suggestionsText = data2?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const suggestionsArray = suggestionsText
      .split(/\d+\.\s+/) // Splits based on "1. ", "2. ", etc.
      .slice(1) // Removes empty first element
      .map((s) => s.trim())
      .filter(Boolean); // Remove empty suggestions

    // Placeholder for Strengths & Weaknesses (Needs another API call if required)
    const strengths = ["Well-structured content", "Relevant keywords present"]; 
    const weaknesses = ["Lack of quantifiable achievements", "No industry-specific jargon"];

    // Send formatted response
    return NextResponse.json({
      atsScore,
      strengths,
      weaknesses,
      suggestions: suggestionsArray,
    });

  } catch (error) {
    console.error("Resume analysis error:", error);
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}
