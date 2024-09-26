import React, { useState } from "react";
// Assets
import Logo from '../../../assets/mini_logo.png';
import './Testimonial.css'; // Import the CSS file

export default function FeedBack() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback Submitted:', { name, email, comment });
    setSubmitted(true);
  };

  return (
    <section id="feedback" className="feedback-wrapper">
      <div className="lightBg">
        <div className="container-feedback">
          <div className="header-info">
            <h1 className="header-feedback">
              <span className="feedback-text">Feedback!</span>
            </h1>
            <p className="header-feedback-info">
              Feedback related to content, design, or technology with respect to the National Portal of India (NPI) can be sent through this interface.
              <br />
              This portal in no way could redress query/feedback/grievances pertaining to a particular Ministry/Department/Government Body.
            </p>
          </div>
          <div className="content-wrapper">
            <div className="form-wrapper">
              {submitted ? (
                <h3 className="header-feedback">Thank you for your feedback!</h3>
              ) : (
                <form className="form" onSubmit={handleSubmit}>
                  <div className="input-wrapper">
                    <input
                      name="name"
                      type="text"
                      id="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-wrapper">
                    <input
                      name="email"
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="textarea-wrapper">
                    <textarea
                      name="comment"
                      id="comment"
                      placeholder="Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                  </div>
                  <div className="submit-wrapper">
                    <input className="submit-button" type="submit" value="SEND" />
                  </div>
                </form>
              )}
            </div>
            <div className="image-wrapper">
              <img src={Logo} alt="Logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
