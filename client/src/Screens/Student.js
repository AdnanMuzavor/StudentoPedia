import React, {useEffect} from "react";

const StudentScreen = (props) => {
    useEffect(()=>{
         console.log(props);
    },[])
  return (
    <>
      <h1>Student</h1>
    </>
  );
};

export default StudentScreen;
