import React from 'react';
import './DoctorProfile.css';

const DoctorProfile = () => {
    return (
        <div className="container">
            {/* Header */}
            <header className="header">
                <div className="logo">Logo</div>
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
                    <div className="profile-card">
                        <img src="profile_image_url" alt="Doctor" className="profile-image" />
                        <h2>Dr. Przemysław Czaja</h2>
                        <p>Specialty: Cardiology</p>
                        <p>Rating: ★★★★☆</p>
                    </div>

                    {/* Overview Section */}
                    <section className="overview">
                        <h3>Overview</h3>
                        <p>
                            Orthopedist. He treats injuries and chronic musculoskeletal ailments.
                            Especially in athletes, but not only. He gained his professional
                            experience working for several years at the Carolina Medical Center...
                        </p>
                    </section>

                    {/* Services Section */}
                    <section className="services">
                        <h3>Services and Price List</h3>
                        <ul>
                            <li>Orthopedic Consultation - $220</li>
                            <li>Delivery Blocks - $220</li>
                            <li>Ultrasound Injection - $220</li>
                        </ul>
                    </section>

                    {/* Reviews Section */}
                    <section className="reviews">
                        <h3>Reviews</h3>
                        <ul>
                            <li>Review 1: Excellent service!</li>
                            <li>Review 2: Very professional.</li>
                            <li>Review 3: Highly recommend!</li>
                        </ul>
                    </section>

                    {/* Availability Section */}
                    <section className="availability">
                        <h3>Availability</h3>
                        <p>Check available time slots for appointments.</p>
                        {/* Here, you could add a calendar component */}
                    </section>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button>Send Message</button>
                        <button>Make Appointment</button>
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
