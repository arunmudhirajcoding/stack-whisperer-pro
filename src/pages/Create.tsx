import { useState } from "react";
import Header from "@/components/Header";
import SkillsForm from "@/components/SkillsForm";
import Results from "@/components/Results";

export interface AnalysisResult {
  usefulStacks: Array<{
    name: string;
    reason: string;
    synergy: string;
  }>;
  avoidStacks: Array<{
    name: string;
    reason: string;
  }>;
  roadmap: Array<{
    phase: string;
    duration: string;
    skills: string[];
    resources: Array<{
      title: string;
      url: string;
      type: string;
    }>;
  }>;
  summary: string;
}

const Create = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {!result ? (
          <SkillsForm 
            onResult={setResult} 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <Results result={result} onReset={handleReset} />
        )}
      </main>
    </div>
  );
};

export default Create;
