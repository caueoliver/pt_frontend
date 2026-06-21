// src/components/ModalEditarLoja.tsx
import { useEffect, useState } from 'react';
import { Loja } from '@/interfaces/lojaInterface';
import { deleteLoja, getAllCategorias, updateLoja , uploadImage} from '@/api/api';

interface ModalEditarLojaProps {
  isOpen: boolean;
  onClose: () => void;
  loja: Loja;
  onAtualizar: () => void;
}

export function ModalEditarLoja({ isOpen, onClose, loja, onAtualizar }: ModalEditarLojaProps) {
  // estados para os inputs
  const [nome, setNome] = useState(loja.nome);
  const [categoria, setCategoria] = useState(loja.categoria);

  // estados para a API
  const [categoriasDb, setCategoriasDb] = useState<{id: number, nome: string}[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const categorias = [
  "Mercado",
  "Farmácia",
  "Beleza",
  "Moda", 
  "Eletrônicos",
  "Jogos", 
  "Brinquedos", 
  "Casa", 
];


//função para buscar as categorias
useEffect(() => {
    if (isOpen) {
      getAllCategorias()
        .then((data) => setCategoriasDb(data))
        .catch((error) => console.error("Erro ao buscar categorias:", error));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // função para salvar as alterações
  const handleSalvar = async () => {
    try {
      setLoading(true);
      
      // mantem a url antiga por padrão
      let novaBannerUrl = loja.bannerUrl;
      let novaLogoUrl = loja.logoUrl;

      // se o usuário escolheu uma imagem nova, faz o upload!
      if (bannerFile) {
        const uploadRes = await uploadImage(bannerFile);
        novaBannerUrl = uploadRes.url; 
      }

      if (logoFile) {
        const uploadRes = await uploadImage(logoFile);
        novaLogoUrl = uploadRes.url; 
      }

      // salva a loja com os dados novos 
      await updateLoja(loja.id, { 
        nome: nome, 
        categoria: categoria,
        bannerUrl: novaBannerUrl,
        logoUrl: novaLogoUrl // Envia a logo pro back!
      });

      onAtualizar(); 
      onClose(); 
    } catch (error) {
      console.error("Erro ao atualizar loja:", error);
      alert("Erro ao salvar as alterações.");
    } finally {
      setLoading(false);
    }
  };

  // função para deletar a loja
  const handleDeletar = async () => {
    const confirmar = window.confirm("Tem certeza que deseja deletar esta loja? Todos os produtos e avaliações serão perdidos.");
    
    if (confirmar) {
      try {
        setLoading(true);
        await deleteLoja(loja.id);
        // se a loja foi deletada, redirecionamos o usuário de volta para o feed
        window.location.href = '/'; 
      } catch (error) {
        console.error("Erro ao deletar loja:", error);
        alert("Erro ao deletar a loja.");
      } finally {
        setLoading(false);
      }
    }
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 py-4">
      <div className="bg-[#EBEBEB] w-full max-w-[800px] rounded-3xl p-6 md:p-8 relative flex flex-col gap-2 md:gap-5 shadow-2xl max-h-[95vh] overflow-hidden">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-6 text-2xl text-black hover:text-gray-600 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          ✕
        </button>

        <h2 className="text-center text-2xl md:text-3xl font-medium text-black mb-1 md:mb-2">Editar loja</h2>

        {/* input: nome da loja */}
        <input 
          type="text" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da loja"
          className="w-full bg-white rounded-full px-6 py-2 md:py-3 text-black outline-none shadow-sm font-light text-sm md:text-base disabled:opacity-50"
          disabled={loading}
        />

        {/* select: categoria dinâmica */}
        <div className="relative">
          <select 
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full bg-white rounded-full px-6 py-2.5 md:py-3 text-black outline-none shadow-sm appearance-none font-light cursor-pointer text-sm md:text-base disabled:opacity-50"
            disabled={loading}
          >
            {/* se o banco não retornar categorias, usa uma opção de fallback */}
            {categoriasDb.length === 0 && <option value={loja.categoria}>{loja.categoria}</option>}
            
            {categoriasDb.map((cat) => (
              <option key={cat.id} value={cat.nome.toLowerCase()}>
                {cat.nome}
              </option>
            ))}
          </select>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* campos de upload */}
        <div className="flex flex-col gap-2 md:gap-3 mt-1">
          
        
          <UploadBox 
          label={logoFile ? `Selecionado: ${logoFile.name}` : "Anexe o logo de sua loja"} 
          onFileSelect={(file) => setLogoFile(file)}
         />

         <UploadBox 
            label={bannerFile ? `Selecionado: ${bannerFile.name}` : "Anexe o banner de sua loja"} 
            onFileSelect={(file) => setBannerFile(file)}
          />
        </div>

        <div className="flex flex-col items-center gap-3 md:gap-4 mt-2">
          <button 
            className="w-full bg-red-600 text-white py-2.5 md:py-3 rounded-full font-medium hover:bg-red-700 transition-colors shadow-md text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDeletar}
            disabled={loading}
          >
            {loading ? "PROCESSANDO..." : "DELETAR"}
          </button>
          
          <button 
            className="w-2/3 bg-[#6A38F3] text-white py-2.5 md:py-3 rounded-full font-medium hover:bg-purple-700 transition-colors shadow-md text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSalvar}
            disabled={loading}
          >
            {loading ? "SALVANDO..." : "Salvar"}
          </button>
        </div>

      </div>
    </div>
  );
}

//componente auxiliar
function UploadBox({ label, onFileSelect }: { label: string, onFileSelect: (file: File) => void }) {
  return (
    <label className="border-[1.5px] border-dashed border-[#6A38F3] rounded-2xl flex flex-col items-center justify-center py-5 cursor-pointer hover:bg-purple-50/50 transition-colors">
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={(e) => {
          // Pega o primeiro arquivo que o usuário selecionou
          if (e.target.files && e.target.files.length > 0) {
            onFileSelect(e.target.files[0]);
          }
        }}
      />

      {/* icone generico de arquivo */}
      <svg className="w-8 h-8 text-[#6A38F3] mb-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 15h8v2H8v-2zm0-4h8v2H8v-2z" />
      </svg>
      <span className="text-gray-700 text-sm font-light text-center px-4">{label}</span>
    </label>
  );
}