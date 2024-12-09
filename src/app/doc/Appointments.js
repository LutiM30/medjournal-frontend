"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; // Ensure correct import for your Firebase configuration
import { collection, query, where, getDocs } from "firebase/firestore";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { EyeIcon, FilterIcon, FilePlusIcon } from "lucide-react";

function Appointments({ doctorId }) {
    const [appointments, setAppointments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [originalNotes, setOriginalNotes] = useState("");
    const [currentNotes, setCurrentNotes] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {


        const fetchAppointments = async () => {
            try {
                const appointmentsRef = collection(db, "appointments");
                const snapshot = await getDocs(appointmentsRef);

                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
        console.log(fetchAppointments);
    }, [doctorId]);

    const handleSaveNotes = async (appointmentId) => {
        console.log("Notes saved for appointment:", appointmentId, currentNotes);
        setOriginalNotes(currentNotes);
    };

    const currentAppointments = appointments.filter((appt) => new Date(appt.date) == new Date());
    const pastAppointments = appointments.filter((appt) => new Date(appt.date) < new Date());
    const upcomingAppointments = appointments.filter((appt) => new Date(appt.date) > new Date());

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md">
            <h4 className="text-blue-700 mb-6 text-2xl font-bold">Appointments</h4>

            {loading ? (
                <p>Loading appointments...</p>
            ) : (
                <>
                    {/* Current Appointments */}
                    <Accordion type="single" collapsible>
                        <AccordionItem value="current">
                            <AccordionTrigger>
                                <h5 className="text-xl font-semibold">Current Appointments</h5>
                            </AccordionTrigger>
                            <AccordionContent>
                                {currentAppointments.length > 0 ? (
                                    currentAppointments.map((appt) => (
                                        <div key={appt.id} className="mb-6">
                                            <p className="text-gray-500 mb-4">
                                                Currently attending: <strong>{appt.patientName}</strong> ({appt.timeSlot})
                                            </p>
                                            <textarea
                                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-700"
                                                rows={4}
                                                placeholder="Add notes regarding the patient..."
                                                value={currentNotes}
                                                onChange={(e) => setCurrentNotes(e.target.value)}
                                            />
                                            <div className="mt-4 flex space-x-2">
                                                <button
                                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                                    onClick={() => handleSaveNotes(appt.id)}
                                                >
                                                    Save Notes
                                                </button>
                                                <button className="bg-green-500 text-white px-4 py-2 rounded">
                                                    Appointment Done
                                                </button>
                                                <button className="text-blue-500" title="View Patient History">
                                                    <EyeIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No current appointments found.</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                        
                        {/* Upcoming Appointments */}
                        <Accordion type="single" collapsible>
                            <AccordionItem value="upcoming">
                                <AccordionTrigger>
                                    <h5 className="text-xl font-semibold">Upcoming Appointments</h5>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {loading ? (
                                        <p>Loading upcoming appointments...</p>
                                    ) : upcomingAppointments.length === 0 ? (
                                        <p className="text-gray-500 mb-2">No upcoming appointments found.</p>
                                    ) : (
                                        <div>
                                            {upcomingAppointments.map((appt) => (
                                                <div key={appt.id} className="mb-4">
                                                    <p className="text-gray-500">
                                                        Upcoming: <strong>{appt.patientName}</strong> on{" "}
                                                        <strong>{new Date(appt.date).toLocaleDateString()}</strong> at{" "}
                                                        <strong>{appt.timeSlot.split("-")[1]}</strong>
                                                        <br />
                                                        Condition: {appt.notes}
                                                    </p>
                                                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                                                        View Patient Details
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                    {/* Past Appointments */}
                    <Accordion type="single" collapsible>
                        <AccordionItem value="past">
                            <AccordionTrigger>
                                <h5 className="text-xl font-semibold">Past Appointments</h5>
                            </AccordionTrigger>
                            <AccordionContent>
                                {pastAppointments.length > 0 ? (
                                    pastAppointments.map((appt) => (
                                        <div key={appt.id} className="mb-6">
                                            <p className="text-gray-500 mb-2">
                                                Appointment Date: <strong>{appt.date}</strong>
                                            </p>
                                            <p className="text-gray-500 mb-4">
                                                Patient: <strong>{appt.patientName}</strong>
                                            </p>
                                            <textarea
                                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-700"
                                                rows={3}
                                                value={appt.notes || ""}
                                                disabled
                                            />
                                            <div className="mt-4 flex space-x-2">
                                                <button
                                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                                    onClick={() => setIsEditing(true)}
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No past appointments found.</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </>
            )}
        </div>
    );
}

export default Appointments;
