import { useNavigate } from "react-router-dom";

export default function LogoComponent() {

    // Для перенаправления на другую страницу
    const navigate = useNavigate();

    return (
        <h1 className="logo-head-01 cursor-pointer" onClick={(() => (navigate('/')))}>
            ИДЁМ
            <span className="logo-head-02">В</span>
            КИНО
        </h1>
    )
}
