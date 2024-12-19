import React, { useEffect, useState } from "react";
import { createEmployee, updateEmployeeById } from "../api";
import { notify } from "../utils/util";

const AddEmployee = ({
  showModal,
  setShowModal,
  fetchEmployees,
  updateEmployeeObject,
}) => {
  const [updateMode, setUpdateMode] = useState(false);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    profileImage: null,
  });

  useEffect(() => {
    if (updateEmployeeObject) {
      setUpdateMode(true);
      setEmployee(updateEmployeeObject);
    }
  }, [updateEmployeeObject]);

  const resetEmployeeStates = () => {
    setEmployee({
      name: "",
      email: "",
      phone: "",
      department: "",
      salary: "",
      profileImage: null,
    });
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };
  const handleFileChange = (e) => {
    setEmployee({ ...employee, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("EMP", employee);
    try {
      const { success, message } = updateMode
        ? await updateEmployeeById(employee, employee._id)
        : await createEmployee(employee);
      console.log("SUCCESS, MESSAGE", success, message);
      if (success) {
        notify(message, "success");
        handleCloseModal();
        resetEmployeeStates();
        fetchEmployees();
      } else {
        notify(message, "error");
      }
    } catch (error) {
      notify("failed to create employee", "error");
    }
  };
  return (
    <div
      className={`modal ${showModal ? "d-block" : ""}`}
      tabIndex={-1}
      role="dialog"
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {updateMode ? "Update Employee" : "Add Employee"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => handleCloseModal()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {/* Add Employee Form */}
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  type="text"
                  name="phone"
                  value={employee.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  className="form-control"
                  type="text"
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Salary</label>
                <input
                  className="form-control"
                  type="text"
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Profile Image</label>
                <input
                  className="form-control"
                  type="file"
                  name="profileImage"
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  {updateMode ? "Update Profile" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
