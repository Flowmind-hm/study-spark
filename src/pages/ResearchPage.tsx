import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, MessageSquare, GitBranch, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { FileUpload } from "@/components/upload/FileUpload";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { MermaidDiagram } from "@/components/mermaid/MermaidDiagram";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sampleFlowchart = `flowchart TD
    A[Research Question] --> B[Literature Review]
    B --> C[Hypothesis Formation]
    C --> D[Research Design]
    D --> E{Methodology}
    E --> F[Quantitative]
    E --> G[Qualitative]
    F --> H[Data Collection]
    G --> H
    H --> I[Data Analysis]
    I --> J[Results]
    J --> K[Conclusion]
`;

const ResearchPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState("upload");

  const handleFilesChange = (files: File[]) => {
    setUploadedFiles((prev) => [...prev, ...files]);
  };

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
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-card">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Research Paper Analysis
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload your research papers and get AI-powered insights, summaries, and methodology flowcharts.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Upload</span>
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">Chat</span>
                </TabsTrigger>
                <TabsTrigger value="summary" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Summary</span>
                </TabsTrigger>
                <TabsTrigger value="flowchart" className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  <span className="hidden sm:inline">Flowchart</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle>Upload Research Papers</CardTitle>
                      <CardDescription>
                        Upload PDF, DOCX, or image files of your research papers
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FileUpload onFilesChange={handleFilesChange} />
                      {uploadedFiles.length > 0 && (
                        <div className="mt-6">
                          <Button
                            variant="hero"
                            onClick={() => setActiveTab("chat")}
                          >
                            Analyze {uploadedFiles.length} Document{uploadedFiles.length > 1 ? "s" : ""}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="chat">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card variant="elevated" className="h-[600px] overflow-hidden">
                    <ChatInterface
                      placeholder="Ask about your research papers..."
                      className="h-full"
                    />
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="summary">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle>Research Summary</CardTitle>
                      <CardDescription>
                        AI-generated summary of your uploaded papers
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none text-foreground">
                        <p className="text-muted-foreground italic">
                          Upload research papers and click "Analyze" to generate a comprehensive summary. 
                          The AI will extract key findings, methodology, and conclusions.
                        </p>
                        <div className="mt-6 p-6 rounded-xl bg-muted/50 border border-dashed">
                          <h4 className="font-display font-semibold mb-2">What you'll get:</h4>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>• Abstract and key findings extraction</li>
                            <li>• Methodology breakdown</li>
                            <li>• Results and conclusions summary</li>
                            <li>• Citation-ready key points</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="flowchart">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle>Methodology Flowchart</CardTitle>
                      <CardDescription>
                        Visual representation of research methodology
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MermaidDiagram chart={sampleFlowchart} />
                      <p className="mt-4 text-sm text-muted-foreground text-center">
                        This is a sample flowchart. Upload your papers to generate custom methodology diagrams.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResearchPage;
