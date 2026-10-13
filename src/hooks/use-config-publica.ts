import { useQuery } from "@tanstack/react-query";
import { buscarConfigPublica } from "@/lib/config-publica";

// Busca só no navegador: o HTML pré-renderizado sai sem preços e o valor novo aparece sem
// novo deploy do site. O app libera a resposta para cache por 60 s, e aqui vale o mesmo.
export function useConfigPublica() {
  return useQuery({
    queryKey: ["config-publica"],
    queryFn: ({ signal }) => buscarConfigPublica(signal),
    staleTime: 60_000,
    retry: 1,
  });
}
