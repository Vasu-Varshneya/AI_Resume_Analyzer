"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Upload from "./Upload";
import { AppleCarousel } from "./Carousel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function ResumeAnalyzer() {
  const [isUploadOpen, setIsUploadOpen] = useState(true);
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 flex flex-col items-center">
      {/* Floating Header */}
      <Link
        href="/"
        className="text-3xl absolute left-4 top-4 font-serif hover:text-4xl hover:font-bold transition-all"
      >
        ResumeAI
      </Link>

      {/* Upload Modal */}
      <Upload
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        setAnalysisData={setAnalysisData}
      />

      {/* Upload Resume Button */}
      {!isUploadOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsUploadOpen(true)}
          className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold shadow-lg backdrop-blur-md"
        >
          Upload Resume
        </motion.button>
      )}

      {/* Carousel Before Upload */}
      {!analysisData && <AppleCarousel />}

      {/* Analysis Result Section */}
      <AnimatePresence>
        {analysisData && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full max-w-4xl mt-10 relative"
          >
            <Card className="relative bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-6 text-white">
              {/* Glowing animated background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10 pointer-events-none animate-pulse" />

              <CardHeader className="relative z-10">
                <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent">
                  📑 AI Resume Analysis
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 space-y-8">
                {/* ATS Score */}
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-blue-400">
                    {analysisData.atsScore}/100
                  </div>
                  <p className="text-sm text-gray-300 mt-1">
                    Applicant Tracking System (ATS) Score
                  </p>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
                    <h3 className="text-lg font-semibold text-green-300 mb-2">✅ Strengths</h3>
                    {analysisData.strengths.length > 0 ? (
                      <ul className="list-disc ml-5 space-y-1 text-green-100 text-sm">
                        {analysisData.strengths.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-green-100 text-sm">No strengths found.</p>
                    )}
                  </div>

                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                    <h3 className="text-lg font-semibold text-red-300 mb-2">⚠️ Weaknesses</h3>
                    {analysisData.weaknesses.length > 0 ? (
                      <ul className="list-disc ml-5 space-y-1 text-red-100 text-sm">
                        {analysisData.weaknesses.map((w, i) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-red-100 text-sm">No weaknesses found.</p>
                    )}
                  </div>
                </div>

                {/* Suggestions */}
                <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                  <h3 className="text-lg font-semibold text-yellow-300 mb-2">💡 Suggestions</h3>
                  {analysisData.suggestions.length > 0 ? (
                    <ul className="list-disc ml-5 space-y-1 text-yellow-100 text-sm">
                      {analysisData.suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-yellow-100 text-sm">No suggestions found.</p>
                  )}
                </div>

                {/* Carousel at bottom */}
                <div className="pt-4">
                  <AppleCarousel />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
