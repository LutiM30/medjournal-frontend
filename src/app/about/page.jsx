"use client";
import React from "react";
import { OurTeam } from "@/components/OurTeam";
import { projectConstants } from "@/lib/utils";

import { cn } from "@/lib/utils";


import { Boxes } from "@/components/ui/background-boxes";
import { LayoutGridDemo } from "@/components/layoutGrid";
import { Footer } from "@/components/ui/footer";


const About = () => {

    return (
        <>
            <div className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
                {/* grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl w-full h-full mx-auto md:auto-rows-[20rem] grid for 3 columns */}


                {/* row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 [&>p:text-lg] md:col-span-1 grid for one column part 1 */}

                {/* row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 [&>p:text-lg] md:col-span-2 grid for two columns part 2  */}


                {/* <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Welcome to {projectConstants.PROJECT_NAME}
                </h2> */}
                {/* <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Sign Up to {projectConstants.PROJECT_NAME}
                </p> */}

                <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg mg-24">
                    <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

                    <Boxes />
                    <h1
                        className={cn(
                            "md:text-4xl text-xl text-white relative z-20 uppercase border-b-2 pt-2 pb-2",
                            // "border-black dark:border-white"
                        )}
                    >
                        About Us
                    </h1>
                    {/* <hr /> */}

                    {/* row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 [&>p:text-lg] md:col-span-1 grid for one column part 1 */}

                    {/* row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 [&>p:text-lg] md:col-span-2 grid for two columns part 2  */}
                    <p className="text-justify mx-5 mt-2 text-neutral-300 relative z-0 row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 [&>p:text-lg] md:col-span-1 w-[370px] md:w-[470px] lg:w-[570px]">


                        {/* Framer motion is the best animation library ngl */}
                        "Our mission at Med Journal is to make healthcare records accessible and secure, allowing patients, doctors, and administrators to manage medical information with ease."
                    </p>

                </div>
                <OurTeam />
                {/* <>
                    <LayoutGridDemo />
                </> */}
            </div >

        </>
    );
};

export default About;
