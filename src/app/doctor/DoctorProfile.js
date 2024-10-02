import React from "react";

import Footer from './component/Footer';
import Sidebar from './component/Sidebar';
import Overview from './component/Overview';
import Services from './component/Services';
import Reviews from './component/Reviews';
import Button from './component/Button';

const DoctorProfilePage = () => {
    return (
        <div className="relative">
            {/* Navigation */}
            {/* <FloatingNav className="fixed top-0 z-50" /> */}

            {/* Doctor Profile */}
            <div className="flex flex-col h-screen pt-20">
                <div className="flex flex-grow">
                    <Sidebar />
                    <main className="flex-grow p-4">
                        <Overview />
                        <Services />
                        <Reviews />
                        <div className="text-center flex justify-center space-x-4">
                            <Button>Send Message</Button>
                            <Button variant="primary">Make Appointment</Button>
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default DoctorProfilePage;
