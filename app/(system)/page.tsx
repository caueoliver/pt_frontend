import Image from 'next/image';
import Link from 'next/link';


export default function TelaFeed() {
    return (

      // div principal da página
      <div className="relative min-h-screen bg-[#F6F3E4]">  
          
        {/* div  para criar o bloco superior*/}
        <div className="flex items-end fixed left-[0] right-[0] top-[95] bg-[#000000] h-[450] items-center">
           
          {/*configurando uma div para ter um espaço entre o texto e a imagem*/}
          <div className='relative w-full h-full flex justify-between overflow-hidden'>

            <div className='pl-[10%] w-full h-full'>
              <h2 className="text-6xl font-black text-right fixed top-[25%]">
              Do CAOS à organização, <br />
              em alguns cliques 
              </h2>
            </div>
          
            <div className='w-full flex items-end pr-[10%]'>
              <img
              src="/img_feed/pessoa_feed.png"
              alt="pessoa stock.io"
              className="h-full object-cover"/>
            </div>
          
          </div>
          
            
          
          
            

        </div>

          
      </div>
  );
} 
