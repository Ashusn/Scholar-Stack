import React, { useState, useEffect } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { removePaper } from "../redux/Slices/paperSlice";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";

export default function Table() {
  const dispatch = useDispatch();
  const papers = useSelector((state) => state.paper);
  const [journals, setJournals] = useState(null);
  const [updatedTable, setUpdateTable] = useState("");
  const [loading, setLoading] = useState(true);

  const removeClickHandler = async (paperID) => {
    try {
      const response = await fetch(
        `http://localhost:4000/journalPaper/${paperID}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        return toast.error("Item is not deleted!");
      }
      dispatch(removePaper(paperID));
      toast.error("Journal Paper Removed");
      setUpdateTable(paperID);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // Update local state journals to reflect removed journal
    setJournals(journals.filter((item) => item.paperID !== paperID));
  };

  const getPapers = async () => {
    try {
      const response = await fetch("http://localhost:4000/journalPaper", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setJournals(data);
      console.log(data);
      setLoading(false); // Data fetching is complete
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Data fetching failed
    }
  };

  useEffect(() => {
    getPapers();
    // Fetch papers when the component mounts
  }, [updatedTable]);

  if (loading) {
    return <div className="text-center">Loading...</div>; // You can replace this with a loading spinner
  }

  if (journals === null) {
    return <div className="text-center">No data available</div>;
  }

  return (
    <>
      <div className="flex flex-col ">
        <div className="overflow-hidden ">
          <div className="align-middle inline-block  flex justify-center  items-center mx-auto sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-purple-400  w-full sm:rounded-lg">
              <table className="w-full divide-y mx-auto divide-gray-200 ">
                <thead className="bg-purple-800 hover:bg-purple-600 transition-colors">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Journal Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      AuthorID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      PaperID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      ISS/DOI
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Date Published
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Download Here
                    </th>
                    <th scope="col" className="relative px-6 py-3 text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {journals.map((journal) => (
                    <tr key={journal._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {journal.journalName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {journal.authorID}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {journal.paperID}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {journal.issOrDoi}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {journal.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {journal.datePublished}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                        {journal.pdfData ? (
                          <a
                            href={`http://localhost:4000/journalPaper/${journal._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Download PDF
                          </a>
                        ) : (
                          "No PDF Available"
                        )}
                      </td>
                      <td className="flex px-6 py-4 space-x-2 whitespace-nowrap justify-around items-center">
                        <NavLink
                          to={`/update/${journal._id}`}
                          className="p-3 bg-yellow-500 rounded-md"
                        >
                          <BsFillPencilFill className="text-black" />
                        </NavLink>
                        <button
                          onClick={() => {
                            removeClickHandler(journal._id);
                          }}
                          className="p-3 bg-red-700 rounded-md text-white"
                        >
                          <BsFillTrashFill />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
