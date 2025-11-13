const btnguardar = document.getElementById("btnguardar");
const btnver = document.getElementById("btnver");
const btnlimpiar = document.getElementById("btnlimpiar");
const btnborrar = document.getElementById("btnborrar");

function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
  document.getElementById("edad").value = "";
  document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));
}

btnguardar.addEventListener("click", (e) => {
  e.preventDefault();

  document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const edadStr = document.getElementById("edad").value.trim();
  const edad = Number(edadStr);

  let valido = true;

  if (nombre === "") {
    document.getElementById("error-nombre").textContent =
      "El nombre es obligatorio.";
    valido = false;
  }

  if (email === "" || !email.includes("@")) {
    document.getElementById("error-email").textContent =
      "El email es obligatorio y debe incluir @.";
    valido = false;
  }

  if (edadStr === "" || isNaN(edad) || edad <= 0) {
    document.getElementById("error-edad").textContent =
      "La edad debe ser un número positivo.";
    valido = false;
  }

  if (valido) {
    const usuario = { nombre, email, edad };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    alert("Datos guardados correctamente.");
    limpiarFormulario();
  }
});

btnver.addEventListener("click", () => {
  const resultado = document.getElementById("resultado");
  const usuarioguardado = localStorage.getItem("usuario");

  if (usuarioguardado) {
    const datos = JSON.parse(usuarioguardado);
    resultado.innerHTML = `
      <h3>Datos del Usuario Guardado:</h3>
      <p><strong>Nombre:</strong> ${datos.nombre}</p>
      <p><strong>Email:</strong> ${datos.email}</p>
      <p><strong>Edad:</strong> ${datos.edad}</p>
    `;
  } else {
    resultado.innerHTML = "<p>No hay datos guardados.</p>";
  }
});

btnlimpiar.addEventListener("click", (e) => {
  e.preventDefault();
  limpiarFormulario();
  alert("Formulario limpiado.");
});

btnborrar.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("usuario");
  document.getElementById("resultado").innerHTML = "";
  alert("Datos borrados del LocalStorage.");
});
