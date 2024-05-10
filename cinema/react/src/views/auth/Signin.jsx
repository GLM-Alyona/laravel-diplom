import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios";
import { useStateContext } from "../../context/ContextProvider";

export default function Signin() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState({ __html: "" });

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });

        // Request в сторону контрлллера Laravel
        axiosClient
            .post("/signin", {
                email,
                password,
            })
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserToken(data.token);
            })
            .catch((error) => {
                if (error.response) {
                    setError({ __html: error.response.data.errors });
                }
                console.error(error);
            });
    };

    return (
        <div className="p-5 bg-[#eae9eb]">
            {error.__html && (
                <div
                    className="bg-red-500 rounded py-2 px-3 text-white"
                    dangerouslySetInnerHTML={error}
                ></div>
            )}
            <form
                onSubmit={onSubmit}
                className="space-y-6"
                action="#"
                method="POST"
            >
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        E-mail
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Пароль
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-[#63536C] px-3 py-1.5 text-m font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 active:bg-[#89639e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Вход
                    </button>
                </div>
            </form>
            <p className="mt-7 text-center text-sm text-gray-500">
                Не зарегистрированы?{" "}
                <Link
                    to="/auth/signup"
                    className="text-[#63536C] font-semibold hover:text-[#89639e]"
                >
                    Регистрация
                </Link>
            </p>
        </div>
    );
}
