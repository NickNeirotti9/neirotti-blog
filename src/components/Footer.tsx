import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/index.css";
import "../assets/footer.css";

type IconName = "sun" | "sun2";

const EASTER_EGG_SEQUENCE: IconName[] = ["sun", "sun2", "sun", "sun2"];
const ARM_WINDOW_MS = 4000;

const Footer = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const sun2Ref = useRef<HTMLDivElement>(null);

  const clearResetTimeout = () => {
    if (resetTimeout.current) {
      clearTimeout(resetTimeout.current);
      resetTimeout.current = null;
    }
  };

  const resetSequence = () => {
    clearResetTimeout();
    setStep(0);
  };

  // Clicking anywhere other than the two icons cancels progress.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        (sunRef.current && sunRef.current.contains(target)) ||
        (sun2Ref.current && sun2Ref.current.contains(target))
      ) {
        return;
      }
      resetSequence();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearResetTimeout();
    };
  }, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Easter egg: sun, sun2, sun, sun2 — in that order — warps to the portfolio.
  const handleIconClick = (icon: IconName) => {
    const expected = EASTER_EGG_SEQUENCE[step];
    let nextStep: number;

    if (icon === expected) {
      nextStep = step + 1;
    } else if (icon === EASTER_EGG_SEQUENCE[0]) {
      nextStep = 1; // wrong click, but it's a valid fresh start
    } else {
      nextStep = 0;
    }

    clearResetTimeout();

    if (nextStep === EASTER_EGG_SEQUENCE.length) {
      setStep(0);
      navigate("/portfolio");
      return;
    }

    setStep(nextStep);
    if (nextStep > 0) {
      resetTimeout.current = setTimeout(resetSequence, ARM_WINDOW_MS);
    }
  };

  return (
    <footer className="footer">
      <div
        ref={sunRef}
        className="footer-motif sun-motif"
        onClick={() => handleIconClick("sun")}
        aria-hidden="true"
      ></div>
      <div
        ref={sun2Ref}
        className="footer-motif-2 sun-motif"
        onClick={() => handleIconClick("sun2")}
        aria-hidden="true"
      ></div>
      <div className="footer-content">
        <button onClick={handleLogoClick} className="logoButton">
          existnchill
        </button>
        <Link to="/disclaimer" className="footer-link">
          Disclaimer
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
