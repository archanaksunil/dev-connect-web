import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connection = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const getConnections = async () => {
    try {
      const c = await axios.get(`${BASE_URL}/user/connection`, {
        withCredentials: true,
      });
      dispatch(addConnection(c?.data?.data));
    } catch (err) {}
  };
  useEffect(() => {
    if (!connection) {
      getConnections();
    }
  }, []);
  if (!connection) return null;
  if (connection.length === 0)
    return <div className="text-center my-10">No connections</div>;
  return (
    <div>
      <h1 className="text-bold text-white text-3xl text-center my-10">Connections</h1>
      {connection.map((connect) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          about,
          gender,
          age,
          skills,
        } = connect;
        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto items-center"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 flex-grow">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{skills && skills.join(", ")}</p>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary ml-auto">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
