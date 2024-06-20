import express from "express";
import cors from "cors";
import questionData from "./src/data/questionList.json" with { type: "json"};

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// If we want to simulate retrieving questions from the server...
app.get("/questions", (req, res) => {
  console.log("Retrieving Questions from mock server...");
  res.json(questionData);
});

app.post("/submit", (req, res) => {
  console.log("Received submission:", req.body);
  res.status(200).json({ message: "Submission successful" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
