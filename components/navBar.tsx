'use client';
import Link from 'next/link';
import {useState, useEffect} from 'react';
import { usePathname } from 'next/navigation';


export function NavBar(){
    //isLogged: variável para verficar se o usuário está logado
    //setIsLogged: função para alterar o valor de isLogged
    const [isLogged, setIsLogged] = useState(false);
    const [userId, setUserId] = useState(null);


    //variável para rastrear a url atual
    const pathname = usePathname();


    useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsLogged(true);
      
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // pega o id do token
        setUserId(payload.sub || payload.id); 
      } catch (error) {
        console.error("Erro ao ler o token:", error);
      }
    }
  }, []);


    //função para fazer o logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLogged(false);
    };

    return(
        <nav className="w-full h-[95] bg-[#000000] text-white flex items-center justify-between relative  p-[10]">
            

            <div className='pl-[50] h-[45]'>
            <Link href="/">
            <img
            
              src="/img_navBar/logo_navBar.png"
              alt="logo stock.io"
              className="h-full"/>
            </Link>
            
            </div>
            
            { !isLogged ? (
                <>
                {/* se o usuario nao estiver logado, a navBar aparece assim: */}
            <div className='flex text-center items-center justify-between '>

                {/* botão de login */}
                <div className='font-semibold pr-10'>
                    <Link href="/login">
                    <button className="font-bold text-white hover:text-[#6A38F3] active:text-[#6A38F3] 
                    transition-colors duration-300">
                    LOGIN
                    </button> 
                    </Link>
                    
                </div>

                {/* botão de cadastro */}
                <div className='font-semibold pr-10'>
                    <Link href="/cadastro">
                    <button className="font-bold px-6 py-2 rounded-full bg-[#6A38F3] text-white hover:bg-white hover:text-[#6A38F3] 
                    active:scale-95 active:bg-gray-200 transition-all duration-300">
                    CADASTRE-SE
                    </button> 
                    </Link>

                    
                    
                </div>
            </div>

                </>
            ):(
                <>
                {/* se o usuario estiver logado, a navBar aparece assim: */}
            <div className='flex text-center items-center justify-between pr-[2%]'>



                {/* botão de perfil */}
                <div className='pr-10 pt-2'>

                    {/* testa se o usuario está na página de perfil */}
                    {pathname === '/perfil'?(

                        // se estiver o icone aparece assim
                        <Link href="/perfil"className=" w-8 h-8">
                            <img src="/img_navBar/perfilRoxo_navBar.png" 
                            alt="perfil" />
                        </Link>

                    ):(
                        // se não estiver aparece assim
                    <Link href={userId ? `/perfil/${userId}` : '/login'} >
                        <button className="group relative w-8 h-8 active:scale-90 transition-transform">
                
                            <img 
                            src="/img_navBar/perfil_navBar.png" 
                            alt="Perfil" 
                            className="absolute object-contain inset-0 w-full h-full transition-opacity duration-300 group-hover:opacity-0"
                            />

                    
                            <img 
                            src="/img_navBar/perfilRoxo_navBar.png" 
                            alt="Perfil Hover" 
                            className="absolute object-contain inset-0 w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            />
                            </button>
                    </Link> 
                    )
                }

                     
                </div>

                {/* botão de deslogar */}
                <button onClick={handleLogout} className='w-8 h-8 group relative active:scale-90 transition-transform'> 
                    
                    <img 
                    src="/img_navBar/sair_navBar.png" 
                    alt="Sair" 
                    className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                    />

                    <img 
                    src="/img_navBar/sairVermelho_navBar.png" 
                    alt="Sair " 
                    className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                </button>

            </div>
                
                </>
            )}
            
            
        </nav>


    );
}