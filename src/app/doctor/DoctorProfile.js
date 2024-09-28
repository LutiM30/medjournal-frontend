import React from 'react';
import Header from './component/header';
import Sidebar from './component/Sidebar';
import ProfileCard from './component/ProfileCard';
import Footer from './component/Footer';
import Overview from './component/Overview';
import Services from './component/Services';
import Reviews from './component/Reviews';
import './DoctorProfile.css';

const DoctorProfile = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4">
                    <ProfileCard />
                    <Overview />
                    <Services />
                    <Reviews />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default DoctorProfile;
