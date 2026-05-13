# 💍 Lista de Presentes - Emily e Pedro

Um web app front-end desenvolvido para apresentar e organizar a lista de presentes do nosso casamento. A aplicação permite que os convidados visualizem presentes para a casa e cotas simbólicas (brincadeiras), oferecendo uma interface direta para pagamento via PIX (QR Code e chave Copia e Cola).

Este projeto une a celebração de um momento inesquecível com a aplicação prática de conceitos de Análise e Desenvolvimento de Sistemas, resultando em uma interface responsiva, dinâmica e separada em camadas lógicas (UI e Dados).

## 🚀 Tecnologias Utilizadas

* **HTML5:** Estruturação semântica.
* **Tailwind CSS (via CDN):** Estilização ágil, responsiva e padronização visual com a identidade do convite.
* **JavaScript (Vanilla):** Manipulação do DOM, controle de estado dos modais, sistema de cópia para área de transferência e contagem regressiva em tempo real.
* **JSON:** Estruturação assíncrona dos dados dos presentes, simulando o consumo de uma API RESTful.

## ✨ Funcionalidades

* **Renderização Dinâmica:** Os cards dos presentes são gerados automaticamente via JavaScript através do consumo assíncrono (Fetch API) do arquivo `presentes.json`.
* **Filtros de Categoria:** Separação intuitiva entre itens "Para a Casa" e "Cotas e Brincadeiras".
* **Modal Interativo:** Exibição detalhada do presente escolhido, revelando a imagem ampliada, valor, QR Code para PIX e a chave textual.
* **UX Melhorada (Toast & Clipboard):** Sistema de cópia de chave PIX com apenas um clique, com feedback visual em formato de *Toast Notification* flutuante.
* **Contador Regressivo:** Relógio dinâmico no cabeçalho marcando a espera para o grande dia (31 de Maio).

## 🛠️ Como rodar o projeto localmente

Como o projeto faz requisições locais para ler o arquivo `presentes.json`, abri-lo diretamente no navegador (`file:///`) pode causar bloqueios de segurança (CORS). Siga os passos abaixo para testar localmente:

1. Clone este repositório:
   ```bash
   git clone [https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git)