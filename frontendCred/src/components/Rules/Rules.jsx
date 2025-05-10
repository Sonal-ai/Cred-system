import { Plus, ShoppingCart, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useCredits from "../../CustomHook/useCredits";


const Rules = () => {
  const [ruleData, setruleData] = useState([]);
  const { updateCredits } = useCredits();

  async function getData() {
    try {
      const response = await fetch("http://localhost:3000/rules");

      if (!response.ok) {
        throw new Error("Failed to fetch rules data");
      }

      const res = await response.json();

      if (res.status) setruleData(res.data || []);
      else alert("can't fetch data! ");
    } catch (err) {
      console.log(`error is ${err}`);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function notify(title,credits) {
    try {
      const response = await fetch("http://localhost:3000/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          credits: +credits,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const res = await response.json();
      if (res.status) {
        updateCredits(Number(credits));
        toast("🦄 credits added!");
      } else {
        alert("Submission failed! Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  }

  async function delteRule(id) {
    try {
      const response = await fetch(`http://localhost:3000/rules/${id}`, {
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
        toast.success("🦄 rule deleted succesfully!");
        getData();
      } else {
        alert("Submission failed! Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  }

  return (
    <div className="max-w-3xl mx-auto my-5 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        💰 How to Earn Credits
      </h2>
      <p className="text-gray-500 text-center mt-2">
        Follow these simple steps to earn credits
      </p>

      <div className="mt-6 space-y-4">
        {ruleData.length > 0 ? (
          ruleData.map((data) => (
            <div
              key={data._id}
              className="flex items-center bg-blue-100 p-2 rounded-lg shadow-md justify-between"
            >
              <div className="flex items-center">
                <span className="text-blue-600 text-2xl">{data.credits}</span>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {data.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{data.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full cursor-pointer "
                  onClick={() => notify(data.title,data.credits)}
                >
                  <ShoppingCart />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full cursor-pointer"
                  onClick={()=> delteRule(data._id)}
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No rules available.</p>
        )}

        <Link to={"/addrule"} className="flex bg-blue-100 p-2 rounded-lg shadow-md justify-end cursor-pointer">
          <p className=" px-3">Add Rule</p>
          <div className=" bg-cyan-500 rounded-full">
            <Plus />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Rules;
