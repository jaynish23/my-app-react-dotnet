// import React, { useState, useEffect } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Button } from "@mui/material";
// import * as api from "../services/api";

// const DataGridComponent = ({ entity }) => {
//   const getInitialPage = (entity) => {
//     return entity === "Products" ? 3 : 1; // Start at page 3 for Products
//   };

//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(getInitialPage(entity));
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const pageSize = 1000;

//   const columns = {
//     Products: [
//       { field: "id", headerName: "ID", width: 90 },
//       { field: "productName", headerName: "Product Name", width: 150 },
//       { field: "category", headerName: "Category", width: 150 },
//       { field: "price", headerName: "Price", width: 120 },
//     ],
//     Orders: [
//       { field: "id", headerName: "ID", width: 90 },
//       { field: "orderDate", headerName: "Order Date", width: 150 },
//       { field: "customerId", headerName: "Customer ID", width: 120 },
//       { field: "totalAmount", headerName: "Total Amount", width: 120 },
//     ],
//     Customers: [
//       { field: "id", headerName: "ID", width: 90 },
//       { field: "firstName", headerName: "First Name", width: 150 },
//       { field: "lastName", headerName: "Last Name", width: 150 },
//       { field: "email", headerName: "Email", width: 200 },
//     ],
//     Inventory: [
//       { field: "id", headerName: "ID", width: 90 },
//       { field: "productId", headerName: "Product ID", width: 120 },
//       { field: "warehouseId", headerName: "Warehouse ID", width: 120 },
//       { field: "quantity", headerName: "Quantity", width: 120 },
//     ],
//     Suppliers: [
//       { field: "id", headerName: "ID", width: 90 },
//       { field: "companyName", headerName: "Company Name", width: 150 },
//       { field: "contactName", headerName: "Contact Name", width: 150 },
//       { field: "email", headerName: "Email", width: 200 },
//     ],
//   };

//   const getPageRange = (entity) => {
//     switch (entity) {
//       case "Products":
//         return { min: 2, max: 5 };
//       case "Customers":
//         return { min: 1, max: 13 };
//       case "Inventory":
//         return { min: 1, max: 15 };
//       case "Suppliers":
//         return { min: 1, max: 10 };
//       default:
//         return { min: 1, max: 1 }; // Orders doesn't use pagination
//     }
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       let result;
//       switch (entity) {
//         case "Products":
//           result = await api.getProducts(page);
//           break;
//         case "Orders":
//           result = await api.getOrders();
//           break;
//         case "Customers":
//           result = await api.getCustomers(page);
//           break;
//         case "Inventory":
//           result = await api.getInventory(page);
//           break;
//         case "Suppliers":
//           result = await api.getSuppliers(page);
//           break;
//         default:
//           throw new Error("Invalid entity");
//       }
//       setData(result);
//     } catch (err) {
//       setError(
//         `Failed to fetch ${entity}: ${err.message} (Status: ${err.response?.status})`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page, entity]);

//   useEffect(() => {
//     setPage(getInitialPage(entity));
//   }, [entity]);

//   const { min: minPage, max: maxPage } = getPageRange(entity);

//   return (
//     <div style={{ height: 600, width: "100%" }}>
//       {error && <div style={{ color: "red" }}>{error}</div>}
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <DataGrid
//             rows={data}
//             columns={columns[entity]}
//             pageSize={pageSize}
//             rowsPerPageOptions={[pageSize]}
//             pagination
//             disableSelectionOnClick
//           />
//           {entity !== "Orders" && (
//             <div>
//               <Button
//                 onClick={() => setPage(page - 1)}
//                 disabled={page <= minPage}
//               >
//                 Previous
//               </Button>
//               <Button
//                 onClick={() => setPage(page + 1)}
//                 disabled={page >= maxPage || data.length < pageSize}
//               >
//                 Next
//               </Button>
//               <span>
//                 {" "}
//                 Page {page} of {maxPage}{" "}
//               </span>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default DataGridComponent;


// import React, { useState, useEffect } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Button } from "@mui/material";
// import * as api from "../services/api";

// const DataGridComponent = ({ entity }) => {
//   const getInitialPage = (entity) => {
//     return entity === "Products" ? 3 : 1; // Start at page 3 for Products
//   };

//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(getInitialPage(entity));
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const pageSize = 1000;

