import { Review } from "@/interfaces/reviewInterface";



export function CardComentario({ review }: { review: Review }) {
  return (
    // Largura fixa (w-[450px]) garante que o carrossel funcione bem
    <div className="bg-[#F6F3E4] rounded-[2rem] p-6 w-[450px] flex gap-4 text-black shadow-md">
      
      {/* Foto de perfil */}
      <img 
        src={review.avatarUrl || "https://placehold.co/100x100?text=User"} 
        alt={review.nomeUsuario} 
        className="w-20 h-20 rounded-full object-cover shrink-0"
      />
      
      {/* Conteúdo do comentário */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="text-lg font-medium">{review.nomeUsuario}</h4>
            
            {/* Estrelinhas individuais do comentário */}
            <div className="text-yellow-400 text-lg flex tracking-widest">
              {"★".repeat(review.nota)}
              {"☆".repeat(5 - review.nota)}
            </div>
          </div>
          
          {/* Texto do comentário com limite de linhas (line-clamp) */}
          <p className="mt-2 text-sm text-gray-700 font-light leading-relaxed line-clamp-3">
            {review.comentario}
          </p>
        </div>

        {/* Botão de ver mais */}
        <div className="flex justify-end mt-2">
          <button className="text-[#6A38F3] text-sm font-light hover:underline">
            ver mais
          </button>
        </div>
      </div>

    </div>
  );
}