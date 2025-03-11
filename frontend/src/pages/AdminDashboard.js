import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", className: "" });
  const [editStudent, setEditStudent] = useState(null);

  // Fetch students from the backend
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/students");
      setStudents(response.data);
      console.log("Students:", response.data); // Log the students data
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  // Add a new student
  const handleAddStudent = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/students", newStudent);
      setStudents([...students, response.data]);
      setNewStudent({ name: "", email: "", className: "" }); // Clear the form
    } catch (err) {
      console.error("Error adding student:", err);
    }
  };

  // Update a student
  const handleEditStudent = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/students/${editStudent._id}`,
        editStudent
      );
      const updatedStudents = students.map((student) =>
        student._id === editStudent._id ? response.data : student
      );
      setStudents(updatedStudents);
      setEditStudent(null); // Clear the edit form
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  // Delete a student
  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      const updatedStudents = students.filter((student) => student._id !== id);
      setStudents(updatedStudents);
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cards for quick stats */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Students</h2>
          <p className="text-3xl font-bold">{students.length}</p>
        </div>
        {/* Other cards */}
      </div>

      {/* Student Management Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Student Management</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Add New Student Form */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Add New Student</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Class"
                value={newStudent.className}
                onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <button
                onClick={handleAddStudent}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add Student
              </button>
            </div>
          </div>

          {/* Edit Student Form */}
          {editStudent && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Edit Student</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={editStudent.name}
                  onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editStudent.email}
                  onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Class"
                  value={editStudent.className}
                  onChange={(e) => setEditStudent({ ...editStudent, className: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <button
                  onClick={handleEditStudent}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditStudent(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Students Table */}
          <div className="mt-4">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Class</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="border-b">
                    <td className="p-2">{student.name}</td>
                    <td className="p-2">{student.email}</td>
                    <td className="p-2">{student.className}</td>
                    <td className="p-2">
                      <button
                        onClick={() => setEditStudent(student)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;