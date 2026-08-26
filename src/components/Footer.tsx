import Link from "next/link";
import { FaInstagram, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  { href: "https://www.instagram.com/xmomessanger?igsh=MTV2MmJ3YWI1YmptNg==", icon: <FaInstagram /> },
  { href: "https://x.com/xmomessenger?s=11", icon: <FaTwitter /> },
  { href: "https://youtube.com/@xmomessenger?si=zYJ9yrn6JzGE7KPA", icon: <FaYoutube /> },
  { href: "https://medium.com/@amrid11dineshan", icon: <FaMedium /> },
];

const Footer = () => {
  return (
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
          <Link
            id="open-privacy-policy"
            href="/privacy-policy"
            className="hover:underline transition-opacity duration-300 hover:opacity-80 text-white text-sm"
          >
            Privacy Policy
          </Link>
          <span className="opacity-50">·</span>
          <Link
            id="open-terms-of-service"
            href="/terms-of-service"
            className="hover:underline transition-opacity duration-300 hover:opacity-80 text-white text-sm"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
