'use client';
import { useState } from 'react';
import { criarAvaliacaoProduto } from '@/api/api.js';

type Props = {
  produtoId: number;
  nomeProduto: string;
  onClose: () => void;
  onCriado: (avaliacao: any) => void;
};

export function ModalCriarAvaliacao({ produtoId, nomeProduto, onClose, onCriado }: Props) {
  const [nota, setNota] = useState(0);
  const [hoveredNota, setHoveredNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnviar = async () => {
    if (nota === 0) return;
    try {
      setLoading(true);
      const criado = await criarAvaliacaoProduto(produtoId, nota, comentario);
      onCriado(criado);
      onClose();
    } catch (err) {
      console.error('Erro ao criar avaliação:', err);
    } finally {
      setLoading(false);
    }
  };

  const estrelaAtiva = hoveredNota || nota;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-[#EFEFEF] rounded-2xl w-full max-w-lg px-10 py-10 shadow-xl">

        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl text-black hover:opacity-60 transition-opacity"
        >
          ✕
        </button>

        <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-1">Avaliando</p>
        <p className="text-center text-base font-semibold text-gray-800 mb-5">{nomeProduto}</p>

        {/* seletor de estrelas */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              onClick={() => setNota(i)}
              onMouseEnter={() => setHoveredNota(i)}
              onMouseLeave={() => setHoveredNota(0)}
              className="text-4xl transition-colors"
            >
              {i <= estrelaAtiva ? (
                <span className="text-yellow-400">★</span>
              ) : (
                <span className="text-gray-300">☆</span>
              )}
            </button>
          ))}
        </div>

        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          rows={7}
          placeholder="Comentário (opcional)"
          autoFocus
          className="w-full bg-white rounded-2xl px-5 py-4 text-sm text-gray-700 resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-[#6A38F3] mb-6"
        />

        <button
          onClick={handleEnviar}
          disabled={loading || nota === 0}
          className="w-full bg-[#6A38F3] hover:bg-[#5a2ee0] text-white font-bold text-base rounded-full py-3 transition-colors disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Avaliar'}
        </button>

      </div>
    </div>
  );
}
