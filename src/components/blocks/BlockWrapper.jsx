import React from 'react';
import { useUIContent } from '../../contexts/UIContentContext';

const ICONS = {
  aprender: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
  ),
  descobrir: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3"></circle><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.364 16.364l2.121 2.121M5.515 5.515l2.121 2.121m0 0A7.5 7.5 0 1112 4.5M12 4.5v3m0 9v3m4.5-7.5h3m-9 0H4.5"></path></svg>
  ),
  desafio: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-4a6 6 0 100-12 6 6 0 000 12z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 12 2 2 4-4"></path></svg>
  ),
  partilha: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
  ),
};

const COLORS = {
  aprender: 'text-pcd-blue',
  descobrir: 'text-pcd-roxo',
  desafio: 'text-pcd-green',
  partilha: 'text-pcd-text-light',
};

export default function BlockWrapper({ block, children }) {
  const { texts } = useUIContent();
  const categoryTextKey = `block_category_${block.category.toLowerCase()}`;
  const categoryText = texts[categoryTextKey] || block.category;

  return (
    <div className="mb-8 p-6 bg-pcd-card-bg rounded-xl shadow-lg">
      <header className="flex items-center mb-4">
        <div className={`mr-4 ${COLORS[block.category]}`}>
          {ICONS[block.category]}
        </div>
        <h3 className="text-xl font-bold text-gray-800">{categoryText}</h3>
      </header>
      <div className="prose max-w-none">
        {children}
      </div>
    </div>
  );
}