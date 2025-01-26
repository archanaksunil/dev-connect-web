import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import Logout from "./Logout";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const getProfile = async () => {
    try {
      if (!userData) {
        const user = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        dispatch(addUser(user.data));
      }
    } catch (err) {
      if (err.status === 401) navigate("/login");
      console.error(err);
    }
  };

  useEffect(() => {
    getProfile();
    if (showModal) document.getElementById("my_modal_1").showModal();
  }, [showModal]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header openModal={openModal} />
      <Logout closeModal={closeModal} />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
