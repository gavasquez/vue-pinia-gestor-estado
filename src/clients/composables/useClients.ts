import clientApi from "@/api/clients-api";
import type { Client } from "../interfaces/client";
import { useQuery } from "@tanstack/vue-query";
import { useClientsStore } from "@/store/clients";
import { storeToRefs } from "pinia";
import type { ClientsResponse } from '../interfaces/clients-response.interface';
import { watch } from 'vue';

const getClients =async(page: number):Promise<Client[]> => {
 /*  await new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });  */
    const { data }= await clientApi.get<ClientsResponse>(`/clients?_page=${page}`);
    return data.data;
}

const useClients =() => {

    const store = useClientsStore();
    const { currentPage, clients, totalPages } = storeToRefs(store);

   const { isLoading, data } = useQuery({
        queryKey: ['clients?page=', currentPage],
        queryFn: () => getClients(currentPage.value),
    });

    watch(data, (clients) => {
      if(clients)
          store.setClients(clients);
    }, {immediate: true});


    return {
        isLoading,
        clients,
        currentPage,
        totalPages,
        // Metodos
        getPage(page: number) {
          store.setPage(page);
        },
        // Getters [1,2,3,4,5]
       /*  totalPageNumber: computed(
          () => [...new Array(totalPages.value)].map((v, i) => i + 1 ),
        ), */
    }
}

export default useClients;