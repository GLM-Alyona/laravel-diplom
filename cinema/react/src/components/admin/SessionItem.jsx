import SlidePopupComponent from "../core/SlidePopupComponent";
import EButton from "../core/EButton";
import { useState } from "react";
import {
    XCircleIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import axiosClient from "../../axios";

export default function MovieItemSession({ session, movies, getSessions, pixelStart }) {
    // Открытие/Закрытие SlidePopupComponent удаления сеанса
    const [del, setDel] = useState(false);

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Отправка post-request с удалением сеанса
    const onClickDelete = (event) => {
        axiosClient.delete(`/sessions/${session.id}`).then((response) => {
            // Закрываем slider-popup
            setDel(false);
            // Заново перезагружаем всю информацию о всех сессиях
            getSessions();
        });
    };

    return (
        <>
            {/* Генерируем блоки из сеансов и расставляем по оси */}
            {movies.map((movie) => (
                movie.id == session.movies_id ? (
                    <>
                        <div style={{
                            position: `absolute`,
                            width: `${movie.duration * 100 / 1620}%`,
                            top: 0,
                            left: `${pixelStart * 100 / 1620}%`
                        }}
                            className="flex flex-col items-center justify-center p-0.5 h-[50px] bg-[#63536C]/95 text-[7.5px] text-white mr-[1px] rounded cursor-pointer border-black border" onClick={() => setDel(true)}>
                            <span className="font-medium">{movie.title}</span>
                            <span className="">{session.duration} мин.</span>
                            <div className="absolute -bottom-3 flex w-full justify-between">
                                <div className="text-black">{session.sessionStart.substr(0, 5)}</div>
                                <div className="text-black">{session.sessionEnd.substr(0, 5)}</div>
                            </div>

                        </div>


                        {/* Slide-Popup для УДАЛЕНИЯ сеанса */}
                        <SlidePopupComponent
                            open={del}
                            setOpen={setDel}
                            title={`Удаление сеанса`}
                        >
                            {error && (
                                <div className="bg-red-500 text-white text-sm py-2 px-2 mb-1 rounded">
                                    {error}
                                </div>
                            )}

                            <div className="block text-sm font-medium leading-6 text-gray-900">
                                <span>Вы действительно хотите удалить сеанс фильма</span>
                                <span className={`bg-[#63536C] w-auto px-0.5 mt-0.5 text-center inline-block text-white rounded text-xs border border-gray-500 font-medium`}>{movie.title}</span>
                                <span> на время </span>
                                <span className={`bg-[#63536C] w-auto px-0.5 mt-1 text-center inline-block text-white rounded text-xs border border-gray-500 font-medium`}>{session.sessionStart.slice(0, -3)}</span>
                                <span> ?</span>
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
                        {/* Slide-Popup для УДАЛЕНИЯ сеанса */}
                    </>
                ) : ""
            ))}
        </>
    );
}
