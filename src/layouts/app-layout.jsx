import { Outlet } from "react-router-dom"
import Header from "../components/header";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header/>
        <Outlet />
      </main>

      <div className="p-10 text-center bg-gray mt-10">Made with by 💗 vanshikaRaj11</div>
    </div>
  );
}

export default AppLayout
