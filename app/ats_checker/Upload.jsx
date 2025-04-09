'use client';
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import { useAuth } from "../context/authcontext";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";

const Upload = ({ isOpen, onClose, setAnalysisData }) => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
    noClick: true,
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const extractTextFromPDF = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = async (event) => {
        try {
          const pdfData = new Uint8Array(event.target.result);
          const pdfDoc = await pdfjs.getDocument({ data: pdfData }).promise;

          let extractedText = "";
          for (let i = 1; i <= pdfDoc.numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const textContent = await page.getTextContent();
            extractedText += textContent.items.map((item) => item.str).join(" ") + "\n";
          }

          resolve(extractedText.trim());
        } catch (error) {
          console.error("Error extracting text:", error);
          reject("Failed to extract text.");
        }
      };
    });
  };

  const handleExtractText = async () => {
    if (!user) {
      setError("You must be logged in to analyze resumes.");
      return;
    }
    if (!file || file.size === 0) {
      setError("Invalid file. Please upload a valid PDF file.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const text = await extractTextFromPDF(file);
      console.log("Extracted Text:", text.slice(0, 100)); // Log first 100 characters

      // Send the text to the API
      const response = await fetch("/api/ats_check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: text }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Analysis failed");

      console.log("AI Analysis Result:", result);

      // Close modal instantly
      onClose();

      // Pass result to parent component
      setAnalysisData(result);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to analyze text. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-xl w-96 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">Upload Your Resume</h2>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-gray-700">Drop the PDF file here...</p>
              ) : file ? (
                <p className="text-blue-600 font-medium">{file.name}</p>
              ) : (
                <p className="text-gray-700">
                  Drag & drop your PDF here, or {" "}
                  <span
                    className="text-blue-500 font-medium cursor-pointer underline"
                    onClick={open}
                  >
                    browse files
                  </span>
                </p>
              )}
            </div>

            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

            <div className="flex justify-between mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Close
              </button>
              <button
                onClick={handleExtractText}
                disabled={!file || isProcessing}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
              >
                {isProcessing ? "Processing..." : "Extract & Analyze"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Upload;
