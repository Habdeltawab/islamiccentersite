import Link from "next/link";

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  icon?: string;
  href?: string;
  image?: string;
  imageAlt?: string;
  variant?: "default" | "elevated" | "bordered" | "featured";
  className?: string;
}

const variants = {
  default: "bg-white rounded-xl p-6",
  elevated: "bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow",
  bordered: "bg-white rounded-xl p-6 border border-gray-200 hover:border-emerald-300 transition-colors",
  featured: "bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-8 border border-emerald-200",
};

export default function Card({
  children,
  title,
  description,
  icon,
  href,
  image,
  imageAlt,
  variant = "bordered",
  className = "",
}: CardProps) {
  const content = (
    <>
      {image && (
        <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-xl">
          <img 
            src={image} 
            alt={imageAlt || title || "Card image"} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {icon && (
        <div className="text-4xl mb-4">{icon}</div>
      )}
      
      {title && (
        <h3 className={`font-semibold text-gray-900 mb-2 ${href ? "group-hover:text-emerald-700 transition-colors" : ""}`}>
          {title}
        </h3>
      )}
      
      {description && (
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      )}
      
      {children}
    </>
  );

  const cardStyles = `${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={`block group ${cardStyles}`}>
        {content}
      </Link>
    );
  }

  return (
    <div className={cardStyles}>
      {content}
    </div>
  );
}

// Grid wrapper for cards
export function CardGrid({ 
  children, 
  columns = 3,
  className = "" 
}: { 
  children: React.ReactNode; 
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {children}
    </div>
  );
}
