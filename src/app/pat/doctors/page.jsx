// src/components/DoctorsList.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Adjust the import according to your structure
import { collection, getDocs } from "firebase/firestore";
import DoctorCard from "./DoctorCard"; // Component to display individual doctor cards
import { Link } from "react-router-dom";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorsCollection = collection(db, "DoctorsList"); // Make sure your collection name is 'doctors'
      const doctorSnapshot = await getDocs(doctorsCollection);
      const doctorList = doctorSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDoctors(doctorList);
    };

    fetchDoctors();
  }, []);

  return (
    <div className="doctor-list">
      {doctors.map((doctor) => (
        <Link key={doctor.id} to={`/doctors/${doctor.id}`}>
          <DoctorCard doctor={doctor} />
        </Link>
      ))}
    </div>
  );
};

export default DoctorsList;
