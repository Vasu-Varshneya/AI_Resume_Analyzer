"use client";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClipboardCopy, Sparkles } from "lucide-react";
import Skills from "./Skills";
import { InfiniteMovingCardsDemo } from "./infinite_cards";

const Page = () => {
    const [skills, setSkills] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSkills = (data) => {
        console.log("📜 Received Skill Data:", data);
        if (data) {
            setSkills(data);
            setIsOpen(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(skills);
        alert("✅ Skills copied to clipboard!");
    };

    return (
        <div className="min-h-screen bg-black text-white px-4 py-10 flex flex-col items-center">
            <Link href="/" className="text-3xl absolute left-0 font-serif hover:text-4xl hover:font-bold">
                ResumeAI
            </Link>
            <Card className="bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white shadow-xl max-w-3xl w-full mb-8">
                <CardHeader>
                    <CardTitle className="text-center text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
                        <Sparkles size={28} />
                        AI-Powered Skills Matcher
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-md text-gray-200">
                    Generate job-matching skills using AI to upgrade your resume & beat ATS bots.
                </CardContent>
            </Card>

            <Button
                onClick={() => setIsOpen(true)}
                className="mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:scale-105 transition"
            >
                Generate Skills Matcher
            </Button>

            {/* Hide Infinite Cards When Skills Are Displayed */}
            {!skills && <InfiniteMovingCardsDemo />}

            {/* Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="bg-white text-black max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Upload Resume & Generate Matching Skills</DialogTitle>
                    </DialogHeader>
                    <Skills
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        setAnalysisData={handleSkills}
                    />
                </DialogContent>
            </Dialog>

            {/* Fancy Skills Card */}
            <AnimatePresence>
                {skills && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="w-full max-w-3xl mt-10 relative"
                    >
                        <Card className="relative bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-6 overflow-hidden">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none animate-pulse" />
                            <CardHeader className="relative z-10">
                                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                                    🎯 Matched Skills
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <pre className="whitespace-pre-wrap text-sm text-gray-100 font-mono leading-relaxed">
                                    {skills}
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
                                <TooltipContent>Copy Skills</TooltipContent>
                            </Tooltip>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Page;
