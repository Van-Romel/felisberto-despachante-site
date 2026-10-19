/**
 * Cloudflare Pages Function: /api/config
 * Armazena e distribui as configurações do Felisberto Despachante globalmente via Cloudflare KV.
 */

interface Env {
  FELISBERTO_CONFIG?: KVNamespace;
  FELISBERTO_KV?: KVNamespace;
}

const DEFAULT_CONFIG = {
  unidades: {
    barreiras: {
      id: "barreiras",
      nomeCidade: "Barreiras / BA",
      subtitulo: "Matriz • Atendimento Presencial e Digital",
      endereco: "Rua Hermenegildo Fé",
      bairroCidade: "Centro — Barreiras - BA, CEP: 47800-058",
      referencia: "Região central com fácil acesso e estacionamento próximo",
      mapsUrl: "https://maps.app.goo.gl/PBFUH54SkaZUMf7bA",
      whatsapp: "(77) 99996-5588",
      whatsappRaw: "5577999965588",
      telefoneFixo: "(77) 3612-5916",
      horario: "Segunda a Sexta: 08:00 às 18:00",
      descricao: "Assessoria veicular completa em Barreiras desde 2007. Transferências, emplacamentos e débitos do Detran resolvidos sem filas.",
      especialidades: [
        "Transferência de veículos e 2ª via de CRV/DUT",
        "Primeiro emplacamento Mercosul",
        "Parcelamento de IPVA, multas e licenciamento",
        "Cadastro ANTT, vistorias e certidões"
      ],
      outraUnidadeId: "lem",
      outraUnidadeNome: "Luís Eduardo Magalhães (LEM)",
      fotoFachada: "assets/img/unidades/barreiras-fachada.jpg",
      fotoRecepcao: "assets/img/unidades/barreiras-recepcao.jpg"
    },
    lem: {
      id: "lem",
      nomeCidade: "Luís Eduardo Magalhães / BA",
      subtitulo: "Filial LEM • Condutores, Frotas e Agro",
      endereco: "Rua José Cardoso de Lima, nº 5441",
      bairroCidade: "Centro — Luís Eduardo Magalhães - BA",
      referencia: "Próximo aos principais serviços do centro de LEM",
      mapsUrl: "https://maps.app.goo.gl/ohhGB2GUCxMAGtXX7",
      whatsapp: "(77) 99800-9877",
      whatsappRaw: "5577998009877",
      horario: "Segunda a Sexta: 08:00 às 18:00",
      descricao: "Atendimento ágil para motoristas, produtores rurais e empresas de transporte de LEM e região.",
      especialidades: [
        "Transferência de utilitários, pesados e passeio",
        "Emissão rápida de CRLV-e digital",
        "Parcelamento de débitos estaduais em até 12x",
        "Inscrição e renovação ANTT (RNTRC)"
      ],
      outraUnidadeId: "barreiras",
      outraUnidadeNome: "Barreiras",
      fotoFachada: "assets/img/unidades/lem-fachada.jpg",
      fotoRecepcao: "assets/img/unidades/lem-recepcao.jpg"
    }
  },
  feriados: [
    {
      id: "exemplo_natal_fim_ano",
      unidadeId: "todas",
      titulo: "Recesso de Fim de Ano",
      dataInicioRecesso: "2026-12-24",
      dataFimRecesso: "2027-01-02",
      mensagem: "Informamos que entraremos em recesso de fim de ano. Nosso atendimento pelo WhatsApp permanecerá disponível para orientações e agendamentos.",
      diasAntecedenciaAviso: 10,
      ativo: true
    }
  ],
  temaSazonal: {
    tema: "padrao",
    forcarAtivo: false,
    dataInicio: "2026-12-15",
    dataFim: "2026-12-26",
    mensagemBanner: "Boas Festas! A equipe Felisberto Despachante deseja um Feliz Natal e Próspero Ano Novo."
  }
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, cf-access-jwt-assertion",
  "Content-Type": "application/json;charset=UTF-8"
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const kv = context.env.FELISBERTO_CONFIG || context.env.FELISBERTO_KV;
    if (kv) {
      const stored = await kv.get("site_config", "json");
      if (stored) {
        return new Response(JSON.stringify(stored), {
          status: 200,
          headers: {
            ...CORS_HEADERS,
            "Cache-Control": "public, max-age=60, s-maxage=300"
          }
        });
      }
    }
  } catch (err) {
    console.error("Erro ao ler do Cloudflare KV:", err);
  }

  // Fallback padrão seguro
  return new Response(JSON.stringify(DEFAULT_CONFIG), {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      "Cache-Control": "public, max-age=60, s-maxage=180"
    }
  });
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  try {
    const kv = context.env.FELISBERTO_CONFIG || context.env.FELISBERTO_KV;
    if (!kv) {
      return new Response(JSON.stringify({ error: "Cloudflare KV binding não configurada no Pages." }), {
        status: 503,
        headers: CORS_HEADERS
      });
    }

    const body = await context.request.json();
    if (!body || typeof body !== "object") {
      return new Response(JSON.stringify({ error: "Payload JSON inválido." }), {
        status: 400,
        headers: CORS_HEADERS
      });
    }

    await kv.put("site_config", JSON.stringify(body));

    return new Response(JSON.stringify({ success: true, updated_at: new Date().toISOString() }), {
      status: 200,
      headers: CORS_HEADERS
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Erro interno ao atualizar configuração." }), {
      status: 500,
      headers: CORS_HEADERS
    });
  }
};
