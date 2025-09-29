import { useRef, useEffect, useState } from "react";

const ImageTextScroller = ({scrollerData}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);
  const mobileImageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newIndex = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(newIndex);

            if (mobileImageRef.current) {
              mobileImageRef.current.style.opacity = 0;
              setTimeout(() => {
                mobileImageRef.current.src = scrollerData[newIndex].imageUrl;
                mobileImageRef.current.alt = scrollerData[newIndex].imageAlt;
                mobileImageRef.current.style.opacity = 1;
              }, 300);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "-50px 0px -50px 0px" }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="relative w-full bg-gradient-to-r from-cyan-100 to-red-100">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {scrollerData.map((item, index) => (
          <section
            key={`mobile-section-${item.id}`}
            className="relative min-h-screen flex flex-col"
          >
            {/* Enhanced Image Section */}
            <div className="relative h-[50vh] w-full px-4 pt-4">
              <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 flex items-center justify-center bg-white px-6 py-8">
              <div className="max-w-md w-full space-y-6 text-center">
                <p className="text-lg text-gray-600 leading-relaxed">
                  {item.description}
                </p>
                {item.buttonText && (
                  <a
                    href={item.buttonLink}
                    className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    {item.buttonText}
                  </a>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
          {/* Enhanced Image Column */}
          <div className="md:col-span-5 sticky top-16 h-[calc(100vh-10rem)] flex items-center px-4">
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white transform hover:scale-[1.02] transition-transform duration-500">
              {scrollerData.map((item, index) => (
                <div
                  key={`image-${item.id}`}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text Column */}
          <div className="md:col-span-7 flex items-center">
            <div className="w-full max-w-2xl mx-auto space-y-16 py-8">
              {scrollerData.map((item, index) => (
                <section
                  key={`content-${item.id}`}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  data-index={index}
                  className="scroll-mt-20"
                >
                  <div
                    className={`space-y-6 transition-opacity duration-300 ${
                      index === activeIndex ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    <h2 className="text-3xl font-bold text-gray-900">
                      {item.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                    {item.buttonText && (
                      <a
                        href={item.buttonLink}
                        className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
                      >
                        {item.buttonText}
                      </a>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageTextScroller;
