'use client';
import { useState } from 'react';
import { editarAvaliacao, deletarAvaliacao } from '@/api/api.js';

type Props = {
  avaliacao: { id: number; nota: number; comentario?: string };
  nomeLoja?: string;
  onClose: () => void;
  onSalvo: (nota: number, comentario: string) => void;
  onDeletado: () => void;
};

export function ModalEditarAvaliacao({ avaliacao, nomeLoja, onClose, onSalvo, onDeletado }: Props) {
  // começa com o que já tava pra não perder o que o usuário escreveu antes
  const [nota, setNota] = useState(avaliacao.nota);
  const [comentario, setComentario] = useState(avaliacao.comentario ?? '');
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    try {
      setLoading(true);
      await editarAvaliacao(avaliacao.id, nota, comentario);
      onSalvo(nota, comentario);
      onClose();
    } catch (err) {
      console.error('Erro ao salvar avaliação:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletar = async () => {
    try {
      setLoading(true);
      await deletarAvaliacao(avaliacao.id);
      onDeletado();
      onClose();
    } catch (err) {
      console.error('Erro ao deletar avaliação:', err);
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

        <h2 className="text-xl text-gray-900 mb-8">
          Você está avaliando <strong>{nomeLoja ?? 'a loja'}</strong>
        </h2>

        {/* estrelas clicáveis, fica roxa até a nota escolhida */}
        <div className="flex justify-center gap-4 mb-8">
          {[1, 2, 3, 4, 5].map((estrela) => (
            <button
              key={estrela}
              onClick={() => setNota(estrela)}
              className="transition-transform hover:scale-110"
            >
              <svg width="60" height="60" viewBox="0 0 24 24" fill={estrela <= nota ? '#6A38F3' : 'none'} stroke="#6A38F3" strokeWidth="1.5" strokeLinejoin="round">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            </button>
          ))}
        </div>

        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          rows={7}
          placeholder="Avaliação da loja"
          className="w-full bg-white rounded-2xl px-5 py-4 text-sm text-gray-700 resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-[#6A38F3] mb-6"
        />

        <button
          onClick={handleDeletar}
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-base rounded-full py-3 mb-4 transition-colors disabled:opacity-50"
        >
          DELETAR
        </button>

        <button
          onClick={handleSalvar}
          disabled={loading}
          className="w-full bg-[#6A38F3] hover:bg-[#5a2ee0] text-white font-bold text-base rounded-full py-3 transition-colors disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>

      </div>
    </div>
  );
}
