import { Outlet } from "react-router-dom";

export default function Home() {
    return (
      <section>
        <header>
          < Outlet />
        </header>
        <h2>Store</h2>
        <p>Be welcome to our store.</p>
      </section>
    )
  }