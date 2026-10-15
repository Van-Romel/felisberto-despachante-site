# 📋 Backlog — Felisberto Despachante

Este arquivo centraliza o roadmap, tarefas pendentes, débitos técnicos e melhorias para o website e infraestrutura do **Felisberto Despachante**.

---

## 🚀 Em Andamento / Próximas Prioridades

### [FELISBERTO-001] Configuração de Deploy & Domínio no Cloudflare Pages
* **Descrição:** O domínio oficial foi recomprado e o site precisa ser publicado no Cloudflare Pages para substituir a hospedagem antiga com custo zero, SSL automático e CDN global.
* **Pipeline Atual:** Repositório GitHub `Van-Romel/felisberto-despachante-site`, workflow `.github/workflows/deploy.yml` que gera o build em `dist/felisberto-despachante` e publica no branch `main`.
* **Ações:**
  1. Conectar repositório no Cloudflare Pages apontando para o branch `main` (ou build automático).
  2. Apontar DNS do domínio recomprado para o Cloudflare Pages.
* **Status:** Pronto para configuração de DNS / Cloudflare.
* **Prioridade:** Alta.

### [FELISBERTO-002] Simplificação da Zona Flutuante de Promoções
* **Descrição:** Avaliar e simplificar o botão vermelho flutuante de promoções (`app-floating-whatsapp` / Sorteio Moto Elétrica Oeste Vistorias) para torná-lo mais elegante, menos intrusivo e mais harmônico no mobile.
* **Status:** Pendente.
* **Prioridade:** Média.

### [FELISBERTO-003] Simplificação das Páginas de Parceiros & Nossos Escritórios
* **Descrição:** Reduzir textos e simplificar a navegação das páginas secundárias:
  - `/parceiros` (Parceiros e vistorias).
  - `/unidades/barreiras` e `/unidades/lem` (Escritórios físicos).
* **Status:** Pendente.
* **Prioridade:** Média.

---

## ✅ Concluído Recentemente
- [x] Unificação total das cores e estilos de botões do WhatsApp (`#25d366` sólido em todas as seções).
- [x] Chamada discreta do Google Maps nos cards de depoimentos (ícone externo `↗` ao lado das estrelas).
- [x] Enxugamento de ~50% dos textos do site para leitura rápida mobile (30+).
- [x] Correção e ampliação do Favicon (letra "F" agora ocupa 95% da aba).
- [x] Homologação dos 10 serviços oficiais do DETRAN-BA com a equipe.
