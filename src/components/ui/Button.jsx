import React from 'react';

export default function Button({ children, onClick, type = 'button', isLoading = false }) {
  return (
    <button
      onClick={onClick} // 1. A propriedade onClick é agora passada para o botão HTML
      type={type}
      disabled={isLoading}
      className="w-full px-4 py-2 font-semibold text-white bg-pcd-blue rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pcd-blue disabled:bg-gray-400"
    >
      {isLoading ? 'A processar...' : children}
    </button>
  );
}