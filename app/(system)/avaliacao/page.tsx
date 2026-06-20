'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiEdit2 } from 'react-icons/fi';
import { getAvaliacoesLoja } from '@/api/api.js';
import { ModalEditarAvaliacao } from './modalEditarAvaliacao';
import { ModalEditarComentario } from './modalEditarComentario';
import { ModalCriarComentario } from './modalCriarComentario';

type Comentario = {
  id: number;
  usuarioId: number;
  conteudo: string;
  usuario: { nome: string; profile_picture_url?: string | null };
};

type Avaliacao = {
  id: number;
  usuarioId: number;
  nota: number;
  comentario?: string;
  usuario: { nome: string; profile_picture_url?: string | null };
  loja?: { nome: string };
  comentariosAvaliacoes: Comentario[];
};

export default function PaginaAvaliacao() {
  const router = useRouter();

  // avaliações que vem do back
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);

  // id do usuário logado, usado pra decidir quem pode editar o quê
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  // qual avaliação/comentário está sendo editado agora, tipo: null = nenhum modal aberto
  const [avaliacaoEditando, setAvaliacaoEditando] = useState<Avaliacao | null>(null);
  const [comentarioEditando, setComentarioEditando] = useState<Comentario | null>(null);

  // qual avaliação está recebendo um novo comentário
  const [avaliacaoComentando, setAvaliacaoComentando] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(true);
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsuarioId(payload.sub);
      } catch {}
    }
    // carrega todas as avaliações ao montar a página
    getAvaliacoesLoja().then(setAvaliacoes).catch(() => {});
  }, []);

  // atualiza a nota e o texto na lista sem precisar buscar no back de novo
  const handleAvaliacaoSalva = (avaliacaoId: number, nota: number, comentario: string) => {
    setAvaliacoes((prev) =>
      prev.map((av) => (av.id === avaliacaoId ? { ...av, nota, comentario } : av))
    );
  };

  // mesmo esquema, mas pra edição de comentário — acha pelo id da avaliação e do comentário
  const handleComentarioSalvo = (avaliacaoId: number, comentarioId: number, conteudo: string) => {
    setAvaliacoes((prev) =>
      prev.map((av) =>
        av.id === avaliacaoId
          ? { ...av, comentariosAvaliacoes: av.comentariosAvaliacoes.map((c) => c.id === comentarioId ? { ...c, conteudo } : c) }
          : av
      )
    );
  };

  // aq adiciona o comentário novo no final da lista sem recarregar
  const handleComentarioCriado = (avaliacaoId: number, novoComentario: Comentario) => {
    setAvaliacoes((prev) =>
      prev.map((av) =>
        av.id === avaliacaoId
          ? { ...av, comentariosAvaliacoes: [...av.comentariosAvaliacoes, novoComentario] }
          : av
      )
    );
  };

  if (avaliacoes.length === 0) {
    return <p className="text-center text-gray-400 text-sm mt-10">Nenhuma avaliação ainda.</p>;
  }

  return (
    <div className="min-h-screen bg-[#F6F3E4]">
      {avaliacoes.map((av) => (
        <div key={av.id} className="w-full mb-6">

          <div className="bg-black w-full px-[10%] pt-5 pb-6">

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">

                {/* seta de voltar pra tela qye tava */}
                <button
                  onClick={() => router.back()}
                  className="text-white text-2xl font-bold hover:text-[#6A38F3] transition-colors mr-1"
                >
                  ‹
                </button>

                {/* avatar — foto de perfil se tiver, senão mostra a inicial */}
                <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden hover:ring-2 hover:ring-[#6A38F3] transition-all cursor-default">
                  {av.usuario.profile_picture_url ? (
                    <img src={av.usuario.profile_picture_url} alt={av.usuario.nome} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-500 flex items-center justify-center text-white text-sm font-bold">
                      {av.usuario.nome.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <span className="text-white font-bold text-sm">{av.usuario.nome}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* estrelas cheias até a nota, vazias o resto */}
                <span className="text-yellow-400 text-lg tracking-wide">
                  {'★'.repeat(av.nota)}{'☆'.repeat(5 - av.nota)}
                </span>

                {/* lápis só aparece pro dono da avaliação */}
                {isLogged && usuarioId === av.usuarioId && (
                  <button
                    onClick={() => setAvaliacaoEditando(av)}
                    className="ml-1 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    title="Editar avaliação"
                  >
                    <FiEdit2 className="text-white" size={16} />
                  </button>
                )}
              </div>
            </div>

            {av.comentario && (
              <p className="text-gray-300 text-sm leading-relaxed hover:text-white transition-colors">{av.comentario}</p>
            )}
          </div>

          <div className="bg-[#F6F3E4] px-[10%] pt-5 pb-5">

            {av.comentariosAvaliacoes.map((c) => (
              // group pra mostrar o lápis só quando passa o mouse no comentário
              <div key={c.id} className="flex gap-3 mb-4 pl-3 border-l-2 border-gray-300 hover:border-[#6A38F3] transition-colors group">
                {/* avatar do comentador — foto se tiver, senão inicial */}
                <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden">
                  {c.usuario.profile_picture_url ? (
                    <img src={c.usuario.profile_picture_url} alt={c.usuario.nome} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold group-hover:bg-[#6A38F3] transition-colors">
                      {c.usuario.nome.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-800">{c.usuario.nome}</span>

                    {/* lápis só pro dono do comentário, aparece no hover */}
                    {isLogged && usuarioId === c.usuarioId && (
                      <button
                        onClick={() => setComentarioEditando(c)}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
                        title="Editar comentário"
                      >
                        <FiEdit2 className="text-gray-500 hover:text-[#6A38F3]" size={14} />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{c.conteudo}</p>
                </div>
              </div>
            ))}

            {/* input falso que ao clicar abre o modal de novo comentário */}
            {isLogged && (
              <div
                onClick={() => setAvaliacaoComentando(av.id)}
                className="flex items-center gap-3 mt-3 bg-white rounded-full px-4 py-2 cursor-pointer border border-gray-200 hover:border-[#6A38F3] hover:shadow-md transition-all group"
              >
                <span className="flex-1 text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Adicionar comentário</span>
                <span className="text-gray-300 group-hover:text-[#6A38F3] transition-colors text-lg">➤</span>
              </div>
            )}
          </div>
        </div>
      ))}

      {avaliacaoEditando && (
        <ModalEditarAvaliacao
          avaliacao={avaliacaoEditando}
          nomeLoja={avaliacaoEditando.loja?.nome}
          onClose={() => setAvaliacaoEditando(null)}
          onSalvo={(nota, comentario) => {
            handleAvaliacaoSalva(avaliacaoEditando.id, nota, comentario);
            setAvaliacaoEditando(null);
          }}
          onDeletado={() => {
            setAvaliacoes((prev) => prev.filter((av) => av.id !== avaliacaoEditando.id));
            setAvaliacaoEditando(null);
          }}
        />
      )}

      {comentarioEditando && (
        <ModalEditarComentario
          comentario={comentarioEditando}
          onClose={() => setComentarioEditando(null)}
          onSalvo={(conteudo) => {
            const avaliacaoId = avaliacoes.find((av) =>
              av.comentariosAvaliacoes.some((c) => c.id === comentarioEditando.id)
            )?.id;
            if (avaliacaoId) handleComentarioSalvo(avaliacaoId, comentarioEditando.id, conteudo);
            setComentarioEditando(null);
          }}
          onDeletado={() => {
            setAvaliacoes((prev) =>
              prev.map((av) => ({
                ...av,
                comentariosAvaliacoes: av.comentariosAvaliacoes.filter((c) => c.id !== comentarioEditando.id),
              }))
            );
            setComentarioEditando(null);
          }}
        />
      )}

      {avaliacaoComentando !== null && (
        <ModalCriarComentario
          avaliacaoId={avaliacaoComentando}
          onClose={() => setAvaliacaoComentando(null)}
          onCriado={(novoComentario) => {
            handleComentarioCriado(avaliacaoComentando, novoComentario);
            setAvaliacaoComentando(null);
          }}
        />
      )}
    </div>
  );
}
