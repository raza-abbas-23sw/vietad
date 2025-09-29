import '../Home'; 
import logoPng from '../../../assets/logos/logo.png'; 

const GetStartedSection = () => {
  // Icons as inline SVG components
  const DesignIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CustomizeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 6H12.01M12 12H12.01M12 18H12.01M13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const TemplateIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 10H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const SizeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // FeatureCard component
  const FeatureCard = ({ icon, title, description }) => (
    <div className="feature-card text-center p-6 bg-white/90 rounded-2xl shadow-md hover:shadow-xl transition">
      <div className="feature-icon mb-4 flex justify-center text-cyan-600">{icon}</div>
      <h3 className="feature-title font-semibold text-lg text-gray-800">{title}</h3>
      <p className="feature-description text-sm mt-2 text-gray-600">{description}</p>
    </div>
  );

  const features = [
    {
      id: 1,
      icon: <DesignIcon />,
      title: "Free Design Tool",
      description: "Create custom graphics using our advanced design tool or by uploading your own images"
    },
    {
      id: 2,
      icon: <CustomizeIcon />,
      title: "Customizable Buying Options",
      description: "Fully customize your sign to your taste and requirements in just a few clicks."
    },
    {
      id: 3,
      icon: <TemplateIcon />,
      title: "2000+ Free Templates",
      description: "Get inspired by our thousands of free templates. Pick one and start customizing it right away!"
    },
    {
      id: 4,
      icon: <SizeIcon />,
      title: "Flexible Sizes",
      description: "Everything at VietAdSigns is customizable, including product sizes."
    }
  ];

  return (
    <section className="get-started-section bg-gradient-to-r from-cyan-100 to-red-100 py-16">
      <div className="get-started-container max-w-6xl mx-auto px-6">
        <div className="get-started-header text-center mb-12">
          <img 
            src={logoPng} 
            alt="VietAdSigns Logo"
            style={{
              width: '120px',
              height: '80px',
              marginBottom: '24px',
              objectFit: 'contain',
            }}
          />
          <h2 className="get-started-title text-3xl font-bold text-gray-800">
            Get Started With <span className="text-cyan-600">VietAdSigns</span>
          </h2>
        </div>
        
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard 
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
      
      <div className="accent-line mt-12 h-1 bg-cyan-600 w-1/2 mx-auto rounded"></div>
    </section>
  );
};

export default GetStartedSection;
