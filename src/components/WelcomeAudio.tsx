"use client";

import { useEffect, useRef } from "react";

const WELCOME_SCRIPT = `Welcome to Reactivate M.B.S., Mind Body and Soul! We are an aroma therapy and holistic healing company that sells all natural and organic products. Browse our handcrafted candles and premium beauty products, add your favorites to the cart, and check out securely. If you need any help, just tap the chat icon in the bottom right corner. Thank you for supporting our business, and don't forget, our apparel brand is coming soon! Place your order and reserve yours today. Enjoy your shopping experience, and thank you for choosing Reactivate M.B.S.!`;

export default function WelcomeAudio() {
  const hasPlayed = useRef(false);

  useEffect(() => {
    const playAudio = () => {
      if (hasPlayed.current) return;
      hasPlayed.current = true;

      const startSpeech = (voices: SpeechSynthesisVoice[]) => {
        const utterance = new SpeechSynthesisUtterance(WELCOME_SCRIPT);
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;

        const femaleNames = [
          "Zira", "Susan", "Hazel", "Jenny", "Aria", "Sara",
          "Samantha", "Karen", "Moira", "Tessa", "Victoria",
          "Google UK English Female", "Google US English",
          "Female"
        ];
        const femaleVoice =
          voices.find((v) => femaleNames.some((n) => v.name.includes(n))) ||
          voices.find((v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")) ||
          voices.find((v) => v.lang.startsWith("en"));
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }

        window.speechSynthesis.speak(utterance);
      };

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        startSpeech(voices);
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          startSpeech(window.speechSynthesis.getVoices());
        };
      }

      // Remove listeners after first trigger
      window.removeEventListener("click", playAudio);
      window.removeEventListener("scroll", playAudio);
      window.removeEventListener("touchstart", playAudio);
    };

    // Browsers block auto-play audio — trigger on first user interaction
    window.addEventListener("click", playAudio);
    window.addEventListener("scroll", playAudio);
    window.addEventListener("touchstart", playAudio);

    return () => {
      window.removeEventListener("click", playAudio);
      window.removeEventListener("scroll", playAudio);
      window.removeEventListener("touchstart", playAudio);
    };
  }, []);

  return null;
}
