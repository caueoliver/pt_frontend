'use client'
import { Loja } from '@/interfaces/lojaInterface';
import Link from 'next/link';

export function CardLoja({loja}: {loja: Loja}) {
    return (
        <div className='flex flex-col items-center p-4 w-[240px]'>
          
      
          <Link 
            href={`/loja/${loja.id}`} 
            className='relative w-48 h-48 rounded-full overflow-hidden block bg-white shrink-0'
          >
            <img 
    
              src={loja.logoUrl} 
              alt={loja.nome}
        
              className='absolute inset-0 w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300'
            />
          </Link>

          <div className='mt-4 flex flex-col justify-center items-center text-center'>
            <h3 className='text-2xl text-black font-medium'>{loja.nome}</h3>
            <span className='text-lg text-[#6A38F3] lowercase'>{loja.categoria}</span>
          </div>

        </div>
    );
}