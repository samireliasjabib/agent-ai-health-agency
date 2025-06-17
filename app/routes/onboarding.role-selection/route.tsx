import { useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { getAuth } from "@clerk/remix/ssr.server";
import { UserButton } from "@clerk/remix";
import { Button } from "~/components/ui/button";
import { prisma } from "~/db.server";
import { createClerkClient } from "@clerk/remix/api.server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Shield,
  Users,
  Briefcase,
  ArrowRight,
  Check,
  Code,
  Building2,
  CheckCircle,
  Loader2,
} from "lucide-react";

import { USER_ROLES, isValidRole } from "~/constants/roles";
import { cn } from "~/lib/utils";
import { ModeToggle } from "~/components/mode-toggle";
import { Progress } from "~/components/ui/progress";
import { Badge } from "~/components/ui/badge";
import { SharedHeader } from "~/components/shared-header";

const roles = [
  {
    name: "Admin",
    value: USER_ROLES.ADMIN,
    Icon: Shield,
    description: "Full access to manage users, settings, and all client data.",
    adminOnly: true,
  },
  {
    name: "Project Manager",
    value: USER_ROLES.PROJECT_MANAGER,
    Icon: Briefcase,
    description: "Manage projects, clients, and view team performance.",
    adminOnly: true,
  },
  {
    name: "Merchant",
    value: USER_ROLES.MERCHANT,
    Icon: Users,
    description: "Access assigned client data and custom agents AI with health check dashboard.",
    adminOnly: false,
  },
];

export async function loader(args: LoaderFunctionArgs) {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }

  const clerkUser = await createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  }).users.getUser(userId);

  const email = clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) {
    // This case should be handled based on your app's requirements.
    // For now, we'll throw an error.
    throw new Response("User profile is incomplete. An email is required.", {
      status: 400,
    });
  }

  // Step 1: Find the user in our database.
  let dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  // Step 2: If the user already exists and has completed onboarding, redirect them.
  if (dbUser && dbUser.onboardingComplete) {
    return redirect("/dashboard");
  }

  // Step 3: If the user does not exist in our database, create them.
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email: email,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
        onboardingComplete: false, // Explicitly false for new users
      },
    });
  }

  // Step 4: Determine which roles to show and return the data to the component.
  const canBeAdmin = email.endsWith("@arcticgrey.com");
  const firstName = clerkUser.firstName;

  return json({ canBeAdmin, firstName });
}

export async function action(args: ActionFunctionArgs) {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const formData = await args.request.formData();
  const roleValue = formData.get("role");

  // Validación usando el nuevo helper
  if (typeof roleValue !== "string" || !isValidRole(roleValue)) {
    return json({ error: "Invalid role selected." }, { status: 400 });
  }

  const role: string = roleValue;

  await prisma.user.update({
    where: { clerkId: userId },
    data: {
      role: role,
      onboardingComplete: true,
    },
  });

  return redirect("/dashboard");
}

export default function RoleSelectionPage() {
  const { canBeAdmin, firstName } = useLoaderData<typeof loader>();
  const [selectedRole, setSelectedRole] = useState("");
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const availableRoles = roles.filter(r => canBeAdmin || !r.adminOnly);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <SharedHeader />

      <div className="flex min-h-screen items-center justify-center p-6 pt-24">
        <main className="w-full max-w-6xl">
          {/* Progress Section */}
          <div className="text-center mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-700">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Account Created</span>
              </div>
              <div className="w-8 border-t border-muted-foreground/30" />
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">Choose Role</span>
              </div>
              <div className="w-8 border-t border-muted-foreground/30" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />
                <span>Complete Setup</span>
              </div>
            </div>
            <Progress value={66} className="w-48 mx-auto mb-8" />
          </div>

          {/* Welcome Section */}
          <div className="text-center mb-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-800 delay-200">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
              Welcome to ArcticGrey, {firstName}!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your role to get started with the right permissions and dashboard view tailored for your work.
            </p>
          </div>

          <Form method="post" className="space-y-8">
            <input type="hidden" name="role" value={selectedRole} />
            
            {/* Role Selection Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {availableRoles.map((role, index) => {
                const isSelected = selectedRole === role.value;
                return (
                  <Card
                    key={role.value}
                    onClick={() => !isSubmitting && setSelectedRole(role.value)}
                    style={{ animationDelay: `${400 + index * 200}ms` }}
                    className={cn(
                      "cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl animate-in fade-in-0 slide-in-from-bottom-6 fill-mode-both group relative overflow-hidden",
                      isSelected
                        ? "ring-2 ring-primary shadow-xl shadow-primary/25 bg-accent/50"
                        : "border-border hover:border-primary/50",
                      isSubmitting && "pointer-events-none opacity-75"
                    )}
                  >
                    {/* Selected Indicator */}
                    {isSelected && (
                      <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-primary">
                        <Check className="absolute -top-[18px] -right-[2px] h-3 w-3 text-primary-foreground animate-in fade-in-0 zoom-in-75 duration-300" />
                      </div>
                    )}

                    <CardHeader className="space-y-4 pb-4">
                      <div className="flex items-start justify-between">
                        <div className={cn(
                          "p-3 rounded-xl transition-all duration-300",
                          isSelected ? "bg-primary text-primary-foreground" : "bg-muted group-hover:bg-primary/10"
                        )}>
                          <role.Icon className={cn(
                            "h-8 w-8 transition-all duration-300",
                            isSelected ? "text-primary-foreground" : "text-foreground group-hover:text-primary"
                          )} />
                        </div>
                        <Badge variant={"default"} className="text-xs">
                          {role.name.split(' ')[0]}
                        </Badge>
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2 text-foreground">{role.name}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed">
                          {role.description}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Permissions:</h4>
                        <ul className="space-y-1">
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">Access to all features</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>

                    {/* Hover Border Effect */}
                    <div className={cn(
                      "absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-300",
                      "group-hover:border-primary/20",
                      isSelected && "border-primary"
                    )} />
                  </Card>
                );
              })}
            </div>

            {/* Continue Button */}
            <div className="flex justify-center pt-8">
              <Button
                type="submit"
                size="lg"
                className={cn(
                  "w-full max-w-sm h-12 text-base font-medium animate-in fade-in-0 slide-in-from-bottom-4 fill-mode-both transition-all duration-300",
                  selectedRole && "shadow-lg hover:shadow-xl"
                )}
                style={{ animationDelay: `${400 + availableRoles.length * 200}ms` }}
                disabled={!selectedRole || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Setting up your account...
                  </>
                ) : (
                  <>
                    Continue to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>

            {/* Help Section */}
            <div className="text-center pt-8 animate-in fade-in-0 duration-1000 delay-1000">
              <p className="text-sm text-muted-foreground">
                Need help choosing? {" "}
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                  onClick={() => {
                    // Could open a help modal or scroll to info section
                  }}
                >
                  Contact your administrator
                </button>
              </p>
            </div>
          </Form>
        </main>
      </div>
    </div>
  );
}