"use client";
import ContactForm from "./ContactForm.js";
import { sendGAEvent } from "@next/third-parties/google";

const Contact = () => {
  return (
    <div className="relative mx-auto max-w-7xl px-5 z-10">
      <div className="relative pt-20 lg:pt-24">
        {" "}
        <h2 className="mx-2 lg:mx-8  text-3xl text-neutral-100 lg:text-5xl text-center z-10">
          <span className="bg-gradient-to-b from-neutral-50 from-60% to-neutral-400 bg-clip-text text-transparent lg:to-neutral-600">
            Are You Ready To{" "}
            <span className="bg-gradient-to-b from-blue-500 from-60% to-blue-400 bg-clip-text text-transparent lg:to-blue-600 underline">
              Rocket
            </span>{" "}
            Your Conversion Rate
            <span className="bg-gradient-to-b from-blue-500 from-60% to-blue-400 bg-clip-text text-transparent lg:to-blue-600 underline">
              ?
            </span>
          </span>
        </h2>
        <div className="mx-auto my-8 max-w-xl pb-2 lg:pb-8 text-center lg:max-w-2xl z-10">
          <div className="text-md mx-4 text-center text-neutral-300 lg:max-w-2xl lg:text-xl">
            <p>
              Leave your details below and we&apos;ll get back to you as soon as
              possible. We look forward to hearing from you!
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-screen-xl gap-10 md:grid-cols-2 z-10">
          <div className="relative">
            <h2 className=" text-3xl font-medium text-neutral-50">
              Contact Relay
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-neutral-300">
              Have a question or inquiry? Fill out the form below and we will
              get back to you as soon as possible.
            </p>
            <div className="mt-5">
              <div className="mt-2 flex items-center space-x-2 text-neutral-100">
                <svg
                  className="h-4 w-4 text-neutral-300"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.94721 0.164594C7.66569 0.0238299 7.33431 0.0238302 7.05279 0.164594L0.552786 3.41459C0.214002 3.58399 0 3.93025 0 4.30902V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V4.30902C15 3.93025 14.786 3.58399 14.4472 3.41459L7.94721 0.164594ZM13.5689 4.09349L7.5 1.05902L1.43105 4.09349L7.5 7.29136L13.5689 4.09349ZM1 4.88366V12H14V4.88366L7.70977 8.19813C7.57848 8.26731 7.42152 8.26731 7.29023 8.19813L1 4.88366Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <a href="mailto:hello@relaydigital.agency">
                  hello@relaydigital.agency
                </a>
              </div>
            </div>
            <p className="mt-3 text-lg leading-relaxed text-neutral-300">or</p>
            <p className="mt-3 text-lg leading-relaxed text-neutral-300">
              <a
                onClick={() =>
                  sendGAEvent({ event: "buttonClicked", value: "calendly" })
                }
                href="https://calendly.com/relaydigitalyyc/discovery"
              >
                <span className="calendly text-sm font-semibold leading-6 tracking-wide text-neutral-400 hover:text-neutral-300 underline duration-300">
                  Book a call
                </span>
              </a>
            </p>
          </div>
          <div className="mb-5 rounded-xl border border-neutral-700 bg-neutral-950 p-5 shadow-xl md:p-8 shadow-blue-500/50">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
