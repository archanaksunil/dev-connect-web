import React, { useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feedData) return;
    try {
      const feeds = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(feeds?.data?.data));
    } catch (err) {}
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feedData) return null;
  if (feedData.length <= 0)
    return <div className="text-center my-10">No more user in the feed</div>;
  return (
    feedData && (
      <div className="flex  justify-center">
        <UserCard user={feedData[0]} />
      </div>
    )
  );
};

export default Feed;
