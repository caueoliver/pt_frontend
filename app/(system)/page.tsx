'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CarrosselProduto } from '@/components/carrosselProduto'; 
import { CardProduto, Produto } from '@/components/cardProduto';
import { CarrosselGenerico } from '@/components/carrosselGanerico';
import { CardLoja, Loja } from '@/components/cardLoja';
import { CardCategoria, Categoria } from '@/components/cardCategoria';





export default function TelaFeed() {
  //estado para guardar produtos
    const [produtos, setProdutos] = useState<Produto[]>([]);
    

  useEffect(() => {
    // simulando a função do backend(ex: localhost:3001/produtos/mais-avaliados)
    const buscarProdutosDoBackend = async () => {

      const dadosMockados: Produto[] = [
        { id: 1, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"DISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 2, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"DISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 3, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"INDISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 4, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"DISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 5, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"INDISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 6, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"INDISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
      ];
      
      setProdutos(dadosMockados);
    };


    buscarProdutosDoBackend();
  }, []);

  const [lojas, setLojas] = useState<Loja[]>([]);

  useEffect(() => {

    const buscarLojas = async () => {
    const dadosMock: Loja[] = [ 
    {id: 1, nome: "CJR", categoria: "mercado", imagemUrl:"/img_feed/CJR.png"},
    {id: 2, nome: "CJR", categoria: "mercado", imagemUrl:"/img_feed/CJR.png"},
    {id: 3, nome: "CJR", categoria: "mercado", imagemUrl:"/img_feed/CJR.png"},
    {id: 4, nome: "CJR", categoria: "mercado", imagemUrl:"/img_feed/CJR.png"},
    {id: 5, nome: "CJR", categoria: "mercado", imagemUrl:"/img_feed/CJR.png"},
    ];

    setLojas(dadosMock);
  };

  buscarLojas();
  }, [])

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {

    const buscarCat = async () => {
    const dadosMock: Categoria[] = [ 
    {id: 1, nome: "mercado"},
    {id: 2, nome: "farmácia"},
    {id: 3, nome: "beleza"},
    {id: 4, nome: "jogos"},
    ];

    setCategorias(dadosMock);
  };

  buscarCat();
  }, [])


    return (

  // div principalda pag
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

    <div className='w-full flex flex-col gap-8 py-12 ml-20'>

      <CarrosselGenerico titulo="Categorias">
          {categorias.map((categoria) => (
             <div key={categoria.id} className="snap-start shrink-0">
               <CardCategoria categoria ={categoria} />
             </div>
          ))}
        </CarrosselGenerico>
    </div>

    {/* div para chamar o carrosselProduto */}
    <div className='w-full flex flex-col gap-8 py-12 ml-20'>

      {/* chama o carrossel com os produtos mais bem avaliados */}
      <CarrosselProduto 
        titulo="melhores avaliados" 
        listaProdutos={produtos} 
      />

    </div>


    <div className='w-full flex flex-col gap-8 py-12 ml-20'>

      {/* chama o carrossel com os produtos recem adicionados */}
      <CarrosselProduto 
        titulo="mais baratos" 
        listaProdutos={produtos} 
      />
    </div>
       
        
    

    <div className='w-full flex flex-col gap-8 py-12 ml-20'>

      {/* chama o carrossel com os produtos recem adicionados */}
      <CarrosselProduto 
        titulo="recém adicionados" 
        listaProdutos={produtos} 
      />
    </div>

    <div className='w-full flex flex-col gap-8 py-12 ml-20'>

      <CarrosselGenerico titulo="Lojas">
          {lojas.map((loja) => (
             <div key={loja.id} className="snap-start shrink-0">
               <CardLoja loja={loja} />
             </div>
          ))}
        </CarrosselGenerico>
    </div>

  </div>
);
        
} 
