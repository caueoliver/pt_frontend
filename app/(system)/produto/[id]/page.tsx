"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getAvaliacoesProduto, getProdutoById } from "@/api/api.js"; 

// tipos 
interface ProductImage {
  id: string;
  url: string;
}

interface Review {
  id: number;
  comment: string;
  rating: number;
  user: {
    name: string;
    avatarUrl: string;
  };
}

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  rating: number;
  reviewsCount: number;
  category: string;
  availableQuantity: number;
  images: ProductImage[];
}

export default function Produto() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    async function loadPageData() {
      try {
        //busca produto
        const produto = await getProdutoById(productId);
        
        // busca avaliaçoes
        const avaliacoes = await getAvaliacoesProduto(productId);

        // Mapeia o produto do banco para o formato do seu front
        const productFormatado: Product = {
          id: String(produto.id),
          title: produto.name,
          price: produto.preco,
          description: produto.description,
          rating: produto.avaliacao || 4.5,
          reviewsCount: avaliacoes?.length || 0,
          category: produto.categoria?.name || "Geral",
          availableQuantity: produto.estoque,
          images: [{ id: "1", url: produto.imagemUrl || "/img_produtos/brownie.png" }]
        };

        setProduct(productFormatado);
        if (productFormatado.images.length > 0) setSelectedImage(productFormatado.images[0]);

        // formata avaliações
        const avaliacoesFormatadas = avaliacoes?.map((av: any) => ({
        id: av.id,
        comment: av.comentario,   
        user: {
        name: av.usuario?.name || "Usuário",
        avatarUrl: av.usuario?.profile_picture_url || "/img_logocjr/logo_cjr.png"  // ✅
        }
        })) || [];
        
        setReviews(avaliacoesFormatadas);

      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
        alert("Não foi possível carregar os dados reais, usando mock.");
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      loadPageData();
    }
  }, [productId]);

  if (loading) return <div className="h-screen flex items-center justify-center text-2xl">Carregando produto...</div>;
  if (!product) return <div className="h-screen flex items-center justify-center text-2xl text-red-500">Produto não encontrado</div>;

  return (
    <main className="min-h-screen bg-[#F6F3E4] pb-20">
      <div className="max-w-[1200px] mx-auto pt-10">
        
        {/* Seção Superior: Galeria e Detalhes */}
        <section className="flex gap-10">
          
          {/* Lado Esquerdo: Galeria de Imagens */}
          <div className="flex gap-6 w[60%]">
            
            <button onClick={() => window.history.back()} className="mt-4 h-fit cursor-pointer hover:opacity-70 transition">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.8} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div className="flex flex-col gap-4">
              {product.images?.map((img) => (
                <button 
                  key={img.id} 
                  onClick={() => setSelectedImage(img)}
                  className={`w-[100px] h-[100px] bg-white rounded-2xl overflow-hidden border-2 transition-all ${selectedImage?.id === img.id ? 'border-[#6A38F3]' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={img.url} alt="Miniatura" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="w-[600px] h-[700px] bg-white rounded-[40px] overflow-hidden shadow-sm flex items-center justify-center relative">
              {selectedImage && (
                <img src={selectedImage.url} alt={product.title} className="w-[80%] h-auto object-contain" />
              )}
              
              <img 
                src="/img_logocjr/logo_cjr.png" 
                alt="Logo CJR" 
                className="absolute top-6 right-6 w-16 h-16 rounded-full shadow-md object-contain bg-white" 
                />
            </div>
          </div>

          {/* Lado Direito: Informações do Produto */}
          <div className="w-1/2 flex flex-col pt-4">
            <div className="flex items-center justify-between">
              <h1 className="text-5xl font-medium text-black">{product.title}</h1>
            </div>
            
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
               <span className="text-yellow-400 text-lg">★</span> 
               <span className="text-base">{product.rating || "4.5"} | {product.reviewsCount || "15"} reviews</span>
               <span className="text-[#6A38F3] ml-2 text-base">{product.category || "mercado"}</span>
               <span className="text-[#6A38F3] ml-2 text-base">{product.availableQuantity || "3"} disponíveis</span>
            </div>

            <h2 className="text-5xl font-medium mt-6 text-black">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
            </h2>

            <div className="mt-10">
              <h3 className="text-lg font-bold border-b-2 border-gray-300 inline-block mb-2 text-black">Descrição</h3>
              <p className="text-base text-black whitespace-pre-line leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </section>

        {/* Seção Inferior: Avaliações */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold mb-8 text-black">Avaliações</h2>
          
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-lg">Nenhuma avaliação encontrada para este produto ainda.</p>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-4">
              {reviews.map((review) => (
                <div key={review.id} className="min-w-[500px] bg-white rounded-[30px] p-6 flex gap-6 shadow-sm">
                  
                  <img src={review.user.avatarUrl} alt={review.user.name} className="w-[80px] h-[80px] rounded-full object-cover" />
                  
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-medium text-black">{review.user.name}</h3>
                      
                      <div className="text-yellow-400 flex text-lg">
                         {Array.from({ length: 5 }).map((_, i) => (
                           <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                         ))}
                      </div>
                    </div>
                    
                    <p className="text-black mt-2 text-lg leading-snug">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}