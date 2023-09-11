import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAuthor } from "../redux/Slices/paperSlice";
import toast from "react-hot-toast";

const AuthorForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    authorID: "",
    name: "",
    paperName: "",
    domain: "",
    role: "",
    publishedThrough: "",
    email: "",
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();

    const formDataToSend = {
      authorID: formData.authorID,
      name: formData.name,
      paperName: formData.paperName,
      domain: formData.domain,
      role: formData.role,
      publishedThrough: formData.publishedThrough,
      email: formData.email,
    };

    try {
      const response = await fetch("http://localhost:4000/authorInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.status === 201) {
        const newAuthor = await response.json();
        dispatch(addAuthor(newAuthor));
        toast.success("Added an Author");
        navigate("/authors");
      } else {
        console.error("Error creating author.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center p-12 bg-gray-900">
      <div className="mx-auto w-full max-w-[550px] bg-gray-900">
        <form onSubmit={submitHandler} className="space-y-5">
          <div className="mb-5">
            <label
              htmlFor="authorID"
              className="mb-3 block text-base font-medium text-purple-400"
            >
              Author ID<sup>*</sup>
            </label>
            <input
              required
              type="text"
              name="authorID"
              onChange={changeHandler}
              placeholder="Enter Author ID"
              value={formData.authorID}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-purple-400"
            >
              Author Name<sup>*</sup>
            </label>
            <input
              required
              type="text"
              name="name"
              onChange={changeHandler}
              placeholder="Enter Author Name"
              value={formData.name}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="paperName"
              className="mb-3 block text-base font-medium text-purple-400"
            >
              Paper Name<sup>*</sup>
            </label>
            <input
              required
              type="text"
              name="paperName"
              onChange={changeHandler}
              placeholder="Enter Paper Name"
              value={formData.paperName}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="domain"
              className="mb-3 block text-base font-medium text-purple-400"
            >
              Domain<sup>*</sup>
            </label>
            <input
              required
              type="text"
              name="domain"
              onChange={changeHandler}
              placeholder="Enter Domain"
              value={formData.domain}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="role"
              className="mb-3 block text-base font-medium text-purple-400"
            >
              Role<sup>*</sup>
            </label>
            <input
              required
              type="text"
              name="role"
              onChange={changeHandler}
              placeholder="Enter Role"
              value={formData.role}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="publishedThrough"
              className="mb-3 block text-base font-medium text-purple-400"
            >
              Published Through<sup>*</sup>
            </label>
            <input
              required
              type="text"
              name="publishedThrough"
              onChange={changeHandler}
              placeholder="Enter Published Through"
              value={formData.publishedThrough}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-3 block text-base font-medium text-purple-400"
            >
              Email<sup>*</sup>
            </label>
            <input
              required
              type="email"
              name="email"
              onChange={changeHandler}
              placeholder="Enter Email"
              value={formData.email}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div>
            <button
              type="submit"
              className="hover:shadow-form w-full rounded-md hover:bg-purple-500 transition-colors  bg-purple-900 py-3 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Add Author
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthorForm;
