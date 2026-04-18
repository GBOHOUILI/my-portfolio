import { motion } from "framer-motion";
import { Book, Zap, Target, Compass } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Book,
      title: t.about.learning,
      description: t.about.learningDesc,
    },
    {
      icon: Zap,
      title: t.about.flexibility,
      description: t.about.flexibilityDesc,
    },
    {
      icon: Target,
      title: t.about.patience,
      description: t.about.patienceDesc,
    },
    {
      icon: Compass,
      title: t.about.travel,
      description: t.about.travelDesc,
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.about.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass-strong rounded-2xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="w-[400px] h-[400px] mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden border-2 border-primary">
                  <img
                    src="me1.jpeg"
                    alt="Profil"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Eldo-Moréo GBOHOUILI
                </h3>
                <p className="text-muted-foreground">
                  Full-Stack Developer & Data Scientist
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.about.intro}
            </p>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                {t.about.values}
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass rounded-xl p-4 hover:bg-primary/5 transition-colors"
                  >
                    <value.icon className="h-8 w-8 text-primary mb-3" />
                    <h4 className="font-semibold mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
