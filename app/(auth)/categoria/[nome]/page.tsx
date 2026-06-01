'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CardProduto, Produto } from '@/components/cardProduto';

type Subcategoria = {
  id: number;
  nome: string;
};

const ordenacoes = ["Menor preço", "Maior preço", "Mais avaliados", "Mais recentes"];

export default function CategoriaEspecifica() {
  const { nome } = useParams() as { nome: string };

  const [produtos, setProdutos] = useState<Produto[]>(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      nome: `Produto ${i + 1}`,
      preco: parseFloat((99.99 + i * 10).toFixed(2)),
      avaliacao: (i % 5) + 1,
      descricao: "teste",
      status: i % 3 === 0 ? "INDISPONÍVEL" : "DISPONÍVEL",
      imagemUrl: "",
    }))
  );
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState<number | null>(null);
  const [ordenacao, setOrdenacao] = useState("");
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const produtosPorPagina = 10;

  // busca os produtos e subcategorias da API quando a pagina carrega
  // tambem verifica se o usuario esta logado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLogged(true);

    // chamar API aqui
    // const data = await getProdutosPorCategoria(nome);
    // setProdutos(data.produtos);
    // setSubcategorias(data.subcategorias);
    setCarregando(false);
  }, [nome]);

  // filtra e ordena os produtos
  const produtosFiltrados = produtos
    .filter((p) => busca === "" || p.nome.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => {
      if (ordenacao === "Menor preço") return a.preco - b.preco;
      if (ordenacao === "Maior preço") return b.preco - a.preco;
      return 0;
    });

  const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);

  const produtosPaginados = produtosFiltrados.slice(
    (paginaAtual - 1) * produtosPorPagina,
    paginaAtual * produtosPorPagina
  );

  return (
    <div className="bg-[#F6F3E4]">

      {/* banner da categoria */}
      <div className="h-[55vh] overflow-hidden">
        <div className="bg-black text-white flex items-center justify-between px-[15%] h-full relative">
          <h1 className="text-7xl font-black capitalize max-w-[70%] text-right">
            O universo da tecnologia em um só lugar
          </h1>
          <img
            src="/img_categoria/pessoa_categoria.png"
            alt="pessoa"
            className="h-[140%] w-auto absolute left-[65%] bottom-[-50%]"
          />
        </div>
      </div>

      {/* conteudo principal */}
      <div className="px-40 py-6">

        {/* barra de pesquisa mockada — substituir pelo componente real */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-full max-w-xl shadow-sm">
            <input
              type="text"
              placeholder="Procurar por..."
              value={busca}
              onChange={(e) => { setBusca(e.target.value); setPaginaAtual(1); }}
              className="flex-1 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
            />
            <span className="text-gray-400 ml-2">🔍</span>
          </div>
        </div>

        {/* filtros de subcategoria e ordenação */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">

          {/* subcategorias — so aparece se tiver subcategorias cadastradas */}
          {subcategorias.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {subcategorias.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSubcategoriaSelecionada(sub.id === subcategoriaSelecionada ? null : sub.id)}
                  className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors ${
                    subcategoriaSelecionada === sub.id
                      ? "bg-[#6A38F3] text-white border-[#6A38F3]"
                      : "bg-white text-gray-600 border-gray-300 hover:border-[#6A38F3]"
                  }`}
                >
                  {sub.nome}
                </button>
              ))}
            </div>
          )}

          {/* ordenação */}
          <select
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-1 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#6A38F3]"
          >
            <option value="">ordenar por</option>
            {ordenacoes.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* estado de carregando */}
        {carregando && (
          <p className="text-center text-gray-500 mt-10">Carregando produtos...</p>
        )}

        {/* grid de produtos */}
        {!carregando && produtosPaginados.length > 0 && (
          <div className="grid grid-cols-5 gap-2 mb-8">
            {produtosPaginados.map((produto) => (
              <CardProduto key={produto.id} produto={produto} />
            ))}
          </div>
        )}

        {/* mensagem quando nao tem produtos */}
        {!carregando && produtosPaginados.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Nenhum produto encontrado nessa categoria.
          </p>
        )}

        {/* paginação — so aparece se tiver mais de uma pagina */}
        {totalPaginas > 1 && (
          <div className="flex items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
              disabled={paginaAtual === 1}
              className="px-2 py-1 text-gray-500 hover:text-[#6A38F3] disabled:opacity-30"
            >
              {"<"}
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
              <button
                key={pagina}
                onClick={() => setPaginaAtual(pagina)}
                className={`w-7 h-7 rounded-full text-sm font-bold transition-colors ${
                  paginaAtual === pagina
                    ? "bg-[#6A38F3] text-white"
                    : "text-gray-600 hover:text-[#6A38F3]"
                }`}
              >
                {pagina}
              </button>
            ))}

            <button
              onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
              disabled={paginaAtual === totalPaginas}
              className="px-2 py-1 text-gray-500 hover:text-[#6A38F3] disabled:opacity-30"
            >
              {">"}
            </button>
          </div>
        )}

        {/* secoes exclusivas para usuarios logados */}
        {isLogged && (
          <div>

            {/* principais lojas */}
            <section className="mt-10 mb-10">
              <h2 className="text-xl font-black text-gray-800 mb-4">Principais Lojas</h2>
              <div className="flex gap-6 flex-wrap">
                {/* chamar API aqui */}
                {/* exemplo de como vai ficar:
                {lojas.map((loja) => (
                  <div key={loja.id} className="flex flex-col items-center gap-1">
                    <img src={loja.logoUrl} alt={loja.nome} className="w-16 h-16 rounded-full object-cover" />
                    <p className="text-sm font-bold text-gray-800">{loja.nome}</p>
                    <p className="text-xs text-[#6A38F3]">{loja.categoria}</p>
                  </div>
                ))} */}
              </div>
            </section>

            {/* mais populares */}
            <section className="mt-10 mb-10">
              <h2 className="text-xl font-black text-gray-800 mb-4">Mais populares</h2>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {/* chamar API aqui */}
                {/* exemplo de como vai ficar:
                {maisPopulares.map((produto) => (
                  <CardProduto key={produto.id} produto={produto} />
                ))} */}
              </div>
            </section>

            {/* recem adicionados */}
            <section className="mt-10 mb-10">
              <h2 className="text-xl font-black text-gray-800 mb-4">Recém adicionados</h2>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {/* chamar API aqui */}
                {/* exemplo de como vai ficar:
                {recemAdicionados.map((produto) => (
                  <CardProduto key={produto.id} produto={produto} />
                ))} */}
              </div>
            </section>

          </div>
        )}

      </div>
    </div>
  );
}