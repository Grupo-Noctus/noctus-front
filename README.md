Este guia define as convenções de estilo de código que devem ser seguidas para garantir consistência, clareza e manutenibilidade do projeto.

# Nomenclatura

## Variáveis

Por padrão, `camelCase`.

Exemplo:

```typescript
let minhaVariavel = 10;
```

Existem variáveis que são consideradas constantes no sistema que usam o `UPPER_SNAKE_CASE (SCREAMING_SNAKE_CASE)`.

Exemplo:

```typescript
const OPEN_AI_KEY = "sua-chave-aqui"; // Carregada dinamicamente no início da aplicação através de um select no banco
```

## Funções

Por padrão, `camelCase`.

Exemplo:

```typescript
function minhaFuncao() {
    // código aqui
}
```

## Classes

Por padrão, `PascalCase`.

Exemplo:

```typescript
class MinhaClasse {
    // código aqui
}
```

## Tipagem

### Uso de `type`

Por padrão, é colocado a letra `T` em maiúsculo como prefixo.

Exemplo:

```typescript
type TWorkspaceProjects = {
    id: number;
    name: string;
    description?: string;
};
```

### Uso de `interface`

Por padrão, é colocado a letra `I` em maiúsculo como prefixo.

Exemplo:

```typescript
interface IProjects {
    id: number;
    name: string;
    description?: string;
}
```

## Pastas

Por padrão, é usado o `kebab-case`.

Exemplo:

```
customer-support
```

## Arquivos

Por padrão, é usado o `kebab-case`.

Exemplo:

```
customer-support.module.ts
```

## Estrutura e Formatação de Código

Fica a cargo da configuração padrão do lint, editor config e prettier no projeto.

Links para instalar as extensões.

https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

## Organização de Pastas e Arquivos

```bash
├── src/
│   ├── assets/           # Arquivos estáticos como imagens, fontes, ícones, etc.
│   ├── components/       # Componentes Vue reutilizáveis, como botões, modais e widgets
│   ├── composables/      # Funções reutilizáveis baseadas na Composition API do Vue
│   ├── layout/           # Layouts globais e templates estruturais da aplicação
│   ├── modules/          # Páginas e módulos principais da aplicação
│   ├── plugins/          # Configurações e integrações de plugins como Vuetify, Vue Router, Pinia, etc.
│   ├── stores/           # Gerenciamento de estado global usando Pinia
│   ├── utils/            # Funções utilitárias reutilizáveis em TypeScript ou JavaScript
│   ├── app.vue           # Componente raiz da aplicação Vue
│   └── main.ts           # Ponto de entrada da aplicação onde os plugins e o Vue são inicializados
├── .editorconfig         # Configurações de formatação de código (indentação, etc.) para editores de texto
├── .env.development      # Configurações específicas para o ambiente de desenvolvimento
├── .env.production       # Configurações específicas para o ambiente de produção
├── .env.qa               # Configurações específicas para o ambiente de QA (Quality Assurance)
├── .eslintignore         # Arquivos e diretórios ignorados pelo ESLint
├── .eslintrc.js          # Configuração de regras do ESLint para padronização de código
├── .gitignore            # Arquivos e pastas ignorados pelo Git
├── .prettierrc           # Configurações do Prettier para formatação automática de código
├── index.html            # Página principal HTML, base para a aplicação Vue
├── package-lock.json     # Arquivo que trava as versões exatas das dependências instaladas
├── package.json          # Dependências e scripts do projeto, além de metadados da aplicação
├── README.md             # Arquivo de documentação com instruções e informações sobre o projeto
└── tsconfig.json         # Configurações de compilação do TypeScript
```

## Comentários

-   Usar comentários para explicar o porquê, e não o como do código.
-   Evitar comentários excessivos, apenas comente quando for adicionar valor.
-   Usar comentários no idioma inglês.

## Boas Práticas

### Imports

Manter uma organização clara dos imports:

-   Bibliotecas externas primeiro (vue, vuetify, ícones).
-   Imports locais, organizados alfabeticamente (stores, services, funções).
-   Componentes

### Funções e Métodos

Funções devem ter no máximo 50-70 linhas. Caso contrário, considere dividi-las.
Nome de função deve indicar claramente o que ela faz.

Exemplo:

```typescript
function getUserProfile() {
    // código aqui
}
```

### Reuso de Código

Evitar duplicação de código. Sempre buscar reutilizar funções e componentes já existentes.

### Espaçamento

Inserir uma linha em branco entre blocos de código ou entre métodos de uma classe para melhorar a legibilidade.
