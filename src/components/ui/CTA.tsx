import Button from "./Button";

interface CTAProps {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  variant?: "default" | "dark" | "gradient";
  className?: string;
}

const variants = {
  default: "bg-emerald-50 text-gray-900",
  dark: "bg-emerald-800 text-white",
  gradient: "bg-gradient-to-r from-emerald-700 to-emerald-800 text-white",
};

export default function CTA({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = "gradient",
  className = "",
}: CTAProps) {
  const isDark = variant === "dark" || variant === "gradient";

  return (
    <section className={`${variants[variant]} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          
          {description && (
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? "text-emerald-100" : "text-gray-600"}`}>
              {description}
            </p>
          )}
          
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-wrap gap-4 justify-center">
              {primaryAction && (
                <Button
                  href={primaryAction.href}
                  variant={isDark ? "secondary" : "primary"}
                  size="lg"
                  external={primaryAction.external}
                >
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  href={secondaryAction.href}
                  variant="outline"
                  size="lg"
                  className={isDark ? "border-white text-white hover:bg-white/10" : ""}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
