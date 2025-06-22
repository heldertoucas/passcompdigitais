import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUIContent } from '../contexts/UIContentContext.jsx';
import { getCourseByCode, getUserEnrollmentForCourse } from '../services/apiContent.js';
import { enrollInClass } from '../services/apiEnrollment.js';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';

export default function CoursePage() {
  const { courseCode } = useParams();
  const { texts } = useUIContent();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [classCodeInput, setClassCodeInput] = useState('');

  const fetchData = async () => {
    try {
      // Reiniciar o estado antes de cada fetch
      setError('');
      setIsLoading(true);

      const courseData = await getCourseByCode(courseCode);
      setCourse(courseData);

      if (courseData) {
        const enrollmentData = await getUserEnrollmentForCourse(courseData.id);
        setEnrollment(enrollmentData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [courseCode]);
  
  const handleEnrollment = async (e) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);
      try {
          await enrollInClass(classCodeInput);
          await fetchData();
      } catch(err) {
          setError(texts.course_code_invalid_error || 'Código inválido.');
      } finally {
          setIsLoading(false);
      }
  };

  // --- INÍCIO DAS GUARDAS DE SEGURANÇA CORRIGIDAS ---

  // 1. Mostra o estado de carregamento primeiro
  if (isLoading) {
    return <p className="text-center p-10">A carregar detalhes do curso...</p>;
  }

  // 2. NOVA GUARDA: Se houve um erro OU se o carregamento terminou mas o curso não foi encontrado
  if (error || !course) {
    return <p className="text-center p-10 text-red-500">{error || 'Curso não encontrado.'}</p>;
  }

  // A partir daqui, temos a certeza de que o objeto 'course' existe.

  // --- FIM DAS GUARDAS DE SEGURANÇA CORRIGIDAS ---

  // Se não estiver inscrito e o curso requer código
  if (course.requires_code && !enrollment) {
    return (
      <div className="max-w-xl mx-auto text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
        <h3 className="text-xl font-semibold mb-4 text-pcd-blue">{texts.course_pending_title}</h3>
        <p className="text-gray-600 mb-6">{texts.course_pending_description}</p>
        <form onSubmit={handleEnrollment} className="flex flex-col items-center gap-4">
          <Input 
            id="classCode" 
            type="text"
            value={classCodeInput}
            onChange={(e) => setClassCodeInput(e.target.value)}
            placeholder={texts.course_pending_input_placeholder}
          />
          <Button isLoading={isLoading}>{texts.course_pending_button}</Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    );
  }

  // Se estiver inscrito
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-8">{course.full_description}</p>
      <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Missões</h2>
      <ul className="divide-y divide-gray-200">
        {course.course_missions.map(({ missions, mission_order }) => (
          <li key={missions.id} className="flex justify-between items-center py-4">
            <span className="font-semibold">{mission_order}. {missions.title}</span>
            <Link 
                to={`/mission/${missions.id}`}
                className="bg-pcd-green text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
                {texts.mission_button_start}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}