// Вспомогательная функция для получения правильно формата времени окончания фильма
export default function getBusyTime(sessions) {
    const busyTime = [];

    sessions.forEach(element => {
        busyTime.push({ start: element.sessionStart, end: element.sessionEnd });
    });

    return busyTime;
}
