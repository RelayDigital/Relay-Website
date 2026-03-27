export const metadata = {
  title: "About — Relay Digital",
  description:
    "Relay Digital is a technology holding company that builds, operates, and invests in software platforms and digital infrastructure.",
};

const AboutPage = () => {
  return (
    <div className="bg-grid-white/[0.05]">
      <div className="mx-auto max-w-7xl px-5">
        {/* SECTION 01 — HERO */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4">
            01 &middot; ABOUT
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-neutral-50 max-w-3xl leading-tight">
            About Relay Digital
          </h1>
          <div className="mt-8 max-w-2xl space-y-4 font-red-hat-text">
            <p className="text-neutral-300 leading-relaxed">
              Relay Digital is a technology and digital infrastructure company
              engaged in the development, operation, and commercialization of
              software platforms, digital products, and technology-enabled
              services. The company designs, builds, licenses, and manages SaaS
              solutions, automation systems, and data-driven tools across
              various industries.
            </p>
            <p className="text-neutral-300 leading-relaxed">
              The company also provides digital marketing, media, and consulting
              services, and acquires, invests in, holds equity in, or operates
              subsidiary businesses, portfolio companies, and intellectual
              property assets.
            </p>
            <p className="text-neutral-300 leading-relaxed">
              Relay Digital is building toward a portfolio holding structure —
              combining owned operations with equity-backed companies across
              technology, automation, and digital services.
            </p>
          </div>
        </section>

        {/* SECTION 02 — HOW WE OPERATE */}
        <section className="py-16 md:py-20 border-t border-neutral-800">
          <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4">
            02 &middot; HOW WE OPERATE
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-neutral-50">
            The Operating Model
          </h2>
          <p className="mt-4 text-neutral-300 max-w-2xl leading-relaxed font-red-hat-text">
            Relay Digital operates as a holding company — we build and run our
            own products, take equity in companies we help grow, and provide
            technology and operational infrastructure as a service.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-neutral-900 rounded-lg p-6 border-t-2 border-blue-500">
              <h3 className="text-neutral-50 font-bold text-base mb-3">
                Build & Operate
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-red-hat-text">
                Active products, platforms, and services developed and managed
                in-house. From SaaS tools to automation infrastructure, we own
                the full lifecycle.
              </p>
            </div>
            <div className="bg-neutral-900 rounded-lg p-6 border-t-2 border-blue-500">
              <h3 className="text-neutral-50 font-bold text-base mb-3">
                Invest & Grow
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-red-hat-text">
                Equity positions in companies we help scale. Strategic
                investment, operational support, and infrastructure access for
                portfolio companies.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 03 — VISION */}
        <section className="py-16 md:py-20 border-t border-neutral-800">
          <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4">
            04 &middot; VISION
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-neutral-50">
            Long-Term Direction
          </h2>
          <p className="mt-4 text-neutral-300 max-w-2xl leading-relaxed font-red-hat-text">
            Relay Digital is building toward a portfolio holding structure with
            owned and equity-backed companies across technology, automation, and
            digital services — future-proofed for institutional capital and M&A
            activity.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
