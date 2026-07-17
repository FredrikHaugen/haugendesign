// Inline copy of public/logo/logo.svg so it inherits currentColor.
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1391 2189"
      fill="currentColor"
      aria-hidden
      className={className}
      style={{ aspectRatio: "1391 / 2189" }}
    >
      <rect width="350" height="1400" />
      <rect x="1041" y="789" width="350" height="1400" />
      <circle cx="695.5" cy="1094.5" r="305.5" />
    </svg>
  );
}
