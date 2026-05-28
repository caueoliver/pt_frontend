import { NavBar } from "@/components/navBar"; 

export default function SistemaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      {/* navbar fica fixa no topo para todas as páginas dentro de system*/}
      <NavBar />

      <main className="flex-1 w-full mx-auto">
        {children}
      </main>
    </div>
  );
}