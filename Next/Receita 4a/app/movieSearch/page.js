"use client";

import { useState } from "react";
import Home from "../movies/page";
import Form from "next/form";

export default function MovieSearch() {
  const [titleSearchKey, setTitleSearchKey] = useState("");
  const [type, setType] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=8b230325&s=${titleSearchKey}&type=${type}`
      );
      const data = await res.json();

      const detailedData = await Promise.all(
        data.Search.map(async (m) => {
          const detailRes = await fetch(
            `http://www.omdbapi.com/?apikey=8b230325&i=${m.imdbID}&plot=short`
          );
          return detailRes.json();
        })
      );

      setResults(detailedData);
    } catch (error) {
      console.error("Erro ao buscar os filmes:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleSearchKey.trim() !== "") {
      fetchMovies();
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} style={{ marginBottom: "16px" }}>
        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="idTitleSearchKey"
            style={{ display: "block", marginBottom: "8px" }}
          >
            Título
          </label>
          <input
            id="idTitleSearchKey"
            value={titleSearchKey}
            onChange={(e) => setTitleSearchKey(e.target.value)}
            required
            placeholder="Digite o título"
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="idType"
            style={{ display: "block", marginBottom: "8px" }}
          >
            Tipo (Filme, Série)
          </label>
          <select
            id="idType"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="movie">Filme</option>
            <option value="series">Série</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Pesquisando..." : "Pesquisar"}
        </button>
      </Form>

      {results.length > 0 && (
        <Home searchParams={{ titleSearchKey, type }} results={results} />
      )}
    </div>
  );
}
