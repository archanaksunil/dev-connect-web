import React from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import EditProfile from "./EditProfile";

const Profile = () => {
  const userData = useSelector((store) => store.user);
  return (
    userData && (
      <div className="flex justify-center">
        <UserCard user={userData} />
        <EditProfile user={userData} />
      </div>
    )
  );
};

export default Profile;
