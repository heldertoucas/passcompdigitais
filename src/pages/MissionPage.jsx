import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlocksForMission } from '../services/apiContent.js';
import { getCompletedBlockIds, completeBlock } from '../services/apiProgress.js';
import DynamicBlock from '../components/blocks/DynamicBlock.jsx';

export default function MissionPage() {
  const { missionId } = useParams();
  const [blocks, setBlocks] = useState([]);
  const [completedBlocks, setCompletedBlocks] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para guardar a mensagem de erro

  useEffect(() => {
    if (missionId) {
      const loadMissionData = async () => {
        try {
          setIsLoading(true);
          setError(null); // Limpar erros anteriores ao carregar
          const [missionBlocksData, completedIdsData] = await Promise.all([
            getBlocksForMission(missionId),
            getCompletedBlockIds()
          ]);
          setBlocks(missionBlocksData);
          setCompletedBlocks(completedIdsData);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      loadMissionData();
    }
  }, [missionId]);

  const handleBlockCompletion = async (blockId) => {
    if (completedBlocks.has(blockId)) return;

    try {
      // Limpar erro anterior antes de tentar novamente
      setError(null);
      await completeBlock(blockId);
      setCompletedBlocks(prevCompleted => new Set(prevCompleted).add(blockId));
    } catch (err) {
      // AQUI ESTÁ A MUDANÇA CRÍTICA: Guardamos o erro no estado
      setError(`Erro ao completar o bloco: ${err.message}`);
      console.error("Falha ao completar o bloco:", err);
    }
  };

  if (isLoading) return <p className="text-center">A carregar missão...</p>;
  
  // Modificámos a apresentação do erro para ser mais proeminente
  if (!isLoading && error && blocks.length === 0) {
    return <p className="text-center p-4 bg-red-100 text-red-700 rounded-lg">{error}</p>;
  }

  return (
    <div>
      {/* Apresenta um erro no topo da página, se houver */}
      {error && <p className="text-center mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</p>}

      {blocks.map(block => (
        <DynamicBlock 
          key={block.id} 
          block={block}
          isCompleted={completedBlocks.has(block.id)}
          onComplete={handleBlockCompletion}
        />
      ))}
    </div>
  );
}