// Вспомогательная функция, переводящая тектовый формат времени в минуты
export default function getSessionInMinutes(session) {

    // console.log(session)
    const hours = Number(session.substr(0, session.indexOf(":")));
    const minutes = Number(
        session.slice(3).substr(0, session.indexOf(":"))
    );
    return hours * 60 + minutes;
}
