interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  background?: "white" | "gray" | "emerald" | "amber";
  padding?: "sm" | "md" | "lg";
  className?: string;
  id?: string;
}

const backgrounds = {
  white: "bg-white",
  gray: "bg-gray-50",
  emerald: "bg-emerald-50",
  amber: "bg-amber-50",
};

const paddings = {
  sm: "py-12",
  md: "py-16",
  lg: "py-24",
};

export default function Section({
  children,
  title,
  subtitle,
  description,
  background = "white",
  padding = "lg",
  className = "",
  id,
}: SectionProps) {
  return (
    <section 
      id={id}
      className={`${backgrounds[background]} ${paddings[padding]} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle || description) && (
          <div className="text-center mb-12">
            {subtitle && (
              <p className="text-emerald-700 font-semibold text-sm uppercase tracking-wide mb-2">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
