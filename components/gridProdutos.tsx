'use client'

import { useState } from 'react';
import { CardProduto } from './cardProduto';
import { Produto } from '@/interfaces/produtoInterface';

interface GridProps {
  produtos: Produto[];
  itensPorPagina?: number; 
}

export function GridProdutos({ produtos, itensPorPagina = 15 }: GridProps) {
  const [paginaAtual, setPaginaAtual] = useState(1);

  // calcula o total de páginas 
  const totalPaginas = Math.ceil(produtos.length / itensPorPagina);

  // divide o array para exibir apenas os itens da página atual
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = paginaAtual * itensPorPagina;
  const produtosPaginados = produtos.slice(inicio, fim);

  // gera o array de números para identificar as páginas
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  // se não tiver produtos, mostra a mensagem
  if (produtos.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Nenhum produto encontrado.
      </p>
    );
  }

  return (
    <div className="w-full">
      {/* o grid em si*/}
      <div className="grid grid-cols-5 gap-6 mb-10">
        {produtosPaginados.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>

      {/* paginação condicional (só renderiza se tiver mais de 1 página) */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))}
            disabled={paginaAtual === 1}
            className="px-2 py-1 text-gray-500 hover:text-[#6A38F3] disabled:opacity-30"
          >
            {"<"}
          </button>

          {paginas.map((pagina) => (
            <button
              key={pagina}
              onClick={() => setPaginaAtual(pagina)}
              className={`w-8 h-8 rounded-full text-sm font-bold transition-colors ${
                paginaAtual === pagina
                  ? "bg-[#6A38F3] text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {pagina}
            </button>
          ))}

          <button
            onClick={() => setPaginaAtual(prev => Math.min(prev + 1, totalPaginas))}
            disabled={paginaAtual === totalPaginas}
            className="px-2 py-1 text-gray-500 hover:text-[#6A38F3] disabled:opacity-30"
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
}