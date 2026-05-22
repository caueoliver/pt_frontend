'use client';
import Link from 'next/link';
import {useState, useEffect} from 'react';


export function NavBar(){
    //isLogged: variável para verficar se o usuário está logado
    //setIsLogged: função para alterar o valor de isLogged
    const [isLogged, setIsLogged] = useState(false);

    return(
        <nav className="w-full h-[60px] bg-[#000000] text-white  flex items-center justify-between relative z-50">
            
            <img
              src="/img_feed/logo_navBar.png"
              alt="pessoa da stock.io"
              className="h-full"/>

            <div>
                <Link href="/login">
                LOGIN
                </Link>  
            </div>

            <div>
                <Link href="/cadastro">
                CADASTRE-SE
                </Link>
            </div>
        </nav>


    );
}