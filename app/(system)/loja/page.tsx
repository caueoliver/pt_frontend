'use client'

import { useState, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CardProduto, Produto } from '@/components/cardProduto';
import { BarraPesquisa } from '@/components/barraPesquisa';
import { getProdutos, getLojas } from '@/api/api.js';




export default function TelaLoja() {
  const lojaMock = {
    nome: "Rare Beauty",
    categoria: "beleza",
    idDono: 1,
    dono: "Selena Gomez",
    bannerUrl: "/img_loja/rareBeauty_banner.png", 
    avaliacaoMedia: 5,
  };

  return (
    // fundo padrão da página 
    <div className="min-h-screen bg-[#F6F3E4]">
    
      <div className="relative w-full h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        
        {/* banner*/}
        <img 
          src={lojaMock.bannerUrl} 
          alt={`Banner da loja ${lojaMock.nome}`}
          className="absolute inset-0 w-full h-full object-cover"
        />


        {/* degrade do fundo */}
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/90 via-transparent to-transparent"></div>

        <div className="relative z-10 flex flex-col items-center">
          
          {/* nome da Loja */}
          <h1 className="text-6xl md:text-8xl font-medium text-white tracking-wide">
            {lojaMock.nome}
          </h1>

          {/* categoria e estrelas */}
          <div className="w-full flex justify-between items-center mt-2 px-2">
            
            {/* Categoria */}
            <span className="text-2xl text-gray-200 font-light lowercase">
              {lojaMock.categoria}
            </span>

            {/* coloca a quantidade de estrelas relativa a média da loja*/}
            <div className="flex gap-1 text-yellow-400 text-3xl">
              {"★".repeat(lojaMock.avaliacaoMedia)}
              {/* subtrai a media de estrelas de 5 e prenche o restante com um outro icone */}
              {"☆".repeat(5 - Math.floor(lojaMock.avaliacaoMedia))}
            </div>

          </div>
        </div>

        {/* link para o perfil do dono da loja*/}
        <Link href={`perfil/${lojaMock.idDono}`}>
        <div className="absolute bottom-8 right-12 z-10 text-white text-lg font-light">
          by <span className="underline decoration-1 underline-offset-4">{lojaMock.dono}</span>
        </div>
        </Link>
        
      </div>

      
      
    </div>
  );
}