export default function NavItem({ day, currentDay, getDayName, selectDate, active, changeActive }) {

    const renderDay = new Date(day);

    // Функция передачи выбранной даты в родители и функция выделения блока Date
    const onClickDate = () => {
        selectDate(day);
        changeActive(day);
    }

    // Диначически заданный стиль Active
    const activeStyle = {
        backgroundColor: active ? `#FFFFFF` : `#FFFFFF`,
        width: active ? `170%` : `100%`,
        opacity: active ? `1` : `0.85`,
        transform: active ? `scale(1.1)` : `scale(1)`,
        fontWeight: active ? `700` : `400`,
        boxShadow: active ? `0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)` : ``,
        fontSize: active ? `1.1rem` : `0.875rem`,
        transition: active ? `opacity 1s, transform 1s, width 0.5s` : `opacity 0.7s, transform 0.7s`,
    }

    return (
        <div
            style={activeStyle}
            className="flex flex-col items-center justify-center py-2 cursor-pointer text-sm opacity-90 rounded ml-1"
            onClick={onClickDate}
        >

            {day === currentDay ? <><span className="block">Сегодня</span></> : <></>}

            <div>
                <span>{getDayName(renderDay.getDay())}, </span><span>{renderDay.getDate()}</span>
            </div>
        </div>
    )
}
