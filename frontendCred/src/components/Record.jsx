import { useState } from "react";
import { CircleFadingArrowUp, History, RotateCcw } from "lucide-react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import React from "react";
import useCredits  from "../CustomHook/useCredits";

const Historyline = ({ credits, title }) => {
  return (
    <>
      <div className="flex justify-between items-center text-neutral-200 ">
        <span className="w-16 text-center  text-white ">{credits}</span>
        <span className="flex-1 text-left ">{title}</span>
      </div>
      <hr className="border-neutral-700" />
    </>
  );
};

export default function Record() {
  const { updateCredits } = useCredits();

  const [isOpen, setIsOpen] = useState(false);
  const [historyData, sethistoryData] = useState([]);
  const [historyform, sethistoryform] = useState({ title: "", credits: "" });

  async function getData() {
    try {
      const response = await fetch("http://localhost:3000/history");

      if (!response.ok) {
        throw new Error("Failed to fetch history data");
      }

      const res = await response.json();

      if (res.status) sethistoryData(res.data || []);
      else alert("can't fetch data! ");
    } catch (err) {
      console.log(`error is ${err}`);
    }
  };

  async function deleteData() {
    try {
      const response = await fetch(`http://localhost:3000/history/del`, {
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
        toast.success("🦄 history deleted succesfully!");
        getData();
      } else {
        alert("Submission failed! Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  const handleChange = (e) => {
    sethistoryform({ ...historyform, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historyform),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const res = await response.json();
      if (res.status) {
        toast("🦄 history Updated!");
        updateCredits(Number(historyform.credits));
        sethistoryform({ title: "", credits: "" });
        getData();
      } else {
        alert("Submission failed! Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="text-center">
      {/* Toggle Button */}
      <button
        className=" cursor-pointer fixed top-4 right-4 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium text-sm p-1.5 transition-colors duration-300"
        onClick={() => {
          setIsOpen(true);
          getData();
        }}
      >
        <History />
      </button>

      {/* Drawer */}
      <div
        className={`fixed flex-col gap-2 top-0 right-0 z-40 h-screen px-4 pt-4 pb-2 overflow-y-auto transition-transform mb-10 bg-white w-96 dark:bg-gray-800 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-base font-semibold text-white flex items-center">
            History
          </h5>
          <div className="flex items-center gap-3">
            <button onClick={deleteData}
            className="px-2 py-1 text-gray-200 bg-gray-500 hover:bg-gray-200 hover:text-gray-900 cursor-pointer rounded-lg text-sm dark:hover:bg-gray-600 dark:hover:text-white">
              Clear All
            </button>
            <button onClick={getData}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 cursor-pointer rounded-lg text-sm w-6 h-6 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 cursor-pointer rounded-lg text-sm w-6 h-6 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className=" h-[640px] overflow-y-scroll custom-scrollbar p-4">
          <div className="text-left">
            {historyData.length > 0 ? (
              historyData.map((data) => (
                <Historyline
                  key={data._id}
                  credits={data.credits}
                  title={data.title}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No history available.</p>
            )}
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex gap-2 text-neutral-200 fixed z-20 bottom-3 p-2 rounded-lg bg-neutral-600 w-[355px]"
        >
          <input
            className=" pl-1 border-[1px] border-neutral-200 w-18 rounded-lg "
            type="number"
            placeholder="credits"
            name="credits"
            id="credits"
            required
            value={historyform.credits}
            onChange={handleChange}
          />
          <input
            className=" border-[1px] border-neutral-200 w-[390px] rounded-lg px-1"
            type="text"
            placeholder="title"
            name="title"
            id="title"
            required
            value={historyform.title}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-neutral-800 rounded-full cursor-pointer "
          >
            <CircleFadingArrowUp className="m-2" />
          </button>
        </form>
      </div>
    </div>
  );
}
