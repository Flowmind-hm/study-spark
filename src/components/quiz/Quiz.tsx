import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  id: string;
  question: string;
  type: "mcq" | "short";
  options?: string[];
  correctAnswer: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  title?: string;
  className?: string;
}

export const Quiz = ({ questions, title = "Quiz", className }: QuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [shortAnswer, setShortAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ correct: boolean; answer: string }[]>([]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const checkAnswer = () => {
    const userAnswer = currentQuestion.type === "mcq" ? selectedAnswer : shortAnswer;
    const isCorrect =
      userAnswer?.toLowerCase().trim() ===
      currentQuestion.correctAnswer.toLowerCase().trim();

    if (isCorrect) setScore((prev) => prev + 1);

    setAnswers((prev) => [
      ...prev,
      { correct: isCorrect, answer: userAnswer || "" },
    ]);
    setShowResult(true);
  };

  const nextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setShortAnswer("");
    setCurrentIndex((prev) => prev + 1);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShortAnswer("");
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  if (currentIndex >= questions.length) {
    return (
      <Card variant="elevated" className={cn("text-center p-8", className)}>
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground mb-2">
          Quiz Complete!
        </h3>
        <p className="text-lg text-muted-foreground mb-6">
          You scored{" "}
          <span className="font-bold text-primary">
            {score} / {questions.length}
          </span>
        </p>
        <div className="flex justify-center gap-2 mb-8">
          {answers.map((answer, i) => (
            <div
              key={i}
              className={cn(
                "w-3 h-3 rounded-full",
                answer.correct ? "bg-secondary" : "bg-destructive"
              )}
            />
          ))}
        </div>
        <Button variant="hero" onClick={resetQuiz}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className={className}>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </span>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-primary"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100}%`,
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>

        <AnimatePresence mode="wait">
          {currentQuestion.type === "mcq" && currentQuestion.options ? (
            <motion.div
              key="mcq"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(option)}
                  disabled={showResult}
                  className={cn(
                    "w-full p-4 rounded-xl border text-left transition-all",
                    selectedAnswer === option && !showResult
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50",
                    showResult &&
                      option === currentQuestion.correctAnswer &&
                      "border-secondary bg-secondary/10",
                    showResult &&
                      selectedAnswer === option &&
                      option !== currentQuestion.correctAnswer &&
                      "border-destructive bg-destructive/10"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showResult && option === currentQuestion.correctAnswer && (
                      <Check className="w-5 h-5 text-secondary" />
                    )}
                    {showResult &&
                      selectedAnswer === option &&
                      option !== currentQuestion.correctAnswer && (
                        <X className="w-5 h-5 text-destructive" />
                      )}
                  </div>
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="short"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <input
                type="text"
                value={shortAnswer}
                onChange={(e) => setShortAnswer(e.target.value)}
                disabled={showResult}
                placeholder="Type your answer..."
                className="w-full p-4 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              {showResult && (
                <p className="mt-2 text-sm">
                  <span className="text-muted-foreground">Correct answer: </span>
                  <span className="font-medium text-secondary">
                    {currentQuestion.correctAnswer}
                  </span>
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end gap-2">
          {!showResult ? (
            <Button
              variant="hero"
              onClick={checkAnswer}
              disabled={
                currentQuestion.type === "mcq"
                  ? !selectedAnswer
                  : !shortAnswer.trim()
              }
            >
              Check Answer
            </Button>
          ) : (
            <Button variant="hero" onClick={isLastQuestion ? nextQuestion : nextQuestion}>
              {isLastQuestion ? "See Results" : "Next Question"}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
