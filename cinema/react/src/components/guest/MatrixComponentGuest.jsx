import { useEffect, useState } from "react";
import reshapeMatrix from "../core/ReshapeMatrix.jsx";
import Seat from "./Seat.jsx";
import screen from '../../img/screen.png';

export default function MatrixComponentGuest({
    matrixSeats,
    rows,
    seats,
    types,
    sendCoord,
    reservedSeats
}) {

    // Создание матрицы на основе данных из родителя <Config>
    const [matrix, setMatrix] = useState(reshapeMatrix(matrixSeats, rows, seats));

    // Обновляем рендеринг матрицы, если matrixSeats из родителя <Config> поменялся
    useEffect(() => {
        setMatrix(reshapeMatrix(matrixSeats, rows, seats));
    }, [matrixSeats]);

    return (
        <div className="items-center space-y-2 w-min">
            <img src={screen} alt="Экран" className="mb-8 w-full" />
            {matrix?.map((row, idx) => (
                <div key={row[idx].row + row[idx].seat} id="matrix" className="flex flex-nowrap space-x-2 w-full">
                {row.map((item) => (
                    <Seat
                        item={item}
                        types={types}
                        key={item.seat}
                        sendCoord={sendCoord}
                        reservedSeats={reservedSeats}
                    >
                    </Seat>
                ))}
                </div>
                ))}
        </div>
    );
}
