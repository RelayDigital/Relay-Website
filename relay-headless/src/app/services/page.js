export const metadata = {
  title: "Services — Relay Digital",
  description:
    "Software development, automation, AI systems, digital marketing, ecommerce, and consulting services from Relay Digital.",
};

const services = [
  {
    number: "01",
    name: "Software Development",
    description:
      "Full-stack development for web applications, SaaS platforms, and internal tools. We design, build, and ship production software.",
    deliverables: [
      "Custom web applications, SaaS platforms, internal tools",
      "Full-stack development (Next.js, React, Node, Python)",
      "API design and integration",
      "Database architecture and cloud infrastructure",
    ],
  },
  {
    number: "02",
    name: "Automation & AI Systems",
    description:
      "Workflow automation and AI-powered tools that eliminate manual processes and scale operations.",
    deliverables: [
      "Workflow automation (n8n, Zapier, custom)",
      "AI-powered tools and agents",
      "Data pipelines and scraping infrastructure",
      "CRM and operations automation",
    ],
  },
  {
    number: "03",
    name: "Digital Marketing & Media",
    description:
      "Strategy, execution, and optimization across paid and organic channels.",
    deliverables: [
      "Marketing funnels and landing pages",
      "Content strategy and production",
      "Paid media management",
      "Conversion rate optimization",
    ],
  },
  {
    number: "04",
    name: "Ecommerce Development",
    description:
      "Storefront development, product strategy, and revenue optimization for online brands.",
    deliverables: [
      "Shopify, custom storefronts",
      "Product strategy and merchandising",
      "AOV and retention optimization",
    ],
  },
  {
    number: "05",
    name: "Business Development & Consulting",
    description:
      "Strategic advisory for companies looking to build infrastructure, enter markets, or scale operations.",
    deliverables: [
      "Go-to-market strategy",
      "Operational infrastructure design",
      "Revenue model development",
      "Partnership and growth advisory",
    ],
  },
  {
    number: "06",
    name: "Talent Acquisition",
    description:
      "Sourcing and placement operations with performance-based models.",
    deliverables: [
      "Remote sales rep sourcing and placement",
      "Content-driven recruitment pipelines",
      "Performance-based talent models",
    ],
  },
];

const ServicesPage = () => {
  return (
    <div className="bg-grid-white/[0.05]">
      <div className="mx-auto max-w-7xl px-5">
        {/* HERO */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4">
            01 &middot; SERVICES
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-neutral-50 max-w-3xl leading-tight">
            What We Build and Operate
          </h1>
          <p className="mt-6 text-neutral-300 max-w-2xl leading-relaxed font-red-hat-text">
            Services are organized by capability. Pricing and scope are
            determined per engagement.
          </p>
        </section>

        {/* SERVICE BLOCKS */}
        {services.map((service) => (
          <section
            key={service.number}
            className="py-16 md:py-20 border-t border-neutral-800"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4">
              {service.number} &middot; SERVICE
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-50">
              {service.name}
            </h2>
            <p className="mt-4 text-neutral-300 max-w-2xl leading-relaxed font-red-hat-text">
              {service.description}
            </p>
            <ul className="mt-6 space-y-2">
              {service.deliverables.map((item, i) => (
                <li
                  key={i}
                  className="text-neutral-400 text-sm flex items-start gap-2 font-red-hat-text"
                >
                  <span className="text-blue-500 mt-0.5">&#8212;</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
