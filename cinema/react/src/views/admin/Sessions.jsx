import PageComponent from "../../components/admin/PageComponent";
import SelectMenusComponent from "../../components/core/SelectMenusComponent";
import getSessionInMinutes from "../../components/core/getSessionInMinutes.jsx";
import MovieItemSessions from "../../components/admin/MovieItemSessions.jsx";
import SessionItem from "../../components/admin/SessionItem.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";
import ETimeline from "../../components/core/ETimeline";

export default function Sessions() {
    // Состояние для загрузки из БД общего списка фильмов
    const [movies, setMovies] = useState([]);

    // Состояние для загрузки залов из БД
    const [halls, setHalls] = useState([]);

    // Состояние для выбора конкретного зала
    const [hall, setHall] = useState();

    // Состояние для отрисовки временной шкалы
    const [timeline, setTimeline] = useState([
        60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840,
        900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1500, 1560
    ]);

    // Состояние для загрузки из БД общего списка интервалов
    const [sessions, setSessions] = useState();

    // Соятоние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения списка залов из БД
    useEffect(() => {
        setLoading(true);
        axiosClient.get("/halls").then(({ data }) => {
            setHalls(data.data);
            getMovies();
        });
    }, []);

    useEffect(() => {
        if (hall) {
            getSessions();
        }
    }, [hall]);

    // Функция получения актуальных URL для пагинации из БД (для компонента PaginationComponent)
    const getMovies = () => {
        axiosClient.get(`/movies`).then(({ data }) => {
            setMovies(data.data);
            setLoading(false);
        });
    };

    // callback функция, для получения выбранного зала из под компонента <SelectMenusComponent>
    const selectedHall = (hall) => {
        setHall(hall);
    };

    // Функция получения всех сессий по конкретному залу
    const getSessions = () => {
        axiosClient.get(`/sessions/${hall.id}`).then(({ data }) => {
            setSessions(data);
        });
    };

    return (
        <PageComponent title="Управление сеансами">
            <>
                {loading && (
                    <svg aria-hidden="true" className="mx-auto my-8 block w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-violet-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                )}

                {!loading && (
                    <>
                        <div>
                            <h2 className="font-semibold">
                                Выберите доступный зал для настройки сеансов:
                            </h2>
                            <SelectMenusComponent
                                selectedHall={selectedHall}
                                items={halls}
                            />
                        </div>
                        {!hall && (
                            <div className="block text-base font-medium text-red-700 mt-5">
                                Для отображения сетки сеансов выберите зал!
                            </div>
                        )}
                        {hall && (
                            <>
                                <div className="justify-center items-center my-5">
                                    <div className="justify-center items-center my-3 font-medium">
                                        <span>Сетка сеансов для зала </span>
                                        <span className="bg-[#63536C] px-1 text-center inline-block text-white rounded text-sm border border-gray-500 font-medium">
                                            №{hall.id} - {hall.name}
                                        </span>
                                        <span> :</span>
                                    </div>

                                    <div className="flex flex-col relative h-[100px] border-2 border-[#63536C] rounded p-3">
                                        <div className="flex relative">
                                            {sessions?.map((session) => (
                                                <SessionItem
                                                    session={session}
                                                    movies={movies}

                                                    getSessions={getSessions}
                                                    pixelStart={getSessionInMinutes(
                                                        session.sessionStart
                                                    )}
                                                    key={session.id}
                                                />
                                            ))}

                                            {/* Элемент - черточки на линии */}
                                            {timeline.map((item, idx) => (
                                                <ETimeline left={item} key={idx} />
                                            ))}

                                            {/* Элемент - вертикальная линия конца дня */}
                                            <span
                                                style={{
                                                    top: -5,
                                                    left: `${(1440 * 100) / 1620
                                                        }%`,
                                                }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded"
                                            ></span>
                                        </div>
                                        {/* Нижний элемент - временная линия */}
                                        <span className="relative block w-full h-[1px] border border-gray-500 rounded -bottom-[66px]"></span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    {movies
                                        ?.slice(0)
                                        .reverse()
                                        .map((movie) => (
                                            <MovieItemSessions
                                                movie={movie}
                                                hall={hall}
                                                sessions={sessions}
                                                getSessions={getSessions}
                                                key={movie.id}
                                            />
                                        ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </>
        </PageComponent>
    );
}
