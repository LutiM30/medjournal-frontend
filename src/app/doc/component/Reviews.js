import Image from 'next/image';
import doctorImage from './images/doc1.jpg';

const appointmentsData = [
    {
        id: 1,
        appointmentTime: "Monday, Oct 9, 2024 - 10:00 AM",
    },
    {
        id: 2,
        appointmentTime: "Wednesday, Oct 11, 2024 - 2:00 PM",
    },
    {
        id: 3,
        appointmentTime: "Friday, Oct 13, 2024 - 9:00 AM",
    },
];

const UpcomingAppointments = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 mb-6 bg-white border-l-4 border-blue-500 rounded-lg shadow-lg dark:bg-slate-900">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Upcoming Appointments for Dr. John Czaja</h2>
            <div className="flex items-start p-4 bg-gray-100 rounded-lg shadow-md dark:bg-slate-800 ">
                <Image
                    src={doctorImage}
                    alt="Dr. John Czaja"
                    width={100}
                    height={100}
                    className="rounded-full mr-4"
                />
                <div>
                    <h3 className="font-semibold text-purple-600">Appointments:</h3>
                    <ul className="list-disc list-inside dark:text-white">
                        {appointmentsData.map((appointment) => (
                            <li key={appointment.id} className="text-gray-800 dark:text-white">
                                {appointment.appointmentTime}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UpcomingAppointments;
