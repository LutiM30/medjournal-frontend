"use client";
import { api } from "@/lib/apis/api";
import { GET_USERS } from "@/lib/apis/apiUrls";
import { isLoadingAtom } from "@/lib/atoms/atoms";
import { GET_USER_NAME_ROLE } from "@/lib/constants";
import { collections } from "@/lib/functions/Firestore/collections";
import { getAllData } from "@/lib/functions/Firestore/functions";
import { useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";

function page() {
  const setIsLoading = useSetAtom(isLoadingAtom);
  const [doctors, setDoctors] = useState([]);

  /**
   * The function `getUsersData` fetches data for doctors and users, then sets the fetched data and
   * updates the loading state accordingly.
   */
  const getUsersData = async () => {
    setIsLoading(true);
    const doctors = await getAllData(collections.DOCTORS);
    const userIDs = doctors.map((doctor) => doctor.uid);

    const params = {
      ids: userIDs?.toString(),
    };

    const response = await api(GET_USERS, {}, "", params);
    const users = response.data.users?.map((user) => {
      const userDoc = {
        ...GET_USER_NAME_ROLE(user),
      };

      doctors.forEach(
        (doctor) => (userDoc.profile = doctor.uid === user.uid ? doctor : null)
      );
      return userDoc;
    });

    setIsLoading(false);
    setDoctors(users);
  };

  useEffect(() => getUsersData(), []);
  console.log({ doctors });

  return <div>Doctors List</div>;
}

export default page;
