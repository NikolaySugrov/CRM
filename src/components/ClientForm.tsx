import { useState } from "react"
import type { FormProps } from "../types/FormProps"
import type { Client, ClientStatus } from "../types/Client"


export default function ClientForm({addClient}:FormProps){
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [company, setCompany] = useState<string>('')
    const [status, setStatus] = useState<ClientStatus>('new')
    const [budget, setBudget] = useState<string>("")
    const [error, setError] = useState<string>("")


    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault()
        if (!name.trim() ||
            !phone.trim() ||
            !email.trim() ||
            !company.trim() ||
            !budget.trim()
        ){ 
            setError("Заполните все поля")
            return
        }
        if(Number.isNaN(Number(budget))){
            setError("Бюджет должен быть числом")
            return

        }
        


        const newClient:Client = {
        id: Date.now(),
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        company: company.trim(),
        status: status,
        budget: budget.trim(),
        createdAt: new Date().toLocaleDateString()

        }
        setError("")


        addClient(newClient)
        setName('')
        setPhone('')
        setEmail('')
        setCompany('')
        setStatus('new')
        setBudget('')

    }
    return(
        <section className="client-form">
            <h5>Добавить клиента</h5>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="name">Имя</label>
                    <input id="name" type="text" placeholder="Введите имя" value={name} onChange={(event)=>setName(event.target.value)}/>

                </div>
                <div className="form-field">
                    <label htmlFor="phone">Телефон</label>
                    <input id="phone" type="text" placeholder="Введите телефон" value={phone} onChange={(event)=>setPhone(event.target.value)}/>
                </div>

                <div className="form-field">
                    <label htmlFor="email">Почта</label>
                    <input id="email" type="text" placeholder="Введите почту" value={email} onChange={(event)=>setEmail(event.target.value)}/>

                </div>
                <div className="form-field">
                    <label htmlFor="company">Название организации</label>
                    <input id="company" type="text" placeholder="Введите компанию" value={company} onChange={(event)=>setCompany(event.target.value)}/>
                </div>
                <div className="form-field">
                    <label htmlFor="status">Статус</label>
                    <select id="status" value={status} onChange={(event)=>setStatus(event.target.value as ClientStatus)}>
                        <option value='new'>Новый</option>
                        <option value='in_progress'>В работе</option>
                        <option value='client'>Клиент</option>
                        <option value='lost'>Потерян</option>
                    </select>
                </div>
                
                <div className="form-field">
                    <label htmlFor="budget">Бюджет</label>
                    <input id="budget" type="text" placeholder="Введите бюджет" value={budget} onChange={(event)=>setBudget(event.target.value)}/>
                </div>
                <div className="form-field">
                    <button type="submit">Отправить</button>
                    {error && <p className="client-form-error">{error}</p>}

                </div>
            </form>
        </section>
    )

}