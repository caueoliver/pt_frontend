'use client';
import { ReactNode } from 'react';

// reactNode é qualquer coisa que o React consiga renderizar na tela
interface CarrosselProps {
  //as interrogações fazem com que as propriedades não sejam obrigatórias
  titulo?: string;
  subtitulo?: string;
  children: ReactNode; 
}

export function Carrossel({ titulo, subtitulo, children }: CarrosselProps) {
  return (
    <div className='w-full flex flex-col shrink-0'>
      
      {/* só  printa o titulo se a propriedade 'titulo' for enviada */}
      {titulo && (
        <div className='mb-4'>
          <span className='text-black text-4xl font-bold'>{titulo}</span>
          
          {/* só printa o subtitulo apenas se a propriedade 'subtitulo' for enviada */}
          {subtitulo && (
           <span className='text-[#6A38F3] text-x font-bold ml-2'>{subtitulo}</span>
          )}
        </div>
      )}

      {/* A área de rolagem dos cards */}
      <div className="w-full flex gap-15 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
        {children}
      </div>

    </div>
  );
}