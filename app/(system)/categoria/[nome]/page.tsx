'use client'

import { useState, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CardProduto, Produto } from '@/components/cardProduto';
import { getAllProdutos, getAllLojas } from '@/api/api.js';

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
  // pega o nome da categoria direto da URL
  const { nome } = useParams() as { nome: string };

  // listas do back
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [lojas, setLojas] = useState<Loja[]>([]);
  // mock temporario pra testar o visual — apagar quando conectar a API
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([
    { id: 1, nome: "Notebooks" },
    { id: 2, nome: "Smartphones" },
    { id: 3, nome: "Periféricos" },
  ]);

  // null é nenhuma subcategoria selecionada
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState<number | null>(null);

  // isso é sem ordrenação aplicada
  const [ordenacao, setOrdenacao] = useState("");

  // texto que digita na barra de pesquisa
  const [busca, setBusca] = useState("");

  // começa na pagina 1
  const [paginaAtual, setPaginaAtual] = useState(1);

  // true enquanto espera o backend responder pra mostrar o carregando...
  const [carregando, setCarregando] = useState(true);

  // controla se as secoes extras tipo lojas, populares, recem adicionados aparecem
  const [isLogged, setIsLogged] = useState(false);

  // quantos cards aparecem por pagina
  const produtosPorPagina = 10;

  // copia o array pra nao mexer no resultado e depois ordena por avaliacao
  const copiaParaPopulares = [...produtos];
  copiaParaPopulares.sort((a, b) => b.avaliacao - a.avaliacao);
  const maisPopulares = copiaParaPopulares.slice(0, 5);

  // pega os ultimos 5 e inverte pro mais recente ficar em primeiro
  const ultimos = produtos.slice(produtos.length - 5);
  const recemAdicionados = [...ultimos].reverse();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLogged(true);

    // useEffect nao pode ser async direto entao a funcao async fica dentro e ai é chamada depois
    const carregarDados = async () => {
      try {
        const dataProdutos = await getAllProdutos();
        setProdutos(dataProdutos);

        const dataLojas = await getAllLojas();
        setLojas(dataLojas);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, [nome]);

  // filtra por texto digitado
  const produtosFiltrados = produtos.filter((p) => {
    if (busca === "") return true;
    return p.nome.toLowerCase().includes(busca.toLowerCase());
  });

  // ordena depois de filtrar
  produtosFiltrados.sort((a, b) => {
    if (ordenacao === "Menor preço") return a.preco - b.preco;
    if (ordenacao === "Maior preço") return b.preco - a.preco;
    if (ordenacao === "Mais avaliados") return b.avaliacao - a.avaliacao;
    return 0;
  });

  // esse ceil arredonda pra cima pra nao perder produtos na ultima pagina
  const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);

  // corta so os produtos que cabem na pagina atual
  const inicio = (paginaAtual - 1) * produtosPorPagina;
  const fim = paginaAtual * produtosPorPagina;
  const produtosPaginados = produtosFiltrados.slice(inicio, fim);

  // gera 1, 2, 3, ... pra botar um botao por pagina
  const paginas: number[] = [];
  for (let i = 1; i <= totalPaginas; i++) {
    paginas.push(i);
  }

  // essa funcao roda quando o usuario digita na barra de pesquisa
  const handleBusca = (e: ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
    setPaginaAtual(1); // vc volta pra pagina 1 pra nao ficar numa pagina que nao existe mais
  };

  // clicar de novo na mesma subcategoria deseleciona (volta pra null)
  const selecionarSubcategoria = (id: number) => {
    if (id === subcategoriaSelecionada) {
      setSubcategoriaSelecionada(null);
    } else {
      setSubcategoriaSelecionada(id);
    }
  };

  return (
    <div className="bg-[#F6F3E4] min-h-screen">

      {/* banner da categoria */}
      <div className="h-[55vh] overflow-hidden">
        <div className="bg-black text-white flex items-center px-[15%] h-full relative">
          <h1 className="text-7xl font-black max-w-[70%] text-right">
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

        {/* substituir pelo componente <BarraPesquisa> quando estiver pronto */}
        <div className="flex justify-end mb-3">
          <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
            <input
              type="text"
              placeholder="Procurar por..."
              value={busca}
              onChange={handleBusca}
              className="bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 w-52"
            />
            <span className="text-gray-400 ml-2">🔍</span>
          </div>
        </div>

        {/* filtros de subcategoria e ordenação — alinhados à direita */}
        <div className="flex items-center justify-end mb-6 flex-wrap gap-3">

          {/* subcategorias, so aparece se tiver subcategorias cadastradas */}
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

          {/* ordenação */}
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

        {/* estado de carregando */}
        {carregando && (
          <p className="text-center text-gray-500 mt-10">Carregando produtos...</p>
        )}

        {/* grid de produtos */}
        {!carregando && produtosPaginados.length > 0 && (
          <div className="grid grid-cols-5 gap-3 mb-8">
            {produtosPaginados.map((produto) => (
              <CardProduto key={produto.id} produto={produto} />
            ))}
          </div>
        )}

        {/* mensagem quando nao tem produto */}
        {!carregando && produtosPaginados.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Nenhum produto encontrado nessa categoria.
          </p>
        )}

        {/* paginação (que so aparece se tiver mais de uma pagina */}
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

        {/* secoes exclusivas para usuarios logados */}
        {isLogged && (
          <div>

            {/* principais lojas */}
            {lojas.length > 0 && (
              <section className="mt-10 mb-10 bg-black rounded-2xl px-8 py-6">
                <h2 className="text-xl font-black text-white mb-4">Principais Lojas</h2>
                <div className="flex gap-6 flex-wrap">
                  {lojas.map((loja) => (
                    <Link href={`/loja/${loja.id}`} key={loja.id}>
                      <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                        <img
                          src={loja.logoUrl || "https://placehold.co/64x64/e5e7eb/9ca3af?text=Loja"} //esse placeholder vai ocupar o espaço se n tiver logo
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

            {/* mais populares */}
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

            {/* recem adicionados */}
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
