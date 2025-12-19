import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Briefcase, Target, Clock, Code } from "lucide-react";
import type { AnalysisResult } from "@/pages/Create";

interface SkillsFormProps {
  onResult: (result: AnalysisResult) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SkillsForm = ({ onResult, isLoading, setIsLoading }: SkillsFormProps) => {
  const [skills, setSkills] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [experience, setExperience] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!skills.trim() || !targetRole.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your skills and target role.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-career`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            skills,
            currentRole,
            targetRole,
            experience,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to analyze career path");
      }

      const data = await response.json();
      onResult(data);
      
      toast({
        title: "Analysis Complete!",
        description: "Your personalized roadmap is ready.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
          <Code className="h-4 w-4" />
          Career Analysis
        </div>
        <h1 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
          Tell Us About <span className="text-gradient-primary">Your Skills</span>
        </h1>
        <p className="text-muted-foreground">
          Enter your current skills and career goals. Our AI will analyze and provide personalized recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl bg-gradient-card border border-border/50 p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="skills" className="flex items-center gap-2 text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Your Current Skills *
            </Label>
            <Textarea
              id="skills"
              placeholder="e.g., JavaScript, React, HTML, CSS, Node.js, Git, REST APIs..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="min-h-[120px] bg-background/50 border-border/50 focus:border-primary/50"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              List all your technical skills, programming languages, frameworks, and tools.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="currentRole" className="flex items-center gap-2 text-foreground">
                <Briefcase className="h-4 w-4 text-primary" />
                Current Role
              </Label>
              <Input
                id="currentRole"
                placeholder="e.g., Junior Frontend Developer"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary/50"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="flex items-center gap-2 text-foreground">
                <Clock className="h-4 w-4 text-primary" />
                Years of Experience
              </Label>
              <Input
                id="experience"
                placeholder="e.g., 2 years"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary/50"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetRole" className="flex items-center gap-2 text-foreground">
              <Target className="h-4 w-4 text-primary" />
              Target Role *
            </Label>
            <Input
              id="targetRole"
              placeholder="e.g., Senior Full-Stack Developer, DevOps Engineer, ML Engineer..."
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="bg-background/50 border-border/50 focus:border-primary/50"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              What role or position are you aiming for?
            </p>
          </div>
        </div>

        <Button
          type="submit"
          variant="hero"
          size="xl"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Analyzing Your Path...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate My Roadmap
            </>
          )}
        </Button>
      </form>

      {isLoading && (
        <div className="mt-8 rounded-2xl bg-gradient-card border border-border/50 p-8 text-center animate-fade-in">
          <div className="mb-4 inline-flex rounded-full bg-primary/20 p-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
          <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
            AI is analyzing your profile...
          </h3>
          <p className="text-sm text-muted-foreground">
            We're evaluating your skills, market trends, and creating a personalized roadmap.
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
