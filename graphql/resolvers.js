const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');

const resolvers = {
    Query: {
        login: async (_, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) throw new Error("User not found");

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error("Invalid credentials");

            return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        },
        getAllEmployees: async () => await Employee.find(),
        searchEmployeeByEid: async (_, { id }) => await Employee.findById(id),
        searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
            let query = {};
            if (designation) query.designation = designation;
            if (department) query.department = department;
            return await Employee.find(query);
        }
    },
    Mutation: {
        signup: async (_, { username, email, password }) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = new User({ username, email, password: hashedPassword });
            await user.save();
            return "User created successfully!";
        },
        addEmployee: async (_, args) => {
            const employee = new Employee(args);
            await employee.save();
            return employee;
        },
        updateEmployee: async (_, { id, ...args }) => {
            return await Employee.findByIdAndUpdate(id, args, { new: true });
        },
        deleteEmployee: async (_, { id }) => {
            await Employee.findByIdAndDelete(id);
            return "Employee deleted successfully!";
        }
    }
};

module.exports = resolvers;
