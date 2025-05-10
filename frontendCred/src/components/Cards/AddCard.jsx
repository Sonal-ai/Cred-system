import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCard = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    credits: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(data.description==="") data.description="-";

    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const res = await response.json();
      if(res.status){
        toast("🦄 card added!");
        navigate('/')
      }else {
        alert("Submission failed! Try again.");
      }

      setData({
        title: "",
        description: "",
        credits: "",
      });

    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="h-96 flex items-center justify-center ">
      <div className="relative">
        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
        <div
          id="form-container"
          className="h-80 w-[500px] bg-white px-12 py-5 rounded-lg shadow-2xl relative z-10 transform transition duration-500 ease-in-out"
        >
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              className="w-full h-10 border border-gray-800 px-3 rounded-lg"
              placeholder="Title"
              id="title"
              name="title"
              type="text"
              required
              value={data.title}
              onChange={handleChange}
            />
            <textarea
              className="w-full border border-gray-800 px-3 rounded-lg"
              placeholder="description"
              id="description"
              rows="3"
              name="description"
              value={data.description}
              onChange={handleChange}
            ></textarea>
            <input
              className="w-full h-10 border border-gray-800 px-3 rounded-lg"
              placeholder="credits"
              id="credits"
              name="credits"
              type="number"
              required
              value={data.credits}
              onChange={handleChange}
            />
            <button type="submit" className="h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create Card
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
