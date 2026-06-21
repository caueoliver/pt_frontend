'use client'

import { useState, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';
import { getProdutosByLoja , getProdutosMelhoresByLoja,  getLojaById, getReviewsByLoja } from '@/api/api.js';
import { Carrossel } from '@/components/carrossel';
import { produtosMock, reviewsMock } from '@/mock/mockData';
import { Produto } from '@/interfaces/produtoCardInterface';
import { Loja } from '@/interfaces/lojaInterface';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'next/navigation';
import { CardProduto } from '@/components/cardProduto';
import { CardComentario } from '@/components/cardComentario';
import { GridProdutos } from '@/components/gridProdutos';
import { Review } from '@/interfaces/reviewInterface';
import { ModalEditarLoja } from '@/app/(system)/loja/[id]/modais/modalEditarLoja';
import { ModalCriarProduto } from '@/app/(system)/loja/[id]/modais/modalCriarProduto';





export default function TelaLoja() {
  const lojaMock: Loja  = {
    id: 1,
    nome: "Rare Beauty",
    categoria: "beleza",
    idDono: 1,
    nomeDono: "Selena Gomes",
    logoUrl: "/img_loja/rareBeauty_banner.png",
    bannerUrl: "/img_loja/rareBeauty_banner.png", 
    avaliacaoMedia: 5,
  };

  //puxa o id da loja pela url
  const { id } = useParams() as { id: string };
  //loja a ser exibida
  const[loja, setLoja] = useState<Loja>(lojaMock);

  //pegar produtos melhores avaliados
  const [melhoresAvaliados, setMelhoresAvaliados] = useState<Produto[]>(produtosMock);
  //todos os produtos da loja
  const [produtos, setProdutos] = useState<Produto[]>(produtosMock);
  //todas as avaliações da loja
  const [reviews, setReviews] = useState<Review[]>(reviewsMock);

  //verifica se o usuário logado é dono daquela loja
  const [isOwner, setIsOwner] = useState<boolean>(false);

  //exibe ou não o modal
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalCriarProdutoOpen, setIsModalCriarProdutoOpen] = useState(false);

  useEffect(() => {
      //retorna caso n tenha conseguido extrair o id
      if(!id) return;

      const buscar = async () =>{
        try{
          const [todosDb, melhoresDb, lojaDb, reviewsDb] = await Promise.all([
            getProdutosByLoja(id),
            getProdutosMelhoresByLoja(id),
            getLojaById(id),
            getReviewsByLoja(id),
          ]);
  
          setReviews(reviewsDb)
          setLoja(lojaDb);
          setProdutos(todosDb);
          setMelhoresAvaliados(melhoresDb);

  
        }catch(error){
          console.error("Erro ao conectar com o back:",error);
          setProdutos(produtosMock);
          setMelhoresAvaliados(produtosMock);
          setReviews(reviewsMock)

        }
      };
      buscar();
    }, [id]);

  const buscarDadosLoja = async () => {
    if(!id) return;

    try{
      const [lojaDb] = await Promise.all([
        getLojaById(id),
      ]);

      setLoja(lojaDb);
  

    } catch(error){
      console.error("Erro ao conectar com o back:",error);
    }
  };

  //função para pegar o id do usuário logado
  useEffect(() => {
    const token = localStorage.getItem('token'); 

    if (token) {
      
        //descriptografa o token 
        const payloadDecodificado = jwtDecode(token) as any; 
        //cria uma variavel de usuário logado com o payload "traduzido"
        const loggedUserId = payloadDecodificado.sub || payloadDecodificado.id;

        //testa se existe um usuário logado e se id bate com o do dono da loja
        if (loggedUserId && Number(loggedUserId) === loja.idDono) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }

    }
  }, [loja.idDono]);

  return (
    // fundo padrão da página 
    <div className="min-h-screen bg-[#F6F3E4]">
    
      <div className="relative w-full h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        
        {/* banner*/}
        <img 
          src={loja.bannerUrl} 
          alt={`Banner da loja ${loja.nome}`}
          className="absolute inset-0 w-full h-full object-cover"
        />


        {/* degrade do fundo */}
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/100 via-transparent to-transparent"></div>

       
        
         

          { isOwner && (
             <div className="absolute top-8 right-12 z-20 flex flex-col gap-3">
               {/* botão de editar loja */}
            <button 
              onClick={() => setIsModalEditOpen(true)}
              className="w-10 h-10 bg-[#6A38F3] rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <img 
                src="/img_loja/icone_editar.png" 
                alt="Editar Loja" 
                className="w-5 h-5 object-contain" 
              />
            </button>

            {/* botão de adicionar produto */}
            <button
              onClick={() => setIsModalCriarProdutoOpen(true)}
              className="w-10 h-10 bg-[#6A38F3] rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
              title="Adicionar Produto"
            >
              <img 
                src="/img_loja/icone_add.png" 
                alt="Adicionar Produto" 
                className="w-5 h-5 object-contain" 
              />
            </button>

          </div>   
          )}  
           
      

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

        
      {/* div para o carrossel de produtos mais bem avaliados */}
      <div className='overflow-hidden mx-[100]'>



        <div className='w-full flex flex-col gap-8 py-12'>
                    
          <Carrossel titulo="Produtos" subtitulo="melhores avaliados">
            {melhoresAvaliados.map((produto) => (
              <div key={produto.id} className="snap-start shrink-0">
                <CardProduto produto={produto} />
              </div>
            ))}
          </Carrossel>
        </div>


      </div>

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

        {/* link ver mais roxo a direita */}
        <div className="w-full px-[100]  flex justify-end mb-6">
          <Link href={`/loja/${id}/reviews`} className="text-[#9b72ff] hover:text-[#6A38F3] text-lg font-light transition-colors">
            ver mais
          </Link>
        </div>

        {/* carrossel de reviews*/}
        <div className="w-full px-[100] pb-12">
          <Carrossel>
            {reviews.map((review) => (
              <div key={review.id} className="snap-start shrink-0 mr-8">
                <CardComentario review={review} />
              </div>
            ))}
          </Carrossel>
        </div>
        

      </section>


      <div className='overflow-hidden mx-[100] '>

          {/* grid com todos os protudos da loja */}
          <div className='py-10 flex items-baseline gap-2'>
            <span className='text-black text-4xl font-bold'>Produtos</span>
            <span className='text-black text-xl font-medium'>
              de {loja.nome?.toLowerCase()}
            </span>
          </div>
            <GridProdutos produtos={produtos}/>



           
      </div>
      
      <ModalEditarLoja 
      isOpen={isModalEditOpen} 
      onClose={() => setIsModalEditOpen(false)} 
      loja={loja} 
      onAtualizar={buscarDadosLoja}
      />

      {isModalCriarProdutoOpen && (
        <ModalCriarProduto
          lojaId={Number(id)}
          onClose={() => setIsModalCriarProdutoOpen(false)}
        />
      )}
      
      
    </div>
      

  );
}