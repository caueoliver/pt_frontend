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



const Produtos_mock: Produto[] = [
        { id: 1, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"DISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 2, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"DISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 3, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"INDISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 4, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"DISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 5, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"INDISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 6, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"INDISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 7, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"DISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 8, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"INDISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },  
        { id: 9, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"DISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 10, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"INDISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
      ];

const LOJAS_MOCK = [
    {id: 1, nome: "CJR", categoria: "mercado", imagemUrl:"/img_feed/CJR.png"},
    {id: 2, nome: "CJR", categoria: "moda", imagemUrl:"/img_feed/CJR.png"},
    {id: 3, nome: "CJR", categoria: "beleza", imagemUrl:"/img_feed/CJR.png"},
    {id: 4, nome: "CJR", categoria: "eletrônicos", imagemUrl:"/img_feed/CJR.png"},
    {id: 5, nome: "CJR", categoria: "mercado", imagemUrl:"/img_feed/CJR.png"},
    
];

const Cat_Mock: Categoria[] = [ 
    {id: 1, nome: "Mercado", icone:'null'},
    {id: 2, nome: "Farmácia", icone: 'null'},
    {id: 3, nome: "Beleza", icone: 'null'},
    {id: 4, nome: "Moda", icone: 'null'},
    {id: 5, nome: "Eletrônicos", icone: 'null'},
    {id: 6, nome: "Jogos", icone: 'null'},
    {id: 7, nome: "Brinquedos", icone: 'null'},
    {id: 8, nome: "Casa", icone: 'null'},

    ];

export default function TelaFeed() {
  //estado para guardar produtos
    const [produtos, setProdutos] = useState(Produtos_mock);
  //estado para guardar lojas
    const [lojasExibidas, setLojasExibidas] = useState(LOJAS_MOCK);
  //estado para guardar categorias
    const [categorias, setCategorias] = useState(Cat_Mock);

  const [produtosExibidos, setProdutosExibidos] = useState(Produtos_mock);

  const [termoBusca, setTermoBusca] = useState('');

//função para buscar utilizando a barra de pesquisa
const busca = (termo: string) => {
    // guarda a palavra digitada
    setTermoBusca(termo); 
    //converte pra letra minuscula pra evitar conflito
    const termoMin = termo.toLowerCase();

    //array que contem todas as lojas compatíveis com o que está sendo digitado
    const lojasFiltradas = LOJAS_MOCK.filter(loja => 
      loja.nome.toLowerCase().includes(termoMin)
    );
    setLojasExibidas(lojasFiltradas);

    //array que contem todos os produtos compatíveis com o que está sendo digitado
    const produtosFiltrados = Produtos_mock.filter(produto => 
      produto.nome.toLowerCase().includes(termoMin)
    );
    setProdutosExibidos(produtosFiltrados);
  };

  

  //função para o filtro de loja por categoria
  const aplicarFiltroDeLojas = (categoriasMarcadas: string[]) => {
    // se o usuário desmarcou tudo, exibe todas as lojas de novo
    if (categoriasMarcadas.length === 0) {
      setLojasExibidas(LOJAS_MOCK);
    } else {
      // o .filter só deixa passar a loja se a categoria dela estiver dentro da lista de marcadas
      const lojasFiltradas = LOJAS_MOCK.filter((loja) => 
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

        {/* texto */}
        <div className='w-1/2 flex flex-col justify-center'>
          <h2 className="text-6xl font-black text-white leading-tight">
            Do CAOS à organização, <br />
            em alguns cliques 
          </h2>
        </div>
      
        {/* imagem */}
        <div className='w-1/2 h-full flex items-end justify-end'>
          <img
            src="/img_feed/pessoa_feed.png"
            alt="pessoa stock.io"
            className="h-full object-contain"
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
              <CarrosselProduto titulo="Melhores Avaliados" listaProdutos={Produtos_mock} />
            </div>

            <div className='w-full flex flex-col gap-8 py-12'>
              <CarrosselProduto titulo="Mais Baratos" listaProdutos={Produtos_mock} />
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
