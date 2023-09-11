import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPaper } from "../redux/Slices/paperSlice";

const CreateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    journalName: "",
    authorID: "",
    paperID: "",
    issOrDoi: "",
    type: "Scopus",
    datePublished: "",
    pdfFile: null, // Add a new field for the PDF file
  });

  function changeHandler(event) {
    if (event.target.name === "pdfFile") {
      // Handle the file input separately
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.files[0], // Get the selected file
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

    // Create a FormData object to send both JSON and the file
    const formDataToSend = new FormData();
    formDataToSend.append("journalName", formData.journalName);
    formDataToSend.append("authorID", formData.authorID);
    formDataToSend.append("paperID", formData.paperID);
    formDataToSend.append("issOrDoi", formData.issOrDoi);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("datePublished", formData.datePublished);

    // Append the file only if it's not null
    if (formData.pdfFile) {
      formDataToSend.append("pdfFile", formData.pdfFile);
    }

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.status === 201) {
        // The upload was successful
        const data = await response.text();
        dispatch(addPaper(formData));
        navigate("/journel");
        console.log(data);
      } else {
        // Handle error cases here
        console.error("Error uploading PDF.");
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
              htmlFor="journalName"
              className="mb-3 block text-base font-medium text-purple-400"
            >
              Journal Name<sup>*</sup>
            </label>
            <input
              required
              type="text"
              name="journalName"
              onChange={changeHandler}
              placeholder="Enter Journal Name"
              value={formData.journalName}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

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
              htmlFor="issOrDoi"
              className="mb-3 block text-base font-medium text-purple-400"
            >
              ISS/DOI<sup>*</sup>
            </label>
            <input
              required
              type="text"
              name="issOrDoi"
              onChange={changeHandler}
              placeholder="Enter ISS/DOI"
              value={formData.issOrDoi}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="type"
              className="mb-3 block text-base font-medium text-purple-400"
            >
              Type<sup>*</sup>
            </label>
            <select
              name="type"
              onChange={changeHandler}
              value={formData.type}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
              <option value="Scopus">Scopus</option>
              <option value="Q1Q2Q3">Q1Q2Q3</option>
              <option value="WOS">WOS</option>
            </select>
          </div>

          <div className="mb-6 pt-4">
            <label className="mb-5 block text-xl font-semibold text-purple-400">
              Upload File
            </label>

            <div className="mb-8">
              <input
                type="file"
                name="pdfFile"
                id="pdfFile"
                className="sr-only"
                onChange={changeHandler}
              />
              <label
                htmlFor="pdfFile"
                className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center cursor-pointer"
              >
                <div>
                  <span className="mb-2 block text-xl font-semibold text-purple-400">
                    {formData.pdfFile
                      ? formData.pdfFile.name
                      : "Drop files here"}
                  </span>
                  <span className="mb-2 block text-base font-medium text-[#6B7280]">
                    Or
                  </span>
                  <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-purple-400">
                    Browse
                  </span>
                </div>
              </label>
            </div>

            {formData.pdfFile && (
              <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                <div className="flex items-center justify-between">
                  <span className="truncate pr-3 text-base font-medium text-purple-400">
                    {formData.pdfFile.name}
                  </span>
                  <button
                    className="text-purple-400"
                    onClick={() => {
                      // Clear the selected file
                      setFormData((prevData) => ({
                        ...prevData,
                        pdfFile: null,
                      }));
                      // Clear the input field (optional)
                      document.getElementById("pdfFile").value = "";
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.37190 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="datePublished"
              className="mb-3 block text-base font-medium text-purple-400"
            >
              Date Published<sup>*</sup>
            </label>
            <input
              required
              type="date"
              name="datePublished"
              onChange={changeHandler}
              value={formData.datePublished}
              className="w-full rounded-md border border-[#e0e0e0] bg-gray-800 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div>
            <button
              type="submit"
              className="hover:shadow-form w-full rounded-md  hover:bg-purple-500 transition-colors  bg-purple-900 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Add journal Paper
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
