import SlidePopupComponent from "../core/SlidePopupComponent";
import EButton from "../core/EButton";
import { useEffect, useState } from "react";
import {
    AdjustmentsHorizontalIcon,
    CloudArrowUpIcon,
    XCircleIcon
} from "@heroicons/react/24/outline";
import axiosClient from "../../axios";
import PriceListItemUnit from "../../components/admin/PriceListItemUnit";

export default function PriceListItem({ hall, types, getHalls }) {
    // Открытие/Закрытие SlidePopupComponent изменения
    const [change, setChange] = useState(false);

    // Состояние для хранения списка стоимостей из БД
    const [prices, setPrices] = useState([]);

    // Состояние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Отправка put-request в БД c изменениями стоимостей
    const onSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const price1 = Number(formData.get('1'));
        const price2 = Number(formData.get('2'));

        const payload = [
            {
                halls_id: hall.id,
                types_id: 1,
                price: price1
            },
            {
                halls_id: hall.id,
                types_id: 2,
                price: price2
            }
        ];

        for (let i = 0; i < prices.length; i++) {
            axiosClient
                .put(`/prices/${hall.id}`, payload[i])
                .then((response) => {
                    // Закрываем slider-popup
                    setChange(false);
                    // Заново перезагружаем всю информацию на странице
                    getHalls();
                })
                .catch((error) => {
                    if (error && error.response) {
                        setError(error.response.data.message);
                    }
                    console.error(error, error.response);
                });
        }
    };

    // Функция получения цен из таблицы Prices
    const getPrices = (hall) => {
        setLoading(true);
        axiosClient
            .get(`/prices/${hall.id}`)
            .then(({ data }) => {
                setPrices(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        getPrices(hall);
    }, []);

    return (
        <>
            {loading && (
                <section className="mb-4 flex h-auto">
                    <div className="p-2 bg-gray-200 rounded min-w-[40px] max-w-[40px] flex items-center justify-center">
                        <h2 className="text-xl font-bold">{hall.id}</h2>
                    </div>
                    <div className="flex flex-1 justify-between h-18 ml-2 p-2 bg-gray-300 rounded">
                        <div className="text-center text-lg p-2.5">Загрузка цен...</div>
                    </div>
                </section>
            )}

            {!loading && (

                <section className="mb-4 flex h-auto">
                    <div className="p-2 bg-[#F1EBE6]/95 rounded min-w-[40px] max-w-[40px] flex items-center justify-center">
                        <h2 className="text-xl font-bold">{hall.id}</h2>
                    </div>
                    <div className="flex flex-1 justify-between h-18 ml-2 p-2 bg-[#F1EBE6]/95 rounded">
                        <div className="flex">
                            <div>
                                <h2 className="flex text-sm font-light">
                                    <div>Название зала:</div>
                                    <div className={`bg-[#63536C] w-auto px-2 ml-2 text-center inline-block text-white rounded text-s border border-gray-500 font-medium`}>{hall.name}</div>
                                </h2>
                                <h2 className="flex text-sm font-light mt-1">
                                    <div>Конфигурация зала:</div>
                                    <div className={`bg-[#63536C] w-auto px-2 ml-2 text-center inline-block text-white rounded text-s border border-gray-500 font-medium`}>{hall.rows} x {hall.seats}</div>
                                </h2>
                            </div>
                            <div className="ml-6">
                                <h2 className="flex text-sm font-light">
                                    <div>Стоимость обычных мест:</div>
                                    <div className={`bg-[#63536C] w-auto px-2 ml-2 text-center inline-block text-white rounded text-s border border-gray-500 font-medium`}>{prices[0]?.price} ₽</div>
                                </h2>
                                <h2 className="flex text-sm font-light mt-1">
                                    <div>Стоимость VIP мест:</div>
                                    <div className={`bg-[#FFD700] w-auto px-2 ml-2 text-center inline-block text-black rounded text-s border border-gray-500 font-medium`}>{prices[1]?.price} ₽</div>
                                </h2>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <EButton circle onClick={() => {
                                setChange(true);
                            }}>
                                <AdjustmentsHorizontalIcon className="w-6 h-7" />
                            </EButton>
                        </div>
                    </div>
                </section>
            )}

            {/* Slide-Popup для ИЗМЕНЕНИЯ стоимостей мест в конкретном зале */}
            <SlidePopupComponent
                open={change}
                setOpen={setChange}
                title={`Изменение цен зала №` + hall.id}
            >
                {error && (
                    <div className="bg-red-500 text-white text-sm py-2 px-2 mb-1 rounded">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="text-center text-lg">Загрузка данных...</div>
                )}

                <>
                    <form onSubmit={onSubmit} action="#" method="POST">
                        {/* Количество рядов X Количество мест в ряду */}
                        {!loading && prices?.map((item, idx) => (
                            <PriceListItemUnit
                                type={item.types_id}
                                price={item.price}
                                color={types[item.types_id].color}
                                types={types}
                                key={idx}
                            />
                        ))}

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
                </>
            </SlidePopupComponent>
            {/* Slide-Popup для ИЗМЕНЕНИЯ стоимостей мест в конкретном зале */}
        </>
    );
}
