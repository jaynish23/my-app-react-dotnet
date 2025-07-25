// using System;
// using System.Collections.Generic;
// using System.IO;
// using System.Linq;
// using System.Threading.Tasks;
// using LargeScaleDBAPI.Data;
// using LargeScaleDBAPI.Models;
// using Microsoft.AspNetCore.Mvc;

// namespace LargeScaleDBAPI.Controllers;

// [Route("api/[controller]")]
// [ApiController]
// public class DataController : ControllerBase
// {
//     private readonly DataAccess _dataAccess;

//     public DataController(DataAccess dataAccess)
//     {
//         _dataAccess = dataAccess;
//     }

//     [HttpPost("fetch")]
//     public async Task<IActionResult> FetchData([FromBody] DataRequest request)
//     {
//         if (request == null || string.IsNullOrEmpty(request.TableName))
//         {
//             return BadRequest("TableName is required.");
//         }

//         try
//         {
//             var validTables = new[] { "Customers", "Inventory", "Orders", "Products", "Suppliers" };
//             if (!validTables.Contains(request.TableName, StringComparer.OrdinalIgnoreCase))
//             {
//                 return BadRequest("Invalid table name.");
//             }

//             var data = await _dataAccess.ExecuteDynamicFetchAsync(request.TableName, request.PageNumber, request.PageSize);
//             return Ok(data);
//         }
//         catch (Exception ex)
//         {
//             return StatusCode(500, $"An error occurred: {ex.Message}");
//         }
//     }
// }
using LargeScaleDBAPI.Data;
using LargeScaleDBAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace LargeScaleDBAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DataController : ControllerBase
{
    private readonly DataAccess _dataAccess;

    public DataController(DataAccess dataAccess)
    {
        _dataAccess = dataAccess;
    }

    [HttpPost("fetch")]
    public async Task<IActionResult> FetchData([FromBody] DataRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.TableName))
        {
            return BadRequest("TableName is required.");
        }

        try
        {
            // Step 1: Validate table name
            var validTables = new[] { "Customers", "Inventory", "Orders", "Products", "Suppliers" };
            if (!validTables.Contains(request.TableName, StringComparer.OrdinalIgnoreCase))
            {
                return BadRequest("Invalid table name.");
            }

            // Step 2: Prepare stored procedure parameters
            string tableName = request.TableName;
            int pageNumber = request.PageNumber > 0 ? request.PageNumber : 1; // Ensure positive page number
            int pageSize = request.PageSize > 0 ? request.PageSize : 25; // Default to 25 if invalid

            // Step 3: Call the stored procedure
            var data = await _dataAccess.ExecuteDynamicFetchAsync(tableName, pageNumber, pageSize);

            return Ok(data);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
}