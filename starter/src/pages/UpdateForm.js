import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateForm = () => {
  const { id } = useParams(); // Use useParams to get id
  const navigate = useNavigate();
  console.log(id);

  const [formData, setFormData] = useState({
    // paperID: "",
    // journalName: "",
    // authorID: "",
    // issOrDoi: "",
    // type: "Scopus",
    // datePublished: "",
  });

  const updateHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:4000/journalPaper/${id}`,
        formData
      );

      if (response.status === 200) {
        toast.success("Paper updated successfully");
        navigate("/journel");
      } else {
        toast.error("Failed to update paper");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating paper");
    }
  };

  const changeHandler = (e) => {
    const data = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center p-12 bg-gray-900">
      <div className="mx-auto w-full max-w-[550px] bg-gray-900">
        <form onSubmit={updateHandler} className="space-y-5">
          <div className="mb-5">
            <label className="block text-base font-medium text-purple-400">
              Journal Name<sup>*</sup>
            </label>
            <input
              type="text"
              name="journalName"
              onChange={changeHandler}
              placeholder="Enter Journal Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label className="block text-base font-medium text-purple-400">
              Author ID<sup>*</sup>
            </label>
            <input
              type="text"
              name="authorID"
              onChange={changeHandler}
              placeholder="Enter Author ID"
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label className="block text-base font-medium text-purple-400">
              Paper ID<sup>*</sup>
            </label>
            <input
              type="text"
              name="paperID"
              onChange={changeHandler}
              placeholder="Enter Paper ID"
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label className="block text-base font-medium text-purple-400">
              ISS/DOI<sup>*</sup>
            </label>
            <input
              type="text"
              name="issOrDoi"
              onChange={changeHandler}
              placeholder="Enter ISS/DOI"
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label className="block text-base font-medium text-purple-400">
              Type<sup>*</sup>
            </label>
            <select
              name="type"
              onChange={changeHandler}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
              <option value="Scopus">Scopus</option>
              <option value="Q1Q2Q3">Q1Q2Q3</option>
              <option value="WOS">WOS</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-base font-medium text-purple-400">
              Date Published<sup>*</sup>
            </label>
            <input
              type="date"
              name="datePublished"
              onChange={changeHandler}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div>
            <button
              type="submit"
              className="hover:shadow-form w-full rounded-md hover:bg-purple-500 transition-colors  bg-purple-900 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Update Paper
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
