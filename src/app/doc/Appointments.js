'use client';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { EyeIcon, FilterIcon, FilePlusIcon } from 'lucide-react';

function Appointments() {
  const [isEditing, setIsEditing] = useState(false);
  const [originalNotes, setOriginalNotes] = useState(
    "Doctor's notes from previous appointment..."
  );
  const [currentNotes, setCurrentNotes] = useState(originalNotes);

  const handleSaveNotes = () => {
    setOriginalNotes(currentNotes);
  };

  return (
    <div className='max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md dark:bg-slate-900'>
      <h4 className='mb-6 text-2xl font-bold text-blue-700'>Appointments</h4>

      {/* Current Appointment */}
      <Accordion type='single' collapsible>
        <AccordionItem value='current'>
          <AccordionTrigger>
            <h5 className='text-xl font-semibold'>Current Appointment</h5>
          </AccordionTrigger>
          <AccordionContent>
            <p className='mb-4 text-gray-500'>
              Currently attending: <strong>John Doe</strong> (Diabetes)
            </p>
            <textarea
              className='w-full p-2 border border-gray-300 rounded-md dark:bg-slate-700'
              rows={4}
              placeholder='Add notes regarding the patient...'
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
            />
            <div className='flex mt-4 space-x-2'>
              <button
                className='px-4 py-2 text-white bg-blue-500 rounded'
                onClick={handleSaveNotes}
              >
                Save Notes
              </button>
              <button className='px-4 py-2 text-white bg-green-500 rounded'>
                Appointment Done
              </button>
              <button className='text-blue-500' title='View Patient History'>
                <EyeIcon className='w-5 h-5' />
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Upcoming Appointments */}
      <Accordion type='single' collapsible>
        <AccordionItem value='upcoming'>
          <AccordionTrigger>
            <h5 className='text-xl font-semibold'>Upcoming Appointments</h5>
          </AccordionTrigger>
          <AccordionContent>
            <div className='flex items-center mb-4 space-x-2'>
              <button className='text-blue-500' title='Filter Appointments'>
                <FilterIcon className='w-5 h-5' />
              </button>
              <button className='px-4 py-2 text-white bg-blue-500 rounded'>
                <FilePlusIcon className='inline w-5 h-5 mr-1' /> Request Access
                to Records
              </button>
            </div>
            <p className='mb-2 text-gray-500'>
              Upcoming: <strong>Jane Smith</strong> at 3:00 PM (Hypertension)
            </p>
            <button className='px-4 py-2 mt-2 text-white bg-blue-500 rounded'>
              View Past Records
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Past Appointments */}
      <Accordion type='single' collapsible>
        <AccordionItem value='past'>
          <AccordionTrigger>
            <h5 className='text-xl font-semibold'>Past Appointments</h5>
          </AccordionTrigger>
          <AccordionContent>
            <p className='mb-2 text-gray-500'>
              Appointment Date: <strong>2024-09-12</strong>
            </p>
            <p className='mb-4 text-gray-500'>
              Patient: <strong>Emily Brown</strong>
            </p>
            <textarea
              className='w-full p-2 border border-gray-300 rounded-md dark:bg-slate-700'
              rows={3}
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
              disabled={!isEditing}
            />
            <div className='flex mt-4 space-x-2'>
              {isEditing ? (
                <>
                  <button
                    className='px-4 py-2 text-white bg-blue-500 rounded'
                    onClick={() => {
                      handleSaveNotes();
                      setIsEditing(false);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className='px-4 py-2 text-gray-700 bg-gray-300 rounded dark:bg-slate-700 dark:text-white'
                    onClick={() => {
                      setIsEditing(false);
                      setCurrentNotes(originalNotes);
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className='px-4 py-2 text-white bg-blue-500 rounded'
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Appointments;
