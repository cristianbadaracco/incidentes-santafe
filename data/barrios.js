/*
 * BARRIOS DE LA CIUDAD DE SANTA FE
 * ---------------------------------
 * centro: [latitud, longitud] del centro aproximado del barrio.
 * fuente: de dónde sale la coordenada.
 *   - "GeoNames"   -> coordenada del nomenclador geográfico GeoNames.
 *   - "Referencia" -> ubicada a partir de calles/límites citados en notas periodísticas
 *                     (verificar y ajustar si hace falta).
 *
 * TIP: en el mapa, hacé clic en cualquier punto y se muestran lat/lng con un
 * botón para copiarlas. Sirve para ajustar estos valores o cargar incidentes.
 *
 * El id se usa en la URL: index.html#barranquitas abre directamente ese barrio.
 */
window.BARRIOS = [
  // ---------- Distrito Oeste ----------
  { id: "barranquitas", nombre: "Barranquitas", distrito: "Oeste",
    centro: [-31.6385, -60.7310], zoom: 16, radio: 650, fuente: "Referencia",
    referencia: "Entre Av. Presidente Perón y el río Salado; acceso oeste por Iturraspe." },
  { id: "villa-del-parque", nombre: "Villa del Parque", distrito: "Oeste",
    centro: [-31.6455, -60.7185], zoom: 16, radio: 500, fuente: "Referencia",
    referencia: "Lindero al Parque Garay; al sur de Barranquitas Sur." },
  { id: "villa-hipodromo", nombre: "Villa Hipódromo", distrito: "Oeste",
    centro: [-31.6290, -60.7285], zoom: 16, radio: 500, fuente: "Referencia",
    referencia: "Al norte de Barranquitas, en el entorno de Av. Perón." },

  // ---------- Distrito Suroeste ----------
  { id: "santa-rosa-de-lima", nombre: "Santa Rosa de Lima", distrito: "Suroeste",
    centro: [-31.6525, -60.7255], zoom: 16, radio: 650, fuente: "Referencia",
    referencia: "Entre vías del FC Mitre (S y E), Av. Circunvalación (O) y vías del ex FC Belgrano (N)." },
  { id: "centenario", nombre: "Centenario", distrito: "Suroeste",
    centro: [-31.6600, -60.7170], zoom: 16, radio: 550, fuente: "Referencia",
    referencia: "Incluye el Fonavi San Jerónimo." },
  { id: "san-lorenzo", nombre: "San Lorenzo", distrito: "Suroeste",
    centro: [-31.6605, -60.7270], zoom: 16, radio: 550, fuente: "Referencia",
    referencia: "Suroeste, junto a Av. Circunvalación." },
  { id: "chalet", nombre: "Barrio Chalet", distrito: "Suroeste",
    centro: [-31.6685, -60.7245], zoom: 16, radio: 450, fuente: "Referencia",
    referencia: "Extremo sur del cordón oeste." },

  // ---------- Distrito Noroeste ----------
  { id: "coronel-dorrego", nombre: "Coronel Dorrego", distrito: "Noroeste",
    centro: [-31.6165, -60.7240], zoom: 16, radio: 550, fuente: "Referencia",
    referencia: "Noroeste de la ciudad." },
  { id: "las-lomas", nombre: "Las Lomas", distrito: "Noroeste",
    centro: [-31.6030, -60.7330], zoom: 16, radio: 600, fuente: "Referencia",
    referencia: "Contra Av. Circunvalación y los reservorios del oeste (calle Gorostiaga)." },
  { id: "yapeyu", nombre: "Yapeyú", distrito: "Noroeste",
    centro: [-31.5785, -60.7180], zoom: 16, radio: 650, fuente: "Referencia",
    referencia: "Entorno de Gob. Menchaca al 9700 y Teniente Loza." },

  // ---------- Distrito Norte ----------
  { id: "las-flores", nombre: "Las Flores", distrito: "Norte",
    centro: [-31.5965, -60.7020], zoom: 16, radio: 600, fuente: "Referencia",
    referencia: "Torres y monoblocks de Lamadrid, Estrada y Regimiento 12 de Infantería." },
  { id: "loyola-sur", nombre: "San Ignacio de Loyola Sur", distrito: "Norte",
    centro: [-31.5860, -60.7085], zoom: 16, radio: 550, fuente: "Referencia",
    referencia: "Norte de la ciudad." },
  { id: "estanislao-lopez", nombre: "Estanislao López", distrito: "Norte",
    centro: [-31.5885, -60.6955], zoom: 16, radio: 500, fuente: "Referencia",
    referencia: "Contreras y Varela, cerca de Cafferata al 8500." },

  // ---------- Distrito Este ----------
  { id: "el-pozo", nombre: "El Pozo", distrito: "Este",
    centro: [-31.6367, -60.6591], zoom: 16, radio: 600, fuente: "GeoNames",
    referencia: "Al este de Ciudad Universitaria (UNL); incluye la zona de playa Los Alisos." },

  // ---------- Distrito La Costa ----------
  { id: "alto-verde", nombre: "Alto Verde", distrito: "La Costa",
    centro: [-31.6590, -60.6845], zoom: 15, radio: 1000, fuente: "Referencia",
    referencia: "Isla Sirgadero, margen del Canal de Acceso al Puerto; al sur de la RN 168. Plaza en Demetrio Gómez, manzana 2." },
  { id: "la-guardia", nombre: "La Guardia", distrito: "La Costa",
    centro: [-31.6408, -60.6278], zoom: 15, radio: 800, fuente: "GeoNames",
    referencia: "Sobre la RN 168, camino a Colastiné." },
  { id: "colastine-norte", nombre: "Colastiné Norte", distrito: "La Costa",
    centro: [-31.6333, -60.6047], zoom: 15, radio: 1100, fuente: "GeoNames",
    referencia: "A la vera de la Ruta Provincial N° 1." },
  { id: "colastine-sur", nombre: "Colastiné Sur", distrito: "La Costa",
    centro: [-31.6608, -60.6008], zoom: 15, radio: 900, fuente: "GeoNames",
    referencia: "Barrio más antiguo de la ciudad, a orillas del río Colastiné." }
];
