'use client';
import Link from 'next/link';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  avaliacao: number;
  descricao: string;
  status: string;
  imagemUrl: string;
}

export function CardProduto({produto}: {produto: Produto}){
    return(
    <div className='overflow-hidden bg-white rounded-2xl  shadow-sm p-4 h-[310] w-[270]'>
      <div className='h-[70%] w-full'>
        <Link href={'/produto/${produto.id}'}>
        <img src={produto.imagemUrl}
         alt={produto.nome}
         className='h-full w-full'/>
        </Link>
        
      </div>

      <div className='h-full'>
      <h3 className='font_bold text-black'>{produto.nome}</h3>
      <span className='font-bold text-black'>R$ {produto.preco}0</span>
      <br />
      <span className='font-bold text-black'>{produto.status}</span>
      </div>

    </div>
    );
}
