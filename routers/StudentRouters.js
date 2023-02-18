const express = require("express");
const StudentRouter = express.Router(); // Create router
const AsyncHandler = require("express-async-handler"); // To handle async ops
const conn = require("../connection"); // Get connetcion
const uuid = require("uuid"); // to generate uniqueid
const ErrorHandler = require("../middleware/ErrorHandler");
const StudentValidation = require("../ValidationSchema/StudentSchema");

//Query to add student to a student table
StudentRouter.post(
  "/register",
  AsyncHandler((req, res, next) => {
    try {
      var failed = false;
      // => Get the req.body
      const {
        name,
        email,
        password,
        cpassword,
        phno,
        address,
        doa,
        genderstring,
        hobbies,
        stillStudent,
      } = req.body;
      console.log(uuid.v4());
      // => Generate an _id
      const sid = uuid.v4();

      // => Validate the details entered
      const { error, value } = StudentValidation.validate(req.body, {
        abortEarly: false,
      });

      // => Error 1 : VALIDATION ERROR
      if (error) {
        throw error;
      }

      console.log("resume execution?");
      const query = `INSERT INTO STUDENT VALUES(?,?,?,?,?,?,?,?,?)`;
      conn.query(
        query,
        [
          sid,
          email,
          password,
          phno,
          name,
          doa,
          address.state,
          genderstring,
          stillStudent,
        ],
        (dberror, result) => {
          // => ERROR 2: QUERY ERROR
          if (dberror) {
            // this error could not be rethrown hence we have to call next here directly

            next(dberror);

            return;
          }
          //If student is inserted go ahead and insert his hobbies
          if (result) {
            hobbies.forEach((element) => {
              conn.query(
                "INSERT INTO HOBBIES VALUES(?,?)",
                [sid, element],
                (dberror, result) => {
                  if (dberror) {
                    return next(dberror);
                  }
                }
              );
            });
          }
          res.status(200).send({ ...req.body, sid: sid });
        }
      );
    } catch (e) {
      return next(e);
    }
  })
);

//Query to get all students
StudentRouter.get(
  "/",
  AsyncHandler((req, res) => {
    //const { name, rollno } = req.body;

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
  AsyncHandler((req, res, next) => {
    try {
      const sid = req.params.id;

      const query = `DELETE FROM STUDENT WHERE SID='${sid}'`;
      conn.query(query, (error, result) => {
        if (error) {
          console.log("FOUND ERROR");
          throw error;
        }
        //If student is inserted go ahead and insert his hobbies
        if (result) {
          conn.query(
            "DELETE FROM HOBBIES WHERE SID=?",
            [sid],
            (dberror, result) => {
              if (dberror) {
                return next(dberror);
              }
            }
          );
        }
        res.status(200).send({
          ...result,
          message:
            result.affectedRows !== 0
              ? `deleted student with sid = ${sid}`
              : "No such record in database",
        });
      });
    } catch (e) {
      return next(e);
    }
  })
);

//Query to update studnet details
StudentRouter.put(
  "/update:id",
  AsyncHandler((req, res, next) => {
    const sid = req.params.id;
    const { name, email, phno, password } = req.body;

    // => WAY 01: QUERY STRING
    // const query = `UPDATE STUDENT SET name='${name}',rollno=${rollno} WHERE SID='${sid}'`;

    // => An alternate way of passing data to query
    const query = `UPDATE STUDENT SET name=?,email=?,password=?,phno=? WHERE SID=?`;
    conn.query(query, [name, email, password, phno, sid], (error, result) => {
      if (error) {
        console.log("FOUND ERROR");
        return next(error);
      }

      res.status(200).send({
        ...result,
        message:
          result.affectedRows !== 0
            ? `updated student with sid = ${sid}`
            : "No such record in database",
        student: result.affectedRows !== 0 ? req.body : {},
      });
    });
  })
);

//_____________Demonstrate express async handler____________________
StudentRouter.get(
  "/error1",

  AsyncHandler((req, res) => {
    const user = req.body.user;
    if (!user) {
      throw new Error("User Not Found");
    }
    res.status(200).send(user);
  })
);

//_________________Demonstrate try-catch______________________________
StudentRouter.get("/error2", async (req, res, next) => {
  /***********C O D E  ____THAT CAN GO____  W R O N G********** */
  try {
    const user = req.body.user; //Assume user is not FOUND!
    if (!user) {
      throw new Error("User Not Found");
    }
    res.status(200).send(user);
  } catch (e) {
    console.log("*******************E R R O R********************************");
    console.log(e);
    console.log("*******************E R R O R********************************");
    // => CALL TO ERROR HANDLING MIDDLEWARE
    return next(e);
  }
});
module.exports = StudentRouter;
