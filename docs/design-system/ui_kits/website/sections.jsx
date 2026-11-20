/* RETRIEVE — marketing website sections.
   Composes design-system primitives from the bundle. */
const RDS = window.RetrieveDesignSystem_cd8a72;
const { Button, Badge, Card, Eyebrow, Stat, Input } = RDS;

const LOGO = "../../assets/logos/retrieve-logo-primary.png";
const LOGO_WHITE = "../../assets/logos/retrieve-logo-white.png";
const MAXW = 1200;

const sx = {
  section: { padding: "104px 32px", boxSizing: "border-box" },
  inner: { maxWidth: MAXW, margin: "0 auto", width: "100%" },
  h2: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px, 4.4vw, 56px)", lineHeight: 1, letterSpacing: "-0.025em", margin: 0, color: "var(--ink-900)" },
};

/* ---------- Header ---------- */
function Header() {
  const [open, setOpen] = React.useState(false);
  const links = ["Método", "Resultados", "Para quem", "Investimento"];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(254,254,254,0.86)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--ink-150)" }}>
      <div style={{ ...sx.inner, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", boxSizing: "border-box" }}>
        <img src={LOGO} alt="Retrieve" style={{ height: 30 }} />
        <nav style={{ display: "flex", gap: 30 }}>
          {links.map(l => (
            <a key={l} href="#" style={{ fontSize: 15, fontWeight: 700, color: "var(--ink-700)" }}>{l}</a>
          ))}
        </nav>
        <Button variant="primary" size="sm">Diagnóstico gratuito</Button>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section style={{ background: "var(--ink-950)", color: "var(--white)", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", right: -220, top: -200, width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, rgba(230,47,34,0.40), rgba(230,47,34,0) 62%)" }} />
      <div style={{ ...sx.inner, ...sx.section, position: "relative", paddingTop: 120, paddingBottom: 120 }}>
        <Eyebrow color="var(--red-400)">12 meses em 12 semanas</Eyebrow>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(44px, 6.6vw, 88px)", lineHeight: 0.96, letterSpacing: "-0.03em", margin: "26px 0 0", maxWidth: "16ch" }}>
          Retome o controle do seu <span style={{ color: "var(--brand-red)" }}>crescimento</span>.
        </h1>
        <p style={{ fontSize: 21, lineHeight: 1.5, color: "var(--ink-300)", maxWidth: "52ch", marginTop: 28 }}>
          Somos a assessoria de marketing criada de dentro do varejo. Estruturamos aquisição, conversão e retenção para loja física e e-commerce — com método e performance real.
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
          <Button variant="primary" size="lg">Quero meu diagnóstico</Button>
          <Button variant="outline" size="lg" style={{ color: "var(--white)", borderColor: "rgba(254,254,254,0.28)" }}>Conhecer o método</Button>
        </div>
        <div style={{ display: "flex", gap: 48, marginTop: 64, flexWrap: "wrap" }}>
          <HeroStat value="R$200M" label="faturados/ano sob nossa gestão de campo" />
          <HeroStat value="19 anos" label="de varejo no campo de batalha" />
          <HeroStat value="300" label="varejistas — meta até 2028" />
        </div>
      </div>
    </section>
  );
}
function HeroStat({ value, label }) {
  return (
    <div style={{ maxWidth: 220 }}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 40, letterSpacing: "-0.02em", color: "var(--white)" }}>{value}</div>
      <div style={{ fontSize: 14, color: "var(--ink-400)", marginTop: 6, lineHeight: 1.4 }}>{label}</div>
    </div>
  );
}

