import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAuth } from "@clerk/remix/ssr.server";
import { UserButton } from "@clerk/remix";
import { prisma } from "~/db.server";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    // This is a safeguard.
    return redirect("/sign-in");
  }

  // Find the user in our database.
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  // If the user isn't in our DB or hasn't finished onboarding,
  // send them to the correct page.
  if (!dbUser || !dbUser.onboardingComplete) {
    return redirect("/onboarding/role-selection");
  }

  // If the user is fully onboarded, show the dashboard.
  const dashboardData = {
    message: `Welcome back! You are logged in as user: ${userId}. Your role is ${dbUser.role}.`
  };
  
  return json({ dashboardData });
};

export default function DashboardPage() {
  const { dashboardData } = useLoaderData<typeof loader>();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Protected Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </header>
      <main className="mt-6">
        <p>{dashboardData.message}</p>
      </main>
    </div>
  );
} 