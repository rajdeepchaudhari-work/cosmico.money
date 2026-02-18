import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://REDACTED",

  integrations: [
    // Session replay: record user sessions for debugging
    Sentry.replayIntegration(),
    // Forward console.log / warn / error to Sentry Logs
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],

  // Enable Sentry Logs (required for consoleLoggingIntegration to activate)
  enableLogs: true,

  tracesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions, plus 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  environment: process.env.NODE_ENV,
});
