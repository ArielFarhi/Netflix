import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const socialLinks = [
  { icon: <FaFacebook className="hover:text-[#1877F2] text-2xl" />, href: "#" },
  { icon: <FaInstagram className="hover:text-[#E1306C] text-2xl" />, href: "#" },
  { icon: <FaYoutube className="hover:text-[#FF0000] text-2xl" />, href: "#" },
  { icon: <FaTwitter className="hover:text-[#1DA1F2] text-2xl" />, href: "#" },
];

const linkSections = [
  [
    "Audio Description",
    "Investor Relations",
    "Privacy",
    "Contact Us",
  ],
  [
    "Help Center",
    "Jobs",
    "Legal Notices",
    <>
      Do not sell my
      <div>personal information</div>
    </>,
  ],
  [
    "Gift Cards",
    "Netflix Shop",
    "Cookie Preferences",
    "Ad Choices",
  ],
  [
    "Media Center",
    "Terms of Use",
    "Corporate Information",
  ],
];

function HomePageFooter() {
  return (
    <footer className="w-full bg-black/70 text-gray-400 py-8 mt-40 relative z-20">
      <div className="container mx-auto px-4">
        <div className="flex gap-6 mb-6">
          {socialLinks.map((item, index) => (
            <a href={item.href} key={index}>
              {item.icon}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap justify-between">
          {linkSections.map((section, idx) => (
            <div
              key={idx}
              className="w-full md:w-1/4 flex flex-col gap-4 mb-6"
            >
              {section.map((text, i) => (
                <Link
                  to="/"
                  key={i}
                  className="cursor-pointer text-gray-400 hover:text-white text-sm"
                >
                  {text}
                </Link>
              ))}
              {idx === 0 && (
                <>
                  <div className="mt-10 w-32 h-10 border border-gray-200 flex justify-center items-center text-sm cursor-pointer">
                    Service Code
                  </div>
                  <div className="text-xs text-gray-500">
                    © 1997 - 2024 Netflix, Inc.
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default HomePageFooter;