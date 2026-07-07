import { Pen, Trash2 } from "lucide-react"
import type { ClientStatus } from "../types/Client"
import type { TableProps } from "../types/TableProps"
export default function ClientTable ({clients, deleteClient, changeStatus, startEdit}:TableProps){

  function handleDelete(id:number){
    
    deleteClient(id)
  }

  function handleChange(id:number, status:ClientStatus){
    changeStatus(id, status)

  }
  if (clients.length === 0){
    return(
      <div className="client-table-empty">
        <p>Клиентов нет</p>

      </div>
    )
  }

    return (
    <div className="client-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Почта</th>
            <th>Компания</th>
            <th>Статус</th>
            <th>Бюджет</th>
            <th>Создан</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
              {clients.map((el)=>{
                return (
                  <tr key={el.id}>
                    <td>{el.id}</td>
                    <td>{el.name}</td>
                    <td>{el.phone}</td>
                    <td>{el.email}</td>
                    <td>{el.company}</td>
                    <td><select 
                      value={el.status} 
                      className={`client-status-select status-${el.status}`} 
                      onChange={(event)=>handleChange(el.id, event.target.value as ClientStatus)}>
                      <option value='new'>Новый</option>
                      <option value='in_progress'>В работе</option>
                      <option value='client'>Клиент</option>
                      <option value='lost'>Потерян</option>
                      </select></td>
                    <td>{Number(el.budget).toLocaleString("ru-RU")} ₽</td>
                    <td>{el.createdAt}</td>
                    <td className="client-table-buttons">
                        <button className="client-table-edit-button" onClick={()=>startEdit(el)}><Pen size={18}/></button>
                        <button className="client-table-delete-button" onClick={()=>handleDelete(el.id)}><Trash2 size={18}/></button></td>
                  </tr>
                )
              })}
        </tbody>
      </table>
    </div>
    )

    
}
