'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CarrosselProduto } from '@/components/carrosselProduto'; 
import { CardProduto, Produto } from '@/components/cardProduto';
import { CarrosselGenerico } from '@/components/carrossel';
import { CardLoja, Loja } from '@/components/cardLoja';
import { CardCategoria, Categoria } from '@/components/cardCategoria';
import { FiltroLojas } from '@/components/filtroLoja';
import { BarraPesquisa } from '@/components/barraPesquisa';
import { getProdutosMaisBaratos, getProdutosRecentes, getProdutosMelhoresAvaliados, getAllProdutos, getAllLojas } from '@/api/api.js';
import {Categ_mock, Lojas_mock, Produtos_mock} from '@/mock/mockData'




export default function TelaFeed() {

  const [maisBaratos, setMaisBaratos] = useState<Produto[]>([]);
  const [recentes, setRecentes] = useState<Produto[]>([]);
  const [melhoresAvaliados, setMelhoresAvaliados] = useState<Produto[]>([]);

  const [lojas, setLojas] = useState<Loja[]>([]);

  const [produtos, setProdutos] = useState<Produto[]>([]);


// puxa os produtos pela função da api
  useEffect(() => {
    const buscarProdutos = async () =>{
      try{
        const [todosDb, baratosDb, recentesDb, melhoresDb] = await Promise.all([
          getAllProdutos(),
          getProdutosMaisBaratos(),
          getProdutosRecentes(),
          getProdutosMelhoresAvaliados() 
        ]);

        setProdutos(todosDb);
        setMaisBaratos(baratosDb);
        setRecentes(recentesDb);
        setMelhoresAvaliados(melhoresDb);

      }catch(error){
        console.error("Erro ao conectar com o back:",error);
        setProdutos(Produtos_mock);
        setMaisBaratos(Produtos_mock);
        setRecentes(Produtos_mock);
        setMelhoresAvaliados(Produtos_mock);
      }
    };
    buscarProdutos();
  }, []);

  useEffect(() => {
    const buscarLojas = async () =>{
      try{
        const[todasDb] = await Promise.all([
          getAllLojas(),
        ]);

        setLojas(todasDb);
      }catch(error){
        console.error("Erro", error);
        setLojas(Lojas_mock);
      }
    };
    buscarLojas
  }, []);

  //estado para guardar lojas
  const [lojasExibidas, setLojasExibidas] = useState(Lojas_mock);
  //estado para guardar categorias
  const [categorias, setCategorias] = useState(Categ_mock);

  const [produtosExibidos, setProdutosExibidos] = useState(produtos);

  const [termoBusca, setTermoBusca] = useState('');

//função para buscar utilizando a barra de pesquisa
const busca = (termo: string) => {
    // guarda a palavra digitada
    setTermoBusca(termo); 
    //converte pra letra minuscula pra evitar conflito
    const termoMin = termo.toLowerCase();

    //array que contem todas as lojas compatíveis com o que está sendo digitado
    const lojasFiltradas = lojasExibidas.filter(loja => 
      loja.nome.toLowerCase().includes(termoMin)
    );
    setLojasExibidas(lojasFiltradas);

    //array que contem todos os produtos compatíveis com o que está sendo digitado
    const produtosFiltrados = produtos.filter(produto => 
      produto.name.toLowerCase().includes(termoMin)
    );
    setProdutosExibidos(produtosFiltrados);
  };

  

  //função para o filtro de loja por categoria
  const aplicarFiltroDeLojas = (categoriasMarcadas: string[]) => {
    // se o usuário desmarcou tudo, exibe todas as lojas de novo
    if (categoriasMarcadas.length === 0) {
      setLojasExibidas(Lojas_mock);
    } else {
      // o .filter só deixa passar a loja se a categoria dela estiver dentro da lista de marcadas
      const lojasFiltradas = Lojas_mock.filter((loja) => 
        categoriasMarcadas.includes(loja.categoria)
      );
      setLojasExibidas(lojasFiltradas);
    }
  }


  return (
    
  // div principal da pag
  <div className="w-full min-h-screen bg-[#F6F3E4] flex flex-col">  
      
      {/* div do banner preto superior */}
    <div className="w-full h-[450px] bg-[#000000] flex items-center justify-between px-[10%] overflow-hidden shrink-0">
        
      {/* div para separar o texto e a imagem */}
      <div className='relative w-full h-full flex justify-between overflow-hidden'>

        <div className="w-[60%] text-white flex flex-col justify-center">
        {/* whitespace-nowrap faz com que não haja quebra de linha */}
          <h1 className="text-5xl lg:text-6xl text-right font-bold pb-[90] leading-tight tracking-wide whitespace-nowrap">
          Do CAOS à organização,<br />
          em alguns cliques
          </h1>
        </div>
      
        <div className=' h-[full] flex items-end justify-end pr-30'>
          <img
            src="/img_feed/pessoa_feed.png"
            alt="pessoa stock.io"
            className=""
          />
        </div>
      
      </div>
    </div>
    
    {/* div para o espaço inferior da pagina */}
    <div className=' overflow-hidden mx-[100]'>
      
      <div className='w-full py-8 mt-4 flex justify-end'>
        {/* chama a barra de pesquisa passando a função de busca */}
          <BarraPesquisa 
            onSearch={busca} 
            placeholder="Procurar por..." 
          />
      </div>

      {/* o visual da página depende do que o usuário digitar, caso ele digite alguma coisa serão exibidos apenas os resultados */}
      {termoBusca !== '' ? (
          
          <div className="w-full flex flex-col gap-12 py-4 animate-in fade-in duration-300 min-h-[400px]">
            
            {/* exibe o texto que está sendo buscado */}
            <h2 className="text-2xl text-purple-600 font-light px-12 border-l-4 border-purple-600 ml-12">
              Resultados para "{termoBusca}"
            </h2>

            {/* se não achar produtos ou lojas compatíveis ele exibe um texto de resultado não encontrado */}
            {lojasExibidas.length === 0 && produtosExibidos.length === 0 ? (
              <div className="text-center text-gray-500 py-10 w-full text-xl mt-10">
                Nenhum resultado encontrado. 
              </div>
            ) : (
              <>
              {/* testa se tem lojas compativeis e exibe elas*/}
                {lojasExibidas.length > 0 && (
                  <CarrosselGenerico titulo="Lojas Encontradas">
                    {lojasExibidas.map((loja) => (
                      <div key={loja.id} className="snap-start shrink-0">
                        <CardLoja loja={loja} />
                      </div>
                    ))}
                  </CarrosselGenerico>
                )}
                {/* testa se tem produtos compativeis e exibe eles */}
                {produtosExibidos.length > 0 && (
                  <CarrosselGenerico titulo="Produtos Encontrados">
                    {produtosExibidos.map((produto) => (
                      <div key={produto.id} className="snap-start shrink-0">
                        <CardProduto produto={produto} />
                      </div>
                    ))}
                  </CarrosselGenerico>
                )}
              </>
            )}
          </div>

        ) : (

          // se a barra de pesquisa estiver limpa a tela de feed padrão é exibida
          <div className="w-full flex flex-col animate-in fade-in duration-300">
            
            <div className='w-full flex flex-col gap-8 py-4'>
              <CarrosselGenerico titulo="Categorias">
                {categorias.map((categoria) => (
                  <div key={categoria.id} className="snap-start shrink-0">
                    <CardCategoria categoria={categoria} />
                  </div>
                ))}
              </CarrosselGenerico>
            </div>

            <div className='w-full flex flex-col gap-8 py-12'>
              <CarrosselProduto titulo="Melhores Avaliados" listaProdutos={melhoresAvaliados} />
            </div>

            <div className='w-full flex flex-col gap-8 py-12'>
              <CarrosselProduto titulo="Mais Baratos" listaProdutos={maisBaratos} />
            </div>

            <div className='w-full flex flex-col gap-8 py-12'>
              <CarrosselProduto titulo="Mais recentes" listaProdutos={recentes} />
            </div>

           {/* exibe um carrosel generico preenchido as lojas */}
            <div className='w-full flex flex-col gap-8 py-12'>

                {/* chama o filtro de lojas */}
              <div className='w-full flex justify-end pr-12'>
                <FiltroLojas onFiltroChange={aplicarFiltroDeLojas} />
              </div>
              

              <CarrosselGenerico titulo="Lojas">
                {lojasExibidas.map((loja) => (
                  <div key={loja.id} className="snap-start shrink-0">
                    <CardLoja loja={loja} />
                  </div>
                ))}
              </CarrosselGenerico>

            </div>

          </div>
        )}

    </div>

  </div>
);
        
} 
