'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CardProduto } from '@/components/cardProduto';
import { BarraPesquisa } from '@/components/barraPesquisa';
import { getAllProdutos, getLojas, getCategorias } from '@/api/api.js';
import { Produto } from '@/interfaces/produtoCardInterface';

type Subcategoria = {
  id: number;
  nome: string;
};

type Loja = {
  id: number;
  nome: string;
  logoUrl: string;
  descricao?: string;
};

const ordenacoes = ["Menor preço", "Maior preço", "Mais avaliados", "Mais recentes"];

export default function CategoriaEspecifica() {
  const { nome } = useParams() as { nome: string };
  const nomeDecodificado = decodeURIComponent(nome);

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState<number | null>(null);
  const [ordenacao, setOrdenacao] = useState("");
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const produtosPorPagina = 10;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLogged(true);

    const carregarDados = async () => {
      try {
        const [todosProdutos, todasCategorias, todasLojas] = await Promise.all([
          getAllProdutos(),
          getCategorias(),
          getLojas(),
        ]);

        // filtra produtos da categoria atual pelo nome da URL
        const produtosDaCategoria = todosProdutos.filter((p: any) =>
          p.categoria?.name?.toLowerCase() === nomeDecodificado.toLowerCase()
        );

        // mapeia o shape do back para o que o CardProduto espera
        const produtosMapeados: Produto[] = produtosDaCategoria.map((p: any) => ({
        id: p.id,
        name: p.name,
        preco: p.preco,
        idLoja: p.lojaId,
        estoque: p.estoque,
        imagemUrl: p.imagensProdutos?.[0]?.imageUrl || '',
        avaliacao: 0,
        categoria: p.categoria,  
        }));

        setProdutos(produtosMapeados);
        setLojas(todasLojas);

        // busca as subcategorias da categoria atual (filhas dela)
        const categoriaAtual = todasCategorias.find(
          (c: any) => c.name.toLowerCase() === nomeDecodificado.toLowerCase()
        );
        if (categoriaAtual?.subCategories) {
          setSubcategorias(
            categoriaAtual.subCategories.map((s: any) => ({ id: s.id, nome: s.name }))
          );
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, [nomeDecodificado]);

  const produtosFiltrados = produtos.filter((p) => {
    const passaBusca = busca === "" || p.name.toLowerCase().includes(busca.toLowerCase());
    return passaBusca;
  });

  produtosFiltrados.sort((a, b) => {
    if (ordenacao === "Menor preço") return a.preco - b.preco;
    if (ordenacao === "Maior preço") return b.preco - a.preco;
    if (ordenacao === "Mais avaliados") return (b.avaliacao ?? 0) - (a.avaliacao ?? 0);
    return 0;
  });

  const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);
  const inicio = (paginaAtual - 1) * produtosPorPagina;
  const produtosPaginados = produtosFiltrados.slice(inicio, inicio + produtosPorPagina);

  const paginas: number[] = [];
  for (let i = 1; i <= totalPaginas; i++) paginas.push(i);

  const handleBusca = (termo: string) => {
    setBusca(termo);
    setPaginaAtual(1);
  };

  const selecionarSubcategoria = (id: number) => {
    setSubcategoriaSelecionada(id === subcategoriaSelecionada ? null : id);
  };

  const copiaParaPopulares = [...produtos].sort((a, b) => (b.avaliacao ?? 0) - (a.avaliacao ?? 0));
  const maisPopulares = copiaParaPopulares.slice(0, 5);
  const recemAdicionados = [...produtos].slice(-5).reverse();

  return (
    <div className="bg-[#F6F3E4] min-h-screen">

      <div className="h-[55vh] overflow-hidden">
        <div className="bg-black text-white flex items-center px-[15%] h-full relative">
          <h1 className="text-7xl font-black max-w-[70%] text-right capitalize">
            {nomeDecodificado}
          </h1>
          <img
            src="/img_categoria/pessoa_categoria.png"
            alt="pessoa"
            className="h-[140%] w-auto absolute left-[65%] bottom-[-50%]"
          />
        </div>
      </div>

      <div className="px-40 py-6">

        <div className="flex justify-end mb-3">
          <BarraPesquisa onSearch={handleBusca} placeholder="Procurar por..." />
        </div>

        <div className="flex items-center justify-end mb-6 flex-wrap gap-3">

          {subcategorias.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {subcategorias.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => selecionarSubcategoria(sub.id)}
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

          <select
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
            className="rounded-full px-6 py-2 text-base text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#6A38F3]"
          >
            <option value="">ordenar por</option>
            {ordenacoes.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        {carregando && (
          <p className="text-center text-gray-500 mt-10">Carregando produtos...</p>
        )}

        {!carregando && produtosPaginados.length > 0 && (
          <div className="grid grid-cols-5 gap-3 mb-8">
            {produtosPaginados.map((produto) => (
              <CardProduto key={produto.id} produto={produto} />
            ))}
          </div>
        )}

        {!carregando && produtosPaginados.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Nenhum produto encontrado nessa categoria.
          </p>
        )}

        {totalPaginas > 1 && (
          <div className="flex items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setPaginaAtual(paginaAtual - 1)}
              disabled={paginaAtual === 1}
              className="px-2 py-1 text-gray-500 hover:text-[#6A38F3] disabled:opacity-30"
            >
              {"<"}
            </button>

            {paginas.map((pagina) => (
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
              onClick={() => setPaginaAtual(paginaAtual + 1)}
              disabled={paginaAtual === totalPaginas}
              className="px-2 py-1 text-gray-500 hover:text-[#6A38F3] disabled:opacity-30"
            >
              {">"}
            </button>
          </div>
        )}

        {isLogged && (
          <div>

            {lojas.length > 0 && (
              <section className="mt-10 mb-10 bg-black rounded-2xl px-8 py-6">
                <h2 className="text-xl font-black text-white mb-4">Principais Lojas</h2>
                <div className="flex gap-6 flex-wrap">
                  {lojas.map((loja) => (
                    <Link href={`/loja/${loja.id}`} key={loja.id}>
                      <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                        <img
                          src={loja.logoUrl || "https://placehold.co/64x64/e5e7eb/9ca3af?text=Loja"}
                          alt={loja.nome}
                          className="w-16 h-16 rounded-full object-cover bg-white"
                        />
                        <p className="text-sm font-bold text-white">{loja.nome}</p>
                        {loja.descricao && (
                          <p className="text-xs text-[#6A38F3]">{loja.descricao}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {maisPopulares.length > 0 && (
              <section className="mt-10 mb-10">
                <h2 className="text-xl font-black text-gray-800 mb-4">Mais populares</h2>
                <div className="grid grid-cols-5 gap-3">
                  {maisPopulares.map((produto) => (
                    <CardProduto key={produto.id} produto={produto} />
                  ))}
                </div>
              </section>
            )}

            {recemAdicionados.length > 0 && (
              <section className="mt-10 mb-10">
                <h2 className="text-xl font-black text-gray-800 mb-4">Recém adicionados</h2>
                <div className="grid grid-cols-5 gap-3">
                  {recemAdicionados.map((produto) => (
                    <CardProduto key={produto.id} produto={produto} />
                  ))}
                </div>
              </section>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
