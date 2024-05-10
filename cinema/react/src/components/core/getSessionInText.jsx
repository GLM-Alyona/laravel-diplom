// Вспомогательная функция для получения правильно формата времени окончания фильма
export default function getSessionInText(sessionStart, duration) {
    const hours = Number(sessionStart.substr(0, sessionStart.indexOf(':')));
    const minutes = Number(sessionStart.slice(-2));

    const sessionEndinMin = hours * 60 + minutes + duration;

    let textHours = parseInt(sessionEndinMin / 60);
    let textMinutes = (sessionEndinMin % 60);

    if (textHours > 23) {
        textHours = `0${(textHours - 24).toString()}`;
    } else if (textHours < 10) {
        textHours = `0${textHours.toString()}`;
    }

    if (textMinutes < 10) {
        textMinutes = `0${textMinutes.toString()}`;
    }

    return `${textHours}:${textMinutes}`;
}
