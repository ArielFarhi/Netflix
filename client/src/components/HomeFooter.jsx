import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function HomeFooter() {
  const footerLinks = [
    ["Audio Description", "Investor Relations", "Privacy", "Contact Us"],
    ["Help Center", "Jobs", "Legal Notices", "Do not sell my personal information"],
    ["Gift Cards", "Netflix Shop", "Cookie Preferences", "Ad Choices"],
    ["Media Center", "Terms of Use", "Corporate Information"],
  ];
  const socialIcons = [
    { icon: FaFacebook, color: "#1877F2" },
    { icon: FaInstagram, color: "#E1306C" },
    { icon: FaYoutube, color: "#FF0000" },
    { icon: FaTwitter, color: "#1DA1F2" },
  ];

  return (
    <footer className="w-full bg-black/70 text-gray-400 py-10 mt-40 relative z-20">
      <div className="container mx-auto px-4">
        <div className="flex gap-7 mb-6">
          {socialIcons.map(({ icon: Icon, color }, i) => (
            <a key={i} href="#">
              <Icon className={`text-2xl hover:text-[${color}]`} />
            </a>
          ))}
        </div>
        <div className="flex flex-wrap justify-between">
          {footerLinks.map((column, colIdx) => (
            <div key={colIdx} className="w-full md:w-1/4 mb-6 flex flex-col gap-4">
              {column.map((text, i) => (
                <Link
                  key={i}
                  to="/"
                  className="text-base font-light hover:text-white transition"
                >
                  {text.includes("personal") ? (
                    <>
                      Do not sell my
                      <div>personal information</div>
                    </>
                  ) : (
                    text
                  )}
                </Link>
              ))}
              {colIdx === 0 && (
                <>
                  <div className="mt-10 w-32 h-10 border border-gray-200 flex justify-center items-center font-light text-base cursor-pointer">
                    Service Code
                  </div>
                  <div>© 1997 - 2024 Netflix, Inc.</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;