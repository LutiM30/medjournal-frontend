"use client"; // Ensure this is present
import { api } from "@/lib/apis/api";
import { GET_USERS } from "@/lib/apis/apiUrls";
import { isLoadingAtom } from "@/lib/atoms/atoms";
import { GET_USER_NAME_ROLE } from "@/lib/constants";
import { collections } from "@/lib/functions/Firestore/collections";
import { getAllData } from "@/lib/functions/Firestore/functions";
import { useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const DoctorsListPage = () => {
  const setIsLoading = useSetAtom(isLoadingAtom);
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to manage the selected doctor

  const getUsersData = async () => {
    setIsLoading(true);
    const doctorsData = await getAllData(collections.DOCTORS);
    const userIDs = doctorsData.map((doctor) => doctor.uid);

    const params = {
      ids: userIDs?.toString(),
    };

    const response = await api(GET_USERS, {}, "", params);
    const users = response.data.users?.map((user) => {
      const userDoc = {
        ...GET_USER_NAME_ROLE(user),
      };

      doctorsData.forEach(
        (doctor) => (userDoc.profile = doctor.uid === user.uid ? doctor : null)
      );
      return userDoc;
    });

    setIsLoading(false);
    setDoctors(users);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  // Updated filter logic to check for undefined names
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name &&
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (doctor) => {
    setSelectedDoctor(doctor); // Set the selected doctor to show details
  };

  const closeModal = () => {
    setSelectedDoctor(null); // Close the modal
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-teal-100 min-h-screen pt-16">
      <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">
        Doctors List
      </h1>

      {/* Search Section */}
      <div className="flex justify-center mb-8">
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

      {/* Doctors Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.uid}
            className="p-4 bg-white border border-gray-300 rounded-lg shadow-xl transition-shadow duration-300 hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer"
            onClick={() => handleCardClick(doctor)} // Open doctor details on click
          >
            <img
              src={doctor.profile?.image || "https://via.placeholder.com/150"}
              alt={doctor.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-2xl font-semibold text-teal-600 mb-2">
              {doctor.name}
            </h3>
            <p className="text-gray-600 mb-1">
              {doctor.profile?.about || "No information available."}
            </p>
          </div>
        ))}
      </div>

      {/* Modal for Doctor Details */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{selectedDoctor.name}</h2>
            <img
              src={
                selectedDoctor.profile?.image ||
                "https://via.placeholder.com/150"
              }
              alt={selectedDoctor.name}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <p className="mb-4">
              {selectedDoctor.profile?.about || "No information available."}
            </p>
            <button
              className="mt-4 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300"
              onClick={closeModal}
            >
              Close
            </button>
            {/* Book Appointment Button */}
            <button className="mt-4 ml-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsListPage;
