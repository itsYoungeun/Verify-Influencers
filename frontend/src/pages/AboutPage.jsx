import { Shield, LineChart, Users, Search, Award, Database } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { value: '1,234', label: 'Active Influencers' },
    { value: '25,431', label: 'Claims Verified' },
    { value: '85.7%', label: 'Average Trust Score' },
    { value: '7', label: 'Scientific Journals' }
  ];

  const features = [
    {
      icon: <Shield className="text-emerald-500" size={24} />,
      title: 'Scientific Verification',
      description: 'Cross-reference health claims with peer-reviewed scientific literature and expert analysis.'
    },
    {
      icon: <LineChart className="text-emerald-500" size={24} />,
      title: 'Trust Scoring',
      description: 'Real-time AI-powered analysis of influencer credibility and content accuracy.'
    },
    {
      icon: <Users className="text-emerald-500" size={24} />,
      title: 'Influencer Network',
      description: 'Access to a curated network of verified health and wellness content creators.'
    },
    {
      icon: <Search className="text-emerald-500" size={24} />,
      title: 'Deep Analysis',
      description: 'Comprehensive research tools to evaluate claims and monetization methods.'
    },
    {
      icon: <Award className="text-emerald-500" size={24} />,
      title: 'Quality Standards',
      description: 'Maintaining high standards for scientific accuracy and transparency.'
    },
    {
      icon: <Database className="text-emerald-500" size={24} />,
      title: 'Data-Driven Insights',
      description: 'Advanced analytics and reporting on influencer performance and audience trust.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      {/* Hero Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Verify Health Influencers</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We&apos;re building the foundation for trusted health information online by verifying influencer claims
            against scientific research and maintaining high standards for accuracy.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-emerald-500 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              To promote scientific accuracy and transparency in health information sharing by providing
              tools and standards for verification of influencer claims.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-lg">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Research Standards Section */}
      <div className="bg-slate-800 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Research Standards</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our verification process relies on leading scientific journals and rigorous academic research
              to ensure the highest standards of accuracy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Verification Process</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span>Cross-reference claims with peer-reviewed scientific literature</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span>Analyze content accuracy and context</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span>Evaluate source credibility and methodology</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span>Regular review and updates of verified claims</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Trusted Sources</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span>PubMed Central for comprehensive medical research</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span>Nature, Science, and Cell for cutting-edge findings</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span>The Lancet for clinical studies and trials</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span>New England Journal of Medicine for medical breakthroughs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;