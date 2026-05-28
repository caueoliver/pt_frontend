'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CardProduto, Produto } from '@/components/cardProduto';





export default function TelaFeed() {
  //estado para guardar produtos
    const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    // simulando a função do backend(ex: localhost:3001/produtos/mais-avaliados)
    const buscarProdutosDoBackend = async () => {

      const dadosMockados: Produto[] = [
        { id: 1, nome: "Brownie de Chocolate CJR", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"disponível", imagemUrl: "/img_feed/brownie.png" },
      ];
      
      setProdutos(dadosMockados);
    };

    buscarProdutosDoBackend();
  }, []);

    return (

      // div principal da página
      <div className="relative min-h-screen bg-[#F6F3E4]">  
          
        {/* div  para criar o bloco superior*/}
        <div className="flex items-end fixed left-[0] right-[0] top-[95] bg-[#000000] h-[450] items-center">
           
          {/*configurando uma div para ter um espaço entre o texto e a imagem*/}
          <div className='relative w-full h-full flex justify-between overflow-hidden'>

            <div className='pl-[10%] w-full h-full'>
              <h2 className="text-6xl font-black text-right fixed top-[22%]">
              Do CAOS à organização, <br />
              em alguns cliques 
              </h2>
            </div>
          
            <div className='w-full flex items-end pr-[10%]'>
              <img
              src="/img_feed/pessoa_feed.png"
              alt="pessoa stock.io"
              className="h-full object-cover"/>
            </div>
          
          </div>
        </div>
        <div className='fixed bottom-[50] right-[20]'>
        
        {produtos.map((item) => (
               <CardProduto key={item.id} produto={item}/>
          ))}
          
        </div>
        
          
      </div>
  );
} 
