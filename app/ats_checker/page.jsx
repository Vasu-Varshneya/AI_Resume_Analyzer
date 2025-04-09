"use client";
import { useState } from "react";
import Upload from "./Upload";
import { motion } from "framer-motion";
import { AppleCarousel } from "./Carousel";
export default function ResumeAnalyzer() {
  const [isUploadOpen, setIsUploadOpen] = useState(true);
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      {/* Upload Component */}
      <Upload
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        setAnalysisData={setAnalysisData}
      />
      
      {/* Display Analysis Results */}
      {analysisData && (
        <motion.div
          className="mt-6 p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            📑 AI Resume Analysis
          </h2>

          {/* ATS Score */}
          <div className="flex flex-col items-center mb-6">
            <div className="text-3xl font-bold text-blue-700">
              {analysisData.atsScore}/100
            </div>
            <p className="text-gray-600 text-sm">Applicant Tracking System (ATS) Score</p>
          </div>
        
          {/* Strengths & Weaknesses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-4 bg-green-100 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700">✅ Strengths</h3>
              {analysisData.strengths.length > 0 ? (
                <ul className="list-disc ml-5 text-gray-700">
                  {analysisData.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No strengths found</p>
              )}
            </div>
            
            {/* Weaknesses */}
            <div className="p-4 bg-red-100 rounded-lg">
              <h3 className="text-lg font-semibold text-red-700">⚠️ Weaknesses</h3>
              {analysisData.weaknesses.length > 0 ? (
                <ul className="list-disc ml-5 text-gray-700">
                  {analysisData.weaknesses.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No weaknesses found</p>
              )}
            </div>
          </div>

          {/* Suggestions */}
          <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-700">💡 Suggestions</h3>
            {analysisData.suggestions.length > 0 ? (
              <ul className="list-disc ml-5 text-gray-700">
                {analysisData.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No suggestions found</p>
            )}
            <AppleCarousel/>
          </div>
        </motion.div>
      )}
    </div>
  );
}
