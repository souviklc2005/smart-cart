import { createFileRoute, Link } from "@tanstack/react-router";
import loginBg from "@/assets/login-bg.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — AisleMind" },
      { name: "description", content: "Sign in to AisleMind to access personalised recommendations and your orders." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <img
        src={loginBg}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-primary/90" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl bg-background/95 p-10 shadow-card backdrop-blur-md sm:p-12">
          <div className="text-center">
            <Link to="/" className="inline-block">
              <span
                className="font-serif font-bold text-amber"
                style={{ fontSize: "clamp(2.75rem, 6vw, 3.5rem)" }}
              >
                AisleMind
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Intelligent commerce, beautifully curated.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border-2 border-border bg-background font-medium text-foreground shadow-sm transition-all hover:border-accent hover:shadow-soft"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 text-xs uppercase tracking-wider text-muted-foreground">
                  Secure sign-in
                </span>
              </div>
            </div>

            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              By continuing you agree to our{" "}
              <Link to="/terms" className="text-primary underline-offset-4 hover:underline">Terms</Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary underline-offset-4 hover:underline">Privacy Policy</Link>.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-2 border-t border-border pt-6 text-center">
            <RoleHint label="Shopper" tone="text-primary" />
            <RoleHint label="Vendor" tone="text-accent" />
            <RoleHint label="Admin" tone="text-amber" />
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleHint({ label, tone }: { label: string; tone: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Role</p>
      <p className={`font-serif text-sm font-semibold ${tone}`}>{label}</p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.93l3.66-2.83Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  );
}
