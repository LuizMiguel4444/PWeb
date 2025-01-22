"use server";

export async function searchMovies(formData) {
  const titleSearchKey = formData.get("titleSearchKey");
  const yearSearchKey = formData.get("yearSearchKey");

  if (!titleSearchKey || titleSearchKey === "") return { Search: [] };

  try {
    const url = `http://www.omdbapi.com/?apikey=8b230325&s=${titleSearchKey}&type=movie${
      yearSearchKey ? `&y=${yearSearchKey}` : ""
    }`;
    const httpRes = await fetch(url);
    const jsonRes = await httpRes.json();

    return jsonRes;
  } catch (err) {
    return { error: `Erro na requisição: ${err}` };
  }
}
