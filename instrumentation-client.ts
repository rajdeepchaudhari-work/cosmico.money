import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://d38793d9bf96ad83bf02ac063ad56605@o4510892035014656.ingest.de.sentry.io/4510892037505104",

  integrations: [Sentry.replayIntegration()],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
