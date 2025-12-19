import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { skills, currentRole, targetRole, experience } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert career advisor and tech stack specialist. Analyze the user's skills and provide detailed, actionable recommendations.

You MUST respond with valid JSON in this exact format:
{
  "usefulStacks": [
    {
      "name": "Stack Name",
      "reason": "Why this stack is valuable",
      "synergy": "How it connects to their existing skills"
    }
  ],
  "avoidStacks": [
    {
      "name": "Stack Name", 
      "reason": "Why to avoid or deprioritize this"
    }
  ],
  "roadmap": [
    {
      "phase": "Phase 1: Foundation",
      "duration": "2-4 weeks",
      "skills": ["Skill 1", "Skill 2"],
      "resources": [
        {
          "title": "Resource Title",
          "url": "https://example.com",
          "type": "course|documentation|tutorial|book"
        }
      ]
    }
  ],
  "summary": "Brief personalized summary of the learning path"
}

Provide 4-6 useful stacks, 3-4 stacks to avoid, and 4-6 roadmap phases. Use real, working URLs for resources (official docs, freeCodeCamp, Udemy, Coursera, YouTube tutorials, etc).`;

    const userPrompt = `Analyze this career profile and provide stack recommendations:

Current Skills: ${skills}
Current Role: ${currentRole || "Not specified"}
Target Role: ${targetRole}
Years of Experience: ${experience || "Not specified"}

Provide useful technologies to learn, technologies to avoid or deprioritize, and a complete learning roadmap with real resource links.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to get AI response");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse AI response");
    }

    const analysis = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-career function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
