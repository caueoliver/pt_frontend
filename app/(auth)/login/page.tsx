'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link'; 
// importei um icone de olho e um icone com olho cortado
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { login } from '@/api/api.js';



export default function TelaLogin() {
  
  
  // setando memoria para o email e a senha usando um único objeto 'user'
  // user começa como uma pilha zerada 
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  // parte para ver o usuario clicou ou nao no icone da senha , flag
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const router = useRouter();


  const handleLogin = async (e: React.FormEvent<HTMLFormElement> ) => {
    // evita q a pagian recarrega
    e.preventDefault();
    
    // ver se o email ou a senha existe 
    if (!email || !senha) {
      return;
    }

    // integraçaõ
    try {
      setLoading(true); // Inicia o estado de carregamento
      
     const data = await login(email, senha); // chama a api
      
      localStorage.setItem('token', data.access_token); // salva o token do processo
      
      // 4. aguarda um tempo 
      setTimeout(() => {
        router.push('/');
      }, 0); 

    } catch (error: any) {
      // se der erro mostra a imagem 
      const message = error?.response?.data?.message || "Ocorreu um erro ao fazer login.";
      
      // verifica se a mensagem é um array e junta tudo, senão exibe a própria mensagem
      toast.error(
        Array.isArray(message) ? message.join(", ") : message
      );

    } finally {
      // encerra o loading 
      setLoading(false);
    }
  };
 

  return (
    // relativa se refere ao container principal 
    // min-h-screen garante que pegue a altura toda da tela
    // bg da cor bege
    // flex e justify-center centralizam a nossa "caixa delimitadora" no meio da tela
    <div className="relative min-h-screen bg-[#f4f2e9] flex justify-center items-center p-8">
      
      {/* Ajuste 2: Componente Toaster adicionado para exibir os pop-ups de erro/sucesso */}
      <Toaster position="top-right" />
        
      {/* ESTA É A MÁGICA: um container "wrapper" (caixa delimitadora)
          max-w-[1400px] impede que os elementos se afastem infinitamente.
          w-full garante que ocupe o espaço disponível.
          flex justify-between mantém as imagens na esquerda e o form na direita.
          dessa forma, o zoom do navegador escala junto como um bloco */}
      <div className="w-full max-w-[1400px] flex justify-between items-center gap-10">

        {/* container esquerdo para as imagens (relative a esta caixa, não à tela) */}
        <div className="relative w-[512px] h-[950px] hidden xl:block">
          
          {/* imagem do logo */}
          <img
            src="/img_login/logo_login.png"
            // compatilibidade  
            alt="logo.io" 
            // dimensoes da imagem
            width={421} 
            height={267} 
            // className absolute AGORA é relativo à div pai, não à tela solta.
            // deixei no top-0 para alinhar o topo.
            className="absolute top-0 left-0"
          />

          {/* imagem da pessoa */}
          <img 
            src="/img_login/pessoa_login.png" 
            // acessiblidade
            alt="pessoa.io" 
            // dimensoes da imagem
            width={512.55} 
            height={1118.5} 
            // absolute posicionado logo abaixo da logo o espaçamento
            className="absolute top-[280px] left-0"
          />
        </div>

        {/* aqui sera a imagem do quadrado preto (formulário do lado direito) */}
        {/* w- tamanho horizontal da imagem (mantido os seus 800px)
        back ground dela completamente preta 
        rounded - arrendondamento de 3l
        h-[950px] - altura exata
        flex - ativa o modo da caixa flexivel
        flex col - empilha os elementos um a baixo do outro 
        item-center - os itens vao se localizar no centro
        p-16 - mexe horizontalmente 
        shadow - da um sombra de 2xl de tam */}
        <div className="w-[800px] bg-black rounded-3xl h-[800px] flex flex-col items-center p-16 shadow-2xl">

         {/* cor do texto proxima ao bege , texto vai ter o tamanho de 50 px , font-black bom para titulos fica visualmente destacado,texto tem q estar no centro,multiplica o texto em 1,25,
         para dar um aspecto visual melhor , criar um margem de -60 px , diminiu o espaço entre as letras ,empurra o que vier depois para baixo (10)*/}
          <h1 className="text-[#f4f2e9] text-[50px] text-4xl font-black text-center scale-x-125 tracking-tighter mb-10">
              BEM VINDO DE VOLTA!
          </h1>

          {/* parte do formulario , onde o usuario vai digitar o email e a senha */}
          {/* tem q ocupar o tamanho maximo para o tam de pixel que no caso é 550 
            flex flex-co vai ser usado para criar os campos 
            empurrando o campo da senha e do email , esqueceu sua senha  entrar e nao possui cadastro 
            esse espaçamento sera de 8 com o gap-x
           */}
          {/* Ajuste 3: onSubmit posicionado corretamente e max-w corrigido */}
          <form className="w-full max-w-[550px] flex flex-col gap-8" onSubmit={handleLogin}>
            
            {/* input do email */}
            <input 
            // igual da video aula
            // tipo e mail
            // place holder -> mensagem q vai ficar esperando o usuario digitar 
              type="email" 
              placeholder="Email"
              // acessamos a propriedade de email dentro de user
              value={email}
              // tipo o scanf , toda vez q é pressionada ele guarda oq foi escrito
              onChange={(e) => setEmail(e.target.value )}
              // usando o tail wind para fazer o campo do email
              // w-full - faz o elemento ocupar 100% do conteiner q ele esta
              // bg da cor bege 
              // text-black -
              // arrendondado totalmente 
              // px e py empurra o texto dentro do campo
              // font-bold - a fonte ficar um pouco mais destacada
              // tamanho do text xl
              // cor do placeholder  
              className="w-full bg-[#f4f2e9] text-black rounded-full px-8 py-5 font-bold text-xl placeholder-gray-500 outline-none"
            />

            {/* parte da senha */}
            <div className="relative w-full">
              <input 
              // mesma estrutura do email , basta alterar apenas 
              // aqui fica a parte para converter a senha em caracteres de bolinhas
                type={mostrarSenha ? "text" : "password"} 
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-[#f4f2e9] text-black rounded-full px-8 py-5 font-bold text-xl placeholder-gray-500 outline-none"
              />
              
              {/* icone do olho aparecendo
              é um tipo absolute , mas preso a div da senha
              */}
              <div 
                className="absolute right-6 top-5 text-gray-500 cursor-pointer"
                // quando vc clicka no olho  , a minha flag vira V 
                onClick={() => setMostrarSenha(!mostrarSenha)} 
              >
                 {/* estrutura da minha condicional para o olho */}
                {mostrarSenha ? (
                  // se mostrarSenha for Verdadeiro (V), mostra o olho SEM a barra
                  <IoEyeOutline size={35} /> 
                ) : (
                  // se for Falso (escondido), mostra o olho COM a barra
                  <IoEyeOffOutline size={35} />
                )}
              </div>
            </div>

            {/* parte do esqueceu a senha q vai ser um botao clicavel
            cor do texto
            tamanho do texte 
            vai estar sublinhado
            hover - funciona para quando o usuario passar o mouse sob a mensagem ela fica de outra cor*/}
            <button className="text-white text-lg underline underline-offset-4 text-left">
              Esqueceu sua senha?
            </button>

            {/* bota entrar 
            ocupar o fundo todo
            cor azul 
            hover  
            caixa do texto branca 
            tipo da font seria mais "gordinha"
            tamanho da fonte texete-2xl
            todo arredondado
            py- posicionando de maneira cowrreta 
            type="submit" para mandar agora*/}
            <button  
            type="submit"
            className="w-full  bg-[#6A38F3] hover:bg-[#5a2ee0] transition-colors text-white font-black text-2xl rounded-full py-6">
              
              ENTRAR
            </button>

            {/* ultima parte do cadastro
            começa com um paragrafo
            centraliza o paragrafo 
            da o formato da letra
            tamanho do text
            margem de 4 
            */}
            <p className="text-center lg:text-left text-white text-lg font-bold mt-auto">
              Não possui uma conta?{" "}
              <Link href="/cadastro">
                <span className="text-[#6A38F3] font-black hover:underline cursor-pointer">
                Cadastre-se
                </span>
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
} 