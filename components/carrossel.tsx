'use client';
import { ReactNode } from 'react';

// reactNode é qualquer coisa que o React consiga renderizar na tela
interface CarrosselGenericoProps {
  titulo: string;
  children: ReactNode; 
}

export function CarrosselGenerico({ titulo, children }: CarrosselGenericoProps) {
  return (
    //ao inves de definir uma altura fix, esse carrossel se ajusta ao elemento que vai ser renderizado
    <div className='w-full flex flex-col shrink-0'>
      
      <h2 className=' text-black font-bold mb-4 text-4xl'>
    {titulo}
      </h2>


      <div className="w-full flex gap-18 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
        {/* renderiza qualquer coisa que vier como parametro */}
        {children}
      </div>

    </div>
  );
}