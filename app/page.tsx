import Image from 'next/image';
import Link from 'next/link';


export default function TelaFeed() {
    return (

      // div principal da página
      <div className="relative min-h-screen bg-[#F6F3E4]">  
          
        {/* div  para criar o bloco superior*/}
          <div className="fixed left-[0] right-[0] top-[0] bottom-[50%] bg-[#171918]  items-center pl-[5%] pr-[5%] pt-[3%] pb-[3%] shadow-2xl  ">
           <div>
            {/* redirecionamento temporario antes da implementação da nav bar */}
            <p className="text-left text-white text-lg font-bold pt-5">
              <Link href="/login">
                <span className="text-[#6A38F3] font-black hover:underline cursor-pointer">
                  login
                </span>
              </Link>
            </p>

            <p className="text-left text-white text-lg font-bold ">
              <Link href="/cadastro">
                <span className="text-[#6A38F3] font-black hover:underline cursor-pointer">
                  cadastro
                </span>
              </Link>
            </p>
           </div>
           
           
          <div className='flex justify-between overflow-hidden '>

            <div>
              <h2 className="text-5xl font-black">
              Do CAOS à organização, <br />
              em alguns cliques
              </h2>
            </div>
          
            <div>
              <img
              src="/img_feed/pessoa_feed.png"
              alt="pessoa da stock.io"
              width={497}
              height={1129}
              />
            </div>
          
          </div>
          
            
          
          
            

          </div>

          
      </div>
  );
} 
