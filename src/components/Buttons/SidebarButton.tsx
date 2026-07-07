import {
    User,
    ClipboardList,
    Calendar,
    ChartPie,
    Settings,
    ListTodo
} from "lucide-react";
export default function SidebarButton (){
    const menu = [
        {icon: User, text: "Клиенты"},
        {icon: ClipboardList, text: "Сделки"},
        {icon: ListTodo, text: "Задачи"},
        {icon: Calendar, text: "Календарь"},
        {icon: ChartPie, text: "Отчёты"},
        {icon: Settings, text: "Настройки"},
    ]
    return (
        <div className="sidebar-button-div">
                {menu.map((item)=>{
                    const Icon = item.icon                    
                    return (
                        <button 
                        key={item.text} 
                        className={`sidebar-button ${item.text === "Клиенты"? "sidebar-button-active": ""} `}>
                            <Icon className="sidebar-icon" size={22}/>
                            <span>{item.text}</span>
                        </button>
                    )
                })}
        </div>
    )
}