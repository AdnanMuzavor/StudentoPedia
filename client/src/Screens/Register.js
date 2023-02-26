import React, { useEffect, useState } from "react";
import InputField from "../Components/InputFeild";
import axios from "axios";

const RegisterScreen = (props) => {
  // state
  const [hobby, sethobby] = useState("");
  const [errors, seterrors] = useState("");
  const [studentDetails, setstudentDetails] = useState({
    name: "Aduji",
    email: "123ad82@gmail.com",
    password: "123",
    cpassword: "123",
    phno: "1234902345",
    address: {
      state: "Goa",
    },
    doa: "2015-10-01",
    male: true,
    genderstring: "male",
    hobbies: ["Swim", "Running"],
    stillStudent: true,
  });

  // => Change handler [COMMON FOR ALL EFFICIENT WAY]
  const ChangeHandler = (e) => {
    console.log(e.target.name, e.target.value);

    //Special handling for Gender
    if (e.target.name === "genderstring") {
      if (!(e.target.value == "female")) {
        setstudentDetails({
          ...studentDetails,
          male: false,
          genderstring: "female",
        });
      } else {
        setstudentDetails({
          ...studentDetails,
          male: true,
          genderstring: "male",
        });
      }
      console.log(studentDetails);
      return;
    }

    //Handling for Address
    if (e.target.name === "address") {
      console.log("address changed");
      const state = e.target.value;
      setstudentDetails((prev) => {
        return { ...prev, address: { state: state } };
      });
      console.log(studentDetails);
      return;
    }

    //For other values
    const value = e.target.value;
    setstudentDetails({ ...studentDetails, [e.target.name]: value });
    console.log(studentDetails);
  };

  // => For updating an hobby array
  const AddHobbyHandler = (e) => {
    e.preventDefault();
    console.log(studentDetails)
    if(studentDetails.hobbies.length==0){
      setstudentDetails((prev) => {
        return { ...prev, hobbies: [hobby] };
      });
      sethobby("");
      return;
    }
    if (
      !studentDetails.hobbies.find(
        (e) => e.toLowerCase() === hobby.toLowerCase()
      )
    ) {
      const hobbies1 = [...studentDetails.hobbies, hobby];
      setstudentDetails((prev) => {
        return { ...prev, hobbies: hobbies1 };
      });
      sethobby("");
      console.log(studentDetails);
    } else {
      alert("Cannot add same hobby");
    }
  };

  // => Submit handler to submit data to server
  const SubmitHandler = async (e) => {
    e.preventDefault();
    // seterrors([]);

    //___DRAWBACK: DIFFICULT TO EXTRACT ERROR MESSAGE FROM AXIOS RESPONSE___
    //var response;
    // try {
    //   response = await axios.post(
    //     "/api/student/register",
    //     { ...studentDetails },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //    console.log(response);
    //   if(!response.ok){
    //     const errormsg=await response.statusText();
    //   }
    // } catch (e) {
    //   console.log(e);
    //   console.log(response);
    //   alert("Could Not Submit the Data.")
    // }

    const res = await fetch("/api/student/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentDetails),
    });
    console.log(res);

    //__________if unknown error occurs__________
    if (res.status === 500) {
      alert("Something went wrong");
      return;
    }

    //__________Validation error occurs__________
    if (res.status === 400) {
      const errorText = await res.text();
      const errorMssgs = JSON.parse(errorText);
      seterrors(errorMssgs.Details);
      return;
    }

    //_______No error occurs_____________
    if (res.status === 200) {
      alert("Student registered");
      seterrors([]);
      setstudentDetails({
        name: "Student Name",
        email: "student@gmail.com",
        password: "123",
        cpassword: "123",
        phno: "1234567890",
        address: {
          state: "Student state",
        },
        doa: "2015-10-01",
        male: true,
        genderstring: "male",
        hobbies: ["Swim", "Running"],
        stillStudent: true,
      });
    }
  };

  // remove elemnt from an array
  const RemoveHobby = (e, hobby) => {
    e.preventDefault();
    const newHobbies = studentDetails.hobbies.filter((e) => {
      return e != hobby;
    });
    setstudentDetails((prev) => {
      return { ...prev, hobbies: newHobbies };
    });
  };

  //To know if it's update or new register
  // __________________O P T I M I S A T I O N______________________________
  //  ========> We are using same screen fro update and delete <===========
  const FetchDetails=async()=>{
      try {
         const {data}=await axios.get("")
      } catch (e) {
         console.log(e);
      }
  }
  useEffect(()=>{
    
  },[])
  return (
    <>
      <div className="mainwrap">
        <div className="header">
          <h2 className="text-center">Register</h2>
        </div>
        <div className="errorsection">
          {errors.length >= 1
            ? errors.map((e) => {
                return (
                  <>
                    <h6 key={Math.random()}>{e.message}</h6>
                  </>
                );
              })
            : "No errors as of now"}
        </div>
        <form action="#" method="POST" onSubmit={(e) => SubmitHandler(e)}>
          <InputField
            type="text"
            name="name"
            value={studentDetails.name}
            ChangeHandler={ChangeHandler}
          />
          <InputField
            type="email"
            name="email"
            value={studentDetails.email}
            ChangeHandler={ChangeHandler}
          />
          <InputField
            type="password"
            name="password"
            value={studentDetails.password}
            ChangeHandler={ChangeHandler}
          />
          <InputField
            type="password"
            name="cpassword"
            value={studentDetails.cpassword}
            ChangeHandler={ChangeHandler}
          />
          <InputField
            type="number"
            name="phno"
            value={studentDetails.phno}
            ChangeHandler={ChangeHandler}
          />
          <InputField
            type="date"
            name="doa"
            label="Date Of Admission"
            value={studentDetails.doa}
            ChangeHandler={ChangeHandler}
          />
          <InputField
            type="radio"
            name="genderstring"
            label="Male"
            value="male"
            selected={true}
            ChangeHandler={ChangeHandler}
          />
          <InputField
            type="radio"
            name="genderstring"
            label="Female"
            value="female"
            ChangeHandler={ChangeHandler}
          />
          <InputField
            type="text"
            name="address"
            label="Enter address"
            value={studentDetails.address.state}
            ChangeHandler={ChangeHandler}
          />

          <div className="hobbietaker">
            <div className="hobbies">
              {studentDetails.hobbies.length>=1? studentDetails.hobbies.map((e, i) => {
                return (
                  <>
                    <div className="hobby" key={i}>
                      {e}
                      <button onClick={(ev) => RemoveHobby(ev, e)}>X</button>
                    </div>
                  </>
                );
              }):"No hobbies selected"}
            </div>
            <div className="ipwrapper">
              <input
                type="text"
                name="hobbie"
                onChange={(e) => sethobby(e.target.value)}
                value={hobby}
              />
              <button onClick={(e) => AddHobbyHandler(e)}>Add hobby</button>
            </div>
          </div>

          <input type="submit" value="Register" />
        </form>
      </div>
    </>
  );
};

export default RegisterScreen;
