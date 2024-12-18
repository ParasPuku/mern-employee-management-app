import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { getAllEmployees } from "../api";
import AddEmployee from "./AddEmployee";
import { ToastContainer } from "react-toastify";

const EmployeeManagementApp = () => {
  const [showModal, setShowModal] = useState(false);
  const [employeeData, setEmployeeData] = useState();
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
              Add
            </button>
            <input
              type="text"
              placeholder="Search Employee..."
              className="form-control w-50"
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
              />
            )}
          <AddEmployee
            showModal={showModal}
            setShowModal={setShowModal}
            fetchEmployees={fetchEmployees}
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
