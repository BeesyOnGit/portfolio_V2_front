import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { GithubIcon, LinkedinIcon, MailIcon } from '../components/icons/SocialIcons';
import { SkeletonHome } from '../components/skeletons/SkeletonHome';


const Contact: React.FC = () => {
  const { siteData, isLoadingSite } = useAppContext();

  // A simple map to retrieve the correct icon component
  const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    GitHub: GithubIcon,
    LinkedIn: LinkedinIcon,
    Email: MailIcon,
  };

  if (isLoadingSite) {
    return (
      <div className="max-w-lg mx-auto text-center">
        <SkeletonHome />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4 dark:text-dark-cyan">Get In Touch</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out.
      </p>
      
      <div className="flex justify-center gap-6 mb-8">
        {siteData.socials.map((social) => {
          const IconComponent = iconMap[social.name];
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-transform transform hover:scale-110"
              aria-label={social.name}
            >
              {IconComponent && <IconComponent className="w-8 h-8" />}
            </a>
          );
        })}
      </div>

      <a
        href={siteData.socials.find(s => s.name === 'Email')?.url || '#'}
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
      >
        Say Hello
      </a>
    </div>
  );
};

export default Contact;
