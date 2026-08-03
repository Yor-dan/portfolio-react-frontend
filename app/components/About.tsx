export default function About({ about }: { about?: string }) {
  return (
    <div className="bg-white border border-neutral-200 p-8 sm:p-10 shadow-sm rounded-none">
      <p className="text-lg sm:text-xl text-neutral-700 leading-relaxed font-sans font-normal">
        {about || "Full-stack developer crafting responsive, elegant web applications with clean design and modern software architectures."}
      </p>
    </div>
  );
}

