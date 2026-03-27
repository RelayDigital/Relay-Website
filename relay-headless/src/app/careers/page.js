import Link from "next/link";

export const metadata = {
  title: "Careers — Relay Digital",
  description:
    "Join Relay Digital. Open roles across engineering, marketing, talent acquisition, and operations.",
};

const openRoles = [
  {
    title: "Talent Attraction Lead",
    division: "Talent Acquisition",
    type: "Performance-based",
    description:
      "Source and attract high-quality candidates through content-driven recruitment pipelines and outbound strategies.",
  },
];

const CareersPage = () => {
  return (
    <div className="bg-grid-white/[0.05]">
      <div className="mx-auto max-w-7xl px-5">
        {/* SECTION 01 — HERO */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4">
            01 &middot; CAREERS
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-neutral-50 max-w-3xl leading-tight">
            Work With Relay
          </h1>
          <p className="mt-6 text-neutral-300 max-w-2xl leading-relaxed font-red-hat-text">
            We&apos;re building a network of operators, creators, and
            technologists.
          </p>
        </section>

        {/* SECTION 02 — OPEN ROLES */}
        <section className="py-16 md:py-20 border-t border-neutral-800">
          <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4">
            02 &middot; OPEN ROLES
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-neutral-50">
            Current Openings
          </h2>
          <div className="mt-10 space-y-4">
            {openRoles.map((role, i) => (
              <div key={i} className="bg-neutral-900 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                  <h3 className="text-neutral-50 font-bold text-base">
                    {role.title}
                  </h3>
                  <div className="flex gap-3">
                    <span className="text-blue-500 text-xs font-medium">
                      {role.division}
                    </span>
                    <span className="text-neutral-500 text-xs">
                      {role.type}
                    </span>
                  </div>
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed font-red-hat-text">
                  {role.description}
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex text-blue-500 text-sm font-medium hover:text-blue-400 transition-colors"
                >
                  Learn More &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 03 — APPLICATION */}
        <section className="py-16 md:py-20 border-t border-neutral-800">
          <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4">
            03 &middot; APPLICATION
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-neutral-50">
            Apply
          </h2>
          <p className="mt-4 text-neutral-300 max-w-xl leading-relaxed font-red-hat-text">
            All roles are remote unless stated otherwise. To apply or inquire
            about opportunities, reach out through our contact page.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-neutral-50 text-sm font-medium rounded-full hover:bg-blue-600 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CareersPage;
