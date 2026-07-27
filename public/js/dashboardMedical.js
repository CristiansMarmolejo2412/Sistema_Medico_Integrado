// TOGGLE SIDEBAR //
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const main    = document.getElementById("mainContent");
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle("open");
    document.getElementById("sidebarOverlay").classList.toggle("show");
  } else {
    sidebar.classList.toggle("collapsed");
    main.classList.toggle("collapsed");
    document.getElementById("toggleBtn").style.marginLeft =
      sidebar.classList.contains("collapsed") ? "4px" : "";
  }
}

function cerrarSidebarMovil() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebarOverlay").classList.remove("show");
}


// NAVEGACIÓN ENTRE VISTAS // 
function cambiarVista(e, viewId, link) {
  e.preventDefault();
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("preActive"));
  link.classList.add("preActive");
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById(viewId).classList.add("active");
  if (window.innerWidth <= 768) cerrarSidebarMovil();
}

// CERRAR SESIÓN //
function cerrarSesion() {
  if (confirm("¿Seguro que deseas cerrar sesión?")) {
    alert("Sesión cerrada. Redirigiendo al login...");
  }
}

// BOTON INICIAR CONSULTA // 
function iniciarConsulta(id) {
  const cita = document.getElementById(id);
  cita.classList.replace("estado-pendiente", "estado-encurso");
  cita.querySelector(".state").textContent = "En curso";
  cita.querySelector(".state").className = "state yellowState";
  cita.querySelector(".hour").classList.add("hour-encurso");
  const btn = cita.querySelector(".btn-iniciar");
  btn.textContent = "Finalizar Consulta";
  btn.className = "btn-consulta btn-finalizar";
  btn.setAttribute("onclick", `finalizarConsulta('${id}')`);
}

// BOTON FINALIZAR CONSULTA // 
function finalizarConsulta(id) {
  const cita = document.getElementById(id);
  cita.classList.replace("estado-encurso", "estado-completada");
  cita.querySelector(".state").textContent = "Completado";
  cita.querySelector(".state").className = "state greenState";
  cita.querySelector(".hour").classList.remove("hour-encurso");
  cita.querySelector(".btn-full-row").style.display = "none";
}

// MODAL GESTIÒN CITAS // 

function abrirModal() {
  document.getElementById("modalGestionCitas").classList.add("abierto");
  actualizarSubtitulo();
}

function cerrarModal() {
  document.getElementById("modalGestionCitas").classList.remove("abierto");
}

function filtrarCitas() {
  const texto  = document.querySelector(".modal-gc-search").value.toLowerCase();
  const estado = document.querySelector(".modal-gc-select").value;
  let visibles  = 0;

  document.querySelectorAll(".cita-card").forEach(card => {
    const coincide = card.textContent.toLowerCase().includes(texto) &&
                     (!estado || card.dataset.estado === estado);
    card.style.display = coincide ? "" : "none";
    if (coincide) visibles++;
  });

  const sinRes = document.querySelector(".sin-resultados");
  if (sinRes) sinRes.remove();

  if (visibles === 0) {
    const msg = document.createElement("p");
    msg.className  = "sin-resultados";
    msg.textContent = "No se encontraron citas.";
    document.getElementById("listaCitas").appendChild(msg);
  }

  actualizarSubtitulo(visibles);
}

function actualizarSubtitulo(n) {
  const total = n !== undefined ? n : document.querySelectorAll(".cita-card").length;
  document.getElementById("modalSubtitulo").textContent = `Total de citas ${total}`;
}

// FUNCIONES REPROGRAMAR CITA // 

function abrirReprogramar(btn) {
  const card = btn.closest(".cita-card");
  const nombre = card.querySelector(".cita-info:nth-child(4)").textContent.replace("👤","").trim();
  document.getElementById("reprogramarNombre").textContent = nombre;

  // Oculta solo el contenido del modal de gestión, NO el overlay
  document.getElementById("modalGestionCitas").classList.remove("abierto");
  document.getElementById("modalReprogramar").classList.add("abierto");
}
function cerrarReprogramar() {
  document.getElementById("modalReprogramar").classList.remove("abierto");
  document.getElementById("modalGestionCitas").classList.add("abierto");
}
function cerrarReprogramarFuera(event) {
  if (event.target.id === "modalReprogramar") cerrarReprogramar();
}

// FUNCIONES MODAL HORARIO //

function abrirModalHorarios() {
  document.getElementById("modalHorarios").classList.add("abierto");
}

function cerrarModalHorarios() {
  document.getElementById("modalHorarios").classList.remove("abierto");
}

function cerrarModalHorariosFuera(e) {
  if (e.target.id === "modalHorarios") cerrarModalHorarios();
}

function toggleDia(diaId, checkbox) {
  const dia = document.getElementById(diaId);
  const btn = dia.querySelector(".btn-agregar-hora");
  if (checkbox.checked) {
    dia.classList.add("activo");
    btn.style.display = "block";
    agregarHora(diaId);
  } else {
    dia.classList.remove("activo");
    btn.style.display = "none";
    dia.querySelector(".dia-horas").innerHTML = "";
  }
}

function agregarHora(diaId) {
  const contenedor = document.querySelector(`#${diaId} .dia-horas`);
  const fila = document.createElement("div");
  fila.className = "hora-row";
  fila.innerHTML = `
    <input type="time" value="08:00">
    <span>a</span>
    <input type="time" value="12:00">
    <button class="btn-eliminar-hora" onclick="this.parentElement.remove()">&#128465;</button>
  `;
  contenedor.appendChild(fila);
}

function guardarHorarios() {
  alert("Horario guardado correctamente.");
  cerrarModalHorarios();
}