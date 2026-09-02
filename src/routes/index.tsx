import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import {
  ArrowRight,
  ChartCandlestick,
  CheckCircle2,
  ChevronRight,
  Coins,
  Compass,
  Fingerprint,
  Globe2,
  GraduationCap,
  Handshake,
  KeyRound,
  Landmark,
  Layers,
  Lock,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
  ArrowUp,
} from "lucide-react";
import { BitcoinIcon, EthereumIcon, WhatsAppIcon } from "@/components/site/icons";
import { Reveal } from "@/components/site/reveal";

const WA = "https://wa.me/5599999999999";
const TITLE = "Wall Street Floripa — Educação em Bitcoin, Ethereum e autocustódia";
const DESC =
  "O dinheiro mudou. Aprenda criptomoedas do zero com linguagem simples, segurança real e autocustódia. Fale agora com um especialista no WhatsApp.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Wall Street Floripa",
          description:
            "Educação financeira em criptomoedas com foco em Bitcoin, Ethereum, segurança e autocustódia.",
          areaServed: "BR",
          knowsAbout: ["Bitcoin", "Ethereum", "Blockchain", "Autocustódia", "Segurança cripto"],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "WhatsApp",
            url: WA,
            availableLanguage: "pt-BR",
          },
        }),
      },
    ],
  }),
});

/* ---------------- building blocks ---------------- */

function WaButton({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={WA}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ?? "Falar com um especialista no WhatsApp"}
      className={`btn-wa group ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
    </a>
  );
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div onMouseMove={onMove} className={`glass-card ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  highlight,
  sub,
  center = false,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/70 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
        <Sparkles className="h-3.5 w-3.5 text-btc" />
        {eyebrow}
      </span>
      <h2 className="mt-6 text-4xl leading-[1.05] font-bold md:text-5xl">
        {title} <span className="gold-text">{highlight}</span>
      </h2>
      {sub ? <p className="mt-5 text-lg text-muted-foreground">{sub}</p> : null}
    </Reveal>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">{children}</div>
    </section>
  );
}

/* ---------------- page ---------------- */

