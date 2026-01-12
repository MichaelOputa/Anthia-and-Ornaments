import { Heart, Sparkles, Award, Users } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Craftsmanship',
      description: 'Every piece is carefully handcrafted with attention to detail and quality that lasts.',
    },
    {
      icon: Sparkles,
      title: 'Elegance',
      description: 'We celebrate timeless beauty and sophistication in every design we create.',
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Only the finest materials and techniques are used in our collections.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Supporting local artisans and celebrating Nigerian culture with pride.',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            About Anthia & Ornaments
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Where Nigerian elegance meets timeless sophistication
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-stone-200 rounded-2xl shadow-lg"></div>

            <div>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Anthia & Ornaments was born from a passion for celebrating the rich heritage
                  and beauty of Nigerian craftsmanship. We believe that jewelry and fashion are
                  more than just accessories – they are expressions of identity, culture, and elegance.
                </p>
                <p>
                  Each piece in our collection is thoughtfully curated to reflect the finest in
                  Nigerian artistry. From traditional beadwork to contemporary designs, we bring
                  together the best of both worlds to create pieces that are both timeless and modern.
                </p>
                <p>
                  Our commitment to quality and authenticity sets us apart. We work directly with
                  skilled artisans across Nigeria, ensuring that every item meets our high standards
                  of craftsmanship and beauty.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-serif font-bold text-gray-900 text-center mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                    <value.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                Why Choose Us?
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  At Anthia & Ornaments, we're not just selling jewelry and clothing – we're
                  sharing stories, celebrating culture, and creating lasting memories.
                </p>
                <p>
                  Every purchase supports local Nigerian artisans and helps preserve traditional
                  craftsmanship techniques for future generations.
                </p>
                <p className="font-semibold text-amber-700">
                  Experience the perfect blend of tradition, quality, and contemporary elegance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
