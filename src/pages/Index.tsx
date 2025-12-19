import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { ArrowRight, Sparkles, Target, Map, Lightbulb, Zap, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-[0.02]" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-accent/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: "1s" }} />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary animate-fade-in">
              <Sparkles className="h-4 w-4" />
              AI-Powered Career Guidance
            </div>
            
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl animate-fade-up">
              Navigate Your
              <br />
              <span className="text-gradient-primary">Tech Career</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Enter your skills and target role. Get personalized recommendations on which tech stacks to learn, which to avoid, and a complete roadmap with resources.
            </p>
            
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/create">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="glass" size="xl" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Everything You Need to <span className="text-gradient-primary">Level Up</span>
            </h2>
            <p className="text-muted-foreground">
              Our AI analyzes your current skills and career goals to provide actionable insights.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Target className="h-6 w-6" />}
              title="Useful Stacks"
              description="Discover technologies that perfectly complement your existing skills and career goals."
              delay="0s"
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Avoid Pitfalls"
              description="Know which technologies to deprioritize based on market trends and your objectives."
              delay="0.1s"
            />
            <FeatureCard
              icon={<Map className="h-6 w-6" />}
              title="Complete Roadmap"
              description="Get a step-by-step learning path with phases, timelines, and milestones."
              delay="0.2s"
            />
            <FeatureCard
              icon={<Lightbulb className="h-6 w-6" />}
              title="Curated Resources"
              description="Access handpicked tutorials, courses, and documentation for each skill."
              delay="0.3s"
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="AI-Powered"
              description="Leveraging advanced AI to provide personalized, context-aware recommendations."
              delay="0.4s"
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6" />}
              title="Instant Results"
              description="Get comprehensive analysis in seconds, not hours of research."
              delay="0.5s"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-card border border-border/50 p-12 text-center glow-primary">
            <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.03]" />
            <div className="relative">
              <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                Ready to Shape Your Future?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                Join thousands of developers who have accelerated their careers with personalized stack recommendations.
              </p>
              <Link to="/create">
                <Button variant="hero" size="xl">
                  Get Your Roadmap Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} StackPath. AI-powered career guidance.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}) => (
  <div 
    className="group relative overflow-hidden rounded-2xl bg-gradient-card border border-border/50 p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg animate-fade-up"
    style={{ animationDelay: delay }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    <div className="relative">
      <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default Index;
