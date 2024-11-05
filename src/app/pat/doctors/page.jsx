"use client";
import { api } from "@/lib/apis/api";
import { GET_USERS } from "@/lib/apis/apiUrls";
import { isLoadingAtom } from "@/lib/atoms/atoms";
import { collections } from "@/lib/functions/Firestore/collections";
import { getAllData } from "@/lib/functions/Firestore/functions";
import { useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const DoctorsListPage = () => {
  const setIsLoading = useSetAtom(isLoadingAtom);
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    time: "",
    notes: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [bookedAppointments, setBookedAppointments] = useState({}); // Track booked appointments by doctor ID

  const getUsersData = async () => {
    setIsLoading(true);
    try {
      const doctorsData = await getAllData(collections.DOCTORS);
      const userIDs = doctorsData.map((doctor) => doctor.uid);

      const params = {
        ids: userIDs.toString(),
      };

      const response = await api(GET_USERS, {}, "", params);
      console.log("API Response:", response.data);

      const users = response.data.users.map((user) => {
        const userDoc = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          profile: doctorsData.find((doctor) => doctor.uid === user.uid) || {},
        };
        return userDoc;
      });

      console.log("Mapped Users:", users);
      setDoctors(users);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.displayName &&
      doctor.profile &&
      doctor.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleBookingClick = () => {
    setIsBookingModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setAppointmentDetails({ date: "", time: "", notes: "" }); // Reset form fields
    setSuccessMessage(""); // Clear the success message when closing
    setIsBookingModalOpen(false); // Close the modal
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Handle appointment submission logic here (e.g., save to database)
    console.log("Booking Details:", {
      doctor: selectedDoctor,
      ...appointmentDetails,
    });

    // Set success message
    setSuccessMessage("Your appointment has been successfully booked!");

    // Update booked status
    setBookedAppointments((prev) => ({
      ...prev,
      [selectedDoctor.uid]: true, // Mark the selected doctor as booked
    }));

    // Reset form but keep the success message
    setAppointmentDetails({ date: "", time: "", notes: "" });
  };

  return (
    <div className="p-12 bg-gradient-to-br from-purple-50 to-teal-100 min-h-screen pt-16">
      <div className="flex justify-center mb-8" style={{ marginTop: "3%" }}>
        <input
          type="text"
          placeholder="Search Doctor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 shadow-lg transition duration-300 w-1/2"
        />
        <button className="p-3 ml-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300 flex items-center shadow-lg">
          <FaSearch />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredDoctors.length === 0 ? (
          <p className="text-center text-gray-500">No doctors found.</p>
        ) : (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor.uid}
              className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleCardClick(doctor)}
              style={{
                backgroundColor:
                  selectedDoctor?.uid === doctor.uid
                    ? `hsl(${Math.random() * 360}, 70%, 80%)`
                    : "white",
              }}
            >
              <img
                src={doctor.profile?.image || "https://via.placeholder.com/150"}
                alt={doctor.displayName}
                className="w-full h-24 object-cover rounded-t-lg"
              />
              <h3 className="text-xl font-semibold text-teal-600 mb-1">
                {doctor.displayName}
              </h3>
              <p className="text-gray-600 mb-1 truncate">
                Email: {doctor.email || "No email available."}
              </p>
              <p className="text-gray-600 mb-1 truncate">
                Specialty: {doctor.profile?.specialty || "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                Phone: {doctor.profile?.phonenumber || "N/A"}
              </p>
              <button
                className="mt-4 w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={handleBookingClick}
                disabled={bookedAppointments[doctor.uid]} // Disable if already booked
              >
                {bookedAppointments[doctor.uid] ? "Booked" : "Book Appointment"}
              </button>
            </div>
          ))
        )}
      </div>

      {isBookingModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-2">Book Appointment</h2>
            <form onSubmit={handleBookingSubmit}>
              <label className="block mb-2">
                Date:
                <input
                  type="date"
                  required
                  value={appointmentDetails.date}
                  onChange={(e) =>
                    setAppointmentDetails((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Time:
                <input
                  type="time"
                  required
                  value={appointmentDetails.time}
                  onChange={(e) =>
                    setAppointmentDetails((prev) => ({
                      ...prev,
                      time: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Notes:
                <textarea
                  value={appointmentDetails.notes}
                  onChange={(e) =>
                    setAppointmentDetails((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </label>
              {successMessage && (
                <p className="text-green-500 font-semibold mt-2">
                  {successMessage}
                </p>
              )}
              <div className="flex justify-end">
                <button
                  type="button" // Ensure this is a button to prevent form submission
                  className="mt-4 p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="mt-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Submit Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsListPage;
