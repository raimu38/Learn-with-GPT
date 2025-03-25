
const express = require("express");
const app = express();
const port = 8000; // ← `;` に修正

app.get('/', (req, res) => {
  console.log('backend hey');
  res.send('backend service');
});

app.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`); // ← `htto` → `http` に修正
});
