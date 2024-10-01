import React from 'react';
import Footer from './component/Footer';
import Header from './component/header';
import ProfileCard from './component/ProfileCard';
import Sidebar from './component/Sidebar';
import Overview from './component/Overview';
import Services from './component/Services';
import Reviews from './component/Reviews';
import Button from './component/Button';

const DoctorProfile = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-grow">
                <Sidebar />
                <main className="flex-grow p-4">
                    <ProfileCard />
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
    );
};

export default DoctorProfile;
