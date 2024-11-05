"use client";
import { HoverEffect } from "./ui/card-hover-effect";

export function WhyWeBuild() {
    return (
        <div className="max-w-5xl mx-auto px-8">
            <HoverEffect items={projects.map((project, index) => ({ ...project, key: `${project.title}-${index}` }))} />
        </div>
    );
}

export const projects = [
    {
        title: "Empowering Patients",
        description:
            "Our platform empowers patients to access and control their medical history, giving them greater involvement in their healthcare.",
        link: "https://medicaljournal.vercel.app/about",
    },
    {
        title: "Supporting Doctors",
        description:
            "We support doctors in maintaining current patient records, enabling them to provide data-driven, effective care.",
        link: "https://medicaljournal.vercel.app/signup",
    },
    {
        title: "Enabling Administrators",
        description:
            "Our platform enables administrators to manage users without compromising sensitive data, ensuring secure and efficient oversight.",
        link: "https://medicaljournal.vercel.app/signin",
    },
];