function Index() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (y / h) * 100 : 0);
      setScrolled(y > 24);
      setShowTop(y > 700);
      setParallax(Math.min(y, 900));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      {/* scroll progress */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left"
        style={{
          transform: `scaleX(${progress / 100})`,
          background: "var(--gradient-mixed)",
        }}
      />
      <div aria-hidden="true" className="noise-layer pointer-events-none fixed inset-0 z-40" />

      <Nav scrolled={scrolled} />

      <main>
        <Hero parallax={parallax} heroRef={heroRef} />
        <Problema />
        <Oportunidade />
        <BitcoinSection />
        <EthereumSection />
        <Conteudo />
        <Autocustodia />
        <Beneficios />
        <ComoFunciona />
        <Faq />
        <CtaFinal />
      </main>

      <Footer />
      <FloatingWhatsapp />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Voltar ao topo"
        className={`fixed bottom-28 left-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-border bg-surface-2/80 text-btc backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-btc/60 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}

/* ---------------- nav ---------------- */

function Nav({ scrolled }: { scrolled: boolean }) {
  const links = [
    { href: "#oportunidade", label: "Oportunidade" },
    { href: "#conteudo", label: "O que você aprende" },
    { href: "#autocustodia", label: "Autocustódia" },
    { href: "#faq", label: "Dúvidas" },
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "border-b border-border bg-background/72 backdrop-blur-2xl" : ""
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8"
      >
        <a href="#hero" className="flex items-center gap-3">
          <BitcoinIcon className="h-9 w-9" />
          <span className="font-display text-lg font-bold tracking-tight">
            Wall Street <span className="gold-text">Floripa</span>
          </span>
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm font-medium text-muted-foreground transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-btc after:transition-transform after:duration-300 hover:text-foreground hover:after:origin-left hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold-outline px-5 py-2.5 text-sm"
          aria-label="Falar no WhatsApp com um especialista"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Falar no WhatsApp
        </a>
      </nav>
    </header>
  );
}

/* ---------------- hero ---------------- */

function Hero({
  parallax,
  heroRef,
}: {
  parallax: number;
  heroRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-24"
    >
      <div aria-hidden="true" className="tech-grid absolute inset-0" />
      <div
        aria-hidden="true"
        className="glow-gold absolute top-[-10%] left-1/2 h-[560px] w-[720px] -translate-x-1/2"
        style={{ transform: `translate(-50%, ${parallax * 0.18}px)` }}
      />
      <div
        aria-hidden="true"
        className="glow-eth absolute right-[-8%] bottom-[-10%] h-[440px] w-[520px]"
        style={{ transform: `translateY(${parallax * -0.1}px)` }}
      />
      <BlockchainLines />

      {/* floating assets */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <BitcoinIcon
          className="animate-float-soft absolute top-[18%] left-[6%] h-14 w-14 opacity-30 blur-[0.4px]"
          style={{ transform: `translateY(${parallax * -0.12}px)` }}
        />
        <BitcoinIcon
          className="animate-float-soft absolute right-[10%] bottom-[22%] h-10 w-10 opacity-20"
          style={{ animationDelay: "1.8s" }}
        />
        <EthereumIcon
          className="animate-spin-slow absolute top-[26%] right-[14%] h-16 w-16 opacity-30"
        />
        <EthereumIcon
          className="animate-float-soft absolute bottom-[16%] left-[16%] h-9 w-9 opacity-20"
          style={{ animationDelay: "3s" }}
        />
        <Particles />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-btc/30 bg-btc/8 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] text-btc-light uppercase">
              <Globe2 className="h-3.5 w-3.5" />
              Educação cripto de alto padrão
            </span>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-7 text-5xl leading-[0.98] font-bold md:text-7xl">
              O dinheiro mudou.
              <br />
              <span className="gold-text animate-gradient-pan">
                A pergunta agora é quem vai aprender primeiro.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Bitcoin, blockchain e autocustódia explicados em linguagem humana — do zero ao
              domínio. Nenhuma promessa de lucro. Apenas o conhecimento que separa quem assiste de
              quem participa.
            </p>
          </Reveal>
          <Reveal delay={230}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <WaButton className="text-base md:text-lg">Quero aprender pelo WhatsApp</WaButton>
              <a href="#conteudo" className="btn-gold-outline group">
                Ver o que você vai aprender
                <ChevronRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <ul className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              {[
                { icon: ChartCandlestick, label: "10+ anos de mercado" },
                { icon: GraduationCap, label: "1000+ alunos formados" },
                { icon: Sparkles, label: "Linguagem simples" },
              ].map((t) => (
                <li key={t.label} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <t.icon className="h-4.5 w-4.5 text-btc" />
                  {t.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}

function Particles() {
  const dots = Array.from({ length: 26 }, (_, i) => ({
    left: (i * 37) % 100,
    top: (i * 61) % 100,
    d: 6 + (i % 7),
    delay: (i % 9) * 0.7,
    size: i % 3 === 0 ? 3 : 2,
  }));
  return (
    <>
      {dots.map((d, i) => (
        <span
          key={i}
          className="animate-float-soft absolute rounded-full bg-btc/40"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDuration: `${d.d}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </>
  );
}

