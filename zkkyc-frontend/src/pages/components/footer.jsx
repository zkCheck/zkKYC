import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="py-6 w-full absolute bottom-0">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center">
                    <div className="mr-4 text-white">Powered by Aleo blockchain</div>
                    <div className="flex space-x-4">
                        <a
                            href="https://github.com/zkCheck/zkKYC"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300"
                        >
                            <FaGithub size={24} />
                        </a>
                        <a
                            href="https://twitter.com/zkCheck"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300"
                        >
                            <FaTwitter size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;