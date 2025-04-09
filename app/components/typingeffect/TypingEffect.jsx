import { useState, useEffect } from "react"
import styles from "./TypingEffect.module.css"
export default function TypingEffect({ text, delay = 50 }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])
  return (
    <span className={styles.typing}>
      {displayText}
      {currentIndex < text.length && <span className={styles.cursor}>|</span>}
    </span>
  )
}
