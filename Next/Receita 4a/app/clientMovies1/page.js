"use client";

import React, { useState, useCallback } from "react";
import Form from "next/form";

export default function Home() {
  const [resultMovies, setResultMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleAction = useCallback(
    async (formData) => {
      const titleSearchKey = formData.get("titleSearchKey");
      setSearchKey(titleSearchKey);
      setIsLoading(true);
      setHasSearched(true);

      try {
        const httpRes = await fetch(
          `http://www.omdbapi.com/?apikey=8b230325&s=${titleSearchKey}&type=movie`
        );
        const jsonRes = await httpRes.json();
        setResultMovies(jsonRes.Search || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setResultMovies, setSearchKey, setIsLoading]
  );

  return (
    <div className="min-h-screen bg-gray-700 p-4">
      <h1 className="text-2xl font-bold text-center text-white p-4">
        Movie Search
      </h1>

      <div className="max-w-2xl mx-auto bg-gray-400 shadow-md rounded-lg p-6">
        <MovieForm handleAction={handleAction} isLoading={isLoading} />
      </div>

      <div className="max-w-4xl mx-auto mt-8">
        {hasSearched && !isLoading && <MovieTable movies={resultMovies} />}
      </div>
    </div>
  );
}

export const MovieForm = React.memo(({ handleAction, isLoading }) => {
  const [localSearchKey, setLocalSearchKey] = useState("");

  return (
    <Form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("titleSearchKey", localSearchKey);
        handleAction(formData);
      }}
    >
      <label htmlFor="idTitleSearchKey" className="font-semibold text-black">
        Título do Filme
      </label>
      <input
        id="idTitleSearchKey"
        name="titleSearchKey"
        value={localSearchKey}
        onChange={(e) => setLocalSearchKey(e.target.value)}
        className="border rounded-md p-2"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`px-4 py-2 text-black font-semibold rounded-md ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Procurando..." : "Pesquisar"}
      </button>
    </Form>
  );
});

export function MovieTable({ movies }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {movies.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-blue-500">
              <th className="border border-gray-400 px-4 py-2 font-semibold">
                Título
              </th>
              <th className="border border-gray-400 px-4 py-2 font-semibold">
                Ano
              </th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.imdbID} className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {m.Title}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {m.Year}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700">
          Nenhum filme encontrado. Tente uma nova pesquisa!
        </p>
      )}
    </div>
  );
}
