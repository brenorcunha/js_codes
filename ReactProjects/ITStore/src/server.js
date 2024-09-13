import express from "express";
import { readFile, writeFile } from "fs";
const app = express();
const PORT = 3000;
import cors from "cors";

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.post("/save", (req, res) => {
  const dados = req.body;

  readFile("database.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the DB!");
    }

    const jsonData = JSON.parse(data);
    jsonData.push(dados);

    writeFile("database.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error saving the data!");
      }
      res.send("Data saved successfully!");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
