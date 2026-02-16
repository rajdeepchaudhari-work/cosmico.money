"use client";

export default function GlobalError({ error, reset }) {
  console.error(error);

  return (
    <html>
      <body>
        <div style={{ padding: 40 }}>
          <h2>Something went wrong.</h2>
          <button onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
