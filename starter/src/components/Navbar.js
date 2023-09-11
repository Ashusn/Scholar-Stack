import React from "react";
import { NavLink } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className=" flex justify-center py-6 pr-5 mx-auto bg-gray-900">
      <nav className="flex justify-between items-center w-full h-16  mx-auto">
        <NavLink
          to="/"
          className="ml-6 mt-6 flex items-center gap-3  text-5xl text-white"
        >
          𝓢𝓬𝓱𝓸𝓵𝓪𝓻𝓢𝓽𝓪𝓬𝓴
          <span>
            <FaPaperPlane className="text-purple-600" />
          </span>
        </NavLink>

        <div className="flex items-center font-medium text-lg text-violet-400 mr-5 space-x-6">
          <NavLink
            to="/journel"
            activeclassname="text-violet-200"
            className="hover:text-violet-400 transition-colors duration-300"
          >
            Journals
          </NavLink>

          <NavLink
            to="/authors"
            activeclassname="text-violet-200"
            className="hover:text-violet-400 transition-colors duration-300"
          >
            Authors
          </NavLink>

          <NavLink
            to="/citations"
            activeclassname="text-violet-200"
            className="hover:text-violet-400 transition-colors duration-300"
          >
            Citations
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
