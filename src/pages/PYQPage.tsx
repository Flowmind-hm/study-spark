import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Upload, BarChart3, AlertTriangle, Target, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { FileUpload } from "@/components/upload/FileUpload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useDocuments } from "@/hooks/useDocuments";
import { usePYQAnalysis } from "@/hooks/usePYQAnalysis";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0ea5e9", "#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

const PYQPage = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedExam, setSelectedExam] = useState<"ct1" | "ct2" | "endsem">("ct1");
  const { documents, uploadDocument, isLoading: isUploading } = useDocuments("pyq");
  const { analysis, isAnalyzing, analyzeDocuments } = usePYQAnalysis();

  const handleAnalyze = async () => {
    await analyzeDocuments();
    setActiveTab("analysis");
  };

  const topicFrequencyData = analysis?.topicFrequency || [];
  const pieData = analysis?.topicDistribution || [];
  const predictions = analysis?.predictions || { ct1: [], ct2: [], endsem: [] };
  const studyRecommendation = analysis?.studyRecommendation || "";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-6 shadow-card">
              <TrendingUp className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              PYQ Analysis & Prediction
            </h1>
            <p className="text-lg text-muted-foreground">
              Analyze previous year questions to predict high-probability topics for your upcoming exams.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Upload PYQs</span>
                </TabsTrigger>
                <TabsTrigger value="analysis" className="flex items-center gap-2" disabled={!analysis}>
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Analysis</span>
                </TabsTrigger>
                <TabsTrigger value="predictions" className="flex items-center gap-2" disabled={!analysis}>
                  <Target className="w-4 h-4" />
                  <span className="hidden sm:inline">Predictions</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle>Upload Previous Year Questions</CardTitle>
                      <CardDescription>
                        Upload question papers and syllabus for trend analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-3 text-foreground">Previous Year Question Papers</h4>
                        <FileUpload onUpload={uploadDocument} isUploading={isUploading} />
                      </div>

                      {documents.length > 0 && (
                        <Button 
                          variant="hero" 
                          onClick={handleAnalyze}
                          disabled={isAnalyzing}
                        >
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Analyzing {documents.length} Document{documents.length > 1 ? "s" : ""}...
                            </>
                          ) : (
                            `Analyze ${documents.length} Document${documents.length > 1 ? "s" : ""}`
                          )}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="analysis">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {topicFrequencyData.length === 0 ? (
                    <Card variant="elevated">
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">No analysis data yet. Upload PYQs and run analysis first.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      <div className="grid lg:grid-cols-2 gap-6">
                        {/* Topic Frequency Chart */}
                        <Card variant="elevated">
                          <CardHeader>
                            <CardTitle>Topic Frequency Analysis</CardTitle>
                            <CardDescription>
                              Number of times each topic appeared in PYQs
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="h-80">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topicFrequencyData} layout="vertical">
                                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                                  <YAxis
                                    dataKey="topic"
                                    type="category"
                                    width={100}
                                    stroke="hsl(var(--muted-foreground))"
                                    tick={{ fontSize: 12 }}
                                  />
                                  <Tooltip
                                    contentStyle={{
                                      backgroundColor: "hsl(var(--card))",
                                      border: "1px solid hsl(var(--border))",
                                      borderRadius: "8px",
                                    }}
                                  />
                                  <Bar
                                    dataKey="frequency"
                                    fill="hsl(var(--primary))"
                                    radius={[0, 4, 4, 0]}
                                  />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Topic Distribution Pie Chart */}
                        <Card variant="elevated">
                          <CardHeader>
                            <CardTitle>Topic Distribution</CardTitle>
                            <CardDescription>
                              Weightage of different topics in exams
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="h-80">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={4}
                                    dataKey="value"
                                    label={({ name, value }) => `${name}: ${value}%`}
                                  >
                                    {pieData.map((entry, index) => (
                                      <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                      />
                                    ))}
                                  </Pie>
                                  <Tooltip
                                    contentStyle={{
                                      backgroundColor: "hsl(var(--card))",
                                      border: "1px solid hsl(var(--border))",
                                      borderRadius: "8px",
                                    }}
                                  />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Detailed Statistics */}
                      <Card variant="elevated">
                        <CardHeader>
                          <CardTitle>Detailed Statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {topicFrequencyData.map((topic) => (
                              <div
                                key={topic.topic}
                                className="p-4 rounded-xl bg-muted/50 border"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-foreground">{topic.topic}</span>
                                  <span className="text-sm text-primary font-semibold">
                                    {topic.percentage}%
                                  </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${topic.percentage}%` }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="h-full gradient-primary"
                                  />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                  Appeared {topic.frequency} times
                                </p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="predictions">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Disclaimer */}
                  <Card className="border-amber-500/30 bg-amber-500/5">
                    <CardContent className="flex items-start gap-4 py-4">
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Disclaimer</p>
                        <p className="text-sm text-muted-foreground">
                          These predictions are based on historical trends and pattern analysis. 
                          They are not guaranteed and should be used as a supplementary study guide. 
                          Always prepare all syllabus topics comprehensively.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {predictions.ct1.length === 0 && predictions.ct2.length === 0 && predictions.endsem.length === 0 ? (
                    <Card variant="elevated">
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">No predictions yet. Upload PYQs and run analysis first.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      {/* Exam Selector */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {(["ct1", "ct2", "endsem"] as const).map((exam) => (
                          <Button
                            key={exam}
                            variant={selectedExam === exam ? "hero" : "outline"}
                            onClick={() => setSelectedExam(exam)}
                          >
                            {exam === "ct1" && "CT-1"}
                            {exam === "ct2" && "CT-2"}
                            {exam === "endsem" && "End Semester"}
                          </Button>
                        ))}
                      </div>

                      {/* Predictions */}
                      <Card variant="elevated">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-primary" />
                            High-Probability Topics for{" "}
                            {selectedExam === "ct1" && "CT-1"}
                            {selectedExam === "ct2" && "CT-2"}
                            {selectedExam === "endsem" && "End Semester"}
                          </CardTitle>
                          <CardDescription>
                            Topics most likely to appear based on trend analysis
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {predictions[selectedExam].map((prediction, index) => (
                              <motion.div
                                key={prediction.topic}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border"
                              >
                                <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
                                    index === 0
                                      ? "gradient-primary text-primary-foreground"
                                      : index === 1
                                      ? "bg-secondary text-secondary-foreground"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-foreground">
                                      {prediction.topic}
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${
                                        prediction.probability >= 85
                                          ? "text-primary"
                                          : prediction.probability >= 75
                                          ? "text-secondary"
                                          : "text-muted-foreground"
                                      }`}
                                    >
                                      {prediction.probability}% likely
                                    </span>
                                  </div>
                                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${prediction.probability}%` }}
                                      transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                                      className={`h-full ${
                                        prediction.probability >= 85
                                          ? "gradient-primary"
                                          : prediction.probability >= 75
                                          ? "bg-secondary"
                                          : "bg-muted-foreground"
                                      }`}
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Study Recommendation */}
                      {studyRecommendation && (
                        <Card variant="elevated" className="border-primary/20 bg-primary/5">
                          <CardContent className="py-6">
                            <h4 className="font-display font-semibold text-foreground mb-3">
                              📚 Study Recommendation
                            </h4>
                            <p className="text-muted-foreground">
                              {studyRecommendation}
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </>
                  )}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PYQPage;
