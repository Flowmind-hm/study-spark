import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardsProps {
  cards: Flashcard[];
  className?: string;
}

export const Flashcards = ({ cards, className }: FlashcardsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentIndex];

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (cards.length === 0) {
    return (
      <Card className={cn("p-8 text-center", className)}>
        <p className="text-muted-foreground">No flashcards available yet.</p>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Card Container */}
      <div
        className="relative h-64 md:h-80 perspective-1000 cursor-pointer"
        onClick={handleFlip}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentCard.id}-${isFlipped}`}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Card
              variant="elevated"
              className={cn(
                "h-full flex items-center justify-center p-8 text-center",
                isFlipped ? "gradient-primary" : "bg-card"
              )}
            >
              <div>
                <span
                  className={cn(
                    "text-xs font-medium uppercase tracking-wider mb-4 block",
                    isFlipped ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}
                >
                  {isFlipped ? "Answer" : "Question"}
                </span>
                <p
                  className={cn(
                    "text-xl md:text-2xl font-display font-semibold",
                    isFlipped ? "text-primary-foreground" : "text-foreground"
                  )}
                >
                  {isFlipped ? currentCard.answer : currentCard.question}
                </p>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={handlePrevious}>
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {cards.length}
          </span>
          <Button variant="ghost" size="sm" onClick={handleFlip}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Flip
          </Button>
        </div>

        <Button variant="outline" size="icon" onClick={handleNext}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-1.5">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsFlipped(false);
              setCurrentIndex(index);
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-muted hover:bg-muted-foreground/30"
            )}
          />
        ))}
      </div>
    </div>
  );
};
