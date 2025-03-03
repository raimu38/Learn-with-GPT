const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("HEllo Node JS");
});

app.listen(port, () => {
  console.log(`Sever Sucsess!! port:${port}`);
});

app.post("/user", (req, res) => {
  res.send("Got a PUT at /user");
});

app.put("/user", (res, req) => {
  res.send("Gout a PUT at /user");
});

app.delete("/user", (res, req) => {
  res.send("Got a DElete at /user");
});
