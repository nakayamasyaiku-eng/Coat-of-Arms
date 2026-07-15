import type { ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  orientation?: "portrait" | "landscape";
  priority?: boolean;
  children?: ReactNode;
  className?: string;
};

export function MuseumFrame({
  src,
  alt,
  orientation = "portrait",
  children,
  className = "",
}: Props) {
  return (
    <figure className={`museum-frame ${orientation} ${className}`}>
      <div className="frame-inner">
        <div
          className="artwork-placeholder"
          role="img"
          aria-label={alt}
          data-artwork-src={src}
        />
      </div>
      {children}
    </figure>
  );
}
