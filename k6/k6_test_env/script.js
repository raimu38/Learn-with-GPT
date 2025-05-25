import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
  thresholds: {
    http_req_duration: ["p(95)<200"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  const res = http.get("http://my-nginx/");

  check(res, {
    "is status 200": (r) => r.status === 200,
    'body contains "hello from Nginx!"': (r) =>
      r.body.includes("Hello from Nginx"),
  });

  sleep(1);
}
