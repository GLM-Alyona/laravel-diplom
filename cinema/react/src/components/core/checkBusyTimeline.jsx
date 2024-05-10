import getSessionInMinutes from "../core/getSessionInMinutes";
import getBusyTime from "../core/getBusyTime";

// Вспомогательная функция для получения правильно формата времени окончания фильма
export default function checkBusyTimeline(sessions, session) {
    const busyTime = getBusyTime(sessions);

    // console.log(session.sessionStart);
    // console.log(session.sessionEnd);

    const newSessionStart = getSessionInMinutes(session.sessionStart);
    const newSessionEnd = getSessionInMinutes(session.sessionEnd);

    // console.log(newSessionStart);
    // console.log(newSessionEnd);

    let check = true;
    for (const element of busyTime) {

        console.log(newSessionStart);
        console.log(newSessionEnd);
        console.log(getSessionInMinutes(element.start));
        console.log(getSessionInMinutes(element.end));


        if ((newSessionStart >= getSessionInMinutes(element.start)
            && newSessionStart <= getSessionInMinutes(element.end))
            || (newSessionEnd >= getSessionInMinutes(element.start) && newSessionEnd <= getSessionInMinutes(element.end))
            || (newSessionStart === getSessionInMinutes(element.start))
        ) {
            // console.log(check);
            check = false;
            console.log('Занято!');
            break;
        }
    }
    return check;
}
