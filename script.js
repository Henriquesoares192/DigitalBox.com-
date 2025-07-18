let usuarios = [];
let produtos = [];
let logado = null;
let bloqueioIP = {};

function cadastrar() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const tipo = document.getElementById("tipoConta").value;

  if (usuarios.find(u => u.email === email && u.senha === senha)) {
    alert("Já existe uma conta com este e-mail e senha!");
    return;
  }

  usuarios.push({ email, senha, tipo, moedas: 100, ip: "127.0.0.1" });
  alert("Conta criada!");
}

function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const user = usuarios.find(u => u.email === email && u.senha === senha);
  if (!user) return alert("Login inválido");

  logado = user;
  document.getElementById("auth").style.display = "none";
  document.getElementById("painel").style.display = "block";
  document.getElementById("perfilInfo").innerText =
    user.email + " | " + user.tipo + " | Moedas: " + user.moedas;
  atualizarProdutos();
}

function adicionarProduto() {
  if (logado.tipo !== "vendedor") return alert("Apenas vendedores adicionam produtos");
  const nome = document.getElementById("produto").value;
  const preco = parseInt(document.getElementById("preco").value);
  produtos.push({ nome, preco, vendedor: logado.email });
  atualizarProdutos();
}

function atualizarProdutos() {
  const container = document.getElementById("produtos");
  container.innerHTML = "";
  produtos.forEach((p, i) => {
    const div = document.createElement("div");
    div.innerHTML = `${p.nome} - ${p.preco} moedas - <button onclick="comprar(${i})">Comprar</button>`;
    container.appendChild(div);
  });
}

function comprar(index) {
  const produto = produtos[index];
  if (logado.moedas < produto.preco) return alert("Saldo insuficiente");
  const vendedor = usuarios.find(u => u.email === produto.vendedor);
  if (logado.ip === vendedor.ip) return alert("Não pode transferir entre contas do mesmo IP");
  logado.moedas -= produto.preco;
  alert("Compra realizada! Moedas descontadas. O vendedor não recebe automaticamente.");
  document.getElementById("perfilInfo").innerText =
    logado.email + " | " + logado.tipo + " | Moedas: " + logado.moedas;
}

function esqueciSenha() {
  alert("Contate o suporte: suporte@digitalbox.com");
}