/*
 * INCIDENTES (DATOS DE EJEMPLO)
 * -----------------------------
 * Casos ficticios inspirados en reclamos vecinales reales publicados por
 * medios locales (El Litoral, Aire de Santa Fe). Fechas, números y
 * responsables son inventados para el prototipo.
 *
 * Cómo cargar uno nuevo: copiá un bloque { ... }, cambiá el id y completá.
 *
 *   id        -> código de seguimiento único
 *   barrio    -> id del barrio (ver data/barrios.js)
 *   tipo      -> bache | calle | luminaria | residuos | cloaca | desague | arbolado
 *   titulo, direccion, descripcion
 *   lat, lng  -> ubicación (clic en el mapa para obtenerla)
 *   prioridad -> baja | media | alta
 *   origen    -> canal por el que entró el reclamo
 *   historial -> lista ORDENADA de pasos. El ÚLTIMO paso es el estado actual.
 *      estado: registrado | en_revision | derivado | en_ejecucion | finalizado | rechazado
 *      fecha:  "AAAA-MM-DDTHH:MM"
 *      area:   quién hizo el paso
 *      nota:   detalle
 */
window.INCIDENTES = [

  /* ======================= BARRANQUITAS ======================= */
  {
    id: "INC-2026-0412", barrio: "barranquitas", tipo: "bache",
    titulo: "Hundimiento de calzada y baches profundos",
    direccion: "Ecuador al 3800", lat: -31.6368, lng: -60.7298,
    prioridad: "alta", origen: "Línea 0800 de Atención Ciudadana",
    descripcion: "Hundimiento marcado del pavimento y varios baches de gran profundidad. Vecinos señalan riesgo para motos, sobre todo de noche.",
    historial: [
      { estado: "registrado",   fecha: "2026-08-04T09:12", area: "Atención Ciudadana", nota: "Reclamo telefónico de una vecina. Se adjuntan 3 fotos." },
      { estado: "en_revision",  fecha: "2026-08-06T11:40", area: "Inspección de Obras Viales", nota: "Inspector constata hundimiento de ~4 m². Se señaliza con conos." },
      { estado: "derivado",     fecha: "2026-08-12T08:30", area: "Secretaría de Obras Públicas", nota: "Se incorpora al plan de bacheo del Distrito Oeste." },
      { estado: "en_ejecucion", fecha: "2026-10-27T07:45", area: "Cuadrilla de Bacheo N° 3", nota: "Corte de media calzada. Demolición y relleno con hormigón." },
      { estado: "finalizado",   fecha: "2026-11-03T16:20", area: "Inspección de Obras Viales", nota: "Obra recibida. Calzada habilitada." }
    ]
  },
  {
    id: "INC-2026-0433", barrio: "barranquitas", tipo: "bache",
    titulo: "Socavón en esquina",
    direccion: "Brasil y Ecuador", lat: -31.6395, lng: -60.7322,
    prioridad: "alta", origen: "App municipal",
    descripcion: "Socavón que se profundiza con cada lluvia. Posible pérdida de conducto pluvial debajo.",
    historial: [
      { estado: "registrado",   fecha: "2026-09-15T20:05", area: "Atención Ciudadana", nota: "Reclamo cargado desde la app con geolocalización." },
      { estado: "en_revision",  fecha: "2026-09-17T10:00", area: "Inspección de Obras Viales", nota: "Se detecta socavación por rotura de conducto. Requiere obra hidráulica." },
      { estado: "derivado",     fecha: "2026-09-18T09:15", area: "Dirección de Desagües y Drenaje", nota: "Se pide relevamiento con cámara del conducto." },
      { estado: "en_ejecucion", fecha: "2026-11-18T08:00", area: "Cuadrilla Hidráulica Oeste", nota: "Excavación y reemplazo de tramo de caño. Plazo estimado: 10 días." }
    ]
  },
  {
    id: "INC-2026-0451", barrio: "barranquitas", tipo: "luminaria",
    titulo: "Cuadras sin alumbrado público",
    direccion: "Iturraspe, acceso oeste", lat: -31.6402, lng: -60.7268,
    prioridad: "alta", origen: "Vecinal del barrio",
    descripcion: "Tres cuadras a oscuras tras el robo de cables. Los vecinos hicieron una protesta en el acceso oeste.",
    historial: [
      { estado: "registrado",   fecha: "2026-10-02T18:30", area: "Atención Ciudadana", nota: "Nota presentada por la vecinal con firmas." },
      { estado: "en_revision",  fecha: "2026-10-03T09:00", area: "Alumbrado Público", nota: "Se constata faltante de 220 m de conductor y 6 artefactos sin funcionar." },
      { estado: "en_ejecucion", fecha: "2026-10-09T08:10", area: "Cuadrilla de Alumbrado", nota: "Reposición de cableado. Se instalan luminarias LED." },
      { estado: "finalizado",   fecha: "2026-10-14T19:45", area: "Alumbrado Público", nota: "Verificación nocturna: 100% de los artefactos encendidos." }
    ]
  },
  {
    id: "INC-2026-0478", barrio: "barranquitas", tipo: "desague",
    titulo: "Anegamiento de viviendas tras tormenta",
    direccion: "Barranquitas Sur, cerca de Av. Perón", lat: -31.6412, lng: -60.7345,
    prioridad: "alta", origen: "Defensa Civil",
    descripcion: "Agua dentro de viviendas durante la madrugada. Las bocas de tormenta del sector están obstruidas.",
    historial: [
      { estado: "registrado",   fecha: "2026-11-10T05:20", area: "Defensa Civil", nota: "Asistencia a 12 familias. Se registra el punto crítico." },
      { estado: "en_revision",  fecha: "2026-11-11T10:30", area: "Dirección de Desagües y Drenaje", nota: "Bocas de tormenta tapadas con residuos y sedimento." },
      { estado: "derivado",     fecha: "2026-11-12T08:00", area: "Higiene Urbana", nota: "Limpieza de bocas de tormenta y retiro de residuos." }
    ]
  },

  /* ======================= VILLA DEL PARQUE ======================= */
  {
    id: "INC-2026-0389", barrio: "villa-del-parque", tipo: "luminaria",
    titulo: "Columnas de luz vandalizadas",
    direccion: "Borde del Parque Garay", lat: -31.6440, lng: -60.7160,
    prioridad: "media", origen: "Institución educativa",
    descripcion: "Ocho columnas vandalizadas en el perímetro del parque. El sector queda a oscuras.",
    historial: [
      { estado: "registrado",   fecha: "2026-07-21T12:00", area: "Atención Ciudadana", nota: "Reclamo de la escuela lindera." },
      { estado: "en_revision",  fecha: "2026-07-22T09:30", area: "Alumbrado Público", nota: "Se constatan 8 columnas sin tapa y sin cableado." },
      { estado: "en_ejecucion", fecha: "2026-07-28T08:00", area: "Cuadrilla de Alumbrado", nota: "Reposición con tapas antivandálicas." },
      { estado: "finalizado",   fecha: "2026-08-01T18:50", area: "Alumbrado Público", nota: "Servicio restablecido." }
    ]
  },
  {
    id: "INC-2026-0497", barrio: "villa-del-parque", tipo: "residuos",
    titulo: "Falta de desmalezado y residuos acumulados",
    direccion: "Calles internas de Villa del Parque", lat: -31.6468, lng: -60.7200,
    prioridad: "baja", origen: "App municipal",
    descripcion: "Pastizales altos y bolsas de residuos acumuladas en una esquina.",
    historial: [
      { estado: "registrado",   fecha: "2026-11-19T15:10", area: "Atención Ciudadana", nota: "Reclamo recibido. Pendiente de asignación." }
    ]
  },

  /* ======================= VILLA HIPÓDROMO ======================= */
  {
    id: "INC-2026-0402", barrio: "villa-hipodromo", tipo: "calle",
    titulo: "Calle de tierra intransitable",
    direccion: "Zona sur del barrio", lat: -31.6305, lng: -60.7270,
    prioridad: "media", origen: "Línea 0800 de Atención Ciudadana",
    descripcion: "Huellas profundas y barro. El recolector de residuos no puede entrar.",
    historial: [
      { estado: "registrado",   fecha: "2026-08-25T10:00", area: "Atención Ciudadana", nota: "Reclamo de un vecino." },
      { estado: "en_revision",  fecha: "2026-08-28T09:00", area: "Mantenimiento Vial", nota: "Se programa enripiado y perfilado." },
      { estado: "en_ejecucion", fecha: "2026-09-09T08:30", area: "Cuadrilla de Mantenimiento Vial", nota: "Perfilado con motoniveladora y aporte de ripio." },
      { estado: "finalizado",   fecha: "2026-09-11T15:00", area: "Mantenimiento Vial", nota: "Se completan 2 cuadras." }
    ]
  },

  /* ======================= SANTA ROSA DE LIMA ======================= */
  {
    id: "INC-2026-0367", barrio: "santa-rosa-de-lima", tipo: "residuos",
    titulo: "Microbasural en esquina de institución",
    direccion: "Frente al Centro de Acción Familiar", lat: -31.6512, lng: -60.7238,
    prioridad: "alta", origen: "Institución barrial",
    descripcion: "Basural a cielo abierto por falta de recolección. Se agrava con la lluvia porque la calle es de tierra.",
    historial: [
      { estado: "registrado",   fecha: "2026-07-08T11:00", area: "Atención Ciudadana", nota: "Reclamo presentado por la institución." },
      { estado: "en_revision",  fecha: "2026-07-09T09:00", area: "Higiene Urbana", nota: "Se estiman 6 m³ de residuos mezclados con escombro." },
      { estado: "en_ejecucion", fecha: "2026-07-11T07:30", area: "Programa Basura Barrio por Barrio", nota: "Retiro con pala cargadora y camión volcador." },
      { estado: "finalizado",   fecha: "2026-07-11T13:40", area: "Higiene Urbana", nota: "Espacio limpio. Se coloca cartel de prohibición y contenedor." }
    ]
  },
  {
    id: "INC-2026-0429", barrio: "santa-rosa-de-lima", tipo: "cloaca",
    titulo: "Desborde cloacal en vereda",
    direccion: "Tucumán y Aguado", lat: -31.6538, lng: -60.7268,
    prioridad: "alta", origen: "Línea 0800 de Atención Ciudadana",
    descripcion: "Líquido cloacal corre por la cuneta desde hace varios días. Olor fuerte.",
    historial: [
      { estado: "registrado",   fecha: "2026-09-12T08:45", area: "Atención Ciudadana", nota: "Reclamo de vecinos." },
      { estado: "en_revision",  fecha: "2026-09-12T12:00", area: "Coordinación Distrito Suroeste", nota: "La red cloacal no es competencia municipal." },
      { estado: "derivado",     fecha: "2026-09-12T12:15", area: "Aguas Santafesinas (ASSA)", nota: "Se deriva el reclamo a la empresa prestataria." },
      { estado: "en_ejecucion", fecha: "2026-09-14T09:30", area: "ASSA – Cuadrilla de desobstrucción", nota: "Desobstrucción con camión desobstructor." },
      { estado: "finalizado",   fecha: "2026-09-14T14:10", area: "ASSA", nota: "Colectora desobstruida. Se informa al municipio." }
    ]
  },
  {
    id: "INC-2026-0466", barrio: "santa-rosa-de-lima", tipo: "calle",
    titulo: "Calle rota por obra inconclusa",
    direccion: "Calle Estrada", lat: -31.6505, lng: -60.7280,
    prioridad: "media", origen: "Vecinal Estrada",
    descripcion: "El mejorado se rompió tras una obra de red y nunca se recompuso. Taxis y remises no ingresan.",
    historial: [
      { estado: "registrado",   fecha: "2026-10-20T10:20", area: "Atención Ciudadana", nota: "Nota de la vecinal." },
      { estado: "en_revision",  fecha: "2026-10-23T09:00", area: "Mantenimiento Vial", nota: "Se relevan 300 m. Se cotiza el recompuesto del mejorado." }
    ]
  },

  /* ======================= CENTENARIO ======================= */
  {
    id: "INC-2026-0418", barrio: "centenario", tipo: "cloaca",
    titulo: "Desborde cloacal recurrente en Fonavi",
    direccion: "Fonavi San Jerónimo, entre manzanas 11 y 12", lat: -31.6612, lng: -60.7155,
    prioridad: "alta", origen: "App municipal",
    descripcion: "Desborde constante de una cámara cloacal entre dos manzanas del Fonavi.",
    historial: [
      { estado: "registrado",   fecha: "2026-08-30T19:00", area: "Atención Ciudadana", nota: "Reclamo con fotos." },
      { estado: "derivado",     fecha: "2026-08-31T09:00", area: "Aguas Santafesinas (ASSA)", nota: "Derivado a la prestataria." },
      { estado: "rechazado",    fecha: "2026-09-02T10:00", area: "Atención Ciudadana", nota: "Duplicado: ya existe el reclamo INC-2026-0416 por el mismo punto." }
    ]
  },
  {
    id: "INC-2026-0416", barrio: "centenario", tipo: "cloaca",
    titulo: "Cámara cloacal colapsada",
    direccion: "Fonavi San Jerónimo, manzana 11", lat: -31.6608, lng: -60.7160,
    prioridad: "alta", origen: "Vecinal",
    descripcion: "Cámara colapsada con desborde hacia las veredas y el sector de juegos.",
    historial: [
      { estado: "registrado",   fecha: "2026-08-29T10:30", area: "Atención Ciudadana", nota: "Nota de la vecinal." },
      { estado: "derivado",     fecha: "2026-08-29T12:00", area: "Aguas Santafesinas (ASSA)", nota: "Derivado con prioridad sanitaria." },
      { estado: "en_ejecucion", fecha: "2026-09-04T08:00", area: "ASSA – Obras", nota: "Reconstrucción de la cámara y del tramo de colectora." }
    ]
  },
  {
    id: "INC-2026-0480", barrio: "centenario", tipo: "luminaria",
    titulo: "Plan de recuperación de luminarias",
    direccion: "Calles internas de Centenario", lat: -31.6588, lng: -60.7190,
    prioridad: "media", origen: "Relevamiento municipal",
    descripcion: "El relevamiento municipal califica el sector como de iluminación mala. Se incluye en el plan de recuperación.",
    historial: [
      { estado: "registrado",   fecha: "2026-10-01T09:00", area: "Alumbrado Público", nota: "Alta por relevamiento de oficio." },
      { estado: "en_ejecucion", fecha: "2026-10-15T08:00", area: "Cuadrilla de Alumbrado", nota: "Recambio a LED en curso: 46 de 80 artefactos." }
    ]
  },

  /* ======================= SAN LORENZO ======================= */
  {
    id: "INC-2026-0441", barrio: "san-lorenzo", tipo: "arbolado",
    titulo: "Árbol con riesgo de caída",
    direccion: "Cerca de Av. Circunvalación", lat: -31.6598, lng: -60.7290,
    prioridad: "alta", origen: "Línea 0800 de Atención Ciudadana",
    descripcion: "Eucalipto inclinado sobre los cables tras la tormenta.",
    historial: [
      { estado: "registrado",   fecha: "2026-10-05T07:50", area: "Atención Ciudadana", nota: "Reclamo urgente." },
      { estado: "en_revision",  fecha: "2026-10-05T10:15", area: "Arbolado Urbano", nota: "Riesgo alto confirmado. Se pide corte de energía a la EPE." },
      { estado: "en_ejecucion", fecha: "2026-10-06T08:00", area: "Cuadrilla de Arbolado", nota: "Extracción con hidrogrúa." },
      { estado: "finalizado",   fecha: "2026-10-06T12:30", area: "Arbolado Urbano", nota: "Árbol extraído y restos retirados." }
    ]
  },
  {
    id: "INC-2026-0490", barrio: "san-lorenzo", tipo: "bache",
    titulo: "Bache en parada de colectivo",
    direccion: "Calle de la línea de colectivo", lat: -31.6618, lng: -60.7255,
    prioridad: "media", origen: "App municipal",
    descripcion: "Bache donde se detiene el colectivo; se junta agua.",
    historial: [
      { estado: "registrado",   fecha: "2026-11-14T13:00", area: "Atención Ciudadana", nota: "Reclamo recibido." },
      { estado: "en_revision",  fecha: "2026-11-18T09:40", area: "Inspección de Obras Viales", nota: "Se programa para la próxima quincena." }
    ]
  },

  /* ======================= CHALET ======================= */
  {
    id: "INC-2026-0455", barrio: "chalet", tipo: "desague",
    titulo: "Zanja obstruida",
    direccion: "Calle perimetral sur", lat: -31.6695, lng: -60.7230,
    prioridad: "media", origen: "Vecinal",
    descripcion: "La zanja a cielo abierto está tapada y el agua no escurre.",
    historial: [
      { estado: "registrado",   fecha: "2026-10-10T09:00", area: "Atención Ciudadana", nota: "Nota de la vecinal." },
      { estado: "en_revision",  fecha: "2026-10-13T10:00", area: "Dirección de Desagües y Drenaje", nota: "Hacen falta 400 m de limpieza." },
      { estado: "en_ejecucion", fecha: "2026-10-20T07:30", area: "Cuadrilla Hidráulica Suroeste", nota: "Limpieza con retroexcavadora." },
      { estado: "finalizado",   fecha: "2026-10-23T15:00", area: "Dirección de Desagües y Drenaje", nota: "Zanja limpia; escurre normal." }
    ]
  },

  /* ======================= CORONEL DORREGO ======================= */
  {
    id: "INC-2026-0420", barrio: "coronel-dorrego", tipo: "residuos",
    titulo: "Contenedor desbordado",
    direccion: "Esquina comercial del barrio", lat: -31.6158, lng: -60.7225,
    prioridad: "baja", origen: "App municipal",
    descripcion: "Contenedor lleno desde hace 4 días; hay bolsas en la calle.",
    historial: [
      { estado: "registrado",   fecha: "2026-09-01T08:00", area: "Atención Ciudadana", nota: "Reclamo recibido." },
      { estado: "en_ejecucion", fecha: "2026-09-01T14:00", area: "Recolección de Residuos", nota: "Se envía camión de refuerzo." },
      { estado: "finalizado",   fecha: "2026-09-01T17:30", area: "Recolección de Residuos", nota: "Contenedor vaciado y lavado." }
    ]
  },
  {
    id: "INC-2026-0470", barrio: "coronel-dorrego", tipo: "luminaria",
    titulo: "Luminaria encendida de día",
    direccion: "Calle interna", lat: -31.6175, lng: -60.7255,
    prioridad: "baja", origen: "App municipal",
    descripcion: "Luminaria encendida las 24 horas; posible fotocélula dañada.",
    historial: [
      { estado: "registrado",   fecha: "2026-10-28T11:00", area: "Atención Ciudadana", nota: "Reclamo recibido." },
      { estado: "en_revision",  fecha: "2026-10-30T09:00", area: "Alumbrado Público", nota: "Pendiente: reemplazo de fotocélula." }
    ]
  },

  /* ======================= LAS LOMAS ======================= */
  {
    id: "INC-2026-0395", barrio: "las-lomas", tipo: "residuos",
    titulo: "Residuos arrojados en el reservorio",
    direccion: "Reservorio oeste, calle Gorostiaga y Circunvalación", lat: -31.6022, lng: -60.7348,
    prioridad: "alta", origen: "Vecinos autoconvocados",
    descripcion: "Vecinos arrojan residuos en el borde del reservorio, lo que contamina el agua.",
    historial: [
      { estado: "registrado",   fecha: "2026-08-08T10:00", area: "Atención Ciudadana", nota: "Reclamo con fotos." },
      { estado: "en_revision",  fecha: "2026-08-10T09:00", area: "Ambiente", nota: "Se relevan 3 focos de residuos." },
      { estado: "en_ejecucion", fecha: "2026-08-14T08:00", area: "Higiene Urbana", nota: "Limpieza del borde del reservorio." },
      { estado: "finalizado",   fecha: "2026-08-16T13:00", area: "Ambiente", nota: "Limpieza terminada. Se suma a la recorrida de control semanal." }
    ]
  },
  {
    id: "INC-2026-0460", barrio: "las-lomas", tipo: "calle",
    titulo: "Pedido de pavimento",
    direccion: "Calle interna", lat: -31.6040, lng: -60.7315,
    prioridad: "baja", origen: "Vecinal",
    descripcion: "Los vecinos piden pavimentar la calle.",
    historial: [
      { estado: "registrado",   fecha: "2026-10-14T10:00", area: "Atención Ciudadana", nota: "Nota de la vecinal." },
      { estado: "en_revision",  fecha: "2026-10-20T10:00", area: "Secretaría de Obras Públicas", nota: "Es una obra nueva, no un reclamo de mantenimiento." },
      { estado: "rechazado",    fecha: "2026-10-22T12:00", area: "Secretaría de Obras Públicas", nota: "Fuera del circuito de reclamos. Se sugiere presentarlo en el Presupuesto Participativo." }
    ]
  },

  /* ======================= YAPEYÚ ======================= */
  {
    id: "INC-2026-0484", barrio: "yapeyu", tipo: "calle",
    titulo: "Calle intransitable tras paso de máquina",
    direccion: "Gob. Menchaca al 9700", lat: -31.5778, lng: -60.7172,
    prioridad: "alta", origen: "Comedor comunitario",
    descripcion: "La calle quedó peor después del perfilado; hay barro y agua estancada. Los chicos no llegan a la escuela ni al comedor.",
    historial: [
      { estado: "registrado",   fecha: "2026-11-05T09:30", area: "Atención Ciudadana", nota: "Reclamo del comedor comunitario." },
      { estado: "en_revision",  fecha: "2026-11-06T10:00", area: "Mantenimiento Vial", nota: "El perfilado se hizo sin ripio y bloqueó la cuneta." },
      { estado: "en_ejecucion", fecha: "2026-11-20T08:00", area: "Cuadrilla de Mantenimiento Vial", nota: "Aporte de ripio y reapertura de cunetas." }
    ]
  },
  {
    id: "INC-2026-0485", barrio: "yapeyu", tipo: "desague",
    titulo: "Desagüe anegado",
    direccion: "Teniente Loza", lat: -31.5795, lng: -60.7195,
    prioridad: "media", origen: "App municipal",
    descripcion: "Agua estancada desde hace más de una semana; hay mosquitos.",
    historial: [
      { estado: "registrado",   fecha: "2026-11-06T18:00", area: "Atención Ciudadana", nota: "Reclamo recibido." },
      { estado: "derivado",     fecha: "2026-11-08T09:00", area: "Dirección de Desagües y Drenaje", nota: "Se vincula con INC-2026-0484." }
    ]
  },

  /* ======================= LAS FLORES ======================= */
  {
    id: "INC-2026-0392", barrio: "las-flores", tipo: "cloaca",
    titulo: "Desborde cloacal entre monoblocks",
    direccion: "Estrada y Lamadrid (Las Flores II)", lat: -31.5958, lng: -60.7035,
    prioridad: "alta", origen: "Línea 0800 de Atención Ciudadana",
    descripcion: "Desbordes reiterados en las veredas. Las cañerías internas tienen más de 40 años.",
    historial: [
      { estado: "registrado",   fecha: "2026-08-05T09:00", area: "Atención Ciudadana", nota: "Reclamo recibido." },
      { estado: "derivado",     fecha: "2026-08-05T10:30", area: "Aguas Santafesinas (ASSA)", nota: "Derivado a la prestataria." },
      { estado: "en_ejecucion", fecha: "2026-08-07T08:00", area: "ASSA", nota: "Desobstrucción de colectora." },
      { estado: "finalizado",   fecha: "2026-08-07T15:00", area: "ASSA", nota: "Resuelto. Se recomienda una obra estructural de reemplazo." }
    ]
  },
  {
    id: "INC-2026-0448", barrio: "las-flores", tipo: "residuos",
    titulo: "Basura y yuyos altos",
    direccion: "Azopardo y Florencio Sánchez (Las Flores I)", lat: -31.5975, lng: -60.7005,
    prioridad: "media", origen: "App municipal",
    descripcion: "Residuos acumulados y pastizales en el espacio público.",
    historial: [
      { estado: "registrado",   fecha: "2026-09-29T10:00", area: "Atención Ciudadana", nota: "Reclamo recibido." },
      { estado: "en_revision",  fecha: "2026-09-30T09:00", area: "Higiene Urbana", nota: "Se programa desmalezado." },
      { estado: "en_ejecucion", fecha: "2026-10-06T07:30", area: "Cooperativa de desmalezado", nota: "Desmalezado y retiro de residuos." },
      { estado: "finalizado",   fecha: "2026-10-07T12:00", area: "Higiene Urbana", nota: "Sector limpio." }
    ]
  },
  {
    id: "INC-2026-0476", barrio: "las-flores", tipo: "luminaria",
    titulo: "Sector de torres a oscuras",
    direccion: "Lamadrid y Regimiento 12 de Infantería", lat: -31.5950, lng: -60.7015,
    prioridad: "alta", origen: "Vecinos (nota con firmas)",
    descripcion: "Los vecinos piden más iluminación frente a las torres por los episodios nocturnos de inseguridad.",
    historial: [
      { estado: "registrado",   fecha: "2026-11-02T11:00", area: "Atención Ciudadana", nota: "Nota con firmas." },
      { estado: "en_revision",  fecha: "2026-11-04T19:30", area: "Alumbrado Público", nota: "Recorrida nocturna: 9 artefactos apagados." },
      { estado: "en_ejecucion", fecha: "2026-11-21T08:00", area: "Cuadrilla de Alumbrado", nota: "Reemplazo por LED en curso." }
    ]
  },

  /* ======================= LOYOLA SUR ======================= */
  {
    id: "INC-2026-0427", barrio: "loyola-sur", tipo: "luminaria",
    titulo: "Plan de recuperación de alumbrado",
    direccion: "Calles internas de Loyola Sur", lat: -31.5868, lng: -60.7070,
    prioridad: "media", origen: "Relevamiento municipal",
    descripcion: "Uno de los barrios priorizados en el plan de recuperación de luminarias.",
    historial: [
      { estado: "registrado",   fecha: "2026-09-08T09:00", area: "Alumbrado Público", nota: "Alta de oficio." },
      { estado: "en_ejecucion", fecha: "2026-09-22T08:00", area: "Cuadrilla de Alumbrado", nota: "Recambio LED." },
      { estado: "finalizado",   fecha: "2026-10-30T17:00", area: "Alumbrado Público", nota: "Se recuperaron 112 artefactos." }
    ]
  },

  /* ======================= ESTANISLAO LÓPEZ ======================= */
  {
    id: "INC-2026-0472", barrio: "estanislao-lopez", tipo: "residuos",
    titulo: "Basural a cielo abierto",
    direccion: "Contreras y Varela", lat: -31.5882, lng: -60.6948,
    prioridad: "alta", origen: "Vecinos autoconvocados",
    descripcion: "Basural de años con agua estancada. Los vecinos reclaman por problemas sanitarios.",
    historial: [
      { estado: "registrado",   fecha: "2026-10-30T10:00", area: "Atención Ciudadana", nota: "Reclamo de más de 20 vecinos." },
      { estado: "en_revision",  fecha: "2026-11-03T09:00", area: "Higiene Urbana", nota: "Se estiman 40 m³. Hace falta maquinaria pesada." },
      { estado: "derivado",     fecha: "2026-11-05T10:00", area: "Programa Basura Barrio por Barrio", nota: "Se incluye en el plan de erradicación de microbasurales." }
    ]
  },

  /* ======================= EL POZO ======================= */
  {
    id: "INC-2026-0380", barrio: "el-pozo", tipo: "cloaca",
    titulo: "Rotura de cañería cloacal principal",
    direccion: "Colectora principal del barrio", lat: -31.6372, lng: -60.6600,
    prioridad: "alta", origen: "Línea 0800 de Atención Ciudadana",
    descripcion: "Roturas y obstrucciones frecuentes con olor muy fuerte en el barrio.",
    historial: [
      { estado: "registrado",   fecha: "2026-07-15T08:30", area: "Atención Ciudadana", nota: "Múltiples reclamos agrupados." },
      { estado: "derivado",     fecha: "2026-07-15T10:00", area: "Aguas Santafesinas (ASSA)", nota: "Derivado a la prestataria." },
      { estado: "en_revision",  fecha: "2026-07-20T09:00", area: "ASSA – Ingeniería", nota: "Se proyecta rehabilitación con manga curada." },
      { estado: "en_ejecucion", fecha: "2026-09-01T08:00", area: "ASSA – Obras", nota: "Rehabilitación sin zanja (manga curada) en curso." },
      { estado: "finalizado",   fecha: "2026-10-10T16:00", area: "ASSA", nota: "Tramo rehabilitado y en servicio." }
    ]
  },
  {
    id: "INC-2026-0436", barrio: "el-pozo", tipo: "residuos",
    titulo: "Microbasural en espacio verde",
    direccion: "Espacio verde junto a la avenida", lat: -31.6355, lng: -60.6570,
    prioridad: "media", origen: "Vecinal",
    descripcion: "Basural recurrente en un espacio verde. Se propone convertirlo en microplaza.",
    historial: [
      { estado: "registrado",   fecha: "2026-09-18T10:00", area: "Atención Ciudadana", nota: "Nota de la vecinal." },
      { estado: "en_revision",  fecha: "2026-09-22T09:00", area: "Higiene Urbana", nota: "Factible: limpieza más microplaza." },
      { estado: "en_ejecucion", fecha: "2026-10-05T08:00", area: "Programa Basura Barrio por Barrio", nota: "Retiro de residuos e instalación de juegos de plástico reciclado." },
      { estado: "finalizado",   fecha: "2026-10-30T11:00", area: "Espacios Verdes", nota: "Microplaza inaugurada." }
    ]
  },
  {
    id: "INC-2026-0488", barrio: "el-pozo", tipo: "desague",
    titulo: "Bombeo lento en la defensa",
    direccion: "Playa Los Alisos", lat: -31.6390, lng: -60.6545,
    prioridad: "media", origen: "App municipal",
    descripcion: "Agua acumulada del lado interno de la defensa después de las lluvias.",
    historial: [
      { estado: "registrado",   fecha: "2026-11-11T07:00", area: "Atención Ciudadana", nota: "Reclamo recibido." }
    ]
  },

  /* ======================= ALTO VERDE ======================= */
  {
    id: "INC-2026-0405", barrio: "alto-verde", tipo: "luminaria",
    titulo: "Manzana 2 sin alumbrado",
    direccion: "Manzana 2, Demetrio Gómez", lat: -31.6565, lng: -60.6850,
    prioridad: "alta", origen: "Parroquia y vecinos",
    descripcion: "Casi un año sin luminarias. Las únicas luces son las que ponen los vecinos.",
    historial: [
      { estado: "registrado",   fecha: "2026-08-19T10:00", area: "Atención Ciudadana", nota: "Reclamo de la parroquia." },
      { estado: "en_revision",  fecha: "2026-08-21T19:00", area: "Alumbrado Público", nota: "Recorrida nocturna: 14 columnas sin servicio." },
      { estado: "derivado",     fecha: "2026-08-25T09:00", area: "Alumbrado Público – Obras", nota: "Se incluye en el plan de luces LED de la costa." },
      { estado: "en_ejecucion", fecha: "2026-10-01T08:00", area: "Contratista de Alumbrado", nota: "Montaje de columnas y artefactos LED." },
      { estado: "finalizado",   fecha: "2026-11-06T20:00", area: "Alumbrado Público", nota: "Manzana 2 iluminada en su totalidad." }
    ]
  },
  {
    id: "INC-2026-0406", barrio: "alto-verde", tipo: "bache",
    titulo: "Pozos y hundimientos cerca de la escuela",
    direccion: "Zona de la Escuela N° 95", lat: -31.6585, lng: -60.6838,
    prioridad: "alta", origen: "Comunidad educativa",
    descripcion: "Calles con pozos y hundimientos; es la zona más afectada del barrio.",
    historial: [
      { estado: "registrado",   fecha: "2026-08-19T10:10", area: "Atención Ciudadana", nota: "Reclamo de la cooperadora escolar." },
      { estado: "en_revision",  fecha: "2026-08-26T09:00", area: "Inspección de Obras Viales", nota: "Se relevan 18 baches." },
      { estado: "en_ejecucion", fecha: "2026-11-17T07:30", area: "Cuadrilla de Bacheo N° 1", nota: "Bacheo en curso: 7 de 18." }
    ]
  },
  {
    id: "INC-2026-0459", barrio: "alto-verde", tipo: "desague",
    titulo: "Anegamientos y barro tras la lluvia",
    direccion: "Calles bajas del distrito", lat: -31.6630, lng: -60.6830,
    prioridad: "alta", origen: "Vecinal",
    descripcion: "Cada vez que llueve quedan calles anegadas y con barro.",
    historial: [
      { estado: "registrado",   fecha: "2026-10-12T08:00", area: "Atención Ciudadana", nota: "Nota de la vecinal." },
      { estado: "en_revision",  fecha: "2026-10-15T10:00", area: "Dirección de Desagües y Drenaje", nota: "Se revisa el funcionamiento de las estaciones de bombeo." },
      { estado: "derivado",     fecha: "2026-10-20T09:00", area: "Secretaría de Obras Públicas", nota: "Requiere proyecto de cordón cuneta. Queda en análisis presupuestario." }
    ]
  },

  /* ======================= LA GUARDIA ======================= */
  {
    id: "INC-2026-0444", barrio: "la-guardia", tipo: "luminaria",
    titulo: "Tramo de la RN 168 sin iluminación",
    direccion: "RN 168, acceso a La Guardia", lat: -31.6412, lng: -60.6300,
    prioridad: "alta", origen: "Vecinal",
    descripcion: "Tramo oscuro de la ruta con cruce peatonal. Los vecinos lo piden tras un siniestro vial.",
    historial: [
      { estado: "registrado",   fecha: "2026-10-07T09:00", area: "Atención Ciudadana", nota: "Nota de la vecinal." },
      { estado: "en_revision",  fecha: "2026-10-09T10:00", area: "Alumbrado Público", nota: "La ruta nacional es jurisdicción de Vialidad Nacional." },
      { estado: "rechazado",    fecha: "2026-10-10T12:00", area: "Alumbrado Público", nota: "Sin competencia municipal. Se gira nota a Vialidad Nacional." }
    ]
  },

  /* ======================= COLASTINÉ NORTE ======================= */
  {
    id: "INC-2026-0461", barrio: "colastine-norte", tipo: "arbolado",
    titulo: "Montículos de ramas sin retirar",
    direccion: "Calles internas, junto a Ruta Prov. 1", lat: -31.6318, lng: -60.6030,
    prioridad: "media", origen: "Vecinal",
    descripcion: "Restos de poda acumulados en varias esquinas desde hace semanas.",
    historial: [
      { estado: "registrado",   fecha: "2026-10-16T09:00", area: "Atención Ciudadana", nota: "Reclamo formal de la vecinal después de varios llamados al 0800." },
      { estado: "en_revision",  fecha: "2026-10-19T09:00", area: "Higiene Urbana", nota: "Se relevan 23 puntos con ramas." },
      { estado: "en_ejecucion", fecha: "2026-11-04T07:00", area: "Recolección de Restos Verdes", nota: "Operativo en curso. Se suman 2 camiones." }
    ]
  },
  {
    id: "INC-2026-0462", barrio: "colastine-norte", tipo: "calle",
    titulo: "Calles bajas con agua y deterioradas",
    direccion: "Sector bajo del barrio", lat: -31.6350, lng: -60.6070,
    prioridad: "media", origen: "App municipal",
    descripcion: "Agua acumulada y calles de tierra muy deterioradas en las zonas más bajas.",
    historial: [
      { estado: "registrado",   fecha: "2026-10-16T19:00", area: "Atención Ciudadana", nota: "Reclamo recibido." },
      { estado: "en_revision",  fecha: "2026-10-22T09:00", area: "Mantenimiento Vial", nota: "Hay que esperar que baje el agua para intervenir." },
      { estado: "en_ejecucion", fecha: "2026-11-10T08:00", area: "Cuadrilla de Mantenimiento Vial Costa", nota: "Perfilado y aporte de material." },
      { estado: "finalizado",   fecha: "2026-11-15T15:00", area: "Mantenimiento Vial", nota: "Se completan 6 cuadras." }
    ]
  },

  /* ======================= COLASTINÉ SUR ======================= */
  {
    id: "INC-2026-0400", barrio: "colastine-sur", tipo: "cloaca",
    titulo: "Viviendas sin conexión a la red de agua",
    direccion: "Viviendas cercanas a la planta potabilizadora", lat: -31.6600, lng: -60.6020,
    prioridad: "media", origen: "Vecinal",
    descripcion: "Con la nueva planta potabilizadora, todavía quedan viviendas por conectar. Hasta ahora dependían del camión aguatero.",
    historial: [
      { estado: "registrado",   fecha: "2026-08-20T10:00", area: "Atención Ciudadana", nota: "Listado de 15 viviendas sin conexión." },
      { estado: "en_revision",  fecha: "2026-08-24T10:00", area: "Servicios Públicos", nota: "Se relevan las conexiones domiciliarias pendientes." },
      { estado: "en_ejecucion", fecha: "2026-09-07T08:00", area: "Cuadrilla de Conexiones", nota: "Conexiones en curso: 9 de 15." }
    ]
  },
  {
    id: "INC-2026-0493", barrio: "colastine-sur", tipo: "residuos",
    titulo: "Residuos en la costa del río",
    direccion: "Costa del río Colastiné", lat: -31.6620, lng: -60.5985,
    prioridad: "baja", origen: "App municipal",
    descripcion: "Residuos en la orilla después del fin de semana.",
    historial: [
      { estado: "registrado",   fecha: "2026-11-17T09:00", area: "Atención Ciudadana", nota: "Reclamo recibido." }
    ]
  }
];
