"use client";
import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { EyeIcon, FilterIcon, FilePlusIcon } from 'lucide-react';

function Appointments() {
    const [currentNotes, setCurrentNotes] = useState("");

    const handleSaveNotes = () => {
        // Logic to save notes
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md">
            <h4 className="text-blue-700 mb-6 text-2xl font-bold">Appointments</h4>

            {/* Current Appointment */}
            <Accordion type="single" collapsible>
                <AccordionItem value="current">
                    <AccordionTrigger>
                        <h5 className="text-xl font-semibold">Current Appointment</h5>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-gray-500 mb-4">
                            Currently attending: <strong>John Doe</strong> (Diabetes)
                        </p>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-700"
                            rows={4}
                            placeholder="Add notes regarding the patient..."
                            value={currentNotes}
                            onChange={(e) => setCurrentNotes(e.target.value)} />
                        <div className="mt-4 flex space-x-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSaveNotes}>
                                Save Notes
                            </button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded">
                                Appointment Done
                            </button>
                            <button className="text-blue-500" title="View Patient History">
                                <EyeIcon  className='h-5 w-5'></EyeIcon>
                            </button>
                        </div>
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
                        <div className="flex items-center mb-4 space-x-2">
                            <button className="text-blue-500" title="Filter Appointments">
                                <FilterIcon className="h-5 w-5" />
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                <FilePlusIcon className="h-5 w-5 mr-1 inline" /> Request Access to Records
                            </button>
                        </div>
                        <p className="text-gray-500 mb-2">
                            Upcoming: <strong>Jane Smith</strong> at 3:00 PM (Hypertension)
                        </p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                            View Past Records
                        </button>
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
                        <p className="text-gray-500 mb-2">
                            Appointment Date: <strong>2024-09-12</strong>
                        </p>
                        <p className="text-gray-500 mb-4">
                            Patient: <strong>Emily Brown</strong>
                        </p>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-700"
                            rows={3}
                            value="Doctor's notes from previous appointment..."
                            disabled />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default Appointments;
