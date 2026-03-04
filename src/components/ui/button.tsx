import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 🎨 DÉFINITION DU DESIGN SYSTEM PREMIUM
const buttonVariants = cva(
  // Classes de base : Alignement strict, typographie Semibold, coins très arrondis, transition fluide, désactivation propre
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold tracking-tight transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        // PRIMAIRE : Volume, ombre multicouche, effet d'élévation
        primary: 
          "bg-brand-primary text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,86,210,0.15)] hover:bg-brand-primary/95 hover:shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_20px_rgba(0,86,210,0.25)] hover:-translate-y-0.5",
        // SECONDAIRE : Fond gris très subtil, texte principal, ombre légère
        secondary: 
          "bg-surface-dark text-text-main shadow-sm border border-gray-100 hover:bg-gray-100/80 hover:border-gray-200 hover:shadow",
        // OUTLINE : Épuré, bordure fine, changement de couleur net
        outline: 
          "border border-gray-200 bg-transparent text-text-main hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5",
        // GHOST : Très discret, pas de fond sauf au survol
        ghost: 
          "text-text-muted hover:bg-surface-dark hover:text-text-main",
        // LINK : Simple lien souligné
        link: 
          "text-brand-primary underline-offset-4 hover:underline px-0",
      },
      size: {
        default: "h-11 px-6 py-2",      // Standard
        sm: "h-9 rounded-full px-4 text-xs", // Interface dense
        lg: "h-14 rounded-full px-10 text-base gap-2.5", // Hero & CTA (Taille augmentée pour le Hero)
        icon: "h-11 w-11",              // Carré pour icône seule
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };