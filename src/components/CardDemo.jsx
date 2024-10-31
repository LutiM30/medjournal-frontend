"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
const authors = [
    {
        name: "Mitul Dhirajbhai Mistry",
        description: "Specializes in backend infrastructure and database integration.",
        roles: "Full Stack Developer",
        avatar: "https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/AboutPage%2FMitul_DP.png?alt=media&token=92bb4150-3e22-486c-9465-750e42349c83",
        // backgroundImage: "https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/AboutPage%2Faboutus-bg-mitul.jpg?alt=media&token=2f260e23-1d5d-40fa-84a2-8870b3e0bf16"
        backgroundImage: "aboutus-bg-mitul.jpg"
    },
    {
        name: "Aartiben Rajendrakumar Patel",
        description: "Designs intuitive user interfaces and patient portals.",
        roles: "UI/UX Designer",
        avatar: "https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/AboutPage%2FAarti_DP.png?alt=media&token=5690065f-95e3-476d-95cc-e57560ee29fb",
        backgroundImage: "aboutus-bg-aarti.jpg"
    },
    {
        name: "Dhruvinkumar Italiya",
        description: "Leads data architecture and role-based access systems.",
        roles: "Backend Developer",
        avatar: "https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/AboutPage%2FDhruvin_DP.png?alt=media&token=d55a2aa0-c02c-437e-9557-dd268f9c7c7d",
        backgroundImage: "aboutus-bg-dhruvin.jpg"
    },
    {
        name: "Riten Sunilbhai Patel",
        description: "Focuses on security features and compliance with privacy standards.",
        roles: "Developer",
        avatar: "https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/AboutPage%2FRiten_DP.png?alt=media&token=39044216-0d75-46fe-9f47-17652d260b47",
        backgroundImage: "aboutus-bg-riten.jpg"
    },
];
export function CardDemo() {
    return (
        (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl w-full h-full mx-auto md:auto-rows-[-1rem]">
                    {authors.map((author, index) => (
                        // <div className="max-w-xs w-full group/card">
                        <div key={index}

                            className="w-full group/card mb-4">
                            <div
                                className="cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-between p-4 bg-[url('/images/[author.backgroundImage]')] bg-cover bg-center"
                            >
                                <div
                                    className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
                                <div className="flex flex-row items-center space-x-4 z-10">
                                    <Image
                                        height="100"
                                        width="100"
                                        alt={`${author.name} Avatar`}
                                        src={author.avatar}
                                        className="h-10 w-10 rounded-full border-2 object-cover" />
                                    <div className="flex flex-col">
                                        <p className="font-normal text-base text-gray-50 relative z-10">
                                            {author.name}
                                        </p>
                                        <p className="text-sm text-gray-400">{author.roles}</p>
                                    </div>
                                </div>
                                <div className="text content">
                                    <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                                        {author.name}
                                    </h1>
                                    <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                                        {author.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>)
    );
}
