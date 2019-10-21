# conexcontact
O objetivo deste repositório é demonstrar meu progresso com Node.Js e minha criatividade para resolver problemas reais.

## Começando
Clone o projeto para a sua maquina.

### pré-requisitos

Você precisará ter instalado em sua maquina:
* Node 8.10.0 ou superior.
* MongoDB
* Robo3T (Opcional)
* Visual Studio Code.
* Algum navegador moderno (Chrome, Opera, Firefox)
* NPM.

### Instalação de dependências
Simplesmente execute o seguinte comando no terminal:
```
npm i
```

Pronto, as dependências foram instaladas!

## Rodando o projeto

É necessário que o mongoDB esteja rodando em sua máquina (caso esteja utilizando localmente)
```
mongod
```
Depois disso, utilize o comando:
```
nodemon app.js
```
Pronto!
Caso seu navegdor padrão não abra automáticamente, acesse a seguinte URL a partir de qualquer navegador:
```
http://localhost:8286/login
```
## Funcionalidades
### Tela de login
Aqui o usuário cadastrado (usuário comum ou administrador) pode efetuar o login na plataforma.
Caso o usuário seja um administrador, serão concedidas permissões especiais bem como um menu de administração para adicionar, editar, etc.
![Tela de Login](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/01%20-%20Tela%20de%20login.png)

### Tela inicial
Esta é a tela inicial após o login, a partir daqui o usuário pode adquirir listas (comprar listas), enviar pedidos de ajuda (tickets) e utilizar as listas (visualizar os contatos das listas adquiridas).
Note que neste caso, o usuário já adquiriu três listas, portanto na tela inicial estão sendo exibidas as mesmas.
![Tela inicial](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/02%20-%20Tela%20Inicial.png)

Note também que como o usuário que logou é um administrador, ele tem um menu especial de administração:
![Tela inicial ADM](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/03%20-%20Tela%20inicial.png)

### Tela da lista selecionada
Caso o usuário click em "Visualizar lista" na tela inicial, ele será redirecionado a tela da respectiva lista para que possa visualizar os contatos contidos na mesma.
Neste caso a lista "Arquitetos" possui apenas um contato cadastrado.
![Tela lista arquitetos](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/04%20-%20Tela%20de%20lista.png)

Note também que existe um botão na frente de cada contato da lista para que o usuário possa visualizar mais informações sobre o contato, evitando assim, poluição visual na tabela.
![Tela lista visualizar informacoes](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/05%20-%20Tela%20de%20visualizar%20lista.png)

### Tela de favoritos
Na lista global do usuário (a lista adquirida é global, ou seja, é a mesma para todos os usuários) possui um botão de "favoritar", caso o usuário marque esta opção para algum contato, ele estará criando uma lista de favoritos (que não é global, ou seja, apenas deste usuário em especifico, tornando possivel inclusive editar as informações).
![Tela favoritar](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/10%20-%20Tela%20favoritos.png)

Editando contatos da lista de favoritos:
![Tela editar favorito](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/11%20-%20Tela%20editar%20favoritos.png)

### Tela de catalogo
Para que o usuário possa adquirir (comprar) listas, ele deve ir até a página de catalogo, onde estarão listadas todas as listas disponíveis para a aquisição.
![Tela lista visualizar informacoes](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/06%20-%20Tela%20catalogo.png)

### Tela de operações
A tela de operações é restrita aos administradores do sistema, toda vez que um usuário comum realiza uma compra, o administrador recebe essa operação em uma central, onde poderá aprovar ou não a aquisição da lista por parte do usuário. (Reprovação em caso de pagamento não efetuado por exemplo).
![Tela gerenciar operacoes](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/07%20-%20Tela%20operacao.png)

Também é possível enviar um alerta ao usuário caso o pagamento não tenha sido efetuado e você administrador queira insistir para que o usuário efetue o pagamento, enviando um alerta você dará uma segunda chance do usuário concluir o pagamento.
![Tela enviar alerta](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/08%20-%20Tela%20enviar%20alerta.png)

O alerta enviado pelo administrador aparecerá na tela inicial do usuário, clicando em "Continuar pagamento" ele será redirecionado ao link de pagamento do serviço utilizado pela plataforma (mercadoPago, pagSeguro, etc), caso click em "Desistir do pagamento", tudo bem, ele desistiu do pagamento mesmo (E claro, tudo será registrado no banco).
![Tela enviar alerta](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/09%20-%20Tela%20alerta.png)

### Tela de tickets (Central de ajuda do usuário)
Nesta tela o usuário com dúvidas poderá enviar um ticket ao administrador do sistema.
![Tela tickets](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/12%20-%20Tela%20tickets.png)

Enviando ticket:
![Tela enviar tickets](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/13%20-%20Tela%20enviar%20tickets.png)

### Tela de tickets (Central do administrador)
Aqui chegam todos os tickets enviados pelos usuários, onde o administrador poderá responde-los ou negligencia-los.
![Tela receber tickets](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/14%20-%20Tela%20receber%20tickets.png)

Respondendo ticket:
![Tela responder tickets](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/15%20-%20Tela%20responder%20ticket.png)

Negligenciando ticket:
![Tela negligenciar tickets](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/15%20-%20apagar%20ticket.png)

### Tela de adicionar nova lista
O sistema foi desenvolvido pensando que o administrador não iria saber lidar com banco de dados, por isso, criei uma interface para que o mesmo pudesse adicionar as listas e os contatos de forma gráfica.
![Tela adicionar lista](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/16%20-%20Tela%20adicionar%20nova%20lista.png)

### Tela de adicionar novo contato
A principio, o administrador irá adicionar os contatos dessa forma, mas existem planos de desenvolver uma opção para que o administrador faça upload de uma planilha de contatose os mesmos sejam adicionados ao banco automáticamente.
![Tela adicionar contato](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/17%20-%20Tela%20adicionar%20novo%20contato.png)
Scroll:
![Tela adicionar contato](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/18%20-%20Tela%20adicionar%20novo%20contato.png)

### Tela de "editar" contatos
Esta tela não está 100% pronta, a ideia é que o administrador possa alterar alguns dados do usuário (se isso for solicitado via telefone ou ticket, óbviamente, e a propósito, aceito contribuições), mas por enquanto essa tela serve para atribuir listas de forma manual a algum usuário, observe:
![Tela atribuir lista](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/19%20-%20Tela%20editar%20usuarios.png)
Atribuindo lista:
![Tela atribuir lista](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/20%20-%20Tela%20atribuir%20lista.png)

### Tela de escolher quais listas estarão disponíveis em "Catalogo".
![Tela escolher categoria](https://raw.githubusercontent.com/Spinkers/conexcontact/master/public/img/img_readme/21%20-%20Tela%20lista%20categorias.png)
