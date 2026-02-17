import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
    Truck, Wheat, Users, Stethoscope,
    MapPin, Phone, Clock, DollarSign, Star,
    AlertTriangle, Briefcase, ChevronRight,
} from "lucide-react";

// Category config — each service type has a unique color and icon
const categoryConfig: Record<string, { color: string; bgColor: string; borderColor: string; icon: any; label: string }> = {
    transport: {
        color: "text-emerald-700",
        bgColor: "bg-emerald-50",
        borderColor: "border-l-emerald-500",
        icon: Truck,
        label: "Transporte",
    },
    supply: {
        color: "text-amber-700",
        bgColor: "bg-amber-50",
        borderColor: "border-l-amber-500",
        icon: Wheat,
        label: "Insumo",
    },
    staff: {
        color: "text-blue-700",
        bgColor: "bg-blue-50",
        borderColor: "border-l-blue-500",
        icon: Users,
        label: "Staff",
    },
    vet: {
        color: "text-rose-700",
        bgColor: "bg-rose-50",
        borderColor: "border-l-rose-500",
        icon: Stethoscope,
        label: "Veterinaria",
    },
};

interface ServiceCardProps {
    category: "transport" | "supply" | "staff" | "vet";
    title: string;
    subtitle?: string;
    details: { icon: any; label: string; value: string }[];
    badge?: string;
    price?: string;
    region?: string;
    href?: string;
    className?: string;
}

export function ServiceCard({
    category,
    title,
    subtitle,
    details,
    badge,
    price,
    region,
    href,
    className,
}: ServiceCardProps) {
    const config = categoryConfig[category];
    const Icon = config.icon;

    const card = (
        <div
            className={cn(
                "group relative bg-white rounded-xl border border-border/60 overflow-hidden",
                "hover:shadow-lg hover:border-border transition-all duration-300",
                "border-l-4",
                config.borderColor,
                className
            )}
        >
            <div className="p-5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", config.bgColor)}>
                            <Icon className={cn("w-5 h-5", config.color)} />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-semibold text-foreground text-sm leading-tight truncate group-hover:text-primary transition-colors">
                                {title}
                            </h3>
                            {subtitle && (
                                <p className="text-xs text-muted-foreground mt-0.5 truncate">{subtitle}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        {badge && (
                            <Badge variant="secondary" className={cn("text-[10px] font-medium", config.bgColor, config.color)}>
                                {badge}
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Details row */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-3">
                    {details.map((detail, i) => {
                        const DetailIcon = detail.icon;
                        return (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <DetailIcon className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">
                                    <span className="text-muted-foreground/70">{detail.label}:</span>{" "}
                                    <span className="font-medium text-foreground/80">{detail.value}</span>
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-3 border-t border-border/40">
                    <div className="flex items-center gap-3">
                        {region && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{region}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {price && (
                            <span className="text-sm font-bold text-primary">{price}</span>
                        )}
                        <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                </div>
            </div>
        </div>
    );

    if (href) {
        return <Link href={href}>{card}</Link>;
    }
    return card;
}

// ==========================================
// Category Landing Card (for /servicios page)
// ==========================================
interface CategoryCardProps {
    category: "transport" | "supply" | "staff" | "vet";
    title: string;
    description: string;
    href: string;
    count?: number;
}

export function CategoryCard({ category, title, description, href, count }: CategoryCardProps) {
    const config = categoryConfig[category];
    const Icon = config.icon;

    return (
        <Link href={href}>
            <div className={cn(
                "group relative bg-white rounded-2xl border border-border/60 p-8 overflow-hidden",
                "hover:shadow-xl hover:border-border hover:-translate-y-1 transition-all duration-300 cursor-pointer",
                "border-b-4",
                config.borderColor.replace("border-l-", "border-b-"),
            )}>
                <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110",
                    config.bgColor
                )}>
                    <Icon className={cn("w-8 h-8", config.color)} />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {description}
                </p>
                <div className="flex items-center justify-between">
                    {count !== undefined && (
                        <span className="text-xs text-muted-foreground">{count} publicaciones</span>
                    )}
                    <div className={cn(
                        "flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all",
                        config.color
                    )}>
                        Ver todo <ChevronRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
