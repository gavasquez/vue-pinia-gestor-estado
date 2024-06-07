import clientApi from "@/api/clients-api";
import type { Client } from "../interfaces/client";
import { useQuery } from "@tanstack/vue-query";
import { useClientsStore } from "@/store/clients";
import { storeToRefs } from "pinia";

const getClients =async():Promise<Client[]> => {
    const { data }= await clientApi.get<Client[]>('/clients?_page=1');
    return data;
}

const useClients =() => {

    const store = useClientsStore();
    const { currentPage, clients, totalPages< } = storeToRefs(store);

   const { isLoading, data } = useQuery({
        queryKey: ['clients?page=', 1],
        queryFn: () => getClients()
    });


    return {
        isLoading,
        clients: data,
    }
}

export default useClients;