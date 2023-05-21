import api from "./clientApi.js";

document.getElementById("botao-sair").addEventListener("click", () => {
  window.localStorage.removeItem("_wk.usuario");
  window.location.pathname = "/";
});

document.getElementById("form-criar-usuario").onsubmit = () => {
  criarUsuario();
  return false;
};

async function criarUsuario() {
  try {
    document.getElementById("botao-criar-usuario").setAttribute("disabled", "");
    const nome = document.getElementById("input-nome").value;
    const email = document.getElementById("input-email").value;
    const senha = document.getElementById("input-senha").value;

    if (!nome || !email || !senha) return;

    await api.post("/usuario", {
      nome,
      email,
      senha,
    });
    window.location.pathname = "/gestao-administrativa.html";
  } catch (error) {
    document.getElementById("erro-criar-usuario").classList.remove("d-none");
    document.getElementById("erro-criar-usuario").innerText =
      error.response.data.erro;
  } finally {
    document.getElementById("botao-criar-usuario").removeAttribute("disabled");
  }
}
