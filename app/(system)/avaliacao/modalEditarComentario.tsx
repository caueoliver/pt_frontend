'use client';
import { useState } from 'react';
import { editarComentario, deletarComentario } from '@/api/api.js';

type Props = {
  comentario: { id: number; conteudo: string };
  onClose: () => void;
  onSalvo: (conteudo: string) => void;
  onDeletado: () => void;
};

export function ModalEditarComentario({ comentario, onClose, onSalvo, onDeletado }: Props) {
  // começa com o texto atual do comentário
  const [conteudo, setConteudo] = useState(comentario.conteudo);
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    // não deixa salvar vazio
    if (!conteudo.trim()) return;
    try {
      setLoading(true);
      await editarComentario(comentario.id, conteudo);
      onSalvo(conteudo);
      onClose();
    } catch (err) {
      console.error('Erro ao salvar comentário:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletar = async () => {
    try {
      setLoading(true);
      await deletarComentario(comentario.id);
      onDeletado();
      onClose();
    } catch (err) {
      console.error('Erro ao deletar comentário:', err);
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

        <textarea
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          rows={7}
          placeholder="Comentário"
          className="w-full bg-white rounded-2xl px-5 py-4 text-sm text-gray-700 resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-[#6A38F3] mb-6"
        />

        <button
          onClick={handleDeletar}
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-base rounded-full py-3 mb-4 transition-colors disabled:opacity-50"
        >
          DELETAR
        </button>

        {/* botão desabilitado enquanto o campo está vazio */}
        <button
          onClick={handleSalvar}
          disabled={loading || !conteudo.trim()}
          className="w-full bg-[#6A38F3] hover:bg-[#5a2ee0] text-white font-bold text-base rounded-full py-3 transition-colors disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>

      </div>
    </div>
  );
}
