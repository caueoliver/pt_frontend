'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CardComentario } from '@/components/cardComentario';
import { getLojaById, getReviewsByLoja } from '@/api/api.js';
import { Loja } from '@/interfaces/lojaInterface';
import { reviewsMock } from '@/mock/mockData'; // Usando seu mock para testar
import { Review } from '@/interfaces/reviewInterface';

export default function TelaReviewsLoja() {

    const lojaMock: Loja  = {
    id: 1,
    nome: "Rare Beauty",
    categoria: "beleza",
    idDono: 1,
    nomeDono: "Selena Gomes",
    logoUrl: "/img_loja/rareBeauty_banner.png",
    bannerUrl: "/img_loja/rareBeauty_banner.png", 
    avaliacaoMedia: 5,
  }

  const { id } = useParams() as { id: string };
  const[loja, setLoja] = useState<Loja>(lojaMock);
  const [reviews, setReviews] = useState<Review[]>(reviewsMock);

  
  useEffect(() => {
    if (!id) return;

    const buscarDados = async () => {
      try {
        const [lojaDb,  reviewsDb] = await Promise.all([
            getLojaById(id),
            getReviewsByLoja(id),
            ]);
        
        setReviews(reviewsDb)
        setLoja(lojaDb);

      } catch (error) {
        console.error("Erro ao buscar loja:", error);
        setLoja(lojaMock)
      }
    };
    
    buscarDados();
  }, [id]);

  return (
    <div className="min-h-screen ">
      
        <div className="relative w-full h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">       
            {/* banner*/}
            <img 
            src={loja.bannerUrl} 
            alt={`Banner da loja ${loja.nome}`}
             className="absolute inset-0 w-full h-full object-cover"
            />


            {/* degrade do fundo */}
            <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/100 via-transparent to-transparent"></div>
      

                <div className="relative z-10 flex flex-col items-center">
          
                {/* nome da loja */}
                <h1 className="text-6xl md:text-8xl font-medium text-white tracking-wide">
                    {loja.nome}
                </h1>

                {/* categoria e estrelas */}
                <div className="w-full flex justify-between items-center mt-2 px-2">
            
                    {/* categoria */}
                    <span className="text-2xl text-gray-200 font-light lowercase">
                    {loja.categoria}
                    </span>

                    {/* coloca a quantidade de estrelas relativa a média da loja*/}
                    <div className="flex gap-1 text-yellow-400 text-3xl">
                    {"★".repeat(loja.avaliacaoMedia)}
                    {/* subtrai a media de estrelas de 5 e prenche o restante com um outro icone */}
                    {"☆".repeat(5 - Math.floor(loja.avaliacaoMedia))}
                    </div>

                </div>
            </div>

            {/* link para o perfil do dono da loja*/}
            <Link href={`/perfil/${loja.idDono}`}>
            <div className="absolute bottom-8 right-12 z-10 text-white text-lg font-light">
             by <span className="underline decoration-1 underline-offset-4">{loja.nomeDono}</span>
            </div>
            </Link>
        
        </div>

        {/* sessão inferior com os todos os comentarios referentes a loja */}
        <section className="bg-black w-full py-20 flex flex-col items-center">
        
            {/* cabeçalho*/}
            <h2 className="text-white text-4xl font-light mb-4">Reviews e Comentários</h2>
        
            {/* nota media */}
            <span className="text-white text-[5.5rem] leading-none font-medium">
            {loja?.avaliacaoMedia?.toFixed(2) || "4.75"}
            </span>
        
            {/* estrelas da loja */}
            <div className="text-yellow-400 text-5xl tracking-widest mt-6 mb-12">
            {"★".repeat(loja.avaliacaoMedia)}
            {"☆".repeat(5 - Math.floor(loja.avaliacaoMedia))}
            </div>


            {/*  lista de comentários na vertical */}
            <div className="w-full max-w-2xl flex flex-col gap-8 px-4 pb-20">
            {reviews.map((review) => (

            <div key={review.id} className="w-full flex justify-center">
                <CardComentario review={review} />
            </div>
            ))}

            {reviews.length === 0 && (
            <p className="text-gray-400 text-center text-lg font-light mt-10">
                Nenhuma avaliação encontrada para esta loja.
            </p>
            )}
            </div>
        </section>


    </div>
  );
}