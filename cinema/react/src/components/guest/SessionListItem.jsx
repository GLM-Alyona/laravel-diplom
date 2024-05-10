import { useNavigate } from "react-router-dom";

export default function SessionListItem({ session, selectedDate }) {
    const navigate = useNavigate();

    const onClick = () => {
        if (selectedDate) {
            navigate(`/session/${session.id}/${selectedDate}`)
        }
    }

    return (
        <>
            <div className='mr-3 bg-white px-6 rounded cursor-pointer shadow-md text-base font-medium' onClick={onClick}>
                {session.sessionStart.slice(0, 5)}
            </div>
        </>
    )
}
