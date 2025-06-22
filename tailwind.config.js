/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Vamos adicionar as nossas cores personalizadas aqui, conforme o Guia de Design
      colors: {
        'pcd-blue': '#3B82F6', // Exemplo, iremos definir as cores exatas
        'pcd-roxo': '#8B5CF6', // Exemplo
        'pcd-green': '#10B981', // Exemplo
        'pcd-text-light': '#6B7280', // Exemplo
        'pcd-card-bg': '#FFFFFF', // Exemplo
        'pcd-bg-soft': '#F9FAFB', // Exemplo
      },
    },
  },
  plugins: [],
}