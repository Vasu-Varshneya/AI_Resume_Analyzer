"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authcontext";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // icon library for hamburger

const Navbar = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handlecover = () => router.push('./cover_letter');
  const handlemissing = () => router.push('./missing_skills');

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-black text-white w-full">
      <div className="flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-3xl font-serif hover:text-4xl hover:font-bold">
          ResumeAI
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          {!user ? (
            <>
              <button onClick={() => router.push("/signup")} className={styles.primaryButton}>
                Analyse Your Resume
              </button>
              <button className={styles.secondaryButton}>About</button>
              <Link href="/login" className={styles.primaryButton}>
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button className={styles.primaryButton} onClick={handlemissing}>Missing Skills</button>
              <button className={styles.primaryButton} onClick={handlecover}>Generate Cover Letter</button>
              <button onClick={handleSignOut} className={styles.secondaryButton}>
                Sign Out
              </button>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-start px-6 pb-4 gap-2">
          {!user ? (
            <>
              <button onClick={() => { router.push("/login"); setIsOpen(false); }} className={styles.primaryButton}>
                Analyse Your Resume
              </button>
              <button className={styles.secondaryButton}>About</button>
              <Link href="/login" className={styles.primaryButton} onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button className={styles.primaryButton} onClick={() => { handlemissing(); setIsOpen(false); }}>
                Missing Skills
              </button>
              <button className={styles.primaryButton} onClick={() => { handlecover(); setIsOpen(false); }}>
                Generate Cover Letter
              </button>
              <button onClick={() => { handleSignOut(); setIsOpen(false); }} className={styles.secondaryButton}>
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
