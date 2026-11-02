"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useGlobalState } from "../contexts/GlobalStateContext";

const ExitIntentPopup = () => {
  const { isExitIntentPopupOpen, closeHeroPopup, closeExitIntentPopup } = useGlobalState();
  const formRef = useRef();
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [challengeToken, setChallengeToken] = useState("");
  const widgetRef = useRef(null);
  const widgetIdRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (isExitIntentPopupOpen) {
      closeHeroPopup();
    }
  }, [isExitIntentPopupOpen, closeHeroPopup]);

  useEffect(() => {
    const form = formRef.current;
    if (!isExitIntentPopupOpen || !form) return;
    const validateForm = () => {
      setIsFormValid(
        form.elements.namedItem("email")?.value.trim() !== "" &&
        form.elements.namedItem("email")?.value.includes("@")
      );
    };
    validateForm();
    form.addEventListener("input", validateForm);
    return () => form.removeEventListener("input", validateForm);
  }, [isExitIntentPopupOpen]);

  useEffect(() => {
    if (isExitIntentPopupOpen) return;
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.remove(widgetIdRef.current);
    }
    widgetIdRef.current = null;
    setChallengeToken("");
  }, [isExitIntentPopupOpen]);

  const renderChallenge = () => {
    if (!isExitIntentPopupOpen || !siteKey || !widgetRef.current ||
        !window.turnstile || widgetIdRef.current !== null) return;
    widgetIdRef.current = window.turnstile.render(widgetRef.current, {
      sitekey: siteKey,
      action: "ebook",
      theme: "dark",
      callback: (token) => setChallengeToken(token),
      "expired-callback": () => setChallengeToken(""),
      "error-callback": () => setChallengeToken(""),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!isFormValid || !challengeToken || !siteKey) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/sendEbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formRef.current.email.value, turnstileToken: challengeToken }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setResult("Ebook successfully sent!");
      formRef.current.reset(); // Clear the form
      setIsFormValid(false); // Reset form validation state
      setSubmitAttempted(false); // Reset submit attempted state
    } catch (error) {
      setResult("We could not send the ebook. Please try again.");
    
    } finally {
      setIsSubmitting(false);
      setChallengeToken("");
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    }
  };

  if (!isExitIntentPopupOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="mb-5 rounded-xl border border-neutral-700 bg-neutral-950 p-5 shadow-xl md:p-8 shadow-blue-500/50 text-center">
        <h2 className="text-2xl font-bold mb-4">Wait! Before you go...</h2>
        <p className="mb-4">Enter your email to download our free ebook.</p>
        {siteKey ? (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onReady={renderChallenge}
          />
        ) : (
          <p role="status" className="mb-4 text-sm text-amber-300">
            Ebook delivery is temporarily unavailable.
          </p>
        )}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-5">
            <input
              id="email_address"
              type="email"
              placeholder="Email Address"
              name="email"
              required
              className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-0 text-neutral-50"
            />
            {submitAttempted && !formRef.current?.email.value.trim() && (
              <div className="empty-feedback mt-1 text-sm text-red-400">
                Please provide your email address.
              </div>
            )}
            {submitAttempted && !formRef.current?.email.value.includes("@") && (
              <div className="invalid-feedback mt-1 text-sm text-red-400">
                Please provide a valid email address.
              </div>
            )}
          </div>
          <div ref={widgetRef} aria-label="Human verification" className="flex justify-center" />
          <button
            type="submit"
            className={`button relative w-full transform overflow-hidden rounded-full border border-neutral-700 px-6 py-3 text-center transition duration-500 ${
              !isFormValid || !challengeToken || !siteKey
                ? "bg-blue-500/20 text-neutral-400 cursor-not-allowed"
                : "bg-blue-500 text-neutral-950 hover:text-neutral-50"
            } ${
              isSubmitting ? `cursor-wait bg-blue-500/20 text-neutral-400` : ``
            }`}
            disabled={!isFormValid || !challengeToken || !siteKey || isSubmitting}
          >
            <div className="group relative z-10">
              {isSubmitting ? "Sending..." : "Download Ebook"}
            </div>
          </button>
        </form>
        <div id="result" className="mt-3 text-center text-neutral-50">
          {result}
        </div>
        <button onClick={closeExitIntentPopup} className="mt-4 px-4 py-2 text-gray-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default ExitIntentPopup;