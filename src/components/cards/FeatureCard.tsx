import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient?: "primary" | "secondary" | "accent";
  delay?: number;
}

export const FeatureCard = ({
  title,
  description,
  icon: Icon,
  href,
  gradient = "primary",
  delay = 0,
}: FeatureCardProps) => {
  const gradientClasses = {
    primary: "gradient-primary",
    secondary: "bg-secondary",
    accent: "gradient-accent",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link to={href}>
        <Card variant="interactive" className="h-full group">
          <CardHeader>
            <div
              className={`w-14 h-14 rounded-2xl ${gradientClasses[gradient]} flex items-center justify-center shadow-card mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <CardTitle className="group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <CardDescription className="text-base">{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
              Get started
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
                →
              </motion.span>
            </span>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
