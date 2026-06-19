'use client';
import { Produto } from '@/interfaces/produtoInterface';
import Link from 'next/link';


export function CardProduto({produto}: {produto: Produto}){
    return(
    <div className=' object-contain cursor-pointer hover:scale-110 transition-transform overflow-hidden bg-white rounded-2xl shadow-sm p-4 h-[310] w-[240]'>
      <div className='h-[60%]'>
        <Link href={`/produto/${produto.id}`}>
        <img src={produto.imagemUrl}
         alt={produto.name}
         className='h-full w-full'/>
        </Link>
        
      </div>

      <div className='h-full'>
        <h3 className='font-bold text-2xl text-black'>{produto.name}</h3>
        <span className='font-bold text-xl text-black'>R${produto.preco.toFixed(2).replace('.', ',')}</span>
        <br />
        {produto.estoque  === 0?(
          <span className='text-[#AF052A] text-sm font-semibold'>INDISPONÍVEL</span>
          ):(
          <span className='text-[#C6E700] text-sm font-semibold'>DISPONÍVEL</span>     
          )
        }

      
      </div>

    </div>
    );
}