function BlockchainLines() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 600"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lineg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--btc)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--btc)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--eth)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[120, 260, 400, 520].map((y, i) => (
        <path
          key={y}
          d={`M0 ${y} L260 ${y - 60} L520 ${y + 40} L820 ${y - 30} L1200 ${y + 20}`}
          fill="none"
          stroke="url(#lineg)"
          strokeWidth="1"
          className="animate-dash-flow"
          style={{ animationDelay: `${i * 1.4}s` }}
        />
      ))}
      {[
        [260, 200],
        [520, 300],
        [820, 230],
        [400, 460],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="var(--btc)" opacity="0.6" />
      ))}
    </svg>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div aria-hidden="true" className="glow-gold absolute inset-0 scale-90" />
      <Card className="relative p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BitcoinIcon className="h-11 w-11" />
            <div>
              <p className="font-display font-semibold">Bitcoin</p>
              <p className="text-xs text-muted-foreground">Reserva de valor digital</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-btc/30 bg-btc/10 px-3 py-1 text-xs font-semibold text-btc-light">
            <TrendingUp className="h-3.5 w-3.5" /> Ciclo em curso
          </span>
        </div>

        <svg viewBox="0 0 400 130" className="mt-8 w-full" aria-hidden="true">
          <defs>
            <linearGradient id="areag" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--btc)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--btc)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 110 L50 92 L100 100 L150 66 L200 78 L250 44 L300 56 L350 26 L400 14 L400 130 L0 130 Z"
            fill="url(#areag)"
          />
          <path
            d="M0 110 L50 92 L100 100 L150 66 L200 78 L250 44 L300 56 L350 26 L400 14"
            fill="none"
            stroke="var(--btc)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="divider-lux my-7" />

        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: BitcoinIcon, label: "Bitcoin" },
            { icon: EthereumIcon, label: "Ethereum" },
            { icon: KeyRound, label: "Autocustódia" },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-xl border border-border bg-surface-2/60 p-4 text-center transition-colors duration-500 hover:border-btc/40"
            >
              <c.icon className="mx-auto h-8 w-8 text-btc" />
              <p className="mt-3 text-xs font-semibold text-muted-foreground">{c.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ---------------- sections ---------------- */

function Problema() {
  const items = [
    {
      icon: TrendingUp,
      title: "Seu dinheiro perde valor em silêncio",
      text: "A inflação não avisa, não pede licença e não tira férias. O que custava R$ 100 ontem custa R$ 115 hoje — e a poupança finge que está tudo bem.",
    },
    {
      icon: Landmark,
      title: "Os bancos mudaram as regras",
      text: "Taxas, bloqueios, burocracia. Quando o patrimônio está nas mãos de terceiros, o controle também está.",
    },
    {
      icon: ShieldCheck,
      title: "O medo de golpe paralisa",
      text: "Notícias de fraude assustam, mas o que realmente deixa você vulnerável é a falta de conhecimento. Educação é a única defesa que não expira.",
    },
    {
      icon: Layers,
      title: "Complexidade fabricada",
      text: "Cripto parece difícil porque quase ninguém ensina direito. Com a orientação certa, qualquer pessoa entende — inclusive você.",
    },
  ];
  return (
    <Section id="problema">
      <div aria-hidden="true" className="glow-gold absolute top-0 -left-40 h-96 w-96 opacity-60" />
      <SectionHeading
        eyebrow="O ponto cego"
        title="O problema"
        highlight="que ninguém te conta"
        sub="Enquanto o dinheiro parado encolhe, quem entende cripto já construiu proteção. A diferença entre os dois grupos é uma decisão."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 90}>
            <Card className="h-full p-8">
              <span className="icon-tile">
                <it.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl font-semibold">{it.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{it.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-14 text-center">
        <WaButton>Quero sair da poupança</WaButton>
      </Reveal>
    </Section>
  );
}

function Oportunidade() {
  const items = [
    {
      icon: BitcoinIcon,
      title: "Bitcoin",
      text: "A reserva de valor digital mais escassa já criada. 21 milhões. Sem exceções.",
      eth: false,
    },
    {
      icon: EthereumIcon,
      title: "Blockchain",
      text: "Transparência auditável e contratos que cumprem o que prometem, sem intermediário.",
      eth: true,
    },
    {
      icon: KeyRound,
      title: "Autocustódia",
      text: "Suas chaves, suas regras. O único modelo em que o dono é realmente o dono.",
      eth: false,
    },
    {
      icon: Lock,
      title: "Segurança",
      text: "Protocolos, boas práticas e disciplina. É assim que patrimônio digital sobrevive a ciclos.",
      eth: false,
    },
  ];
  return (
    <Section id="oportunidade">
      <SectionHeading
        eyebrow="A virada"
        title="A oportunidade"
        highlight="que você não pode ignorar"
        sub="Bitcoin, blockchain e autocustódia não são moda — são a nova infraestrutura financeira do mundo. Quem aprende cedo não corre atrás depois."
        center
      />
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 80}>
            <Card className="h-full p-7 text-center">
              <span className={`icon-tile mx-auto h-16 w-16 ${it.eth ? "icon-tile-eth" : ""}`}>
                <it.icon className="h-9 w-9" />
              </span>
              <h3 className="mt-6 text-lg font-semibold">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-14 text-center">
        <WaButton>Quero entender o futuro</WaButton>
      </Reveal>
    </Section>
  );
}

