import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
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

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  // Check if the source is a GIF
  const isGif = src?.toLowerCase().endsWith('.gif');

  return (
    <div className="relative size-full">
      {isGif ? (
        <img
          src={src}
          alt=""
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      ) : (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      )}
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
          src="videos/9caf-506f-4de7-8a81-ab954be382a5.webm"
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
            src="videos/d787-a3b6-45ec-93b7-64b6ab7c615b.webm"
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
            src="videos/17c8-6d62-41e5-89b6-6d0ccd94218d.webm"
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
            src="videos/335899110423217.5fed436687231.gif"
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
          <div className="flex size-full flex-col justify-between bg-gradient-to-br from-blue-600 to-blue-800 p-5 sm:p-6 md:p-8 relative overflow-hidden rounded-3xl">
            {/* Top section */}
            <div className="space-y-4">
              {/* Title and description */}
              <div>
                <h1 className="font-zentry text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[0.9] mb-3">
                  Create<br />mini apps
                </h1>
                <p className="text-white/80 text-xs sm:text-sm mt-3 max-w-[220px]">
                  Bring your ideas to life by creating amazing mini apps (Comit) with us.
                </p>
              </div>

              {/* Services list - positioned absolutely on desktop, below on mobile */}
              <div className="flex flex-row flex-wrap gap-2 sm:absolute sm:top-5 sm:right-5 sm:flex-col sm:items-end">
                <span className="text-white/90 text-[10px] font-medium px-3 py-1.5 bg-white/15 rounded-full backdrop-blur-sm">
                  DECENTRALIZED
                </span>
                <span className="text-white/90 text-[10px] font-medium px-3 py-1.5 bg-white/15 rounded-full backdrop-blur-sm">
                  SECURE MESSAGING
                </span>
                <span className="text-white/90 text-[10px] font-medium px-3 py-1.5 bg-white/15 rounded-full backdrop-blur-sm">
                  WEB3 READY
                </span>
                <span className="text-white/90 text-[10px] font-medium px-3 py-1.5 bg-white/15 rounded-full backdrop-blur-sm">
                  PRIVACY FIRST
                </span>
              </div>
            </div>

            {/* Bottom contact section */}
            <div className="bg-black/50 backdrop-blur-md rounded-3xl p-3 sm:p-4 flex flex-row items-center justify-between gap-3">
              <p className="text-white font-semibold text-xs sm:text-sm">
                Do you have any projects idea?
              </p>
              <div className="flex items-center gap-1.5 bg-black/70 px-2.5 py-1.5 rounded-full">
                <svg className="w-3 h-3 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-white text-[10px] sm:text-[11px] whitespace-nowrap">contact@xmo.com</span>
              </div>
            </div>
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/65b6-996f-4db7-b915-329c360cdfed.webm"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
