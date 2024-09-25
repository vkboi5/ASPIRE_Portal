import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/logo2.png';

const Footer = () => {
  return (
    <div>
      {/* First Footer Section (Detailed) */}
      <footer className="footer-section text-white">
        <div className="container">
          <div className="footer-content pt-4 pb-4">
            <div className="footer-flex">
              {/* Logo and About Section */}
              <div className="footer-left">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <a href="index.html">
                      <img src={logo} className="img-fluid" alt="ASPIRE Logo" />
                    </a>
                  </div>
                  <div className="footer-text">
                    <p>
                      Empowering AYUSH startups to succeed with a comprehensive
                      registration portal that streamlines processes and ensures
                      growth opportunities for innovative ventures.
                    </p>
                  </div>
                  <div className="footer-social-icon">
                    <span>Follow Us</span>
                    <a href="#">
                      <i className="fab fa-facebook-f facebook-bg"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter twitter-bg"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin linkedin-bg"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Useful Links */}
              <div className="footer-links">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Useful Links</h3>
                  </div>
                  <ul className="text-white">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Features</a></li>
                    <li><a href="#">Eligibility Criteria</a></li>
                    <li><a href="#">Virtual Mentor</a></li>
                    <li><a href="#">Policy</a></li>
                    <li><a href="#">Contact</a></li>
                  </ul>
                </div>
              </div>

              {/* Contact Info */}
              <div className="footer-contact">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Contact Information</h3>
                  </div>
                  <ul className="text-white">
                    <li>Phone: +91 1234 567 890</li>
                    <li>Email: contact@aspire.com</li>
                    <li>Address: 123, AYUSH Building, New Delhi, India</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                <div className="copyright-text">
                  <p>
                    &copy; 2024 ASPIRE. All Rights Reserved. Developed by{' '}
                    <a href="https://codepen.io/anupkumar92/">Aspire Team</a>.
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                <div className="footer-menu">
                  <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Features</a></li>
                    <li><a href="#">Policy</a></li>
                    <li><a href="#">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Second Footer Section (Minimalist) */}
      <footer className="bg-white second-footer">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link to="#" className="text-gray-400 hover:text-gray-500">
              About
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gray-500">
              Contact
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gray-500">
              Privacy Policy
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2023 AYUSH Startup Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
