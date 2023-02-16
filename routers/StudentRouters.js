const express = require("express");
const StudentRouter = express.Router(); // Create router
const AsyncHandler = require("express-async-handler"); // To handle async ops
const conn = require("../connection"); // Get connetcion
const uuid = require("uuid"); // to generate uniqueid

//Query to add student to a student table
StudentRouter.post(
  "/register",
  AsyncHandler((req, res) => {
    const { name, rollno } = req.body;
    console.log(uuid.v4());
    const sid = uuid.v4();
    const query = `INSERT INTO STUDENT VALUES('${sid}','${name}',${rollno})`;
    conn.query(query, (error, result) => {
      if (error) {
        console.log("FOUND ERROR");
        throw new Error(error.message);
      }

      res.status(200).send({ ...req.body, sid: sid });
    });
  })
);

//Query to get all students
StudentRouter.get(
  "/",
  AsyncHandler((req, res) => {
    //const { name, rollno } = req.body;
    console.log(uuid.v4());
    const sid = uuid.v4();
    const query = `select * from student`;
    conn.query(query, (error, result) => {
      if (error) {
        console.log("FOUND ERROR");
        throw new Error(error.message);
      }

      res.status(200).send(result);
    });
  })
);

//Query to delete student
StudentRouter.delete(
  "/remove:id",
  AsyncHandler((req, res) => {
    const sid = req.params.id;

    const query = `DELETE FROM STUDENT WHERE SID='${sid}'`;
    conn.query(query, (error, result) => {
      if (error) {
        console.log("FOUND ERROR");
        throw new Error(error.message);
      }

      res
        .status(200)
        .send({ ...result, message: `deleted student with sid = ${sid}` });
    });
  })
);

//Query to update studnet details
StudentRouter.put(
  "/update:id",
  AsyncHandler((req, res) => {
    const sid = req.params.id;
    const { name, rollno } = req.body;
    const query = `UPDATE STUDENT SET name='${name}',rollno=${rollno} WHERE SID='${sid}'`;
    conn.query(query, (error, result) => {
      if (error) {
        console.log("FOUND ERROR");
        throw new Error(error.message);
      }

      res.status(200).send({
        ...result,
        message: `updated student with sid = ${sid}`,
        student: req.body,
      });
    });
  })
);

module.exports = StudentRouter;
