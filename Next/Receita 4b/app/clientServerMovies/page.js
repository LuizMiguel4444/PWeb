"use client";

import { searchMovies } from "../actions/movieActions";
import Form from "next/form";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({});

  async function handleAction(formData) {
    const res = await searchMovies(formData);
    setData(res);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 my-8">
        Pesquisa de Filmes
      </h1>
      <MovieForm actionHandler={handleAction} />
      {data.Search && data.Search.length > 0 && (
        <MovieTable movies={data.Search} />
      )}
      {data.Search && data.Search.length === 0 && (
        <p className="text-black mt-4">Nenhum resultado encontrado.</p>
      )}
    </div>
  );
}

export function MovieForm({ actionHandler }) {
  return (
    <Form
      action={actionHandler}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          htmlFor="idTitleSearchKey"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Título
        </label>
        <input
          id="idTitleSearchKey"
          name="titleSearchKey"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Digite o título do filme"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="idYearSearchKey"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Ano
        </label>
        <input
          id="idYearSearchKey"
          name="yearSearchKey"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Digite o ano (opcional)"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Pesquisar
        </button>
      </div>
    </Form>
  );
}

export function MovieTable({ movies }) {
  return (
    <div className="w-full max-w-4xl bg-white shadow-md rounded my-6 p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Resultados:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((m) => (
          <div
            key={m.imdbID}
            className="border rounded-lg p-4 bg-gray-100"
          >
            <h3 className="text-md font-bold text-blue-600">{m.Title}</h3>
            <p className="text-gray-700">Ano: {m.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
