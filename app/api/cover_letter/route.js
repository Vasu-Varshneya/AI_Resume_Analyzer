import { NextResponse } from "next/server";

async function cover(resumeText, company, jobTitle) {
    if (!resumeText || !company || !jobTitle) {
        throw new Error("Missing required fields: resumeText, company, or jobTitle");
    }

    const prompt = `Based on the following resume, create a professional cover letter for a ${jobTitle} position at ${company}. 
    Make it engaging, highlight relevant experience, and keep it under 400 words.
    
    Resume content:
    ${resumeText}`;

    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    try {
        console.log("🔹 Sending prompt to Gemini API...");
        
        const response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Gemini API Error:", errorData);
            throw new Error("Failed to generate cover letter from Gemini API");
        }

        const data = await response.json();
        console.log("🔹 Gemini API Response:", JSON.stringify(data, null, 2));

        // Extract the actual cover letter text
        const coverLetterText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate cover letter.";

        return { coverLetter: coverLetterText };
    } catch (error) {
        console.error("Error generating cover letter:", error);
        throw error;
    }
}

export async function POST(req) {
    try {
        const requestData = await req.json();
        console.log("🔹 Received request data:", requestData);

        const { resumetext, company, jobTitle } = requestData;

        if (!resumetext || !company || !jobTitle) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const data = await cover(resumetext, company, jobTitle);

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        console.error("🔴 Error in API:", err);
        return NextResponse.json({ message: "Not able to generate the cover letter." }, { status: 500 });
    }
}

