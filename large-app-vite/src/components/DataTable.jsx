const DataTable = ({ data, tableName }) => {
  if (!data || data.length === 0) {
    return <p className="text-center">No data available for {tableName}.</p>;
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-2">{tableName}</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-2 border-b text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              {columns.map((col) => (
                <td key={col} className="px-4 py-2 border-b">
                  {row[col] !== null ? row[col].toString() : "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
