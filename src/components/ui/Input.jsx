import React from 'react';

export default function Input({ id, type, value, onChange, placeholder, required = true }) {
  return (
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pcd-blue focus:border-transparent"
    />
  );
}