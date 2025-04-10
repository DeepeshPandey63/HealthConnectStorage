import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm">
        {/* left section */}
        <div>
          <div className="flex items-center">
            <img
              onClick={() => navigate("/")}
              className="cursor-pointer w-32"
              src={assets.logo2}
              alt=""
            />

            <span className="text-2xl font-bold">Health Connect</span>
          </div>
          <p className="w-full md:w-2/3 text-sm text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        {/* center section */}
        <div>
          <p className="text-xl font-medium mb-4">COMPANY</p>
          <ul className="flex flex-col text-sm gap-3 text-gray-600">
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("/");
                scrollTo(0,0);
              }}
            >
              Home
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("/about");
                scrollTo(0, 0);
              }}
            >
              About us
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("/contact");
                scrollTo(0,0);
              }}
            >
              Contact us
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("/");
                scrollTo(0,0);
              }}
            >
              Privacy policy
            </li>
          </ul>
        </div>
        {/* right section */}
        <div>
          <p className="text-xl font-medium mb-4">GET IN TOUCH</p>
          <ul className="flex flex-col text-sm gap-4 text-gray-600">
            <li>+0-000-000-000</li>
            <li>example@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        {/* copyright text */}
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025 @ InnovaCare.dev - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
