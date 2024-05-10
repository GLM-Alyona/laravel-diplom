import SlidePopupComponent from "../core/SlidePopupComponent";
import EButton from "../core/EButton";
import { useState } from "react";
import {
    AdjustmentsHorizontalIcon,
    CloudArrowUpIcon,
    TrashIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";
import axiosClient from "../../axios";

export default function UserItem({ user, getUsers }) {

    // Открытие/Закрытие SlidePopupComponent (для изменения пользователя)
    const [change, setChange] = useState(false);
    // Открытие/Закрытие SlidePopupComponent (для удаления пользователя)
    const [del, setDel] = useState(false);
    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Состояния для изменения пользователя
    const [updatedUser, setUpdatedUser] = useState({
        name: user.name,
        password: "",
        password_confirmation: ""
    });

    // Отправка put-request в БД c изменениями зала
    const onSubmit = (event) => {
        event.preventDefault();

        const payload = { ...updatedUser };
        axiosClient
            .put(`/users/${user.id}`, payload)
            .then((response) => {
                console.log(response);
                // Закрываем slider-popup
                setChange(false);
                // Заново перезагружаем из БД все залы
                getUsers();
            })
            .catch((err) => {
                if (err && err.response) {
                    // Записываем error в состояние
                    setError(err.response.data.message);
                }
                console.log(err, err.response);
            });
    };

    // Функция удаления зала
    const onClickDelete = (event) => {
        axiosClient.delete(`/users/${user.id}`).then((response) => {
            // Закрываем slider-popup
            setChange(false);
            // Заново перезагружаем из БД все фильмы
            getUsers();
        });
    };


    return (
        <>
            <section className="mb-4 flex h-auto">
                <div className="flex flex-1 justify-between h-18 ml-2 p-2 bg-[#F1EBE6]/95 rounded">
                    <div className="flex items-center">
                        <h2 className="text-sm font-light">
                            ID: {" "}
                            <div className={`bg-[#63536C] w-auto px-2 text-center inline-block text-white rounded text-s border border-gray-500 font-medium`}>{user.id}</div>
                        </h2>
                        <h2 className="text-sm font-light ml-3">
                            Имя: {" "}
                            <div className={`bg-[#63536C] w-auto px-2 text-center inline-block text-white rounded text-s border border-gray-500 font-medium`}>{user.name}</div>
                        </h2>
                        <h2 className="text-sm font-light ml-3">
                            Email: {" "}
                            <div className={`bg-[#63536C] w-auto px-2 text-center inline-block text-white rounded text-s border border-gray-500 font-medium`}>{user.email}</div>
                        </h2>
                    </div>
                    <div className="flex items-center">
                        <EButton circle onClick={() => setChange(true)}>
                            <AdjustmentsHorizontalIcon className="w-6 h-7" />
                        </EButton>
                        <EButton
                            circle
                            color="danger"
                            onClick={() => setDel(true)}
                        >
                            <TrashIcon className="w-6 h-7" />
                        </EButton>
                    </div>
                </div>
            </section>

            {/* Slide-Popup для ИЗМЕНЕНИЯ пользователя */}
            <SlidePopupComponent
                open={change}
                setOpen={setChange}
                title={`Изменение пользователя №` + user.id}
            >
                {error && (
                    <div className="bg-red-500 text-white text-sm py-2 px-2 mb-1 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} action="#" method="POST">
                    {/* Имя пользователя */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Имя пользователя: {" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">

                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={updatedUser.name}
                                onChange={(event) =>
                                    setUpdatedUser({
                                        ...updatedUser,
                                        name: event.target.value,
                                    })
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#89639e] sm:text-sm sm:leading-6"
                                placeholder="Имя"
                            />
                        </div>
                    </div>
                    {/* Имя пользователя */}

                    {/* Email пользователя */}
                    <div className="mt-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email (изменить нельзя):{" "}
                        </label>
                        <div className="mt-2">

                            <input
                                id="email"
                                name="email"
                                type="email"
                                readOnly
                                value={user.email}
                                className="block w-full bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#89639e] sm:text-sm sm:leading-6"
                                placeholder="E-mail"
                            />

                        </div>
                    </div>
                    {/* Email пользователя */}

                    {/* Пароль */}
                    <div className="mt-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Пароль:{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">

                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={updatedUser.password}
                                onChange={(event) =>
                                    setUpdatedUser({
                                        ...updatedUser,
                                        password: event.target.value,
                                    })
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#89639e] sm:text-sm sm:leading-6"
                                placeholder="Пароль"
                            />
                        </div>
                    </div>
                    {/* Пароль */}

                    {/* Повтор пароля */}
                    <div className="mt-2">
                        <label
                            htmlFor="password-confirmation"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Повтор пароля:{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">

                            <input
                                id="password-confirmation"
                                name="password_confirmation"
                                type="password"
                                required
                                value={updatedUser.password_confirmation}
                                onChange={(event) =>
                                    setUpdatedUser({
                                        ...updatedUser,
                                        password_confirmation: event.target.value,
                                    })
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#89639e] sm:text-sm sm:leading-6"
                                placeholder="Повтор пароля"
                            />
                        </div>
                    </div>
                    {/* Повтор пароля */}

                    <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                        <EButton submit color="regular">
                            <CloudArrowUpIcon className="h-6 w-6 mr-2" />
                            Изменить
                        </EButton>
                        <EButton color="gray" onClick={() => setChange(false)}>
                            <XCircleIcon className="h-6 w-6 mr-2" />
                            Отменить
                        </EButton>
                    </div>
                </form>
            </SlidePopupComponent>
            {/* Slide-Popup для ИЗМЕНЕНИЯ пользователя */}

            {/* Slide-Popup для УДАЛЕНИЯ пользователя */}
            <SlidePopupComponent
                open={del}
                setOpen={setDel}
                title="Удаление пользователя"
            >
                <div className="block text-sm font-medium leading-6 text-gray-900">
                    Вы действительно хотите удалить пользователя{" "}
                    <div className={`bg-[#63536C] w-auto p-1 text-center inline-block text-white rounded text-xs border border-gray-500 font-medium`}>№{user.id}</div>?
                </div>

                <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                    <EButton color="danger" onClick={onClickDelete}>
                        <TrashIcon className="h-6 w-6 mr-2" />
                        Удалить
                    </EButton>
                    <EButton color="gray" onClick={() => setDel(false)}>
                        <XCircleIcon className="h-6 w-6 mr-2" />
                        Отменить
                    </EButton>
                </div>
            </SlidePopupComponent>
            {/* Slide-Popup для УДАЛЕНИЯ пользователя */}
        </>
    )
}
