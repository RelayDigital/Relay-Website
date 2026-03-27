import Link from "next/link";

export const metadata = {
  title: "Portfolio — Relay Digital",
  description:
    "Companies and projects built, operated, or invested in by Relay Digital.",
};

const portfolioItems = [
  {
    name: "Virtual Xposure",
    slug: "virtual-xposure",
    category: "Real Estate Media",
    description:
      "Media and technology platform for real estate professionals.",
  },
  {
    name: "Vremly",
    slug: "vremly",
    category: "SaaS",
    description: "SaaS marketplace platform for digital services.",
  },
  {
    name: "ANAVI",
    slug: "anavi",
    category: "Ecommerce",
    description: "Ecommerce marketplace and product platform.",
  },
  {
    name: "Ukii",
    slug: "ukii",
    category: "Ecommerce",
    description: "Brutalist sculpture brand — client engagement.",
  },
  {
    name: "Clean Screens",
    slug: "clean-screens",
    category: "Ecommerce",
    description:
      "Ecommerce brand — conversion rate optimization and funnel development.",
  },
  {
    name: "GoodMix",
    slug: "goodmix",
    category: "Ecommerce",
    description:
      "Ecommerce brand — landing page optimization and performance marketing.",
  },
];

const PortfolioPage = () => {
  return (
    <div className="bg-grid-white/[0.05]">
      <div className="mx-auto max-w-7xl px-5">
        {/* HERO */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4">
            01 &middot; PORTFOLIO
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-neutral-50 leading-tight">
            Portfolio
          </h1>
          <p className="mt-6 text-neutral-300 max-w-2xl leading-relaxed font-red-hat-text">
            Companies we&apos;ve built, operate, or hold equity in.
          </p>
        </section>

        {/* GRID */}
        <section className="pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioItems.map((item) => (
              <Link
                key={item.slug}
                href={`/portfolio/${item.slug}`}
                className="group bg-neutral-900 rounded-lg p-6 border border-transparent hover:border-blue-500 transition-all duration-200"
              >
                <div className="h-36 bg-neutral-800 rounded mb-4 flex items-center justify-center">
                  <span className="text-neutral-500 text-xs uppercase tracking-widest">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-neutral-50 font-bold text-base mb-1">
                  {item.name}
                </h3>
                <span className="inline-block text-blue-500 text-xs font-medium mb-2">
                  {item.category}
                </span>
                <p className="text-neutral-400 text-sm font-red-hat-text">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioPage;
