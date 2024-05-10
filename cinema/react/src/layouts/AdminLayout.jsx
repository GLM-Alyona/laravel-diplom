import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import SidebarComponent from "../components/admin/SidebarComponent";
import { useEffect } from "react";
import axiosClient from "../axios";

export default function AdminLayout() {
    const { currentUser, userToken, setCurrentUser, setUserToken} = useStateContext();

    if (!userToken) {
        return <Navigate to="/auth/signin" />;
    }

    // При обновлении страницы делаем запрос в БД за информацией администратора.
    useEffect(() => {
        axiosClient.get('/current').then(({data}) => {
            setCurrentUser(data)
        })
    }, [])

    return (
        <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
            <SidebarComponent currentUser={currentUser} />
            <div className="p-7 flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
}
