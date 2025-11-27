"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
// Carousel Data
const carouselItems = [
  {
    id: 1,
    title: "Digital Skills for 500+ Youth",
    subtitle: "Roysambu TVET Bootcamp — 2024",
    bgColor: "bg-gradient-to-r from-[#2B27AB] to-[#52C4CF]",
  },
  {
    id: 2,
    title: "Community Clean-Up Initiative",
    subtitle: "Together for a healthier Roysambu",
    bgColor: "bg-gradient-to-r from-[#52C4CF] to-[#2B27AB]",
  },
  {
    id: 3,
    title: "Mentorship & Career Guidance",
    subtitle: "Connecting students with local professionals",
    bgColor: "bg-gradient-to-r from-[#2B27AB]/90 to-[#2B27AB]",
  },
];

// Testimonials Data (replace with real quotes)
const testimonials = [
  {
    name: "Jane M.",
    role: "TVET Graduate, 2024",
    content: "The digital training changed my life — I now run a small graphic design business from home.",
  },
  {
    name: "Mr. Otieno",
    role: "Headteacher, Roysambu Secondary",
    content: "Roy’s commitment to youth goes beyond words — he shows up, listens, and acts.",
  },
  {
    name: "David K.",
    role: "Youth Group Leader",
    content: "We finally have a leader who understands our struggles and invests in solutions.",
  },
];

// Mock data for the interactive map overlay
const wardsData = [
    { name: 'Roysambu Ward', stats: 'Infrastructure Priority: Roads', color: 'bg-red-500/80', position: 'top-[10%] left-[20%]' },
    { name: 'Githurai Ward', stats: 'Key Focus: Digital Literacy Centers', color: 'bg-yellow-500/80', position: 'top-[30%] right-[10%]' },
    { name: 'Kahawa West Ward', stats: 'Key Focus: Water & Sanitation', color: 'bg-green-500/80', position: 'bottom-[10%] left-[10%]' },
    { name: 'Zimmerman', stats: 'Youth Engagement Score: High', color: 'bg-blue-500/80', position: 'top-[60%] left-[40%]' },
];

