import SlidePopupComponent from "../core/SlidePopupComponent";
import EButton from "../core/EButton";
import { useState } from "react";
import {
    AdjustmentsHorizontalIcon,
    TrashIcon,
    XCircleIcon,
    PhotoIcon,
    CloudArrowUpIcon,
} from "@heroicons/react/24/outline";
import axiosClient from "../../axios";

export default function MovieListItemAdmin({ movie, getMovies }) {
    // Открытие/Закрытие SlidePopupComponent для изменения фильма
    const [change, setChange] = useState(false);
    // Открытие/Закрытие SlidePopupComponent для удаления фильма
    const [del, setDel] = useState(false);

    // Состояния для изменения фильма
    const [updatedMovie, setUpdatedMovie] = useState({
        title: movie.title,
        img: movie.img,
        img_url: movie.img_url,
        description: movie.description,
        duration: movie.duration,
        origin: movie.origin,
    });

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция подгрузки изображения из input
    const onImageChoose = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setUpdatedMovie({
                ...updatedMovie,
                img: file,
                img_url: reader.result,
            });
            event.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    // Отправка put-request в БД c изменениями фильма
    const onSubmit = (event) => {
        event.preventDefault();

        const payload = { ...updatedMovie };
        if (payload.img) {
            payload.img = payload.img_url;
        }

        delete payload.img_url;

        axiosClient
            .put(`/movies/${movie.id}`, payload)
            .then((response) => {
                // Закрываем slider-popup
                setChange(false);
                // Заново перезагружаем из БД все фильмы
                getMovies();
            })
            .catch((err) => {
                if (err && err.response) {
                    // Записываем error в состояние
                    setError(err.response.data.message);
                }
                console.log(err, err.response);
            });
    };

    // Функция удаления фильма
    const onClickDelete = (event) => {
        axiosClient.delete(`/movies/${movie.id}`).then((response) => {
            // Закрываем slider-popup
            setChange(false);
            // Заново перезагружаем из БД все фильмы
            getMovies();
        });
    };

    return (
        <>
            <section className="mb-4 flex h-auto">
                <div className="p-2 bg-[#F1EBE6]/95 rounded min-w-[40px] max-w-[40px] flex items-center justify-center">
                    <h2 className="text-lg font-bold">{movie.id}</h2>
                </div>
                <div className="flex flex-1 justify-between h-auto ml-2 p-2 bg-[#F1EBE6]/95 rounded">
                    <div className="flex">
                        <div className="flex-1 min-w-[55px] max-w-[55px]">
                            <img
                                className="max-h-full"
                                alt={movie.title}
                                src={movie.img_url}
                            ></img>
                        </div>
                        <div className="flex flex-col ml-2">
                            <h2 className="text-base font-medium">
                                {movie.title}
                            </h2>
                            <p className="mt-2">
                                <span className={`bg-[#63536C] w-auto p-1 text-center inline-block text-white rounded text-xs border border-gray-500 font-medium`}>{movie.duration} минут</span>
                            </p>
                        </div>
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
                title={`Изменение фильма №` + movie.id}
            >
                {error && (
                    <div className="bg-red-500 text-white text-sm py-2 px-2 mb-1 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} action="#" method="POST">
                    {/* Название фильма */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Название фильма{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={updatedMovie.title}
                                onChange={(event) =>
                                    setUpdatedMovie({
                                        ...updatedMovie,
                                        title: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Название фильма */}

                    {/* Загрузка картинки */}
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-900">
                            Загрузить постер
                        </label>

                        <div className="mt-1 flex items-center">
                            {updatedMovie.img_url && (
                                <img
                                    src={updatedMovie.img_url}
                                    alt=""
                                    className="w-32 h-32 object-cover"
                                />
                            )}
                            {!updatedMovie.img_url && (
                                <span className="flex justify-center items-center text-[#63536C] h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                                    <PhotoIcon className="w-8 h-8" />
                                </span>
                            )}
                            <button
                                type="button"
                                className="relative flex items-center text-sm transition duration-500 outline-none font-semibold whitespace-nowrap p-2 px-4 ml-5 rounded-md bg-[#63536C] text-gray-300 hover:bg-gray-700 hover:text-white active:bg-[#89639e] active:duration-0"
                            >
                                <input
                                    type="file"
                                    onChange={onImageChoose}
                                    className="block absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer "
                                />
                                Выбрать
                            </button>
                        </div>
                    </div>
                    {/* Загрузка картинки */}

                    {/* Описание */}
                    <div className="mt-2">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Краткое описание фильма
                        </label>

                        <div className="mt-2">
                            <textarea
                                rows={3}
                                id="description"
                                name="description"
                                value={updatedMovie.description}
                                onChange={(event) =>
                                    setUpdatedMovie({
                                        ...updatedMovie,
                                        description: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Описание */}

                    {/* Длительность */}
                    <div className="mt-2">
                        <label
                            htmlFor="duration"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Длительность (мин)
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                id="duration"
                                name="duration"
                                value={updatedMovie.duration}
                                onChange={(event) =>
                                    setUpdatedMovie({
                                        ...updatedMovie,
                                        duration: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Длительность */}

                    {/* Страны происхождения */}
                    <div className="mt-2">
                        <label
                            htmlFor="origin"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Страны происхождения (через запятую)
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="origin"
                                name="origin"
                                value={updatedMovie.origin}
                                onChange={(event) =>
                                    setUpdatedMovie({
                                        ...updatedMovie,
                                        origin: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Страны происхождения */}

                    <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                        <EButton submit color="regular">
                            <CloudArrowUpIcon className="h-6 w-6 mr-2" />
                            Изменить
                        </EButton>
                        <EButton
                            color="gray"
                            onClick={() => setChange(false)}
                        >
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
                    Вы действительно хотите удалить фильм{" "}
                    <div className={`bg-[#63536C] w-auto px-2 text-center inline-block text-white rounded text-s border border-gray-500 font-medium`}>№{movie.id}</div> ?
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
