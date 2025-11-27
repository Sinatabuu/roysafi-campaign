// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
            <Link
              href="/about"
              className="bg-white text-[#2B27AB] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition"
            >
              Learn More
            </Link>
            <Link
              href="/get-involved"
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition"
            >
              Get Involved
            </Link>
          </div>
        </div>
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
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
            aria-label="Next"
          >
            ›
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {carouselItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
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
          <div className="bg-gray-100 rounded-xl h-64 md:h-80 flex items-center justify-center">
            <span className="text-gray-500">📸 Community Event Photo</span>
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
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <p className="italic text-gray-800">“{t.content}”</p>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#52C4CF] flex items-center justify-center text-white font-bold">
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
          <Link
            href="https://paypal.me/roysafi" // 🔁 Replace with your M-Pesa Paybill, Chapa, or fundraising link
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block bg-[#52C4CF] text-[#2B27AB] font-bold py-4 px-10 rounded-full text-lg hover:bg-[#42b3bf] transition shadow-lg"
          >
            🎯 Donate Now
          </Link>
          <p className="mt-4 text-sm opacity-80">
            Transparent. Accountable. Community-driven.
          </p>
        </div>
      </section>
    </main>
  );
}