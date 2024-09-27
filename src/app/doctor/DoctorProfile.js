import styles from './DoctorProfile.module.css';

const DoctorProfile = () => {
    const doctor = {
        name: "Przemysław Czaja",
        specialty: "Cardiology Specialist",
        rating: 4,
        about: "Orthopedist. He treats injuries and chronic musculoskeletal ailments. Especially in athletes, but not only. He gained his professional experience working for several years at the Carolina Medical Center in...",
        services: [
            { name: "Orthopedic consultation", price: "$220" },
            { name: "Delivery blocks", price: "$220" },
            { name: "Ultrasound injection", price: "$220" },
        ],
        reviews: [
            { patient: "John D.", rating: 5, comment: "Excellent service!" },
            { patient: "Jane S.", rating: 4, comment: "Very attentive and caring." },
            { patient: "Emily R.", rating: 3, comment: "Good experience but waiting time was long." },
        ],
    };

    return (
        <div className={styles.profileContainer}>
            <header className={styles.header}>
                <h1 className={styles.logo}>Your Logo</h1>
                <nav className={styles.nav}>
                    <a href="/">Home</a>
                    <a href="/doctors">Doctors</a>
                    <a href="/appointments">Appointments</a>
                    <a href="/contact">Contact Us</a>
                </nav>
            </header>

            <div className={styles.card}>
                <img
                    src="/profile.jpg" // Replace with your profile image
                    alt={`${doctor.name}'s profile`}
                    className={styles.profileImage}
                />
                <div className={styles.infoContainer}>
                    <h1 className={styles.doctorName}>{doctor.name}</h1>
                    <h2 className={styles.specialty}>{doctor.specialty}</h2>
                    <div className={styles.rating}>
                        {'★'.repeat(doctor.rating)} {'☆'.repeat(5 - doctor.rating)}
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.button}>Send Message</button>
                        <button className={styles.button}>Make Appointment</button>
                    </div>
                </div>
            </div>

            <section className={styles.aboutSection}>
                <h3>About Specialist</h3>
                <p>{doctor.about}</p>
            </section>

            <section className={styles.servicesSection}>
                <h3>Services Offered</h3>
                <ul className={styles.serviceList}>
                    {doctor.services.map((service, index) => (
                        <li key={index} className={styles.serviceItem}>
                            {service.name} - <span className={styles.price}>{service.price}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={styles.reviewsSection}>
                <h3>Patient Reviews</h3>
                {doctor.reviews.map((review, index) => (
                    <div key={index} className={styles.reviewItem}>
                        <div className={styles.reviewHeader}>
                            <strong>{review.patient}</strong>
                            <div className={styles.rating}>
                                {'★'.repeat(review.rating)} {'☆'.repeat(5 - review.rating)}
                            </div>
                        </div>
                        <p className={styles.reviewComment}>{review.comment}</p>
                    </div>
                ))}
                <button className={styles.button}>See All Reviews</button>
            </section>

            <footer className={styles.footer}>
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default DoctorProfile;
