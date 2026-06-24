"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useState, useRef, useEffect } from "react";

import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = () => {
    setLoading(false);
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime >= 8.0) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  useEffect(() => {
    // If video is already loaded (from cache or fast network before hydration)
    if (videoRef.current && videoRef.current.readyState >= 2) {
      setLoading(false);
    }

    // Safety fallback: hide loading screen after 5 seconds if still stuck
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
          onTimeUpdate={handleTimeUpdate}
        />

        <p className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          ME<b>SS</b>ENGER
        </p>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              x<b>m</b>o
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              &quot;Reimagining Messaging in a Web3-Native World&quot; <br /> Your Digital Identity Is Yours Alone, Your Privacy End-to-End, and Every Connection Powered by True Decentralization.
            </p>

            <Button
              id="watch-trailer"
              title="Download"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-[#5542ff] !text-white flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <p className="special-font hero-heading absolute bottom-5 right-5 text-black">
        ME<b>SS</b>ENGER
      </p>
    </div>
  );
};

export default Hero;

