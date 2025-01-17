export default function Home({ searchParams, results = [] }) {
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {results.length > 0 ? (
          results.map((m) => (
            <div
              key={m.imdbID}
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                maxWidth: "200px",
              }}
            >
              <h4>
                {m.Title} ({m.Year})
              </h4>
              <p>Type: {m.Type}</p>
              <p>{m.Plot}</p>
              {m.Poster !== "N/A" ? (
                <img
                  src={m.Poster}
                  alt={`${m.Title} poster`}
                  style={{ width: "100%" }}
                />
              ) : (
                <p>Não tem imagem disponível</p>
              )}
            </div>
          ))
        ) : (
          <p>Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
}
