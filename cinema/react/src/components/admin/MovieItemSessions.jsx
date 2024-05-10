import SlidePopupComponent from "../core/SlidePopupComponent";
import getSessionInText from "../core/getSessionInText";
import getSessionInMinutes from "../core/getSessionInMinutes";
import getBusyTime from "../core/getBusyTime";
import checkBusyTimeline from "../core/checkBusyTimeline";
import EButton from "../core/EButton";
import { useState } from "react";
import {
    XCircleIcon,
    CloudArrowUpIcon,
} from "@heroicons/react/24/outline";
import axiosClient from "../../axios";

export default function MovieItemSession({ movie, hall, sessions, getSessions }) {
    // Открытие/Закрытие SlidePopupComponent для изменения фильма
    const [add, setAdd] = useState(false);

    // Состояния хранения данных сеанса
    const [session, setSession] = useState({
        sessionStart: ""
    });

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Отправка post-request с новым сеансом
    const onSubmit = (event) => {
        event.preventDefault();

        const payload = {
            movies_id: `${movie.id}`,
            halls_id: `${hall.id}`,
            sessionStart: `${session.sessionStart}`,
            duration: movie.duration,
            sessionEnd: `${getSessionInText(session.sessionStart, movie.duration)}`
        }

        // Проверка на занятое время
        if (checkBusyTimeline(sessions, payload)) {
            axiosClient
                .post("/sessions", payload)
                .then((response) => {
                    // Закрываем slider-popup
                    setAdd(false);
                    // Заново перезагружаем всю информацию о всех сессиях
                    getSessions();
                })
                .catch((error) => {
                    if (error && error.response) {
                        setError(error.response.data.message);
                    }
                    console.error(error, error.response);
                });
        } else {
            setError("Выбранное время пересекается с дургими сеансами!");
            console.error(error);
        }


    };

    return (
        <>
            <section className="my-2 mr-2 flex h-auto ">
                <div className="flex ml-2 p-2 bg-[#F1EBE6]/95 rounded w-[230px] h-[75px] cursor-pointer" onClick={() => setAdd(true)}>
                    <img
                        className="max-h-full max-w-[45px]"
                        alt={movie.title}
                        src={movie.img_url}
                    ></img>

                    <div className="flex flex-col ml-2">
                        <h2 className="text-xs font-medium">
                            {movie.title}
                        </h2>
                        <p className="mt-0.5">
                            <span className={`bg-[#63536C] w-auto px-0.5 text-center inline-block text-white rounded text-xs border border-gray-500 font-medium`}>{movie.duration} минут</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Slide-Popup для ДОБАВЛЕНИЯ сеанса */}
            <SlidePopupComponent
                open={add}
                setOpen={setAdd}
                title={`Установка сеанса для фильма №` + movie.id}
            >
                {error && (
                    <div className="bg-red-500 text-white text-sm py-2 px-2 mb-3 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} action="#" method="POST">

                    {/* Информационное поле о выбранном зале */}
                    <div className="flex items-center mb-5">
                        <label
                            htmlFor="name"
                            className="block w-[110px] mr-5 text-sm font-medium text-gray-900 leading-none"
                        >
                            Выбранный зал (заблокировано):
                        </label>
                        <input
                            type="text"
                            id="hallname"
                            name="hallname"
                            placeholder={hall.id}
                            className="block w-[120px] bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#89639e] sm:text-sm sm:leading-6"
                        />
                    </div>
                    {/* Информационное поле о выбранном зале */}

                    {/* Установка времени сеанса */}
                    <div className="flex items-center mb-5">
                        <label
                            htmlFor="name"
                            className="block w-[110px] mr-5 text-sm font-medium leading-6 text-gray-900"
                        >
                            Время начала:
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="time"
                            id="session"
                            name="session"
                            value={session.time}
                            onChange={(event) =>
                                setSession({
                                    sessionStart: event.target.value,
                                })
                            }
                            className="block w-[120px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                        />
                    </div>
                    {/* Установка времени сеанса */}

                    <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                        <EButton submit color="regular">
                            <CloudArrowUpIcon className="h-6 w-6 mr-2" />
                            Сохранить
                        </EButton>
                        <EButton
                            color="gray"
                            onClick={() => setAdd(false)}
                        >
                            <XCircleIcon className="h-6 w-6 mr-2" />
                            Отменить
                        </EButton>
                    </div>
                </form>
            </SlidePopupComponent>
            {/* Slide-Popup для ДОБАВЛЕНИЯ сеанса */}
        </>
    );
}
