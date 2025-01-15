export default async function Home({ searchParams }) {
  const { titleSearchKey = "bagdad", type = "" } = searchParams;

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

  return (
    <div>
      <h3>Resultados de "{titleSearchKey}"</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {detailedData.map((m) => (
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
        ))}
      </div>
    </div>
  );
}
