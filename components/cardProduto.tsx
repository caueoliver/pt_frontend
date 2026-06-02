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
    <div className=' object-contain cursor-pointer hover:scale-110 transition-transform overflow-hidden bg-white rounded-2xl shadow-sm p-4 h-[310] w-[240]'>
      <div className='h-[60%]'>
        <Link href={`/produto/${produto.id}`}>
        <img src={produto.imagemUrl}
         alt={produto.nome}
         className='h-full w-full'/>
        </Link>
        
      </div>

      <div className='h-full'>
        <h3 className='font-bold text-2xl text-black'>{produto.nome}</h3>
        <span className='font-bold text-xl text-black'>R${produto.preco.toFixed(2).replace('.', ',')}</span>
        <br />
        {produto.status === 'DISPONÍVEL'?(
          <span className='text-[#C6E700] text-sm font-semibold'>{produto.status}</span>
          ):(
          <span className='text-[#AF052A] text-sm font-semibold'>{produto.status}</span>     
          )
        }

      
      </div>

    </div>
    );
}
