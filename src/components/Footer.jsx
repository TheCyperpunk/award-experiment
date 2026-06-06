import { useState } from "react";
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <footer className="w-screen bg-[#5542ff] py-4 text-white">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <p className="text-center text-sm font-light md:text-left">
            ©XMO 2026. All rights reserved
          </p>

          <div className="flex justify-center gap-4 md:justify-start">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors duration-500 ease-in-out hover:text-gray-200"
              >
                {link.icon}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 text-center text-sm font-light md:text-right">
            <button
              id="open-privacy-policy"
              onClick={() => setShowPrivacy(true)}
              className="hover:underline transition-opacity duration-300 hover:opacity-80 bg-transparent border-none cursor-pointer text-white text-sm"
            >
              Privacy Policy
            </button>
            <span className="opacity-50">·</span>
            <button
              id="open-terms-of-service"
              onClick={() => setShowTerms(true)}
              className="hover:underline transition-opacity duration-300 hover:opacity-80 bg-transparent border-none cursor-pointer text-white text-sm"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>

      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
    </>
  );
};

export default Footer;
