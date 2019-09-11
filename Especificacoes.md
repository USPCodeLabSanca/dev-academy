# Especificações do Projeto - dev.boost(2019.2) 

## Objetivo:
Desenvolver um **site educacional de vídeos** que utilize o paradigma de   **<a href = "https://www.youtube.com/watch?v=xfGciVdbktI">SPA</a>** (**S**ingle **P**age **A**pplication). O site deve  possuir uma **página de login**, uma **página de cadastro**, uma **página de vídeos** e uma **página de gerenciamento**, que permita adicionar ou remover um novo vídeo ao site. 

## Abordagem 
O projeto é dividido em duas pastas: **Front-End** e **Back-End**. 

#### Front-End

Tem como função servir de plataforma pública que seja capaz de: 

1. **Renderizar** o HTML e a **estilização** do mesmo, criando uma interface com a qual o usuário pode interagir e **enviar informações** que descrevam quais partes da aplicação este quer acessar ou modificar. 
2. **Enviar** requisições **HTTP** que especifiquem qual método **(POST, GET, DELETE)** será solicitado e encapsular de maneira estruturada a informação relacionada a esta operação ao **BackEnd**.
3. **Escutar as respostas** geradas pelo Backend quando este responde a uma requisição HTTP.
4. **Aplicar uma lógica interna** que, a partir das respostas do backend, decida de qual maneira a interface do site será manipulada.
5. **Re-Renderizar** a aplicação de maneira a **refletir** para o usuário a **mudança do estado da aplicação** feita durante as aplicações de lógica interna, bem como continuar apta a **novas interações** como usuário. 

#### Back-End 

Tem como função servir de plataforma lógica comunicação entre o Front-End o banco de dados, que seja capaz de:

1. **Receber** requisições HTTP enviadas pelo Front-End
2. **Aplicar uma lógica interna** que desestruture a informação recebida pelo protocolo HTTP
3. **Verificar permissão**. Normalmente, um **token**  é gerado na criação de usuário e passa a ser enviado no cabeçalho das requisições. Algumas operações podem ser feitas por visitantes, já outras exigem um token de usuário, e outras token de administrador (**roles**)
4. **Enviar ao banco** a requisição, agora tratada pela lógica interna
5. **Escutar a resposta** do banco sobre a requisição feita.
6. **Aplicar uma lógica interna** que trate o conteúdo recebido pela requisição ao banco de maneira a gerar a resposta esperada pelo FrontEnd 
7. **Responder a requisição http ao frontend**

#### Banco de dados

Será utilizado o **Cloud Firestorm do Google Firebase**. Não será necessário o conhecimento de programação de bancos de dados, visto que este processo é automatizado pela ferramenta. Em suma, o banco **recebe e responde requisições** ao Back-End.

Assim como o Back-End, o banco de dados possui uma lógica interna para **autenticação**, caso contrário, seria possível transpassar o backend e enviar solicitações diretamente ao banco. Normalmente, é **verificado** se o IP que solicitou a requisição é o **mesmo do IP do Back-End**. Tal método de verificação **já é implementado** pelo FireBase. 

## Tecnologia base

#### Node e NPM 
Tanto as tecnologias utilizadas front-end quanto as no back-end ancoram-se no **node.js** e seu gerenciador de pacotes, o **npm**. Em suma, Node trata-se de um **interpretador de código JavaScript** de modo **assíncrono e orientado a eventos**, com objetivo de permitir a execução de código Javascript independentemente do Browser, ou seja, nativamente por um Servidor. 

Para rodar um código javascript pelo Node, basta: 

```bash
node index.js
```

Segue um  **<a href = "https://www.digitalocean.com/community/tutorials/como-instalar-o-node-js-no-ubuntu-16-04-pt">tutorial de instalação no ubuntu</a>** e um **<a href = "https://nodesource.com/blog/installing-nodejs-tutorial-windows/">no Windows</a>**. A versão LTS do Node já instala automaticamente o **npm**, **gerenciador** que permite instalação e distribuição facilitadas de pacotes voltados ao ambiente node.

##### <span style = "color:red">Playlist fortemente recomendada sobre  javascript e node:</span>

<a href = "https://www.youtube.com/watch?v=po9Ik_v5koU">Programação funcional vs POO</a>
<a href = "https://www.youtube.com/watch?v=8aGhZQkoFbQ">Event Loop </a>
<a href = "https://www.youtube.com/watch?v=7Bs4-rqbCQc">JS Assíncrono: Callbacks, Promises e Async/Await</a>
<a href = "https://www.youtube.com/watch?v=cHvh-munKyA">Arrow Functions</a>

