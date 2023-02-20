import React, { useState } from "react";
import InputField from "../Components/InputFeild";

const RegisterScreen = () => {
  // state
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
        alert("Making male false and string female")
        setstudentDetails({
          ...studentDetails,
          male: false,
          genderstring: "female",
        });
      } else {
        alert("Making male true and string male")
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
    if(e.target.name==="address"){
      console.log("address changed");
      const state=e.target.value;
      setstudentDetails((prev)=>{return {...prev,address:{state:state}}});
      console.log(studentDetails);
      return;
    }
    //For other values
    const value = e.target.value;
    setstudentDetails({ ...studentDetails, [e.target.name]: value });
    console.log(studentDetails);
  };
  return (
    <>
      <div className="header">
        <h2 className="text-center">Register</h2>
      </div>
      <form action="#" method="POST">
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
      </form>
    </>
  );
};

export default RegisterScreen;
