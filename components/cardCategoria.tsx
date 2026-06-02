'use client'
import Link from 'next/link';

export interface Categoria {
  id: number;
  nome: string;
}

function GetImagemUrl(nome: string) {
  // toLowerCase() para evitar conflitos 
  switch (nome.toLowerCase()) {
    case 'mercado':
      return '/img_feed/mercado.png'; 
    case 'farmácia':
      return '/img_feed/farmacia.png';
    case 'beleza':
      return '/img_feed/beleza.png';
    case 'moda':
      return '/img_feed/moda.png';
    case 'eletrônicos':
      return '/img_feed/eletronicos.png';
    case 'jogos':
      return '/img_feed/jogos.png';
    case 'brinquedos':
      return '/img_feed/brinquedos.png'; 
    case 'casa':
      return '/img_feed/casa.png';  
  }
}

export function CardCategoria({categoria}:{categoria: Categoria}){
    const ImgURL = GetImagemUrl(categoria.nome);
    
    return(
        <div className='m-3 overflow-hidden flex flex-col items-center bg-white rounded-xl p-4 h-[120] w-[120] cursor-pointer hover:scale-105 transition-transform'>
      <div className='h-[60%]'>
        <Link href={`/categoria/${categoria.id}`}>
        <img src={ImgURL}
         alt={categoria.nome}
         className='h-full w-full object-contain '/>
        </Link>
        
      </div>

      <div className='h-full flex items-center justify-center pt-2'>
        <h3 className='font-semibold  text-black '>{categoria.nome}</h3>
        

      
      </div>

    </div>
    );


}