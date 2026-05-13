'use client'

import { ChangeEvent, FormEvent, useState } from 'react';
import Link from 'next/link'; 
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"; 
import { useRouter } from 'next/navigation';
import { register } from '@/api/api.js';

// formato do fomulario (tudo string)
type CadastroForm = {
  nomeCompleto: string;
  username: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

// o Partial fala que nem todos os campos precisam existir ao mesmo tempo. serve pra parte de erros, pq tem campo que tem erro e tem campo que não tem
type Erros = Partial<CadastroForm>;

export default function TelaCadastro() {

  // faz o redirecionamento
  const router = useRouter();

  // guarda os valores de cada campo e começa vazio
  const [form, setForm] = useState<CadastroForm>({
    nomeCompleto: "",
    username: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  // guarda as mensagens de erro de cada campo e começa vazio tbm 
  const [erros, setErros] = useState<Erros>({});

  // ver se o usuario clicou no olho da senha
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // mesma coisa mas pro campo de confirmar senha
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  // essa funcao roda toda vez que o usuario digita em qualquer campo
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // pego o nome e o valor do input que foi digitado

    setForm((prev) => ({ ...prev, [name]: value })); // atualiza só o campo que foi digitado
    setErros((prev) => ({ ...prev, [name]: "" })); // limpa o erro desse campo quando digitado alguma coisa nele
  };

  // essa funcao ve se tudo foi preenchido certo. ai se tiver tudo ok retorna true se não retorna false
  

    return (
      <div className="relative min-h-screen bg-[#F6F3E4]">

        {/* PESSOA */}
        <img
          src="/img_cadastro/pessoa_cadastro.png"
          alt="pessoa da stock.io"
          width={497}
          height={1129}
          className="fixed right-[4.58%] top-[21.68%] w-[25vw] h-auto"
        />

        {/* LOGO */}
        <img
          src="/img_cadastro/logo_cadastro.png"
          alt="logo da stock.io"
          width={421}
          height={267}
          className="fixed right-[7.29%] top-[3%] w-[18vw] h-auto"
        />

        

            
          <div className="fixed left-[30%] right-[30%] top-[20%] bottom-[20%] bg-[#171918] rounded-4xl  items-center pl-[5%] pr-[5%] pt-[3%] pb-[3%] shadow-2xl overflow-y-auto card-scroll">
            <h2 className="text-7xl">
              protótipo tela feed
            </h2>
            
            <p className="text-left text-white text-lg font-bold pl-[27%] pt-[10%]">
              redirecionamento tela login{" "}
              <Link href="/login">
                <span className="text-[#6A38F3] font-black hover:underline cursor-pointer">
                  login
                </span>
              </Link>
            </p>

            <p className="text-left text-white text-lg font-bold pl-[20%] pt-[10%]">
              redirecionamento tela cadastro{" "}
              <Link href="/cadastro">
                <span className="text-[#6A38F3] font-black hover:underline cursor-pointer">
                  cadastro
                </span>
              </Link>
            </p>

            </div>

          
      </div>
  );
}