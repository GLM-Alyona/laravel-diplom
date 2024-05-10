// Функция создания матрицы
export default function makeMatrix(rows, seats, types_id, halls_id) {
    // Единица добавлена, чтобы в дальнейшем удалить индекс [0], чтобы привести массив сидушек к виду [1, 2, 3...]
    const seatsPlus = seats + 1;
    const line = [];
    for (let row = 1; row < rows + 1; row++) {
        const column = Array.from({ length: seatsPlus }, (__, seat) => {
            return { row, seat, halls_id, types_id };
        });
        // Приводим массив мест к виду к виду [1, 2, 3...].
        // Делаем начало индексов массива мест начиная с 1.
        column.shift();
        // Добавляем полученную "линию" мест в "ряды".
        line.push(column);
    }
    return line;
}
