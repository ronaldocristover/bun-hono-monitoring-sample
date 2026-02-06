import client from "prom-client";

client.collectDefaultMetrics();

export const httpHistogram = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration",
  labelNames: ["method", "path", "status"],
});

export const register = client.register;
