'use client'
import Link from 'next/link';

export interface Categoria {
  id: number;
  nome: string;
  icone: string;
}

function GetImagemUrl(categoria: Categoria) {
  // toLowerCase() para evitar conflitos 
  switch (categoria.nome.toLowerCase()) {
    case 'mercado':
        categoria.icone ='/img_feed/mercado.png'
        return 
    case 'farmácia':
        categoria.icone = '/img_feed/farmacia.png';
      return 
    case 'beleza':
        categoria.icone = '/img_feed/beleza.png';
      return 
    case 'moda':
        categoria.icone = '/img_feed/moda.png';
      return 
    case 'eletrônicos':
        categoria.icone = '/img_feed/eletronicos.png';
      return 
    case 'jogos':
        categoria.icone = '/img_feed/jogos.png';
      return 
    case 'brinquedos':
        categoria.icone = '/img_feed/brinquedos.png'; 
      return 
    case 'casa':
        categoria.icone = '/img_feed/casa.png';
      return   
  }
}

export function CardCategoria({categoria}:{categoria: Categoria}){
    GetImagemUrl(categoria);
    
    return(
        <div className='mt-[10] overflow-hidden flex flex-col items-center bg-white rounded-4xl h-[130] w-[130] cursor-pointer hover:scale-105 transition-transform'>
      <div className='h-[60%] mt-[30] w-full flex items-end justify-center'>
        <Link href={`/categoria/${categoria.id}`} className='h-full flex justify-center'>
        <img src={categoria.icone}
         alt={categoria.nome}
         className='h-full  object-contain'/>
        </Link>
        
      </div>

      <div className='h-[40%] flex items-center justify-center leading-tight pb-[10]'>
        <h3 className='font-semibold  text-black '>{categoria.nome}</h3>
        

      
      </div>

    </div>
    );


}