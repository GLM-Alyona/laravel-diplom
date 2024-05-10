import { useEffect, useState } from "react";
import PageComponent from "../../components/admin/PageComponent";
import EButton from "../../components/core/EButton";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import SlidePopupComponent from "../../components/core/SlidePopupComponent";
import axiosClient from "../../axios";
import PaginationComponent from "../../components/admin/PaginationComponent";
import TypeItem from "../../components/admin/TypeItem";

export default function Types() {
    // Состояние для загрузки из БД общего списка типов мест
    const [types, setTypes] = useState([]);

    // Соятоние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Соятоние для meta, полученной с ответом на запрос данных из БД (для pagination)
    const [meta, setMeta] = useState({});

    // Состояния для открытия/закрытия в SlidePopupComponent
    const [open, setOpen] = useState(false);

    // Состояния для добавления нового типа места
    const [newType, setNewType] = useState({
        type: "",
        color: "63536C",
    });

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения актуальных URL для пагинации из БД (для компонента PaginationComponent)
    const getTypes = (url) => {
        url = url || "/types";
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
            setTypes(data.data);
            setMeta(data.meta);
            setLoading(false);
        });
    };

    // При каждом обновлении страницы обновляем URL страниц пагинации (для компонента PaginationComponent)
    useEffect(() => {
        getTypes();
    }, []);

    // Callback для пагинации (компонент PaginationComponent)
    const onPageClick = (link) => {
        getTypes(link.url);
    };

    // Отправка request в БД с новым типом места
    const onSubmit = (event) => {
        event.preventDefault();

        const payload = { ...newType };
        axiosClient
            .post("/types", payload)
            .then((response) => {
                console.log(response);
                // Закрываем slider-popup
                setOpen(false);
                // Перезагружаем страницу
                getTypes();
            })
            .catch((err) => {
                if (err && err.response) {
                    // Записываем error в состояние
                    setError(err.response.data.message);
                }
                console.log(err, err.response);
            });
    };

    return (
        <PageComponent
            title="Настройка мест"
            button={
                <EButton color="regular" onClick={() => setOpen(true)}>
                    <PlusCircleIcon className="h-6 w-6" />
                    <div className="hidden md:ml-2 md:block">
                        Добавить место
                    </div>
                </EButton>
            }
        >
            {loading && (
                <svg aria-hidden="true" className="mx-auto my-8 block w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-violet-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            )}

            {!loading && (
                <div>
                    {types.map((type) => (
                        <TypeItem type={type} getTypes={getTypes} key={type.id} />
                    ))}
                    <PaginationComponent
                        meta={meta}
                        onPageClick={onPageClick}
                    />
                </div>
            )}

            {/* Slide-Popup для ДОБАВЛЕНИЯ нового типа места */}
            <SlidePopupComponent
                open={open}
                setOpen={setOpen}
                title="Добавление нового места"
            >
                <form onSubmit={onSubmit} action="#" method="POST">
                    {/* Название типа места */}
                    <div>
                        <label
                            htmlFor="type"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Название типа места{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="type"
                                name="type"
                                value={newType.type}
                                onChange={(event) =>
                                    setNewType({
                                        ...newType,
                                        type: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Название типа места */}

                    {/* Цвет места */}
                    <div className="mt-2">
                        <label
                            htmlFor="color"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Цвет места (HEX 6 символов)
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="color"
                                name="color"
                                value={newType.color}
                                onChange={(event) =>
                                    setNewType({
                                        ...newType,
                                        color: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Цвет места */}

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