const InteractiveMap = () => {
    const [activeWard, setActiveWard] = useState(wardsData[0]);

    // This is the container for the map image and the transparent overlay.
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Map Visualization Area */}
            <div className="relative w-full lg:w-3/4 aspect-[4/3] rounded-xl overflow-hidden shadow-2xl group border-4 border-[#2B27AB]">
                

            <div className="bg-gray-100 p-4 sm:p-6 rounded-xl shadow-2xl relative">
              <Image
                src="roymap.webp" // Ensure this image is in your public folder
                alt="GIS Land Cover Map of Roysambu Constituency"
                width={1200}
                height={800}
                className="rounded-lg border-2 border-[#2B27AB] object-contain"
              />
              <p className="text-sm text-gray-500 mt-4 text-center italic">
                Visualizing Roysambu's complexity: Electoral Areas, Settlement (Pink), and Green Spaces (Green/Yellow).
              </p>
            </div>
                
                {/* --- Interactive Overlay Layer --- */}
                {wardsData.map((ward, index) => (
                    <div 
                        key={index}
                        className={`absolute ${ward.position} transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer 
                            p-2 rounded-full text-white font-bold text-xs shadow-lg hover:z-20 hover:scale-110 
                            ${ward.color} opacity-80 hover:opacity-100 ring-2 ring-white`}
                        onMouseEnter={() => setActiveWard(ward)}
                        onMouseLeave={() => setActiveWard(wardsData[0])} // Reset to a default state or last active
                    >
                        {ward.name.split(' ')[0]}
                    </div>
                ))}

                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 text-white font-extrabold text-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Hover Over Areas for Data
                </div>
            </div>

            {/* Data Display Panel */}
            <div className="w-full lg:w-1/4 p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#2B27AB] border-b pb-2 mb-4">Ward Focus</h3>
                
                <div className="space-y-4">
                    <p className="text-lg font-semibold text-gray-800">
                        {activeWard.name}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Primary Focus Area:</span> {activeWard.stats}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-300">
                        <h4 className="text-sm font-bold text-gray-700">Quick Stats (Mock Data)</h4>
                        <ul className="text-xs text-gray-500 mt-2 space-y-1">
                            <li>• Population Density: High</li>
                            <li>• TVET Participation: 78%</li>
                            <li>• Sanitation Index: 7/10</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate carousel every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2B27AB] to-[#52C4CF] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Roy Safi
          </h1>
          <p className="mt-6 text-xl md:text-2xl font-light max-w-2xl mx-auto">
            Empowering Roysambu Through Community Leadership, Education & Opportunity
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/about" 
              className="bg-white text-[#2B27AB] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition"
            >
              Learn More
            </a>
            <a
              href="/get-involved" 
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition"
            >
              Get Involved
            </a>
          </div>
        </div>
      </section>

      {/* Constituency Map Section - UPDATED TO INTERACTIVE COMPONENT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#2B27AB]">
            Data-Driven Development: Our Constituency Map
          </h2>
          <p className="mt-3 text-gray-700 max-w-4xl mx-auto">
            We use geographical data for targeted development. Hover over the areas on the map to see the unique priorities for each Roysambu ward, ensuring every area receives the specific resources it needs.
          </p>
        </div>
        
        <InteractiveMap />

        <p className="text-sm text-gray-500 mt-8 text-center italic">
          Visualizing Roysambu's complexity: Electoral Areas, Settlement (Pink), and Green Spaces (Green/Yellow).
        </p>
      </section>

      {/* Carousel Section */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {carouselItems.map((item) => (
              <div key={item.id} className={`w-full flex-shrink-0 ${item.bgColor} text-white p-8 md:p-12`}>
                <h3 className="text-2xl md:text-3xl font-bold">{item.title}</h3>
                <p className="mt-2 text-lg opacity-90">{item.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition z-10"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition z-10"
            aria-label="Next"
          >
            ›
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {carouselItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === currentIndex ? 'bg-white' : 'bg-white/50'
                } transition-colors`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#2B27AB]">
              A Vision for Roysambu
            </h2>
            <p className="mt-4 text-gray-700">
              Rooted in decades of service as a teacher, mentor, and businessman,
              Roy Safi champions youth empowerment, technical education (TVET),
              and inclusive development in our community.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start">
                <span className="text-[#52C4CF] mr-2">✅</span>
                <span>Expand access to digital & vocational skills training</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#52C4CF] mr-2">✅</span>
                <span>Strengthen local entrepreneurship & job creation</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#52C4CF] mr-2">✅</span>
                <span>Promote transparency, youth engagement, and social welfare</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-xl h-64 md:h-80 flex items-center justify-center shadow-inner">
            <span className="text-gray-500">📸 Community Event Photo Placeholder</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#2B27AB]">Voices from Roysambu</h2>
          <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
            Real impact. Real stories.
          </p>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform hover:scale-[1.02] transition duration-300"
              >
                <p className="italic text-gray-800">“{t.content}”</p>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#52C4CF] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="bg-[#2B27AB] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold">Support the Movement</h3>
          <p className="mt-4 max-w-2xl mx-auto">
            Your contribution helps fund TVET kits, mentorship programs, and community initiatives in Roysambu.
          </p>
          <a
            href="https://paypal.me/roysafi" // 🔁 Replace with your M-Pesa Paybill, Chapa, or fundraising link
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block bg-[#52C4CF] text-[#2B27AB] font-bold py-4 px-10 rounded-full text-lg hover:bg-[#42b3bf] transition shadow-lg transform hover:scale-105"
          >
            🎯 Donate Now
          </a>
          <p className="mt-4 text-sm opacity-80">
            Transparent. Accountable. Community-driven.
          </p>
        </div>
      </section>
    </main>
  );
}