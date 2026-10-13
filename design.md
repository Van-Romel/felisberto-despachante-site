# Felisberto Despachante — Guia de Identidade Visual e Sistema de Design (design.md)

Este documento define as diretrizes visuais oficiais do **Felisberto Despachante**, servindo como fonte única de verdade para a equipe de desenvolvimento, marketing e design. Ele estabelece o **Design Principal Permanente** e as regras para **Customizações Sazonais** (datas comemorativas, campanhas e eventos).

---

## 1. Identidade Principal da Marca

### 1.1 Posicionamento & Tom de Voz
* **Assinatura / Slogan Oficial:** *"Serviços rápidos com menores preços do mercado"*
* **Tom de Voz Publicitário:** Direto, acolhedor, confiável e bem-humorado. Resolve problemas burocráticos complexos com facilidade:
  > *"Tem um abacaxi do seu veículo pra descascar? Felisberto Resolve!"*
* **Tradição:** Fundado em **2007** (quase 20 anos de mercado na Bahia).
* **Unidades Oficiais de Atendimento:**
  * **Barreiras – BA:** WhatsApp `(77) 99996-5588`
  * **Luís Eduardo Magalhães (LEM) – BA:** WhatsApp `(77) 99800-9877`
  * **Instagram Oficial:** `@felisberto_despachante`

---

## 2. Paleta de Cores Oficial

A identidade do Felisberto Despachante é pautada no contraste de alta autoridade entre o preto/grafite profundo, o gradiente dinâmico da marca (Laranja Solar ao Vermelho Fogo) e o Amarelo/Dourado de destaque.

| Nome da Cor | Hexadecimal | Uso Principal |
| :--- | :--- | :--- |
| **Preto Fundo Primário** | `#0a0f1d` / `#000000` | Background do hero, header, footer e elementos de luxo |
| **Grafite Profundo** | `#131c31` / `#1e293b` | Superfícies, cards, bordas e divisores |
| **Vermelho Fogo (Brand Base)** | `#d32f2f` / `#e52e1b` | Base do gradiente da logo, botões de ação e alertas |
| **Laranja Solar (Brand Top)** | `#ff8c00` / `#ff9900` | Topo do gradiente da logo, acentos dinâmicos |
| **Amarelo Ouro / Destaque** | `#ffb703` / `#f59e0b` | Destaques numéricos, cidades, selos "Desde 2007", badges |
| **Branco Puro** | `#ffffff` | Tipografia de títulos, leitura e clareza de dados |
| **Cinza Neutro Claro** | `#f8fafc` / `#f1f5f9` | Fundo das seções de leitura diurna (licenciamento, documentos) |
| **Verde WhatsApp** | `#25d366` | Ações de conversão direta, chat e botões flutuantes |

### Gradiente Oficial da Logo (Brand Gradient)
```css
background: linear-gradient(135deg, #ff8c00 0%, #e52e1b 100%);
```

---

## 3. Tipografia

* **Títulos e Logotipo:** Sans-serif geométrica robusta com alto peso (`Plus Jakarta Sans` ou `Inter`, pesos 700 e 800).
* **"FELISBERTO":** Caixa alta, peso extra-bold, cor branca ou com reflexo metálico sutil.
* **"DESPACHANTE":** Caixa alta, itálico bold, contraste suave.
* **Corpo e Dados Técnicos:** `Inter`, pesos 400 (regular), 500 (médio) e 600 (semi-bold) para legibilidade impecável de datas e prazos de licenciamento.

---

## 4. O que é o Core Imutável vs. O que Pode Mudar em Eventos

Para preservar a reputação e a confiança jurídica do cliente, definimos claramente o que **nunca deve ser alterado** e o que **pode receber intervenções temáticas**.

### 4.1 Núcleo Imutável (Nunca Alterar)
1. **O Símbolo "F":** A geometria do monograma em "F" com suas dobras precisas não deve sofrer distorções.
2. **Números e Contatos Oficiais:** Os números de WhatsApp de Barreiras `(77) 99996-5588` e LEM `(77) 99800-9877` devem permanecer 100% visíveis e corretos.
3. **Credenciais Oficiais:** O selo de credenciamento no CRDD-BA e as referências ao DETRAN-BA nunca devem ser removidos.
4. **Legibilidade das Tabelas de Licenciamento:** As datas, finais de placa e valores de desconto (20% e 10%) devem sempre manter alto contraste (fundo claro com números pretos/escuros), independentemente do tema ativo.

---

### 4.2 Diretrizes para Customizações Sazonais

Eventos especiais e campanhas sazonais são bem-vindos para manter o site vivo e engajado, seguindo as diretrizes abaixo:

#### A. Natal e Fim de Ano (Dezembro)
* **Permitido:**
  * Adição de um gorro natalino sutil sobre o topo do monograma "F" no Header.
  * Inclusão de partículas discretas de neve animada (CSS leve) no background do Hero (sem afetar performance).
  * Banner ou card temático: *"Final de ano com o carro 100% em dia para pegar a estrada com segurança!"*.
  * Cores permitidas para acento natalino: Verde pinho `#166534` e Dourado nobre `#fbbf24`.

#### B. Carnaval e Verão Baiano (Fevereiro/Março)
* **Permitido:**
  * Chamada especial: *"Vai curtir o Carnaval? Regularize sua CNH e licenciamento e viaje sem preocupação!"*.
  * Grafismos com ondas ou confetes sutis na faixa de anúncio superior.
  * Cores de acento: Laranja Solar e Amarelo elétrico.

#### C. Outubro Rosa & Novembro Azul
* **Permitido:**
  * Adição de um laço de fita oficial correspondente (Rosa `#ec4899` em Outubro / Azul `#2563eb` em Novembro) ao lado da logo ou no rodapé em apoio à causa.
  * A logo principal mantém suas cores oficiais; apenas o laço é inserido.

#### D. Black Friday / Virada de Licenciamento (Janeiro)
* **Permitido:**
  * Banner de contagem regressiva para a **Cota Única com 20% de desconto** do DETRAN-BA (geralmente com vencimento em Fevereiro).
  * Badge pulsante nos finais de placa com desconto ativo.
  * Fundo com acentos em vermelho intenso `#e11d48` e dourado reluzente.

---

## 5. Implementação Técnica dos Temas (Design Tokens)

No arquivo `src/styles.scss`, utilizamos CSS Custom Properties. Para ativar um tema comemorativo, basta aplicar uma classe no elemento `<body>` (ex: `<body class="theme-natal">`):

```scss
/* Tema Padrão Permanente */
:root {
  --brand-gradient: linear-gradient(135deg, #ff8c00 0%, #e52e1b 100%);
  --brand-primary: #e52e1b;
  --brand-gold: #ffb703;
  --seasonal-banner-display: none;
}

/* Exemplo de Tema Natalino */
body.theme-natal {
  --seasonal-accent: #166534;
  --seasonal-gold: #fbbf24;
  --seasonal-banner-display: flex;
}
```

---

## 6. Arquivos de Referência do Projeto
As artes originais fornecidas pela empresa estão preservadas na pasta `/referencias`:
1. `referencias/marketing1 com logo.png`: Identidade vetorial da logo "F", gradiente, tipografia e slogan.
2. `referencias/marketing2.png`: Campanha *"Tem um abacaxi do seu veículo pra descascar? Felisberto Resolve!"*, selo "Desde 2007", contatos de Barreiras e Luís Eduardo Magalhães.
