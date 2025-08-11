import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'outline' | 'gold';
  className?: string;
  href?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  href,
  disabled = false,
}) => {
  const baseStyles = `
    relative overflow-hidden
    inline-flex items-center justify-center
    px-8 py-4 rounded-xl
    font-black text-center uppercase tracking-wide
    transition-all duration-500 transform hover:scale-105
    ${variant === 'primary' ? 'btn-primary' : ''}
    ${variant === 'gold' ? 'btn-gold' : ''}
    ${variant === 'outline' ? 'btn-outline' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    group
    ${className}
  `;
  
  const content = (
    <>
      <span className="relative z-10 group-hover:animate-pulse font-black">{children}</span>
      {!disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-primary-dark bg-[length:200%_100%] group-hover:animate-[gradient_2s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </>
  );
  
  if (href) {
    return (
      <a href={href} className={baseStyles} {...(disabled ? { 'aria-disabled': 'true' } : {})}>
        {content}
      </a>
    );
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={baseStyles}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;