//   const columns = {
//     Products: [
//       { field: "id", headerName: "ID", width: 90 },
//       { field: "productName", headerName: "Product Name", width: 150 },
//       { field: "category", headerName: "Category", width: 150 },
//       { field: "price", headerName: "Price", width: 120 },
//       { field: "stock", headerName: "Stock", width: 100 },
//       { field: "createdDate", headerName: "Created Date", width: 150 },
//       { field: "lastUpdated", headerName: "Last Updated", width: 150 },
//       { field: "description", headerName: "Description", width: 200 },
//       // { field: "manufacturer", headerName: "Manufacturer", width: 150 },
//       // { field: "sku", headerName: "SKU", width: 120 },
//       // { field: "weight", headerName: "Weight", width: 100 },
//       // { field: "dimensions", headerName: "Dimensions", width: 150 },
//       // { field: "color", headerName: "Color", width: 120 },
//       // { field: "material", headerName: "Material", width: 120 },
//       // { field: "warrantyMonths", headerName: "Warranty Months", width: 120 },
//       // { field: "isActive", headerName: "Is Active", width: 100 },
//       // { field: "rating", headerName: "Rating", width: 100 },
//       { field: "discount", headerName: "Discount", width: 100 },
//       { field: "supplierId", headerName: "Supplier ID", width: 100 },
//       { field: "batchNumber", headerName: "Batch Number", width: 120 },
//       { field: "expiryDate", headerName: "Expiry Date", width: 150 },
//       { field: "countryOfOrigin", headerName: "Country of Origin", width: 150 },
//       { field: "isFeatured", headerName: "Is Featured", width: 100 },
//       {
//         field: "maxOrderQuantity",
//         headerName: "Max Order Quantity",
//         width: 120,
//       },
//       { field: "leadTimeDays", headerName: "Lead Time Days", width: 120 },
//     ],
//     Orders: [
//       { field: "id", headerName: "ID", width: 90 },
//       { field: "orderDate", headerName: "Order Date", width: 150 },
//       { field: "customerId", headerName: "Customer ID", width: 120 },
//       { field: "totalAmount", headerName: "Total Amount", width: 120 },
//       { field: "status", headerName: "Status", width: 120 },
//       { field: "shippingAddress", headerName: "Shipping Address", width: 200 },
//       { field: "billingAddress", headerName: "Billing Address", width: 200 },
//       { field: "paymentMethod", headerName: "Payment Method", width: 150 },
//       { field: "orderNumber", headerName: "Order Number", width: 120 },
//       {
//         field: "expectedDelivery",
//         headerName: "Expected Delivery",
//         width: 150,
//       },
//       { field: "actualDelivery", headerName: "Actual Delivery", width: 150 },
//       { field: "isDelivered", headerName: "Is Delivered", width: 100 },
//       { field: "taxAmount", headerName: "Tax Amount", width: 120 },
//       { field: "discountAmount", headerName: "Discount Amount", width: 120 },
//       { field: "shippingCost", headerName: "Shipping Cost", width: 120 },
//       { field: "orderNotes", headerName: "Order Notes", width: 200 },
//       { field: "createdBy", headerName: "Created By", width: 150 },
//       { field: "modifiedBy", headerName: "Modified By", width: 150 },
//       { field: "createdDate", headerName: "Created Date", width: 150 },
//       { field: "modifiedDate", headerName: "Modified Date", width: 150 },
//       { field: "customerEmail", headerName: "Customer Email", width: 200 },
//       { field: "customerPhone", headerName: "Customer Phone", width: 150 },
//       { field: "orderPriority", headerName: "Order Priority", width: 120 },
//       { field: "shippingMethod", headerName: "Shipping Method", width: 150 },
//       { field: "trackingNumber", headerName: "Tracking Number", width: 150 },
//       { field: "couponCode", headerName: "Coupon Code", width: 120 },
//       { field: "isGift", headerName: "Is Gift", width: 100 },
//       { field: "giftMessage", headerName: "Gift Message", width: 200 },
//       { field: "salesChannel", headerName: "Sales Channel", width: 150 },
//       { field: "orderWeight", headerName: "Order Weight", width: 120 },
//     ],
//     Customers: [
//       { field: "id", headerName: "ID", width: 90 },
//       { field: "firstName", headerName: "First Name", width: 150 },
//       { field: "lastName", headerName: "Last Name", width: 150 },
//       { field: "email", headerName: "Email", width: 200 },
//       { field: "phone", headerName: "Phone", width: 150 },
//       { field: "addressLine1", headerName: "Address Line 1", width: 200 },
//       { field: "addressLine2", headerName: "Address Line 2", width: 200 },
//       { field: "city", headerName: "City", width: 120 },
//       { field: "state", headerName: "State", width: 120 },
//       { field: "zipCode", headerName: "Zip Code", width: 120 },
//       { field: "country", headerName: "Country", width: 120 },
//       { field: "createdDate", headerName: "Created Date", width: 150 },
//       { field: "lastUpdated", headerName: "Last Updated", width: 150 },
//       { field: "isActive", headerName: "Is Active", width: 100 },
//       { field: "dateOfBirth", headerName: "Date of Birth", width: 150 },
//       { field: "gender", headerName: "Gender", width: 100 },
//       { field: "occupation", headerName: "Occupation", width: 150 },
//       { field: "companyName", headerName: "Company Name", width: 150 },
//       { field: "annualIncome", headerName: "Annual Income", width: 120 },
//       { field: "customerType", headerName: "Customer Type", width: 120 },
//       { field: "loyaltyPoints", headerName: "Loyalty Points", width: 120 },
//       {
//         field: "lastPurchaseDate",
//         headerName: "Last Purchase Date",
//         width: 150,
//       },
//       {
//         field: "newsletterSubscribed",
//         headerName: "Newsletter Subscribed",
//         width: 120,
//       },
//       {
//         field: "preferredContactMethod",
//         headerName: "Preferred Contact Method",
//         width: 150,
//       },
//       { field: "accountStatus", headerName: "Account Status", width: 120 },
//       { field: "creditLimit", headerName: "Credit Limit", width: 120 },
//       { field: "billingAddress", headerName: "Billing Address", width: 200 },
//       { field: "shippingAddress", headerName: "Shipping Address", width: 200 },
//       { field: "taxId", headerName: "Tax ID", width: 120 },
//       { field: "customerSegment", headerName: "Customer Segment", width: 120 },
//       {
//         field: "registrationDate",
//         headerName: "Registration Date",
//         width: 150,
//       },
//       { field: "lastLoginDate", headerName: "Last Login Date", width: 150 },
//       {
//         field: "preferredLanguage",
//         headerName: "Preferred Language",
//         width: 120,
//       },
//       { field: "timeZone", headerName: "Time Zone", width: 120 },
//       { field: "notes", headerName: "Notes", width: 200 },
//       {
//         field: "emergencyContact",
//         headerName: "Emergency Contact",
//         width: 150,
//       },
//       { field: "emergencyPhone", headerName: "Emergency Phone", width: 150 },
//       { field: "referralSource", headerName: "Referral Source", width: 150 },
//       {
//         field: "socialMediaHandle",
//         headerName: "Social Media Handle",
//         width: 150,
//       },
//       { field: "website", headerName: "Website", width: 200 },
//       { field: "fax", headerName: "Fax", width: 120 },
//       { field: "isVerified", headerName: "Is Verified", width: 100 },
//       {
//         field: "verificationDate",
//         headerName: "Verification Date",
//         width: 150,
//       },
//       { field: "lastContacted", headerName: "Last Contacted", width: 150 },
//       { field: "customerRating", headerName: "Customer Rating", width: 120 },
//     ],
//     Inventory: [
//       { field: "id", headerName: "ID", width: 90 },
//       { field: "productId", headerName: "Product ID", width: 120 },
//       { field: "warehouseId", headerName: "Warehouse ID", width: 120 },
//       { field: "quantity", headerName: "Quantity", width: 120 },
//       { field: "lastUpdated", headerName: "Last Updated", width: 150 },
//       { field: "stockStatus", headerName: "Stock Status", width: 120 },
//       { field: "reorderLevel", headerName: "Reorder Level", width: 120 },
//       // { field: "reorderQuantity", headerName: "Reorder Quantity", width: 120 },
//       // { field: "lastRestockDate", headerName: "Last Restock Date", width: 150 },
//       // { field: "supplierId", headerName: "Supplier ID", width: 120 },
//       // { field: "batchNumber", headerName: "Batch Number", width: 120 },
//       // { field: "expiryDate", headerName: "Expiry Date", width: 150 },
//       // { field: "storageLocation", headerName: "Storage Location", width: 150 },
//       // { field: "unitCost", headerName: "Unit Cost", width: 120 },
//       // { field: "totalCost", headerName: "Total Cost", width: 120 },
//       // { field: "isDamaged", headerName: "Is Damaged", width: 100 },
//       { field: "damageNotes", headerName: "Damage Notes", width: 200 },
//       { field: "lastAuditDate", headerName: "Last Audit Date", width: 150 },
//       { field: "auditStatus", headerName: "Audit Status", width: 120 },
//       { field: "inventoryType", headerName: "Inventory Type", width: 120 },
//     ],
//     Suppliers: [
//       { field: "id", headerName: "ID", width: 90 },
//       { field: "companyName", headerName: "Company Name", width: 150 },
//       { field: "contactName", headerName: "Contact Name", width: 150 },
//       { field: "email", headerName: "Email", width: 200 },
//       { field: "phone", headerName: "Phone", width: 150 },
//       { field: "addressLine1", headerName: "Address Line 1", width: 200 },
//       { field: "addressLine2", headerName: "Address Line 2", width: 200 },
//       { field: "city", headerName: "City", width: 120 },
//       { field: "state", headerName: "State", width: 120 },
//       { field: "zipCode", headerName: "Zip Code", width: 120 },
//       { field: "country", headerName: "Country", width: 120 },
//       { field: "createdDate", headerName: "Created Date", width: 150 },
//       { field: "lastUpdated", headerName: "Last Updated", width: 150 },
//       { field: "isActive", headerName: "Is Active", width: 100 },
//       { field: "supplierType", headerName: "Supplier Type", width: 120 },
//       { field: "leadTimeDays", headerName: "Lead Time Days", width: 120 },
//       {
//         field: "minOrderQuantity",
//         headerName: "Min Order Quantity",
//         width: 120,
//       },
//       {
//         field: "maxOrderQuantity",
//         headerName: "Max Order Quantity",
//         width: 120,
//       },
//       { field: "paymentTerms", headerName: "Payment Terms", width: 150 },
//       { field: "taxId", headerName: "Tax ID", width: 120 },
//       { field: "website", headerName: "Website", width: 200 },
//       { field: "rating", headerName: "Rating", width: 100 },
//       {
//         field: "contractStartDate",
//         headerName: "Contract Start Date",
//         width: 150,
//       },
//       { field: "contractEndDate", headerName: "Contract End Date", width: 150 },
//       { field: "notes", headerName: "Notes", width: 200 },
//       // {
//       //   field: "preferredContactMethod",
//       //   headerName: "Preferred Contact Method",
//       //   width: 150,
//       // },
//       // { field: "lastOrderDate", headerName: "Last Order Date", width: 150 },
//       // {
//       //   field: "supplierCategory",
//       //   headerName: "Supplier Category",
//       //   width: 150,
//       // },
//     ],
//   };

