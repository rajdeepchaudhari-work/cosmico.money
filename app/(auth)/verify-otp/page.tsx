import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/appwrite";
import OTPVerifyForm from "@/components/OTPVerifyForm";

export default async function VerifyOTPPage({
  searchParams,
}: {
  searchParams: { uid?: string };
}) {
  const encodedUid = searchParams?.uid;
  if (!encodedUid) redirect("/sign-in");

  let userId: string;
  try {
    userId = atob(encodedUid);
  } catch {
    redirect("/sign-in");
  }

  let email = "";
  try {
    const { user } = await createAdminClient();
    const prefs = await user.getPrefs(userId);
    if (!prefs.email) redirect("/sign-in");
    email = prefs.email as string;
  } catch {
    redirect("/sign-in");
  }

  return (
    <section className="flex-center size-full max-sm:px-6">
      <OTPVerifyForm email={email} userId={userId} />
    </section>
  );
}
