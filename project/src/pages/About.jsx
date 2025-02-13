import { Award, Shield, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About TravelEase</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to making bus travel comfortable, affordable, and accessible for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&q=80&w=1944"
              alt="Our Mission"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At TravelEase, we believe that travel should be accessible to everyone. Our mission is to revolutionize bus travel by providing a seamless booking experience, comfortable journeys, and exceptional customer service.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-indigo-600" />
                <span className="text-gray-700">Safe and secure travel</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-indigo-600" />
                <span className="text-gray-700">Customer-centric approach</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-indigo-600" />
                <span className="text-gray-700">Quality service guarantee</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-gray-600">We prioritize our customers' needs and satisfaction above all else</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety</h3>
              <p className="text-gray-600">Your safety is our top priority during every journey</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">We strive for excellence in every aspect of our service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;