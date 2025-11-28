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


const wardsData = [
  {
    name: "Roysambu Ward",
    stats: "Infrastructure Priority: Roads",
    color: "bg-red-500/80",
    position: "top-[14%] left-[26%]",
  },
  {
    name: "Githurai Ward",
    stats: "Key Focus: Digital Literacy Centers",
    color: "bg-yellow-500/80",
    position: "top-[32%] right-[14%]",
  },
  {
    name: "Kahawa West Ward",
    stats: "Key Focus: Water & Sanitation",
    color: "bg-green-500/80",
    position: "bottom-[16%] left-[18%]",
  },
  {
    name: "Zimmerman",
    stats: "Youth Engagement Score: High",
    color: "bg-blue-500/80",
    position: "top-[60%] left-[40%]",
  },
];

const InteractiveMap = () => {
  const [activeWard, setActiveWard] = useState(wardsData[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Map Area */}
      <div className="relative w-full lg:w-3/4 max-w-3xl mx-auto aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-4 border-[#2B27AB] group bg-gray-100">
        
              <Image
        src="/roymap.webp"
        alt="Community event"
        width={600}
        height={400}
        sizes="(max-width: 768px) 100vw, 600px"
        className="w-full h-auto rounded-xl object-cover"
      />

        {/* Overlay chips – tap on mobile, hover on desktop */}
        {wardsData.map((ward) => (
          <button
            key={ward.name}
            type="button"
            className={`absolute ${ward.position} -translate-x-1/2 -translate-y-1/2
                        px-2 py-1 rounded-full text-white font-semibold text-[10px] sm:text-xs
                        shadow-lg ring-2 ring-white/80 ${ward.color}
                        opacity-85 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`}
            onClick={() => setActiveWard(ward)}
            onMouseEnter={() => setActiveWard(ward)}
            aria-label={ward.name}
          >
            {ward.name.split(" ")[0]}
          </button>
        ))}

        <div className="pointer-events-none absolute inset-x-4 bottom-4 sm:bottom-6 flex justify-center">
          <span className="inline-flex items-center rounded-full bg-black/40 px-3 py-1 text-[10px] sm:text-xs text-white font-semibold opacity-90">
            Tap or hover on the circles to see each ward’s focus
          </span>
        </div>
      </div>

      {/* Data Panel */}
      <div className="w-full lg:w-1/4 max-w-md mx-auto lg:mx-0 p-5 sm:p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-lg sm:text-xl font-bold text-[#2B27AB] border-b pb-2 mb-4">
          Ward Focus (2025–2030)
        </h3>
        <p className="text-base font-semibold text-gray-800">{activeWard.name}</p>
        <p className="mt-2 text-sm text-gray-700">
          <span className="font-medium">Primary Focus Area:</span> {activeWard.stats}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
          <h4 className="text-sm font-bold text-gray-700">
            Quick Impact Targets (Mock)
          </h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• 5-year youth jobs created</li>
            <li>• TVET & digital skills coverage</li>
            <li>• Safety, sanitation & green spaces</li>
          </ul>
        </div>
      </div>
    </div>
  );
};



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
      <section className="relative bg-gradient-to-br from-[#2B27AB] to-[#52C4CF] text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-balance">
      Roy Safi
    </h1>
    <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl font-light max-w-2xl mx-auto text-balance">
      Empowering Roysambu Through Community Leadership, Education & Opportunity
    </p>
    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
      {/* buttons unchanged */}
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