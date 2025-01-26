import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, age, gender, skills } = user;
  return (
    <div className="card bg-neutral w-96 shadow-xl my-20">
      <figure>
        <img
          src={photoUrl}
          alt="user"
          className="rounded-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{skills}</p>
        <p>{about}</p>
        <p>{age + " " + gender}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary cursor-pointer">Ignore</button>
          <button className="btn btn-secondary cursor-pointer">Connect</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
