const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-200 p-4 shadow-md">
            <h3 className="font-bold text-lg mb-2">Dashboard</h3>
            <ul>
                <li className="mb-2"><a href="#" className="text-blue-600">Profile</a></li>
                <li className="mb-2"><a href="#" className="text-blue-600">Appointments</a></li>
                <li className="mb-2"><a href="#" className="text-blue-600">Patient</a></li>
                <li className="mb-2"><a href="#" className="text-blue-600">Settings</a></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
