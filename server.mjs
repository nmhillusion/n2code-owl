import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("Listening on port 3000. http://localhost:3000");
});

app.use(express.static("dist"));
