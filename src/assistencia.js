document.getElementById("assistencia-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const problema = document.getElementById("problema").value;
    const mensagem = document.getElementById("mensagem").value;

    const mailtoLink = `mailto:walter.jr@outlook.com?subject=Ajuda com ${problema}&body=Nome: ${nome}%0AEmail: ${email}%0AMensagem: ${mensagem}`;

    window.location.href = mailtoLink;
});