function BitcoinSection() {
  return (
    <Section id="bitcoin" className="overflow-hidden">
      <div aria-hidden="true" className="glow-gold absolute inset-x-0 top-1/4 mx-auto h-[420px] w-[620px]" />
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto grid h-80 w-80 place-items-center">
            <div aria-hidden="true" className="glow-gold absolute inset-0" />
            <span
              aria-hidden="true"
              className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-btc/30"
            />
            <span
              aria-hidden="true"
              className="absolute inset-10 rounded-full border border-btc/15"
            />
            <BitcoinIcon className="animate-float-soft relative h-44 w-44 drop-shadow-[0_20px_60px_rgba(247,147,26,0.35)]" />
          </div>
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Ativo âncora"
            title="Bitcoin não é sorte."
            highlight="É escassez programada."
            sub="Nenhum banco central pode imprimir mais. Nenhum governo pode alterar a regra. Entender Bitcoin é entender por que a escassez voltou a ter preço."
          />
          <div className="mt-10 space-y-4">
            {[
              { icon: Coins, t: "Oferta fixa de 21 milhões, verificável por qualquer pessoa." },
              { icon: Globe2, t: "Rede aberta, 24/7, sem fronteiras e sem permissão." },
              { icon: ShieldCheck, t: "Segurança sustentada por matemática, não por promessa." },
            ].map((r, i) => (
              <Reveal key={r.t} delay={i * 90}>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-surface/60 p-4 transition-colors duration-500 hover:border-btc/40">
                  <r.icon className="mt-0.5 h-5 w-5 shrink-0 text-btc" />
                  <p className="text-muted-foreground">{r.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={280} className="mt-10">
            <WaButton>Quero entender Bitcoin de verdade</WaButton>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function EthereumSection() {
  return (
    <Section id="ethereum">
      <div aria-hidden="true" className="glow-eth absolute top-1/3 right-0 h-[420px] w-[520px]" />
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-eth/35 bg-eth/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-eth-light uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Camada programável
            </span>
            <h2 className="mt-6 text-4xl leading-[1.05] font-bold md:text-5xl">
              Ethereum é onde o dinheiro <span className="eth-text">vira software</span>.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Contratos que se cumprem sozinhos, aplicações abertas e uma economia inteira rodando
              sem intermediários. Quem entende essa camada enxerga a internet antes de todo mundo.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Layers, t: "Smart contracts", d: "Regras que executam sem confiança cega." },
              { icon: Globe2, t: "Web3", d: "Identidade e propriedade digital reais." },
              { icon: Wallet, t: "Carteiras", d: "Uma chave, um universo de aplicações." },
              { icon: Fingerprint, t: "Transparência", d: "Tudo auditável, por qualquer um." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 80}>
                <Card className="h-full p-6">
                  <span className="icon-tile icon-tile-eth">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-semibold">{c.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300} className="mt-10">
            <WaButton>Quero dominar a Web3</WaButton>
          </Reveal>
        </div>
        <Reveal className="order-1 lg:order-2">
          <div className="relative mx-auto grid h-80 w-80 place-items-center">
            <div aria-hidden="true" className="glow-eth absolute inset-0" />
            <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
              {[
                [40, 80, 160, 160],
                [280, 90, 160, 160],
                [60, 250, 160, 160],
                [270, 240, 160, 160],
              ].map(([x1, y1, x2, y2], i) => (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--eth)"
                  strokeWidth="1"
                  opacity="0.35"
                  className="animate-dash-flow"
                />
              ))}
              {[
                [40, 80],
                [280, 90],
                [60, 250],
                [270, 240],
              ].map(([cx, cy]) => (
                <circle key={`${cx}`} cx={cx} cy={cy} r="4" fill="var(--eth-light)" opacity="0.8" />
              ))}
            </svg>
            <EthereumIcon className="animate-float-soft relative h-40 w-40 drop-shadow-[0_20px_60px_rgba(98,126,234,0.4)]" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Conteudo() {
  const items = [
    { icon: ShoppingCart, t: "Como comprar Bitcoin", d: "Passo a passo seguro para a sua primeira compra — sem sustos." },
    { icon: Search, t: "Como evitar golpes", d: "Identifique a armadilha antes dela encontrar você." },
    { icon: ChartCandlestick, t: "Leitura de mercado", d: "Gráficos e ciclos explicados sem jargão nenhum." },
    { icon: Wallet, t: "Carteiras digitais", d: "Onde guardar, como guardar e por que isso muda tudo." },
    { icon: KeyRound, t: "Autocustódia na prática", d: "Seed phrase, hardware wallet e soberania real." },
    { icon: ShieldCheck, t: "Proteção de patrimônio", d: "Estratégias para preservar valor em qualquer cenário." },
  ];
  return (
    <Section id="conteudo">
      <SectionHeading
        eyebrow="Currículo"
        title="O que você vai"
        highlight="aprender do zero"
        sub="Conteúdo prático, direto e aplicável na mesma semana. Nada de teoria decorativa."
        center
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.t} delay={i * 70}>
            <Card className="group h-full p-8">
              <span className="icon-tile">
                <it.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-lg font-semibold">{it.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-btc opacity-70 transition-all duration-500 group-hover:gap-3 group-hover:opacity-100">
                Módulo incluído <ArrowRight className="h-4 w-4" />
              </span>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-14 text-center">
        <WaButton>Quero aprender agora</WaButton>
      </Reveal>
    </Section>
  );
}

function Autocustodia() {
  return (
    <Section id="autocustodia">
      <div aria-hidden="true" className="glow-gold absolute inset-x-0 top-0 mx-auto h-[480px] w-[720px]" />
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-btc/30 bg-btc/8 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-btc-light uppercase">
              <Lock className="h-3.5 w-3.5" /> O princípio inegociável
            </span>
            <h2 className="mt-6 text-4xl leading-[1.02] font-bold md:text-6xl">
              <span className="gold-text">Se a chave é sua,</span>
              <br />o patrimônio é seu.
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              A autocustódia é o princípio mais importante das criptomoedas. Quando você detém suas
              chaves privadas,{" "}
              <span className="font-semibold text-foreground">
                ninguém pode bloquear, confiscar ou limitar o seu dinheiro
              </span>
              .
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Você vai aprender a usar <strong className="text-foreground">hardware wallets</strong>,
              entender a <strong className="text-foreground">seed phrase</strong> e exercer soberania
              financeira de verdade — não a versão de marketing.
            </p>
          </Reveal>
          <Reveal delay={200} className="mt-10">
            <WaButton>Quero ser dono do meu patrimônio</WaButton>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <Card className="relative p-10">
            <div aria-hidden="true" className="glow-gold absolute inset-0 opacity-70" />
            <div className="relative mx-auto grid h-64 w-full max-w-sm place-items-center">
              <span
                aria-hidden="true"
                className="animate-spin-slow absolute h-56 w-56 rounded-full border border-dashed border-btc/25"
              />
              {/* hardware wallet */}
              <svg viewBox="0 0 240 200" className="relative w-64" aria-hidden="true">
                <defs>
                  <linearGradient id="hw" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--btc-light)" />
                    <stop offset="100%" stopColor="var(--btc)" />
                  </linearGradient>
                </defs>
                <rect x="60" y="40" width="120" height="130" rx="18" fill="var(--surface-2)" stroke="url(#hw)" strokeWidth="2" />
                <rect x="76" y="58" width="88" height="60" rx="8" fill="var(--background)" stroke="url(#hw)" strokeWidth="1" opacity="0.7" />
                <circle cx="120" cy="145" r="14" fill="none" stroke="url(#hw)" strokeWidth="2" />
                <path d="M113 145 l5 5 10 -12" stroke="url(#hw)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M104 88 a16 16 0 0 1 32 0 v10" fill="none" stroke="url(#hw)" strokeWidth="3" strokeLinecap="round" />
                <rect x="100" y="86" width="40" height="26" rx="6" fill="url(#hw)" opacity="0.9" />
              </svg>
            </div>
            <div className="divider-lux my-8" />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: KeyRound, t: "Seed phrase" },
                { icon: ShieldCheck, t: "Escudo prático" },
                { icon: Lock, t: "Chave protegida" },
              ].map((x) => (
                <div key={x.t} className="flex flex-col items-center gap-2 text-center">
                  <span className="icon-tile h-12 w-12">
                    <x.icon className="h-5 w-5" />
                  </span>
                  <p className="text-xs font-semibold text-muted-foreground">{x.t}</p>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

function Beneficios() {
  const items = [
    { icon: GraduationCap, t: "Do zero ao avançado", d: "Nunca investiu? Perfeito. Começamos exatamente daí." },
    { icon: Sparkles, t: "Linguagem simples", d: "Sem termo técnico gratuito. Você entende de verdade." },
    { icon: ShieldCheck, t: "Sem promessa milagrosa", d: "Não vendemos enriquecimento fácil. Vendemos clareza." },
    { icon: Target, t: "Educação prática", d: "Aprendizado orientado a ação, não a teoria vazia." },
    { icon: Handshake, t: "Acompanhamento real", d: "Você não fica sozinho. Dúvida respondida é dinheiro protegido." },
    { icon: Lock, t: "Segurança primeiro", d: "Antes de crescer patrimônio, aprenda a não perdê-lo." },
  ];
  return (
    <Section id="beneficios">
      <SectionHeading
        eyebrow="Por que nós"
        title="Por que aprender"
        highlight="com a Wall Street Floripa"
        sub="Educação sem enrolação, sem hype e com foco absoluto em você tomar decisões melhores."
        center
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.t} delay={i * 70}>
            <Card className="h-full p-8">
              <span className="icon-tile">
                <it.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-lg font-semibold">{it.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ComoFunciona() {
  const steps = [
    { icon: Compass, t: "Descubra", d: "Entenda o que é cripto e por que isso importa para a sua vida." },
    { icon: GraduationCap, t: "Aprenda", d: "Domine os fundamentos com uma metodologia direta e testada." },
    { icon: Coins, t: "Invista", d: "Dê os primeiros passos com consciência, no seu ritmo." },
    { icon: ShieldCheck, t: "Proteja", d: "Implemente autocustódia e blinde o seu patrimônio." },
    { icon: TrendingUp, t: "Evolua", d: "Aprofunde-se e decida com cada vez mais autonomia." },
  ];
  return (
    <Section id="como-funciona">
      <SectionHeading
        eyebrow="A jornada"
        title="Como"
        highlight="funciona"
        sub="Cinco passos entre onde você está e a independência que você quer."
        center
      />
      <ol className="relative mt-20 grid gap-10 md:grid-cols-5">
        <span
          aria-hidden="true"
          className="absolute top-8 right-0 left-0 hidden h-px md:block"
          style={{ background: "var(--gradient-mixed)", opacity: 0.4 }}
        />
        {steps.map((s, i) => (
          <Reveal as="li" key={s.t} delay={i * 110} className="relative">
            <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full border border-btc/40 bg-background shadow-[0_0_40px_-10px_var(--btc)]">
              <s.icon className="h-6 w-6 text-btc" />
              <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-btc text-[11px] font-bold text-primary-foreground">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-6 text-center text-lg font-semibold">{s.t}</h3>
            <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">{s.d}</p>
          </Reveal>
        ))}
      </ol>
      <Reveal className="mt-16 text-center">
        <WaButton>Começar minha jornada</WaButton>
      </Reveal>
    </Section>
  );
}

function Faq() {
  const faqs = [
    { q: "É para iniciantes?", a: "Sim. Todo o conteúdo é construído para quem nunca comprou um satoshi na vida. Começamos do absoluto zero." },
    { q: "Preciso investir muito dinheiro?", a: "Não. Você pode começar com valores pequenos. O importante é aprender antes de arriscar." },
    { q: "É seguro?", a: "É, quando você segue boas práticas. Ensinamos exatamente quais são elas e como aplicá-las no dia a dia." },
    { q: "Vou aprender autocustódia?", a: "Sim — é um dos pilares do programa. Você sai sabendo guardar suas moedas com autonomia." },
    { q: "Preciso entender de economia?", a: "Não. Explicamos tudo em linguagem simples, sem jargão. Qualquer pessoa consegue acompanhar." },
    { q: "Como funciona o acompanhamento?", a: "Você tem um canal direto com especialistas para tirar dúvidas ao longo de toda a jornada." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="Objeções"
        title="Dúvidas?"
        highlight="Nós respondemos"
        sub="Tiramos cada pedra do caminho para você decidir com a cabeça no lugar."
        center
      />
      <div className="mx-auto mt-14 max-w-3xl space-y-4">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 60}>
              <Card className="overflow-hidden">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
                  >
                    <span className="font-display text-lg font-semibold">{f.q}</span>
                    <span className="icon-tile h-9 w-9 shrink-0">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-7 pb-7 leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="mt-14 text-center">
        <WaButton>Tirar minhas dúvidas</WaButton>
      </Reveal>
    </Section>
  );
}

function CtaFinal() {
  return (
    <Section id="cta-final" className="overflow-hidden">
      <div aria-hidden="true" className="glow-gold absolute inset-x-0 top-0 mx-auto h-[560px] w-[860px]" />
      <div aria-hidden="true" className="tech-grid absolute inset-0 opacity-60" />
      <Reveal className="relative mx-auto max-w-4xl text-center">
        <BitcoinIcon className="animate-float-soft mx-auto h-16 w-16" />
        <h2 className="mt-8 text-4xl leading-[1.02] font-bold md:text-6xl">
          O próximo ciclo acontece{" "}
          <span className="gold-text animate-gradient-pan">com ou sem você.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Você pode continuar assistindo de fora — ou dar o primeiro passo hoje. O futuro das
          finanças não espera ninguém.
        </p>
        <div className="mt-10 flex justify-center">
          <WaButton className="text-base md:px-14 md:py-6 md:text-xl">
            Falar com um especialista agora
          </WaButton>
        </div>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-muted-foreground">
          {["Sem compromisso", "Atendimento rápido", "Todas as suas dúvidas respondidas"].map(
            (t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-whatsapp" /> {t}
              </li>
            ),
          )}
        </ul>
      </Reveal>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 md:flex-row md:px-8">
        <div className="flex items-center gap-3">
          <BitcoinIcon className="h-8 w-8" />
          <span className="font-display font-bold">
            Wall Street <span className="gold-text">Floripa</span>
          </span>
        </div>
        <p className="max-w-md text-center text-xs leading-relaxed text-muted-foreground md:text-right">
          Conteúdo educacional. Não constitui recomendação de investimento e não há promessa de
          rentabilidade. Investimentos em criptoativos envolvem risco.
        </p>
      </div>
    </footer>
  );
}

function FloatingWhatsapp() {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 900);
    return () => clearTimeout(t);
  }, []);

  const magnet = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.25;
    el.style.transform = `translate(${x}px, ${y}px) scale(1.06)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      className={`fixed right-6 bottom-6 z-50 transition-all duration-700 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <a
        ref={ref}
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={magnet}
        onMouseLeave={reset}
        aria-label="Fale com um especialista no WhatsApp"
        className="group relative grid h-16 w-16 place-items-center rounded-full text-primary-foreground transition-transform duration-300"
        style={{
          background: "linear-gradient(135deg, var(--whatsapp-light), var(--whatsapp))",
          boxShadow: "0 18px 50px -14px color-mix(in oklab, var(--whatsapp) 80%, transparent)",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-whatsapp"
          style={{ animation: "pulse-ring 2.6s cubic-bezier(0.25,0.46,0.45,0.94) infinite" }}
        />
        <WhatsAppIcon className="relative h-8 w-8" />
        <span className="pointer-events-none absolute right-[calc(100%+14px)] whitespace-nowrap rounded-full border border-border bg-surface-2/90 px-4 py-2 text-sm font-medium text-foreground opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:opacity-100">
          Fale com um especialista
        </span>
      </a>
    </div>
  );
}
