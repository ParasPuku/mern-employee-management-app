import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { deleteEmployeeById, getAllEmployees } from "../api";
import AddEmployee from "./AddEmployee";
import { ToastContainer } from "react-toastify";
import { notify } from "../utils/util";

const EmployeeManagementApp = () => {
  const [showModal, setShowModal] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    "employees": [],
    "pagination": {
      "totalEmployees": 0,
      "currentPage": 1,
      "totalPages": 1,
      "pageSizes": 5
    }
  });
  const [updateEmployeeObject, setUpdateEmployeeObject] = useState(null);
  useEffect(() => {
    console.log("Employeeeeeeee", employeeData);
  }, [employeeData]);
  const fetchEmployees = async (search = "", page = 1, limit = 5) => {
    try {
      const data = await getAllEmployees(search, page, limit);
      console.log("EMPLOYEES", data);
      setEmployeeData(data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  const handleAddEmployee = () => {
    setShowModal(true);
  };

  const handleUpdateEmployee = (currentEmployee) => {
    console.log("currentEmployee", currentEmployee);
    setUpdateEmployeeObject(currentEmployee);
    setShowModal(true);
  };

  const handleDeleteEmployee = async (employee) => {
    try {
      const {success, message} = await deleteEmployeeById(employee?._id);
      if (success) {
        notify(message, "success");
        fetchEmployees();
      } else {
        notify(message, "error");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  const handleSearchEmployee = (e) => {
    const term = e.target.value
    fetchEmployees(term);
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
      <h1>Employee Management App</h1>
      <div className="w-100 d-flex justify-content-center">
        <div className="w-80 border bg-light p3" style={{ width: "80%" }}>
          <div className="d-flex justify-content-between mb-3">
            <button
              className="btn btn-primary"
              onClick={() => handleAddEmployee()}
            >
              Add Employee
            </button>
            <input
              type="text"
              placeholder="Search Employee..."
              className="form-control w-50"
              onChange={handleSearchEmployee}
            />
          </div>
          {employeeData &&
            employeeData?.data &&
            employeeData?.data?.employees &&
            employeeData?.data?.employees?.length > 0 && (
              <EmployeeTable
                employees={employeeData?.data?.employees || []}
                pagination={employeeData?.data?.pagination || {}}
                fetchEmployees={fetchEmployees}
                handleUpdateEmployee={handleUpdateEmployee}
                handleDeleteEmployee={handleDeleteEmployee}
              />
            )}
          <AddEmployee
            showModal={showModal}
            setShowModal={setShowModal}
            fetchEmployees={fetchEmployees}
            updateEmployeeObject={updateEmployeeObject}
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default EmployeeManagementApp;
