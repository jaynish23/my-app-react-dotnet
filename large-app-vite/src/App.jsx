// import React, { useState } from "react";
// import DataGridComponent from "./components/DataGridComponent";
// import { Button } from "@mui/material";
// import "./App.css";

// function App() {
//   const [entity, setEntity] = useState("Products");

//   return (
//     <div className="App">
//       <h1>Large Scale App</h1>
//       <div>
//         <Button onClick={() => setEntity("Products")}>Products</Button>
//         <Button onClick={() => setEntity("Orders")}>Orders</Button>
//         <Button onClick={() => setEntity("Customers")}>Customers</Button>
//         <Button onClick={() => setEntity("Inventory")}>Inventory</Button>
//         <Button onClick={() => setEntity("Suppliers")}>Suppliers</Button>
//       </div>
//       <DataGridComponent entity={entity} />
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "./components/DataTable";
import "./App.css";

const App = () => {
  const [tableName, setTableName] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 25;
  const tables = ["Customers", "Inventory", "Orders", "Products", "Suppliers"];

  const fetchData = async (selectedTable, page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5106/api/data/fetch",
        {
          tableName: selectedTable,
          pageNumber: page,
          pageSize,
        }
      );
      setData(response.data);
    } catch (err) {
      setError(err.response?.data || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleTableSelect = (table) => {
    setTableName(table);
    setPageNumber(1); // Reset to first page
    fetchData(table, 1);
  };

  const handleNextPage = () => {
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);
    fetchData(tableName, nextPage);
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      const prevPage = pageNumber - 1;
      setPageNumber(prevPage);
      fetchData(tableName, prevPage);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        LargeScaleDB Frontend
      </h1>
      <div className="flex justify-center gap-2 mb-6">
        {tables.map((table) => (
          <button
            key={table}
            onClick={() => handleTableSelect(table)}
            className={`px-4 py-2 rounded ${
              tableName === table
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {table}
          </button>
        ))}
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {tableName && !loading && !error && (
        <>
          <DataTable data={data} tableName={tableName} />
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handlePrevPage}
              disabled={pageNumber === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="self-center">Page {pageNumber}</span>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;