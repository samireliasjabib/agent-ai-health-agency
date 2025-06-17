import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/remix";
import {
  Building2,
  Brain,
  BarChart3,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Bot,
  Sparkles,
} from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "ArcticGrey - AI-Powered Client Health Dashboard" },
    { name: "description", content: "Monitor client satisfaction and predict churn risk with AI-powered insights." },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ clients: [] });
};

const features = [
  {
    icon: BarChart3,
    title: "ArcticGrey Client Health",
    description: "Monitor our clients' satisfaction, health scores, and relationship status across ArcticGrey's entire portfolio. Internal dashboard for our account managers.",
  },
  {
    icon: Bot,
    title: "Internal AI Agent System",
    description: "Deploy custom AI agents for our ArcticGrey team members. Build and manage specialized AI solutions that we deliver to our clients through our services.",
  },
  {
    icon: TrendingUp,
    title: "Client Project Dashboards",
    description: "Internal management of AI solutions we build for clients. Track performance of our delivered AI agents, monitor client engagement, and measure project ROI.",
  },
  {
    icon: Zap,
    title: "ArcticGrey Process Automation",
    description: "Automate our internal operations with n8n workflows, Slack notifications, Monday task management, and custom integrations for ArcticGrey's team efficiency.",
  },
];

const stats = [
  { label: "ArcticGrey Clients", value: "45+" },
  { label: "Internal AI Agents", value: "23+" },
  { label: "Client Projects", value: "67+" },
  { label: "Team Efficiency", value: "+285%" },
];

export default function LandingPage() {
  const { clients } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ArcticGrey</h1>
                <p className="text-xs text-muted-foreground">AI Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                <Brain className="h-3 w-3 mr-1" />
                ArcticGrey Internal Platform
              </Badge>
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-foreground">
                Arcticgrey
                <span className="text-primary block">AI Infrastructure</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Private AI infrastructure built exclusively for ArcticGrey operations—monitor our clients' health, deploy custom AI agents for our team, and manage client AI solutions internally.
              </p>
            </div>

            <SignedOut>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <SignInButton 
                  mode="modal"
                  fallbackRedirectUrl="/onboarding/role-selection"
                >
                  <Button size="lg" className="px-8 py-6 text-lg font-medium group">
                    Get Started with Google
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </SignInButton>
              </div>
              <p className="text-sm text-muted-foreground pt-4">
                ArcticGrey Internal Platform • Team access with @arcticgrey.com only
              </p>
            </SignedOut>

            <SignedIn>
              <Card className="max-w-md mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Welcome back!</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    You're signed in and ready to access your dashboard.
                  </p>
                  <Link to="/dashboard">
                    <Button className="w-full" size="lg">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </SignedIn>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border/40 bg-muted/20">
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
              ArcticGrey's Internal Operations Hub
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Private platform built exclusively for ArcticGrey team to manage our clients, deploy internal AI agents, and oversee all AI solutions we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border/60">
                <CardHeader className="space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-muted/20 border-y border-border/40">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
                ArcticGrey's Internal AI System
              </h2>
              <p className="text-xl text-muted-foreground">
                Private platform designed exclusively for ArcticGrey team operations and client project management
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">1. Internal Operations</h3>
                <p className="text-muted-foreground">
                  Monitor ArcticGrey's client relationships, deploy AI agents for our team, and automate internal processes with n8n, Slack, Monday integrations.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">2. Team AI Infrastructure</h3>
                <p className="text-muted-foreground">
                  Build custom AI agents for ArcticGrey team members and manage all AI solutions that we develop and deliver to our clients.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">3. Project Management</h3>
                <p className="text-muted-foreground">
                  Internal oversight of all AI projects we deliver to clients, performance tracking, and ROI measurement for ArcticGrey's business growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Ready to Access ArcticGrey's Platform?
            </h2>
            <p className="text-xl text-muted-foreground">
              Access ArcticGrey's internal AI platform to manage our clients, deploy team AI agents, and oversee all our AI projects.
            </p>
            
            <SignedOut>
              <SignInButton 
                mode="modal"
                afterSignInUrl="/onboarding/role-selection"
                afterSignUpUrl="/onboarding/role-selection"
              >
                <Button size="lg" className="px-8 py-6 text-lg font-medium group">
                  Access Internal Platform
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link to="/dashboard">
                <Button size="lg" className="px-8 py-6 text-lg font-medium group">
                  Open ArcticGrey Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </SignedIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                © 2024 ArcticGrey. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}