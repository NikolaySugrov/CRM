export type ClientStatus = 'new' | 'in_progress' | 'client' | 'lost'

export interface Client{
    id: number,
    name: string,
    phone: string,
    email: string,
    company: string,
    status: ClientStatus,
    budget: string,
    createdAt: string
}