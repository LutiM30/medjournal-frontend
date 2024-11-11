"use client";
import { cn } from "@/lib/utils";
import React from "react";

import {
    IconBoxAlignRightFilled,
    IconNotes,
    IconShieldLock,
    IconCalendarPlus,
    IconTableColumn,
} from "@tabler/icons-react";

import {
    SkeletonOne, SkeletonTwo, SkeletonThree, SkeletonFour,
    SkeletonFive
} from "./FeaturesSkeleton";
import { CardDemo } from "./CardDemo";


export function OurTeam() {
    return (
        (<>
            <div className='overflow-hidden h-full w-full relative z-50 flex flex-col justify-center items-center'>
                <h1 className='font-bold text-xl md:text-4xl text-center bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">'>
                    Meet the Team
                </h1>
            </div>
            <CardDemo />

        </>)
    );
}

const items = [
    {
        title: "Book an appointment",
        description: (
            <span className="text-sm">
                Book an appointment with a doctor and save your time.
            </span>
        ),
        header: <SkeletonOne />,
        className: "md:col-span-1",
        icon: <IconCalendarPlus className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Medical History Notes",
        description: (
            <span className="text-sm">
                {/* Access and manage your medical records easily.  */}
                Track treatments and health updates in one secure place.
            </span>
        ),
        header: <SkeletonTwo />,
        className: "md:col-span-1",
        icon: <IconNotes className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Privacy",
        description: (
            <span className="text-sm">
                Your medical information is kept confidential and secure.
            </span>
        ),
        header: <SkeletonThree />,
        className: "md:col-span-1",
        icon: <IconShieldLock className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Essential Doctor's Advice for Health",
        description: (
            <span className="text-sm">
                Expert advice from healthcare professionals can guide you toward a healthier life.
            </span>
        ),
        header: <SkeletonFour />,
        className: "md:col-span-2",
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },

    {
        title: "Ease of Use Features",
        description: (
            <span className="text-sm">
                <ul className="list-disc list-inside">
                    <li>Intuitive Navigation: Easily find what you need.</li>
                    <li>Responsive Design: Works seamlessly on all devices.</li>
                    <li>Fast Loading Times: Get quick access to information.</li>

                </ul>
            </span>
        ),
        header: <SkeletonFive />,
        className: "md:col-span-1",
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
];
