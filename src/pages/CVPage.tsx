import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import {
  Download,
  ArrowLeft,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-5">
    <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
      {children}
    </h2>
    <div className="flex-1 h-px bg-border" />
  </div>
);

const Tag = ({ children }: { children: string }) => (
  <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
    {children}
  </span>
);

const CVContent = () => {
  const { t, language, setLanguage } = useLanguage();
  const cv = t.cv;
  const cvRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (!cvRef.current) return;
    setIsGenerating(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).jsPDF;

      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      const pdfImgHeight = pdfWidth / ratio;

      if (pdfImgHeight <= pdfHeight) {
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfImgHeight);
      } else {
        // Multi-page
        let position = 0;
        const pageHeightPx = (pdfHeight * imgWidth) / pdfWidth;
        while (position < imgHeight) {
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = imgWidth;
          pageCanvas.height = Math.min(pageHeightPx, imgHeight - position);
          const ctx = pageCanvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(
              canvas,
              0,
              position,
              imgWidth,
              pageCanvas.height,
              0,
              0,
              imgWidth,
              pageCanvas.height,
            );
          }
          const pageData = pageCanvas.toDataURL("image/jpeg", 0.95);
          const pageH = (pageCanvas.height * pdfWidth) / imgWidth;
          if (position > 0) pdf.addPage();
          pdf.addImage(pageData, "JPEG", 0, 0, pdfWidth, pageH);
          position += pageHeightPx;
        }
      }

      pdf.save(`CV-Merveil-Eldo-Moreo-GBOHOUILI-${language.toUpperCase()}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const languages = [
    { code: "fr", flag: "🇫🇷", label: "FR" },
    { code: "en", flag: "🇬🇧", label: "EN" },
    { code: "fon", flag: "🇧🇯", label: "FON" },
    { code: "es", flag: "🇪🇸", label: "ES" },
    { code: "de", flag: "🇩🇪", label: "DE" },
    { code: "yo", flag: "🇳🇬", label: "YO" },
  ];

  const experiences = [
    {
      company: "Tech2Work",
      role: "Full-Stack Developer",
      period: "Nov. 2025 — Jan. 2026",
      bullets: {
        fr: [
          "Automatisation de workflows complexes (n8n, Make)",
          "Scripts scraping & extraction de données (Node.js, Python)",
          "Interfaces web Nuxt.js, intégration APIs REST",
          "Outils internes de collecte et traitement de données",
        ],
        en: [
          "Complex workflow automation (n8n, Make)",
          "Scraping & data extraction scripts (Node.js, Python)",
          "Nuxt.js web interfaces, REST API integration",
          "Internal data collection and processing tools",
        ],
        fon: [
          "Automation n8n, Make",
          "Scraping Node.js, Python",
          "Nuxt.js, APIs REST",
          "Outils data",
        ],
        es: [
          "Automatización de flujos (n8n, Make)",
          "Scripts scraping (Node.js, Python)",
          "Interfaces Nuxt.js, APIs REST",
          "Herramientas de datos internas",
        ],
        de: [
          "Workflow-Automatisierung (n8n, Make)",
          "Scraping-Skripte (Node.js, Python)",
          "Nuxt.js-Oberflächen, REST-APIs",
          "Interne Datenwerkzeuge",
        ],
        yo: [
          "Adaṣiṣẹ iṣẹ́ (n8n, Make)",
          "Scraping Node.js, Python",
          "Nuxt.js, REST APIs",
          "Àwọn ohun èlò data",
        ],
      },
    },
    {
      company: "Drwintech-Houehiho",
      role: "Full-Stack Developer",
      period: "Juin — Déc. 2025",
      bullets: {
        fr: [
          "Architecture et développement d'APIs REST (Laravel, Node.js, PostgreSQL)",
          "Systèmes backend, logique métier, optimisation BDD relationnelle",
          "Suivi de projet, diagrammes UML, maintenance des performances",
        ],
        en: [
          "REST API architecture (Laravel, Node.js, PostgreSQL)",
          "Backend systems, business logic, relational DB optimization",
          "Project tracking, UML diagrams, performance maintenance",
        ],
        fon: [
          "APIs REST Laravel, Node.js",
          "Backend, logique métier",
          "UML, performance",
        ],
        es: [
          "Arquitectura REST APIs (Laravel, Node.js, PostgreSQL)",
          "Sistemas backend, lógica de negocio",
          "Seguimiento, UML, rendimiento",
        ],
        de: [
          "REST-API-Architektur (Laravel, Node.js, PostgreSQL)",
          "Backend-Systeme, Geschäftslogik",
          "UML, Performance",
        ],
        yo: [
          "REST API architecture",
          "Backend systems, logic",
          "UML, performance",
        ],
      },
    },
    {
      company: "Epitech Bénin · ATUT",
      role: "Développeur IA / RAG",
      period: "Sept. 2024",
      bullets: {
        fr: [
          "Développement de TOTON — agent conversationnel RAG sur plateforme e-service ANIP",
          "Prétraitement des données et fine-tuning du modèle",
        ],
        en: [
          "Built TOTON — RAG conversational agent on ANIP e-service platform",
          "Data preprocessing and model fine-tuning",
        ],
        fon: ["TOTON RAG agent ANIP", "Prétraitement, fine-tuning"],
        es: ["TOTON — agente RAG ANIP", "Preprocesamiento, fine-tuning"],
        de: ["TOTON — RAG-Agent ANIP", "Datenvorverarbeitung, Fine-tuning"],
        yo: ["TOTON RAG ANIP", "Preprocessing, fine-tuning"],
      },
    },
  ];

  const projects = [
    {
      name: "Zero To One (ZTO)",
      badge: "SaaS",
      desc: {
        fr: "SaaS multi-tenant pour restaurateurs ouest-africains. Backend complet : abonnements, tunnel WhatsApp, analytics temps réel, RLS, scheduler automatique.",
        en: "Multi-tenant SaaS for West African restaurant owners. Full backend: subscriptions, WhatsApp tunnel, real-time analytics, RLS, auto scheduler.",
        fon: "SaaS multi-tenant do restaurateurs. Backend: abonnements, WhatsApp, analytics, RLS.",
        es: "SaaS multi-tenant para restauradores. Backend completo: suscripciones, WhatsApp, analytics, RLS.",
        de: "Multi-Tenant-SaaS für Restaurantbesitzer. Backend: Abonnements, WhatsApp, Analytics, RLS.",
        yo: "SaaS multi-tenant. Backend: subscriptions, WhatsApp, analytics, RLS.",
      },
      stack: ["NestJS", "PostgreSQL", "Prisma", "Redis", "Supabase", "Next.js"],
    },
    {
      name: "Payment API",
      badge: "API",
      desc: {
        fr: "API REST sécurisée de gestion des paiements — architecture backend, transactions, intégration frontend.",
        en: "Secure REST payment management API — backend architecture, transactions, frontend integration.",
        fon: "API paiement sécurisée.",
        es: "API REST de pagos segura.",
        de: "Sichere REST-Zahlungs-API.",
        yo: "REST payment API.",
      },
      stack: ["Python", "PostgreSQL", "REST API"],
    },
    {
      name: "Marketplace Influenceurs",
      badge: "SaaS",
      desc: {
        fr: "Plateforme SaaS marketing full-stack : gestion utilisateurs, campagnes, données et automatisation.",
        en: "Full-stack marketing SaaS: user, campaign, data management and automation.",
        fon: "SaaS marketing full-stack.",
        es: "SaaS marketing full-stack.",
        de: "Full-Stack Marketing SaaS.",
        yo: "Full-stack marketing SaaS.",
      },
      stack: ["React", "Laravel", "MySQL"],
    },
    {
      name: "Automation & Data Collection",
      badge: "Automation",
      desc: {
        fr: "Système complet de scraping, extraction et structuration de données, automatisation de workflows.",
        en: "Complete scraping, data extraction and structuring system, workflow automation.",
        fon: "Scraping, data, automation.",
        es: "Scraping, extracción de datos, automatización.",
        de: "Scraping, Datenextraktion, Automatisierung.",
        yo: "Scraping, data, automation.",
      },
      stack: ["Python", "Node.js", "n8n", "Make"],
    },
  ];

  const education = [
    {
      school: "Université d'Abomey-Calavi",
      degree: {
        fr: "Licence 3 en Philosophie",
        en: "Bachelor's in Philosophy (Year 3)",
        fon: "Licence 3 Philosophie",
        es: "Licenciatura en Filosofía",
        de: "Lizenziat Philosophie",
        yo: "Degree in Philosophy",
      },
      year: "2023 – présent",
    },
    {
      school: "Simplon Bénin (D-CLIC)",
      degree: {
        fr: "Formation Développement Web",
        en: "Web Development Training",
        fon: "Formation Web Dev",
        es: "Formación Desarrollo Web",
        de: "Webentwicklung",
        yo: "Web Development",
      },
      year: "2025",
    },
    {
      school: "Africa TechUp Tour (ATUT)",
      degree: {
        fr: "Formation Data Science & IA",
        en: "Data Science & AI",
        fon: "Data Science & IA",
        es: "Ciencia de Datos & IA",
        de: "Data Science & KI",
        yo: "Data Science & AI",
      },
      year: "2024",
    },
    {
      school: "CEG Nokoué",
      degree: {
        fr: "Baccalauréat Série C",
        en: "Baccalauréat (Sciences)",
        fon: "Bac C",
        es: "Bachillerato Serie C",
        de: "Abitur Serie C",
        yo: "Baccalauréat",
      },
      year: "2023",
    },
  ];

  const lang = language as keyof (typeof experiences)[0]["bullets"];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Top bar */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <Link
            to="/my-portfolio/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {t.nav.home}
          </Link>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-1">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code as any)}
                  className={`text-xs px-2 py-1 rounded transition-colors font-mono ${language === l.code ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"}`}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          </div>
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-accent text-white text-xs gap-1.5"
            onClick={handleDownloadPDF}
            disabled={isGenerating}
          >
            <Download className="h-3.5 w-3.5" />
            {isGenerating ? "Génération..." : cv.download}
          </Button>
        </div>
      </div>

      <div
        ref={cvRef}
        className="max-w-5xl mx-auto px-6 py-10 print:py-4 print:px-8"
      >
        {/* HEADER */}
        <motion.div
          {...fadeUp(0)}
          className="mb-10 pb-8 border-b border-border"
        >
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
            <div className="flex items-start gap-6">
              {/* Photo de profil */}
              <img
                src="me.jpeg"
                alt="Merveil Eldo-Moréo GBOHOUILI"
                className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover border-2 border-primary/30 shadow-md shrink-0"
              />
              <div>
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-2">
                  {cv.role}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-1">
                  Merveil{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Eldo-Moréo
                  </span>
                </h1>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  GBOHOUILI
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl border-l-2 border-primary/40 pl-3">
                  {cv.tagline}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-[220px]">
              {[
                {
                  icon: <Phone className="h-3.5 w-3.5" />,
                  val: "+229 01 63 77 65 05",
                },
                {
                  icon: <Mail className="h-3.5 w-3.5" />,
                  val: "eldomoreogbohouili@gmail.com",
                },
                {
                  icon: <Linkedin className="h-3.5 w-3.5" />,
                  val: "linkedin.com/in/gbohouili-eldo-moreo",
                },
                {
                  icon: <Github className="h-3.5 w-3.5" />,
                  val: "github.com/GBOHOUILI",
                },
                {
                  icon: <MapPin className="h-3.5 w-3.5" />,
                  val: "Abomey-Calavi, Bénin · Remote",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <span className="text-primary">{item.icon}</span>
                  <span>{item.val}</span>
                </div>
              ))}
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {cv.available}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_260px] gap-10">
          {/* MAIN COLUMN */}
          <div className="space-y-8">
            {/* EXPERIENCE */}
            <motion.div {...fadeUp(0.1)}>
              <SectionTitle>{cv.experience}</SectionTitle>
              <div className="space-y-6">
                {experiences.map((exp, i) => (
                  <div
                    key={i}
                    className="relative pl-4 border-l border-border hover:border-primary/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <span className="font-semibold text-sm">
                        {exp.company}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-xs text-primary font-medium mb-2">
                      {exp.role}
                    </div>
                    <ul className="space-y-1">
                      {(exp.bullets[lang] || exp.bullets.fr).map((b, j) => (
                        <li
                          key={j}
                          className="text-xs text-muted-foreground flex gap-2"
                        >
                          <span className="text-primary mt-0.5 shrink-0">
                            ›
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* PROJECTS */}
            <motion.div {...fadeUp(0.2)}>
              <SectionTitle>{cv.projects}</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-3">
                {projects.map((p, i) => (
                  <div
                    key={i}
                    className="border border-border hover:border-primary/30 transition-colors rounded-lg p-4 bg-card"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                        {p.badge}
                      </span>
                    </div>
                    <div className="font-semibold text-sm mb-1">{p.name}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {p.desc[lang as keyof typeof p.desc] || p.desc.fr}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {p.stack.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* EDUCATION */}
            <motion.div {...fadeUp(0.3)}>
              <SectionTitle>{cv.education}</SectionTitle>
              <div className="space-y-3">
                {education.map((e, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start text-sm"
                  >
                    <div>
                      <div className="font-medium text-sm">{e.school}</div>
                      <div className="text-xs text-muted-foreground">
                        {e.degree[lang as keyof typeof e.degree] || e.degree.fr}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground shrink-0 ml-4">
                      {e.year}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* SIDEBAR COLUMN */}
          <div className="space-y-7">
            {/* STACK */}
            <motion.div {...fadeUp(0.15)}>
              <SectionTitle>{cv.skills}</SectionTitle>
              {[
                {
                  label: cv.backend,
                  items: [
                    "NestJS",
                    "Node.js",
                    "Python",
                    "Laravel",
                    "REST APIs",
                    "FastAPI",
                  ],
                },
                {
                  label: cv.databases,
                  items: [
                    "PostgreSQL",
                    "MySQL",
                    "MongoDB",
                    "Redis",
                    "Supabase",
                    "Prisma ORM",
                  ],
                },
                {
                  label: cv.saas,
                  items: [
                    "Multi-tenancy",
                    "RLS",
                    "Docker",
                    "Cloudinary",
                    "Cron Jobs",
                    "Firebase",
                  ],
                },
                {
                  label: cv.automation,
                  items: [
                    "n8n",
                    "Make",
                    "Web Scraping",
                    "Puppeteer",
                    "Playwright",
                    "API integration",
                  ],
                },
                {
                  label: cv.frontend,
                  items: [
                    "React",
                    "Next.js",
                    "Nuxt.js",
                    "TypeScript",
                    "Tailwind",
                  ],
                },
              ].map((group, i) => (
                <div key={i} className="mb-4">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {group.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* LANGUAGES */}
            <motion.div {...fadeUp(0.25)}>
              <SectionTitle>{cv.languages}</SectionTitle>
              {[
                { lang: "Français", level: cv.fluent },
                { lang: "English", level: cv.technical },
                { lang: "Fon", level: cv.native },
              ].map((l, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm mb-2"
                >
                  <span className="text-sm">{l.lang}</span>
                  <span className="text-xs text-muted-foreground italic">
                    {l.level}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CERTIFICATIONS */}
            <motion.div {...fadeUp(0.35)}>
              <SectionTitle>{cv.certifications}</SectionTitle>
              {[
                "REST APIs",
                "SQL & Data Analysis",
                "Python",
                "Git & GitHub",
                "Data Science & IA — ATUT",
              ].map((c, i) => (
                <div
                  key={i}
                  className="text-xs text-muted-foreground py-1.5 border-b border-border/50 last:border-0"
                >
                  {c} <span className="text-primary/50">· OpenClassrooms</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          nav, .sticky { display: none !important; }
          body { background: white; color: black; }
          .bg-gradient-to-r { -webkit-text-fill-color: unset; color: #3b82f6; }
        }
      `}</style>
    </div>
  );
};

const CVPage = () => (
  <ThemeProvider>
    <LanguageProvider>
      <CVContent />
    </LanguageProvider>
  </ThemeProvider>
);

export default CVPage;
