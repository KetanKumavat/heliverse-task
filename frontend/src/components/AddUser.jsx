import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Adduser = (props) => {
  const [userDetails, setUserDetails] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    avatar: "",
    domain: "",
    available: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      props.setProgress(10);
      const url = `http://localhost:5000/api/users`;
      const response = await axios.post(url, userDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        props.setProgress(100);
        alert("User Created Successfully!");
      }
    } catch (error) {
      alert(error);
      props.setProgress(100);
    }
  };

  const onChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUserDetails({ ...userDetails, [e.target.name]: value });
  };

  return (
    <div className="flex flex-col gap-5 border rounded-xl justify-center mt-[25vh] p-8">
      <h1>Add </h1>
      <button
        className="bg-blue-500 text-white rounded-2xl px-4 p-2 font-semibold mt-3"
        onClick={() => {
          navigate.push("/");
        }}>
        Home
      </button>
      <form onSubmit={handleSubmit}>
        <div className="flex-col ">
          <label className="flex px-4">
            User ID:
            <input
              type="text"
              name="id"
              value={userDetails.id}
              onChange={onChange}
              required
              className="rounded-lg  mt-2 border-gray-500 p-2 w-full"
            />
          </label>
        </div>

        <br />
        <div className="flex-col">
          <label className="flex">
            First Name:
            <input
              type="text"
              name="firstname"
              value={userDetails.firstname}
              onChange={onChange}
              required
              className="rounded-lg  mt-2 border-gray-500 p-2 w-full"
            />
          </label>
        </div>

        <br />
        <div className="flex-col">
          <label className="flex">
            Last Name:
            <input
              type="text"
              name="lastname"
              value={userDetails.lastname}
              onChange={onChange}
              required
              className="rounded-lg  mt-2 border-gray-500 p-2 w-full"
            />
          </label>
        </div>

        <br />
        <div className="flex-col">
          <label className="flex">
            Email:
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={onChange}
              required
              className="rounded-lg  mt-2 border-gray-500 p-2 w-full"
            />
          </label>
        </div>
        <br />

        <label className="flex">
          Gender:
          <select
            name="gender"
            value={userDetails.gender}
            onChange={onChange}
            required
            className="rounded-lg  mt-2 border-gray-500 p-2 w-full">
            <option value="">Choose...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Agender">Agender</option>
          </select>
        </label>
        <br />
        <label className="flex">
          Domain:
          <select
            name="domain"
            value={userDetails.domain}
            onChange={onChange}
            className="rounded-lg  mt-2 border-gray-500 p-2 w-full"
            required>
            <option value="">Choose...</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="IT">IT</option>
            <option value="Management">Management</option>
            <option value="UI Designing">UI Designing</option>
            <option value="Business Development">Business Development</option>
          </select>
        </label>
        <br />
        <div>
          <label className="flex">
            Avatar URL:
            <input
              type="text"
              name="avatar"
              value={userDetails.avatar}
              onChange={onChange}
              required
              className="rounded-lg  mt-2 border-gray-500 p-2 w-full"
            />
          </label>
        </div>

        <br />
        <div>
          <label className="flex">
            Available:
            <input
              type="checkbox"
              name="available"
              checked={userDetails.available}
              onChange={onChange}
              className="rounded-lg  mt-2 border-gray-500 p-2 w-full"
            />
          </label>
        </div>

        <br />

        <button
          type="submit"
          className="bg-white text-black rounded-2xl px-4 p-2 font-semibold">
          Add User
        </button>
      </form>
    </div>
  );
};