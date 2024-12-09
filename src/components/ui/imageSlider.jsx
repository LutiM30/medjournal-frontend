"use client";
import { ImagesSlider } from "@/components/imageSlider";
import { projectConstants } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";
import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';
import { toast } from 'sonner';
export function ImagesSliderHome() {
    const user = useAtomValue(userAtom);
    const images = [
        'https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Homepage%2FMedJournal_home.jpg?alt=media&token=540cbd17-4998-4832-9489-948a8294e13c',
        'https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Homepage%2Farm-1284248_1920.jpg?alt=media&token=225cdaff-6c9b-411a-8ac1-015692a0e4f4',
        'https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Homepage%2Fcorona-4983590_1920.jpg?alt=media&token=ce30fa9b-d679-4eee-890d-81ce5f6dcc79',
        'https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Homepage%2Fpill-4897529_1920.jpg?alt=media&token=7ac6ffe9-7a95-40ad-a8d9-ae7995c6a1ff',

    ];
    const handleButtonClick = () => {
        if (user?.role === 'doctors') {
            window.location.href = '/doc/appointments';
        } else if (user?.role === 'patients') {
            window.location.href = '/pat/doctors';
        } else {
            toast.error('First Login to the system');
            setTimeout(() => {
                window.location.href = '/signin';
            }, 2000);
        }
    };
    return (
        (<ImagesSlider className="h-[43.5rem]" images={images}>
            <motion.div
                initial={{
                    opacity: 0,
                    y: -80,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="z-50 flex flex-col justify-center items-center">
                <motion.p
                    className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
                    Welcome to {projectConstants.PROJECT_NAME}<br /> Want an appointment?
                </motion.p>

                <button
                    onClick={handleButtonClick}
                    className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4"
                >
                    <span>{user?.role !== 'doctors' ? 'Book now →' : 'View all appointments'}</span>

                    <div
                        className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-indigo-500 to-transparent" />
                </button>
            </motion.div>
        </ImagesSlider>)
    );
}
