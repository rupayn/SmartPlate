"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-[#1f2937] text-white mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="col-span-2">
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-300 leading-relaxed">
              Welcome to the UEMK Colleges Food Delivery App – an epicurean
              designed exclusively for the dynamic UEMK community! At the heart
              of our mission lies the dedication to bring you a rich tapestry of
              culinary delights, carefully curated and conveniently delivered to
              your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-white transition-colors">
                Menu
              </li>
              <li className="text-gray-300 hover:text-white transition-colors">
                Track Order
              </li>
              <li className="text-gray-300 hover:text-white transition-colors">
                Contact Us
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <FontAwesomeIcon
                icon={faFacebook}
                className="w-6 h-6 text-gray-300 hover:text-white transition-colors"
              />
              <FontAwesomeIcon
                icon={faTwitter}
                className="w-6 h-6 text-gray-300 hover:text-white transition-colors"
              />
              <FontAwesomeIcon
                icon={faInstagram}
                className="w-6 h-6 text-gray-300 hover:text-white transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            Copyright © {new Date().getFullYear()} UEMK College. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
