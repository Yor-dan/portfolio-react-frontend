import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';

type TypewriterProps = {
  words?: string[];
};

if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin);
}

export default function Typewriter({ words = [] }: TypewriterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          duration: 0.5,
          ease: 'steps(1)',
        });
      }

      if (!textRef.current || !words || words.length === 0) return;

      const tl = gsap.timeline({ repeat: -1 });

      words.forEach((word) => {
        if (!word) return;
        tl.to(textRef.current, {
          duration: word.length * 0.08,
          text: {
            value: word,
            rtl: false,
          },
          ease: 'none',
        })
          .to({}, { duration: 1.5 }) // Pause visible text
          .to(textRef.current, {
            duration: Math.max(0.3, word.length * 0.04),
            text: {
              value: '',
              rtl: true,
            },
            ease: 'none',
          })
          .to({}, { duration: 0.4 }); // Pause before next word
      });
    },
    { scope: containerRef, dependencies: [words] },
  );

  return (
    <span
      ref={containerRef}
      className="inline-flex items-center"
      aria-live="polite"
    >
      <span ref={textRef} />
      <span
        ref={cursorRef}
        className="ml-1 inline-block h-[1em] w-0.5 align-middle bg-current"
        aria-hidden="true"
      />
    </span>
  );
}
