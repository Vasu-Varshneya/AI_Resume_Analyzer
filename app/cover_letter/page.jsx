"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCopy } from "lucide-react";
import CoverLetterGenerator from "./CoverLetter";
import { AppleCarousel } from "./Carousel";
const Page = () => {
    const [coverLetter, setCoverLetter] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleCoverLetterGenerated = (data) => {
        console.log("📜 Received Cover Letter Data:", data);

        if (data) {
            setCoverLetter(data); // Ensure only text is set
            setIsOpen(false); // Close modal when cover letter is ready
        } else {
            console.error("⚠️ Cover letter not found in response.");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(coverLetter);
        alert("✅ Cover letter copied to clipboard!");
    };

    return (
        <div className="flex flex-col items-center bg-black min-h-screen p-6">
            <h1 className="text-3xl font-bold text-green-500 mb-6 text-center">
                AI-Powered Cover Letter Generator
            </h1>

            {/* Open Cover Letter Generator Modal */}
            <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
                Generate Cover Letter
            </button>

            {/* Cover Letter Generator Modal */}
            <CoverLetterGenerator
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                setAnalysisData={handleCoverLetterGenerated}
            />
            <AppleCarousel/>
            {/* Display Generated Cover Letter */}
            <AnimatePresence>
                {coverLetter && (
                    <motion.div
                        className="mt-6 p-6 bg-white shadow-md rounded-lg w-full max-w-2xl relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                            Your Generated Cover Letter
                        </h2>
                        <div className="whitespace-pre-wrap text-gray-600 leading-relaxed border-l-4 border-blue-500 pl-4">
                            {coverLetter}
                        </div>

                        {/* Copy Button */}
                        <button
                            onClick={copyToClipboard}
                            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                        >
                            <ClipboardCopy size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Page;
