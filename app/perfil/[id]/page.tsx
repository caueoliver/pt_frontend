"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { reviewsUser, getUserById, updateProfile, updatePassword, deleteUser,
         getLojasByUsuario, getProdutosByUsuario} from "@/api/api.js";
import { useParams } from "next/navigation";
import { fakeUser, fakeReviews } from "@/mock/mockData";

// Interfaces
interface UserProfile {
  name: string;
  username: string;
  email: string;
  avatarUrl?: string;
}

interface Review {
  id: number;
  comentario: string;
  user: {
    name: string;
    avatarUrl: string;
  };
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagens?: { imageUrl: string; ordem: number }[];
}

interface Loja {
  id: number;
  nome: string;
  categoria: string;
  logoUrl?: string;
}

export default function Profile() {
  const params = useParams();
  const userId = params.id as string;

  // states padrao de usuario
  const [user, setUser] = useState<UserProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isOwnProfile, setIsOwnProfile] = useState(true); //alterar para mostrar os botoes
  
  // states de produtos e lojas
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [isAddLojaOpen, setIsAddLojaOpen] = useState(false);
  const [lojaNome, setLojaNome] = useState("");
  const [lojaCategoria, setLojaCategoria] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [logoSvg, setLogoSvg] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);

  // states de modais de edicao
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditPasswordOpen, setIsEditPasswordOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // busca dados do usuario e as avaliacoes
        const userData = await getUserById(userId);
        const reviewsData = await reviewsUser(userId);
        // busca de loja e produtos por ID do usuário
        const lojasData = await getLojasByUsuario(userId);
        const produtosData = await getProdutosByUsuario(userId);

        setUser(userData);
        setReviews(reviewsData);
        setLojas(lojasData);
        setProdutos(produtosData);

        // incrementa nos modais os dados do banco
        setEditName(userData.name);
        setEditUsername(userData.username);
        setEditEmail(userData.email);

        // validar se o usuario logado é o dono do perfil
        const loggedUserId = localStorage.getItem("userId");
        if (loggedUserId === userId) {
          setIsOwnProfile(true);
        }
        
      } catch (error) {
        console.error("Erro na integração, carregando fallbacks: ", error);
        // fallbacks/Mocks de teste caso a API falhe na apresentação
        setUser(fakeUser);
        setReviews(fakeReviews);
        setProdutos([]);
        setLojas([]);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      loadData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F6F3E4]">
        <p className="text-2xl font-medium text-black">Carregando página...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F6F3E4]">
        <p className="text-2xl text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  if (!user) return null;

  // Funções de Profile, Password, Delete
  async function handleUpdateProfile() {
    try {
      await updateProfile(userId, { name: editName, username: editUsername, email: editEmail });
      setUser({ ...user!, name: editName, username: editUsername, email: editEmail });
      alert("Perfil atualizado com sucesso!");
      setIsEditProfileOpen(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar o perfil.");
    }
  }

  async function handleUpdatePassword() {
  try {
    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    await updatePassword(userId, { oldPassword, newPassword });
    
    alert("Senha atualizada com sucesso!");
    closePasswordModal();
  } catch (error) {
    console.error(error);
    alert("Não foi possível alterar a senha!");
  }
}

  async function handleDeleteAccount() {
    if (!confirm("Deseja excluir sua conta?")) return;
    try {
      await deleteUser(userId);
      alert("Conta deletada com sucesso!");
      localStorage.removeItem("userId");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Não foi possível deletar a conta!");
    }
  }
  // Função para criar/adicionar loja
  async function handleAddLoja() {
    if (!lojaNome || !lojaCategoria) {
      alert("Por favor, preencha o nome e a categoria da loja.");
      return;
    }

    try {
      // Aqui você faz a integração com seu backend/API futuramente
      console.log("Criando loja:", { lojaNome, lojaCategoria, fotoPerfil, logoSvg, banner });
      
      alert("Loja adicionada com sucesso!");
      closeAddLojaModal();
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar a loja.");
    }
  }

  function closeAddLojaModal() {
    setLojaNome("");
    setLojaCategoria("");
    setFotoPerfil(null);
    setLogoSvg(null);
    setBanner(null);
    setIsAddLojaOpen(false);
  }

  function closePasswordModal() {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditPasswordOpen(false);
  }

  function closeProfileModal() {
    setEditName(user?.name || "");
    setEditUsername(user?.username || "");
    setEditEmail(user?.email || "");
    setIsEditProfileOpen(false);   
  }
  

  return (
    <main className="min-h-screen bg-[#F6F3E4]">
      {/* banner */}
      <div className="relative w-full">
        <div className="w-full h-[340px] bg-black" />
        <div className="absolute left-16 top-[240px] flex items-center gap-6">
          <button onClick={() => window.history.back()} className="text-white hover:opacity-70 transition cursor-pointer -mt-10" aria-label="Voltar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.8} stroke="currentColor" className="w-14 h-14">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div className="w-[180px] h-[180px] rounded-full overflow-hidden shadow-lg border-none border-[#F6F3E4]">
            <img src={user.avatarUrl || "/default-avatar.png"} alt="Foto Perfil" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* dados do perfil */}
      <section className="pt-28 px-24 ml-15">
        <div className="flex items-start justify-between">
          <div>{/* nome username email*/}
            <h1 className="text-[56px] leading-none font-bold text-black">{user.name}</h1>
            <p className="text-[28px] text-[#6E6E6E] mt-2">@{user.username}</p>
            <div className="flex items-center gap-2 mt-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-[#6E6E6E]">
                <path d="M1.5 4.5h21v15h-21v-15zm1.5 1.879v11.621h18v-11.62l-9 6.75-9-6.75zm17.385-0.879h-16.77l8.385 6.289 8.385-6.289z" />
              </svg>
              <p className="text-[24px] text-[#6E6E6E]">{user.email}</p>
            </div>
          </div>

          {/* botao de editar perfil*/}
          {isOwnProfile && (
            <button onClick={() => setIsEditProfileOpen(true)} className="mt-6 bg-[#6A38F3] hover:opacity-90 transition text-white text-lg font-medium px-14 py-3 rounded-full shadow-md cursor-pointer">
              Editar Perfil
            </button>
          )}
        </div>

        {/* Produtos */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-black">Produtos</h2>
          {produtos.length === 0 ? (
            <p className="text-xl text-[#6E6E6E] italic">Nenhum produto cadastrado.</p>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {produtos.map((produto) => {
                const imagemPrincipal = produto.imagens?.find(img => img.ordem === 1)?.imageUrl || "/fallback-produto.png";
                return (
                  <div key={produto.id} className="bg-white p-5 rounded-[30px] w-[210px] min-w-[210px] shadow-sm flex flex-col items-center border border-gray-100 text-center">
                    <div className="w-[140px] h-[140px] rounded-2xl overflow-hidden mb-4">
                      <img src={imagemPrincipal} alt={produto.nome} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-semibold text-xl text-black truncate w-full">{produto.nome}</h4>
                    <p className="text-lg font-bold text-black mt-1">
                      R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <span className="text-xs font-bold text-green-600 mt-2 bg-green-50 px-3 py-1 rounded-full">DISPONÍVEL</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* LOJAS DO USUARIO */}
        <div className="mt-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-black">Lojas</h2>
            {isOwnProfile && (
              <button onClick={() => setIsAddLojaOpen(true)} className="bg-[#6A38F3] text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-xl cursor-pointer hover:scale-105 transition shadow-sm">
                +
              </button>
            )}
          </div>
          {lojas.length === 0 ? (
            <p className="text-xl text-[#6E6E6E] italic">Nenhuma loja cadastrada.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {lojas.map((loja) => (
                <div key={loja.id} className="bg-white rounded-[30px] w-[500px] p-5 flex items-center justify-between border border-gray-100 shadow-sm">
                  <div>
                    <h3 className="text-2xl font-bold text-black">{loja.nome}</h3>
                    <p className="text-purple-600 text-lg font-medium">{loja.categoria}</p>
                  </div>
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-gray-100">
                    <img src={loja.logoUrl || "/fallback-loja.png"} alt={loja.nome} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* avaliacoes */}
        <div className="mt-16 mb-[100px]">
          <h2 className="text-3xl font-bold mb-8 text-black">Avaliações</h2>
          <div className="flex flex-col gap-6 w-full max-w-[1300px]">
            {reviews.map((review) => (
              <Link key={review.id} href={`/review/${review.id}`} className="w-full">
                <div className="bg-[#F8F8F8] rounded-[35px] w-full p-6 flex items-center gap-6 cursor-pointer hover:scale-[1.005] transition shadow-sm">
                  <img src={user.avatarUrl} alt={user.name} className="w-[120px] h-[120px] rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-3xl font-semibold text-black">{user.name}</h3>
                    <p className="text-[22px] text-[#444] mt-2 line-clamp-2">{review.comentario}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* modal de editar perfil*/}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="relative w-[520px] bg-[#EDEDED] rounded-[40px] px-14 py-10">
            <button onClick={() => closeProfileModal()} 
              className="absolute right-8 top-8 text-black hover:opacity-70 transition cursor-pointer" aria-label="Fechar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col items-center">
              <div className="relative">
                <img src={user.avatarUrl} alt={user.name} className="w-[120px] h-[120px] rounded-full object-cover" />
                <button className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center cursor-pointer">
                  <img src="/img_perfil/camera.png" alt="camera" />
                </button>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-5">
              <input type="text" placeholder="Nome" value={editName} onChange={(e) => setEditName(e.target.value)} className="h-[52px] rounded-2xl px-5 bg-white outline-none text-lg text-black" />
              <input type="text" placeholder="Username" value={editUsername} onChange={(e) => setEditUsername(e.target.value)} className="h-[52px] rounded-2xl px-5 bg-white outline-none text-lg text-black" />
              <input type="email" placeholder="Email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="h-[52px] rounded-2xl px-5 bg-white outline-none text-lg text-black" />
            </div>
            
            <div className="mt-14 flex flex-col gap-4">
              <button onClick={handleDeleteAccount} className="h-[52px] rounded-full border border-red-600 text-red-700 text-xl font-medium cursor-pointer hover:bg-red-50 transition">
                Deletar Conta 
              </button>
              <button onClick={() => { setIsEditProfileOpen(false); setIsEditPasswordOpen(true); }} className="h-[52px] rounded-full border border-[#7B4DFF] text-[#7B4DFF] text-xl font-medium cursor-pointer hover:bg-purple-50 transition">
                Alterar senha
              </button>
              <button onClick={handleUpdateProfile} className="h-[56px] rounded-full bg-[#6A38F3] text-white text-2xl font-medium shadow-lg cursor-pointer hover:opacity-90 transition">
                Salvar
              </button>
            </div>
          </div>  
        </div>
      )}

      {/* modal de alterar senha */}
      {isEditPasswordOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="relative w-[520px] bg-[#EDEDED] rounded-[40px] px-14 py-10">
            <button onClick={closePasswordModal} className="absolute right-8 top-8 text-5xl font-light cursor-pointer">
              ×
            </button>
            <button 
                onClick={() => { closePasswordModal(); setIsEditProfileOpen(true); }} 
                className="absolute left-8 top-8 text-black hover:opacity-70 transition cursor-pointer" aria-label="Voltar para o perfil">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-9 h-9">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
          </button>

            <div className="flex justify-center mt-6 mb-12">
              <div className="text-[200px]">
                <img src="/img_perfil/key.png" alt="chave" />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <input type="password" placeholder="Senha Antiga" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="h-[52px] rounded-2xl px-5 bg-white outline-none text-lg text-black" />
              <input type="password" placeholder="Nova Senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="h-[52px] rounded-2xl px-5 bg-white outline-none text-lg text-black" />
              <input type="password" placeholder="Confirmar Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-[52px] rounded-2xl px-5 bg-white outline-none text-lg text-black" />
            </div>

            <button onClick={handleUpdatePassword} className="w-full mt-16 h-[56px] rounded-full bg-[#6A38F3] text-white text-2xl font-medium shadow-lg cursor-pointer hover:opacity-90 transition">
              Salvar Senha
            </button>
          </div>
        </div>
      )}
    {/* Modal: adicionar loja */}
      {isAddLojaOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="relative w-[560px] bg-[#EDEDED] rounded-[32px] p-8 shadow-xl text-center">
            {/* Botap de fechar */}
            <button 
              onClick={closeAddLojaModal} 
              className="absolute right-6 top-6 text-black hover:opacity-60 transition cursor-pointer"
              aria-label="Fechar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-[32px] font-medium text-black mt-4 mb-6">Adicionar loja</h2>

            {/* IMputs */}
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Nome da loja" 
                value={lojaNome}
                onChange={(e) => setLojaNome(e.target.value)}
                className="w-full h-[52px] rounded-full px-6 bg-white outline-none text-base text-gray-700 placeholder-gray-400"
              />
              
              {/* Categorias */}
              <div className="relative">
                <select 
                  value={lojaCategoria}
                  onChange={(e) => setLojaCategoria(e.target.value)}
                  className="w-full h-[52px] rounded-full px-6 bg-white outline-none text-base text-gray-700 appearance-none cursor-pointer placeholder-gray-400"
                >
                  <option value="" disabled hidden>Categoria</option>
                  <option value="Alimentos">Alimentos & Bebidas</option>
                  <option value="Vestuario">Vestuário / Roupas</option>
                  <option value="Eletronicos">Eletrônicos</option>
                  <option value="Outros">Outros</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>

              {/* Upload imagem 1 */}
              <label className="border-[2px] border-dashed border-[#A155FF] rounded-[18px] py-4 px-4 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50/40 transition bg-transparent group">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setFotoPerfil(e.target.files?.[0] || null)} />
                <div className="bg-[#9A33FF] text-white p-2.5 rounded-lg mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
                  </svg>
                </div>
                <span className="text-sm font-normal text-gray-700 group-hover:text-black">
                  {fotoPerfil ? fotoPerfil.name : "Anexe a foto de perfil de sua loja"}
                </span>
              </label>

              {/* Upload imagem 2*/}
              <label className="border-[2px] border-dashed border-[#A155FF] rounded-[18px] py-4 px-4 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50/40 transition bg-transparent group">
                <input type="file" accept=".svg" className="hidden" onChange={(e) => setLogoSvg(e.target.files?.[0] || null)} />
                <div className="bg-[#9A33FF] text-white p-2.5 rounded-lg mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
                  </svg>
                </div>
                <span className="text-sm font-normal text-gray-700 group-hover:text-black">
                  {logoSvg ? logoSvg.name : "Anexe a logo em SVG de sua loja"}
                </span>
              </label>

              {/* Upload imagem 3 */}
              <label className="border-[2px] border-dashed border-[#A155FF] rounded-[18px] py-4 px-4 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50/40 transition bg-transparent group">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setBanner(e.target.files?.[0] || null)} />
                <div className="bg-[#9A33FF] text-white p-2.5 rounded-lg mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
                  </svg>
                </div>
                <span className="text-sm font-normal text-gray-700 group-hover:text-black">
                  {banner ? banner.name : "Anexe o banner de sua loja"}
                </span>
              </label>
            </div>

            {/* Adicionar */}
            <button 
              onClick={handleAddLoja}
              className="w-full mt-8 h-[48px] rounded-full bg-[#8B00FF] hover:bg-[#7700EE] text-white text-lg font-medium shadow-md transition cursor-pointer"
            >
              Adicionar
            </button>
          </div>
        </div>
      )}



    </main>
  );
}