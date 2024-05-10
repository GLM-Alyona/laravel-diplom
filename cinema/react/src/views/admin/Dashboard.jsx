import PageComponent from "../../components/admin/PageComponent";
import {
    UserIcon,
    ChevronLeftIcon,
    FilmIcon,
    SquaresPlusIcon,
    CalendarDaysIcon,
    UsersIcon,
    StarIcon,
    CurrencyDollarIcon,
    ArrowLeftOnRectangleIcon,
    RectangleGroupIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
    return (
        <PageComponent title="Панель управления">
            <div className="flex justify-between flex-wrap p-6">
                <div className="flex p-2 mr-6 bg-[#63536C] text-white">
                    <div>
                        <h1>

                        </h1>
                        <span>Залы</span>
                    </div>
                    <div className="ml-8">
                        <RectangleGroupIcon className="block w-6 h-7" />
                    </div>
                </div>

                <div className="flex p-2 mr-6  bg-[#63536C] text-white">
                    <div>
                        <h1>

                        </h1>
                        <span>Фильмы</span>
                    </div>
                    <div className="ml-8">
                        <FilmIcon className="block w-6 h-7" />
                    </div>
                </div>

                <div className="flex p-2 mr-6 bg-[#63536C] text-white">
                    <div>
                        <h1>

                        </h1>
                        <span>Билеты</span>
                    </div>
                    <div className="ml-8">
                        <SquaresPlusIcon className="block w-6 h-7" />
                    </div>
                </div>

                <div className="flex p-2 mr-6 bg-[#FFD700] text-black">
                    <div>
                        <h1>

                        </h1>
                        <span>Прибыль</span>
                    </div>
                    <div className="ml-8">
                        <SquaresPlusIcon className="block w-6 h-7" />
                    </div>
                </div>
            </div>
        </PageComponent>
    )
}
