import express from "express";
import cors from "cors";
import questionData from "./src/data/questionList.json" with { type: "json"};
import submissionSchema from "./src/lib/types/validation";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.errors });
  }
}

// If we want to simulate retrieving questions from the server...
app.get("/questions", (req, res) => {
  console.log("Retrieving Questions from mock server...");
  res.json(questionData);
});

// If we want to simulate receiving a submission...
app.post("/submit", validate(submissionSchema), (req, res) => {
  console.log("Received submission:", req.body);
  res.status(200).json({ message: "Submission successful" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
