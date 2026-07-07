import type { StatsProps } from "../types/StatsProps";
import {
    Users,
    UserPlus,
    BriefcaseBusiness,
    UserCheck,
    UserX,
    BadgeRussianRuble, 
} from "lucide-react"
export default function ClientStats({clients}: StatsProps){
    const newClientsCount =  clients.filter((client)=>client.status === 'new').length
    const inProgressCount = clients.filter((client)=>client.status === 'in_progress').length
    const clientsCount = clients.filter((client)=>client.status === 'client').length
    const lostCount = clients.filter((client)=>client.status === 'lost').length
    const totalBudget = clients.reduce((sum, client)=>sum+Number(client.budget), 0)
    
    const cards = [
        {icon: Users, title:"Всего клиентов:", value: clients.length, variant: "blue"}, 
        {icon: UserPlus, title:"Новых:", value: newClientsCount, variant: "green"}, 
        {icon: BriefcaseBusiness, title:"В работе:", value: inProgressCount, variant: "yellow"}, 
        {icon: UserCheck, title:"Клиенты:", value: clientsCount, variant: "brown"}, 
        {icon: UserX, title:"Потеряны:", value: lostCount, variant: "red"}, 
        {icon: BadgeRussianRuble, title:"Общий бюджет", value: totalBudget, variant: "purple"},
    ]
    return (
        <section className="client-stats">
            <h5>Статистика</h5>
            <div className="client-stats-params">
                {cards.map((item)=>{
                    const Icon = item.icon
                    return (
                        <article key={item.title} className="client-stats-params-card">
                            <div className={`client-stats-params-card-icon-${item.variant}`}>
                                <Icon size={40}/>
                            </div>
                            <div className="client-stats-params-text">
                                <p>{item.title}</p>
                                <strong>{item.value}</strong>
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
