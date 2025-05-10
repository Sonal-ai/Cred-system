import { useState } from "react";
import useCredits  from "../CustomHook/useCredits";

const Wallet = () => {
  const [Isbalance, setIsbalance] = useState(false);

  const { credits , fetchCredits } = useCredits();

  return (
    <div className={`relative w-[320px] h-[100px] bg-white rounded-lg overflow-hidden flex items-center shadow-lg transition-transform duration-300 ease-out hover:scale-[1.0] hover:shadow-2xl group`}
    onClick={() => {
      if(Isbalance) setIsbalance(false);
      else {
        setIsbalance(true);
        fetchCredits();
      }
    }}>
      {/* Overlay */}
      <div className={`absolute w-[120px] h-[120px] bg-[#ceb2fc] rounded-full top-[15px] left-[20px] transition-transform duration-400 ease-out ${Isbalance && "scale-[5]"}`}></div>

      {/* Icon Circle */}
      <div className="relative w-[90px] h-[90px] bg-white border-2 border-[#ceb2fc] rounded-full flex justify-center items-center ml-6 transition-all duration-300 ease-out ">
        <div className="absolute w-[75px] h-[75px] bg-[#ceb2fc] rounded-full transition-opacity duration-300 ease-out "></div>

        {/* SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="23 29 78 60"
          height="40px"
          width="55px"
          className="relative z-10"
        >
          <g
            transform="translate(23.000000, 29.500000)"
            fillRule="evenodd"
            fill="none"
            strokeWidth="1"
            stroke="none"
          >
            <rect
              rx="4.7"
              height="21.88"
              width="9.4"
              y="26.03"
              x="67.83"
              fill="#AC8BE9"
            ></rect>
            <rect
              rx="4.7"
              height="10.96"
              width="9.4"
              y="38.77"
              x="67.83"
              fill="#6A5297"
            ></rect>
            <polygon
              points="57.3 0 67.16 26.37 14.44 45.06 4.58 18.69"
              fill="#6A5297"
            ></polygon>
            <path
              fill="#8B6FC0"
              d="M0,19.61 C0,16.29 2.68,13.60 5.99,13.60 H67.64 C70.95,13.60 73.63,16.28 73.63,19.61 V52.66 C73.63,55.98 70.95,58.67 67.64,58.67 H5.99 C2.68,58.67 0,55.98 0,52.66 V19.61 Z"
            ></path>
            <path
              fill="#F6F1FF"
              d="M47.51,27.08 C45.00,24.53 40.93,24.53 38.42,27.08 L36.90,28.61 L35.39,27.08 C32.87,24.53 28.80,24.53 26.29,27.08 C23.78,29.62 23.78,33.75 26.29,36.30 L36.90,47.05 L47.51,36.30 C50.02,33.75 50.02,29.62 47.51,27.08"
            ></path>
            <rect
              height="12.86"
              width="15.60"
              y="26.11"
              x="58.03"
              fill="#AC8BE9"
            ></rect>
            <ellipse
              ry="2.23"
              rx="2.20"
              cy="33.09"
              cx="65.83"
              fill="#FFFFFF"
            ></ellipse>
          </g>
        </svg>
      </div>

      {/* Text Section */}
      <p className={`ml-6 text-[20px] font-semibold text-[#4c5656] transition-colors duration-450 ease-out ${Isbalance && "text-[#6A5297]"}`}>
    <span className={`relative z-0 ${Isbalance?"hidden":"block"}`}>&nbsp;&nbsp;&nbsp;Wallet</span>
    <span className={`relative z-1 ${Isbalance?"block":"hidden"}`}>&nbsp;&nbsp;&nbsp;{credits} Credits</span>
  </p>
    </div>
  );
};

export default Wallet;
