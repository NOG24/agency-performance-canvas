# 🔐 Supabase RLS - Políticas de Segurança de Acesso

## ✅ Resumo Geral

Todas as tabelas principais da aplicação estão com **Row Level Security (RLS)** ativado e **policies configuradas** para garantir que cada usuário veja e modifique **apenas os seus próprios dados**.

## 🧱 Estrutura de Controle

A referência para controle de acesso é a tabela `usuarios`, usando o campo `user_id` que é vinculado ao `auth.uid()` do Supabase.

### Tabelas com RLS e Policies:

| Tabela       | SELECT Policy                     | ALL Policy (INSERT/UPDATE/DELETE)         |
|--------------|-----------------------------------|-------------------------------------------|
| `clientes`   | `usuario_pode_ver_seus_clientes`  | `usuario_pode_modificar_seus_clientes`    |
| `campanhas`  | `usuario_pode_ver_suas_campanhas` | `usuario_pode_modificar_suas_campanhas`   |
| `relatorios` | `usuario_pode_ver_seus_relatorios`| `usuario_pode_modificar_seus_relatorios`  |
| `observacoes`| `usuario_pode_ver_suas_observacoes`| `usuario_pode_modificar_suas_observacoes` |
| `usuarios`   | `usuario_pode_ver_seus_dados`     | `usuario_pode_modificar_seus_dados`       |

## 🔍 Como funciona a verificação

Exemplo (clientes):

```sql
using (
  exists (
    select 1 from usuarios where usuarios.user_id = auth.uid()
  )
)
