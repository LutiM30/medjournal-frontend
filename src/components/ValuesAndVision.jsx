import { HoverEffect } from "./ui/card-hover-effect";

export function ValuesAndVision() {
  return (
    (<div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>)
  );
}

export const projects = [
  {
    title: "User-Centric Design",
    description:
      "We prioritize ease of use, creating a system that addresses real needs for patients and doctors alike.",
    link: "https://medicaljournal.vercel.app/about",

  },
  {
    title: "Security and Privacy",
    description:
      "By adhering to industry standards, including HIPAA compliance, we ensure user confidentiality and secure data sharing.",
    link: "https://medicaljournal.vercel.app/signup",

  },
  {
    title: "Continuous Innovation",
    description:
      "Our goal is to learn and adapt with the latest web development and data security practices to create a cutting-edge solution.",
    link: "https://medicaljournal.vercel.app/signin",

  },
];

