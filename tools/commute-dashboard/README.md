# Painel de trajetos · JUSTLAB

Interface pública: https://molino-algae.github.io/justlab-site/commute/

O arquivo `source.zip` contém o projeto completo, incluindo interface React,
API do Worker, esquema e migrações do D1, testes e licenças dos componentes.
Dados de estudantes, arquivos de execução locais e credenciais não fazem parte
do pacote. O endereço público da API está em `app/lib/client.ts`.

## Reconstruir a interface

1. Extraia `source.zip` em uma pasta de trabalho.
2. Use Node.js 22.13 ou mais recente e execute `npm ci` na raiz do projeto.
3. Execute `node scripts/build-pages.mjs`.
4. Copie o conteúdo de `outputs/github-pages/commute/` para `public/commute/`
   do repositório Astro `justlab-site`, mantendo `index.html` e `assets/` juntos.
5. Publique o site Astro pelo fluxo de GitHub Pages já usado pelo repositório.

A entrada estática fica em `github-client/`; sua configuração é
`vite.pages.config.ts`. O caminho público é `/justlab-site/commute/`.

## API e banco de dados

O GitHub Pages serve a interface. A API compartilhada continua no Worker
existente, com os registros no D1. Alterações no backend e suas migrações devem
seguir o fluxo de publicação do Sites descrito no projeto; a compilação estática
não publica nem substitui esse serviço.

A API deve permitir a origem `https://molino-algae.github.io`. Credenciais e
tokens de gestão continuam fora do código público. Não crie outro serviço nem
substitua a identidade do serviço existente para reconstruir apenas a interface.

## Histórico por data de coleta

As respostas e o histórico diário permanecem no D1. O painel consulta essas
coleções pela API. Não salve respostas, exportações CSV, chaves de gestão ou
histórico de estudantes neste repositório. Uma compilação ou atualização do site
não deve reiniciar o banco nem apagar as coletas anteriores.
