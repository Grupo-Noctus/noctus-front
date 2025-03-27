# vuejs-br/docs-next

Este é o repositório oficial da tradução para português brasileiro da documentação do [Vue.js](https://v3.vuejs.org/). Este _site_ é produzido com [VuePress](https://vuepress.vuejs.org/). Todo o conteúdo é escrito em Markdown e os arquivos podem ser encontrados em `src`.

> Nota da equipe de tradução: o trabalho nesta nova versão da documentação ainda está em andamento, portanto muitos conteúdos estão em seu estado original (em inglês). Ajuda é muito bem-vinda!

## Traduzindo

Se você quer participar da tradução, ajudando a traduzir conteúdos que ainda permanecem em inglês e/ou ajudando a revisar conteúdos já traduzidos, sinta-se em casa. Para entender como tudo funciona e saber por onde começar, leia nosso guia de [Contribuição com a Documentação](https://vuejsbr-docs-next.netlify.app/guide/contributing/translations.html).

> O _workflow_ para a realização da tradução está detalhadamente descrito em [Como colaborar com a versão em português?](https://vuejsbr-docs-next.netlify.app/guide/contributing/translations.html#como-colaborar-com-a-versao-em-portugues) Ler é o primeiro passo para todo colaborador em potencial.

## Escrevendo

Se você quer participar ajudando na construção e atualização da documentação principal (em inglês), veja o [Guia de Escrita](https://v3.vuejs.org/guide/writing-guide.html) para regras e recomendações sobre escrever e manter a documentação.

> Neste momento a documentação principal (em inglês) está em beta: o time está atualmente no meio de muitas mudanças e não está recebendo contribuições. Todo o conteúdo está sujeito a mudanças. Se você viu algo que gostaria de trazer à atenção do time, [crie uma _issue_](https://github.com/vuejs/docs-next/issues/new) e todos farão o possível para analisar. No entanto, provavelmente você precisará esperar até que todo o conteúdo esteja finalizado.

## Desenvolvendo

Se deseja executar o projeto localmente, seja para contribuir com a documentação ou seja para olhar como as coisas funcionam, sigua os passos a seguir.

1. Clone este repositório:

```bash
git clone https://github.com/vuejs-br/docs-next.git
```

2. Instale as dependências:

```bash
yarn # or npm install
```

3. Inicie um ambiente de desenvolvimento local:

```bash
yarn serve # or npm run serve
```

## Publicando

[![Netlify Status](https://api.netlify.com/api/v1/badges/35e551aa-2430-4ca9-aae6-72ba49d7ffec/deploy-status)](https://app.netlify.com/sites/vuejsbr-docs-next/deploys)

O _site_ é automaticamente publicado quando _commits_ chegam em `master`, via [Netlify](https://www.netlify.com/).


O processo é disparado somente por um grupo de contribuidores selecionados para isso, a fim de manter a organização do projeto. Colabore apenas enviando _pull requests_ e, depois de revisados e aceitos, serão mesclados em `master` pela equipe. Ou seja, não se preocupe com a publicação, o _deploy_ é automático.


## Padrão de commits
* __Test__: indica qualquer tipo de criação ou alteração de códigos de teste. Exemplo: Criação de testes unitários.
* __Feat__: indica o desenvolvimento de uma nova feature ao projeto. Exemplo: Acréscimo de um serviço, funcionalidade, endpoint, etc.
* __Refactor__: usado quando houver uma refatoração de código que não tenha qualquer tipo de impacto na lógica/regras de negócio do sistema. Exemplo: Mudanças de código após um code review
* __Style__: empregado quando há mudanças de formatação e estilo do código que não alteram o sistema de nenhuma forma.
Exemplo: Mudar o style-guide, mudar de convenção lint, arrumar indentações, remover espaços em brancos, remover comentários, etc..
* __Fix__: utilizado quando há correção de erros que estão gerando bugs no sistema.
 Exemplo: Aplicar tratativa para uma função que não está tendo o comportamento esperado e retornando erro.
* __Chore__: indica mudanças no projeto que não afetem o sistema ou arquivos de testes. São mudanças de desenvolvimento.
 Exemplo: Mudar regras do eslint, adicionar prettier, adicionar mais extensões de arquivos ao .gitignore
* __Docs__: usado quando há mudanças na documentação do projeto.
 Exemplo: adicionar informações na documentação da API, mudar o README, etc.
* __Build__: utilizada para indicar mudanças que afetam o processo de build do projeto ou dependências externas.
Exemplo: Gulp, adicionar/remover dependências do npm, etc.
* __Perf__: indica uma alteração que melhorou a performance do sistema.
Exemplo: alterar ForEach por while, melhorar a query ao banco, etc.
* __Ci__: utilizada para mudanças nos arquivos de configuração de CI.
Exemplo: Circle, Travis, BrowserStack, etc.
* __Revert__: indica a reverão de um commit anterior.

## Padrão de Branches 🌿

Além dos commits, as branches devem seguir os seguintes padrões para garantir consistência.

### 1. **Branches Principais** 🌟
   - **`main`**: A branch principal contendo a versão de produção do código.
   - **`develop`**: A branch de integração onde as novas funcionalidades são mescladas antes de serem lançadas.

### 2. **Branches de Funcionalidade (Feature) 🚀**
   - **Formato**: `feature/nome-da-feature`
   - **Uso**: Para o desenvolvimento de novas funcionalidades.
   - **Exemplo**:
     - `feature/criar-pagina-de-login`

### 3. **Branches de Correção de Bug 🐞**
   - **Formato**: `bugfix/nome-do-bug`
   - **Uso**: Para correção de bugs.
   - **Exemplo**:
     - `bugfix/corrigir-erro-no-login`

### 4. **Branches de Hotfix 🚑**
   - **Formato**: `hotfix/nome-do-hotfix`
   - **Uso**: Para correções urgentes diretamente em produção.
   - **Exemplo**:
     - `hotfix/corrigir-erro-de-pagamento-em-producao`

### 5. **Branches de Configuração do Projeto ⚙️**
   - **Formato**: `config/nome-da-configuracao`
   - **Uso**: Para mudanças nas configurações do projeto.
   - **Exemplo**:
     - `config/ajustes-no-dockerfile`

### 6. **Branches de Documentação 📚**
   - **Formato**: `docs/nome-da-documentacao`
   - **Uso**: Para mudanças ou melhorias na documentação do projeto.
   - **Exemplo**:
     - `docs/atualizar-readme`
     - `docs/adicionar-guia-de-configuracao`

### 7. **Branches de Release 🎉**
   - **Formato**: `release/versao`
   - **Uso**: Para preparar e testar novas versões antes de liberá-las.
   - **Exemplo**:
     - `release/1.0.0`

