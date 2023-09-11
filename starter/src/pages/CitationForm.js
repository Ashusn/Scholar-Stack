import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCitation } from "../redux/Slices/paperSlice";
import toast from "react-hot-toast";

const CitationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    citationID: "",
    paperID: "",
    citedPaperID: "",
    citationDate: "",
  });

  function changeHandler(event) {
    if (event.target.name === "pdfFile") {
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value,
      }));
    }
  }

  async function submitHandler(event) {
    event.preventDefault();

    const formDataToSend = {
      citationID: formData.citationID,
      paperID: formData.paperID,
      citedPaperID: formData.citedPaperID,
      citationDate: formData.citationDate,
    };

    try {
      const response = await fetch("http://localhost:4000/citationPaper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(formDataToSend), // Convert the data to JSON format
      });

      if (response.status === 201) {
        // The citation was created successfully
        const newCitation = await response.json();
        console.log("New Citation:", newCitation);
        // You can dispatch an action if needed
        dispatch(addCitation(newCitation));

        // Navigate to the desired route
        toast.success("Added a Citation");
        navigate("/citations");
      } else {
        // Handle error cases here
        console.error("Error creating citation.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center p-12 bg-gray-900 h-screen">
      <div className="mx-auto w-full max-w-[550px] bg-gray-900">
        <form onSubmit={submitHandler} className="space-y-5">
          <div className="mb-5">
            <label
              htmlFor="citationID"
              className="mb-3 block text-base font-medium text-purple-400"
            >
              Citation ID<sup>*</sup>
            </label>
            <input
              required
              type="text"
              name="citationID"
              onChange={changeHandler}
              placeholder="Enter Citation ID"
              value={formData.citationID}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="paperID"
              className="mb-3 block text-base font-medium text-purple-400"
            >
              Paper ID<sup>*</sup>
            </label>
            <input
              required
              type="text"
              name="paperID"
              onChange={changeHandler}
              placeholder="Enter Paper ID"
              value={formData.paperID}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="citedPaperID"
              className="mb-3 block text-base font-medium text-purple-400"
            >
              Cited Paper ID<sup>*</sup>
            </label>
            <input
              required
              type="text"
              name="citedPaperID"
              onChange={changeHandler}
              placeholder="Enter Cited Paper ID"
              value={formData.citedPaperID}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="citationDate"
              className="mb-3 block text-base font-medium text-purple-400"
            >
              Citation Date<sup>*</sup>
            </label>
            <input
              required
              type="date"
              name="citationDate"
              onChange={changeHandler}
              value={formData.citationDate}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div>
            <button
              type="submit"
              className="hover:shadow-form w-full rounded-md hover:bg-purple-500 transition-colors  bg-purple-900 py-3 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Add journal Paper
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CitationForm;
