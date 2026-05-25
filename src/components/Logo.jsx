// Vitality V-leaf mark. Uses currentColor so it adapts to light/dark contexts.
export default function LogoMark({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 64 72" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
         className={className} aria-hidden="true">
      <path d="M14 8C18 27 24 45 32 61C30 43 27 24 25 8C22 6.5 17 6.5 14 8Z" />
      <path d="M52 6C60 25 53 48 32 61C40 45 47 25 52 6Z" />
    </svg>
  );
}
