"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import { reviewsUser, getUserById, updateProfile, updatePassword, deleteUser } from "@/api/api.js";
import { useParams } from "next/navigation";
//teste
import { fakeUser, fakeReviews } from "@/mock/mockData";

// são os tipos que virão da api 
interface UserProfile {
  name: string;
  username: string;
  email: string;
  avatarUrl?: string;
}
interface Review {
  id: number;
  comment: string;

  user: {
    name: string;
    avatarUrl: string;
  };
}

export default function Profile() {
  // utiliza o params para pegar o ID da url 
  const params = useParams();
  const userId = params.id as string;

  // states do usuario 
  const [user, setUser] = useState<UserProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isOwnProfile, setIsOwnProfile] = useState(true);//false
  
  // states para editar perfil 
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
    //carrega as informações da pagina
    async function loadData() {
      try {
        setLoading(true);
        // busca usuario 
        const userData = await getUserById(userId);
        // buscar avaliacoes 
        const reviewsData = await reviewsUser(userId);
        setUser(userData);
        setReviews(reviewsData);
        //insere nos modais os dados do usuario 
        setEditName(userData.name);
        setEditUsername(userData.username);
        setEditEmail(userData.email);
        //compara se é o usuario ou não
        const loggedUserId = localStorage.getItem("userId");
        if(loggedUserId == userId){
          setIsOwnProfile(true);
        }
        
      } catch (error) {
        console.error(error);
          //teste
          setUser(fakeUser);
          setReviews(fakeReviews);
        //setError("Não foi possível carregar o perfil");
      }
      finally {
        setLoading(false);
      }
    }
    if (userId) {
      loadData();
    }

  }, [userId]);

  //caso demore para aparecer a pagina
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl">
          Carregando página...
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl text-red-500">
          {error}
        </p>
      </div>
    );
  }
  if (!user) {
    return null;
  }
  //funcao que atualiza o perfil do usuario
  async function handleUpdateProfile() {
    try{
      await updateProfile(userId, {
        name: editName,
        username: editUsername,
        email: editEmail,
      });
      //atualiza a tela sem precisar dar F5
      if (user) {
        setUser({
          ...user,
          name: editName,
          username: editUsername,
          email: editEmail,
        });
      }
      alert("Perfil atualizado com sucesso!");
      setIsEditProfileOpen(false);
    } catch(error){
      console.error(error);
      alert("Erro ao atualizar o perfil, tente novamente.");
    }
  }
  //funcao para atualizar a senha do usuario
  async function handleUpdatePassword() {
    try{
      if(newPassword !== confirmPassword){
        alert("As senhas não coincidem");
        return;
      }
      await updatePassword(userId, {oldPassword, newPassword,});
      alert("Senha atualizada com sucesso!");
      closePasswordModal();
    } catch(error){
      console.error(error);
      alert("Não foi possível alterar a senha!")
    }
  }

  //funcao para remover o usuario
  async function handleDeleteAccount() {
    const confirmDelete = confirm("Deseja excluir sua conta?");
    if(!confirmDelete){
      return;
    }
    try {
      await deleteUser(userId);
      alert("Conta deletada com sucesso!");
      localStorage.removeItem("userId");
      window.location.href = "/";
    } catch(error){
      console.error(error);
      alert("Não foi possivel deletar a conta!");
    }
  }
  //limpa os buffers dos modais
  function closePasswordModal() {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsEditPasswordOpen(false);
    }
  function closeProfileModal(){
      setEditName("");
      setEditUsername("");
      setEditEmail("");
      setIsEditProfileOpen(false);   
  }


  return (
    <main className="min-h-screen bg-[#F6F3E4]">
      
      {/* container principal */}
      <div className="relative w-full">
        {/* banner */}
        <div className="w-full h-[340px] bg-black" />
        {/* foto de perfil e voltar pg */}
        <div className="absolute left-16 top-[240px] flex items-center gap-6">
          <button
            onClick={() => window.history.back()}
            className="text-white hover:opacity-70 transition cursor-pointer -mt-10"
            aria-label="Voltar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.8}
              stroke="currentColor"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Foto */}
          <div className="w-[180px] h-[180px] rounded-full overflow-hidden shadow-lg">
            <img
              src={user.avatarUrl}
              alt="Foto Perfil"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* informacoes usuario */}
      <section className="pt-28 px-24 ml-15">
        <div className="flex items-start justify-between">
          
          <div>
            <h1 className="text-[56px] leading-none font-bold text-black">
              {user.name}
            </h1>

            <p className="text-[28px] text-[#6E6E6E] mt-2">
              @{user.username}
            </p>

            <div className="flex items-center gap-2 mt-3">

              {/* icones */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-[#6E6E6E]"
              >
                <path d="M1.5 4.5h21v15h-21v-15zm1.5 1.879v11.621h18v-11.62l-9 6.75-9-6.75zm17.385-0.879h-16.77l8.385 6.289 8.385-6.289z" />
              </svg>

              <p className="text-[24px] text-[#6E6E6E]">
                {user.email}
              </p>
            </div>
          </div>

          {/* Botao de editar */}
          {isOwnProfile && (
            <button 
              onClick={() => setIsEditProfileOpen(true)}
              className="mt-6 bg-[#6A38F3] hover:opacity-90 transition text-white text-lg font-medium px-14 py-3 rounded-full shadow-md">
              Editar Perfil
            </button>
          )}
        </div>

         {/* avaliações */}
       <div className="mt-20 mb-[100px]">

      <h2 className="text-3xl font-bold mb-8">
        Avaliações
      </h2>

      <div className="flex flex-col gap-6">

        {reviews.map((review) => (

          <Link
            key={review.id}
            href={`/review/${review.id}`}
          >

            <div className="bg-[#F8F8F8] rounded-[35px] w-[1200px] p-6 flex items-center gap-6 cursor-pointer hover:scale-[1.01] transition">

              {/* Foto de perfil */}
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-[120px] h-[120px] rounded-full object-cover"
                />

              {/* NOme do usuario e seus comentarios */}
              <div>

                <h3 className="text-3xl font-semibold">
                  {user.name}
                </h3>

                <p className="text-[22px] text-[#444] mt-2 line-clamp-2 ">
                  {review.comment}
                </p>

              </div>
            </div>

          </Link>

        ))}
        </div>
        </div>
      </section>

      {/* modais para alterar perfil e senha */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="relative w-[520px] bg-[#EDEDED] rounded-[40px] px-14 py-10">
            
              {/* botao de fechar */}        
              <button
                onClick={() => closeProfileModal()}
                className="absolute right-8 top-8 text-5xl font-light">
                  x
              </button>

              {/* foto */}   
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img src={user.avatarUrl} alt={user.name}
                   className="w-[120px] h-[120px] rounded-full object-cover"/>

                  {/* figura da camera */}
                   <button className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center">
                    <img src="/img_perfil/camera.png" alt="camera" />
                   </button>
                </div>
              </div>

              {/* INPUTS */}
              <div className="mt-10 flex flex-col gap-5">

                <input
                  type="text"
                  placeholder="Nome"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="h-[52px] rounded-2xl px-5 bg-white outline-none text-lg"
                />

                <input
                  type="text"
                  placeholder="Username"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="h-[52px] rounded-2xl px-5 bg-white outline-none text-lg"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="h-[52px] rounded-2xl px-5 bg-white outline-none text-lg"
                />
              </div>
              
              {/* botoes dos modais*/}
              <div className="mt-14 flex flex-col gap-4">
              
                {/* deletar conta */}
                <button 
                    onClick={handleDeleteAccount}
                    className="h-[52px] rounded-full border border-red-600 text-red-700 text-xl font-medium">
                     Deletar Conta 
                </button>
                {/* alterar senha*/}
                <button onClick={() => {setIsEditProfileOpen(false); setIsEditPasswordOpen(true);}}
                  className="h-[52px] rounded-full border border-[#7B4DFF] text-[#7B4DFF] text-xl font-medium">
                  Alterar senha
                </button>
                {/* SALVAR */}
                <button 
                  onClick={handleUpdateProfile}
                  className="h-[56px] rounded-full bg-[#6A38F3] text-white text-2xl font-medium shadow-lg">
                  Salvar
                </button>
              </div>
            </div>  
        </div>
      )}  
      {isEditPasswordOpen && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50">

          <div className="relative w-[520px] bg-[#EDEDED] rounded-[40px] px-14 py-10">

            {/* FECHAR */}
            <button
              onClick={closePasswordModal}
              className="absolute right-8 top-8 text-5xl font-light"
            >
              ×
            </button>

            {/* VOLTAR */}
            <button
              onClick={() => {
                closePasswordModal();
                setIsEditProfileOpen(true);
              }}
              className="absolute left-8 top-10 text-5xl font-light"
            >
              ‹
            </button>

            {/* ÍCONE */}
            <div className="flex justify-center mt-6 mb-12">

              <div className="text-[200px]">
                <img src="/img_perfil/key.png" alt="chave" />
              </div>

            </div>

            {/* INPUTS */}
            <div className="flex flex-col gap-5">

              <input
                type="password"
                placeholder="Senha Antiga"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="h-[52px] rounded-2xl px-5 bg-white outline-none text-lg"
              />

              <input
                type="password"
                placeholder="Nova Senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-[52px] rounded-2xl px-5 bg-white outline-none text-lg"
              />

              <input
                type="password"
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-[52px] rounded-2xl px-5 bg-white outline-none text-lg"
              />

            </div>

            {/* BOTÃO */}
            <button
              onClick={handleUpdatePassword}
              className="w-full mt-16 h-[56px] rounded-full bg-[#6A38F3] text-white text-2xl font-medium shadow-lg"
            >
              Salvar Senha
            </button>

          </div>

        </div>
      )}

    </main>
  );
}