import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Logout = ({ closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      console.log("came here");
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Are you sure you want to Logout?</h3>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-outline mx-5" onClick={closeModal}>
              Cancel
            </button>
            <button
              className="btn btn-outline btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Logout;
