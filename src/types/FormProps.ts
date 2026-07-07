	 import type { Client } from "./Client"
	 export interface FormProps { 
	    addClient: (client:Client)=>void,
	    editingClient: Client | null,
	    updateClient: (client:Client)=>void
	 }