#### Git

Ferramenta de **versionamento** que permite manter repositórios com snapshots de diversos momentos de um projeto. **Github** é uma plataforma que permite **compartilhamento online** de repositórios git. **recomendamos fortemente** o uso de git, pois o mesmo facilita o **desenvolvimento remoto** de um mesmo projeto por **vários autores diferentes**, bem como manter um **backup** da **versão atual e anteriores** do projeto.


Em suma, possui **quatro** locais/momentos de desenvolvimento:

**1 - WorkSpace:** 

Local onde os arquivos estão sendo modificados. Para fazer de um diretório um WorkSpace de git, basta utilizar

```bash
git init
```

**Pode ser mais fácil, entretanto**, criar primeiramente um repositório no <a href = "https://github.com/new">github</a>, e então utilizar:

```bash
git clone url_do_repositorio 
```
Pois isto fará o estágio de push mais prático. 

**2 - Stage**

Local onde se pode acumular diversas alterações de um arquivo, sem de fato salvá-las no repositório local. Serve como uma "caixa intermediária" entre o workspace e o repositório local. 

Para adicionar um arquivo ao stage, basta utilizar

```bash
git add nome_do_arquivo
```

E, para adicionar uma pasta inteira,

```bash
git add . 
```

**3 - Repositório Local**

Local que mantém a versão mais atualizada do projeto, bem como o histórico de snapshots do mesmo com todas as versões que foram commitadas. Para adicionar o Stage ao Repositório local, basta:

```bash
git commit -m "Mensagem de commit"
```

**4 - Repositório na Nuvem - GitHub**

Para subir o repositório local para a nuvem: 

1- Caso tenha sido utilizado o ```git clone``` na etapa 1. , basta utilizar: 

```bash
git push
```

2 - Caso tenha sido utilizado o ```git init```, é necessário utilizar na primeira vez:
```bash
git push --set-upstream url_do_repositorio
```
Após isto, ```git push``` por sí só poderá ser utilizado para commits futuros. 

Para boas práticas e informações mais avançadas sobre git, como  Fetch/Rebase e Branches, consultar o **<a style = "color:red" href = "https://www.youtube.com/watch?v=r9Kauz9B4i8">tutorial de Git fortemente recomendado por UCLSanca</a>**


## Tecnologias do Front-End

#### React
Deve ser utilizando o React para a criação da SPA, com a abordagem de **<a href = "https://pt-br.reactjs.org/docs/hooks-intro.html">Componentes Funcionais (Hooks)</a>**. 

A instalação e a criação de um app React é feita com: 

```bash
npx create-react-app my_app
```

Para iniciar a aplicação:

```bash
cd my_app
npm start
```
#### TailWind


Sugere-se o uso do **TailWind** como FrameWork de CSS para a estilização da página. O tutorial da instalação completa em um projeto, bem como exemplos de utilização podem ser encontrado <a href = "https://tailwindcss.com/docs/installation/">na documentação</a>. Para desenvolvimento, por praticidade, sugere-se a instalação via CDN. 


Basta incluir:

```html
<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
```

Na tag ```<head> </head>``` do index.html criado automaticamente na pasta ```public```do app pelo React. 

#### Axios

**<a href ="https://github.com/axios/axios">Axios</a>** é um cliente que tem por objetivo **enviar requests HTTP e escutar suas respostas**. Segue  **<a href = "https://www.youtube.com/watch?v=M-X0Jw2e68A">uma boa vídeo aula</a>** que exemplifica o uso de axios em React. 

Sua instalação também depende do npm, e deve ser feita **Dentro de my_app**


```bash
npm install axios
```

Por fim, deve ser importado no arquivo .js com

```javascript
import axios from "axios";
```

## Entrega 1 - FrontEnd 
Sugere-se começar o desenvolvimento da aplicação pelo design das páginas.
Caso desejado, é possível desenhar todo o design da aplicação com alguma ferramenta de prototipação, como o <a href = "https://marvelapp.com/">Marvel App </a> ou <a href = "https://www.adobe.com/br/products/xd.html">Adobe XD</a>

Exemplo de páginas mockadas:  <a href = "https://xd.adobe.com/spec/5e27eea6-f78b-4025-6032-92b13874ccdb-2816/"> Protótipo Site Digimon </a> e <a>Protótipo Ganesh</a>
Como ainda não existe o back-end, a página gerada **não sera persistiva**, o que não é um problema, isto será feito depois. Além disso 

