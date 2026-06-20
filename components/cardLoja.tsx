'use cliente'
import { Loja } from '@/interfaces/lojaInterface';
import Link from 'next/link';



export function CardLoja({loja}:{loja: Loja}){
    return(
        <div className='overflow-hidden flex flex-col items-center p-4 h-[310] w-[240]'>
      <div className='h-[70%]'>
        <Link href={`/loja/${loja.id}`}>
        <img src={loja.logoUrl}
         alt={loja.nome}
         className='h-full object-contain cursor-pointer hover:scale-110 transition-transform'/>
        </Link>
        
      </div>

      <div className='h-full flex flex-col justify-center items-center'>
        <h3 className=' text-xl text-black'>{loja.nome}</h3>
        <span className=' text-xl text-[#6A38F3]'>{loja.categoria}</span>
        <br />
        

      
      </div>

    </div>
    );


}