"use client";

import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

interface ImageClipBoxProps {
  src: string;
  clipClass: string;
  alt?: string;
}

const ImageClipBox = ({ src, clipClass, alt }: ImageClipBoxProps) => (
  <div className={clipClass}>
    <img src={src} alt={alt || "XMO platform feature"} />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact_bg1.webp"
            clipClass="contact-clip-path-1"
            alt="XMO decentralized identity illustration"
          />
          <ImageClipBox
            src="/img/original-c4424651b4293c8812e0ef7626bfb9f3.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
            alt="XMO secure messaging showcase"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/contact_bg2.webp"
            clipClass="sword-man-clip-path md:scale-125"
            alt="XMO Web3 platform hero visual"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join XMO
          </p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> next era of <br /> c<b>o</b>nnectivity t<b>o</b>gether."
            containerClass="special-font md:!text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button title="contact us" containerClass="mt-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
