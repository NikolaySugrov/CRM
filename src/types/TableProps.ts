import type { Client, ClientStatus } from "./Client"
export interface TableProps {
    clients: Client[],
    deleteClient: (id:number)=>void
    startEdit: (client:Client)=>void
    changeStatus: (id:number, status:ClientStatus) => void
}