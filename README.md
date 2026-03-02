# Guia de Configuração do Projeto no GitLab

Siga estes passos para configurar seu repositório no GitLab com as melhores práticas de branching e merge requests.

---

## Passo 1: Criar a Branch `develop`

Primeiro, crie a branch `develop` localmente e envie para o GitLab para estabelecer seu fluxo de desenvolvimento.

```bash
# Criar e mudar para a branch develop
git checkout -b develop

# Enviar a branch e configurar o upstream
git push -u origin develop
```

---

## Passo 2: Configurar Definições de Merge Request

Navegue até o seu projeto no GitLab e vá em:
**Settings** > **Merge requests**

### 1. Merge Method

Selecione **Fast-forward merge**.

- **Resultado:** Não são criados commits de merge. O histórico permanece linear.
- **Nota:** Se houver conflitos, o usuário deve fazer rebase antes do merge.

### 2. Merge Options

Ative as seguintes caixas de seleção:

- [x] **Show link to create or view a merge request when pushing from the command line**
- [x] **Enable "Delete source branch" option by default**

---

## Passo 3: Ativar Verificações de Merge

Na mesma página **Settings** > **Merge requests**, role até **Merge checks**:

- [x] **Pipelines must succeed**: Impede o merge se a última pipeline falhou ou ainda está em execução.
- [ ] **Skipped pipelines are considered successful**: **Deixe desmarcado** para garantir que nenhum código ignore as verificações de CI.

---

## Passo 4: Configuração e Proteção de Branches

### 1. Definir a Branch Padrão (Default Branch)

Navegue até:
**Settings** > **Repository** > **Default branch**

- Garanta que a branch padrão seja `main`.

### 2. Proteger Branches (Protected Branches)

Navegue até:
**Settings** > **Repository** > **Protected branches**

#### Proteger `main`

- **Allowed to merge:** Developers and Maintainers
- **Allowed to push:** No one (força todas as mudanças através de Merge Requests)

---

## Passo 5: Configurar o Caminho Base da Documentação

Para garantir que o site da documentação funcione corretamente quando implantado no GitLab Pages, você deve atualizar o `basePath` e o `assetPrefix` no arquivo `docs/next.config.mjs`.

1. Abra `docs/next.config.mjs`.
2. Substitua `/NOME_DO_REPOSITORIO` pelo caminho do seu projeto (ex: `/2026-1a/t12/g05`).
3. Salve o arquivo e faça o commit das mudanças.

---

## Passo 6: Organização de Imagens na Documentação

Para manter a organização e o funcionamento correto da documentação, todas as imagens utilizadas devem ser adicionadas na pasta:

```
docs/public/imagens-aqui.png
```

### Como referenciar imagens nos arquivos MDX:

```mdx
![Descrição da imagem](/imagens-aqui.png)
```

---

## Passo 7: Gerenciamento de Releases

Este repositório utiliza um sistema automatizado para criar Releases no GitLab baseado na pasta `releases/`.

### Como criar uma nova Release:

1. Use o arquivo `releases/draft-patch` como template para as notas de atualização.
2. Quando estiver pronto para lançar, crie um novo arquivo na pasta `releases/` com a versão (ex: `0.1.0` ou `1.0.0`).
3. Adicione as notas da release dentro desse arquivo.
4. Faça o merge dessas mudanças na branch `main`.
5. O CI detectará o novo arquivo e criará automaticamente uma Tag e uma Release oficial no GitLab (**Deploy** > **Releases**).

---

## Passo 8: Estrutura do CI/CD

As pipelines estão divididas em componentes modulares dentro de `.gitlab/ci/`:

- **docs.yml**: Responsável por buildar e publicar a documentação no GitLab Pages.
- **release.yml**: Automatiza a criação de Releases e Tags no GitLab quando novos arquivos são adicionados à pasta `releases/`.
- **sync-branches.yml**: Mantém a branch `develop` atualizada com as mudanças da `main` após um merge.
- **pipeline-check.yml**: Realiza verificações de integridade na pipeline.
- **variables.yml**: Centraliza as variáveis de ambiente utilizadas no CI.
- **branch-rules.yml** & **actions-rules.yml**: Definem as condições lógicas de quando cada job deve ser executado (ex: apenas na `main`, apenas se houver mudanças em certas pastas).

Para monitorar as execuções, acesse: **Build** > **Pipelines**.

---

## Finalizando a Configuração

Após concluir todos os passos acima, você pode remover este guia e restaurar o README padrão do projeto com o seguinte comando:

```bash
rm README.md && mv TEMPLATE.md README.md
```
