const encriptador = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

const desencriptador = {
  ai: "a",
  imes: "i",
  enter: "e",
  ober: "o",
  ufat: "u",
};

const regex = /[A-ZÁÉÍÓÚáéíóú+*·'¨^]/;

const output_message = document.getElementById("output__message");
const output_noempty = document.querySelector(".output__noempty");
const output_empty = document.querySelector(".output__empty");
const content_output = document.querySelector(".content__output");
const btn_clipboard = document.querySelector(".output__clipboard");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que se envíe el formulario

  // Lógica para encriptar o desencriptar
  if (event.submitter.classList.contains("input__encrypt")) {
    encrypt();
  } else if (event.submitter.classList.contains("input__decrypt")) {
    decrypt();
  }
});

document
  .getElementById("input__message")
  .addEventListener("input", function () {
    if (btn_clipboard.value === "Copiado!") {
      // Volver al estado original
      btn_clipboard.value = "Copiar";
      btn_clipboard.style.border = "#0a3871 solid 1px";
      btn_clipboard.style.color = "#0a3871";
    }
  });

function encrypt() {
  let message = document.getElementById("input__message").value.trim();
  if (!regex.test(message)) {
    for (let letra in encriptador) {
      message = message.replaceAll(letra, encriptador[letra]);
    }

    writeMessage(message);
    clear();
  } else {
    alert(
      "El texto no debe contener mayúsculas, acentos ni caracteres especiales"
    );
  }
}

function decrypt() {
  let message = document.getElementById("input__message").value.trim();
  if (!regex.test(message)) {
    for (let cadena in desencriptador) {
      message = message.replaceAll(cadena, desencriptador[cadena]);
    }

    writeMessage(message);
    clear();
  } else {
    alert(
      "El texto no debe contener mayúsculas, acentos ni caracteres especiales"
    );
  }
}

function clear() {
  document.getElementById("input__message").value = "";
}

function writeMessage(message) {
  output_noempty.style.display = "flex";
  content_output.style.justifyContent = "space-between";
  output_empty.style.display = "none";
  output_message.textContent = message;
}

function writeClipboard() {
  navigator.clipboard.writeText(output_message.textContent).then(() => {
    btn_clipboard.value = "Copiado!";
    btn_clipboard.style.border = "#1eb143 solid 1px";
    btn_clipboard.style.color = "#1eb143";
  });
}

function readClipboard() {
  navigator.clipboard
    .readText()
    .then((texto) => {
      console.log("Texto obtenido del portapapeles:", texto);
      // Aquí puedes hacer lo que quieras con el texto obtenido, por ejemplo, asignarlo a un campo de entrada.
    })
    .catch((error) => {
      console.error("Error al obtener texto del portapapeles:", error);
    });
}
