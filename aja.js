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
    const usuarios = { nombre, email, edad };

    let listausuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    listausuarios.push(usuarios);

    localStorage.setItem("usuarios", JSON.stringify(listausuarios));
    alert("Datos guardados correctamente.");
    limpiarFormulario();
  }
});

btnver.addEventListener("click", () => {
  const resultado = document.getElementById("resultado");

  if (resultado.style.display !== 'none' && resultado.innerHTML !== '') {
    resultado.style.display = 'none';
    btnver.textContent = 'Ver Datos';
    return;
  }

  const usuariosguardado = JSON.parse(localStorage.getItem("usuarios"));

  if (usuariosguardado && usuariosguardado.length > 0) {
    let html = "<h3>Usuarios Guardados:</h3>";

    usuariosguardado.forEach((u, i) => {
      html += `
      <p><strong>Usuario #${i + 1}</strong></p>
      <p><strong>Nombre:</strong> ${u.nombre}</p>
      <p><strong>Email:</strong> ${u.email}</p>
      <p><strong>Edad:</strong> ${u.edad}</p>
      <button class='btn-eliminar-individual' data-index='${i}'>Borrar Usuario</button>
      <hr>
    `;
    });

    resultado.innerHTML = html;
    resultado.style.display = 'block';
    btnver.textContent = 'Ocultar Datos';

    const botonesBorrar = document.querySelectorAll('.btn-eliminar-individual');
    botonesBorrar.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        usuariosguardado.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuariosguardado));
        btnver.click();
        alert('Ususario eliminado.');
      });
    });
  } else {
  resultado.innerHTML = "<p>No hay datos guardados.</p>";
  resultado.style.display = 'block';
  btnver.textContent = 'Ocultar Datos';
}
});

btnlimpiar.addEventListener("click", () => {
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const edad = document.getElementById("edad");

  const errores = [...document.querySelectorAll(".error")];
  const hayErrores = errores.some((e) => e.textContent !== '');

  const todoVacio =
    nombre.value.trim() === "" &&
    email.value.trim() === "" &&
    edad.value.trim() === "";
  !hayErrores;

  if (todoVacio) {
    alert('No hay nada que limpiar.');
    return;
  }

  limpiarFormulario();
  errores.forEach((e) => (e.textContent = ''));
  alert("Formulario limpiado.");
});

btnborrar.addEventListener("click", () => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));

  if (!usuarios || usuarios.length === 0) {
    alert("No hay datos para borrar.");
    return;
  }

  localStorage.removeItem("usuarios");
  document.getElementById("resultado").innerHTML = "";
  alert("Datos borrados del LocalStorage.");
});
