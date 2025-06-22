import React from 'react';
import { useUIContent } from '../../contexts/UIContentContext';

export default function Footer() {
  const { texts } = useUIContent();
  const currentYear = new Date().getFullYear();

  const copyrightText = texts.footer_copyright 
    ? texts.footer_copyright.replace('{year}', currentYear) 
    : `© ${currentYear} Passaporte Competências Digitais.`; //

  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-6 text-center">
        <p>{texts.footer_tagline}</p> {/* */}
        <p className="text-sm mt-2">{copyrightText}</p>
      </div>
    </footer>
  );
}