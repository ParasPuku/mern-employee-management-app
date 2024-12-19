import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../api";
import { notify } from "../utils/util";

const EmployeeDetails = () => {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchEmployeeById = async () => {
    try {
      const response = await getEmployeeById(id);
      console.log("Dataaaaa", response);
      setEmployeeDetails(response?.data);
    } catch (err) {
      notify("Failed to fetch employee details", "error");
    }
  };
  useEffect(() => {
    fetchEmployeeById();
  }, []);
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Employee Details</h2>
        </div>
        <div className="card-body">
          {employeeDetails && (
            <>
            <div className="row mb-3">
              <div className="col md-3">
                <img
                  src={employeeDetails.profileImage}
                  alt={employeeDetails.name}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col md-9">
                <h4>{employeeDetails.name}</h4>
                <p><strong>Email: </strong> {employeeDetails.email}</p>
                <p><strong>Phone: </strong> {employeeDetails.phone}</p>
                <p><strong>Department: </strong> {employeeDetails.department}</p>
                <p><strong>Salary: </strong> {employeeDetails.salary}</p>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/employee')}>Back</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
