import React from 'react';

export default function Card({ children }) {
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      {children}
    </div>
  );
}