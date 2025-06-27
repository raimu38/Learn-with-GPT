import { ipcRenderer } from "electron";

const input = document.getElementById("input-seconds") as HTMLInputElement;
const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
const display = document.getElementById("display") as HTMLDivElement;

startBtn.addEventListener("click", () => {
  const sec = Math.max(1, parseInt(input.value, 10) || 1);
  display.textContent = sec.toString();
  ipcRenderer.send("start-timer", sec);
});

ipcRenderer.on("tick", (_, remaining: number) => {
  display.textContent = remaining > 0 ? remaining.toString() : "Done";
});
