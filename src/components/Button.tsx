import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'outline';
  className?: string;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  href,
}) => {
  const baseStyles = `
    relative overflow-hidden
    inline-flex items-center justify-center
    px-6 py-3 rounded
    font-semibold text-center
    transition-all duration-300
    ${variant === 'primary' ? 'bg-primary hover:bg-primary-hover text-white shadow-red-glow' : ''}
    ${variant === 'outline' ? 'border-2 border-primary hover:bg-primary/10 text-primary' : ''}
    group
    ${className}
  `;
  
  const content = (
    <>
      <span className="relative z-10 group-hover:animate-pulse">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-primary-dark bg-[length:200%_100%] group-hover:animate-[gradient_2s_ease-in-out_infinite]"></div>
    </>
  );
  
  if (href) {
    return (
      <a href={href} className={baseStyles}>
        {content}
      </a>
    );
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={baseStyles}
    >
      {content}
    </button>
  );
};

export default Button;