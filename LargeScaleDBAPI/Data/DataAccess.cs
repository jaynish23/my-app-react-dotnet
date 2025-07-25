// using System;
// using System.Collections.Generic;
// using System.IO;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.Data.SqlClient;
// using System.Data;

// namespace LargeScaleDBAPI.Data;

// public class DataAccess
// {
//     private readonly string _connectionString;

//     public DataAccess(IConfiguration configuration)
//     {
//         _connectionString = configuration.GetConnectionString("DefaultConnection");
//     }

//     public async Task<List<Dictionary<string, object>>> ExecuteDynamicFetchAsync(string tableName, int pageNumber, int pageSize)
//     {
//         var result = new List<Dictionary<string, object>>();

//         using (var connection = new SqlConnection(_connectionString))
//         {
//             await connection.OpenAsync();
//             using (var command = new SqlCommand("DynamicFetchData", connection))
//             {
//                 command.CommandType = CommandType.StoredProcedure;
//                 command.Parameters.AddWithValue("@TableName", tableName);
//                 command.Parameters.AddWithValue("@PageNumber", pageNumber);
//                 command.Parameters.AddWithValue("@PageSize", pageSize);

//                 using (var reader = await command.ExecuteReaderAsync())
//                 {
//                     while (await reader.ReadAsync())
//                     {
//                         var row = new Dictionary<string, object>();
//                         for (int i = 0; i < reader.FieldCount; i++)
//                         {
//                             row[reader.GetName(i)] = reader.GetValue(i);
//                         }
//                         result.Add(row);
//                     }
//                 }
//             }
//         }

//         return result;
//     }
// }
using Microsoft.Data.SqlClient;
using System.Data;

namespace LargeScaleDBAPI.Data;

public class DataAccess
{
    private readonly string _connectionString;

    public DataAccess(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public async Task<List<Dictionary<string, object>>> ExecuteDynamicFetchAsync(string tableName, int pageNumber, int pageSize)
    {
        var result = new List<Dictionary<string, object>>();

        using (var connection = new SqlConnection(_connectionString))
        {
            await connection.OpenAsync();
            using (var command = new SqlCommand("DynamicFetchData", connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                // Add parameters for the stored procedure
                command.Parameters.AddWithValue("@TableName", tableName);
                command.Parameters.AddWithValue("@PageNumber", pageNumber);
                command.Parameters.AddWithValue("@PageSize", pageSize);

                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        var row = new Dictionary<string, object>();
                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        result.Add(row);
                    }
                }
            }
        }

        return result;
    }
}