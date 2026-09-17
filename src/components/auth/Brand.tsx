import { ClipGaramLogo } from "../brand/ClipGaramLogo";

export function Brand({
  className,
  priority = true,
}: {
  className?: string;
  priority?: boolean;
} = {}) {
  return (
    <a
      className={`brand ${className ?? ""}`.trim()}
      href="./"
      aria-label="ClipGaram home"
    >
      <ClipGaramLogo priority={priority} />
    </a>
  );
}
