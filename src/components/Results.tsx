import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, XCircle, ExternalLink, BookOpen, Video, FileText, GraduationCap } from "lucide-react";
import type { AnalysisResult } from "@/pages/Create";

interface ResultsProps {
  result: AnalysisResult;
  onReset: () => void;
}

const Results = ({ result, onReset }: ResultsProps) => {
  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "course":
        return <GraduationCap className="h-4 w-4" />;
      case "video":
      case "tutorial":
        return <Video className="h-4 w-4" />;
      case "documentation":
        return <FileText className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <Button variant="ghost" onClick={onReset} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Start Over
        </Button>
      </div>

      {/* Summary */}
      <div className="mb-10 rounded-2xl bg-gradient-card border border-primary/30 p-6 glow-primary">
        <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
          Your <span className="text-gradient-primary">Personalized Summary</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">{result.summary}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Useful Stacks */}
        <div className="rounded-2xl bg-gradient-card border border-border/50 p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-lg bg-success/20 p-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              Recommended Stacks
            </h3>
          </div>
          <div className="space-y-4">
            {result.usefulStacks.map((stack, index) => (
              <div
                key={index}
                className="rounded-xl bg-background/50 border border-success/20 p-4 transition-all hover:border-success/40"
              >
                <h4 className="mb-1 font-semibold text-foreground">{stack.name}</h4>
                <p className="mb-2 text-sm text-muted-foreground">{stack.reason}</p>
                <p className="text-xs text-success">
                  <span className="font-medium">Synergy:</span> {stack.synergy}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Avoid Stacks */}
        <div className="rounded-2xl bg-gradient-card border border-border/50 p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-lg bg-destructive/20 p-2">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              Deprioritize These
            </h3>
          </div>
          <div className="space-y-4">
            {result.avoidStacks.map((stack, index) => (
              <div
                key={index}
                className="rounded-xl bg-background/50 border border-destructive/20 p-4 transition-all hover:border-destructive/40"
              >
                <h4 className="mb-1 font-semibold text-foreground">{stack.name}</h4>
                <p className="text-sm text-muted-foreground">{stack.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="mt-10">
        <h3 className="mb-6 font-display text-2xl font-bold text-foreground">
          Your Learning <span className="text-gradient-primary">Roadmap</span>
        </h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/30 hidden md:block" />
          
          <div className="space-y-6">
            {result.roadmap.map((phase, index) => (
              <div key={index} className="relative pl-0 md:pl-16">
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 hidden md:flex h-4 w-4 items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-primary glow-primary" />
                </div>
                
                <div className="rounded-2xl bg-gradient-card border border-border/50 p-6 transition-all hover:border-primary/30">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                      {phase.phase}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {phase.duration}
                    </span>
                  </div>
                  
                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-medium text-foreground">Skills to Learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {phase.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Resources */}
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-foreground">Resources:</h4>
                    <div className="space-y-2">
                      {phase.resources.map((resource, resIndex) => (
                        <a
                          key={resIndex}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg bg-background/50 border border-border/50 px-3 py-2 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground group"
                        >
                          <span className="text-primary">
                            {getResourceIcon(resource.type)}
                          </span>
                          <span className="flex-1">{resource.title}</span>
                          <span className="rounded bg-secondary px-2 py-0.5 text-xs capitalize">
                            {resource.type}
                          </span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-10 flex justify-center gap-4">
        <Button variant="hero" size="lg" onClick={onReset}>
          Analyze Another Profile
        </Button>
      </div>
    </div>
  );
};

export default Results;
