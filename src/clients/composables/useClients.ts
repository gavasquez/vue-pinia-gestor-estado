import clientApi from "@/api/clients-api";
import type { Client } from "../interfaces/client";
import { useQuery } from "@tanstack/vue-query";

const getClients =async():Promise<Client[]> => {
    const { data }= await clientApi.get<Client[]>('/clients?_page=1');
    return data;
}

const useClients =() => {


   const { isLoading, data } = useQuery({
        queryKey: ['clients?page=', 1],
        queryFn: () => getClients()
    });


    return {

    }
}

export default useClients;