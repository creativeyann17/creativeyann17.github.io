import React from 'react';

const FadeIn = ({ children, delay = 50, transitionDuration = 400, className = '', style = {} }) => {
  const childArray = React.Children.toArray(children);

  return (
    <div className={className} style={style}>
      {childArray.map((child, index) => (
        <div
          key={index}
          style={{
            animation: `fadeIn ${transitionDuration}ms ease-in-out`,
            animationDelay: `${index * delay}ms`,
            animationFillMode: 'both',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Add keyframes to document if not already present
if (typeof document !== 'undefined') {
  const styleId = 'fade-in-keyframes';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

export default FadeIn;
