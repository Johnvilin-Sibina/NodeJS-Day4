import Employee from "../Models/employeeSchema.js";

export const createEmployee = async (req, res) => {
  try {
    //const {}=req.body
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res
      .status(200)
      .json({ message: "Employee created successfully", result: newEmployee });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error in Create Employee" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.find();
    res
      .status(200)
      .json({ message: "Employee Fectched Successfully", result: employee });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error in get all employee");
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const empId = req.params.id;
    const employee = await Employee.findById(empId);
    if (!employee) {
      res.status(404).send("Employee not found");
    }
    res
      .status(200)
      .json({ message: "Employee Fectched Successfully", result: employee });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error in getById employee");
  }
};
export const updateEmployee = async (req, res) => {
  try {
    const empId = req.params.id;
    const {
      employeeFirstName,
      employeeLastName,
      employeeEmail,
      employeeDesignation,
    } = req.body;
    const result = await Employee.updateOne(
      { _id: empId },
      {
        employeeFirstName,
        employeeLastName,
        employeeEmail,
        employeeDesignation,
      }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const updatedEmployee = await Employee.find({ _id: empId });
    res.status(200).json({
      message: "Employee updated successfully",
      result: updatedEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error in getById employee");
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const empId = req.params.id;
    const deleteEmp = await Employee.deleteOne({ _id: empId });
    if (!deleteEmp) {
      res.status(404).send("Employee not found");
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error in delete employee");
  }
};
