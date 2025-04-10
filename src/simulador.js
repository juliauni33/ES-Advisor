document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startBtn");
    const simuladorContainer = document.getElementById("simuladorContainer");
  
    const emails = [
      {
        de: "seguranca@bancox.com",
        para: "usuario@email.com",
        assunto: "Atualize sua senha imediatamente",
        corpo: "Detectamos uma atividade suspeita em sua conta. Clique aqui para atualizar sua senha imediatamente.",
        golpe: true,
        explicacao: "Este e-mail é um golpe porque usa urgência para induzir o clique em um link suspeito. Verifique o domínio e evite clicar em links desconhecidos."
      },
      {
        de: "promocoes@lojay.com",
        para: "usuario@email.com",
        assunto: "Promoção imperdível! 90% de desconto!",
        corpo: "Clique agora para aproveitar esta oferta exclusiva e ganhe um brinde surpresa!",
        golpe: true,
        explicacao: "Este e-mail é um golpe porque usa promoções exageradas e falta de detalhes de identificação do remetente."
      },
      {
        de: "notificacoes@comprareal.com",
        para: "usuario@email.com",
        assunto: "Confirmação da sua compra de R$3.799,00",
        corpo: "Sua compra foi confirmada. Caso não tenha realizado, clique aqui para contestar.",
        golpe: true,
        explicacao: "Este e-mail é um golpe clássico que tenta induzir o clique pela surpresa ou medo de uma compra não autorizada."
      }
    ];
  
    let emailAtual = null;
    let toastClickHandler = null;
  
    startBtn.addEventListener("click", () => {
      startBtn.remove();
      simuladorContainer.style.display = "flex";
      simuladorContainer.innerHTML = `
        <div class="lista-emails">
          <button onclick="mostrarEmail(0)">Atualização de senha</button>
          <button onclick="mostrarEmail(1)">Promoção imperdível</button>
          <button onclick="mostrarEmail(2)">Compra desconhecida</button>
          <div class="controles-simulador">
            <button onclick="encerrarSimulacao()">Encerrar Simulação</button>
          </div>
        </div>
  
        <div class="visualizacao-email">
          <div id="emailContent" class="email-moldura"></div>
          <div class="question" id="questionContainer" style="display: none;">
            <p>Você acha que este e-mail é legítimo ou um golpe?</p>
            <div class="question-buttons">
              <button onclick="avaliarResposta(true)">É legítimo</button>
              <button onclick="avaliarResposta(false)">É um golpe</button>
            </div>
          </div>
          <div id="toast" class="toast" style="display: none;"></div>
        </div>
      `;
    });
  
    window.mostrarEmail = (index) => {
      emailAtual = emails[index];
  
      document.getElementById("emailContent").innerHTML = `
        <div class="email-header">
          <p><strong>De:</strong> ${emailAtual.de}</p>
          <p><strong>Para:</strong> ${emailAtual.para}</p>
          <p><strong>Assunto:</strong> ${emailAtual.assunto}</p>
        </div>
        <div class="email-body">
          <p>${emailAtual.corpo}</p>
        </div>
      `;
  
      document.getElementById("questionContainer").style.display = "block";
    };
  
    window.avaliarResposta = (respostaUsuario) => {
      if (!emailAtual) return;
  
      const correta = respostaUsuario === !emailAtual.golpe;
      const toast = document.getElementById("toast");
  
      toast.innerText = correta
        ? `Correto! ${emailAtual.explicacao}`
        : `Incorreto. ${emailAtual.explicacao}`;
      toast.style.display = "block";
  
      // Remove qualquer listener antigo
      document.removeEventListener("click", toastClickHandler);
  
      // Handler para ocultar o toast e reiniciar a simulação
      toastClickHandler = () => {
        toast.style.display = "none";
        document.removeEventListener("click", toastClickHandler);
        reiniciarSimulacao();
      };
  
      // Aguarda um pouco para evitar conflito com clique no botão
      setTimeout(() => {
        document.addEventListener("click", toastClickHandler);
      }, 100);
    };
  
    function reiniciarSimulacao() {
      emailAtual = null;
  
      const emailContent = document.getElementById("emailContent");
      const questionContainer = document.getElementById("questionContainer");
  
      if (emailContent) emailContent.innerHTML = "";
      if (questionContainer) questionContainer.style.display = "none";
    }
  
    window.encerrarSimulacao = () => {
      emailAtual = null;
      document.removeEventListener("click", toastClickHandler);
  
      if (simuladorContainer) {
        simuladorContainer.style.display = "none";
        simuladorContainer.innerHTML = "";
      }
  
      if (startBtn) {
        startBtn.style.display = "inline-block";
        document.body.querySelector("main").prepend(startBtn);
      }
    };
  });
  