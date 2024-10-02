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
        review: "Very knowledgeable doctor.",
    },
    {
        id: 3,
        name: "Emma Johnson",
        image: reviewerImage3,
        review: "Highly recommend!",
    },
    {
        id: 4,
        name: "Robert Brown",
        image: reviewerImage4,
        review: "Great experience.",
    },
];

const Reviews = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 mb-6 bg-white border-l-4 border-green-500 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Patient Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviewsData.map(review => (
                    <div key={review.id} className="flex items-start p-4 bg-gray-100 rounded-lg shadow-md">
                        <Image src={review.image} alt={review.name} width={50} height={50} className="rounded-full mr-4" />
                        <div>
                            <h3 className="font-semibold text-purple-600">{review.name}</h3>
                            <p>{review.review}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
