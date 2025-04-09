"use client";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TypingEffect from "../typingeffect/TypingEffect";
import styles from "./Hero.module.css";
export default function Home() {
  const canvasRef = useRef(null);
  const router = useRouter();
  const [isModal, setisModal] = useState(false);
  const switchpage = ()=>{
    router.push('/ats_checker')
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const particles = [];
    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
      const colors = ["#ffffff", "#f0f0f0", "#a855f7", "#b0b0b0", "#ec4899"];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };
    createParticles();

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );
        gradient.addColorStop(0, particle.color.replace(")", ", 0.3)"));
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(")", `, ${particle.opacity})`);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();
    

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <canvas ref={canvasRef} className={styles.particleCanvas} />
        <div className={styles.content}>
          <h1 className={styles.title}>
            <TypingEffect text="Unlock Your Resume's Full Potential with AI-Powered Insights!" />
            <br />
            <span className={styles.gradient}>
              ATS scores for improvements.
            </span>
            <span className={styles.gradient2}>Analyse,Improve and Repeat!</span>
          </h1>
          <p className={styles.description}>
            Get insights into the resume by getting missing skills,ats-score and cover-letter.
          </p>
          <div className={styles.buttons}>
            <button
              onClick={switchpage}
              className={styles.primaryButton}
            >
             <span>Check the ATS score</span> 
              
            </button>
            <button className={styles.secondaryButton}>Learn More</button>
          </div>
        </div>
      </main>
    </div>
  );
}

