import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUIContent } from '../contexts/UIContentContext';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user, signIn, signUp } = useAuth();
  const { texts } = useUIContent();
  const navigate = useNavigate();

  // Se o utilizador já estiver logado, redireciona para a página principal
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      if (isLoginView) {
        await signIn({ email, password });
        // A navegação será tratada pelo useEffect
      } else {
        await signUp({ email, password });
        setMessage(texts.auth_signup_success_message);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold text-pcd-blue mb-6">{texts.app_title_full}</h1>
      <Card>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isLoginView ? texts.auth_login_title : texts.auth_signup_title}
        </h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">{texts.auth_email_label}</label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={texts.auth_email_placeholder} />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">{texts.auth_password_label}</label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={texts.auth_password_placeholder} />
            {!isLoginView && <p className="text-xs text-gray-500 mt-1">{texts.auth_password_hint}</p>}
          </div>
          <Button isLoading={isLoading}>
            {isLoginView ? texts.auth_login_button : texts.auth_signup_button}
          </Button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
        <p className="mt-6 text-center text-sm">
          <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-pcd-blue hover:underline">
            {isLoginView ? texts.auth_switch_to_signup_button : texts.auth_switch_to_login_button}
          </button>
        </p>
      </Card>
    </div>
  );
}