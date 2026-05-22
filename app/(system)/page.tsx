import Image from 'next/image';
import Link from 'next/link';


export default function TelaFeed() {
    return (

      // div principal da página
      <div className="relative min-h-screen bg-[#F6F3E4]">  
          
        {/* div  para criar o bloco superior*/}
          <div className=" flex items-end fixed left-[0] right-[0] top-[0] bottom-[30%] bg-[#000000]  items-center pl-[5%] pr-[5%] pt-[3%]  ">
           
          {/*configurando uma div para ter um espaço entre o texto e a imagem*/}
          <div className='w-full flex justify-between overflow-hidden w-full h-[600px]'>

            <div>
              <h2 className="text-6xl font-black text-right fixed top-[25%]">
              Do CAOS à organização, <br />
              em alguns cliques
              </h2>
            </div>
          
            <div className='h-full flex items-end pr-[10%] '>
              <img
              src="/img_feed/pessoa_feed.png"
              alt="logo stock.io"
              className="h-full"/>
            </div>
          
          </div>
          
            
          
          
            

          </div>

          
      </div>
  );
} 
