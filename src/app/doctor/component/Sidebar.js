// Sidebar.js
import React from 'react';

const Sidebar = () => {
    return (
        <aside className="w-64 p-4 bg-gray-200">
            <h3 className="text-lg font-semibold">Dashboard</h3>
            <ul className="list-none">
                <li className="py-1 cursor-pointer">Profile</li>
                <li className="py-1 cursor-pointer">Appointments</li>
                <li className="py-1 cursor-pointer">Patient</li>
                <li className="py-1 cursor-pointer">Settings</li>
            </ul>
        </aside>
    );
};

export default Sidebar;
