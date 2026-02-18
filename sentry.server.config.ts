import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://REDACTED",

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // Reduce in production.
  tracesSampleRate: 1.0,

  // Set environment
  environment: process.env.NODE_ENV,
});
