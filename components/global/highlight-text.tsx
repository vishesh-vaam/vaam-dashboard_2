export default function HighlightText({ text }: { text: string }) {
    return (
      <span className="bg-[#ffd342] text-black dark:text-black px-2 py-2 rounded-md inline-block mt-2">
        {text}
      </span>
    );
  }
  