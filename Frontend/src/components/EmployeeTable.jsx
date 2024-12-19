import React from "react";
import { Link } from "react-router-dom";

const EmployeeTable = ({ employees, pagination, fetchEmployees, handleUpdateEmployee, handleDeleteEmployee }) => {
  console.log("EMPLOYEES TABLE", employees);

  const headers = ["Name", "Email", "Phone", "Salary","Department", "Actions"];
  const { currentPage = 1, totalPages = 1 } = pagination || {};

  const TableRow = ({ employee }) => {
    console.log("TableRow", employee);
    return (
      <tr>
        <td>
          <Link
            to={`/employee/${employee._id}`}
            className="text-decoration-none text-capitalize"
          >
            {employee.name}
          </Link>
        </td>
        <td>{employee.email}</td>
        <td>{employee.phone}</td>
        <td>{employee.salary}</td>
        <td className="text-capitalize">{employee.department}</td>
        <td className="d-flex alin-items-center gap-3">
          <i
            className="bi bi-pencil-fill text-warning md-4"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            onClick={() => handleUpdateEmployee(employee)}
          ></i>
          <i
            className="bi bi-trash-fill text-danger md-4"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            onClick={() => handleDeleteEmployee(employee)}
          ></i>
        </td>
      </tr>
    );
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePagination = (currPage) => {
    fetchEmployees("", currPage, 5);
  };
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            {headers?.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees?.length > 0 ? (
            employees.map((employee) => (
              <TableRow key={employee._id} employee={employee} />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center my-3">
        <span className="badge bg-primary p-2 m-2">
          Page {currentPage} of {totalPages}
        </span>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => handlePreviousPage()}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => handlePagination(page)}
              className={`btn btn-outline-primary me-2 ${
                page === currentPage ? "active" : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => handleNextPage()}
            disabled={totalPages === currentPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
