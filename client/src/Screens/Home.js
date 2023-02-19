import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentCard from "../Components/StudentCard";

const HomeScreen = () => {
  // => States
  const [students, setstudents] = useState([]);
  const [loading, setloading] = useState(false);

  // => Handlers
  const UpdateStudent = (sid) => {
    alert(`request to update: ${sid}`);
  };

  const DeleteStudent = async (sid) => {
    alert(`request to delete: ${sid}`);
    try {
      const { data } = await axios.delete(`api/student/remove${sid}`);
      if (data) {
        alert(data.message);
        setstudents((prev) => {
          return prev.filter((e) => e.sid !== sid);
        });
      } else {
        alert(`Failed to delete: ${sid}`);
      }
    } catch (e) {
      console.log(e);
      alert(`Failed to delete: ${sid}`);
    }
  };

  useEffect(() => {
    const GetStudents = async () => {
      setloading(true);
      const response = await axios.get("/api/student");

      if (response.data) {
        setstudents(response.data);
      } else {
        alert("Failed to get data");
      }
      setloading(false);
    };

    GetStudents();
  }, []);
  return loading ? (
    "Loading"
  ) : (
    <>
      <div className="header">
        <h2 className="text-center">Students Registered</h2>
      </div>
      <div className="row d-flex justify-content-center">
        {students.map((e) => {
          return (
            <>
              <StudentCard
                key={e.sid}
                sid={e.sid}
                email={e.email}
                UpdateHandler={UpdateStudent}
                DeleteHandler={DeleteStudent}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export default HomeScreen;
