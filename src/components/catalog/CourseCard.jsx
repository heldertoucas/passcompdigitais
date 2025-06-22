import React from 'react';
import { Link } from 'react-router-dom';
import { useUIContent } from '../../contexts/UIContentContext';

export default function CourseCard({ course }) {
  const { texts } = useUIContent();
  const defaultImageUrl = 'https://via.placeholder.com/400x200.png?text=Passaporte+CD'; // Imagem temporária

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <img 
        src={course.image_url || defaultImageUrl} 
        alt={`Imagem de capa do curso ${course.title}`} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
        <Link 
          to={`/course/${course.course_code}`} 
          className="inline-block bg-pcd-blue text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {texts.catalog_experience_button || 'Saber Mais →'}
        </Link>
      </div>
    </div>
  );
}