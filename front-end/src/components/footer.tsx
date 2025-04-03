
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import logo from '../assets/footer-logo.png';
import Button from "./utils/button";
const Footer = () => {
  return (
    <footer className="bg-secondary  px-6 md:px-10 lg:px-14 xl:px-18 2xl:px-24 text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="md:w-1/2 w-full ">
          <img src={logo} alt="Logo" className="mb-5 w-36 mx-auto" />
          <ul className="flex flex-row gap-4 justify-center">
            <li><a href="#home" className="hover:text-primary">Home</a></li>
            <li><a href="#services" className="hover:text-primary">Services</a></li>
            <li><a href="#about" className="hover:text-primary">About Us</a></li>
            <li><a href="#contact" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>

        <div className="md:w-1/2 w-full">
          <p className="mb-4">
            Subscribe to our Book Store to receive the latest updates and offers!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-blackBG rounded-l-md text-black focus:outline-none"
            />
            <Button className="px-6 rounded-none rounded-r-lg">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li><a href="#privacy" className="hover:text-primary">Privacy Policy</a></li>
          <li><a href="#terms" className="hover:text-primary">Terms of Service</a></li>
        </ul>

        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer