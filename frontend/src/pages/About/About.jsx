import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      {/* Main Heading */}
      <h1 className="text-5xl font-bold mb-12 text-center text-orange-800 border-b-4 border-green-600 pb-4">
        About AYUSH Startup Registration Portal
      </h1>

      {/* Mission Section */}
      <section className="mb-16 bg-orange-50 rounded-lg p-6 border-l-8 border-green-700">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
        <p className="text-lg mb-4 text-gray-700">
          The AYUSH Startup Registration Portal is dedicated to fostering innovation and entrepreneurship in the field of traditional Indian medicine systems. Our mission is to provide a streamlined platform for startups to register, connect, and thrive in the AYUSH sector.
        </p>
        <p className="text-lg mb-4 text-gray-700">
          We aim to bridge the gap between ancient wisdom and modern technology, enabling startups to bring the benefits of AYUSH systems to a global audience while ensuring quality, authenticity, and regulatory compliance.
        </p>
      </section>

      {/* AYUSH Info Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">What is AYUSH?</h2>
        <p className="text-lg mb-6 text-gray-700">
          AYUSH stands for Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homoeopathy. These are traditional systems of medicine that have been practiced in India for thousands of years.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Ayurveda", description: "Ancient Indian system of natural and holistic medicine" },
            { title: "Yoga", description: "Physical, mental, and spiritual practices originating in ancient India" },
            { title: "Naturopathy", description: "System of alternative medicine based on the healing power of nature" },
            { title: "Unani", description: "Traditional Persian system of medicine" },
            { title: "Siddha", description: "Ancient system of medicine originating in South India" },
            { title: "Homoeopathy", description: "Alternative medical system based on the principle of 'like cures like'" }
          ].map((system, index) => (
            <Card 
              key={index}
              className="transition-transform transform hover:scale-110 hover:shadow-2xl border-l-4 border-orange-600 rounded-lg shadow-lg"
            >
              <CardHeader className="bg-green-100 p-4">
                <CardTitle className="text-xl font-bold text-orange-800">{system.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700">{system.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* AYUSH Services Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">AYUSH Startup Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "AYUSH Connect",
              description: "Unite AYUSH startups through our Networking Hub for collaboration and funding access."
            },
            {
              title: "AYUSH Investor Hub",
              description: "Explore startup profiles, review pitch decks, and invest smarter in AYUSH."
            },
            {
              title: "AYUSH Incubator Hub",
              description: "Collaborate with startups, offer programs, and drive AYUSH sector innovation."
            },
            {
              title: "AYUSH Startup Acceleration Hub",
              description: "Tailor acceleration programs and spotlight startups through demo days and showcases."
            },
            {
              title: "AYUSH Government Engagement",
              description: "Stay informed on AYUSH policies and collaborate on traditional healthcare projects."
            },
            {
              title: "AYUSH Wellness Hub",
              description: "Access the AYUSH Knowledge Hub and engage with the wellness community."
            }
          ].map((service, index) => (
            <Card 
              key={index}
              className="transition-transform transform hover:scale-110 hover:shadow-2xl border-l-4 border-green-600 rounded-lg shadow-lg"
            >
              <CardHeader className="bg-orange-100 p-4">
                <CardTitle className="text-xl font-bold text-green-800">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
