import React from 'react';
import { useEffect, useState } from "react";
import SessionListItem from './SessionListItem';

export default function HallsListItem({ hall, sessions, selectedDate }) {

    // Состояние для хранения массива сессий по конкретному залу
    const [sessionByHall, setSessionByHall] = useState();

    // Функция получения массива сессий по конкретному залу
    const getSessionsByHall = () => {
        if (sessions) {
            setSessionByHall(sessions?.filter((item) => item.halls_id === hall.id));
        }
    };

    // При каждом обновлении страницы обновляем массив сессий по конкретному залу
    useEffect(() => {
        if (hall && sessions) {
            getSessionsByHall();
        }
    }, []);


    return (
        <>
            {sessions?.find(item => item.halls_id === hall.id)

                ?

                <div className='mb-2'>
                    <div className='font-medium text-md'>
                        <span>Зал №{hall.id} - {hall.name}</span>
                    </div>
                    <div className='flex'>
                        {sessionByHall?.map((item, idx) => (
                            <SessionListItem
                                session={item}
                                selectedDate={selectedDate}
                                key={idx}
                            />
                        ))}
                    </div>
                </div>

                :

                <></>
            }
        </>
    )
}
