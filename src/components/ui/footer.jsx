import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { cn, projectConstants } from "@/lib/utils";
import Link from "next/link";
import dayjs from "dayjs";

export function Footer() {
  const thisYear = dayjs().year();

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <hr />
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          <div className="px-5 py-2">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2 hover:underline hover:underline-offset-4"
              )}
            >
              Home
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="/about"
              className={cn(
                "flex items-center gap-2 hover:underline hover:underline-offset-4"
              )}
            >
              About Us
            </Link>
          </div>
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Facebook</span>
            <FontAwesomeIcon icon={faFacebookF} className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Instagram</span>
            <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
          </a>
          <a
            href={projectConstants.GITHUB_REPO_URL}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">GitHub</span>
            <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
          </a>
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          © {thisYear} {projectConstants.PROJECT_NAME}. All rights reserved.
        </p>
      </div>
    </section>
  );
}
