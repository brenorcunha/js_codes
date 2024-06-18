import { Outlet } from "react-router-dom";

export default function Dashboard(){
    return (
        <main>
            <header>
            <Outlet />
            </header>
            <h2>Dashboard</h2>
        </main>
    )
}