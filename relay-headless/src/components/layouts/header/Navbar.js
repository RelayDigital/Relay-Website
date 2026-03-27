"use client";
import { useEffect } from "react";
import { useGlobalState } from "../../../contexts/GlobalStateContext";

const Navbar = () => {
  const { mobileMenuOpen, setMobileMenuOpen } = useGlobalState();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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

    // GSAP Animations
    const textUnderlineAnimation = async () => {
      const { gsap } = await import('gsap');
      document.querySelectorAll(".hover-link").forEach((link) => {
        const underline = link.querySelector(".underline");

        // Set initial styles for GSAP to manage transform origin
        gsap.set(underline, { transformOrigin: "left center", scaleX: 0 });

        // Hover start: expand the underline from the left
        link.addEventListener("mouseenter", () => {
          gsap.to(underline, {
            scaleX: 1,
            duration: 0.3,
            ease: "power2.out",
            transformOrigin: "left center", // Ensures the origin is correct for expanding
          });
        });

        // Hover end: contract the underline to the right
        link.addEventListener("mouseleave", () => {
          gsap.to(underline, {
            scaleX: 0,
            duration: 0.3,
            ease: "power2.in",
            transformOrigin: "right center", // Shifts the origin to right for contraction
          });
        });
      });
    };

    // Add or remove the 'overflow-hidden' class to the body element based on mobileMenuOpen state
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // textUnderlineAnimation();
    // window.addEventListener("DOMContentLoaded", textUnderlineAnimation);

    // Clean up the event listener when the component unmounts
    return () => {
      // window.removeEventListener("DOMContentLoaded", textUnderlineAnimation);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Dekstop Nav */}
      <nav className=" bg-neutral-950/50 backdrop-blur-md py-4 hidden md:block border-neutral-700 border-b-[1px] w-full">
        <div className="mx-auto max-w-7xl px-5 flex justify-between items-center">
          <a
            className="-ml-2 flex w-60 items-center rounded-full px-2 text-3xl transition"
            href="/"
          >
            <span className="font-[700] text-neutral-50">Relay</span>
            <span className="text-neutral-300">Digital</span>
            <span className="text-blue-500">.</span>
          </a>
          <div className="flex justify-center h-[58px]">
            <ul className="flex flex-row items-center gap-x-8 w-full h-full">
              <li className="group flex flex-col hover-link cursor-pointer">
                <a
                  href="/#why"
                  className="cursor-pointer text-neutral-50 text-5xl font-normal md:text-base group-hover:text-blue-500 transition-all"
                >
                  Why Use Us?
                </a>
              </li>
              <li className="group flex flex-col hover-link cursor-pointer">
                <a
                  href="/#casestudies"
                  className="cursor-pointer text-neutral-50 text-5xl font-normal md:text-base group-hover:text-blue-500 transition-all"
                >
                  Portfolio
                </a>
              </li>
              <li className="group flex flex-col hover-link cursor-pointer">
                <a
                  href="/#pricing"
                  className="cursor-pointer text-neutral-50 text-5xl font-normal md:text-base group-hover:text-blue-500 transition-all"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-4 ">
            <a href="/contact">
              <button className="relative rounded-full text-center transition-all duration-500 transform relative overflow-hidden z-40 px-6 py-3 border border-blue-500 text-neutral-50 bg-neutral-950 button group text-lg uppercase">
                <div className="group relative z-10">
                  Get Started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    className="ml-2 inline-block transition-all duration-200 group-hover:translate-x-2 group-hover:text-neutral-50"
                  >
                    <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                  </svg>
                </div>
              </button>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav
        className={` bg-neutral-950/50 backdrop-blur-md p-6 flex flex-col justify-between items-start md:hidden border-neutral-700 w-[100vw] ${
          mobileMenuOpen ? "h-[100vh]" : "border-b-[1px]"
        }`}
      >
        {/* Mobile Menu Navbar */}
        <div className="flex flex-row justify-between items-center w-full">
          <a
            className="-ml-2 flex  items-center rounded-full px-2 text-3xl transition"
            href="/"
          >
            <span className="font-[700] text-neutral-50">Relay</span>
            <span className="text-neutral-300">Digital</span>
            <span className="text-blue-500">.</span>
          </a>

          <div className="flex items-center">
            <button
              className={`flex flex-col h-12 w-12 rounded justify-center items-center cursor-pointer group ${
                mobileMenuOpen ? "expanded" : ""
              }`}
              aria-label="Toggle Menu"
              data-aw-toggle-menu=""
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Toggle Menu</span>
              <span
                aria-hidden="true"
                className="h-0.5 w-6 my-1 rounded-full bg-white transition ease transform duration-200 opacity-80 group-[.expanded]:rotate-45 group-[.expanded]:translate-y-2.5"
              ></span>
              <span
                aria-hidden="true"
                className="h-0.5 w-6 my-1 rounded-full bg-white transition ease transform duration-200 opacity-80 group-[.expanded]:opacity-0"
              ></span>
              <span
                aria-hidden="true"
                className="h-0.5 w-6 my-1 rounded-full bg-white transition ease transform duration-200 opacity-80 group-[.expanded]:-rotate-45 group-[.expanded]:-translate-y-2.5"
              ></span>
            </button>
          </div>
        </div>
        {/* Mobile Menu Content */}
        <div
          className={`flex flex-col justify-between w-full h-full pt-12 gap-y-6 ${
            mobileMenuOpen ? "" : "hidden"
          }`}
        >
          {/* Links */}
          <div className="flex flex-col justify-start gap-y-6">
            <a
              href="/#why"
              onClick={toggleMobileMenu}
              className="cursor-pointer text-neutral-50 text-2xl font-normal md:text-base"
            >
              Why Use Us?
            </a>
            <a
              href="/#casestudies"
              onClick={toggleMobileMenu}
              className="cursor-pointer text-neutral-50 text-2xl font-normal md:text-base"
            >
              Portfolio
            </a>
            <a
              href="/#pricing"
              onClick={toggleMobileMenu}
              className="cursor-pointer text-neutral-50 text-2xl font-normal md:text-base"
            >
              Pricing
            </a>
            {/* Links to other Services */}
            {/* <div className="text-sm grid grid-cols-1 gap-4 items-center">
              <a
                href="/services/marketing-funnels"
                className="group relative bg-grid-white/5 md:p-6 px-6 items-center  text-sm hover:bg-neutral-800 border bg-neutral-900 border-blue-500 hover:md:shadow-xl shadow-lg md:shadow-none shadow-blue-500/40 hover:md:shadow-blue-500/40 h-full lg:h-56 w-full duration-300 transition flex md:flex-col justify-start gap-x-2 lg:items-start"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -top-3 -left-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -bottom-3 -left-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -top-3 -right-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -bottom-3 -right-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="flex h-12 md:h-9 lg:h-12 w-8 lg:w-12 items-center justify-center rounded-lg  text-neutral-100 md:text-neutral-200 group-hover:text-neutral-50 group-hover:translate-x-2 duration-300 ">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                  >
                    <path
                      d="M0.900024 7.50002C0.900024 3.85495 3.85495 0.900024 7.50002 0.900024C11.1451 0.900024 14.1 3.85495 14.1 7.50002C14.1 11.1451 11.1451 14.1 7.50002 14.1C3.85495 14.1 0.900024 11.1451 0.900024 7.50002ZM7.50002 1.80002C4.35201 1.80002 1.80002 4.35201 1.80002 7.50002C1.80002 10.648 4.35201 13.2 7.50002 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.35201 10.648 1.80002 7.50002 1.80002ZM3.07504 7.50002C3.07504 5.05617 5.05618 3.07502 7.50004 3.07502C9.94388 3.07502 11.925 5.05617 11.925 7.50002C11.925 9.94386 9.94388 11.925 7.50004 11.925C5.05618 11.925 3.07504 9.94386 3.07504 7.50002ZM7.50004 3.92502C5.52562 3.92502 3.92504 5.52561 3.92504 7.50002C3.92504 9.47442 5.52563 11.075 7.50004 11.075C9.47444 11.075 11.075 9.47442 11.075 7.50002C11.075 5.52561 9.47444 3.92502 7.50004 3.92502ZM7.50004 5.25002C6.2574 5.25002 5.25004 6.25739 5.25004 7.50002C5.25004 8.74266 6.2574 9.75002 7.50004 9.75002C8.74267 9.75002 9.75004 8.74266 9.75004 7.50002C9.75004 6.25738 8.74267 5.25002 7.50004 5.25002ZM6.05004 7.50002C6.05004 6.69921 6.69923 6.05002 7.50004 6.05002C8.30084 6.05002 8.95004 6.69921 8.95004 7.50002C8.95004 8.30083 8.30084 8.95002 7.50004 8.95002C6.69923 8.95002 6.05004 8.30083 6.05004 7.50002Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="md:mt-6 block text-center  font-semibold text-2xl tracking-tight text-neutral-100 md:text-neutral-200 group-hover:text-neutral-50 leading-tight">
                  Marketing Funnels
                </span>
                <p className="mt-1 md:mt-4 hidden text-sm md:block font-light text-neutral-400 group-hover:text-neutral-300">
                  We design, develop and deploy custom marketing funnels
                  designed to convert more paid traffic into sales.
                </p>
              </a>
              <a
                href="/services/digital-ads"
                className="group relative bg-grid-white/5 md:p-6 px-6 items-center  text-sm hover:bg-neutral-800 border bg-neutral-900 border-blue-500 hover:md:shadow-xl shadow-lg md:shadow-none shadow-blue-500/40 hover:md:shadow-blue-500/40 h-full lg:h-56 w-full duration-300 transition flex md:flex-col justify-start gap-x-2 lg:items-start"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -top-3 -left-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -bottom-3 -left-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -top-3 -right-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -bottom-3 -right-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="flex h-12 md:h-9 lg:h-12 w-8 lg:w-12 items-center justify-center rounded-lg  text-neutral-100 md:text-neutral-200 group-hover:text-neutral-50 group-hover:translate-x-2 duration-300 ">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                  >
                    <path
                      d="M3.29227 0.048984C3.47033 -0.032338 3.67946 -0.00228214 3.8274 0.125891L12.8587 7.95026C13.0134 8.08432 13.0708 8.29916 13.0035 8.49251C12.9362 8.68586 12.7578 8.81866 12.5533 8.82768L9.21887 8.97474L11.1504 13.2187C11.2648 13.47 11.1538 13.7664 10.9026 13.8808L8.75024 14.8613C8.499 14.9758 8.20255 14.8649 8.08802 14.6137L6.15339 10.3703L3.86279 12.7855C3.72196 12.934 3.50487 12.9817 3.31479 12.9059C3.1247 12.8301 3 12.6461 3 12.4414V0.503792C3 0.308048 3.11422 0.130306 3.29227 0.048984ZM4 1.59852V11.1877L5.93799 9.14425C6.05238 9.02363 6.21924 8.96776 6.38319 8.99516C6.54715 9.02256 6.68677 9.12965 6.75573 9.2809L8.79056 13.7441L10.0332 13.178L8.00195 8.71497C7.93313 8.56376 7.94391 8.38824 8.03072 8.24659C8.11753 8.10494 8.26903 8.01566 8.435 8.00834L11.2549 7.88397L4 1.59852Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="md:mt-6 block text-center  font-semibold text-2xl tracking-tight text-neutral-100 md:text-neutral-200 group-hover:text-neutral-50 leading-tight">
                  Digital Ads
                </span>
                <p className="mt-1 md:mt-4 hidden text-sm md:block font-light text-neutral-400 group-hover:text-neutral-300">
                  We will help you create, manage and optimize your digital ad
                  campaigns to get more out of your ad spend.
                </p>
              </a>
              <a
                href="/services/email-marketing"
                className="group relative bg-grid-white/5 md:p-6 px-6 items-center  text-sm hover:bg-neutral-800 border bg-neutral-900 border-blue-500 hover:md:shadow-xl shadow-lg md:shadow-none shadow-blue-500/40 hover:md:shadow-blue-500/40 h-full lg:h-56 w-full duration-300 transition flex md:flex-col justify-start gap-x-2 lg:items-start"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -top-3 -left-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -bottom-3 -left-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -top-3 -right-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -bottom-3 -right-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="flex h-12 md:h-9 lg:h-12 w-8 lg:w-12 items-center justify-center rounded-lg  text-neutral-100 md:text-neutral-200 group-hover:text-neutral-50 group-hover:translate-x-2 duration-300 ">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                  >
                    <path
                      d="M7.94721 0.164594C7.66569 0.0238299 7.33431 0.0238302 7.05279 0.164594L0.552786 3.41459C0.214002 3.58399 0 3.93025 0 4.30902V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V4.30902C15 3.93025 14.786 3.58399 14.4472 3.41459L7.94721 0.164594ZM13.5689 4.09349L7.5 1.05902L1.43105 4.09349L7.5 7.29136L13.5689 4.09349ZM1 4.88366V12H14V4.88366L7.70977 8.19813C7.57848 8.26731 7.42152 8.26731 7.29023 8.19813L1 4.88366Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="md:mt-6 block text-center  font-semibold text-2xl tracking-tight text-neutral-100 md:text-neutral-200 group-hover:text-neutral-50 leading-tight">
                  Email Marketing
                </span>
                <p className="mt-1 md:mt-4 hidden text-sm md:block font-light text-neutral-400 group-hover:text-neutral-300">
                  Bring your email marketing to the next level with our custom
                  email marketing services with no monthly fees.
                </p>
              </a>
              <a
                href="/services/web-development"
                className="group relative bg-grid-white/5 md:p-6 px-6 items-center  text-sm hover:bg-neutral-800 border bg-neutral-900 border-blue-500 hover:md:shadow-xl shadow-lg md:shadow-none shadow-blue-500/40 hover:md:shadow-blue-500/40 h-full lg:h-56 w-full duration-300 transition flex md:flex-col justify-start gap-x-2 lg:items-start"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -top-3 -left-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -bottom-3 -left-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -top-3 -right-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-6 w-6 -bottom-3 -right-3 text-neutral-50"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="flex h-12 md:h-9 lg:h-12 w-8 lg:w-12 items-center justify-center rounded-lg  text-neutral-100 md:text-neutral-200 group-hover:text-neutral-50 group-hover:translate-x-2 duration-300 ">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                  >
                    <path
                      d="M1 3.25C1 3.11193 1.11193 3 1.25 3H13.75C13.8881 3 14 3.11193 14 3.25V10.75C14 10.8881 13.8881 11 13.75 11H1.25C1.11193 11 1 10.8881 1 10.75V3.25ZM1.25 2C0.559643 2 0 2.55964 0 3.25V10.75C0 11.4404 0.559644 12 1.25 12H5.07341L4.82991 13.2986C4.76645 13.6371 5.02612 13.95 5.37049 13.95H9.62951C9.97389 13.95 10.2336 13.6371 10.1701 13.2986L9.92659 12H13.75C14.4404 12 15 11.4404 15 10.75V3.25C15 2.55964 14.4404 2 13.75 2H1.25ZM9.01091 12H5.98909L5.79222 13.05H9.20778L9.01091 12Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="md:mt-6 block text-center  font-semibold text-2xl tracking-tight text-neutral-100 md:text-neutral-200 group-hover:text-neutral-50 leading-tight">
                  Web Design
                </span>
                <p className="mt-1 md:mt-4 hidden text-sm md:block font-light text-neutral-400 group-hover:text-neutral-300">
                  Have a custom website built for your business that is designed
                  to convert more visitors into customers.
                </p>
              </a>
            </div> */}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <a href="/contact" className="w-full">
              <button className="relative rounded-full text-center transition-all duration-500 transform overflow-hidden z-40 px-6 py-3 border border-blue-500 text-neutral-50 bg-neutral-950 button group text-lg uppercase w-full">
                <div className="group relative z-10">
                  Get Started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    className="ml-2 inline-block transition-all duration-200 group-hover:translate-x-2 group-hover:text-neutral-50"
                  >
                    <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                  </svg>
                </div>
              </button>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
