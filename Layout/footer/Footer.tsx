import Link from "next/link";
import {
  FaFacebookF,
  FaFacebookMessenger,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className=" h-auto bg-cyan-950">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white">
          <div className=" md:col-span-1 lg:col-span-1 bg-cyan-950 flex flex-col justify-center p-6 sm:p-10">
            <img
              src="https://cdn.salla.network/images/logo/logo-square.png"
              alt="Footer Logo"
              className="h-12 w-12"
            />
            <div className="font-medium text-lg mb-3 text-white font-mont mt-2">
              Like what you see?
            </div>

            <ol className="flex items-center ">
              <li className="mx-2">
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF />
                </a>
              </li>
              <li className="mx-2">
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <FaFacebookMessenger />
                </a>
              </li>
              <li className="mx-2">
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              </li>
              <li className="mx-2">
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp />
                </a>
              </li>
              <li className="mx-2">
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
              </li>
            </ol>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 bg-cyan-800 dark:text-white py-4 sm:py-5">
          <div className="text-center font-medium lg:pb-0 pb-1 font-mont sm:text-sm text-xs">
            <p className="text-sm">
              كافة الحقوق محفوظة لدى: متجر التجربة الجميلة{" "}
            </p>
          </div>
          <div className="col-span-2 text-center font-medium font-mont sm:text-sm text-xs">
            © 2023 All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
