import Image from 'next/image';
import reviewerImage1 from './images/reviewer1.jpg';
import reviewerImage2 from './images/reviewer2.jpg';
import reviewerImage3 from './images/reviewer3.jpg';
import reviewerImage4 from './images/reviewer4.jpg';


const reviewsData = [
    {
        id: 1,
        name: "Jane Doe",
        image: reviewerImage1,
        review: "Excellent service!",
    },
    {
        id: 2,
        name: "John Smith",
        image: reviewerImage2,
        review: "Very professional.",
    },
    {
        id: 3,
        name: "Alice Johnson",
        image: reviewerImage3,
        review: "Highly recommend!",
    },
    {
        id: 4,
        name: "Nik Johnson",
        image: reviewerImage4,
        review: "Highly recommend!",
    },
];

const Reviews = () => {
    return (
        <section className="reviews card p-4 mb-4 bg-white shadow-md rounded-md overflow-hidden">
            <h3 className="text-lg font-bold mb-4">Reviews</h3>
            <div className="marquee">
                <ul className="flex space-x-8 animate-marquee">
                    {reviewsData.map((review) => (
                        <li key={review.id} className="flex items-center space-x-4">
                            <div className="relative w-12 h-12">
                                <Image
                                    src={review.image}
                                    alt={review.name}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-bold">{review.name}</p>
                                <p className="text-gray-600">{review.review}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Reviews;
