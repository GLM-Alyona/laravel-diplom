import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EButton from "../../components/core/EButton";
import MatrixComponentGuest from "../../components/guest/MatrixComponentGuest.jsx";
import { v4 as uuidv4 } from 'uuid';
import axiosClient from "../../axios.js";

export default function Hall() {

    // Берем id сессии из под URL страницы (из роутера)
    const { id } = useParams();

    // Берем id сессии из под URL страницы (из роутера)
    const { selectedDate } = useParams();

    // Для перенаправления на другую страницу
    const navigate = useNavigate();

    // Состояние для загрузки из БД сессии
    const [session, setSession] = useState();

    // Состояние для загрузки из БД фильма
    const [movie, setMovie] = useState();

    // Состояние для загрузки из БД зала
    const [hall, setHall] = useState([]);

    // Состояние для загрузки из БД матрицы сидушек
    const [matrix, setMatrix] = useState([]);

    // Состояние для загрузки из БД всех типов мест
    const [types, setTypes] = useState();

    // Состояние для загрузки из БД цен сидушек для конкретного зала
    const [prices, setPrices] = useState([]);

    // Состояние для хранения выбранных пользователем мест
    const [tickets, setTickets] = useState([]);

    // Состояние для загрузки из БД сидушек
    const [seats, setSeats] = useState([]);

    // Состояние для хранения уже купленных мест другими пользователями
    const [reservedSeats, setReservedSeats] = useState([]);

    // Состояние для переключателя компонента
    const [toggleComponent, setToggleComponent] = useState(false);

    // Состояние для хранения общей стоимости билета
    const [totalPrices, setTotalPrices] = useState();

    // Соятоние загрузки данных
    const [loading, setLoading] = useState(false);

    // Функция получения конкретной сессии
    const getSession = () => {
        setLoading(true);
        axiosClient
            .get(`/getsession/${id}`)
            .then(({ data }) => {
                setSession(data[0]);
                getMovie(data[0].movies_id);
                getHall(data[0].halls_id);
                getMatrix(data[0].halls_id);
                getTypes();
                getPrice(data[0].halls_id);
                getReservedSeats(data[0].id, selectedDate);
            });
    };

    // Функция получения всех сессий по конкретному залу
    const getMovie = (movie_id) => {
        axiosClient
            .get(`/getmovie/${movie_id}`)
            .then(({ data }) => {
                setMovie(data[0]);
            });
    };

    // Функция получения конкретного зала
    const getHall = (hall_id) => {
        axiosClient
            .get(`/gethall/${hall_id}`)
            .then(({ data }) => {
                setHall(data[0]);
            });
    };

    // Функция получения матрицы сидушек конкретного зала
    const getMatrix = (hall_id) => {
        axiosClient
            .get(`/getseats/${hall_id}`)
            .then(({ data }) => {
                setMatrix(data);
            });
    };

    // Функция получения цен сидушек по конкретному залу
    const getTypes = () => {
        axiosClient
            .get(`/gettypes`)
            .then(({ data }) => {
                setTypes(data.data);
            });
    };

    // Функция получения цен сидушек по конкретному залу
    const getPrice = (hall_id) => {
        axiosClient
            .get(`/getprices/${hall_id}`)
            .then(({ data }) => {
                setPrices(data);
            });
    };

    //
    const getSeat = (seat_id) => {
        axiosClient
            .get(`/getseat/${seat_id}`)
            .then(({ data }) => {

                // Проверка, если сидушки уже записана, то не добавляем
                // if (seats.length < tickets.length) {
                setSeats(item => [...item, data[0]])
                // }
            });
    }

    // Функция получения уже купленных мест
    const getReservedSeats = (session_id, date) => {
        axiosClient
            .get(`/getticket/${session_id}/${date}`)
            .then(({ data }) => {
                setReservedSeats(data);
                setLoading(false);
            });
    };

    // При каждом обновлении страницы обновляем данные
    useEffect(() => {
        getSession();
    }, []);

    // Функция бронирования выбранных мест tikets
    const onClickReserve = () => {

        // Уникальный идентифкатор билета
        const uuid = uuidv4();

        const payload = [];
        for (let i = 0; i < tickets.length; i++) {
            payload.push({
                uuid: uuid,
                date: selectedDate,
                sessions_id: session.id,
                seats_id: tickets[i].id
            })
        }

        payload.map(item => {
            axiosClient
                .post("/tickets", item)
                .catch((err) => {
                    if (err && err.response) {
                        // Записываем error в состояние
                        setError(err.response.data.message);
                    }
                    console.log(err, err.response);
                });
        })

        navigate(`/ticket/${uuid}`)
    }

    const onClickToggle = () => {

        // Запрашиваем данные по сидушкам
        tickets.map(element => getSeat(element.id));

        // Если список выбранных мест НЕ нулевой, то показываем страницу бронирования.
        if (tickets.length !== 0) {
            setToggleComponent(true);
        }
    }

    // Call-back функция для получения координат сидушек и состояния toggle
    const sendCoord = (coord, toggle) => {
        // Если toggle, то записываем в состояние сидушку
        if (toggle === true) {
            setTickets(item => [...item, coord])
        } else {
            setTickets(tickets.filter(item => item.id !== coord.id))
        }
    }

    // Функция расчета стоимости билета
    const getTotalPrice = (seats, prices) => {
        let result = 0;
        seats.forEach(item => {
            result += prices.find(element => element.types_id == item.types_id).price;
        })

        setTotalPrices(result);
    }

    // При каждом обновлении страницы обновляем данные
    useEffect(() => {
        getTotalPrice(seats, prices);
    }, [seats]);

    return (


        <>
            {loading && (
                <>
                    <div className="p-4 py-44 bg-[#F1EBE6] opacity-95 rounded">
                        <svg aria-hidden="true" className="mx-auto block w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                </>
            )}

            {!loading && (
                <>
                    <section>
                        {toggleComponent ?
                            <>
                                <header className="py-6 px-4 bg-[#F1EBE6] opacity-95 rounded">
                                    <span className="block uppercase text-2xl text-[#C76F00] font-bold">Вы выбрали билеты:</span>
                                </header>

                                <div className="p-4 mt-4 bg-[#F1EBE6] opacity-95 rounded-t">
                                    <h2 className="flex mt-1">
                                        <span className="block mr-1 text-base">На фильм:</span>
                                        <span className="font-medium">{movie.title}</span>
                                    </h2>

                                    <p className="flex mt-1">
                                        <span className="block mr-1">Дата:</span>
                                        <span className="font-medium">{selectedDate}</span>
                                    </p>

                                    <p className="flex mt-1">
                                        <span className="block mr-1">Начало сеанса:</span>
                                        <span className="font-medium">{session.sessionStart.slice(0, -3)}</span>
                                    </p>

                                    <p className="flex mt-1">
                                        <span className="block mr-1">В зале:</span>
                                        <span className="font-medium">№{session.halls_id}</span>
                                    </p>

                                    <p className="flex mt-1">
                                        <span className="block mr-1">Места [ряд-место]:</span>
                                        {tickets.length !== 0
                                            ?
                                            <span className="font-medium">{`${tickets.map(item => (` ${item.row}-${item.seat}`))}`}</span>
                                            :
                                            <span className="font-medium ml-1">Загрузка...</span>
                                        }
                                    </p>

                                    <p className="flex mt-1">
                                        <span className="block mr-1">Стоимость:</span>
                                        <span className="font-medium">{totalPrices} ₽</span>
                                    </p>
                                </div>

                                <div className="py-2 flex flex-col justify-center items-center bg-[#F1EBE6] rounded-b px-4 opacity-95 relative">
                                    <EButton onClick={onClickReserve}>
                                        <span className="uppercase text-base px-8">
                                            Оплатить и получить код бронирования
                                        </span>
                                    </EButton>
                                    <div className="flex flex-col">
                                        <p className="mt-6">
                                            После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.
                                        </p>
                                        <p>
                                            Приятного просмотра!
                                        </p>
                                    </div>
                                </div>
                            </>

                            :

                            <>
                                <div className="p-4 bg-[#F1EBE6] opacity-95 rounded-t">
                                    <h2 className="text-lg font-medium">
                                        {movie ? <span className="font-medium">{movie.title}</span> : <span className="font-medium ml-1">Загрузка...</span>}
                                    </h2>
                                    <p className="flex mt-1">
                                        {/* TODO: */}
                                        <span className="block mr-1">Дата сеанса:</span>
                                        {session ? <span className="font-medium">{selectedDate}</span> : <span className="font-medium ml-1">Загрузка...</span>}
                                    </p>
                                    <p className="flex mt-1">
                                        <span className="block mr-1">Начало сеанса:</span>
                                        {session ? <span className="font-medium">{session.sessionStart}</span> : <span className="font-medium ml-1">Загрузка...</span>}
                                    </p>
                                    <p className="flex mt-1 font-medium">
                                        {session ? <span className="font-medium">Зал№{session?.halls_id} - {hall?.name}</span> : <span className="font-medium ml-1">Загрузка...</span>}
                                    </p>
                                </div>

                                <div className="bg-[#171D24] text-white">

                                    <div className="flex flex-col justify-center items-center px-8 pt-8">
                                        <MatrixComponentGuest
                                            matrixSeats={matrix}
                                            rows={hall?.rows}
                                            seats={hall?.seats}
                                            types={types}
                                            sendCoord={sendCoord}
                                            reservedSeats={reservedSeats}
                                        />

                                        <div className="grid grid-rows-2 grid-flow-col gap-x-20 gap-y-3 my-8">
                                            <div className="flex">
                                                <div className="w-[24px] h-[24px] bg-[#63536C] border border-gray-400 rounded-md"></div>
                                                <span className="ml-2">Свободно ({prices[0]?.price} ₽)</span>
                                            </div>
                                            <div className="flex">
                                                <div className="w-[24px] h-[24px] bg-[#FFD700] border border-gray-400 rounded-md"></div>
                                                <span className="ml-2">Свободно VIP ({prices[1]?.price} ₽)</span>
                                            </div>
                                            <div className="flex">
                                                <div className="w-[24px] h-[24px] bg-[#] border border-gray-400 rounded-md"></div>
                                                <span className="ml-2">Занято</span>
                                            </div>
                                            <div className="flex">
                                                <div className="w-[24px] h-[24px] bg-[#25C4CE] border border-gray-400 rounded-md"></div>
                                                <span className="ml-2">Выбрано</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center p-8 bg-[#F1EBE6] opacity-95 rounded-b">
                                    <EButton onClick={onClickToggle}>
                                        <span className="uppercase text-base px-8">
                                            Забронировать
                                        </span>
                                    </EButton>
                                </div>
                            </>}
                    </section>
                </>
            )}


        </>


    )
}
