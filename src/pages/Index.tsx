import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const heroImage = "https://cdn.poehali.dev/projects/3fb389fd-635e-4af7-8ba6-692e017c1dda/files/e0468f9c-ca99-4815-b494-8d5f9325336c.jpg";

const navItems = [
  { label: "О курсе", href: "#about" },
  { label: "Программа", href: "#program" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Преподаватель", href: "#teacher" },
  { label: "Контакты", href: "#contacts" },
];

const programModules = [
  {
    date: "31 мая",
    title: "Введение. Понятие опорности",
    topics: [
      "Понятие опорности, стадии формирования, виды и актуальность в работе с клиентами",
      "Этап базовой опорности",
    ],
  },
  {
    date: "7 июня",
    title: "Этика и пуповинная опорность",
    topics: [
      "Этика работы с применением телесно-ориентированных упражнений",
      "Этап пуповинной опорности",
    ],
  },
  {
    date: "14 июня",
    title: "Контейнирование и материнская опорность",
    topics: [
      "Контейнирование (саморегуляция) в развитии психологической зрелости",
      "Этап материнской опорности",
    ],
  },
  {
    date: "21 июня",
    title: "Автономия. Границы. Идентичность",
    topics: [
      "Этап автономной опорности. Границы в отношениях",
      "Этап вертикальной опоры. Половая идентификация и идентичность как опора",
    ],
  },
];

function useIntersection(ref: React.RefObject<Element>, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fefefe", color: "#2e2b27" }}>

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3 shadow-sm" : "py-5"}`}
        style={{ backgroundColor: scrolled ? "rgba(254,254,254,0.95)" : "transparent", backdropFilter: scrolled ? "blur(8px)" : "none" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-cormorant text-xl font-medium tracking-wide" style={{ color: "#5c6c53" }}>
            Крылья и Корни
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link font-golos text-sm font-medium" style={{ color: "#4a4540" }}>
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="#pricing"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-golos text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#6b7343", color: "#fefefe" }}
          >
            Записаться
          </a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 px-6 py-4 flex flex-col gap-4 shadow-md" style={{ backgroundColor: "#fefefe" }}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="font-golos text-sm" style={{ color: "#4a4540" }} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#pricing" className="inline-flex justify-center px-5 py-2.5 rounded-full font-golos text-sm font-medium" style={{ backgroundColor: "#6b7343", color: "#fefefe" }}>
              Записаться
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute top-[-80px] right-[-100px] w-[500px] h-[500px] blob-1 animate-float" style={{ backgroundColor: "#d5cfc7", opacity: 0.4 }} />
        <div className="absolute bottom-[-60px] left-[-80px] w-[360px] h-[360px] blob-2" style={{ backgroundColor: "#5c6c53", opacity: 0.12 }} />
        <div className="absolute top-[30%] left-[40%] w-[200px] h-[200px] blob-3 animate-sway" style={{ backgroundColor: "#6b7343", opacity: 0.08 }} />

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 py-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-golos font-medium mb-6 animate-fade-in-up" style={{ backgroundColor: "#d5cfc7", color: "#5c6c53" }}>
              <span>🌿</span> Телесно-ориентированная психотерапия
            </div>
            <h1 className="font-cormorant font-light leading-[1.1] mb-6 animate-fade-in-up delay-100" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "#2e2b27" }}>
              Крылья<br />
              <em style={{ color: "#6b7343" }}>и Корни</em>
            </h1>
            <p className="font-golos font-light text-lg leading-relaxed mb-4 animate-fade-in-up delay-200" style={{ color: "#4a4540", maxWidth: "480px" }}>
              Развитие психологической зрелости клиента методами ТОП
            </p>
            <p className="font-golos text-base leading-relaxed mb-10 animate-fade-in-up delay-300" style={{ color: "#6b7343", maxWidth: "480px" }}>
              32 часа курса · Малые группы · Практики ТОП
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-400">
              <a href="#pricing" className="px-8 py-3.5 rounded-full font-golos font-medium text-base transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: "#6b7343", color: "#fefefe" }}>
                Выбрать тариф
              </a>
              <a href="#program" className="px-8 py-3.5 rounded-full font-golos font-medium text-base border transition-all duration-300 hover:scale-105" style={{ borderColor: "#6b7343", color: "#6b7343", backgroundColor: "transparent" }}>
                Программа курса
              </a>
            </div>
            <div className="mt-10 flex items-center gap-3 animate-fade-in-up delay-500">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#d5cfc7" }}>
                <Icon name="Calendar" size={18} style={{ color: "#5c6c53" }} />
              </div>
              <span className="font-golos text-sm" style={{ color: "#4a4540" }}>
                Старт <strong>31 мая</strong> — 4 занятия по воскресеньям
              </span>
            </div>
          </div>

          <div className="relative animate-fade-in-up delay-300">
            <div className="absolute inset-0 blob-1" style={{ backgroundColor: "#d5cfc7", transform: "scale(1.08) translate(8px, 8px)", opacity: 0.5 }} />
            <img src={heroImage} alt="Крылья и Корни — курс психологической зрелости" className="relative w-full object-cover blob-1 shadow-xl" style={{ aspectRatio: "1/1" }} />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="font-golos text-xs" style={{ color: "#b8b0a6" }}>листайте</span>
          <Icon name="ChevronDown" size={16} style={{ color: "#b8b0a6" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: "#f5f1ec" }}>
        <div className="absolute right-[-60px] top-[10%] w-64 h-64 blob-2" style={{ backgroundColor: "#6b7343", opacity: 0.07 }} />
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="font-golos text-sm tracking-widest uppercase" style={{ color: "#6b7343" }}>О курсе</span>
              <h2 className="font-cormorant font-light mt-3" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "#2e2b27" }}>
                Что вы освоите
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "Sprout", title: "Понятие опорности", text: "Изучите стадии формирования психологической опорности, виды и актуальность в работе с клиентами любого профиля." },
              { icon: "Heart", title: "Практики ТОП", text: "Освоите конкретные методы и упражнения телесно-ориентированной психотерапии для работы с темой зрелости." },
              { icon: "Users", title: "Малые группы", text: "Отработаете навыки в формате малых групп — живая практика в безопасной профессиональной среде." },
            ].map((card, i) => (
              <AnimatedSection key={i}>
                <div className="p-8 rounded-3xl h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1" style={{ backgroundColor: "#fefefe" }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: "#d5cfc7" }}>
                    <Icon name={card.icon} size={22} style={{ color: "#5c6c53" }} />
                  </div>
                  <h3 className="font-cormorant text-2xl font-medium mb-3" style={{ color: "#2e2b27" }}>{card.title}</h3>
                  <p className="font-golos text-sm leading-relaxed" style={{ color: "#6b6058" }}>{card.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-12">
            <div className="rounded-3xl p-10 md:p-14 relative overflow-hidden" style={{ backgroundColor: "#5c6c53" }}>
              <div className="absolute top-[-40px] right-[-40px] w-48 h-48 blob-3" style={{ backgroundColor: "#6b7343", opacity: 0.3 }} />
              <div className="relative z-10 max-w-3xl">
                <p className="font-golos text-sm tracking-widest uppercase mb-4" style={{ color: "#d5cfc7", opacity: 0.8 }}>Цель программы</p>
                <p className="font-cormorant font-light leading-relaxed" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#fefefe" }}>
                  Формирование профессиональных компетенций для ведения эффективной работы в психокоррекции и консультировании — поддержка и развитие психологической зрелости клиента.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOR WHOM */}
      <section className="py-24 px-6" style={{ backgroundColor: "#fefefe" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="font-golos text-sm tracking-widest uppercase" style={{ color: "#6b7343" }}>Аудитория</span>
              <h2 className="font-cormorant font-light mt-3" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "#2e2b27" }}>
                Для кого этот курс
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "Brain", title: "Психологи и психотерапевты", text: "Специалисты, работающие в индивидуальном и групповом консультировании, желающие расширить инструментарий телесно-ориентированными методами." },
              { icon: "Heart", title: "Клинические психологи", text: "Специалисты в области психокоррекции, стремящиеся углубить работу с темой психологической зрелости и опорности клиента." },
              { icon: "Baby", title: "Перинатальные психологи", text: "Специалисты, сопровождающие клиентов в период материнства и раннего детства — темы, тесно связанные с этапами формирования опорности." },
              { icon: "GraduationCap", title: "Студенты психологических специальностей", text: "Обучающиеся на последних курсах и в магистратуре, желающие освоить практические методы ТОП." },
              { icon: "Users", title: "Ведущие групп", text: "Специалисты, проводящие терапевтические и психологические группы и желающие включить телесные практики в свою работу." },
              { icon: "Sprout", title: "Все, кто работает с личностным ростом", text: "Коучи, тренеры и консультанты, сопровождающие клиентов в процессах развития и трансформации." },
            ].map((card, i) => (
              <AnimatedSection key={i}>
                <div className="p-7 rounded-3xl h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1" style={{ backgroundColor: "#f5f1ec" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#d5cfc7" }}>
                    <Icon name={card.icon} size={18} style={{ color: "#5c6c53" }} />
                  </div>
                  <h3 className="font-cormorant text-xl font-medium mb-2" style={{ color: "#2e2b27" }}>{card.title}</h3>
                  <p className="font-golos text-sm leading-relaxed" style={{ color: "#6b6058" }}>{card.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="py-16 px-6" style={{ backgroundColor: "#f5f1ec" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="rounded-3xl overflow-hidden md:grid md:grid-cols-2" style={{ backgroundColor: "#2e2b27" }}>
              {/* Certificate */}
              <div className="p-10 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r" style={{ borderColor: "rgba(213,207,199,0.15)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(213,207,199,0.15)" }}>
                  <Icon name="Award" size={24} style={{ color: "#d5cfc7" }} />
                </div>
                <h3 className="font-cormorant text-2xl font-medium mb-3" style={{ color: "#fefefe" }}>
                  Удостоверение о повышении квалификации
                </h3>
                <p className="font-golos text-sm leading-relaxed mb-4" style={{ color: "#b8b0a6" }}>
                  По окончании курса выдаётся удостоверение установленного образца. Данные вносятся в Федеральный реестр документов об образовании (ФРДО).
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Icon name="CheckCircle" size={15} style={{ color: "#6b7343" }} />
                  <span className="font-golos text-xs" style={{ color: "#6b7343" }}>Данные вносятся в ФРДО</span>
                </div>
              </div>
              {/* License */}
              <div className="p-10 md:p-12 flex flex-col justify-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(213,207,199,0.15)" }}>
                  <Icon name="ShieldCheck" size={24} style={{ color: "#d5cfc7" }} />
                </div>
                <h3 className="font-cormorant text-2xl font-medium mb-3" style={{ color: "#fefefe" }}>
                  Лицензированный образовательный центр
                </h3>
                <p className="font-golos text-sm leading-relaxed mb-5" style={{ color: "#b8b0a6" }}>
                  Центр имеет лицензию на ведение образовательной деятельности, выданную Департаментом образования и науки г. Москвы.
                </p>
                <div className="rounded-2xl px-4 py-3" style={{ backgroundColor: "rgba(213,207,199,0.08)" }}>
                  <p className="font-golos text-xs mb-1" style={{ color: "#6b7343" }}>Лицензия</p>
                  <p className="font-golos text-xs font-medium" style={{ color: "#d5cfc7" }}>№ Л035-01298-77/00181037</p>
                  <p className="font-golos text-xs mt-1" style={{ color: "#6b6058" }}>Выдана 24.11.2020 г.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PROGRAM */}
      <section id="program" className="py-24 px-6" style={{ backgroundColor: "#fefefe" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="font-golos text-sm tracking-widest uppercase" style={{ color: "#6b7343" }}>Расписание</span>
              <h2 className="font-cormorant font-light mt-3" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "#2e2b27" }}>Программа курса</h2>
              <p className="font-golos text-sm mt-2" style={{ color: "#6b6058" }}>4 занятия · каждое воскресенье · июнь 2025</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {programModules.map((mod, i) => (
              <AnimatedSection key={i}>
                <div className="rounded-3xl p-8 h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1" style={{ backgroundColor: "#f5f1ec" }}>
                  <div className="flex items-start justify-between mb-5">
                    <span className="font-cormorant text-5xl font-light leading-none" style={{ color: "#d5cfc7" }}>{mod.date}</span>
                    <span className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-golos text-sm font-medium" style={{ backgroundColor: "#6b7343", color: "#fefefe" }}>
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-cormorant text-2xl font-medium mb-4" style={{ color: "#2e2b27" }}>{mod.title}</h3>
                  <ul className="space-y-2">
                    {mod.topics.map((topic, j) => (
                      <li key={j} className="flex items-start gap-2 font-golos text-sm" style={{ color: "#4a4540" }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#6b7343" }} />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: "#f5f1ec" }}>
        <div className="absolute left-[-80px] bottom-[10%] w-72 h-72 blob-1 animate-float" style={{ backgroundColor: "#d5cfc7", opacity: 0.5 }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="font-golos text-sm tracking-widest uppercase" style={{ color: "#6b7343" }}>Стоимость</span>
              <h2 className="font-cormorant font-light mt-3" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "#2e2b27" }}>Тарифы</h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <AnimatedSection>
              <div className="relative rounded-3xl p-8 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2" style={{ backgroundColor: "#fefefe", borderColor: "#d5cfc7" }}>
                <div className="mb-6">
                  <h3 className="font-cormorant text-2xl font-medium mb-1" style={{ color: "#2e2b27" }}>Без малой группы</h3>
                  <p className="font-golos text-sm" style={{ color: "#6b6058" }}>Базовая программа</p>
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                  {["32 часа курса с практиками", "Все лекционные материалы", "Доступ к записям занятий"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 font-golos text-sm" style={{ color: "#4a4540" }}>
                      <Icon name="Check" size={16} style={{ color: "#6b7343" }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 mb-6">
                  <Icon name="CreditCard" size={14} style={{ color: "#6b7343" }} />
                  <span className="font-golos text-xs" style={{ color: "#6b6058" }}>Доступна оплата частями</span>
                </div>
                <div className="mb-6">
                  <span className="font-cormorant font-light" style={{ fontSize: "2.8rem", color: "#2e2b27" }}>29 000 ₽</span>
                </div>
                <button className="w-full py-3.5 rounded-full font-golos font-medium text-sm border-2 transition-all duration-300 hover:scale-105" style={{ borderColor: "#6b7343", color: "#6b7343", backgroundColor: "transparent" }}>
                  Выбрать тариф
                </button>
              </div>
            </AnimatedSection>

            <AnimatedSection className="delay-100">
              <div className="relative rounded-3xl p-8 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{ backgroundColor: "#5c6c53" }}>
                <div className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-golos font-medium" style={{ backgroundColor: "#6b7343", color: "#fefefe" }}>
                  Рекомендуем
                </div>
                <div className="mb-6">
                  <h3 className="font-cormorant text-2xl font-medium mb-1" style={{ color: "#fefefe" }}>Полный курс</h3>
                  <p className="font-golos text-sm" style={{ color: "#d5cfc7", opacity: 0.85 }}>Максимальный результат</p>
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                  {["32 часа курса с практиками", "16 часов малых групп", "Отработка упражнений", "Полный доступ к материалам"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 font-golos text-sm" style={{ color: "#fefefe" }}>
                      <Icon name="Check" size={16} style={{ color: "#d5cfc7" }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 mb-6">
                  <Icon name="CreditCard" size={14} style={{ color: "#d5cfc7" }} />
                  <span className="font-golos text-xs" style={{ color: "#d5cfc7" }}>Доступна оплата частями</span>
                </div>
                <div className="mb-6">
                  <span className="font-cormorant font-light" style={{ fontSize: "2.8rem", color: "#fefefe" }}>39 000 ₽</span>
                </div>
                <button className="w-full py-3.5 rounded-full font-golos font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: "#fefefe", color: "#5c6c53" }}>
                  Выбрать тариф
                </button>
              </div>
            </AnimatedSection>
          </div>

          {/* Бронирование */}
          <AnimatedSection className="delay-150">
            <div className="mt-10 max-w-3xl mx-auto">
              <div className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6" style={{ backgroundColor: "#2e2b27" }}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="MapPin" size={16} style={{ color: "#d5cfc7" }} />
                    <span className="font-golos text-xs tracking-widest uppercase" style={{ color: "#d5cfc7", opacity: 0.7 }}>Бронирование места</span>
                  </div>
                  <h4 className="font-cormorant text-2xl font-medium mb-1" style={{ color: "#fefefe" }}>Забронировать место</h4>
                  <p className="font-golos text-sm" style={{ color: "#b8b0a6" }}>
                    Сумма бронирования не возвращается и засчитывается в стоимость курса
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
                  <span className="font-cormorant font-light" style={{ fontSize: "2.4rem", color: "#fefefe" }}>3 000 ₽</span>
                  <button className="px-8 py-3 rounded-full font-golos font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap" style={{ backgroundColor: "#6b7343", color: "#fefefe" }}>
                    Забронировать
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* TEACHER */}
      <section id="teacher" className="py-24 px-6" style={{ backgroundColor: "#fefefe" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="font-golos text-sm tracking-widest uppercase" style={{ color: "#6b7343" }}>Ведущая курса</span>
              <h2 className="font-cormorant font-light mt-3" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "#2e2b27" }}>Преподаватель</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-3xl overflow-hidden md:grid md:grid-cols-2" style={{ backgroundColor: "#f5f1ec" }}>
              <div className="relative flex items-end justify-center overflow-hidden" style={{ backgroundColor: "#f5f1ec", minHeight: "480px" }}>
                <img
                  src="https://cdn.poehali.dev/projects/3fb389fd-635e-4af7-8ba6-692e017c1dda/bucket/bd44cf9b-f836-4dcd-95ab-877d115e8ab9.jpg"
                  alt="Пекарская Светлана"
                  className="w-full object-contain object-bottom relative z-10"
                  style={{ maxHeight: "540px", display: "block" }}
                />
                {/* Fade sides */}
                <div className="absolute inset-y-0 left-0 w-12 z-20" style={{ background: "linear-gradient(to right, #f5f1ec, transparent)" }} />
                <div className="absolute inset-y-0 right-0 w-12 z-20" style={{ background: "linear-gradient(to left, #f5f1ec, transparent)" }} />
                {/* Fade bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 z-20" style={{ background: "linear-gradient(to top, #f5f1ec, transparent)" }} />
                {/* Fade top */}
                <div className="absolute top-0 left-0 right-0 h-24 z-20" style={{ background: "linear-gradient(to bottom, #f5f1ec, transparent)" }} />
              </div>
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <h3 className="font-cormorant text-3xl font-medium mb-1" style={{ color: "#2e2b27" }}>Пекарская Светлана</h3>
                <p className="font-golos text-sm font-medium mb-6" style={{ color: "#6b7343" }}>К.п.н., клинический и перинатальный психолог</p>
                <p className="font-golos text-sm leading-relaxed mb-8" style={{ color: "#4a4540" }}>
                  Преподаватель ВШЭ и МИП, сертифицированный супервизор РПА, руководитель команды психологов PsyTeam. Специализируется на развитии психологической зрелости и работе с темой опорности через методы телесно-ориентированной психотерапии.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "GraduationCap", text: "К.п.н., ВШЭ и МИП" },
                    { icon: "Shield", text: "Супервизор РПА" },
                    { icon: "Heart", text: "Перинатальный психолог" },
                    { icon: "Users", text: "Руководитель PsyTeam" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Icon name={item.icon} size={16} style={{ color: "#6b7343" }} />
                      <span className="font-golos text-xs" style={{ color: "#4a4540" }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: "#5c6c53" }}>
        <div className="absolute top-[-60px] right-[-60px] w-80 h-80 blob-1 animate-float" style={{ backgroundColor: "#6b7343", opacity: 0.3 }} />
        <div className="absolute bottom-[-40px] left-[20%] w-48 h-48 blob-3" style={{ backgroundColor: "#d5cfc7", opacity: 0.1 }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <span className="font-golos text-sm tracking-widest uppercase" style={{ color: "#d5cfc7", opacity: 0.8 }}>Связаться</span>
            <h2 className="font-cormorant font-light mt-3 mb-6" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "#fefefe" }}>
              Есть вопросы?
            </h2>
            <p className="font-golos text-base leading-relaxed mb-12" style={{ color: "#d5cfc7", opacity: 0.9 }}>
              Напишите нам — ответим на все вопросы о курсе, поможем выбрать подходящий тариф и расскажем подробнее о программе.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="https://t.me/" className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-golos font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: "#fefefe", color: "#5c6c53" }}>
                <Icon name="MessageCircle" size={18} />
                Написать в Telegram
              </a>
              <a href="mailto:" className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-golos font-medium text-sm border-2 transition-all duration-300 hover:scale-105" style={{ borderColor: "#d5cfc7", color: "#fefefe", backgroundColor: "transparent" }}>
                <Icon name="Mail" size={18} />
                Написать на email
              </a>
            </div>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full" style={{ backgroundColor: "rgba(213,207,199,0.15)" }}>
              <Icon name="Calendar" size={16} style={{ color: "#d5cfc7" }} />
              <span className="font-golos text-sm" style={{ color: "#d5cfc7" }}>
                Старт курса — <strong style={{ color: "#fefefe" }}>31 мая 2025</strong>
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center" style={{ backgroundColor: "#2e2b27" }}>
        <p className="font-golos text-xs" style={{ color: "#6b6058" }}>
          © 2025 Крылья и Корни — курс психологической зрелости
        </p>
      </footer>
    </div>
  );
}