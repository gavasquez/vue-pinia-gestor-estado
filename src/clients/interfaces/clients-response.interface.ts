import type { Client } from './client';


export interface ClientsResponse {
  first: number;
  prev:  null;
  next:  number;
  last:  number;
  pages: number;
  items: number;
  data:  Client[];
}
