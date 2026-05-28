'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CarrosselProduto } from '@/components/carrosselProduto'; 
import { CardProduto, Produto } from '@/components/cardProduto';





export default function TelaFeed() {
  //estado para guardar produtos
    const [produtos, setProdutos] = useState<Produto[]>([]);
    

  useEffect(() => {
    // simulando a função do backend(ex: localhost:3001/produtos/mais-avaliados)
    const buscarProdutosDoBackend = async () => {

      const dadosMockados: Produto[] = [
        { id: 1, nome: "Brownie de Chocolate CJR", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"disponível", imagemUrl: "/img_feed/brownie.png" },
        { id: 2, nome: "Brownie de Chocolate CJR", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"disponível", imagemUrl: "/img_feed/brownie.png" },
        { id: 3, nome: "Brownie de Chocolate CJR", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"disponível", imagemUrl: "/img_feed/brownie.png" },
        { id: 4, nome: "Brownie de Chocolate CJR", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"disponível", imagemUrl: "/img_feed/brownie.png" },
        { id: 5, nome: "Brownie de Chocolate CJR", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"disponível", imagemUrl: "/img_feed/brownie.png" },
        { id: 6, nome: "Brownie de Chocolate CJR", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"disponível", imagemUrl: "/img_feed/brownie.png" },
        { id: 7, nome: "Brownie de Chocolate CJR", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"disponível", imagemUrl: "/img_feed/brownie.png" },
        { id: 8, nome: "Brownie de Chocolate CJR", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"disponível", imagemUrl: "/img_feed/brownie.png" },
        { id: 9, nome: "Brownie de Chocolate CJR", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"disponível", imagemUrl: "/img_feed/brownie.png" },
        { id: 10, nome: "Brownie de Chocolate CJR", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"disponível", imagemUrl: "/img_feed/brownie.png" },
      ];
      
      setProdutos(dadosMockados);
    };

    buscarProdutosDoBackend();
  }, []);

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


    {/* div para chamar o carrosselProduto */}
    <div className='w-full flex flex-col gap-8 py-12 ml-20'>

      {/* chama o carrossel com os produtos mais bem avaliados */}
      <CarrosselProduto 
        titulo="Mais bem avaliados" 
        listaProdutos={produtos} 
      />

    </div>


    <div className='w-full flex flex-col gap-8 py-12 ml-20'>

      {/* chama o carrossel com os produtos recem adicionados */}
      <CarrosselProduto 
        titulo="Recém adicionados" 
        listaProdutos={produtos} 
      />
    </div>

  </div>
);
        
} 
