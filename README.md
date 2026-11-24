# Incidentes barriales · Santa Fe (prototipo)

Prototipo web para registrar y seguir incidentes urbanos (baches, alumbrado, residuos, cloacas, desagües, arbolado) en barrios vulnerables de la ciudad de Santa Fe.

## Cómo abrirlo
Hacé doble clic en `index.html`. Necesita conexión a internet para cargar el mapa (Leaflet + OpenStreetMap/CARTO).

Si preferís, con VS Code podés usar la extensión **Live Server**: clic derecho en `index.html` → *Open with Live Server*.

## Qué hace
- Lista de barrios agrupada por distrito, con buscador, cantidad de incidentes, cuántos siguen abiertos y una barra con la proporción de estados.
- Al elegir un barrio, el mapa hace zoom a ese barrio y marca su área.
- Marcadores con **color según el estado** e **ícono según el tipo**.
- Filtros por estado y por tipo. El primer clic deja solo esa opción; los siguientes suman o quitan.
- Panel lateral (en mobile, una hoja desde abajo) con el detalle y el **historial de estados**: fecha, área responsable, nota, tiempo en cada etapa, días abiertos o tiempo de resolución, y links a Google Maps y Street View.
- Cada barrio e incidente tiene su propio link: `index.html#barranquitas`, `index.html#inc-2026-0412`.
- Clic en cualquier punto del mapa → muestra lat/lng con un botón para copiarlas (sirve para cargar incidentes nuevos).
- Versión desktop y mobile.

## Estados y colores
| Estado | Color |
|---|---|
| Registrado | Gris |
| En revisión | Azul |
| Derivado | Violeta |
| En ejecución | Amarillo |
| Finalizado | Verde |
| Rechazado | Rojo |

El **estado actual no se guarda aparte**: es siempre el último paso del `historial`. Así no puede haber inconsistencias entre el estado y el historial.

## Estructura
```
index.html          estructura de la página
css/styles.css      estilos (desktop + mobile)
js/app.js           lógica: mapa, lista, filtros, panel de historial
data/barrios.js     barrios (id, nombre, distrito, centro, zoom, radio)
data/incidentes.js  incidentes con su historial de estados
```
Los datos están en formato JSON dentro de archivos `.js` (`window.BARRIOS = [...]`). Así la página funciona con doble clic, sin servidor: el navegador bloquea `fetch()` de archivos `.json` locales.

## Cargar un incidente nuevo
1. Abrí la página, hacé clic en el mapa donde ocurre el incidente y copiá las coordenadas.
2. En `data/incidentes.js`, copiá un bloque `{ ... }` existente y modificá: `id`, `barrio`, `tipo`, `titulo`, `direccion`, `lat`, `lng`, `descripcion` e `historial`.
3. Para avanzar un incidente, agregá un paso nuevo al final de su `historial`.

## Sobre los datos
- **Barrios:** las coordenadas de El Pozo, La Guardia, Colastiné Norte y Colastiné Sur salen de GeoNames. Las demás están ubicadas a partir de las calles y los límites que citan notas periodísticas, así que son aproximadas. Cada barrio indica su `fuente`.
- **Incidentes:** son ficticios, pero están inspirados en reclamos vecinales reales publicados por El Litoral y Aire de Santa Fe (socavón en Brasil y Ecuador, falta de luz en la Manzana 2 de Alto Verde, basural en Contreras y Varela, roturas cloacales en El Pozo, etc.). Las fechas, los responsables y los avances son inventados.

## Publicar en Vercel sin exponer la API key
La key de CARTO no está en el código. El navegador pide los tiles a `/api/tile` (archivo `api/tile.js`), una función de Vercel que agrega la key del lado del servidor, desde una variable de entorno.

1. Subí la carpeta a un repositorio de GitHub. El `.gitignore` evita que se suban archivos `.env`.
2. En vercel.com, elegí **Add New → Project**, importá el repositorio y dejá *Framework Preset* en **Other**, sin build.
3. En el proyecto, andá a **Settings → Environment Variables** y agregá `CARTO_KEY` con tu key.
4. Hacé **Redeploy** para que la función tome la variable.

Al abrir la página en local (doble clic), el mapa usa OpenStreetMap, así que no hace falta ninguna key.

## Mejoras futuras
Formulario de carga para vecinos con fotos, login para empleados municipales, base de datos real (por ejemplo Supabase/PostgreSQL con PostGIS), polígonos oficiales de los barrios, notificaciones al vecino y un dashboard con tiempos promedio de resolución por área.
