import React from "react";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("e");
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="global-container--register-form">
      <div className="container--register-form">
        <h2 className="title">INSCRIVEZ VOUS</h2>
        <form onSubmit={handleSubmit}>
          <div className="container-form-fields">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="container-form-fields">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="container-form-fields">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="container-btn-submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
