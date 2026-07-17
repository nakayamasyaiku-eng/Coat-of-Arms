import Image from "next/image";
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
  priority = false,
  children,
  className = "",
}: Props) {
  const containsFrame = src.startsWith("/images/framed/");
  return (
    <figure className={`museum-frame ${orientation} ${containsFrame ? "framed-photo" : ""} ${className}`}>
      <div className="frame-inner">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 760px) calc(100vw - 64px), (max-width: 1020px) 55vw, 600px"
        />
      </div>
      {children}
    </figure>
  );
}
