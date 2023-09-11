import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Table() {
  const dispatch = useDispatch();
  const papers = useSelector((state) => state.paper);
  const [authors, setAuthors] = useState(null);
  const [updatedTable, setUpdateTable] = useState("");
  const [loading, setLoading] = useState(true);

  const getPapers = async () => {
    try {
      const response = await fetch("http://localhost:4000/authorInfo", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setAuthors(data);
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

  if (authors === null) {
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
                      AuthorID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      PaperName
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Domain
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Published Through
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {authors.map((author) => (
                    <tr key={author._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {author.authorID}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {author.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {author.paperName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {author.domain}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {author.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {author.publishedThrough}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {author.email}
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
