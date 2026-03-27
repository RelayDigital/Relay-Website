"use client"
import { useEffect } from "react";

const Footer = () => {

  useEffect(() => {
    // Fix for id links
    document.querySelectorAll('a[href^="/#"]').forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const href = el.getAttribute("href");
        const id = href?.slice(2); // Slice to remove "/#"
        if (!id) return;

        const currentUrl = window.location.pathname;
        const targetUrl = href.split("#")[0] || "/";

        if (currentUrl === targetUrl) {
          // Target element is on the same page
          const target = document.getElementById(id);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          // Navigate to the correct URL with the hash
          window.location.href = `${targetUrl}#${id}`;
        }
      });
    });

    // Check for anchor in URL on page load
    window.addEventListener("load", () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const id = hash.slice(1); // Remove the "#"
          const target = document.getElementById(id);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }, 100); // Adjust the delay as necessary
      }
    });
  }, []);
  return (
    // <footer className="bg-neutral-950 z-10">
    //   <div className="mx-auto max-w-7xl items-center py-20 sm:py-24 lg:px-8">
    //     <nav
    //       className="mx-8 flex flex-col items-center justify-center sm:flex-row sm:gap-x-12"
    //       aria-label="Footer"
    //     >
    //       <div className="pb-6">
    //         <a
    //           href="/"
    //           className="text-sm leading-6 text-neutral-300 hover:text-neutral-100"
    //         >
    //           Home
    //         </a>
    //       </div>
    //       <div className="pb-6">
    //         <a
    //           href="/#pricing"
    //           className="text-sm leading-6 text-neutral-300 hover:text-neutral-100"
    //         >
    //           Pricing
    //         </a>
    //       </div>
    //       <div className="pb-6">
    //         <a
    //           href="/contact"
    //           className="text-sm leading-6 text-neutral-300 hover:text-neutral-100"
    //         >
    //           Contact
    //         </a>
    //       </div>
    //     </nav>
    //     <p className="mt-10 text-center text-xs leading-5 text-neutral-400">
    //       © 2024 Relay, Inc. All rights reserved.
    //     </p>
    //   </div>
    // </footer>
    <footer className="relative border-t border-neutral-700 not-prose bg-neutral-950">
      <div className="mx-auto max-w-7xl px-5">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-neutral-300">
          <div className="grid grid-cols-12 gap-4 gap-y-8 sm:gap-8 py-8 md:py-12">
            <div className="col-span-12 lg:col-span-3">
              <div>
                <a
                  className="-ml-2 flex w-60 items-center rounded-full px-2 text-3xl transition"
                  href="/"
                >
                  <span className="font-[700] text-neutral-50">Relay</span>
                  <span className="text-neutral-300">Digital</span>
                  <span className="text-blue-500">.</span>
                </a>
                <p className="mt-3 text-sm text-neutral-500 max-w-xs">
                  Technology & Digital Infrastructure
                </p>
              </div>
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-2">
              <div className="dark:text-neutral-300 font-medium mb-2">
                Company
              </div>
              <ul className="text-sm">
                <li className="mb-2">
                  <a
                    className="text-muted hover:text-neutral-700 hover:underline dark:text-neutral-400 transition duration-150 ease-in-out"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="text-muted hover:text-neutral-700 hover:underline dark:text-neutral-400 transition duration-150 ease-in-out"
                    href="/about"
                  >
                    About
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="text-muted hover:text-neutral-700 hover:underline dark:text-neutral-400 transition duration-150 ease-in-out"
                    href="/portfolio"
                  >
                    Portfolio
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="text-muted hover:text-neutral-700 hover:underline dark:text-neutral-400 transition duration-150 ease-in-out"
                    href="/careers"
                  >
                    Careers
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="text-muted hover:text-neutral-700 hover:underline dark:text-neutral-400 transition duration-150 ease-in-out"
                    href="/contact"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-2">
              <div className="dark:text-neutral-300 font-medium mb-2">
                Services
              </div>
              <ul className="text-sm">
                <li className="mb-2">
                  <a
                    className="text-muted hover:text-neutral-700 hover:underline dark:text-neutral-400 transition duration-150 ease-in-out"
                    href="/services/web-development"
                  >
                    Software Development
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="text-muted hover:text-neutral-700 hover:underline dark:text-neutral-400 transition duration-150 ease-in-out"
                    href="/services/automation-ai"
                  >
                    Automation & AI
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="text-muted hover:text-neutral-700 hover:underline dark:text-neutral-400 transition duration-150 ease-in-out"
                    href="/services/marketing-funnels"
                  >
                    Marketing Funnels
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="text-muted hover:text-neutral-700 hover:underline dark:text-neutral-400 transition duration-150 ease-in-out"
                    href="/services/digital-ads"
                  >
                    Digital Advertising
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="text-muted hover:text-neutral-700 hover:underline dark:text-neutral-400 transition duration-150 ease-in-out"
                    href="/services/email-marketing"
                  >
                    Email Marketing
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="text-muted hover:text-neutral-700 hover:underline dark:text-neutral-400 transition duration-150 ease-in-out"
                    href="/services/ecommerce"
                  >
                    Ecommerce
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-2">
              <div className="dark:text-neutral-300 font-medium mb-2">
                Connect
              </div>
              <ul className="text-sm">
                <li className="mb-2">
                  <a
                    className="text-muted hover:text-neutral-700 hover:underline dark:text-neutral-400 transition duration-150 ease-in-out"
                    href="/contact"
                  >
                    Get in Touch
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="text-muted hover:text-neutral-700 hover:underline dark:text-neutral-400 transition duration-150 ease-in-out"
                    href="/pricing"
                  >
                    Pricing
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="text-muted hover:text-neutral-700 hover:underline dark:text-neutral-400 transition duration-150 ease-in-out"
                    href="https://calendly.com/relaydigitalyyc/discovery"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a Call
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:flex md:items-center md:justify-between py-6 md:py-8">
            <ul className="flex mb-4 md:order-1 -ml-2 md:ml-4 md:mb-0 rtl:ml-0 rtl:-mr-2 rtl:md:ml-0 rtl:md:mr-4">
              <li>
                <a
                  className="text-muted dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-4 focus:ring-neutral-200 dark:focus:ring-neutral-700 rounded-lg text-sm p-2.5 inline-flex items-center"
                  aria-label="Instagram"
                  href="https://www.instagram.com/relaydigitalmktg/"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    data-icon="tabler:brand-instagram"
                  >
                    <symbol id="ai:tabler:brand-instagram">
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      >
                        <path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"></path>
                        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m7.5-4.5v.01"></path>
                      </g>
                    </symbol>
                    <use href="#ai:tabler:brand-instagram"></use>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="text-muted dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-4 focus:ring-neutral-200 dark:focus:ring-neutral-700 rounded-lg text-sm p-2.5 inline-flex items-center"
                  aria-label="LinkedIn"
                  href="https://www.linkedin.com/company/relaydigitalagency"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    data-icon="tabler:brand-linkedin"
                  >
                    <symbol id="ai:tabler:brand-linkedin">
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      >
                        <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm4 5v5m0-8v.01M12 16v-5"></path>
                        <path d="M16 16v-3a2 2 0 0 0-4 0"></path>
                      </g>
                    </symbol>
                    <use href="#ai:tabler:brand-linkedin"></use>
                  </svg>
                </a>
              </li>
              {/* <li>
                <a
                  className="text-muted dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-4 focus:ring-neutral-200 dark:focus:ring-neutral-700 rounded-lg text-sm p-2.5 inline-flex items-center"
                  aria-label="Github"
                  href="https://github.com/RelayDigital"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    data-icon="tabler:brand-github"
                  >
                    <symbol id="ai:tabler:brand-github">
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6.6-.6 1.2-.5 2V21"
                      ></path>
                    </symbol>
                    <use href="#ai:tabler:brand-github"></use>
                  </svg>
                </a>
              </li> */}
            </ul>
            <div className="text-sm mr-4 text-neutral-500">
              &copy; 2026 Relay Digital. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
