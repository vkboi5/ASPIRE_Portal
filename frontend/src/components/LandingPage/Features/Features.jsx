import { Leaf, Shield, Users, FileBadgeIcon, FolderSyncIcon, UserRoundCogIcon, BotIcon, BadgeDollarSign } from "lucide-react";
import { Card, CardContent } from "../../ui/card";

const Features = () => {
  const features = [
    { icon: Shield, title: 'Secure Platform', description: 'Enhanced Security with Cloud Services' },
    { icon: FolderSyncIcon, title: 'PWA', description: 'Progressive Web Application for data syncing in offline mode!' },
    { icon: FileBadgeIcon, title: 'Holistic Growth', description: 'Resources and tools for sustainable business development' },
    { icon: BotIcon, title: 'Multi-Lingual ChatBot Support', description: '24/7 assistance from AYUSH industry experts' },
    { icon: FileBadgeIcon, title: 'Digital AYUSH Passport', description: 'A Unique Digital Verification Document for Startups!' },
    { icon: BadgeDollarSign, title: 'Incentives and Rewards', description: 'Incentives and Rewards for the users' },
    { icon: UserRoundCogIcon, title: 'Utilizes Existing Government Services', description: 'Powered with DigiLocker and APIs' },
    { icon: Leaf, title: 'Holistic Portal', description: 'Resources and tools for sustainable business development' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-extrabold tracking-wide uppercase text-xl text-blue-600 font-bold">Features!</h2>
          <p className="mt-2 text-3xl leading-8 font-bold font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Unlock the potential to elevate your <span className="text-blue-600">AYUSH</span> startup. 
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="transition-transform transform hover:scale-105 hover:shadow-lg rounded-md border border-gray-300 bg-gray-100 p-4">
                <CardContent className="pt-5">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-300 text-gray-800">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg leading-6 font-medium text-gray-800">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
