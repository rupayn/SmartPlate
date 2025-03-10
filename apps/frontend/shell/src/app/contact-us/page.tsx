import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const ContactUs = () => {
  return (
    <div className="flex flex-col items-center justify-center  min-h-[50vh] bg-transparent p-4">
      <div className="bg-gray-400 shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-blue-500 text-xl"
            />
            <span>123 Main Street, City, Country</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <FontAwesomeIcon
              icon={faPhoneAlt}
              className="text-green-500 text-xl"
            />
            <span>+91 1234567890</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-red-500 text-xl"
            />
            <span>contact@example.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
