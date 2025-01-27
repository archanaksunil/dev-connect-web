import axios from "axios";
import React from "react";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, age, gender, skills, _id } =
    user;
  const dispatch = useDispatch();
  
  const sendConnection = async (status, userId) => {
    try {
      const req = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };
  return (
    <div className="card bg-neutral w-96 shadow-xl my-20">
      <figure>
        <img src={photoUrl} alt="user" className="rounded-lg w-32 h-32 m-4" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{skills && skills.join(", ")}</p>
        <p>{about && about}</p>
        <p>{age && age}</p>
        <p>{gender && gender}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary cursor-pointer"
            onClick={() => sendConnection("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary cursor-pointer"
            onClick={() => sendConnection("interested", _id)}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
