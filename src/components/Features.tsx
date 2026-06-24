"use client";

import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";

interface BentoTiltProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoTilt = ({ children, className = "" }: BentoTiltProps) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

// Reusable lazy-loading video component
const LazyVideo = ({
  src,
  className,
  containerClass = "absolute inset-0",
}: {
  src: string;
  className: string;
  containerClass?: string;
}) => {
  const [activeSrc, setActiveSrc] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin: "300px", threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [src]);

  useEffect(() => {
    if (activeSrc && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeSrc]);

  return (
    <div ref={containerRef} className={containerClass}>
      <video
        ref={videoRef}
        src={activeSrc}
        loop
        muted
        playsInline
        preload="none"
        className={className}
      />
    </div>
  );
};

interface BentoCardProps {
  src: string;
  title: React.ReactNode;
  description?: string;
  isComingSoon?: boolean;
}

export const BentoCard = ({ src, title, description, isComingSoon }: BentoCardProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <LazyVideo
        src={src}
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          All-in-One Decentralized Super App
        </p>
        <p className="max-w-3xl font-circular-web text-lg text-blue-50 opacity-50">
          Experience a next-generation super app built on a truly decentralized Web3 foundation — uniting messaging, multi-platform group integration, universal social feeds, AI-powered assistants, crypto payments, mini-apps, browsing, and real-world services into one unstoppable ecosystem.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-3xl md:h-[65vh]">
        <BentoCard
          src="https://res.cloudinary.com/zxgf3i2z/video/upload/v1782318676/original-ed9e329f7167698673aa3fe548026a8c_tvhxi1.mp4"
          title={
            <>
              com<b>i</b>t
            </>
          }
          description="A decentralized MiniApp hub bringing payments, services, and tools together in one connected ecosystem."
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="https://res.cloudinary.com/zxgf3i2z/video/upload/v1782318587/VID-20231109-WA0019_niycqk.mp4"
            title={
              <>
                virtu<b>a</b>l avatar
              </>
            }
            description="Experience real-time interaction with AI avatars designed to deliver meaningful insights and natural, intuitive conversations."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="https://res.cloudinary.com/zxgf3i2z/video/upload/v1782318167/glass-abstract-vol2-dark-6_lyzt2l.mp4"
            title={
              <>
                Layer<b>e</b>d groups
              </>
            }
            description="A unified platform offering nested groups and seamless cross-platform connectivity."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="/videos/channels_bg.webm"
            title={
              <>
                ch<b>a</b>nnels
              </>
            }
            description="Seamlessly integrate and interact with content from global social media networks in one unified interface."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-gradient-to-br from-blue-600 to-blue-800 p-3 sm:p-6 md:p-8 relative overflow-hidden rounded-3xl">
            {/* Top section */}
            <div className="space-y-4">
              {/* Title and description */}
              <div>
                <h1 className="font-zentry text-2xl sm:text-4xl md:text-5xl font-black text-white leading-[0.9] mb-3">
                  Create<br />mini apps
                </h1>
                <p className="text-white/80 text-[10px] sm:text-sm mt-3 max-w-[220px]">
                  Bring your ideas to life by creating amazing mini apps (Comit) with us.
                </p>
              </div>

              {/* Services list - positioned absolutely on desktop, below on mobile */}
              <div className="flex flex-row flex-wrap gap-1.5 md:absolute md:top-5 md:right-5 md:flex-col md:items-end">
                <span className="text-white/90 text-[9px] sm:text-[10px] font-medium px-2 py-1 bg-white/15 rounded-full backdrop-blur-sm">
                  INSTANT DEPLOY
                </span>
                <span className="text-white/90 text-[9px] sm:text-[10px] font-medium px-2 py-1 bg-white/15 rounded-full backdrop-blur-sm">
                  UNIVERSAL ACCESS
                </span>
                <span className="text-white/90 text-[9px] sm:text-[10px] font-medium px-2 py-1 bg-white/15 rounded-full backdrop-blur-sm">
                  MINI DAPPS
                </span>
              </div>
            </div>

            {/* Bottom contact section */}
            <div className="bg-black/50 backdrop-blur-md rounded-2xl py-2.5 px-2 flex flex-col gap-2 sm:p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-white font-semibold text-[9.5px] sm:text-sm text-left">
                Do you have any projects idea?
              </p>
              <a
                href="mailto:xmomessenger@gmail.com"
                className="flex items-center justify-center gap-1 bg-black/70 px-1.5 py-0.5 rounded-full w-fit mx-auto sm:mx-0 sm:px-2.5 sm:py-1.5 hover:bg-black/90 transition-colors"
              >
                <svg className="w-2.5 h-2.5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-white text-[7.5px] min-[320px]:text-[8.5px] sm:text-[11px] whitespace-nowrap">xmomessenger@gmail.com</span>
              </a>
            </div>
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <LazyVideo
            src="https://res.cloudinary.com/zxgf3i2z/video/upload/v1782318551/original-e2ebe687b4273829513b018c41beb57a_qnrrsm.mp4"
            className="size-full object-cover object-center"
            containerClass="size-full"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
