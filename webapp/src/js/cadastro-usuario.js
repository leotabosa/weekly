import api from "./clientApi.js";
import { Toast } from "bootstrap";

let modoEdicao = false;

const query = window.location.search;
const urlParams = new URLSearchParams(query);
modoEdicao = urlParams.has("id");

if (modoEdicao) {
  prepararTelaParaEdicao();
}

document.getElementById("botao-sair").addEventListener("click", () => {
  window.localStorage.removeItem("_wk.usuario");
  window.location.pathname = "/";
});

document.getElementById("form-criar-usuario").onsubmit = () => {
  if (modoEdicao) editarUsuario();
  else criarUsuario();
  return false;
};

async function editarUsuario() {
  try {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const id = urlParams.get("id");

    document.getElementById("botao-criar-usuario").setAttribute("disabled", "");
    const nome = document.getElementById("input-nome").value;
    const email = document.getElementById("input-email").value;
    const senha = document.getElementById("input-senha").value;

    if (!nome || !email || !senha) return;

    await api.put(`/usuario/${id}`, {
      nome,
      email,
      senha,
    });

    window.location = "/gestao-administrativa.html";
  } catch (error) {
    document.getElementById("erro-criar-usuario").classList.remove("d-none");
    document.getElementById("erro-criar-usuario").innerText =
      error.response.data.erro;
  } finally {
    document.getElementById("botao-criar-usuario").removeAttribute("disabled");
  }
}

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

async function carregarUsuarioParaEdicao() {
  try {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const id = urlParams.get("id");

    const usuario = await api.get(`/usuario/${id}`);

    document.getElementById("input-nome").value = usuario.data.nome;
    document.getElementById("input-email").value = usuario.data.email;
    document.getElementById("input-senha").value = usuario.data.senha;
  } catch (error) {
    const toastErro = document.getElementById("toast-erro-usuario");
    Toast.getOrCreateInstance(toastErro).show();
  }
}

function prepararTelaParaEdicao() {
  document.getElementById("titulo-pagina").innerText = "Edição de usuário";
  document.getElementById("botao-criar-usuario").innerText = "Editar usuário";
  carregarUsuarioParaEdicao();
}
