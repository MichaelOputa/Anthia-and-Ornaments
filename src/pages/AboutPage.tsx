import { Phone, Instagram, MapPin, Heart } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-amber-900 to-amber-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">
            About Anthia & Ornaments
          </h1>
          <p className="text-xl text-amber-100">
            Making Occasions Better Since Day One
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 text-amber-900" />
            </div>
            <h2 className="text-3xl font-serif text-gray-900 mb-6 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              <p>
                Anthia & Ornaments was born from a passion for creating beautiful,
                meaningful pieces that celebrate life's special moments. We believe
                that every occasion deserves to be adorned with elegance and style.
              </p>
              <p>
                Our collection features carefully curated jewelry, clothing, and
                accessories that blend timeless design with contemporary aesthetics.
                Each piece is selected with attention to quality, craftsmanship, and
                the ability to make you feel extraordinary.
              </p>
              <p>
                Whether you're celebrating a milestone, attending a special event, or
                simply treating yourself to something beautiful, we're here to help
                you find the perfect piece that tells your unique story.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-serif text-gray-900 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Heart className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">
                We never compromise on the quality of our materials and craftsmanship
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Heart className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Elegance</h3>
              <p className="text-gray-600">
                Timeless designs that bring sophistication to every occasion
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Heart className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Service</h3>
              <p className="text-gray-600">
                Dedicated to providing an exceptional shopping experience
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-serif text-gray-900 mb-8 text-center">
            Get In Touch
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Instagram className="h-6 w-6 text-amber-900" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Instagram</h3>
                  <p className="text-gray-600">anthia_ornaments</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-amber-900" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+2348124238750</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-amber-900" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">
                    Benin City, Nigeria
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4">Send us a message</h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-900 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-900 focus:border-transparent"
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-900 focus:border-transparent"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-amber-900 text-white py-3 rounded-lg hover:bg-amber-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
