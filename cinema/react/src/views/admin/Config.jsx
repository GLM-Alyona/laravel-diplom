import { useEffect, useState } from "react";
import PageComponent from "../../components/admin/PageComponent";
import axiosClient from "../../axios";
import MatrixComponentAdmin from "../../components/admin/MatrixComponentAdmin";
import SelectMenusComponent from "../../components/core/SelectMenusComponent";
import EButton from "../../components/core/EButton";
import { CloudArrowUpIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function Config() {
    // Состояние для загрузки залов из БД
    const [halls, setHalls] = useState([]);

    const [adjustedMatrix, setAdjustedMatrix] = useState();

    // Состояние для выбора конкретного зала
    const [hall, setHall] = useState();

    // Состояние для загрузки всех типов мест из БД
    const [types, setTypes] = useState([]);

    // Соятоние загрузки данных
    const [loading, setLoading] = useState(false);

    // Полученный из БД массив сидушек для конкретного зала.
    const [matrixSeats, setMatrixSeats] = useState();

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения списка залов из БД
    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/halls")
            .then(({ data }) => {
                setHalls(data.data);
                getTypes();
            });
    }, []);

    // Функция получения списка типов мест из БД
    const getTypes = () => {
        axiosClient
            .get("/types")
            .then(({ data }) => {
                setTypes(data.data);
                setLoading(false);
            });
    };

    // Функция получения матрицы сидушек из БД для конкретного зала
    const getSeats = (hall_id) => {
        axiosClient
            .get(`/seats/${hall_id}`)
            .then(({ data }) => {
                setMatrixSeats(data);
                setLoading(false);
            });
    };

    // Функция автообновления матрицы сидушек из БД,
    // в момент когда пользователь тынкул на конкретный зал в выпадающем списке.
    useEffect(() => {
        if (hall) {
            getSeats(hall.id);
        }
    }, [hall]);

    // callback функция, для получения выбранного зала из под компонента <SelectMenusComponent>
    const selectedHall = (hall) => {
        setHall(hall);
    };

    // callback функция, для получения измененной матрицы по типу мест из компонента <MatrixComponent>
    const sendAdjustedMatrix = (adjustedMatrix) => {
        setAdjustedMatrix(adjustedMatrix);
    };

    // Функция удаления всех сидушек при изменении зала
    const deleteSeats = (hall_id) => {
        axiosClient
            .delete(`/seats/${hall_id}`)
            .then((response) => {
            });
    }

    // Функция создания матрицы сидушек и отправки ее в БД
    const postSeats = (matrixPayload) => {
        axiosClient
            .post("/seats", matrixPayload)
            .catch((err) => {
                if (err && err.response) {
                    // Записываем error в состояние
                    setError(err.response.data.message);
                }
                console.log(err, err.response);
            });
    }

    // Отправка скорректированной по типу мест матрицы в БД
    const onClickSubmit = (event) => {
        event.preventDefault();

        // Удаляем все места зала hall.id
        deleteSeats(hall.id);
        // Заново грузим массив данных в БД с новыми сидушками
        postSeats(adjustedMatrix);
    };

    return (
        <PageComponent title="Настройка залов">
            {loading && (
                <svg aria-hidden="true" className="mx-auto my-24 block w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-violet-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            )}

            {!loading && (
                <>
                    <div>
                        <h2 className="font-semibold">
                            Выберите доступный зал для конфигурации:
                        </h2>
                        <SelectMenusComponent
                            selectedHall={selectedHall}
                            items={halls}
                        />
                    </div>

                    <div className="flex flex-col mt-3 pt-1 border-t border-gray-200">
                        <h2 className="font-semibold">Доступные типы мест:</h2>
                        {types.length === 0 && (
                            <h2 className="text-sm font-normal text-gray-400">
                                Нет доступных типов мест
                            </h2>
                        )}
                        {types.length > 0 && (
                            <>
                                <div className="flex flex-wrap mt-1">
                                    {types?.map((type, idx) => (
                                        <div
                                            className="mt-1 mr-2 last:mr-0"
                                            key={idx}
                                        >
                                            <div style={{ backgroundColor: `#${type.color}` }} className={`w-auto px-2 ml-2 text-center inline-block text-white rounded text-s border border-gray-500 font-medium`}>{type.type}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-3 pt-1 border-t border-gray-200">
                                    <h2 className="font-semibold">
                                        Конфигурация мест:
                                    </h2>
                                    <h2 className="text-sm font-normal text-gray-400">
                                        Чтобы изменить тип кресла, нажмите по нему
                                        левой кнопкой мыши
                                    </h2>
                                    <div className="border-2 border-[#63536C] rounded p-3 mt-2">
                                        {!hall && (
                                            <span className="text-sm font-normal text-gray-400">
                                                Для отображения конфигурации
                                                выберите зал
                                            </span>
                                        )}
                                        {hall && (
                                            <div className="flex flex-col justify-center items-center">
                                                <span className="tracking-[1.25em]">
                                                    ЭКРАН
                                                </span>
                                                <div className="mt-2">
                                                    <MatrixComponentAdmin
                                                        matrixSeats={matrixSeats}
                                                        rows={hall.rows}
                                                        seats={hall.seats}
                                                        types={types}
                                                        sendAdjustedMatrix={sendAdjustedMatrix}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                                            <EButton
                                                color="regular"
                                                onClick={onClickSubmit}
                                            >
                                                <CloudArrowUpIcon className="h-6 w-6 mr-2" />
                                                Сохранить
                                            </EButton>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </PageComponent>
    );
}
