'use client'
import Link from 'next/link';
import { Categoria } from '@/interfaces/categoriaInteface';

const getIcone = (nome: string) => {
    const nomeFormatado = (nome || '').toLowerCase();
    const icones: Record<string, string> = {
      'mercado': '/img_feed/mercado.png',
      'farmácia': '/img_feed/farmacia.png',
      'beleza': '/img_feed/beleza.png',
      'moda': '/img_feed/moda.png',
      'eletrônicos': '/img_feed/eletronicos.png',
      'jogos': '/img_feed/jogos.png',
      'brinquedos': '/img_feed/brinquedos.png',
      'casa': '/img_feed/casa.png',
    };
    return icones[nomeFormatado] || '/img_feed/default.png'; // retorna padrão se não achar
  };

export function CardCategoria({categoria}:{categoria: Categoria}){
    const iconeSrc = getIcone(categoria.nome);
    
    
    return (
    <div className='mt-[10] mx-[10] overflow-hidden flex flex-col items-center bg-white rounded-4xl h-[145] w-[145] cursor-pointer hover:scale-105 transition-transform'>
      <div className='h-[60%] mt-[30] w-full flex items-end justify-center'>
        <Link href={`/categoria/${(categoria.nome || '').toLowerCase()}`} className='h-full flex justify-center'>
          <img 
            src={iconeSrc}
            alt={categoria.nome || 'Categoria'}
            className='h-full object-contain'
          />
        </Link>
      </div>
      <div className='h-[40%] flex items-center justify-center leading-tight pb-[10]'>
        <h3 className='font-semibold text-black'>{categoria.nome}</h3>
      </div>
    </div>
  );


}