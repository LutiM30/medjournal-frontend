import React from 'react';
import './DoctorProfile.css';

const DoctorProfile = () => {
    return (
        <div className="container">
            {/* Header */}
            <header className="header">
                <div className="logo">MedApp</div>
                <nav className="nav-links">
                    <a href="#">Home</a>
                    <a href="#">Doctors</a>
                    <a href="#">Appointments</a>
                    <a href="#">Contact</a>
                </nav>
            </header>

            {/* Main Layout */}
            <div className="main-layout">
                {/* Sidebar */}
                <aside className="sidebar">
                    <h3>Dashboard</h3>
                    <ul>
                        <li>Profile</li>
                        <li>Appointments</li>
                        <li>Messages</li>
                        <li>Settings</li>
                    </ul>
                </aside>

                {/* Main Content Area */}
                <main className="main-content">
                    {/* Profile Card */}
                    <div className="profile-card card">
                        <img src="profile_image_url" alt="Doctor" className="profile-image" />
                        <h2>Dr. Przemysław Czaja</h2>
                        <p>Specialty: Cardiology</p>
                        <p>Rating: ★★★★☆</p>
                    </div>

                    {/* Overview Section */}
                    <section className="overview card">
                        <h3>Overview</h3>
                        <p>
                            Orthopedist. He treats injuries and chronic musculoskeletal ailments.
                            Especially in athletes, but not only. He gained his professional
                            experience working for several years at the Carolina Medical Center...
                        </p>
                    </section>

                    {/* Services Section */}
                    <section className="services card">
                        <h3>Services and Price List</h3>
                        <ul>
                            <li>Orthopedic Consultation - <span>$220</span></li>
                            <li>Delivery Blocks - <span>$220</span></li>
                            <li>Ultrasound Injection - <span>$220</span></li>
                        </ul>
                    </section>

                    {/* Reviews Section */}
                    <section className="reviews card">
                        <h3>Reviews</h3>
                        <ul>
                            <li>Review 1: Excellent service!</li>
                            <li>Review 2: Very professional.</li>
                            <li>Review 3: Highly recommend!</li>
                        </ul>
                    </section>

                    {/* Availability Section */}
                    <section className="availability card">
                        <h3>Availability</h3>
                        <p>Check available time slots for appointments.</p>
                        {/* Here, you could add a calendar component */}
                    </section>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button className="button">Send Message</button>
                        <button className="button primary">Make Appointment</button>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>
                    <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
                </p>
            </footer>
        </div>
    );
};

export default DoctorProfile;
