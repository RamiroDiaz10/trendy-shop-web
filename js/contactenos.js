const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (e) {
  // detener el envio por defecto
  e.preventDefault();

  let nombre = document.getElementById("nombre").value.trim();
  let telefono = document.getElementById("telefono").value.trim();
  let email = document.getElementById("email").value.trim();
  let mensaje = document.getElementById("mensaje").value.trim();

    let hayError = false;
    limpiarErrores();

    if (nombre === "") {
        mostrarError("error-nombre", "Por favor completa la casilla");
        inputIncorrecto("nombre");
        hayError = true;
    }
    if (telefono === "") {
        mostrarError("error-telefono", "Por favor escribe tu telefono");
        inputIncorrecto("telefono");
        hayError = true;
    }

    if (email === "") {
        mostrarError("error-email", "Por favor escribe tu email");
        inputIncorrecto("email");
        hayError = true;
    }

    if (mensaje === "") {
        mostrarError("error-mensaje", "Por favor escribe tu mensaje o deja tu saludo");
        inputIncorrecto("mensaje");
        hayError = true;
    }

    if(!hayError){
        alert(`Envio exitoso, nuestro equipo se contactara pronto \n "Gracias"`)
        formulario.reset()
    }
});

function mostrarError(idSpan, mensaje) {
  document.getElementById(idSpan).textContent = mensaje;
  document.getElementById(idSpan).style.display = "block";
}

function inputIncorrecto(idInput) {
  document.getElementById(idInput).classList.add("input-incorrecto");
}

function limpiarErrores() {
  let error = document.querySelectorAll(".error");
  error.forEach(function (span) {
    span.textContent = "";
    span.style.display = "none";
  });

  let input = document.querySelectorAll("input, textarea");
  input.forEach(function (input) {
    input.classList.remove("input-incorrecto");
  });
}
