# JUSTLAB — Mobilidade ao campus

Formulário anônimo, painel ao vivo, estimativas pessoais e histórico de coletas.

O GitHub Pages serve a interface em https://molino-algae.github.io/justlab-site/commute/ . A API e o banco compartilhado continuam no serviço JUSTLAB existente. O formulário e o painel também estão em https://justlab-live-commute.pairedmalt.chatgpt.site/ .

A versão atual usa o logo oficial e de 0 a 14 trajetos de ida ou volta por semana. Ida e volta podem ter transportes diferentes. A distância é de um trajeto; não se duplica novamente. Respostas antigas por dias continuam preservadas. O painel compara a soma dos passageiro-km com referências de avião e informa os fatores e limites do cálculo.

Na apresentação dedicada, Enquete → Salvar e iniciar nova enquete fecha a atual, mantém o histórico e cria um novo QR. O link de gestão do professor é necessário; somente o formulário anônimo deve ser compartilhado com estudantes.

`source.zip` contém fontes, migrações, testes e ferramentas de construção, sem credenciais, banco de dados ou arquivos locais. A identidade do serviço foi removida de `.openai/hosting.json`; uma cópia nova precisa de um serviço próprio para as rotas da API e um banco D1. Não aponte uma cópia de teste para o banco de produção.

Para reconstruir a interface a partir da fonte: instale as dependências com o instalador do projeto e rode `node scripts/build-pages.mjs`. Publique a saída `outputs/github-pages/commute/` em `public/commute/` deste repositório. Consulte o README incluído na fonte para o modelo de cálculo, limites e publicação do serviço.
