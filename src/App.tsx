import type { Client, ClientStatus } from "./types/Client"
import { useState, useEffect } from "react"
import ClientTable from "./components/ClientTable"
import ClientForm from "./components/ClientForm"
import ClientStats from "./components/ClientStats"
import SidebarButton from "./components/Buttons/SidebarButton"
import { 
  LogOut, 
  Bell, 
  ChevronDown, 
  Search,
} from "lucide-react"

import "./styles/App.css"
export default function App (){
  const initialClients: Client[] = [
      {
        id: 1,
        name: 'Nikolay',
        phone: '+79432630034',
        email: 'lalala@gmail.com',
        company: 'OOOp',
        status: 'new',
        budget: '12934',
        createdAt: '21.12.2005'
      },
      {
      id: 2,
      name: "Ivan",
      phone: "+79999999999",
      email: "ivan@mail.ru",
      company: "ООО Ромашка",
      status: "new",
      budget: '50000',
      createdAt: "27.05.2026"
      }
    ]
  const [clients, setClients] = useState<Client[]>(()=>{
    const savedClients = localStorage.getItem("clients");
    return savedClients? 
    JSON.parse(savedClients) as Client[] : 
    initialClients
    
  })
  useEffect(()=>{
    localStorage.setItem("clients", JSON.stringify(clients))
  }, [clients])
  const [search, setSearch] = useState<string>("")
  const searchValue = search.toLowerCase()
  const [statusFilterState, setStatusFilterState] = useState<ClientStatus | "all">('all')
  const filteredClients = clients.filter((client)=>{
    
    const inputFilter = 
    client.name.toLowerCase().includes(searchValue)||
    client.company.toLowerCase().includes(searchValue)

    const statusFilter = 
    statusFilterState === "all" || client.status === statusFilterState

    return inputFilter && statusFilter


    
  })
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  function addClient (newClient:Client) {
    
    setClients(prev=>[...prev, newClient])
  }
  function deleteClient(id:number){

    setClients(prev=>prev.filter((client)=>client.id!==id))

  }
  function changeStatus(id:number, status:ClientStatus){
    setClients(prev=>prev.map((client)=> 
      client.id === id
        ? {...client, status}
        : client
      ))
    
  }

  function updateClient(updatedClient:Client){
    setClients(prev=>prev.map((client)=>
      client.id === updatedClient.id
        ? updatedClient
        : client
    ))
    setEditingClient(null)
  }
  
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-without-exit">
          <div className="sidebar-brand">
            <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="crmGradient" x1="8" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stop-color="#3B82F6"/>
                  <stop offset="1" stop-color="#1D4ED8"/>
                </linearGradient>
                <filter id="softShadow" x="0" y="0" width="70" height="70" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#2563EB" flood-opacity="0.22"/>
                </filter>
              </defs>

              <g filter="url(#softShadow)">
                <rect x="8" y="8" width="48" height="48" rx="14" fill="url(#crmGradient)"/>
              </g>

              <circle cx="32" cy="25" r="5.5" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <path d="M21.5 42C22.8 35.9 26.5 32.7 32 32.7C37.5 32.7 41.2 35.9 42.5 42"
                    stroke="white" stroke-width="3" stroke-linecap="round"/>

              <circle cx="21" cy="27.5" r="4" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
              <path d="M14.5 40C15.5 36.3 17.8 34.1 21.2 34"
                    stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>

              <circle cx="43" cy="27.5" r="4" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
              <path d="M49.5 40C48.5 36.3 46.2 34.1 42.8 34"
                    stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
            </svg>
            <div className="sidebar-text">
              <h4>CRM</h4>
              <p>Система управления клиентами</p>
            </div>
          </div>
          <SidebarButton></SidebarButton>
        </div>
        <button className="sidebar-button">
            <LogOut size={22}/>
            Выйти
        </button>
      </aside>
      <main>
        <header className="main-header">
          <div className="main-header-left-part">
            <h3>Клиенты</h3>
            <p>Управление клиентской базой и сделками</p>
          </div>
          <div className="main-header-right-part">
            <button className="notification">
              <Bell size={20}/>
            </button>
            <div className="main-header-user">
              <div className="main-header-user-text">
                <h5>Николай</h5>
                <p>Администратор</p>
              </div>
            </div>
              <ChevronDown size={18} />
          </div>
        </header>
        <section className="clients-panel">
          <div className="sort">
            <div className="sort-input">
              <Search size={22}/>
              <input 
              type="text" 
              placeholder="Поиск по имени/компании"
              onChange={(event)=>setSearch(event.target.value)}
              value={search}
              />
            </div>
            <div className="sort-select">
              <span>Статус:</span>
              <select value={statusFilterState} onChange={(event)=>setStatusFilterState(event.target.value as ClientStatus | "all")}>
                <option value='all'>Все</option>
                <option value='new'>Новый</option>
                <option value='in_progress'>В работе</option>
                <option value='client'>Клиент</option>
                <option value='lost'>Потерян</option>
              </select>
            </div>
          </div>
          <ClientTable  clients={filteredClients} deleteClient={deleteClient} startEdit={setEditingClient} changeStatus={changeStatus}></ClientTable>
        </section>
        <ClientForm addClient={addClient} editingClient={editingClient} updateClient={updateClient}></ClientForm>
        <ClientStats clients = {clients}></ClientStats>
      </main>
    </div>
    
  )
}
