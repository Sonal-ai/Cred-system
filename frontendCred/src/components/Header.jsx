import React from "react";
import Wallet from "./Wallet";
import Record from "./Record";
import { AlignLeft, House } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-700 to-[#B06AB3] px-6 py-12">
        <div className="container mx-auto flex flex-col justify-center items-center text-center">
          <h2 className="text-white sm:text-4xl text-3xl font-bold mb-6">
            Discover My New Collection
          </h2>
          <p className="text-white text-base text-center mb-12">
            Elevate your style with My latest arrivals. Shop now and enjoy the
            life to the fullest!
          </p>
          <Wallet />
          <Record />
          <Link to={'/rules'}
            className=" cursor-pointer fixed top-4 right-16 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium text-sm p-1.5 transition-colors duration-300"
          >
            <AlignLeft/>
          </Link>
          <Link to={'/'}
            className=" cursor-pointer fixed top-4 right-28 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium text-sm p-1.5 transition-colors duration-300"
          >
            <House/>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
