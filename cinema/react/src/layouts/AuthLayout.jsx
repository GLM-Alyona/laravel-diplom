import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import LogoAdminComponent from "../components/admin/LogoAdminComponent";

export default function AuthLayout() {
    const { userToken } = useStateContext();

    if (userToken) {
        return <Navigate to="/admin/dashboard" />;
    }

    return (
        <div className="mx-auto mt-[5%] w-[400px] bg-gray-300">
            <header className="p-2 flex flex-col items-center bg-[#63536C]">
                <LogoAdminComponent />
            </header>
            <Outlet />
        </div>
    );
}
