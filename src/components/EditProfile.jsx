import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  const editProfile = async () => {
    try {
      setError("");
      const profile = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, gender, about, skills, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(profile?.data?.data));
      setIsSuccess(true);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="card bg-neutral w-96 shadow-xl my-20 mx-10">
      {isSuccess && (
        <div role="alert" className="alert alert-success">
          <span>Your profile has been updated successfully!</span>
        </div>
      )}
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <select
            className="select w-full max-w-xs"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled>
              Pick gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">About</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            required
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Skills</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            required
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            required
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>
        <p className="text-red-700">{error}</p>
        <div className="form-control mt-6">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              editProfile();
            }}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
