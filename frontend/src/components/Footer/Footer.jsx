import React from 'react';
import './Footer.css';
import logo from '../../assets/logo2.png';

const Footer = () => {
  return (
    <footer className="footer-section text-white">
      <div className="container-footer">
        <div className="footer-content pt-4 pb-4">
          <div className="footer-flex">
            {/* Logo and About Section */}
            <div className="footer-left">
              <div className="footer-widget">
                <div className="footer-logo">
                  <a href="index.html">
                    <img 
                      src={logo} 
                      alt="ASPIRE Logo" 
                      className="img-fluid"
                    />
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
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin"></i>
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
        <div className="container-footer">
          <div className="row">
            <div className="col-xl-6 col-lg-6 text-center text-lg-left">
              <div className="copyright-text">
                <p>
                  &copy; 2024 ASPIRE. All Rights Reserved. Developed by{' '}
                  <a href="#">ASPIRE Team - Genesis</a>.
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
  );
};

export default Footer;
