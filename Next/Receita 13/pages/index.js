import React from 'react';
import About from './about';
import View from './view';

export default function Home() {
    return (
        <div className="w-screen h-screen bg-gradient-to-br from-zinc-600 via-zinc-800 to-zinc-900 flex flex-col justify-center items-center">
            <header className="text-center mb-10">
                <h1 className="text-7xl font-bold text-white drop-shadow-lg">
                    Viva Santana!
                </h1>
                <p className="text-lg text-zinc-300 mt-3">
                    Celebre a tradição e cultura de Caicó
                </p>
            </header>
            <body className="max-w-4xl bg-zinc-800 rounded-lg shadow-xl p-6 text-white">
                <About />
                <div className="my-5 border-t border-zinc-600"></div>
                <View />
            </body>
        </div>
    )
}
