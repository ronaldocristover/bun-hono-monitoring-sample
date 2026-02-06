import { Hono } from "hono";
import { httpHistogram, register } from "./metrics";
import { logRequest } from "./logger";

const app = new Hono();

app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const duration = (Date.now() - start) / 1000;

  httpHistogram
    .labels(c.req.method, c.req.path, c.res.status.toString())
    .observe(duration);

  logRequest(c.req.method, c.req.path, c.res.status, duration * 1000);
});

app.get("/", (c) => c.text("Hono API running 🚀"));

app.get("/users", (c) => c.json([{ id: 1, name: "John" }]));

app.get("/health", (c) => c.json({ status: "ok" }));

app.get("/metrics", async (c) => {
  return c.text(await register.metrics());
});

export default {
  port: 3000,
  fetch: app.fetch,
};
