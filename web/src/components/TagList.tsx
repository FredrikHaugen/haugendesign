const palettes = [
  "bg-pastel-blue text-pastel-blue-ink",
  "bg-pastel-green text-pastel-green-ink",
  "bg-pastel-yellow text-pastel-yellow-ink",
  "bg-pastel-red text-pastel-red-ink",
];

export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <li
          key={tag}
          className={`rounded-full px-3 py-1 text-xs ${palettes[index % palettes.length]}`}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
