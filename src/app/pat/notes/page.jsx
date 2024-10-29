"use client"; // Marking the component as a Client Component

import React, { useEffect, useState } from "react";
import { FaSearch, FaCalendarAlt, FaPlus } from "react-icons/fa";

const AppointmentPage = () => {
  const [pastAppointments, setPastAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  // Simulating data fetching
  useEffect(() => {
    const fetchAppointments = async () => {
      const fetchedPastAppointments = await fetchPastAppointments();
      const fetchedUpcomingAppointments = await fetchUpcomingAppointments();
      setPastAppointments(fetchedPastAppointments);
      setUpcomingAppointments(fetchedUpcomingAppointments);
    };

    fetchAppointments();
  }, []);

  // Example fetch function
  const fetchPastAppointments = async () => {
    return [
      {
        id: 1,
        doctorName: "Dr. John Doe",
        date: "2024-09-01",
        medicalNote: "Follow-up on blood test.",
      },
      {
        id: 2,
        doctorName: "Dr. Jane Smith",
        date: "2024-09-10",
        medicalNote: "Discussed treatment options.",
      },
    ];
  };

  const fetchUpcomingAppointments = async () => {
    return [
      {
        id: 3,
        doctorName: "Dr. Emily Clark",
        date: "2024-10-01",
        status: "Scheduled",
      },
      {
        id: 4,
        doctorName: "Dr. James Brown",
        date: "2024-10-15",
        status: "Scheduled",
      },
    ];
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-teal-100 min-h-screen pt-16">
      <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">
       </h1>

      {/* Search and Filter Section */}
      <div className="flex justify-between mb-8">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search Appointments"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 shadow-lg transition duration-300"
          />
          <button className="p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300 flex items-center shadow-lg">
            <FaSearch />
          </button>
        </div>
        <div className="flex items-center">
          <select className="p-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none">
            <option value="">Filter by Doctor</option>
            <option value="doctor1">Dr. John Doe</option>
            <option value="doctor2">Dr. Jane Smith</option>
          </select>
          <button className="ml-4 p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 flex items-center shadow-lg">
            <FaPlus className="mr-2" />
            Create New Appointment
          </button>
        </div>
      </div>

      {/* Past Appointments Section */}
      <h2 className="text-4xl font-semibold text-gray-700 mb-6">
        Past Appointments
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(pastAppointments) && pastAppointments.length > 0 ? (
          pastAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 bg-white border border-gray-300 rounded-lg shadow-xl transition-shadow duration-300 hover:shadow-2xl transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-semibold text-teal-600 mb-2">
                {appointment.doctorName}
              </h3>
              <p className="text-gray-600 mb-1">
                <FaCalendarAlt className="inline mr-2 text-teal-400" />
                {appointment.date}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-teal-600">Notes:</span>{" "}
                {appointment.medicalNote}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No past appointments found.</p>
        )}
      </div>

      {/* Upcoming Appointments Section */}
      <h2 className="text-4xl font-semibold text-gray-700 mb-6 mt-10">
        Upcoming Appointments
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(upcomingAppointments) &&
        upcomingAppointments.length > 0 ? (
          upcomingAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 bg-white border border-gray-300 rounded-lg shadow-xl transition-shadow duration-300 hover:shadow-2xl transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-semibold text-teal-600 mb-2">
                {appointment.doctorName}
              </h3>
              <p className="text-gray-600 mb-1">
                <FaCalendarAlt className="inline mr-2 text-teal-400" />
                {appointment.date}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-teal-600">Status:</span>{" "}
                {appointment.status}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No upcoming appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;
