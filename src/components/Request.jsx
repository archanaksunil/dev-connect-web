import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const reviewRequest = async (status, requestId) => {
    try {
      const req = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {}
  };
  const getRequests = async () => {
    try {
      const req = await axios.get(`${BASE_URL}/user/request`, {
        withCredentials: true,
      });
      dispatch(addRequest(req?.data?.data));
    } catch (err) {}
  };
  useEffect(() => {
    if (!requests) {
      getRequests();
    }
  }, []);
  if (!requests) return null;
  if (requests.length === 0)
    return <div className="text-center my-10">No Pending Requests</div>;
  return (
    <div>
      <h1 className="text-bold text-white text-3xl text-center my-10">
        Requests
      </h1>
      {requests.map((req) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          about,
          gender,
          age,
          skills,
        } = req;
        return (
          <div
            key={_id}
            className="flex m-4 p-4 justify-between rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{skills && skills.join(", ")}</p>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", _id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", _id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
