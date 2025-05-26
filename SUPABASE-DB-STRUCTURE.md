# Estrutura do Banco de Dados - Supabase

Este documento detalha as tabelas, relacionamentos e políticas de segurança (RLS) configuradas no banco de dados Supabase do projeto **agency-performance-canvas**.

---

## Tabelas

### 1. clientes

- **id** (UUID, PK): Identificador único do cliente (gerado automaticamente).
- **nome** (text, NOT NULL): Nome do cliente.
- **cnpj** (text): CNPJ do cliente.
- **contato** (text): Contato do cliente.
- **email** (text): Email do cliente.
- **criado_em** (timestamp, default now()): Data de criação do registro.

### 2. campanhas

- **id** (UUID, PK): Identificador único da campanha.
- **nome** (text, NOT NULL): Nome da campanha.
- **plataforma** (text): Plataforma onde a campanha roda (Facebook, Google, etc).
- **status** (text): Status atual da campanha.
- **cliente_id** (UUID, FK): Referência para o cliente (clientes.id).
- **inicio** (date): Data de início da campanha.
- **fim** (date): Data de término da campanha.
- **criado_em** (timestamp, default now()): Data de criação do registro.

### 3. relatorios

- **id** (UUID, PK): Identificador do relatório.
- **campanha_id** (UUID, FK): Referência para a campanha (campanhas.id).
- **periodo_inicio** (date): Data inicial do período do relatório.
- **periodo_fim** (date): Data final do período do relatório.
- **impressoes** (integer): Número de impressões.
- **cliques** (integer): Número de cliques.
- **conversoes** (integer): Número de conversões.
- **investimento** (decimal): Valor investido.
- **criado_em** (timestamp, default now()): Data de criação do registro.

### 4. observacoes

- **id** (UUID, PK): Identificador da observação.
- **relatorio_id** (UUID, FK): Referência para o relatório (relatorios.id).
- **tipo** (text): Tipo da observação.
- **conteudo** (text, NOT NULL): Texto da observação.
- **criado_em** (timestamp, default now()): Data de criação do registro.

### 5. usuarios

- **id** (UUID, PK): Identificador interno do usuário.
- **user_id** (UUID, FK): Referência ao usuário no sistema de autenticação (auth.users.id).
- **nome** (text): Nome do usuário.
- **cargo** (text): Cargo/função do usuário.
- **email** (text): Email do usuário.
- **criado_em** (timestamp, default now()): Data de criação do registro.

---

## Relacionamentos

- **campanhas.cliente_id** → **clientes.id**
- **relatorios.campanha_id** → **campanhas.id**
- **observacoes.relatorio_id** → **relatorios.id**
- **usuarios.user_id** → **auth.users.id**

---

## Row Level Security (RLS)

Para garantir a segurança e o isolamento dos dados, as seguintes políticas foram configuradas:

- **clientes**: Usuários só podem ver e modificar seus próprios clientes.
- **campanhas**: Usuários só podem ver e modificar suas próprias campanhas.
- **relatorios**: Usuários só podem ver e modificar seus próprios relatórios.
- **observacoes**: Usuários só podem ver e modificar suas próprias observações.
- **usuarios**: Usuários só podem ver e modificar seus próprios dados.

As políticas usam a função `auth.uid()` para identificar o usuário autenticado e restringir o acesso.

Exemplo de política para clientes:

```sql
create policy usuario_pode_ver_seus_clientes on clientes
  for select
  using (
    exists (
      select 1 from usuarios where usuarios.user_id = auth.uid()
    )
  );
