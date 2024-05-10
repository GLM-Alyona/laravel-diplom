import { useState } from "react";

export default function HallsListItem({ item, types, sendCoord, reservedSeats }) {

    // Состояние для переключения выбранного места
    const [toggle, setToggle] = useState(false);

    // Диначически заданный стиль сидушек
    const seatTouchStyle = {
        visibility: item?.types_id === 3 ? "hidden" : "",
        backgroundColor: toggle ? `#25C4CE` : `#${types?.find(type => type.id === item.types_id).color}`
    }

    // Состояние для хранения координаты
    const [coords, setCoords] = useState();

    // Функция детектирования выбора места при клике
    function onMouseEnter(id, row, seat) {
        setCoords({ id, row, seat });
        setToggle(!toggle);
        sendCoord({ id, row, seat }, !toggle)
    }

    return (
        <>
            {/* Проверка на бронированные места в эту дату */}
            {reservedSeats?.find(element => element.seats_id === item.id)
                ? (
                    <div
                        className="w-[24px] h-[24px] border border-gray-400 rounded-md"
                    ></div>
                ) : (
                    <div style={seatTouchStyle}
                        className="cursor-pointer w-[24px] h-[24px] border border-gray-400 rounded-md"
                        onClick={(event) => (
                            onMouseEnter(item.id, item.row, item.seat)
                        )}
                    ></div>
                )}
        </>
    )
}


{/* <div style={toggle ? { backgroundColor: "#25C4CE" } : { backgroundColor: `#${types?.find(type => type.id === item.types_id).color}` }} */ }
