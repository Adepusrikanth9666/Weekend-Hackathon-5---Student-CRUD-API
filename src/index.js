const express = require("express");
const studentArray = require("./InitialData");
let length = studentArray.length;
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here

app.get("/api/student", (req, res) => {
  res.send(studentArray);
});
app.get("/api/student/:id", (req, res) => {
  let params = parseInt(req.params.id);
  let student = studentArray.find((student) => student.id === params);
  console.log(student);

  if (student !== undefined) {
    res.send(studentArray[params - 1]);
  } else {
    res.status(404).send("student ID is not found");
  }
});

app.post("/api/student", (req, res) => {
  if (
    req.body === "" ||
    req.body.name === "" ||
    req.body.currentClass === "" ||
    req.body.division === ""
  ) {
    res.status(400).send("Incomplete details");
  } else {
    res.send(req.body);
    length++;
    let newData = { id: length, ...req.body };
    studentArray.push(newData);
    console.log(studentArray);
    console.log(newData);
    res.send(newData.id);
  }
});

app.put("/api/student/:id", (req, res) => {
  let params = parseInt(req.params.id - 1);
  console.log(typeof params, length);
  let student = studentArray.find((student) => student.id === params + 1);
  if (student !== undefined) {
    console.log(req.body.name, req.body.currentClass, req.body.division);

    // const [name,currentClass,division]=req.body;
    if (
      studentArray[params].name !== req.body.name ||
      studentArray[params].currentClass !== req.body.currentClass ||
      studentArray[params].division !== req.body.division
    ) {
      studentArray[params].name = req.body.name;
      studentArray[params].currentClass = req.body.currentClass;
      studentArray[params].division = req.body.division;
      console.log(studentArray);
      res.send(studentArray[params]);
    } else {
      res.status(400).send("No changes are done");
    }
  } else {
    res.status(400).send("No Id found to change");
  }
});
app.delete("/api/student/:id", (req, res) => {
  let params = parseInt(req.params.id);
  let student = studentArray.find((student) => student.id === params);
  if (student !== undefined) {
    studentArray.splice(student, 1);
    console.log(studentArray);
    res.status(200).send(student);
  } else {
    res.status(404).send("No id is found");
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
