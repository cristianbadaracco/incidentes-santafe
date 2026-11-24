/* =========================================================
   Incidentes barriales · Santa Fe — lógica de la app
   Sin frameworks: Leaflet + JavaScript.
   ========================================================= */
(() => {
  "use strict";

  /* ---------- Configuración ---------- */

  // Estados posibles. "orden" define la barra de progreso.
  const ESTADOS = {
    registrado:   { label: "Registrado",   color: "#8a96a3", orden: 1 },
    en_revision:  { label: "En revisión",  color: "#2f74d0", orden: 2 },
    derivado:     { label: "Derivado",     color: "#7a5cd0", orden: 3 },
    en_ejecucion: { label: "En ejecución", color: "#e3a90b", orden: 4 },
    finalizado:   { label: "Finalizado",   color: "#1e9a57", orden: 5 },
    rechazado:    { label: "Rechazado",    color: "#d5433f", orden: 5 }
  };
  const PASOS_FLUJO = ["registrado", "en_revision", "derivado", "en_ejecucion", "finalizado"];

  // Tipos de incidente con su ícono (SVG de trazo, 24x24).
  const TIPOS = {
    bache:     { label: "Bache / calzada",       svg: '<path d="M10 3h4l4.5 16h-13L10 3Z"/><path d="M8.2 9h7.6M6.8 14h10.4"/><path d="M3 21h18"/>' },
    calle:     { label: "Calle intransitable",   svg: '<path d="M8 3 5 21M16 3l3 18"/><path d="M12 5v2M12 11v2M12 17v2"/>' },
    luminaria: { label: "Alumbrado público",     svg: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/>' },
    residuos:  { label: "Residuos / basural",    svg: '<path d="M4 7h16M10 3h4l1 4H9l1-4Z"/><path d="M6 7l1 13h10l1-13"/><path d="M10 11v6M14 11v6"/>' },
    cloaca:    { label: "Agua y cloacas",        svg: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>' },
    desague:   { label: "Desagüe / anegamiento", svg: '<path d="M3 15c2 0 2-1.5 4.5-1.5S10 15 12 15s2-1.5 4.5-1.5S19 15 21 15"/><path d="M3 19c2 0 2-1.5 4.5-1.5S10 19 12 19s2-1.5 4.5-1.5S19 19 21 19"/><path d="M12 3v7M9 7l3 3 3-3"/>' },
    arbolado:  { label: "Arbolado / poda",       svg: '<path d="M12 21v-6"/><path d="M12 3c-3.3 0-6 2.5-6 5.6 0 1 .3 1.9.8 2.7A4 4 0 0 0 9 18h6a4 4 0 0 0 2.2-6.7c.5-.8.8-1.7.8-2.7C18 5.5 15.3 3 12 3Z"/>' }
  };

  const PRIORIDAD = { baja: "Baja", media: "Media", alta: "Alta" };

  /* ---------- Datos ---------- */
  const BARRIOS = window.BARRIOS || [];
  const INCIDENTES = (window.INCIDENTES || []).map(i => ({
    ...i,
    historial: [...i.historial].sort((a, b) => a.fecha.localeCompare(b.fecha))
  }));
  const barrioById = Object.fromEntries(BARRIOS.map(b => [b.id, b]));
  const incById = Object.fromEntries(INCIDENTES.map(i => [i.id, i]));

  // El estado actual es SIEMPRE el último paso del historial.
  const estadoActual = inc => inc.historial[inc.historial.length - 1].estado;

  /* ---------- Estado de la UI ---------- */
  const ui = {
    barrio: null,                                   // id del barrio o null (= toda la ciudad)
    estados: new Set(Object.keys(ESTADOS)),         // filtros activos
    tipos: new Set(Object.keys(TIPOS)),
    seleccionado: null,                             // id de incidente abierto
    busqueda: ""
  };

  /* ---------- Utilidades ---------- */
  const $ = s => document.querySelector(s);
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icono = tipo => `<svg viewBox="0 0 24 24">${(TIPOS[tipo] || TIPOS.bache).svg}</svg>`;
  const parseFecha = s => new Date(s.length === 16 ? s + ":00" : s);
  const fmtFecha = s => parseFecha(s).toLocaleString("es-AR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(",", " ·");
  const fmtCorta = s => parseFecha(s).toLocaleDateString("es-AR", { day: "2-digit", month: "short" });
  const dias = (a, b) => (parseFecha(b) - parseFecha(a)) / 86400000;
  const fmtDuracion = d => {
    if (d < 1 / 24) return "menos de 1 h";
    if (d < 1) return `${Math.round(d * 24)} h`;
    const n = Math.round(d);
    return `${n} día${n === 1 ? "" : "s"}`;
  };
  const isMobile = () => window.matchMedia("(max-width: 820px)").matches;

  const toast = msg => {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), 2200);
  };
  const copiar = async (texto, msg) => {
    try { await navigator.clipboard.writeText(texto); toast(msg); }
    catch { toast("No se pudo copiar: " + texto); }
  };

  const enAlcance = () => INCIDENTES.filter(i => !ui.barrio || i.barrio === ui.barrio);
  const visibles = () => enAlcance().filter(i => ui.estados.has(estadoActual(i)) && ui.tipos.has(i.tipo));

  /* ---------- Mapa ---------- */
  const CIUDAD = { centro: [-31.625, -60.675], zoom: 13 };

  const map = L.map("map", { zoomControl: false, preferCanvas: false })
    .setView(CIUDAD.centro, CIUDAD.zoom);
  L.control.zoom({ position: "topright" }).addTo(map);

  // ===== MAPA BASE =====
  // Publicado (Vercel): los tiles de CARTO pasan por /api/tile, que agrega la
  // API key del lado del servidor. La key NO está en este archivo.
  // Local (doble clic / localhost): se usa OpenStreetMap, que no pide key.
  const publicado = location.protocol.startsWith("http") &&
    !["localhost", "127.0.0.1"].includes(location.hostname);

  if (publicado) {
    L.tileLayer("/api/tile?z={z}&x={x}&y={y}&r={r}", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);
  } else {
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }

  // Área aproximada de cada barrio (círculo)
  const capaBarrios = L.layerGroup().addTo(map);
  const circulos = {};
  BARRIOS.forEach(b => {
    const c = L.circle(b.centro, {
      radius: b.radio || 500, color: "#0e4a6e", weight: 1.5, dashArray: "6 6",
      fillColor: "#0e4a6e", fillOpacity: 0.05
    }).addTo(capaBarrios);
    c.bindTooltip(b.nombre, { permanent: false, direction: "center", className: "barrio-label" });
    c.on("click", e => {
      if (ui.barrio === b.id) return;               // dentro del barrio: deja pasar el clic de coordenadas
      L.DomEvent.stopPropagation(e);
      irABarrio(b.id);
    });
    circulos[b.id] = c;
  });

  const capaIncidentes = L.layerGroup().addTo(map);
  const marcadores = {};

  const crearIcono = (inc, seleccionado) => L.divIcon({
    className: "pin-wrap",
    html: `<div class="pin${seleccionado ? " selected" : ""}" style="--c:${ESTADOS[estadoActual(inc)].color}">${icono(inc.tipo)}</div>`,
    iconSize: [36, 44], iconAnchor: [18, 44], tooltipAnchor: [0, -40]
  });

  function dibujarMarcadores() {
    capaIncidentes.clearLayers();
    Object.keys(marcadores).forEach(k => delete marcadores[k]);
    visibles().forEach(inc => {
      const m = L.marker([inc.lat, inc.lng], {
        icon: crearIcono(inc, inc.id === ui.seleccionado),
        title: inc.titulo, keyboard: true, riseOnHover: true
      });
      m.bindTooltip(`${esc(inc.titulo)} · ${ESTADOS[estadoActual(inc)].label}`, { direction: "top", className: "inc-tip" });
      m.on("click", () => abrirIncidente(inc.id));
      m.addTo(capaIncidentes);
      marcadores[inc.id] = m;
    });
  }

  // Clic en el mapa: muestra coordenadas para cargar datos a mano
  map.on("click", e => {
    const lat = e.latlng.lat.toFixed(4), lng = e.latlng.lng.toFixed(4);
    const div = document.createElement("div");
    div.className = "coord-pop";
    div.innerHTML = `Coordenadas de este punto<br><b>lat: ${lat}, lng: ${lng}</b><br>`;
    const btn = document.createElement("button");
    btn.textContent = "Copiar";
    btn.addEventListener("click", () => copiar(`lat: ${lat}, lng: ${lng}`, "Coordenadas copiadas"));
    div.appendChild(btn);
    L.popup().setLatLng(e.latlng).setContent(div).openOn(map);
  });

  /* ---------- Lista de barrios ---------- */
  function barraEstados(lista) {
    if (!lista.length) return "";
    const conteo = {};
    lista.forEach(i => { const e = estadoActual(i); conteo[e] = (conteo[e] || 0) + 1; });
    return Object.keys(ESTADOS).filter(e => conteo[e])
      .map(e => `<span style="width:${(conteo[e] / lista.length) * 100}%;background:${ESTADOS[e].color}" title="${ESTADOS[e].label}: ${conteo[e]}"></span>`)
      .join("");
  }

  function renderLista() {
    const q = ui.busqueda.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const grupos = {};
    BARRIOS.filter(b => !q || norm(b.nombre).includes(q) || norm(b.distrito).includes(q))
      .forEach(b => (grupos[b.distrito] = grupos[b.distrito] || []).push(b));

    const html = Object.entries(grupos).map(([distrito, barrios]) => `
      <div class="distrito-title">Distrito ${esc(distrito)}</div>
      ${barrios.map(b => {
        const lista = INCIDENTES.filter(i => i.barrio === b.id);
        const abiertos = lista.filter(i => !["finalizado", "rechazado"].includes(estadoActual(i))).length;
        return `<button class="barrio-item${ui.barrio === b.id ? " active" : ""}" data-barrio="${esc(b.id)}">
          <span class="bi-name">${esc(b.nombre)}</span>
          <span class="bi-count">${lista.length} · ${abiertos} abiertos</span>
          <span class="bi-bar">${barraEstados(lista)}</span>
        </button>`;
      }).join("")}
    `).join("");

    $("#listaBarrios").innerHTML = html || `<p style="padding:16px;color:var(--ink-3)">No hay barrios con ese nombre.</p>`;
    $("#btnCiudad").classList.toggle("active", !ui.barrio);
  }

  /* ---------- Encabezado del mapa, estadísticas y filtros ---------- */
  function renderHeader() {
    const b = ui.barrio ? barrioById[ui.barrio] : null;
    const total = enAlcance().length;
    $("#mhDistrito").textContent = b ? `Distrito ${b.distrito}` : "Ciudad de Santa Fe";
    $("#mhNombre").textContent = b ? b.nombre : "Todos los barrios";
    $("#mhRef").textContent = b ? b.referencia : "Elegí un barrio de la lista o hacé clic en su área en el mapa.";

    // Botón para ver la lista de incidentes del alcance actual
    let btn = $("#btnListaInc");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "btnListaInc";
      btn.className = "btn";
      btn.style.marginTop = "10px";
      btn.addEventListener("click", abrirResumen);
      $("#mapHeader > div").appendChild(btn);
    }
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg> Ver ${total} incidente${total === 1 ? "" : "s"}`;
  }

  function renderStats() {
    const lista = enAlcance();
    const c = e => lista.filter(i => estadoActual(i) === e).length;
    $("#stats").innerHTML = ["en_ejecucion", "finalizado", "rechazado"]
      .map(e => `<span class="stat"><span class="dot" style="background:${ESTADOS[e].color}"></span>${ESTADOS[e].label} <b>${c(e)}</b></span>`)
      .join("") + `<span class="stat">Total <b>${lista.length}</b></span>`;
  }

  function renderFiltros() {
    const lista = enAlcance();
    $("#filtroEstados").innerHTML = Object.entries(ESTADOS).map(([k, e]) => {
      const n = lista.filter(i => estadoActual(i) === k).length;
      return `<button class="chip${ui.estados.has(k) ? "" : " off"}" data-estado="${k}" aria-pressed="${ui.estados.has(k)}">
        <span class="dot" style="background:${e.color}"></span>${e.label} <span class="n">${n}</span></button>`;
    }).join("");
    $("#filtroTipos").innerHTML = Object.entries(TIPOS).map(([k, t]) => {
      const n = lista.filter(i => i.tipo === k).length;
      return `<button class="chip${ui.tipos.has(k) ? "" : " off"}" data-tipo="${k}" aria-pressed="${ui.tipos.has(k)}" title="${t.label}">
        <span class="chip-ico">${icono(k)}</span>${t.label} <span class="n">${n}</span></button>`;
    }).join("");
  }

  function renderTodo() {
    renderLista(); renderHeader(); renderStats(); renderFiltros(); dibujarMarcadores();
    Object.entries(circulos).forEach(([id, c]) => c.setStyle(
      id === ui.barrio
        ? { weight: 2.5, fillOpacity: 0.08, dashArray: null, color: "#0e4a6e" }
        : { weight: 1.5, fillOpacity: ui.barrio ? 0.02 : 0.05, dashArray: "6 6", color: "#0e4a6e" }
    ));
  }

  /* ---------- Navegación ---------- */
  function irABarrio(id, { volar = true, desdeHash = false } = {}) {
    ui.barrio = id && barrioById[id] ? id : null;
    ui.seleccionado = null;
    cerrarDrawer(false);
    renderTodo();
    if (volar) {
      if (ui.barrio) {
        const b = barrioById[ui.barrio];
        map.flyTo(b.centro, b.zoom || 16, { duration: 0.9 });
      } else {
        map.flyTo(CIUDAD.centro, CIUDAD.zoom, { duration: 0.9 });
      }
    }
    if (!desdeHash) setHash(ui.barrio || "");
    cerrarSidebar();
  }

  function setHash(h) {
    const destino = h ? "#" + h : "";
    if (location.hash !== destino) {
      try { history.replaceState(null, "", destino || location.pathname + location.search); } catch { /* file:// en algunos navegadores */ }
    }
  }

  function leerHash() {
    const h = decodeURIComponent(location.hash.slice(1));
    if (!h) return irABarrio(null, { desdeHash: true });
    if (barrioById[h]) return irABarrio(h, { desdeHash: true });
    const inc = INCIDENTES.find(i => i.id.toLowerCase() === h.toLowerCase());
    if (inc) {
      irABarrio(inc.barrio, { desdeHash: true, volar: false });
      abrirIncidente(inc.id, { desdeHash: true });
    }
  }

  /* ---------- Drawer: detalle del incidente ---------- */
  function progreso(inc) {
    const actual = estadoActual(inc);
    const pasados = new Set(inc.historial.map(h => h.estado));
    const color = ESTADOS[actual].color;
    let barras;
    if (actual === "rechazado") {
      const alcanzado = Math.max(...inc.historial.filter(h => h.estado !== "rechazado").map(h => ESTADOS[h.estado].orden), 1);
      barras = PASOS_FLUJO.map((_, i) => `<span class="${i < alcanzado ? "on" : ""}"></span>`).join("");
    } else {
      const ord = ESTADOS[actual].orden;
      barras = PASOS_FLUJO.map(p => `<span class="${ESTADOS[p].orden <= ord || pasados.has(p) ? "on" : ""}"></span>`).join("");
    }
    return `<div class="d-progress" style="--c:${color}">${barras}</div>
      <div class="d-progress-labels"><span>Registrado</span><span>${actual === "rechazado" ? "Rechazado" : "Finalizado"}</span></div>`;
  }

  function abrirIncidente(id, { desdeHash = false } = {}) {
    const inc = incById[id];
    if (!inc) return;
    ui.seleccionado = id;
    const actual = estadoActual(inc);
    const est = ESTADOS[actual];
    const barrio = barrioById[inc.barrio];
    const primero = inc.historial[0];
    const ultimo = inc.historial[inc.historial.length - 1];
    const cerrado = ["finalizado", "rechazado"].includes(actual);
    const ahora = new Date().toISOString().slice(0, 16);
    const duracionTotal = dias(primero.fecha, cerrado ? ultimo.fecha : ahora);

    const timeline = inc.historial.map((h, i) => {
      const e = ESTADOS[h.estado] || { label: h.estado, color: "#999" };
      const esActual = i === inc.historial.length - 1;
      const sig = inc.historial[i + 1];
      const gap = sig ? `<span class="tl-gap">${fmtDuracion(dias(h.fecha, sig.fecha))} en esta etapa</span>`
        : (!cerrado ? `<span class="tl-gap">Hace ${fmtDuracion(dias(h.fecha, ahora))} en esta etapa</span>` : "");
      return `<li class="tl-item${esActual ? " current" : ""}" style="--c:${e.color}">
        <span class="tl-dot"></span>
        <div class="tl-head">
          <span class="tl-state">${esc(e.label)}${esActual ? '<span class="tl-current-tag">Actual</span>' : ""}</span>
          <time class="tl-date" datetime="${esc(h.fecha)}">${fmtFecha(h.fecha)}</time>
        </div>
        <div class="tl-area">${esc(h.area)}</div>
        <p class="tl-note">${esc(h.nota)}</p>
        ${gap}
      </li>`;
    }).join("");

    const gmaps = `https://www.google.com/maps/search/?api=1&query=${inc.lat},${inc.lng}`;
    const street = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${inc.lat},${inc.lng}`;

    $("#drawerBody").innerHTML = `
      <div class="d-hero" style="--c:${est.color}">
        <div class="d-type"><span class="chip-ico">${icono(inc.tipo)}</span>${esc(TIPOS[inc.tipo]?.label || inc.tipo)}</div>
        <h3>${esc(inc.titulo)}</h3>
        <p class="d-addr">${esc(inc.direccion)} · ${esc(barrio?.nombre || "")}</p>
        <div class="d-status-row">
          <span class="badge"><span class="dot"></span>${est.label}</span>
          <span class="d-id">${esc(inc.id)}</span>
        </div>
        ${progreso(inc)}
      </div>

      <section class="d-section">
        <dl class="d-meta">
          <div><dt>${cerrado ? "Tiempo de resolución" : "Abierto hace"}</dt><dd class="big">${fmtDuracion(duracionTotal)}</dd></div>
          <div><dt>Pasos registrados</dt><dd class="big">${inc.historial.length}</dd></div>
          <div><dt>Prioridad</dt><dd>${esc(PRIORIDAD[inc.prioridad] || inc.prioridad || "—")}</dd></div>
          <div><dt>Ingresó por</dt><dd>${esc(inc.origen || "—")}</dd></div>
          <div><dt>Fecha de alta</dt><dd>${fmtCorta(primero.fecha)}</dd></div>
          <div><dt>Última actualización</dt><dd>${fmtCorta(ultimo.fecha)}</dd></div>
        </dl>
      </section>

      <section class="d-section">
        <h4>Descripción</h4>
        <p class="d-desc">${esc(inc.descripcion)}</p>
      </section>

      <section class="d-section">
        <h4>Historial de estados</h4>
        <ol class="timeline">${timeline}</ol>
      </section>

      <div class="d-actions">
        <a class="btn primary" href="${gmaps}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>Ver en Google Maps</a>
        <a class="btn" href="${street}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2"/><path d="M10 22v-6l-2-1V10a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5l-2 1v6"/></svg>Street View</a>
        <button class="btn" id="btnCopiarId">
          <svg viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>Copiar código</button>
      </div>`;

    $("#btnCopiarId").addEventListener("click", () => copiar(inc.id, "Código copiado"));
    abrirDrawer();
    dibujarMarcadores();

    // Centrar el marcador dejando lugar al panel
    const zoom = Math.max(map.getZoom(), 16);
    const pt = map.project([inc.lat, inc.lng], zoom);
    const offset = isMobile() ? L.point(0, window.innerHeight * 0.28) : L.point(-(document.querySelector("#drawer").offsetWidth / 2), 0);
    map.flyTo(map.unproject(pt.subtract(offset), zoom), zoom, { duration: 0.6 });

    if (!desdeHash) setHash(inc.id.toLowerCase());
  }

  /* ---------- Drawer: resumen del barrio / ciudad ---------- */
  function abrirResumen() {
    ui.seleccionado = null;
    const lista = visibles().sort((a, b) =>
      ESTADOS[estadoActual(a)].orden - ESTADOS[estadoActual(b)].orden || b.historial[0].fecha.localeCompare(a.historial[0].fecha));
    const b = ui.barrio ? barrioById[ui.barrio] : null;
    $("#drawerBody").innerHTML = `
      <div class="d-hero" style="--c:#0e4a6e">
        <div class="d-type">${b ? "Distrito " + esc(b.distrito) : "Ciudad de Santa Fe"}</div>
        <h3>${b ? esc(b.nombre) : "Todos los barrios"}</h3>
        <p class="d-addr">${lista.length} incidente${lista.length === 1 ? "" : "s"} con los filtros actuales</p>
        <div class="bi-bar" style="display:flex;height:8px;border-radius:4px;overflow:hidden;background:var(--line);margin-top:14px">${barraEstados(lista)}</div>
      </div>
      <section class="d-section" style="padding:10px 12px">
        ${lista.length ? lista.map(i => {
          const e = ESTADOS[estadoActual(i)];
          return `<button class="inc-row" data-inc="${esc(i.id)}" style="--c:${e.color}">
            <span class="chip-ico">${icono(i.tipo)}</span>
            <span><b>${esc(i.titulo)}</b><small>${esc(i.direccion)}${b ? "" : " · " + esc(barrioById[i.barrio]?.nombre)}</small></span>
            <span class="badge" style="--c:${e.color}">${e.label}</span>
          </button>`;
        }).join("") : `<p style="padding:12px;color:var(--ink-3)">No hay incidentes con estos filtros.</p>`}
      </section>`;
    abrirDrawer();
    dibujarMarcadores();
  }

  function abrirDrawer() {
    const d = $("#drawer");
    d.classList.add("open");
    d.setAttribute("aria-hidden", "false");
    d.scrollTop = 0;
    $(".layout").classList.add("drawer-open");
    if (isMobile()) $("#backdrop").classList.add("show");
  }
  function cerrarDrawer(actualizarHash = true) {
    const d = $("#drawer");
    d.classList.remove("open");
    d.setAttribute("aria-hidden", "true");
    $(".layout").classList.remove("drawer-open");
    $("#backdrop").classList.remove("show");
    if (ui.seleccionado) {
      ui.seleccionado = null;
      dibujarMarcadores();
    }
    if (actualizarHash) setHash(ui.barrio || "");
  }

  /* ---------- Sidebar en mobile ---------- */
  function abrirSidebar() { $("#sidebar").classList.add("open"); $("#backdrop").classList.add("show"); }
  function cerrarSidebar() {
    $("#sidebar").classList.remove("open");
    if (!$("#drawer").classList.contains("open")) $("#backdrop").classList.remove("show");
  }

  /* ---------- Eventos ---------- */
  $("#listaBarrios").addEventListener("click", e => {
    const btn = e.target.closest("[data-barrio]");
    if (btn) irABarrio(btn.dataset.barrio);
  });
  $("#btnCiudad").addEventListener("click", () => irABarrio(null));
  $("#buscar").addEventListener("input", e => { ui.busqueda = e.target.value; renderLista(); });

  $("#filtros").addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const [set, key] = chip.dataset.estado ? [ui.estados, chip.dataset.estado] : [ui.tipos, chip.dataset.tipo];
    // Si están todos activos, el primer clic deja solo ese ("solo mostrar esto")
    const todos = set.size === (set === ui.estados ? Object.keys(ESTADOS).length : Object.keys(TIPOS).length);
    if (todos) { set.clear(); set.add(key); }
    else if (set.has(key)) { set.delete(key); if (!set.size) Object.keys(set === ui.estados ? ESTADOS : TIPOS).forEach(k => set.add(k)); }
    else set.add(key);
    renderFiltros(); dibujarMarcadores(); renderHeader();
    if ($("#drawer").classList.contains("open") && !ui.seleccionado) abrirResumen();
  });

  $("#drawerBody").addEventListener("click", e => {
    const row = e.target.closest("[data-inc]");
    if (row) abrirIncidente(row.dataset.inc);
  });
  $("#cerrarDrawer").addEventListener("click", () => cerrarDrawer());
  $("#backdrop").addEventListener("click", () => { cerrarDrawer(); cerrarSidebar(); });
  $("#btnBarrios").addEventListener("click", abrirSidebar);
  document.addEventListener("keydown", e => { if (e.key === "Escape") { cerrarDrawer(); cerrarSidebar(); } });
  window.addEventListener("hashchange", leerHash);

  // Bottom sheet: deslizar hacia abajo para cerrar (mobile)
  (() => {
    const d = $("#drawer");
    let y0 = null;
    d.addEventListener("touchstart", e => { if (d.scrollTop <= 0) y0 = e.touches[0].clientY; }, { passive: true });
    d.addEventListener("touchmove", e => {
      if (y0 === null) return;
      const dy = e.touches[0].clientY - y0;
      if (dy > 0) d.style.transform = `translateY(${dy}px)`;
    }, { passive: true });
    d.addEventListener("touchend", e => {
      if (y0 === null) return;
      const dy = e.changedTouches[0].clientY - y0;
      d.style.transform = "";
      if (dy > 110) cerrarDrawer();
      y0 = null;
    });
  })();

  /* ---------- Inicio ---------- */
  renderTodo();
  leerHash();
})();
