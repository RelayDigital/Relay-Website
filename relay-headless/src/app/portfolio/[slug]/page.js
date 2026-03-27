import Link from "next/link";
import { notFound } from "next/navigation";

const portfolioData = {
  "virtual-xposure": {
    name: "Virtual Xposure",
    category: "Service",
    description:
      "Media and technology platform for real estate professionals. Virtual Xposure provides photography, videography, drone, and 3D tour services powered by a custom scheduling and delivery platform.",
    relationship: "Operational Partnership",
    services: [
      "Platform development",
      "Scheduling and delivery systems",
      "Media workflow automation",
    ],
  },
  vremly: {
    name: "Vremly",
    category: "SaaS",
    description:
      "SaaS marketplace platform connecting service providers with clients. Vremly enables digital service discovery, booking, and fulfillment through a unified platform.",
    relationship: "Built & Operated",
    services: [
      "Full-stack platform development",
      "Marketplace architecture",
      "Payment integration",
    ],
  },
  anavi: {
    name: "ANAVI",
    category: "SaaS",
    description:
      "Ecommerce marketplace and product platform. ANAVI (formerly Navi Marketplace) is a curated ecommerce experience focused on product discovery and brand partnerships.",
    relationship: "Built & Operated",
    services: [
      "Storefront development",
      "Product strategy",
      "Brand partnership systems",
    ],
  },
  ukii: {
    name: "Ukii",
    category: "Ecommerce",
    description:
      "Brutalist sculpture brand. Relay Digital provided ecommerce development and brand positioning services for Ukii's direct-to-consumer storefront.",
    relationship: "Client Engagement",
    services: [
      "Ecommerce development",
      "Brand positioning",
      "Storefront optimization",
    ],
  },
  "clean-screens": {
    name: "Clean Screens",
    category: "Ecommerce",
    description:
      "Ecommerce brand specializing in screen cleaning products. Relay Digital delivered conversion rate optimization and funnel development, resulting in a 39% increase in conversion rate and 44% ROI improvement.",
    relationship: "Client Engagement",
    services: [
      "Landing page development",
      "Conversion rate optimization",
      "Funnel architecture",
    ],
    metrics: [
      { label: "CR Increase", value: "+39%" },
      { label: "ROI Improvement", value: "+44%" },
      { label: "Speed Improvement", value: "+55%" },
      { label: "Bounce Reduction", value: "-21%" },
    ],
  },
  goodmix: {
    name: "GoodMix",
    category: "Ecommerce",
    description:
      "Ecommerce brand in the health and nutrition space. Relay Digital optimized landing pages and performance marketing channels, achieving a 54% conversion rate increase and 61% ROI improvement.",
    relationship: "Client Engagement",
    services: [
      "Landing page optimization",
      "Performance marketing",
      "Conversion rate optimization",
    ],
    metrics: [
      { label: "CR Increase", value: "+54%" },
      { label: "ROI Improvement", value: "+61%" },
      { label: "Speed Improvement", value: "+80%" },
      { label: "Bounce Reduction", value: "-38%" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(portfolioData).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const project = portfolioData[params.slug];
  if (!project) return {};
  return {
    title: `${project.name} — Relay Digital`,
    description: project.description,
  };
}

const PortfolioDetailPage = ({ params }) => {
  const project = portfolioData[params.slug];
  if (!project) notFound();

  return (
    <div className="bg-grid-white/[0.05]">
      <div className="mx-auto max-w-7xl px-5">
        {/* HERO */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <Link
            href="/portfolio"
            className="text-neutral-500 text-sm hover:text-neutral-300 transition-colors mb-6 inline-block"
          >
            &larr; Back to Portfolio
          </Link>
          <p className="text-blue-500 text-xs font-medium uppercase tracking-wider mb-3">
            {project.category}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-neutral-50 leading-tight">
            {project.name}
          </h1>
          <p className="mt-6 text-neutral-300 max-w-2xl leading-relaxed font-red-hat-text">
            {project.description}
          </p>
        </section>

        {/* DETAILS */}
        <section className="pb-20 border-t border-neutral-800 pt-16 md:pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">
                RELATIONSHIP
              </p>
              <p className="text-neutral-50 font-bold text-lg">
                {project.relationship}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">
                SERVICES PROVIDED
              </p>
              <ul className="space-y-2">
                {project.services.map((s, i) => (
                  <li
                    key={i}
                    className="text-neutral-300 text-sm flex items-start gap-2 font-red-hat-text"
                  >
                    <span className="text-blue-500 mt-0.5">&#8212;</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {project.metrics && (
            <div className="mt-16">
              <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-6">
                RESULTS
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.metrics.map((m, i) => (
                  <div key={i} className="bg-neutral-900 rounded-lg p-5">
                    <p className="text-blue-500 font-bold text-2xl">
                      {m.value}
                    </p>
                    <p className="text-neutral-500 text-xs uppercase tracking-wider mt-1">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PortfolioDetailPage;
