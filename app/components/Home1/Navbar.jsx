"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authcontext"; // Import authentication context

const Navbar = () => {
  const router = useRouter();
  const { user, signOut } = useAuth(); // Get user & signOut function from context
  const handlecover = ()=>{
    router.push('./cover_letter')
  }
  const handlemissing = ()=>{
    router.push('./missing_skills')
  }
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login"); // Redirect to login after sign out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <ul className="flex text-white cursor-pointer justify-between items-center px-6 py-4 ">
      <div>
        <Link href="/" className="mr-9 text-3xl font-serif hover:text-4xl hover:font-bold">
          ResumeAI
        </Link>
      </div>

      <div className="flex gap-4 items-center">
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
                src={user.photoURL} // Default image if no photo
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </>
        )}
      </div>
    </ul>
  );
};

export default Navbar;
