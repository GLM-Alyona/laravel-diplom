import { NavLink, useNavigate } from "react-router-dom";
import {
    UserIcon,
    ChevronLeftIcon,
    FilmIcon,
    SquaresPlusIcon,
    CalendarDaysIcon,
    UsersIcon,
    StarIcon,
    CurrencyDollarIcon,
    ArrowLeftOnRectangleIcon,
    RectangleGroupIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import LogoAdminComponent from "./LogoAdminComponent";
import axiosClient from "../../axios";
import { useStateContext } from "../../context/ContextProvider";

export default function SidebarComponent() {
    const { currentUser, userToken, setCurrentUser, setUserToken } =
        useStateContext();

    // Запрос в сторону контролллера Laravel для выхода пользвоателя. Также затираем все State по пользователю.
    const logout = (event) => {
        event.preventDefault();

        axiosClient
            .post("/signout")
            .then((res) => {
                setCurrentUser({});
                setUserToken(null);
            });

        navigate(`/`)
    };

    const navigate = useNavigate();

    // Навигация
    const navigation = [
        {
            name: "Главная",
            icon: <StarIcon className="block w-6 h-7" />,
            to: "/admin/dashboard",
        },
        // Страница отключена до лучших времен.
        // {
        //     name: "Типы мест",
        //     icon: <SquaresPlusIcon className="block w-6 h-7" />,
        //     to: "/admin/types",
        // },
        {
            name: "Залы",
            icon: <RectangleGroupIcon className="block w-6 h-7" />,
            to: "/admin/halls",
        },
        {
            name: "Настройка залов",
            icon: <Cog6ToothIcon className="block w-6 h-7" />,
            to: "/admin/config",
        },
        {
            name: "Цены",
            icon: <CurrencyDollarIcon className="block w-6 h-7" />,
            to: "/admin/prices",
        },
        {
            name: "Фильмы",
            icon: <FilmIcon className="block w-6 h-7" />,
            to: "/admin/movies",
        },
        {
            name: "Сеансы",
            icon: <CalendarDaysIcon className="block w-6 h-7" />,
            to: "/admin/sessions",
        },
        {
            name: "Администраторы",
            icon: <UsersIcon className="block w-6 h-7" />,
            to: "/admin/users",
        },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    // Для скрытия Sidebar
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${open ? "w-[18rem]" : "w-20"
                } duration-300 flex flex-col justify-between bg-[#63536C] text-white`}
        >
            <div className="flex justify-evenly items-center relative">
                <div
                    className={`${!open && "invisible"
                        } h-68 p-2 flex flex-col items-center`}
                >
                    <LogoAdminComponent />
                </div>
                <ChevronLeftIcon
                    className={`block w-10 h-10 bg-[#89639e] p-2 rounded-full absolute top-4 -right-5 border-2 border-gray-700 cursor-pointer ${!open && "rotate-180"
                        }`}
                    onClick={() => setOpen(!open)}
                />
            </div>

            <div className="flex-1 flex flex-col p-4 space-y-2">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.to}
                        icon={item.icon}
                        className={({ isActive }) =>
                            classNames(
                                isActive
                                    ? "bg-[#89639e] text-white transition duration-0"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white transition duration-500",
                                "rounded-md px-2 py-1"
                            )
                        }
                    >
                        <div className={`flex items-center text-base font-medium space-x-3 + ${!open && "justify-center"}`}>
                            <div>{item.icon}</div>
                            <div className={`${!open && "hidden"}`}>
                                {item.name}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>

            <div className="px-4 flex justify-evenly">
                <div
                    className={`${!open && "hidden"
                        } flex flex-col justify-evenly w-[155px]`}
                >
                    <div className="text-base font-medium leading-none text-white">
                        {currentUser.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                        {currentUser.email}
                    </div>
                </div>
                <UserIcon className="block w-10 h-10 p-2 rounded-full text-white cursor-pointer transition duration-500 hover:bg-gray-700 active:bg-[#89639e] " />
            </div>

            <div className="p-4 flex">
                <div
                    className="flex-1 text-red-300 transition duration-500 hover:text-red-400 hover:bg-gray-700 text-lg px-3 py-2 space-x-3 font-medium inline-flex items-center focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center cursor-pointer active:bg-[#89639e] active:text-white active:duration-0"
                    onClick={(event) => logout(event)}
                >
                    <ArrowLeftOnRectangleIcon className="block w-6 h-7" />
                    <div className={`${!open && "hidden"}`}>Выход</div>
                </div>
            </div>
        </div>
    );
}
