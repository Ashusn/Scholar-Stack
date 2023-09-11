import React, { useState, useEffect } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { removePaper } from "../redux/Slices/paperSlice";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";

export default function Table() {
  const dispatch = useDispatch();
  const papers = useSelector((state) => state.paper);
  const [citations, setCitations] = useState(null);
  const [updatedTable, setUpdateTable] = useState("");
  const [loading, setLoading] = useState(true);

  const getPapers = async () => {
    try {
      const response = await fetch("http://localhost:4000/citationPaper", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCitations(data);
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

  if (citations === null) {
    return <div className="text-center">No data available</div>;
  }

  return (
    <>
      <div className="flex flex-col ">
        <div className="overflow-hidden ">
          <div className="align-middle inline-block  flex justify-center items-center mx-auto sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 w-full sm:rounded-lg">
              <table className="w-full divide-y mx-auto divide-gray-200">
                <thead className="bg-purple-800 hover:bg-purple-600 transition-colors">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      CitationID
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
                      CitedPaperID
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Citation Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {citations.map((citation) => (
                    <tr key={citation._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {citation.citationID}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {citation.paperID}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">
                        {citation.citedPaperID}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">
                        {citation.citationDate}
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
