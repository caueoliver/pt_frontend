'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CardProduto, Produto } from './cardProduto';

interface CarrosselProdutosProps {
  titulo: string;
  listaProdutos: Produto[];
}

export function CarrosselProduto({titulo, listaProdutos}: CarrosselProdutosProps){
    return(

        <div className='bg-[#F6F3E4] h-[370px]'>

            <h2 className='text-black font-bold'>
                Produtos
            </h2>
            <span className='text-black'> {titulo}</span>

            <div className="w-full flex gap-6 overflow-x-auto snap-x snap-mandatory px-12 pb-4 scrollbar-hide">
        
        {listaProdutos.map((item) => (
          <div key={item.id} className="snap-start shrink-0">
            <CardProduto produto={item} />
          </div>
        ))}

      </div>
        </div>

        
    );
}
