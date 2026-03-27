"use client";
import { useEffect, lazy, Suspense } from "react";
import Image from "next/image";
import CallToAction from "../../../components/layouts/home/sections/CallToAction";

const Contact = lazy(() => import("../../../components/layouts/home/sections/Contact"));
const CalendlyEmbed = lazy(() => import("../../../components/layouts/home/sections/CalendlyEmbed"));

export default function AutomationAIPage() {
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray("[data-speed]").forEach((el) => {
        let speed = parseFloat(el.getAttribute("data-speed"));
        gsap.fromTo(el, { y: 0 }, {
          y: 0, ease: "none",
          scrollTrigger: {
            trigger: el, start: "top bottom", end: "bottom top", scrub: true,
            onRefresh: (self) => {
              let start = Math.max(0, self.start);
              let distance = self.end - start;
              let end = start + distance / speed;
              self.setPositions(start, end);
              self.animation.vars.y = (end - start) * (1 - speed);
              self.animation.invalidate().progress(1).progress(self.progress);
            },
          },
        });
      });

      gsap.utils.toArray(".left, .right").forEach((image) => {
        const direction = image.classList.contains("left") ? 1 : -1;
        gsap.to(image, {
          x: () => direction * 50, ease: "expoScale",
          scrollTrigger: { trigger: image.parentElement, start: "top center", end: "bottom center", scrub: true },
        });
      });

      return () => ScrollTrigger.getAll().forEach((st) => st.kill());
    };
    loadGSAP();
  }, []);

  return (
    <div className="relative flex flex-col gap-10 bg-grid-white/[0.05]">
      {/* HERO */}
      <section className="relative mx-auto overflow-x-clip px-8 sm:px-16 md:px-24 lg:px-32 z-10">
        <div className="mb-6 mt-12 flex flex-col items-center text-center lg:mb-24 lg:mt-48 lg:grid lg:grid-cols-3">
          <div className="col-span-2 lg:mt-6 lg:mr-4">
            <div className="-z-10 max-w-4xl text-center text-neutral-200 text-3xl sm:text-5xl lg:text-start lg:text-7xl">
              <h1 className="md:bg-gradient-to-br md:from-neutral-100 md:from-55% md:to-neutral-500 md:bg-clip-text font-medium tracking-tight md:text-transparent text-neutral-100 lg:min-h-[20rem]" data-speed="0.5">
                Automate <span className="text-blue-500">Everything</span>. Build Intelligence
                <span className="text-blue-500">.</span>
              </h1>
            </div>
          </div>
          <div className="col-span-1 flex flex-col items-start justify-between gap-y-8 py-12 text-start lg:h-full">
            <p className="text-center text-xl leading-tight text-neutral-300 lg:text-start" data-speed="0.7">
              Custom automation systems and AI-powered tools that eliminate manual work, reduce errors, and let your team focus on growing the business. We build workflows that run 24/7.
            </p>
            <div className="block w-full justify-center md:flex md:flex-row lg:justify-start" data-speed="0.8">
              <a href="/contact" className="pointer-events-auto">
                <button className="relative rounded-full text-center transition-all duration-500 transform overflow-hidden z-40 w-full px-8 py-6 bg-blue-500 text-neutral-950 border border-blue-500 button hover:text-neutral-50 group text-xl uppercase md:text-2xl">
                  <div className="flex flex-row group relative z-10 w-full justify-center">
                    Automate Your Ops
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256" className="ml-2 inline-block"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"/></svg>
                  </div>
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute hidden md:block left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] w-max pointer-events-none" data-speed="0.6">
          <Image src="/svg/_image.svg" alt="circle background" className="h-auto w-[24rem] animate-spinSlow lg:w-[38rem] pointer-events-none" loading="eager" width={516} height={516} decoding="async" />
        </div>
      </section>

      {/* STATS */}
      <div className="mx-auto min-w-[75vw] px-6 lg:px-8">
        <dl className="relative z-40 mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-600 bg-neutral-600 text-center shadow-2xl shadow-blue-500/50 lg:grid-cols-4" data-speed="1.05">
          {[
            { value: "80%", label: "Average Time Saved" },
            { value: "500+", label: "Workflows Deployed" },
            { value: "24/7", label: "Always Running" },
            { value: "0", label: "Manual Errors" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center bg-neutral-900 px-2 py-6">
              <dt className="font-red-hat-text mt-1 text-base font-normal leading-tight tracking-tight text-neutral-300">{s.label}</dt>
              <dd className="font-proxima-nova order-first text-5xl font-semibold tracking-tight text-white lg:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* WHY — Alternating sections */}
      <section className="relative py-12 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-5">
          <div className="relative flex min-h-[30vh] flex-col items-center justify-center overflow-hidden w-full rounded-md z-0">
            <div className="relative z-50 flex flex-col items-center px-5">
              <h2 className="mt-2 text-3xl font-medium tracking-tight text-white sm:text-6xl text-center capitalize">
                <span className="bg-gradient-to-b from-neutral-50 from-60% to-neutral-400 bg-clip-text text-transparent lg:to-neutral-600">What We Automate</span>
              </h2>
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto px-6 lg:max-w-7xl lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="lg:pr-8 lg:pt-4">
                  <div className="lg:max-w-lg">
                    <h2 className="mt-2 text-3xl font-medium tracking-tight text-white sm:text-6xl">
                      <span className="bg-gradient-to-b from-neutral-50 from-60% to-neutral-400 bg-clip-text text-transparent lg:to-neutral-600">
                        Workflow{" "}
                        <span className="bg-gradient-to-b from-blue-500 from-60% to-blue-400 bg-clip-text text-transparent lg:to-blue-600 underline">Automation</span>{" "}
                        at Scale<span className="text-blue-500">.</span>
                      </span>
                    </h2>
                    <p className="text-md mt-6 font-light text-neutral-300 md:text-lg">
                      End-to-end process automation using n8n, Zapier, Make, and custom-built systems. Lead routing, CRM updates, reporting dashboards, inventory alerts — all running without human intervention.
                    </p>
                    <a href="/contact">
                      <button className="relative rounded-full text-center transition-all duration-500 transform overflow-hidden z-40 px-6 py-3 text-base bg-blue-500 text-neutral-950 border border-blue-500 button hover:text-neutral-50 group mt-6 text-lg uppercase">
                        <div className="group relative z-10 w-full">Get Started
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256" className="ml-2 inline-block"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"/></svg>
                        </div>
                      </button>
                    </a>
                  </div>
                </div>
                <div className="relative flex items-start justify-end">
                  <Image src="/img/increase-cr.webp" alt="Workflow automation" className="hidden sm:block right h-auto w-[24rem] max-w-none sm:w-[36rem] md:-ml-4 lg:-ml-0" loading="lazy" width={1217} height={1227} decoding="async" />
                  <Image src="/img/increase-cr.webp" alt="Workflow automation" className="block sm:hidden h-auto w-[24rem] max-w-none sm:w-[36rem]" loading="lazy" width={1217} height={1227} decoding="async" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative py-12 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="lg:ml-auto lg:pl-4 lg:pt-4">
                  <div className="lg:max-w-lg">
                    <h3 className="mt-2 text-3xl font-medium tracking-tight text-white sm:text-6xl">
                      <span className="bg-gradient-to-b from-neutral-50 from-60% to-neutral-400 bg-clip-text text-transparent lg:to-neutral-600">
                        Custom{" "}
                        <span className="bg-gradient-to-b from-blue-500 from-60% to-blue-400 bg-clip-text text-transparent lg:to-blue-600 underline">AI</span>{" "}
                        Tools & Agents<span className="text-blue-500">.</span>
                      </span>
                    </h3>
                    <p className="text-md mt-6 font-light text-neutral-300 md:text-lg">
                      Custom AI agents, chatbots, content generators, and decision-support tools built on GPT, Claude, and open-source models. We build AI that actually solves your specific business problems — not generic wrappers.
                    </p>
                    <a href="/contact">
                      <button className="relative rounded-full text-center transition-all duration-500 transform overflow-hidden z-40 px-6 py-3 text-base bg-blue-500 text-neutral-950 border border-blue-500 button hover:text-neutral-50 group mt-6 uppercase">
                        <div className="group relative z-10 w-full">Get Started
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256" className="ml-2 inline-block"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"/></svg>
                        </div>
                      </button>
                    </a>
                  </div>
                </div>
                <div className="relative -ml-5 flex items-start justify-end lg:order-first">
                  <Image src="/img/design.webp" alt="AI tools" className="hidden sm:block left h-auto w-[28rem] max-w-none sm:w-[40rem] md:-ml-4 lg:-ml-0" loading="lazy" width={1365} height={832} decoding="async" />
                  <Image src="/img/design.webp" alt="AI tools" className="block sm:hidden h-auto w-[28rem] max-w-none sm:w-[40rem] -mr-24" loading="lazy" width={1365} height={832} decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="border-y border-neutral-700 bg-neutral-900 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-5xl mb-8">
            <span className="bg-gradient-to-b from-neutral-50 from-60% to-neutral-400 bg-clip-text text-transparent lg:to-neutral-600">Tools & Platforms</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["n8n", "Zapier", "Make", "Python", "OpenAI", "Anthropic", "LangChain", "Puppeteer", "PostgreSQL", "Redis"].map((t) => (
              <span key={t} className="px-5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-full text-sm text-neutral-300 font-medium">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <CallToAction header="How many hours is your team wasting on manual work?" description="Let us audit your workflows and show you what can be automated." cta="Get a Free Workflow Audit" href="/contact" />

      <Suspense fallback={null}><CalendlyEmbed /></Suspense>
      <Suspense fallback={null}><Contact /></Suspense>
    </div>
  );
}
