import React from "react";
import { Link } from "react-router-dom";
const StudentCard = ({ sid, name, email, UpdateHandler, DeleteHandler }) => {
  return (
    <>
      <div className="card col-md-3 col-lg-3 col-5" key={sid}>
        <div className="cardele">{name}</div>
        <div className="cardele">{email}</div>
        <div className="btns row btnflex">
          <Link
            to={`/register/${sid}`}
            className="btn col-md-5 col-lg-5 col-10"
          >
            Update
          </Link>
          <button
            onClick={() => DeleteHandler(sid)}
            className="btn col-md-5 col-lg-5 col-10"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentCard;
