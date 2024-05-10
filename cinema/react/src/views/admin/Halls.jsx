import PageComponent from "../../components/admin/PageComponent";
import SlidePopupComponent from "../../components/core/SlidePopupComponent";
import HallListItem from "../../components/admin/HallListItem";
import EButton from "../../components/core/EButton";
import { useEffect, useState } from "react";
import {
    PlusCircleIcon,
    XCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import axiosClient from "../../axios.js";
import PaginationComponent from "../../components/admin/PaginationComponent";
import makeMatrix from "../../components/core/MakeMatrix.jsx";

export default function Halls() {
    // Состояние общего переченя залов для загрузки из БД
    const [halls, setHalls] = useState([]);

    // Состояние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Состояние для meta, полученной с ответом на запрос данных из БД (для pagination)
    const [meta, setMeta] = useState({});

    // Состояние открытия/закрытия слайдера (компонент SlidePopupComponent)
    const [open, setOpen] = useState(false);

    // Состояние нового зала для добавления в таблицу БД "Halls"
    const [hall, setHall] = useState({
        name: "",
        rows: "",
        seats: "",
    });

    // Состояние типа сидушки, по дефолту 1 = "Обычное"
    const [types_id, setTypes_id] = useState(1);

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения актуальных URL для пагинации из БД (для компонента PaginationComponent)
    const getHalls = (url) => {
        url = url || "/halls";
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
            setHalls(data.data);
            setMeta(data.meta);
            setLoading(false);
        });
    };

    // При каждом обновлении страницы обновляем URL страниц пагинации (для компонента PaginationComponent)
    useEffect(() => {
        getHalls();
    }, []);

    // Callback для пагинации (компонент PaginationComponent)
    const onPageClick = (link) => {
        getHalls(link.url);
    };

    // Отправка request в БД с новым залом
    const onSubmit = (event) => {
        event.preventDefault();

        axiosClient
            .post("/halls", hall)
            .then((response) => {
                // Получаем ID нового зала.
                // Генерируем матрицу сидушек и отправляем в таблицу Seats
                postSeats(
                    Number(hall.rows),
                    Number(hall.seats),
                    types_id,
                    response.data.data.id
                );
                // Отправляем нулевые цены за сидушки в таблицу Prices
                postPrices(response.data.data.id);
                // Закрываем slider-popup
                setOpen(false);
                // Перезагружаем страницу
                getHalls();
                // Обнуляем поля в форме создания нового зала
                setHall({
                    name: "",
                    rows: "",
                    seats: "",
                });
            })
            .catch((error) => {
                if (error.response) {
                    setError({ __html: error.response.data.errors });
                }
                console.error(error);
            });
    };

    // Функция создания матрицы сидушек и отправки ее в таблицу Seats
    const postSeats = (rows, seats, types_id, halls_id) => {
        const matrixPayload = makeMatrix(rows, seats, types_id, halls_id);

        axiosClient.post("/seats", matrixPayload).catch((error) => {
            console.error(error);
        });
    };

    // Функция заполнения цен в таблице Prices присоздании нового зала
    const postPrices = (halls_id) => {
        const payload = [];
        // Создаем наполнение запроса из нулевых цен
        for (let i = 1; i < 3; i++) {
            payload.push({
                halls_id: halls_id,
                types_id: i,
                price: 0,
            });
        }

        axiosClient.post("/prices", payload).catch((error) => {
            console.error(error);
        });
    };

    return (
        <PageComponent
            title="Управление залами"
            button={
                <EButton color="regular" onClick={() => setOpen(true)}>
                    <PlusCircleIcon className="h-6 w-6" />
                    <div className="hidden md:ml-2 md:block">Добавить зал</div>
                </EButton>
            }
        >
            {loading && (
                <svg aria-hidden="true" className="mx-auto my-24 block w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-violet-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            )}

            {!loading && (
                <div>
                    {halls
                        .slice(0)
                        .reverse()
                        .map((hall) => (
                            <HallListItem
                                hall={hall}
                                getHalls={getHalls}
                                key={hall.id}
                            />
                        ))}
                    <PaginationComponent
                        meta={meta}
                        onPageClick={onPageClick}
                    />
                </div>
            )}

            {/* Slide-Popup для добавления нового зала */}
            <SlidePopupComponent
                open={open}
                setOpen={setOpen}
                title="Добавление нового зала"
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
                            Название зала{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={hall.name}
                                onChange={(event) =>
                                    setHall({
                                        ...hall,
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
                                    value={hall.rows}
                                    onChange={(event) =>
                                        setHall({
                                            ...hall,
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
                                    value={hall.seats}
                                    onChange={(event) =>
                                        setHall({
                                            ...hall,
                                            seats: event.target.value,
                                        })
                                    }
                                    className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* Количество мест в ряду */}
                    </div>
                    {/* Количество рядов X Количество мест в ряду */}

                    <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                        <EButton submit>
                            <PlusCircleIcon className="h-6 w-6 mr-2" />
                            Добавить
                        </EButton>

                        <EButton color="gray" onClick={() => setOpen(false)}>
                            <XCircleIcon className="h-6 w-6 mr-2" />
                            Отменить
                        </EButton>
                    </div>
                </form>
            </SlidePopupComponent>
        </PageComponent>
    );
}
