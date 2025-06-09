import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow">
          LiveTrack
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Share your live location with friends in real-time, watch movement history, and stay connected securely.
        </p>

        <div className="grid gap-6 md:grid-cols-3 text-left">
          <FeatureCard
            title="🔄 Real-time Updates"
            description="Location is updated every second. Watch your friends move on the map instantly."
          />
          <FeatureCard
            title="🔐 Authentication"
            description="Secure login using email or third-party providers. Your data is private and encrypted."
          />
          <FeatureCard
            title="🕒 Timelapse History"
            description="Scroll back in time to see where you or others were earlier today or this week."
          />
        </div>

        <div className="mt-12">
          <Link to="/auth">
            <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-indigo-100">
      <h2 className="text-xl font-bold text-indigo-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
