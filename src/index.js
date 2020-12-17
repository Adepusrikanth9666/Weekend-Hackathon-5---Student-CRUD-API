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
  const id = req.params.id;
  const requestedStudentIndex = studentArray.findIndex(
    (student) => student.id === parseInt(id)
  );
  if (requestedStudentIndex === -1) {
    res.status(404).send("Invalid id");
    return;
  }
  res.send(studentArray[requestedStudentIndex]);
});

app.post("/api/student", (req, res) => {
  const requestBody = req.body;
  if (!requestBody.name || !requestBody.currentClass || !requestBody.division) {
    res.sendStatus(400);
  } else {
    // res.send(req.body);
    length++;
    
    let newData = { id: length, ...req.body };
    studentArray.push(newData);
    console.log(studentArray);
    console.log(newData);


    res.send({ id: newData.id });
  }
});

app.put("/api/student/:id", (req, res) => {

  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }
  const requestedStudentIndex = studentArray.findIndex(
    (student) => student.id === id
  );
  if (requestedStudentIndex === -1) {
    res.sendStatus(400);
    return;
  }
  const requestBody = req.body;

  const requestedStudent = studentArray[requestedStudentIndex];
  if (requestBody.name) {
    studentArray[requestedStudentIndex].name = requestBody.name;
  }
  if (requestBody.currentClass) {
    studentArray[requestedStudentIndex].currentClass = parseInt(
      requestBody.currentClass
    );
  }
  if (requestBody.division) {
    studentArray[requestedStudentIndex].division = requestBody.division;
  }
  res.send(requestedStudent);
});

app.delete("/api/student/:id", (req, res) => {
  let params = parseInt(req.params.id);
  let student = studentArray.find((student) => student.id === params);
  if (student !== undefined) {
    console.log(student.id);
    studentArray.splice(student.id-1,1);
    console.log(studentArray);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
