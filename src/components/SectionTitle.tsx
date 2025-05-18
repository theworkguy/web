import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  alignment = 'center' 
}) => {
  return (
    <div className={`mb-10 lg:mb-12 ${alignment === 'left' ? 'text-left' : 'text-center'}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
        <span className="text-primary neon-glow">{title.split(' ')[0]}</span>
        {title.split(' ').length > 1 && ' ' + title.split(' ').slice(1).join(' ')}
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;