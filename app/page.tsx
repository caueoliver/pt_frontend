'use client'

import { useState } from 'react';
import Link from 'next/link'; 
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"; 
import { useRouter } from 'next/navigation';

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // pego o nome e o valor do input que foi digitado

    setForm((prev) => ({ ...prev, [name]: value })); // atualiza só o campo que foi digitado
    setErros((prev) => ({ ...prev, [name]: "" })); // limpa o erro desse campo quando digitado alguma coisa nele
  };

  // essa funcao ve se tudo foi preenchido certo. ai se tiver tudo ok retorna true se não retorna false
  const validar = (): boolean => {
    const novosErros: Erros = {}; //objeto vazio pra ir guardando os erros

    if (!form.nomeCompleto.trim())
      novosErros.nomeCompleto = "Nome completo é obrigatório."; // trim() tira espaço

    if (!form.username.trim())
      novosErros.username = "Username é obrigatório.";

    if (!form.email.trim()) {
      novosErros.email = "Email é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      novosErros.email = "Email inválido."; // essa massaroca é pra bater o formato de email
    }

    if (!form.senha) {
      novosErros.senha = "Senha é obrigatória.";
    } else if (form.senha.length < 6) {
      novosErros.senha = "A senha deve ter pelo menos 6 caracteres."; //ve o tamanho da senha (nao sei se vai precisar)
    }

    if (!form.confirmarSenha) {
      novosErros.confirmarSenha = "Confirme sua senha.";
    } else if (form.senha !== form.confirmarSenha) {
      novosErros.confirmarSenha = "As senhas não coincidem."; //ve se as senhas são iguais
    }

    setErros(novosErros); // salva os erros
    return Object.keys(novosErros).length === 0; //se tiver sem erro retorna true
  };

  // essa funcao roda quando o usuario clica em "CRIAR CONTA"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // não deixa a pagina recarregar quando clica no notão
    if (!validar()) return; // se tiver erro o codigo morre nessa parte
    router.push('/login') //se passar pela de cima redireciona 

    // chamar API aqui chamar API aqui chamar API aqui chamar API aqui chamar API aqui chamar API aqui chamar API aqui chamar API aqui chamar API aqui chamar API aqui chamar API aqui chamar API aqui
  };

return (
    <div className="relative min-h-screen bg-[#F6F3E4]">

      {/* PESSOA */}
      <img
        src="/PESSOA.png"
        alt="pessoa da stock.io"
        width={497}
        height={1129}
        className="fixed right-[4.58%] top-[21.68%] w-[25vw] h-auto"
      />

      {/* LOGO */}
      <img
        src="/LOGO.png"
        alt="logo da stock.io"
        width={421}
        height={267}
        className="fixed right-[7.29%] top-[3%] w-[18vw] h-auto"
      />

      {/* Card */}
      <div className="fixed left-[5.90%] right-[49.31%] top-[11.04%] bottom-[0%] bg-[#171918] rounded-t-4xl flex flex-col items-center pl-[5%] pr-[5%] pt-[3%] pb-[3%] shadow-2xl overflow-y-auto card-scroll">

        <h1 className="text-[#F6F3E4] text-[44px] font-black text-center scale-x-125 mb-10">
          CRIE SUA CONTA
        </h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">

          {/* Nome Completo */}
          <div className="w-full flex flex-col gap-1">
            <input
              type="text"
              name="nomeCompleto"
              placeholder="Nome Completo"
              value={form.nomeCompleto}
              onChange={handleChange}
              className="w-full bg-[#F6F3E4] hover:bg-[#e0dcdc] text-black rounded-full px-8 py-4 font-bold text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A38F3]"
            />
            {erros.nomeCompleto && <p className="text-red-400 text-sm pl-4">{erros.nomeCompleto}</p>}
          </div>

          {/* Username */}
          <div className="w-full flex flex-col gap-1">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-[#F6F3E4] hover:bg-[#e0dcdc] text-black rounded-full px-8 py-4 font-bold text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A38F3]"
            />
            {erros.username && <p className="text-red-400 text-sm pl-4">{erros.username}</p>}
          </div>

          {/*Email */}
          <div className="w-full flex flex-col gap-1"> 
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-[#F6F3E4] hover:bg-[#e0dcdc] text-black rounded-full px-8 py-4 font-bold text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A38F3]"
            />
            {erros.email && <p className="text-red-400 text-sm pl-4">{erros.email}</p>}
          </div>

          {/*Senha */}
          <div className="w-full flex flex-col gap-1">
            <div className="relative w-full">
              <input
                type={mostrarSenha ? "text" : "password"}
                name="senha"
                placeholder="Senha"
                value={form.senha}
                onChange={handleChange}
                className="w-full bg-[#F6F3E4] hover:bg-[#e0dcdc] text-black rounded-full px-8 py-4 font-bold text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A38F3]"
              />
              <div
                className="absolute right-6 top-[14px] text-gray-500 cursor-pointer"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <IoEyeOutline size={30} /> : <IoEyeOffOutline size={30} />}
              </div>
            </div>
            {erros.senha && <p className="text-red-400 text-sm pl-4">{erros.senha}</p>}
          </div>

          {/* Confimar Senha */}
          <div className="w-full flex flex-col gap-1">
            <div className="relative w-full">
              <input
                type={mostrarConfirmarSenha ? "text" : "password"}
                name="confirmarSenha"
                placeholder="Confirmar Senha"
                value={form.confirmarSenha}
                onChange={handleChange}
                className="w-full bg-[#F6F3E4] hover:bg-[#e0dcdc] text-black rounded-full px-8 py-4 font-bold text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A38F3]"
              />
              <div
                className="absolute right-6 top-[14px] text-gray-500 cursor-pointer"
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
              >
                {mostrarConfirmarSenha ? <IoEyeOutline size={30} /> : <IoEyeOffOutline size={30} />}
              </div>
            </div>
            {erros.confirmarSenha && <p className="text-red-400 text-sm pl-4">{erros.confirmarSenha}</p>}
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-[#6A38F3] hover:bg-[#5a2de0] transition-colors text-white font-black text-2xl rounded-full py-5 mt-2"
          >
            CRIAR CONTA
          </button>

          {/*login */}
          <p className="text-left text-white text-lg font-bold">
            Já possui uma conta?{" "}
            <Link href="/login">
              <span className="text-[#6A38F3] font-black hover:underline cursor-pointer">
                Login
              </span>
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}