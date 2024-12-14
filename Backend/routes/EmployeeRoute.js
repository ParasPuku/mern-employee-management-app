const express = require("express");
const employeeRouter = express.Router();
const {
  getAllEmployeesController,
  getEmployeeByIdController,
  createEmployeeController,
  deleteEmployeeByIdController,
  updateEmployeeByIdController,
} = require("../controllers/EmployeeController");
const { cloudinaryFileUploader } = require("../middlewares/FileUploader");

employeeRouter.get("/employee/getAllEmployees", getAllEmployeesController);

employeeRouter.get("/employee/getEmployeeById/:id", getEmployeeByIdController);

employeeRouter.post(
  "/employee/createEmployee",
  cloudinaryFileUploader.single("profileImage"),
  createEmployeeController
);

employeeRouter.delete(
  "/employee/deleteEmployeeById/:id",
  deleteEmployeeByIdController
);

employeeRouter.put(
  "/employee/updateEmployeeById/:id",
  updateEmployeeByIdController
);

module.exports = employeeRouter;
