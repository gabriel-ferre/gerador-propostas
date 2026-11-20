-- Seed de exemplo (T03). Todo texto e ficticio e marcado com [EXEMPLO].
-- Nao cria propostas (owner_id exige um usuario logado).

insert into public.pains (channel, text, position) values
  ('loja_fisica', '[EXEMPLO] Meu fluxo de loja está muito fraco', 1),
  ('loja_fisica', '[EXEMPLO] Meus vendedores passam boa parte do dia ociosos', 2),
  ('loja_fisica', '[EXEMPLO] Faço tráfego pago, mas vendo pouco', 3),
  ('loja_fisica', '[EXEMPLO] Conquisto poucos clientes novos por mês', 4),
  ('loja_fisica', '[EXEMPLO] Meus clientes compram uma vez e não voltam', 5),
  ('loja_fisica', '[EXEMPLO] Não sei quanto cada ação de marketing me devolve', 6),
  ('ecommerce', '[EXEMPLO] Meu site recebe visitas, mas poucas viram pedidos', 1),
  ('ecommerce', '[EXEMPLO] Invisto em anúncios e o retorno não fecha a conta', 2),
  ('ecommerce', '[EXEMPLO] Muitos carrinhos abandonados e pouca recuperação', 3),
  ('ecommerce', '[EXEMPLO] Dependo de poucas campanhas para faturar', 4),
  ('ecommerce', '[EXEMPLO] Minha base de clientes compra uma vez e some', 5),
  ('ecommerce', '[EXEMPLO] Meu faturamento muda muito de um mês para o outro', 6);

insert into public.cases (name, niche, title, body, resolved_pains, media_url, media_type) values
  ('[EXEMPLO] Marca Alfa', 'Moda masculina',
   '[EXEMPLO] Como uma marca de moda masculina dobrou as vendas recorrentes',
   '[EXEMPLO] Aplicamos o método ODCR: nova oferta, demanda qualificada, conversão otimizada e recompra sistemática.',
   array['[EXEMPLO] Fluxo de loja fraco', '[EXEMPLO] Pouca recompra', '[EXEMPLO] Tráfego sem retorno'],
   'https://placehold.co/1280x720/png?text=EXEMPLO+case+masculino', 'image'),
  ('[EXEMPLO] Marca Beta', 'Moda feminina',
   '[EXEMPLO] Como uma marca de moda feminina tornou o faturamento previsível',
   '[EXEMPLO] Reorganizamos a jornada do cliente e criamos rotinas de recompra por WhatsApp e e-mail.',
   array['[EXEMPLO] Faturamento instável', '[EXEMPLO] Carrinhos abandonados', '[EXEMPLO] Poucos clientes novos'],
   'https://placehold.co/1280x720/png?text=EXEMPLO+case+feminino', 'image');

insert into public.plans (key, name, payment_options, anchoring) values
  ('aceleracao_lojas', '[EXEMPLO] Aceleração de Lojas',
   '[{"forma":"avista","descricao":"[EXEMPLO] À vista (6 meses)","valor":24000},
     {"forma":"cartao","descricao":"[EXEMPLO] Cartão em 6x","valor":4500},
     {"forma":"boleto","descricao":"[EXEMPLO] Boleto mensal","valor":4200}]'::jsonb,
   '{"profissionais":[{"cargo":"[EXEMPLO] Gestor de tráfego","custo_mensal":5000},
                      {"cargo":"[EXEMPLO] Estrategista de marketing","custo_mensal":7000},
                      {"cargo":"[EXEMPLO] Analista de CRM","custo_mensal":4500}],
     "entregas":[{"item":"[EXEMPLO] Criativos mensais","valor":3000},
                 {"item":"[EXEMPLO] Dashboard de resultados","valor":1500}]}'::jsonb),
  ('ecom_experts', '[EXEMPLO] Ecom Experts',
   '[{"forma":"avista","descricao":"[EXEMPLO] À vista (6 meses)","valor":30000},
     {"forma":"cartao","descricao":"[EXEMPLO] Cartão em 6x","valor":5500},
     {"forma":"boleto","descricao":"[EXEMPLO] Boleto mensal","valor":5200}]'::jsonb,
   '{"profissionais":[{"cargo":"[EXEMPLO] Gestor de e-commerce","custo_mensal":6000},
                      {"cargo":"[EXEMPLO] Gestor de tráfego","custo_mensal":5000},
                      {"cargo":"[EXEMPLO] Especialista em CRO","custo_mensal":6500}],
     "entregas":[{"item":"[EXEMPLO] Otimizações de conversão","valor":4000},
                 {"item":"[EXEMPLO] Fluxos de e-mail e WhatsApp","valor":2500}]}'::jsonb);

