import { computed, ref, watch } from 'vue';
import type{ Client } from '../interfaces/client';
import { useMutation, useQuery } from '@tanstack/vue-query';
import clientApi from '@/api/clients-api';

const getClient = async (id: number): Promise<Client> => {
  const {data} = await clientApi.get(`/clients/${id}`);
  return data;
}

const updateClient = async(client: Client): Promise<Client>  => {
  const { data } = await clientApi.patch<Client>(`/clients/${client.id}`, client);
  return data;
}

const useClient = (id: number) =>{
  
  const client = ref<Client>();

  const {isLoading, data, isError} = useQuery({
    queryKey: ['client', id],
    queryFn: () => getClient(id),
    retry: false,
  });

  const clientMutation = useMutation({ mutationFn: updateClient});


  watch(data, () => {
    if(data.value)
        client.value = {...data.value};
  }, {immediate: true})

  return {
    isLoading,
    client,
    isError,
    clientMutation,
    // Metodo
    updateClient: clientMutation.mutate,
    isUpdating: computed(()=> clientMutation.isPending.value),
    isUpdatingSuccess: computed(()=> clientMutation.isSuccess.value),
    isErrorUpdating: computed(()=> clientMutation.isError.value),
  }
}

export default useClient;