//   const getPageRange = (entity) => {
//     switch (entity) {
//       case "Products":
//         return { min: 3, max: 5 };
//       case "Customers":
//         return { min: 1, max: 13 };
//       case "Inventory":
//         return { min: 1, max: 15 };
//       case "Suppliers":
//         return { min: 1, max: 10 };
//       default:
//         return { min: 1, max: 1 }; // Orders doesn't use pagination
//     }
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       let result;
//       switch (entity) {
//         case "Products":
//           result = await api.getProducts(page);
//           break;
//         case "Orders":
//           result = await api.getOrders();
//           break;
//         case "Customers":
//           result = await api.getCustomers(page);
//           break;
//         case "Inventory":
//           result = await api.getInventory(page);
//           break;
//         case "Suppliers":
//           result = await api.getSuppliers(page);
//           break;
//         default:
//           throw new Error("Invalid entity");
//       }
//       setData(result);
//     } catch (err) {
//       setError(
//         `Failed to fetch ${entity}: ${err.message} (Status: ${err.response?.status})`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page, entity]);

//   useEffect(() => {
//     setPage(getInitialPage(entity));
//   }, [entity]);

//   const { min: minPage, max: maxPage } = getPageRange(entity);

//   return (
//     <div style={{ height: 600, width: "100%" }}>
//       {error && <div style={{ color: "red" }}>{error}</div>}
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <DataGrid
//             rows={data}
//             columns={columns[entity]}
//             pageSize={pageSize}
//             rowsPerPageOptions={[pageSize]}
//             pagination
//             disableSelectionOnClick
//             autoHeight
//             sx={{ overflowX: "auto" }}
//           />
//           {entity !== "Orders" && (
//             <div>
//               <Button
//                 onClick={() => setPage(page - 1)}
//                 disabled={page <= minPage}
//               >
//                 Previous
//               </Button>
//               <Button
//                 onClick={() => setPage(page + 1)}
//                 disabled={page >= maxPage || data.length < pageSize}
//               >
//                 Next
//               </Button>
//               <span>
//                 {" "}
//                 Page {page} of {maxPage}{" "}
//               </span>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default DataGridComponent;

