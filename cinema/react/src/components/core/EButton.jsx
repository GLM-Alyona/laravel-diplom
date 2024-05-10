import { Link } from "react-router-dom";

export default function EButton({
    color = "regular",
    circle = false,
    onClick = () => { },
    submit = false,
    children,
}) {
    let classes = [
        "flex",
        "items-center",
        "text-sm",
        "transition",
        "duration-500",
        "outline-none",
    ];

    if (circle) {
        classes = [
            ...classes,
            "text-[#63536C]",
            "h-8",
            "w-8",
            "items-center",
            "justify-center",
            "rounded-full",
            "text-xs",
            "ml-2",
        ];

        switch (color) {
            case "danger":
                classes = [
                    ...classes,
                    "text-red-700",
                    "hover:bg-red-800",
                    "hover:text-white",
                    "active:bg-red-600",
                    "active:duration-0",
                ];
                break;
            case "regular":
                classes = [
                    ...classes,
                    "text-[#63536C]",
                    "hover:bg-[#63536C]",
                    "hover:text-white",
                    "active:bg-[#89639e]",
                    "active:duration-0",
                ];
                break;
        }
    } else {
        classes = [
            ...classes,
            "font-semibold",
            "whitespace-nowrap",
            "p-0",
            "py-2",
            "px-4",
            "rounded-md",
        ];

        switch (color) {
            case "danger":
                classes = [
                    ...classes,
                    "bg-red-700",
                    "text-gray-300",
                    "hover:bg-red-900",
                    "hover:text-white",
                    "active:bg-red-600",
                    "active:duration-0",
                ];
                break;
            case "regular":
                classes = [
                    ...classes,
                    "bg-[#63536C]",
                    "text-gray-300",
                    "hover:bg-gray-700",
                    "hover:text-white",
                    "active:bg-[#89639e]",
                    "active:duration-0",
                ];
                break;
            case "green":
                classes = [
                    ...classes,
                    "bg-green-500",
                    "text-black",
                    "hover:bg-green-700",
                    "hover:text-white",
                    "active:bg-[#195C19]",
                    "active:duration-0",
                ];
                break;
            case "gray":
                classes = [
                    ...classes,
                    "bg-gray-600",
                    "text-gray-200",
                    "hover:bg-gray-700",
                    "hover:text-white",
                    "active:bg-gray-500",
                    "active:duration-0",
                ];
                break;
        }
    }

    return (
        <>
            {submit && (
                <button
                    type="submit"
                    onClick={onClick}
                    className={classes.join(" ")}
                >
                    {children}
                </button>
            )}
            {!submit && (
                <button
                    type="button"
                    onClick={onClick}
                    className={classes.join(" ")}
                >
                    {children}
                </button>
            )}
        </>
    );
}
