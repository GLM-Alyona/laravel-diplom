import { useState } from "react";
import NavItem from "./NavItem";

export default function NavBarComponent({ selectDate }) {

    // Состояние с текущим днем
    const [currentDay, setCurrentDay] = useState(Date.now());

    // Состояние с текущей неделей
    const [week, setWeek] = useState([
        { currentDay: currentDay, active: true },
        { currentDay: currentDay + 1 * 86400000, active: false },
        { currentDay: currentDay + 2 * 86400000, active: false },
        { currentDay: currentDay + 3 * 86400000, active: false },
        { currentDay: currentDay + 4 * 86400000, active: false },
        { currentDay: currentDay + 5 * 86400000, active: false },
        { currentDay: currentDay + 6 * 86400000, active: false }
    ]);

    // Функция конвертации getDay() в русские обозначения
    const getDayName = (numberDay) => {
        switch (numberDay) {
            case 0:
                return 'ВС';
            case 1:
                return 'ПН';
            case 2:
                return 'ВТ';
            case 3:
                return 'ЧТ';
            case 4:
                return 'СР';
            case 5:
                return 'ПТ';
            case 6:
                return 'СБ';
        }
    }

    // Функция выделения только одного Active блока Date
    const changeActive = (numberDay) => {
        week.forEach(item => item.active = false);
        week.forEach(item => {
            if (item.currentDay === numberDay) {
                item.active = true;
            }
        });
    }

    return (
        <nav className="h-100 flex justify-between">

            {week.map((item, idx) => (
                <NavItem
                    day={item.currentDay}
                    getDayName={getDayName}
                    currentDay={currentDay}
                    selectDate={selectDate}
                    active={item.active}
                    changeActive={changeActive}
                    key={idx}
                />
            ))}

            {/* TODO: Кнопка оставлена до лучших времен */}
            {/* <div
                className="flex items-center justify-center bg-white py-2 w-full cursor-pointer text-xs font-medium opacity-90 rounded ml-1"
                onClick={() => (console.log('Перелистываем'))}
            >
                <span>Следующая &#10095;</span>
            </div> */}
        </nav>
    )
}
