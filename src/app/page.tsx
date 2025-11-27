// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
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
            {/* Placeholder for hero image — replace with actual photo later */}
            <span className="text-gray-500">📸 Community Image</span>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#2B27AB] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold">Join the Movement</h3>
          <p className="mt-4 max-w-2xl mx-auto">
            Together, we can build a Roysambu where every young person has the tools, training, and opportunity to lead.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block bg-[#52C4CF] text-[#2B27AB] font-bold py-3 px-8 rounded-full hover:bg-[#42b3bf] transition"
          >
            Contact Roy Safi
          </Link>
        </div>
      </section>
    </main>
  );
}