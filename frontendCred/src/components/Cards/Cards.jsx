import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cross , X } from "lucide-react";
import CartButton from "./CartButton";
import { toast } from "react-toastify";

const Cards = () => {
  const [cardData, setcardData] = useState([]);
  
  async function getData() {
    try {
      const response = await fetch("http://localhost:3000/");

      if (!response.ok) {
        throw new Error("Failed to fetch cards data");
      }

      const res = await response.json();

      if (res.status) setcardData(res.data || []);
      else alert("can't fetch data! ");
    } catch (err) {
      console.log(`error is ${err}`);
    }
  }

  async function deleteData(id) {
    try {
      const response = await fetch(`http://localhost:3000/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete id");
      }

      const res = await response.json();
      if (res.status) {
        toast.success("🦄 card deleted succesfully!");
        getData();
      } else {
        alert("Submission failed! Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className=" flex flex-wrap justify-evenly mt-10 gap-y-10 mb-20">
        {cardData.length > 0 ? (
          cardData.map((data) => (
            <div
              key={data._id}
              className="w-[300px] h-[250px] rounded-lg text-white overflow-hidden relative bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#C850C0] transition-colors duration-500 ease-in-out hover:from-[#3a4eb8] hover:via-[#b040b0] hover:to-[#b040b0]"
            >
              <div className="p-5 relative z-10 flex flex-col gap-2 items-center justify-center text-center h-full">
                <h5 className="text-xl font-bold uppercase">{data.title}</h5>
                <p>{data.description}</p>
                <span className="text-lg opacity-80">
                  {data.credits} credits
                </span>
                <CartButton title={data.title} credits={data.credits} />
                <X
                  className="absolute top-2 right-2 cursor-pointer w-4 h-4"
                  onClick={() => deleteData(data._id)}

                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No cards available.</p>
        )}

        <Link
          to={"/card"}
          className="relative top-40 flex items-center justify-center w-16 h-16 bg-purple-500 text-white text-3xl font-bold rounded-full shadow-lg cursor-pointer hover:bg-purple-600 transition-all"
        >
          <Cross />
        </Link>
      </div>
    </>
  );
};

export default Cards;
