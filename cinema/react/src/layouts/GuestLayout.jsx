import { Link, Outlet } from "react-router-dom";
import LogoComponent from "../components/guest/LogoComponent";

export default function GuestLayout() {
    return (
        <div className="min-h-screen bg-guest bg-cover">
            <div className="mx-auto pb-16 w-[990px]">
                <header className="p-4 flex items-center justify-between">
                    <LogoComponent />
                    <Link
                        to="/auth/signin"
                        className="block text-white text-m font-semibold hover:text-[#89639e]"
                    >
                        Вход администратора
                    </Link>
                </header>
                <Outlet />
            </div>
        </div>
    );
}
