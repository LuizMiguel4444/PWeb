"use client";

import { useState } from "react";
import Home from "./movies/page";
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
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#333", fontWeight: "bold"}}>Busca de Filmes</h1>
      <Form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="idTitleSearchKey"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Título
          </label>
          <input
            id="idTitleSearchKey"
            value={titleSearchKey}
            onChange={(e) => setTitleSearchKey(e.target.value)}
            required
            placeholder="Digite o título"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="idType"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Tipo (Filme, Série, Jogo)
          </label>
          <select
            id="idType"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Todos</option>
            <option value="movie">Filme</option>
            <option value="series">Série</option>
            <option value="game">Jogo</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: loading ? "#aaa" : "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Pesquisando..." : "Pesquisar"}
        </button>
      </Form>

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Home searchParams={{ titleSearchKey, type }} results={results} />
        </div>
      )}
    </div>
  );
}
