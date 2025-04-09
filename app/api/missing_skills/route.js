import { NextResponse } from "next/server";

async function skills(resumeText, company, jobTitle) {
    if (!resumeText || !company || !jobTitle) {
        throw new Error("Missing required fields: resumeText, company, or jobTitle");
    }
    const prompt = `Analyze this resume and return missing skills (that are not in the resume) based on the job title: ${jobTitle} and company: ${company}. You must also provide learning resources for each skill.

    ### **Strict Formatting Rules (Follow Exactly):**
    1 **Provide at least 10 missing skills.**  
    2 **Format the output exactly as follows (without extra text or explanation):**
    
    Missing skills:
    1. Skill_Name1: (<paste her the link1>, <paste here the  link 2>)
    2. Skill_Name2: (<paste her the link1>, <paste here the  link 2>)
    ...
    10. Skill_Name10: (<paste her the link1>, <paste here the  link 2>)
    
    ### **Important Instructions:**
    - Ensure the links are of working websites and doesnt give 404 errors and relevant to the missing skills, if you cant find 2 links for a resource you can add only one for it.
    - Return answer in a roadmap order,such that skill A need to be learnt first before skill B, but if there isnt any co-relation between them you may return in any order possible
    - Do NOT add extra text, explanations, or descriptions.
    - Do NOT repeat "https://" twice in the links.
    - Do NOT add skill variations in parentheses (e.g., avoid "https://Git or Mercurial").
    - Do NOT output bold or formatted text.
    - Ensure proper JSON-friendly structure.
    - Do NOT include any unnecessary bullet points or list formats.
    - The response must be **structured, clean, and formatted exactly as instructed.**
    
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

        const data = await skills(resumetext, company, jobTitle);

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        console.error("🔴 Error in API:", err);
        return NextResponse.json({ message: "Not able to generate the skills matcher." }, { status: 500 });
    }
}

