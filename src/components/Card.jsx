import React from 'react';

// Reusable Card Component
function Card({ icon, title, description }) {
  return (
    <div className="p-6 rounded-lg transition duration-200">
      <div className="flex items-center justify-start mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-start mb-2">{title}</h3>
      <p className="text-gray-600 text-start">{description}</p>
    </div>
  );
}

export default Card;
