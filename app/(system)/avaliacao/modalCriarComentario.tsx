'use client';
import { useState } from 'react';
import { criarComentario } from '@/api/api.js';

type Props = {
  avaliacaoId: number;
  onClose: () => void;
  onCriado: (comentario: any) => void;
};

export function ModalCriarComentario({ avaliacaoId, onClose, onCriado }: Props) {
  const [conteudo, setConteudo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnviar = async () => {
    // não deixa enviar vazio
    if (!conteudo.trim()) return;
    try {
      setLoading(true);
      const criado = await criarComentario(avaliacaoId, conteudo);
      onCriado(criado);
      onClose();
    } catch (err) {
      console.error('Erro ao criar comentário:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-[#EFEFEF] rounded-2xl w-full max-w-lg px-10 py-10 shadow-xl">

        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl text-black hover:opacity-60 transition-opacity"
        >
          ✕
        </button>

        {/* autoFocus pra já abrir com o cursor no campo */}
        <textarea
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          rows={7}
          placeholder="Comentário"
          autoFocus
          className="w-full bg-white rounded-2xl px-5 py-4 text-sm text-gray-700 resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-[#6A38F3] mb-6"
        />

        <button
          onClick={handleEnviar}
          disabled={loading || !conteudo.trim()}
          className="w-full bg-[#6A38F3] hover:bg-[#5a2ee0] text-white font-bold text-base rounded-full py-3 transition-colors disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Comentar'}
        </button>

      </div>
    </div>
  );
}
