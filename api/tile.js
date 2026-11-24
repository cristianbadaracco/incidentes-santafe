/*
 * Proxy de tiles de CARTO (Vercel Function)
 * -----------------------------------------
 * El navegador pide /api/tile?z=..&x=..&y=..&r=..
 * Esta función agrega la API key (guardada en la variable de entorno CARTO_KEY
 * de Vercel) y devuelve la imagen. La key nunca llega al navegador ni al repo.
 */
module.exports = async (req, res) => {
  const { z, x, y, r = "" } = req.query || {};
  const esEntero = v => /^\d{1,8}$/.test(String(v));

  // Validación: solo números y retina opcional, para que nadie use el proxy para otra cosa
  if (!esEntero(z) || !esEntero(x) || !esEntero(y) || Number(z) > 20 || !["", "@2x"].includes(r)) {
    res.statusCode = 400;
    return res.end("Parámetros inválidos");
  }

  const key = process.env.CARTO_KEY;
  if (!key) {
    res.statusCode = 500;
    return res.end("Falta configurar CARTO_KEY en Vercel");
  }

  try {
    const url = `https://basemaps.cartocdn.com/rastertiles/voyager/${z}/${x}/${y}${r}.png?key=${encodeURIComponent(key)}`;
    const upstream = await fetch(url);
    if (!upstream.ok) {
      res.statusCode = upstream.status;
      return res.end("Error al obtener el tile");
    }
    const img = Buffer.from(await upstream.arrayBuffer());
    res.setHeader("Content-Type", "image/png");
    // Cachea en el CDN de Vercel 7 días y en el navegador 1 día: casi no se ejecuta la función
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400");
    res.statusCode = 200;
    return res.end(img);
  } catch (e) {
    res.statusCode = 502;
    return res.end("No se pudo contactar a CARTO");
  }
};
