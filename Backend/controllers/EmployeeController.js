const { EmployeeModel } = require("../models/EmployeeModel"); // Adjust the path if necessary

const getAllEmployeesController = async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res
      .status(200)
      .json({ message: "All Employees..", success: true, data: employees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const createEmployeeController = async (req, res) => {
  console.log("REACHED");
  console.log("req.file", req.file);
  console.log("req.file", req.body);

  try {
    let body = req.body;
    body.profileImage = req.file ? req?.file?.path : null;
    const newEmployee = EmployeeModel(body);
    await newEmployee.save();
    res
      .status(201)
      .json({ message: "Employee created successfully", success: true });
  } catch (err) {
    console.log("ERRRORORROR", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: err });
  }
};

const getEmployeeByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await EmployeeModel.findById({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ message: "Employee not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Employee found", success: true, data: employee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const deleteEmployeeByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await EmployeeModel.findByIdAndDelete({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ message: "Employee not found", success: false });
    }
    res.status(200).json({
      message: "Employee deleted successfully",
      success: true,
      data: employee,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const updateEmployeeByIdController = async (req, res) => {
  const { id } = req.params;
  console.log("id", req.body);
  const { name, phone, email, department, salary } = req.body;
  console.log(name, phone, email, department, salary);
  let updatedEmployeeData = {
    name,
    phone,
    email,
    department,
    salary,
    updatedAt: new Date(),
  };
  try {
    const employee = await EmployeeModel.findByIdAndUpdate(
      id,
      updatedEmployeeData,
      { new: true }
    );
    if (!employee) {
      return res
        .status(404)
        .json({ message: "Employee not found", success: false });
    }
    res.status(200).json({
      message: "Employee updated successfully",
      success: true,
      data: employee,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = {
  createEmployeeController,
  getAllEmployeesController,
  getEmployeeByIdController,
  deleteEmployeeByIdController,
  updateEmployeeByIdController,
};
