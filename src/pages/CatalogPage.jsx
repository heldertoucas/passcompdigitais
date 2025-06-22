import React, { useState, useEffect } from 'react';
import { getCoursesForCatalog } from '../services/apiContent';
import { useUIContent } from '../contexts/UIContentContext';
import CourseCard from '../components/catalog/CourseCard';

export default function CatalogPage() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { texts } = useUIContent();

  useEffect(() => {
    getCoursesForCatalog()
      .then(data => {
        setCourses(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {texts.catalog_title || 'Passaporte Competências Digitais'}
        </h1>
        <p className="text-lg text-gray-600">
          {texts.catalog_subtitle || 'Explore as competências e comece a sua jornada.'}
        </p>
      </section>

      {isLoading && <p className="text-center">A carregar cursos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <CourseCard key={course.course_code} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}