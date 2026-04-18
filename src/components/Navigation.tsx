import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Globe, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const isCV = location.pathname.includes("/cv");

  const languages = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fon", label: "Fon", flag: "🇧🇯" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "yo", label: "Yorùbá", flag: "🇳🇬" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (isCV) return;
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "services",
        "blog",
        "contact",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCV]);

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "skills", label: t.nav.skills },
    { id: "projects", label: t.nav.projects },
    { id: "services", label: t.nav.services },
    { id: "blog", label: t.nav.blog },
    { id: "contact", label: t.nav.contact },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const currentLang = languages.find((l) => l.code === language);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg py-3" : "bg-transparent py-5"}`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="min-w-[80px] max-w-[100px]">
            <motion.img
              key={theme}
              src={theme === "dark" ? "logo.png" : "logo2.png"}
              alt="Logo"
              className="object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Desktop nav — only on index */}
          {!isCV && (
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium transition-colors hover:text-primary ${activeSection === item.id ? "text-primary" : "text-foreground/70"}`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center gap-2 relative">
            {/* CV link */}
            {!isCV ? (
              <Link to="/my-portfolio/cv">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex items-center gap-1.5 text-xs border-primary/30 hover:border-primary hover:text-primary transition-all"
                >
                  <FileText className="h-3.5 w-3.5" /> {t.nav.cv}
                </Button>
              </Link>
            ) : (
              <Link to="/my-portfolio">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  ← {t.nav.home}
                </Button>
              </Link>
            )}

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </motion.div>
            </Button>

            {/* Language selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="rounded-full font-semibold flex items-center gap-1.5 text-xs"
              >
                <Globe className="h-3.5 w-3.5" />
                <motion.span
                  key={language}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {currentLang?.flag} {currentLang?.code.toUpperCase()}
                </motion.span>
              </Button>
              <AnimatePresence>
                {languageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-36 rounded-lg glass-strong p-1.5 shadow-lg z-50 border border-border"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setLanguageMenuOpen(false);
                        }}
                        className={`flex items-center gap-2 w-full px-3 py-1.5 text-xs rounded-md hover:bg-primary/10 transition-colors ${language === lang.code ? "text-primary font-medium" : "text-foreground/70"}`}
                      >
                        <span>{lang.flag}</span> {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile toggle */}
            {!isCV && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden rounded-full"
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-40 w-full max-w-xs glass-strong md:hidden border-l border-border"
          >
            <div className="flex flex-col gap-3 p-8 mt-20">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-base font-medium transition-colors hover:text-primary ${activeSection === item.id ? "text-primary" : "text-foreground"}`}
                >
                  {item.label}
                </motion.button>
              ))}
              <Link
                to="/my-portfolio/cv"
                className="flex items-center gap-2 text-base font-medium text-primary mt-2"
              >
                <FileText className="h-4 w-4" /> {t.nav.cv}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
