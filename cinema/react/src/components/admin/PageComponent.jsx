import React from "react";

export default function PageComponent({ title, button = "", children }) {
    return (
        <>
            <header className="bg-white shadow">
                <div className="flex justify-between items-center x-auto px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {title}
                    </h1>
                    {button}
                </div>
            </header>

            <main className="bg-white shadow mt-5 px-4 py-6">{children}</main>
        </>
    );
}
