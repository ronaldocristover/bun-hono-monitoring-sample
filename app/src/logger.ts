export function logRequest(
  method: string,
  path: string,
  status: number,
  time: number,
) {
  console.log(
    JSON.stringify({
      method,
      path,
      status,
      response_time_ms: time,
      timestamp: new Date().toISOString(),
    }),
  );
}
