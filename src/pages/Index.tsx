import { motion } from "framer-motion";
import { FileText, Brain, TrendingUp, Sparkles, Upload, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { FileUpload } from "@/components/upload/FileUpload";
import { Link } from "react-router-dom";
import heroIllustration from "@/assets/hero-illustration.png";

const features = [
  {
    title: "Research Paper Analysis",
    description: "Upload research papers and get AI-powered summaries, methodology flowcharts, and instant answers.",
    icon: FileText,
    href: "/research",
    gradient: "primary" as const,
  },
  {
    title: "Exam Notes Assistant",
    description: "Transform your notes into quizzes, flashcards, and concept maps for effective revision.",
    icon: Brain,
    href: "/notes",
    gradient: "secondary" as const,
  },
  {
    title: "PYQ Analysis & Prediction",
    description: "Analyze previous year questions to predict high-probability topics for upcoming exams.",
    icon: TrendingUp,
    href: "/pyq",
    gradient: "accent" as const,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  AI-Powered Study Platform
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6"
            >
              Study Smarter with{" "}
              <span className="text-gradient">AI-Powered</span> Document Analysis
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Upload your research papers, notes, and question papers. Get instant summaries, 
              generate quizzes, create flashcards, and predict exam topics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/research">
                <Button variant="hero" size="xl">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Documents
                </Button>
              </Link>
              <Link to="/notes">
                <Button variant="hero-outline" size="xl">
                  <Zap className="w-5 h-5 mr-2" />
                  Try Exam Assistant
                </Button>
              </Link>
            </motion.div>

            {/* Hero Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12"
            >
              <img
                src={heroIllustration}
                alt="AI-powered study platform illustration"
                className="w-full max-w-3xl mx-auto rounded-2xl shadow-elevated"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Upload Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                Quick Upload
              </h2>
              <p className="text-muted-foreground">
                Drop your documents here to get started immediately
              </p>
            </div>
            <FileUpload />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Everything You Need to Ace Your Exams
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three powerful tools designed specifically for students
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={0.6 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              {[
                { value: "RAG", label: "Powered Analysis" },
                { value: "AI", label: "Generated Quizzes" },
                { value: "Smart", label: "Topic Prediction" },
                { value: "Fast", label: "Document Processing" },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Built for students, by students. Study smarter, not harder.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
