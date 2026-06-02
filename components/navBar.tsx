'use client';
import Link from 'next/link';
import {useState, useEffect} from 'react';
import { usePathname } from 'next/navigation';


export function NavBar(){
    //isLogged: variável para verficar se o usuário está logado
    //setIsLogged: função para alterar o valor de isLogged
    const [isLogged, setIsLogged] = useState(false);


    //variável para rastrear a url atual
    const pathname = usePathname();


    useEffect(() => {
        //variável que busca o token no local storage
        const token = localStorage.getItem('token')
    
        //caso um token seja encontrado
        if (token){
            setIsLogged(true); //seta o isLogged como verdadeiro
        }
    })


    //função para fazer o logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLogged(false);
    };

    return(
        <nav className="w-full h-[95] bg-[#000000] text-white flex items-center justify-between relative  p-[10]">
            

            <div className='pl-[50] h-[45]'>
            <img
            
              src="/img_navBar/logo_navBar1.png"
              alt="logo stock.io"
              className="h-full"/>

            </div>
            
            { !isLogged ? (
                <>
                {/* se o usuario nao estiver logado, a navBar aparece assim: */}
            <div className='flex text-center items-center justify-between '>

                {/* botão de login */}
                <div className='font-semibold pr-10'>
                    <Link href="/login">
                    LOGIN
                    </Link>  
                </div>

                {/* botão de cadastro */}
                <div className='bg-[#6A38F3] font-semibold rounded-xl '>
                    <Link href="/cadastro"
                    className='px-[20]'>
                    CADASTRE-SE
                    </Link>
                </div>
            </div>

                </>
            ):(
                <>
                {/* se o usuario estiver logado, a navBar aparece assim: */}
            <div className='flex text-center items-center justify-between pr-[2%]'>



                {/* botão de perfil */}
                <div className='pr-10'>

                    {/* testa se o usuario está na página de perfil */}
                    {pathname === '/perfil'?(

                        // se estiver o icone aparece assim
                        <Link href="/perfil">
                            <img src="/img_navBar/perfilRoxo_navBar.png" 
                            alt="perfil" />
                        </Link>

                    ):(
                        // se não estiver aparece assim
                    <Link href="/login">
                    <img
                    src="/img_navBar/perfil_navBar.png"
                    alt='perfil'/>
                    </Link> 
                    )
                }

                     
                </div>

                {/* botão de deslogar */}
                <button onClick={handleLogout} className='w-8 h-8 hover:opacity-80 transition-opacity'>
                    <img src="/img_navBar/sair_navBar.png" alt="Sair" className="w-full h-full object-contain" /> 
                </button>
            </div>
                
                </>
            )}
            
            
        </nav>


    );
}