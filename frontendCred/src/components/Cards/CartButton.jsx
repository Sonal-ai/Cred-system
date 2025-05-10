import React from 'react';
import { useState } from "react";
import { toast } from 'react-toastify';
import useCredits from '../../CustomHook/useCredits';

const CartButton = ({ title, credits }) => {
  const [hovered, setHovered] = useState(false);
  const { updateCredits } = useCredits();

  const notify = async () => {
    try {
      const response = await fetch("http://localhost:3000/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title:title,
          credits:-credits,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      
      const res = await response.json();
      if(res.status){
        updateCredits(Number(-credits));
        toast('🦄 credits deducted!');
      }else {
        alert("Submission failed! Try again.");
      }


    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }

  }


  return (
    <button
      className="relative w-[140px] h-[40px] rounded-xl border-none bg-yellow-400 flex items-center justify-center cursor-pointer transition duration-500 overflow-hidden shadow-md active:scale-95"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={notify}
    >
      <span
        className={`absolute left-[-50px] w-[30px] h-[30px] flex items-center justify-center rounded-full transition-transform duration-500 ${
          hovered ? "translate-x-[58px] rounded-full" : ""
        }`}
      >
        🛒 
      </span>
      <span
        className={`text-black text-[1.04em] font-semibold transition-transform duration-500 ${
          hovered ? "translate-x-[10px]" : ""
        }`}
      >
        Add to Cart
      </span>
    </button>
  );
};

export default CartButton;


