import LOGO_PATH from "./logoPath";

export default function Logo({ style, className }) {
  return (
    <svg
      viewBox="0 0 512 512"
      role="img"
      aria-label="Amnesia"
      style={style}
      className={className}
    >
      <path fill="currentColor" fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  );
}
