import SlidePopupComponent from "../core/SlidePopupComponent";
import EButton from "../core/EButton";
import { useEffect, useState } from "react";
import {
    AdjustmentsHorizontalIcon,
    CloudArrowUpIcon,
    TrashIcon,
    XCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import axiosClient from "../../axios";
import makeMatrix from "../core/MakeMatrix.jsx";

export default function HallListItem({ hall, getHalls }) {
    // Открытие/Закрытие SlidePopupComponent для изменения зала
    const [change, setChange] = useState(false);
    // Открытие/Закрытие SlidePopupComponent для удаления зала
    const [del, setDel] = useState(false);

    // Состояния для изменения зала
    const [updatedHall, setUpdatedHall] = useState({
        name: hall.name,
        rows: hall.rows,
        seats: hall.seats,
    });

    // Состояние мест зала, для отпарвки в таблицу БД "Seats"
    // FIXME: Используется переменная вместо состояния useState
    // let halls_id = 0;

    // Состояние типа сидушки, по дефолту 1 = "Обычное"
    const [types_id, setTypes_id] = useState(1);

    const [vipSeats, setVipSeats] = useState();
    const [defaultSeats, setDefaultSeats] = useState();

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция изменения зала (корректировака данных -> удаление всех сидушек - добавление новых сидушек)
    const onSubmit = (event) => {
        event.preventDefault();

        // const payload = { ...updatedHall };
        axiosClient
            .put(`/halls/${hall.id}`, updatedHall)
            .then((response) => {
                // Получаем из ответа ID измененного зала (так как состояние не успевает отрабатывать)
                // halls_id = response.data.data.id;
                // Удавляем все сидушки с ID залом $halls_id
                deleteSeats(response.data.data.id);
                // Генерим новую матрицу сидушек и отправляем в БД
                postSeats(
                    Number(updatedHall.rows),
                    Number(updatedHall.seats),
                    types_id,
                    response.data.data.id
                );
                // Закрываем slider-popup
                setChange(false);
                // Заново перезагружаем из БД все залы
                getHalls();
            })
            .catch((err) => {
                if (err && err.response) {
                    // Записываем error в состояние
                    setError(err.response.data.message);
                }
                console.log(err, err.response);
            });
    };

    useEffect(() => {
        getCountSeats();
    }, [hall]);

    // Функция удаления всех сидушек при изменении зала
    const deleteSeats = (hall_id) => {
        axiosClient.delete(`/seats/${hall_id}`).then((response) => { });
    };

    // Функция создания матрицы сидушек и отправки ее в БД
    const postSeats = (rows, seats, types_id, halls_id) => {
        const matrixPayload = makeMatrix(rows, seats, types_id, halls_id);

        axiosClient.post("/seats", matrixPayload).catch((error) => {
            if (error.response) {
                setError({ __html: error.response.data.errors });
            }
            console.error(error);
        });
    };

    // Функция удаления зала
    const onClickDelete = (event) => {
        axiosClient.delete(`/halls/${hall.id}`).then((response) => {
            // Закрываем slider-popup
            setChange(false);
            // Заново перезагружаем из БД все фильмы
            getHalls();
        });
    };

    // Функция получения количества обычных мест, VIP мест
    const getCountSeats = () => {
        axiosClient.get(`/seats/vip/${hall.id}`).then(({ data }) => {
            setVipSeats(data);
        });
        axiosClient.get(`/seats/default/${hall.id}`).then(({ data }) => {
            setDefaultSeats(data);
        });
    };

    const toggleActive = () => {
        if (hall.isActive === 0) {
            axiosClient
                .put(`/halls/${hall.id}`, {isActive: 1})
                .then((response) => {
                    // Заново перезагружаем из БД
                    getHalls();
                })
        } else {
            axiosClient
                .put(`/halls/${hall.id}`, {isActive: 0})
                .then((response) => {
                    // Заново перезагружаем из БД
                    getHalls();
                })
        }
    }

    return (
        <>
            <section className="mb-4 flex h-auto">
                <div className="p-2 bg-[#F1EBE6]/95 rounded min-w-[40px] max-w-[40px] flex items-center justify-center">
                    <h2 className="text-xl font-bold">{hall.id}</h2>
                </div>
                <div className="flex flex-1 justify-between h-18 ml-2 p-2 bg-[#F1EBE6]/95 rounded">
                    <div className="flex">
                        <div className="w-auto">
                            <h2 className="flex text-sm font-light">
                                <div>Название зала:</div>
                                <div
                                    className={`bg-[#63536C] w-auto px-2 ml-2 text-center inline-block text-white rounded text-s border border-gray-500 font-medium`}
                                >
                                    {hall.name}
                                </div>
                            </h2>
                            <h2 className="flex text-sm font-light mt-1">
                                <div>Конфигурация зала:</div>
                                <div
                                    className={`bg-[#63536C] w-auto px-2 ml-2 text-center inline-block text-white rounded text-s border border-gray-500 font-medium`}
                                >
                                    {hall.rows} x {hall.seats}
                                </div>
                            </h2>
                        </div>
                        <div className="ml-6">
                            <h2 className="flex text-sm font-light">
                                <div>Количество обычных мест:</div>
                                <div
                                    className={`bg-[#63536C] w-auto px-2 ml-2 text-center inline-block text-white rounded text-s border border-gray-500 font-medium`}
                                >
                                    {defaultSeats ? defaultSeats.length : 0}
                                </div>
                            </h2>
                            <h2 className="flex text-sm font-light mt-1">
                                <div>Количество VIP мест:</div>
                                <div
                                    className={`bg-[#FFD700] w-auto px-2 ml-2 text-center inline-block text-black rounded text-s border border-gray-500 font-medium`}
                                >
                                    {vipSeats ? vipSeats.length : 0}
                                </div>
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        {hall.isActive
                            ?
                            <EButton color="danger" onClick={toggleActive}>
                                Закрыть продажи
                            </EButton>
                            :
                            <EButton color="green" onClick={toggleActive}>
                                Открыть продажи
                            </EButton>
                        }
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

            {/* Slide-Popup для ИЗМЕНЕНИЯ  фильма */}
            <SlidePopupComponent
                open={change}
                setOpen={setChange}
                title={`Изменение зала №` + hall.id}
            >
                {error && (
                    <div className="bg-red-500 text-white text-sm py-2 px-2 mb-1 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} action="#" method="POST">
                    {/* Название зала */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Название зала
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={updatedHall.name}
                                onChange={(event) =>
                                    setUpdatedHall({
                                        ...updatedHall,
                                        name: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Название зала */}

                    {/* Количество рядов X Количество мест в ряду */}
                    <div className="flex items-end">
                        {/* Количество рядов */}
                        <div className="mt-2">
                            <label
                                htmlFor="rows"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Количество рядов
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    id="rows"
                                    name="rows"
                                    value={updatedHall.rows}
                                    onChange={(event) =>
                                        setUpdatedHall({
                                            ...updatedHall,
                                            rows: event.target.value,
                                        })
                                    }
                                    className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* Количество рядов */}
                        <XMarkIcon className="w-6 h-6 mb-1.5 mx-6"></XMarkIcon>
                        {/* Количество мест в ряду */}
                        <div className="mt-2">
                            <label
                                htmlFor="seats"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Количество мест
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    id="seats"
                                    name="seats"
                                    value={updatedHall.seats}
                                    onChange={(event) =>
                                        setUpdatedHall({
                                            ...updatedHall,
                                            seats: event.target.value,
                                        })
                                    }
                                    className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* Количество мест в ряду */}
                    </div>

                    <div className="mt-2">
                        <label
                            htmlFor="config"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        ></label>
                    </div>

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
            {/* Slide-Popup для ИЗМЕНЕНИЯ  фильма */}

            {/* Slide-Popup для УДАЛЕНИЯ  фильма */}
            <SlidePopupComponent
                open={del}
                setOpen={setDel}
                title="Удаление фильма"
            >
                <div className="block text-sm font-medium leading-6 text-gray-900">
                    Вы действительно хотите удалить зал{" "}
                    <div
                        className={`bg-[#63536C] w-auto px-2 ml-2 text-center inline-block text-white rounded text-s border border-gray-500 font-medium`}
                    >
                        №{hall.id} ?
                    </div>
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
            {/* Slide-Popup для УДАЛЕНИЯ  фильма */}
        </>
    );
}
