import React from 'react';
import BlockWrapper from './BlockWrapper.jsx';
import Button from '../ui/Button.jsx'; // Vamos precisar do nosso botão genérico

// Esta função decide se um bloco deve ter um botão de "completar"
const isCompletable = (category) => {
  return ['desafio', 'partilha'].includes(category);
};

export default function DynamicBlock({ block, isCompleted, onComplete }) {
  const content = (
    <div dangerouslySetInnerHTML={{ __html: block.block_html_content }} />
  );

  return (
    <BlockWrapper block={block}>
      {content}

      {/* Lógica de Conclusão */}
      {isCompletable(block.category) && (
        <div className="mt-6 pt-4 border-t border-gray-200 text-right">
          {isCompleted ? (
            <p className="font-bold text-pcd-green">✓ Concluído!</p>
          ) : (
            <Button onClick={() => onComplete(block.id)}>
              Marcar como Concluído
            </Button>
          )}
        </div>
      )}
    </BlockWrapper>
  );
}