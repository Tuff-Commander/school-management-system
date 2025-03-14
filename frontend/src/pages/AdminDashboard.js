import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", className: "" });

  const [fees, setFees] = useState([]);
  const [newFee, setNewFee] = useState({ studentId: "", amount: "", paymentDate: "", status: "" });
  const [showFeeForm, setShowFeeForm] = useState(false);

  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState({ studentId: "", subject: "", score: "", date: "" });
  const [showExamForm, setShowExamForm] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchFees();
    fetchExams();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/students");
      setStudents(response.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchFees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/fees");
      setFees(response.data);
    } catch (err) {
      console.error("Error fetching fees:", err);
    }
  };

  const fetchExams = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/exams");
      setExams(response.data);
    } catch (err) {
      console.error("Error fetching exams:", err);
    }
  };

  const handleAddStudent = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/students", newStudent);
      setStudents([...students, response.data]);
      setNewStudent({ name: "", email: "", className: "" });
    } catch (err) {
      console.error("Error adding student:", err);
    }
  };

  const handleAddFee = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/fees", newFee);
      setFees([...fees, response.data]);
      setNewFee({ studentId: "", amount: "", paymentDate: "", status: "" });
      setShowFeeForm(false);
    } catch (err) {
      console.error("Error adding fee:", err);
    }
  };

  const handleAddExam = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/exams", newExam);
      setExams([...exams, response.data]);
      setNewExam({ studentId: "", subject: "", score: "", date: "" });
      setShowExamForm(false);
    } catch (err) {
      console.error("Error adding exam:", err);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      const updatedStudents = students.filter((student) => student._id !== id);
      setStudents(updatedStudents);
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const handleDeleteFee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/fees/${id}`);
      const updatedFees = fees.filter((fee) => fee._id !== id);
      setFees(updatedFees);
    } catch (err) {
      console.error("Error deleting fee:", err);
    }
  };

  const handleDeleteExam = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/exams/${id}`);
      const updatedExams = exams.filter((exam) => exam._id !== id);
      setExams(updatedExams);
    } catch (err) {
      console.error("Error deleting exam:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Student Management Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Student Management</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
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
                      <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
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

      {/* Fee Management Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Fee Management</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button
            onClick={() => setShowFeeForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add New Fee Record
          </button>

          {showFeeForm && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-4">Add Fee Record</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Student ID"
                  value={newFee.studentId}
                  onChange={(e) => setNewFee({ ...newFee, studentId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={newFee.amount}
                  onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="date"
                  placeholder="Payment Date"
                  value={newFee.paymentDate}
                  onChange={(e) => setNewFee({ ...newFee, paymentDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Status"
                  value={newFee.status}
                  onChange={(e) => setNewFee({ ...newFee, status: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <button
                  onClick={handleAddFee}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Save Fee
                </button>
                <button
                  onClick={() => setShowFeeForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="mt-4">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Student ID</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Payment Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr key={fee._id} className="border-b">
                    <td className="p-2">{fee.studentId}</td>
                    <td className="p-2">{fee.amount}</td>
                    <td className="p-2">{fee.paymentDate}</td>
                    <td className="p-2">{fee.status}</td>
                    <td className="p-2">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                      <button
                        onClick={() => handleDeleteFee(fee._id)}
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

      {/* Exam Management Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Exam Management</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button
            onClick={() => setShowExamForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add New Exam Record
          </button>

          {showExamForm && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-4">Add Exam Record</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Student ID"
                  value={newExam.studentId}
                  onChange={(e) => setNewExam({ ...newExam, studentId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={newExam.subject}
                  onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Score"
                  value={newExam.score}
                  onChange={(e) => setNewExam({ ...newExam, score: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="date"
                  placeholder="Date"
                  value={newExam.date}
                  onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <button
                  onClick={handleAddExam}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Save Exam
                </button>
                <button
                  onClick={() => setShowExamForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="mt-4">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Student ID</th>
                  <th className="p-2">Subject</th>
                  <th className="p-2">Score</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam._id} className="border-b">
                    <td className="p-2">{exam.studentId}</td>
                    <td className="p-2">{exam.subject}</td>
                    <td className="p-2">{exam.score}</td>
                    <td className="p-2">{exam.date}</td>
                    <td className="p-2">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                      <button
                        onClick={() => handleDeleteExam(exam._id)}
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