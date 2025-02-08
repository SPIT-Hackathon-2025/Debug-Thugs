import { FaEthereum, FaLock, FaGlobe } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-bold text-center text-blue-600">About Us</h2>
        <p className="text-gray-700 text-lg mt-4 text-center">
          Welcome to our <strong>Decentralized Rental Platform</strong>, where transparency and security meet convenience. We aim to revolutionize the rental industry using <strong>blockchain technology</strong>.
        </p>

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow">
            <FaEthereum className="text-4xl text-blue-500 mb-2" />
            <h3 className="text-xl font-semibold">Blockchain-Powered</h3>
            <p className="text-gray-600 text-sm text-center">
              All transactions are recorded on the <strong>Ethereum</strong> blockchain for security and transparency.
            </p>
          </div>

          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow">
            <FaLock className="text-4xl text-green-500 mb-2" />
            <h3 className="text-xl font-semibold">Secure Smart Contracts</h3>
            <p className="text-gray-600 text-sm text-center">
              Rent agreements are <strong>automated</strong> through secure <strong>smart contracts</strong>, ensuring <strong>no fraud</strong>.
            </p>
          </div>

          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow">
            <FaGlobe className="text-4xl text-purple-500 mb-2" />
            <h3 className="text-xl font-semibold">Global & Decentralized</h3>
            <p className="text-gray-600 text-sm text-center">
              Our platform eliminates intermediaries, providing direct landlord-tenant interactions.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-10 p-6 bg-blue-50 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-700 text-center">Our Mission</h3>
          <p className="text-gray-700 text-md mt-3 text-center">
            We are on a mission to <strong>simplify rentals</strong> while ensuring security, privacy, and efficiency. Say goodbye to <strong>traditional intermediaries</strong> and <strong>complex paperwork</strong>!
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-6 text-center">
          <p className="text-gray-700 text-md">Want to experience the future of rentals?</p>
          <a href="/search" className="mt-3 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Explore Listings
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;