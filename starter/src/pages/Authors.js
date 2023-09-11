import React from "react";
import { HiPlus } from "react-icons/hi";
import AuthorTable from "../components/AuthorTable";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export default function Journel() {
  const paper = useSelector((state) => state.paper);
  const navigate = useNavigate();
  return (
    <div className="bg-gray-900 h-screen py-3 overflow-hidden mx-auto">
      <div className="text-white mx-auto w-11/12 py-5 my-3">
        <p className="text-purple-800 font-bold text-3xl ">AUTHORS</p>
        <span>You can find the complete list of authors here</span>
      </div>

      <div className="mx-auto w-11/12 ">
        <button className=" hover:shadow-form rounded-md hover:bg-purple-500 transition-colors  bg-purple-900 py-3 px-8 text-center text-base font-semibold text-white outline-none">
          <NavLink
            to="/createAuthorForm"
            className="flex items-center justify-center space-x-2 "
          >
            <HiPlus />
            <span>Add Author</span>
          </NavLink>
        </button>
      </div>
      <div className="py-8 mx-auto w-11/12">
        <AuthorTable />
      </div>
    </div>
  );
}