insert into public.plan_offers (plan_id, title, body, price)
select id, '[EXEMPLO] Oferta protagonista - ' || name,
       '[EXEMPLO] Condição especial para fechar na reunião.', 19900
from public.plans;

insert into public.faqs (question, answer, position) values
  ('[EXEMPLO] Em quanto tempo vejo resultados?', '[EXEMPLO] Resposta de exemplo sobre prazo.', 1),
  ('[EXEMPLO] Existe fidelidade mínima?', '[EXEMPLO] Resposta de exemplo sobre contrato.', 2),
  ('[EXEMPLO] Como funciona o acompanhamento?', '[EXEMPLO] Resposta de exemplo sobre reuniões e relatórios.', 3);

insert into public.client_logos (name, image_url, position) values
  ('[EXEMPLO] Cliente 1', 'https://placehold.co/240x96/png?text=Logo+1', 1),
  ('[EXEMPLO] Cliente 2', 'https://placehold.co/240x96/png?text=Logo+2', 2),
  ('[EXEMPLO] Cliente 3', 'https://placehold.co/240x96/png?text=Logo+3', 3),
  ('[EXEMPLO] Cliente 4', 'https://placehold.co/240x96/png?text=Logo+4', 4);

insert into public.testimonials (kind, image_url, caption, position) values
  ('foto_placa', 'https://placehold.co/600x600/png?text=Depoimento+1', '[EXEMPLO] Depoimento com plaquinha', 1),
  ('print_whatsapp', 'https://placehold.co/600x800/png?text=Print+WhatsApp', '[EXEMPLO] Print de WhatsApp', 2);

insert into public.section_content (key, content) values
  ('autoridade', '{"titulo":"[EXEMPLO] Autoridade em moda","texto":"[EXEMPLO] História da Retrieve.","foto_principal":"https://placehold.co/800x1000/png?text=Lucas","fotos":[],"numeros":[{"valor":"+200","rotulo":"[EXEMPLO] marcas atendidas"}]}'::jsonb),
  ('metodo', '{"titulo":"[EXEMPLO] Método ODCR","texto":"[EXEMPLO] Oferta, Demanda, Conversão e Recompra, todo mês."}'::jsonb),
  ('etapa_oferta', '{"titulo":"[EXEMPLO] Oferta irresistível","texto":"[EXEMPLO] Texto da etapa.","bullets":["[EXEMPLO] Bullet 1","[EXEMPLO] Bullet 2"],"criativos":[]}'::jsonb),
  ('etapa_demanda', '{"titulo":"[EXEMPLO] Demanda qualificada","texto":"[EXEMPLO] Texto da etapa.","bullets":["[EXEMPLO] Bullet 1","[EXEMPLO] Bullet 2"],"funil_url":"https://placehold.co/800x600/png?text=Funil","dashboards":[]}'::jsonb),
  ('etapa_conversao', '{"titulo":"[EXEMPLO] Conversão otimizada","texto":"[EXEMPLO] Texto da etapa.","bullets":["[EXEMPLO] Bullet 1","[EXEMPLO] Bullet 2"],"home_url":"https://placehold.co/1000x700/png?text=Home","marcacoes":[]}'::jsonb),
  ('etapa_recompra', '{"titulo":"[EXEMPLO] Recompra sistemática","texto":"[EXEMPLO] Texto da etapa.","bullets":["[EXEMPLO] Bullet 1","[EXEMPLO] Bullet 2"],"plataformas":[],"exemplos":[]}'::jsonb),
  ('beneficios', '{"titulo":"[EXEMPLO] O que você ganha","itens":["[EXEMPLO] Metas atingidas","[EXEMPLO] Clientes voltando mais vezes","[EXEMPLO] Visão de mercado","[EXEMPLO] Novos clientes todos os dias","[EXEMPLO] Destaque no mercado"],"pergunta":"Quanto vale isso pra você?"}'::jsonb),
  ('cta', '{"titulo":"[EXEMPLO] Vamos começar?","texto":"[EXEMPLO] Fale com a gente no WhatsApp.","botao":"Falar no WhatsApp","whatsapp_url":"https://wa.me/5500000000000"}'::jsonb);
