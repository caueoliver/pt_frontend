'use client';
import Link from 'next/link';
import {useState, useEffect} from 'react';


export function NavBar(){
    //isLogged: variável para verficar se o usuário está logado
    //setIsLogged: função para alterar o valor de isLogged
    const [isLogged, setIsLogged] = useState(false);

    return(
        <nav className="w-full h-[95] bg-[#000000] text-white flex items-center justify-between relative  p-[10]">
            

            <div className='pl-[50] h-[45]'>
            <img
            
              src="/img_feed/logo_navBar1.png"
              alt="logo stock.io"
              className="h-full"/>

            </div>
            

            <div className='flex items-center justify-between '>

                <div className='pr-10'>
                    <Link href="/login">
                    LOGIN
                    </Link>  
                </div>

                <div className='pr-10 bg-[#6A38F3] rounded-xl'>
                    <Link href="/cadastro">
                    CADASTRE-SE
                    </Link>
                </div>
            </div>
            
        </nav>


    );
}