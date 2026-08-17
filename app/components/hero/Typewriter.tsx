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
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!textRef.current || !words || words.length === 0) return;

      const tl = gsap.timeline({ repeat: -1 });

      words.forEach((word) => {
        if (!word) return;
        tl.to(textRef.current, {
          duration: word.length * 0.1,
          text: word,
          ease: 'none',
        })
          .to({}, { duration: 1.5 }) // Pause visible text
          .to(textRef.current, {
            duration: 0.6,
            text: '',
            ease: 'none',
          })
          .to({}, { duration: 0.4 }); // Pause before next word
      });
    },
    { scope: containerRef, dependencies: [words] },
  );

  return (
    <span ref={containerRef} className="inline-flex items-center">
      <span ref={textRef} />
      <span className="ml-1 inline-block h-[1em] w-[2px] align-middle bg-neutral-600 animate-pulse" />
    </span>
  );
}
