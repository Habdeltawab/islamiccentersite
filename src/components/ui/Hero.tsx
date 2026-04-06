import Button from "./Button";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  address?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  backgroundClass?: string;
  centered?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "py-16",
  md: "py-24",
  lg: "py-32",
};

export default function Hero({
  title,
  subtitle,
  description,
  address,
  primaryAction,
  secondaryAction,
  backgroundClass = "bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800",
  centered = true,
  size = "lg",
}: HeroProps) {
  return (
    <section className={`relative ${backgroundClass} text-white ${sizeStyles[size]}`}>
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${centered ? "text-center" : ""}`}>
        {subtitle && (
          <p className="text-emerald-300 text-lg font-medium mb-4 tracking-wide uppercase">
            {subtitle}
          </p>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        
        {description && (
          <p className={`text-xl md:text-2xl text-emerald-100/70 mb-8 leading-relaxed ${centered ? "max-w-3xl mx-auto" : "max-w-2xl"}`}>
            {description}
          </p>
        )}

        {address && (
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block text-lg font-medium text-white mb-8 underline underline-offset-4 decoration-emerald-300 hover:decoration-white transition-colors ${centered ? "mx-auto" : ""}`}
          >
            📍 {address}
          </a>
        )}
        
        {(primaryAction || secondaryAction) && (
          <div className={`flex flex-wrap gap-4 ${centered ? "justify-center" : ""}`}>
            {primaryAction && (
              <Button
                href={primaryAction.href}
                variant="secondary"
                size="lg"
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                href={secondaryAction.href}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