/* ---------- Method ---------- */
const METHOD = [
  { n: "01", t: "Oferta Irresistível", d: "Criamos a narrativa que transforma sua marca e produto em desejo — antes mesmo do cliente ter fome." },
  { n: "02", t: "Demanda Qualificada", d: "Campanhas de tráfego pago no Meta, Google e TikTok que trazem o público comprador para a sua loja." },
  { n: "03", t: "Conversão Otimizada", d: "Otimizamos o canal de vendas para ser mais eficiente e reduzir o seu custo de aquisição." },
  { n: "04", t: "Recompra Sistemática", d: "Aplicamos a fórmula de CRM que transforma clientes em fãs e coloca seu negócio na rotina deles." },
];
function MethodSection() {
  return (
    <section style={{ ...sx.section, background: "var(--white)" }}>
      <div style={sx.inner}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 48 }}>
          <div>
            <Eyebrow>A solução com método</Eyebrow>
            <h2 style={{ ...sx.h2, marginTop: 16, maxWidth: "16ch" }}>Um ecossistema, quatro alavancas.</h2>
          </div>
          <p style={{ fontSize: 17, color: "var(--ink-600)", maxWidth: "34ch", lineHeight: 1.55 }}>
            Conectamos marketing, vendas e educação num ciclo estruturado a dados e jornada.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {METHOD.map((m, i) => (
            <Card key={m.n} variant={i === 0 ? "dark" : "default"} style={{ display: "flex", flexDirection: "column", minHeight: 268 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 14, color: i === 0 ? "var(--red-400)" : "var(--brand-red)" }}>{m.n}</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, lineHeight: 1.05, margin: "auto 0 0", color: i === 0 ? "var(--white)" : "var(--ink-900)" }}>{m.t}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.5, marginTop: 12, color: i === 0 ? "var(--ink-300)" : "var(--ink-600)" }}>{m.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Cases ---------- */
const CASES = [
  { meta: ["Loja + E-commerce", "37 meses", "Indústria"], value: "10x", desc: "de ROI em 2025, só com tráfego pago e CRM aplicados." },
  { meta: ["E-commerce", "42 meses", "Confecção"], value: "Recorde", desc: "de faturamento em Dezembro de 2025 — o mês mais desafiador do e-commerce." },
  { meta: ["Loja + E-commerce", "2 meses", "Multimarca"], value: "+45%", desc: "de crescimento já nos 2 primeiros meses com a Retrieve." },
];
function CasesSection() {
  return (
    <section style={{ ...sx.section, background: "var(--ink-50)" }}>
      <div style={sx.inner}>
        <Eyebrow>Cases de sucesso</Eyebrow>
        <h2 style={{ ...sx.h2, marginTop: 16, maxWidth: "20ch", marginBottom: 48 }}>Aplicaram o método. Retomaram o controle.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {CASES.map((c, i) => (
            <Card key={i} variant="raised" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 28 }}>
                {c.meta.map(m => <Badge key={m} tone="neutral">{m}</Badge>)}
              </div>
              <Stat value={c.value} label="" accent />
              <p style={{ fontSize: 15, lineHeight: 1.5, color: "var(--ink-600)", marginTop: 10 }}>{c.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing / CTA ---------- */
function CTASection() {
  const [email, setEmail] = React.useState("");
  return (
    <section style={{ ...sx.section, background: "var(--brand-red)", color: "var(--white)" }}>
      <div style={{ ...sx.inner, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, alignItems: "center" }}>
        <div>
          <Eyebrow color="rgba(255,255,255,0.8)">Diagnóstico de cenário</Eyebrow>
          <h2 style={{ ...sx.h2, color: "var(--white)", marginTop: 16, maxWidth: "16ch" }}>Vamos avaliar se o seu varejo está pronto.</h2>
          <p style={{ fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.9)", maxWidth: "42ch", marginTop: 20 }}>
            Sem compromisso. Avaliamos o seu momento e, se fizer sentido para os dois lados, avançamos para o plano de ação.
          </p>
        </div>
        <div style={{ background: "var(--white)", borderRadius: "var(--radius-xl)", padding: 32, boxShadow: "var(--shadow-xl)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Input label="Seu melhor e-mail" placeholder="voce@sualoja.com.br" value={email} onChange={e => setEmail(e.target.value)} />
            <Input label="Faturamento mensal" placeholder="R$ 0,00" />
            <Button variant="primary" size="lg" fullWidth>Agendar diagnóstico</Button>
            <p style={{ fontSize: 13, color: "var(--ink-500)", textAlign: "center", margin: 0 }}>Resposta em até 1 dia útil.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer style={{ background: "var(--ink-950)", color: "var(--ink-400)", padding: "64px 32px 40px" }}>
      <div style={{ ...sx.inner, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 320 }}>
          <img src={LOGO_WHITE} alt="Retrieve" style={{ height: 30 }} />
          <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 18 }}>A evolução do varejo brasileiro através de comunicação e educação. Crescimento controlável, previsível e escalável.</p>
        </div>
        <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
          <FooterCol title="Método" items={["Oferta", "Demanda", "Conversão", "Recompra"]} />
          <FooterCol title="Empresa" items={["Sobre", "Cases", "Carreiras", "Contato"]} />
        </div>
      </div>
      <div style={{ ...sx.inner, marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(254,254,254,0.1)", fontSize: 13 }}>
        © 2026 Retrieve. Todos os direitos reservados.
      </div>
    </footer>
  );
}
function FooterCol({ title, items }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-500)", marginBottom: 16 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map(i => <a key={i} href="#" style={{ fontSize: 15, color: "var(--ink-300)" }}>{i}</a>)}
      </div>
    </div>
  );
}

Object.assign(window, { Header, Hero, MethodSection, CasesSection, CTASection, Footer });
