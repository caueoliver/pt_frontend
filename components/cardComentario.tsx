import { Review } from "@/interfaces/reviewInterface";
import Link from 'next/link';


export function CardComentario({ review }: { review: Review }) {
  return (
    <div className="bg-[#F6F3E4] rounded-[2rem] p-8 w-[800px] flex gap-6 shrink-0 shadow-lg">
      
      

      <Link href={`/perfil/${review.usuarioId}`} className="flex gap-4 hover:opacity-80 transition-opacity">
      {/* foto de perfil grande */}
      <img 
        src={review.avatarUrl || "https://placehold.co/150x150?text=User"} 
        alt={review.nomeUsuario} 
        className="w-28 h-28 rounded-full object-cover shrink-0"
      />
      </Link>
      
      {/* conteúdo a direita da foto */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-medium text-black">{review.nomeUsuario}</h3>
            
            {/* estrelas */}
            <div className="text-yellow-400 text-2xl tracking-widest">
              {"★".repeat(Math.floor(review.nota))}
              {"☆".repeat(5 - Math.floor(review.nota))}
            </div>
          </div>
          
          {/* texto do comentário */}
          <p className="mt-3 text-black font-light text-base line-clamp-3 leading-relaxed">
            {review.comentario}
          </p>
        </div>

        {/* link interno do card */}
        <div className="flex justify-end mt-4">
          <Link href={`/avaliacao/${review.id}`} className="flex gap-4 hover:opacity-80 transition-opacity">
           <button className="text-[#9b72ff] hover:text-[#6A38F3] text-sm font-light transition-colors">
            ver mais
          </button>
          </Link>
        </div>
      </div>

    </div>
  );
}