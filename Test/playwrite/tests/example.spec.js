import { test, expect } from "@playwright/test";
import { spawn } from "child_process";
import http from "http";

let serverProcess;

/** 待ち合わせ helper: URL が生きるまでリトライ */
async function waitForServer(url, timeout = 5000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          res.resume();
          resolve();
        });
        req.on("error", reject);
      });
      return;
    } catch (e) {
      await new Promise((r) => setTimeout(r, 100));
    }
  }
  throw new Error("Server did not start within timeout");
}

test.beforeAll(async () => {
  // node server.js を起動
  serverProcess = spawn("node", ["server.js"], { stdio: "inherit" });
  // サーバーが起動するまで待つ
  await waitForServer("http://localhost:3000/");
});

test.afterAll(() => {
  // サーバープロセスを切る
  if (serverProcess) {
    serverProcess.kill();
  }
});

test("homepage shows correct title and content", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle("My App");
  await expect(page.locator("h1")).toHaveText("Hello Playwright");
  await expect(page.locator("#msg")).toHaveText("served");
});

test("api /api/echo returns posted JSON", async ({ request }) => {
  const response = await request.post("http://localhost:3000/api/echo", {
    data: { msg: "hello" },
  });
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toEqual({ msg: "hello" });
});
