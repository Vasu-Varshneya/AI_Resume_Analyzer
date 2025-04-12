"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClipboardCopy, Sparkles } from "lucide-react";
import CoverLetterGenerator from "./CoverLetter";
import { AppleCarousel } from "./Carousel";

const Page = () => {
  const [coverLetter, setCoverLetter] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCoverLetterGenerated = (data) => {
    console.log("📜 Received Cover Letter Data:", data);
    if (data) {
      setCoverLetter(data);
      setIsOpen(false);
    } else {
      console.error("⚠️ Cover letter not found in response.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
    alert("✅ Cover letter copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 flex flex-col items-center">
      {/* Header */}
      <Link
        href="/"
        className="absolute top-6 left-6 text-2xl font-serif text-white hover:text-4xl hover:text-green-400 transition"
      >
        ResumeAI
      </Link>

      <Card className="bg-gradient-to-r from-green-500 via-emerald-600 to-teal-500 text-white shadow-xl max-w-3xl w-full mb-8">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
            <Sparkles size={28} />
            AI-Powered Cover Letter Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-md text-gray-100">
          Instantly generate job-ready cover letters with AI tailored to your resume & job description.
        </CardContent>
      </Card>

      {/* Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:scale-105 transition"
      >
        Generate Cover Letter
      </Button>

      {/* Hide Carousel if Cover Letter is Rendered */}
      {!coverLetter && <AppleCarousel />}

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white text-black max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Resume & Generate Cover Letter</DialogTitle>
          </DialogHeader>
          <CoverLetterGenerator
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            setAnalysisData={handleCoverLetterGenerated}
          />
        </DialogContent>
      </Dialog>

      {/* Result Display */}
      <AnimatePresence>
        {coverLetter && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl mt-10 relative"
          >
            <Card className="relative bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-6 overflow-hidden">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/10 via-blue-400/10 to-purple-400/10 pointer-events-none animate-pulse" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                  ✍️ Your AI-Generated Cover Letter
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <pre className="whitespace-pre-wrap text-sm text-gray-100 font-mono leading-relaxed">
                  {coverLetter}
                </pre>
              </CardContent>

              {/* Copy Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white z-20"
                    onClick={copyToClipboard}
                  >
                    <ClipboardCopy size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy Cover Letter</TooltipContent>
              </Tooltip>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;

