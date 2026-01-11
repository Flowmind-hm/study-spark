import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: "#0ea5e9",
    primaryTextColor: "#fff",
    primaryBorderColor: "#0284c7",
    lineColor: "#64748b",
    secondaryColor: "#14b8a6",
    tertiaryColor: "#f8fafc",
    fontFamily: "Inter, sans-serif",
  },
  flowchart: {
    htmlLabels: true,
    curve: "basis",
    padding: 20,
  },
});

export const MermaidDiagram = ({ chart, className }: MermaidDiagramProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!containerRef.current || !chart) return;

      setIsLoading(true);
      setError(null);

      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        containerRef.current.innerHTML = svg;
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError("Failed to render diagram");
      } finally {
        setIsLoading(false);
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className={cn("flex items-center justify-center p-8 bg-destructive/10 rounded-xl border border-destructive/20", className)}>
        <p className="text-destructive text-sm">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("relative overflow-auto rounded-xl bg-card border shadow-soft p-4", className)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/80">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}
      <div ref={containerRef} className="flex justify-center [&>svg]:max-w-full" />
    </motion.div>
  );
};
