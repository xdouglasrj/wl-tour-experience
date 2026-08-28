import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Menu,
  X,
} from "lucide-react";
import "./App.css";

const mediaFiles = {
  christ: new URL("../img/2.jpeg", import.meta.url).href,
  local: new URL("../img/1.jpeg", import.meta.url).href,
  records: new URL("../img/8.jpeg", import.meta.url).href,
  pilots: new URL("../img/video 6.mp4", import.meta.url).href,
  aerial: new URL("../img/video 2.mp4", import.meta.url).href,
  rideToTop: new URL("../img/video 7.mp4", import.meta.url).href,
  routeAerial: new URL("../img/video 9.mp4", import.meta.url).href,
  trailVideo10: new URL("../img/video 10.mp4", import.meta.url).href,
  trailVideo12: new URL("../img/video 12.mp4", import.meta.url).href,
  trailVideo11: new URL("../img/video 11.mp4", import.meta.url).href,
  trailPhoto12: new URL("../img/12.jpeg", import.meta.url).href,
  trailPhoto13: new URL("../img/13.jpeg", import.meta.url).href,
  trailPhoto14: new URL("../img/14.jpeg", import.meta.url).href,
};

const C = {
  whatsapp:
    "https://wa.me/5521995550707?text=Ol%C3%A1!%20Quero%20conhecer%20a%20WL%20Tour%20Experience%20e%20saber%20mais%20sobre%20os%20passeios.",
  instagram: "https://www.instagram.com/wl.rocinha95/",
  phone: "tel:+5521995550707",
};
const revealDelays = ["60ms", "80ms", "90ms", "120ms", "180ms", "270ms"];
const images = {
  christ: mediaFiles.christ,
  rocinha:
    "https://images.pexels.com/photos/30343298/pexels-photo-30343298.jpeg?auto=compress&cs=tinysrgb&w=1000",
  art: "https://images.pexels.com/photos/36845390/pexels-photo-36845390.jpeg?auto=compress&cs=tinysrgb&w=1000",
  moto: "https://images.unsplash.com/photo-1701204290431-63468bf3351c?auto=format&fit=crop&w=1000&q=82",
  city: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1000&q=82",
};

const benefitMedia = [
  { type: "video", src: mediaFiles.pilots },
  { type: "image", src: mediaFiles.local },
  { type: "image", src: mediaFiles.records },
  { type: "video", src: mediaFiles.aerial },
];

const routeMedia = {
  0: { type: "video", src: mediaFiles.rideToTop },
  4: { type: "video", src: mediaFiles.routeAerial },
};

const trailGallery = {
  type: "gallery",
  items: [
    { type: "video", src: mediaFiles.trailVideo10 },
    { type: "video", src: mediaFiles.trailVideo12 },
    { type: "video", src: mediaFiles.trailVideo11 },
    { type: "image", src: mediaFiles.trailPhoto12 },
    { type: "image", src: mediaFiles.trailPhoto13 },
    { type: "image", src: mediaFiles.trailPhoto14 },
  ],
};
const copy = {
  pt: {
    nav: ["Início", "Experiência", "Roteiro", "Outros passeios", "Instagram"],
    lang: "PT",
    heroKicker: "RIO DE JANEIRO · ROCINHA",
    heroTitle: "Mais que um tour.\nUma experiência no coração do Rio.",
    heroBody:
      "Conheça a Rocinha por uma perspectiva diferente. Viva uma experiência guiada com moto, cultura local, histórias, vistas incríveis do Rio e registros para guardar essa viagem para sempre.",
    primary: "Quero viver essa experiência",
    call: "Ligar agora",
    explore: "Explorar o roteiro",
    manifest: "Conheça o Rio por dentro.\nViva a cidade de perto.",
    intro:
      "A WL Tour Experience cria passeios turísticos para quem quer ir além do óbvio. Somos uma empresa de experiências no Rio de Janeiro, com destaque para a Rocinha, São Conrado e a Zona Sul. Os passeios reúnem aventura, cultura local e paisagens que ficam na memória.",
    benefitTitle: "Uma perspectiva que só quem vive aqui pode compartilhar.",
    storyKicker: "NÃO É SÓ UM PASSEIO",
    storyTitle: "É uma história\npara contar.",
    storyBody:
      "O passeio reúne aventura, histórias da Rocinha, cultura local e diferentes vistas do Rio. Ao longo do caminho, você também faz registros para guardar a lembrança da experiência.",
    routeKicker: "O ROTEIRO",
    routeTitle: "O Rio visto\nde dentro.",
    routeBody:
      "Um passeio guiado para conhecer a Rocinha, ouvir histórias locais e ver o Rio de outros pontos.",
    otherKicker: "OUTRAS EXPERIÊNCIAS",
    otherTitle: "Sua experiência no Rio\npode continuar.",
    why: "Por que fazer o tour com a WL?",
    gallery: "Fotos dos nossos passeios pelo Rio.",
    testimonials: "Relatos de quem fez o passeio.",
    soon: "Depoimentos em breve",
    soonBody:
      "Estamos preparando este espaço para reunir histórias reais de quem viveu a experiência com a WL Tour.",
    follow: "Siga a WL Tour",
    followBody:
      "Quer ver mais experiências, bastidores e registros dos nossos passeios?",
    final: "Pronto para viver\nessa experiência?",
    finalBody: "Fale com a WL Tour para consultar datas e disponibilidade.",
  },
  en: {
    nav: ["Home", "Experience", "Itinerary", "More tours", "Instagram"],
    lang: "EN",
    heroKicker: "RIO DE JANEIRO · ROCINHA",
    heroTitle: "More than a tour.\nAn experience in the heart of Rio.",
    heroBody:
      "Discover Rocinha from a different perspective. Enjoy a guided motorcycle experience with local culture, stories, incredible views and memories to take home.",
    primary: "I want this experience",
    call: "Call now",
    explore: "Explore the itinerary",
    manifest: "See Rio from the inside.\nExperience the city up close.",
    intro:
      "WL Tour Experience offers tours for people who want to go beyond the usual sights. We focus on Rocinha, São Conrado and Rio's South Zone. Each tour brings together adventure, local culture and memorable views.",
    benefitTitle: "A perspective only someone who lives here can share.",
    storyKicker: "NOT JUST A TOUR",
    storyTitle: "A story\nto tell.",
    storyBody:
      "The tour brings together adventure, stories from Rocinha, local culture and different views of Rio. Along the way, you can also capture memories of the experience.",
    routeKicker: "THE ITINERARY",
    routeTitle: "Rio from\nthe inside.",
    routeBody:
      "A guided tour to explore Rocinha, hear local stories and see Rio from different viewpoints.",
    otherKicker: "MORE EXPERIENCES",
    otherTitle: "Your Rio experience\ncan continue.",
    why: "Why tour with WL?",
    gallery: "Photos from our tours around Rio.",
    testimonials: "Stories from people who took the tour.",
    soon: "Testimonials coming soon",
    soonBody:
      "We are preparing this space to gather real stories from people who experienced WL Tour.",
    follow: "Follow WL Tour",
    followBody:
      "Want to see more experiences, behind the scenes and tour records?",
    final: "Ready to live\nthis experience?",
    finalBody: "Contact WL Tour to check dates and availability.",
  },
  es: {
    nav: ["Inicio", "Experiencia", "Itinerario", "Más paseos", "Instagram"],
    lang: "ES",
    heroKicker: "RÍO DE JANEIRO · ROCINHA",
    heroTitle: "Más que un tour.\nUna experiencia en el corazón de Río.",
    heroBody:
      "Conoce Rocinha desde otra perspectiva. Vive una experiencia guiada en moto con cultura local, historias, vistas increíbles y recuerdos para llevar contigo.",
    primary: "Quiero vivir esta experiencia",
    call: "Llamar ahora",
    explore: "Explorar el itinerario",
    manifest: "Conoce Río desde dentro.\nVive la ciudad de cerca.",
    intro:
      "WL Tour Experience ofrece recorridos para quienes quieren conocer algo más que los lugares habituales. Nos enfocamos en Rocinha, São Conrado y la Zona Sur de Río. Cada recorrido reúne aventura, cultura local y paisajes memorables.",
    benefitTitle: "Una perspectiva que solo quien vive aquí puede compartir.",
    storyKicker: "NO ES SOLO UN PASEO",
    storyTitle: "Una historia\npara contar.",
    storyBody:
      "El recorrido reúne aventura, historias de Rocinha, cultura local y diferentes vistas de Río. Durante el camino, también puedes guardar recuerdos de la experiencia.",
    routeKicker: "EL ITINERARIO",
    routeTitle: "Río visto\ndesde dentro.",
    routeBody:
      "Un recorrido guiado para conocer Rocinha, escuchar historias locales y ver Río desde distintos puntos.",
    otherKicker: "MÁS EXPERIENCIAS",
    otherTitle: "Tu experiencia en Río\npuede continuar.",
    why: "¿Por qué hacer el tour con WL?",
    gallery: "Fotos de nuestros recorridos por Río.",
    testimonials: "Historias de quienes hicieron el recorrido.",
    soon: "Testimonios próximamente",
    soonBody:
      "Estamos preparando este espacio para reunir historias reales de quienes vivieron la experiencia con WL Tour.",
    follow: "Sigue a WL Tour",
    followBody:
      "¿Quieres ver más experiencias, bastidores y registros de nuestros paseos?",
    final: "¿Listo para vivir\nesta experiencia?",
    finalBody: "Habla con WL Tour para consultar fechas y disponibilidad.",
  },
};
const route = [
  "Subida até o topo",
  "Vista panorâmica",
  "Capoeira",
  "Laje com vista",
  "Registro aéreo",
  "Graffiti",
  "Futebol",
  "Curva do S",
  "Rua popular",
  "Outras experiências",
];
const routeEn = [
  "Ride to the top",
  "Panoramic view",
  "Capoeira",
  "Rooftop view",
  "Aerial record",
  "Street art",
  "Football",
  "Curva do S",
  "Popular street",
  "More experiences",
];
const routeEs = [
  "Subida hasta la cima",
  "Vista panorámica",
  "Capoeira",
  "Vista desde la terraza",
  "Registro aéreo",
  "Graffiti",
  "Fútbol",
  "Curva do S",
  "Calle popular",
  "Más experiencias",
];
const routeBody = [
  "A aventura começa com o deslocamento de moto táxi até o topo da Rocinha.",
  "Parada para contemplar e fotografar referências como o Cristo Redentor, Lagoa, Pão de Açúcar, Ipanema e São Conrado.",
  "Uma importante manifestação cultural brasileira, apresentada por quem mantém essa arte viva.",
  "Um momento para fotos, contemplação e histórias sobre a Rocinha e São Conrado.",
  "Você vive o momento. A gente registra para você lembrar dele. Quando possível.",
  "Visita a um estúdio de graffiti de um morador e artista local.",
  "Passagem pela quadra conhecida da região, com possibilidade de participar quando disponível.",
  "Conheça a Curva do S e ouça histórias e curiosidades sobre a região.",
  "Uma das ruas mais movimentadas e ligadas à vida cultural e aos eventos locais.",
  "Ao final, conheça outras experiências disponíveis pela WL Tour.",
];
const experiences = [
  "Trilha ao amanhecer",
  "Baile funk",
  "Jet ski",
  "Helicóptero",
  "Lancha",
];
const benefits = [
  ["Pilotos experientes", "Experiência acompanhada por quem conhece a região."],
  [
    "Experiência local",
    "Histórias, cultura e lugares através de uma perspectiva local.",
  ],
  [
    "Registros profissionais",
    "Transforme momentos da viagem em lembranças para guardar.",
  ],
  [
    "Vídeo / registro aéreo",
    "Quando possível, registre a experiência também de uma perspectiva aérea.",
  ],
];
const gallery = [
  [
    images.rocinha,
    "Passeio turístico com vista panorâmica da Rocinha e Rio de Janeiro",
  ],
  [images.art, "Graffiti e cultura urbana na Rocinha"],
  [images.christ, "Vista do Rio de Janeiro com o Cristo Redentor"],
  [images.moto, "Experiência turística de moto no Rio de Janeiro"],
  [images.city, "Montanhas e paisagem urbana do Rio de Janeiro"],
];
const localized = {
pt: {
      reserve: "Reservar",
      benefitHead: ["Uma experiência", "com propósito."],
      quote: "“A aventura começa onde o mapa termina.”",
      why: [
        "Experiência local",
        "Cultura",
        "Atendimento personalizado",
        "Roteiro",
        "Registros",
        "Aventura",
      ],
      other: [
        "Veja o Rio despertar em um cenário inesquecível.",
        "Uma experiência noturna ligada à cultura urbana carioca.",
        "Adrenalina, água e paisagens do Rio.",
        "Uma nova perspectiva para contemplar a cidade.",
        "Navegue pelo Rio e aproveite uma experiência especial.",
      ],
      footerLead: ["Mais que um tour.", "Uma experiência."],
      footerNote:
        "Passeios sujeitos a disponibilidade, condições climáticas, operacionais e regras aplicáveis.",
      footerCredit: "Desenvolvido e administrado por xDouglas",
      aria: "Fale com a WL Tour pelo WhatsApp",
      ariaInstagram: "Siga a WL Tour no Instagram",
      scan: "APONTE A CÂMERA PARA ABRIR O INSTAGRAM",
      labels: {
        experience: "EXPERIÊNCIA",
        gallery: "GALERIA",
        testimonials: "DEPOIMENTOS",
        contact: "CONTATO",
        instagram: "SIGA NO INSTAGRAM",
        motto: "CAMINHO · CULTURA · MEMÓRIA",
      },
      benefits,
    },
en: {
      reserve: "Book",
      benefitHead: ["An experience", "with purpose."],
      quote: "“Adventure begins where the map ends.”",
      why: [
        "Local experience",
        "Culture",
        "Personal service",
        "Itinerary",
        "Records",
        "Adventure",
      ],
      other: [
        "Watch Rio wake up in an unforgettable setting.",
        "A night experience connected to Rio's urban culture.",
        "Adrenaline, water and Rio landscapes.",
        "A new perspective to take in the city.",
        "Sail through Rio and enjoy a special experience.",
      ],
      footerLead: ["More than a tour.", "An experience."],
      footerNote:
        "Tours subject to availability, weather, operational conditions and applicable rules.",
      footerCredit: "Desenvolvido e administrado por xDouglas",
      aria: "Talk to WL Tour on WhatsApp",
      ariaInstagram: "Follow WL Tour on Instagram",
      scan: "SCAN THE QR CODE TO OPEN INSTAGRAM",
      labels: {
        experience: "EXPERIENCE",
        gallery: "GALLERY",
        testimonials: "TESTIMONIALS",
        contact: "CONTACT",
        instagram: "FOLLOW ON INSTAGRAM",
        motto: "ROAD · CULTURE · MEMORY",
      },
      benefits: [
        ["Experienced riders", "An experience guided by people who know the area."],
        [
          "Local experience",
          "Stories, culture and places through a local perspective.",
        ],
        ["Professional records", "Turn travel moments into memories to keep."],
        [
          "Video / aerial record",
          "When possible, record the experience from above.",
        ],
      ],
    },
  es: {
    reserve: "Reservar",
    benefitHead: ["Una experiencia", "con propósito."],
    quote: "“La aventura comienza donde termina el mapa.”",
    why: [
      "Experiencia local",
      "Cultura",
      "Atención personalizada",
      "Itinerario",
      "Registros",
      "Aventura",
    ],
    other: [
      "Mira despertar a Río en un escenario inolvidable.",
      "Una experiencia nocturna ligada a la cultura urbana carioca.",
      "Adrenalina, agua y paisajes de Río.",
      "Una nueva perspectiva para contemplar la ciudad.",
      "Navega por Río y disfruta de una experiencia especial.",
    ],
    footerLead: ["Más que un tour.", "Una experiencia."],
    footerNote:
      "Paseos sujetos a disponibilidad, condiciones climáticas, operativas y reglas aplicables.",
    footerCredit: "Desenvolvido e administrado por xDouglas",
    aria: "Habla con WL Tour por WhatsApp",
    ariaInstagram: "Sigue a WL Tour en Instagram",
    scan: "ESCANEA EL CÓDIGO QR PARA ABRIR INSTAGRAM",
    labels: {
      experience: "EXPERIENCIA",
      gallery: "GALERÍA",
      testimonials: "TESTIMONIOS",
      contact: "CONTACTO",
      instagram: "SIGUE EN INSTAGRAM",
      motto: "CAMINO · CULTURA · MEMORIA",
    },
    benefits: [
      [
        "Pilotos expertos",
        "Una experiencia guiada por quienes conocen la región.",
      ],
      [
        "Experiencia local",
        "Historias, cultura y lugares desde una perspectiva local.",
      ],
      [
        "Registros profesionales",
        "Convierte momentos del viaje en recuerdos para guardar.",
      ],
      [
        "Vídeo / registro aéreo",
        "Cuando sea posible, registra la experiencia desde el aire.",
      ],
    ],
  },
};
function track(event, label) {
  window.gtag?.("event", event, {
    event_category: "engagement",
    event_label: label,
  });
}
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.82c2.16 0 4.19.84 5.72 2.37a8.03 8.03 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.09 8.09a8.1 8.1 0 0 1-4.12-1.13l-.3-.18-3.06.8.82-2.99-.19-.31a8.03 8.03 0 0 1-1.24-4.28c0-4.46 3.63-8.09 8.09-8.09zM8.6 6.94c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.19-.46-.39-.4-.54-.41h-.46z" />
    </svg>
  );
}
function LinkCTA({ children, href, type = "primary", testid, onClick }) {
  return (
    <a
      data-testid={testid}
      className={`cta cta-${type}`}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      onClick={onClick}
    >
      {children}
      <ArrowUpRight size={17} strokeWidth={2.5} />
    </a>
  );
}

function MediaPopup({ media, onClose }) {
  const [closeVisible, setCloseVisible] = useState(true);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [autoGallery, setAutoGallery] = useState(true);
  const hideCloseTimer = useRef(null);
  const autoAdvanceLocked = useRef(false);
  const isGallery = media?.type === "gallery";
  const currentMedia = isGallery ? media.items[galleryIndex] : media;
  const currentIsVideo = currentMedia?.type === "video";
  const lastGalleryIndex = isGallery ? media.items.length - 1 : 0;

  const showCloseTemporarily = () => {
    if (!currentIsVideo) return;
    window.clearTimeout(hideCloseTimer.current);
    setCloseVisible(true);
    hideCloseTimer.current = window.setTimeout(() => setCloseVisible(false), 2000);
  };

  useEffect(() => {
    if (!media) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setGalleryIndex(0);
    setAutoGallery(true);
    setCloseVisible(true);

    return () => {
      window.clearTimeout(hideCloseTimer.current);
      document.body.style.overflow = previousOverflow;
    };
  }, [media]);

  useEffect(() => {
    if (!media) return undefined;
    autoAdvanceLocked.current = false;
    window.clearTimeout(hideCloseTimer.current);
    setCloseVisible(true);
    if (currentIsVideo) {
      hideCloseTimer.current = window.setTimeout(() => setCloseVisible(false), 2000);
    }
    return () => window.clearTimeout(hideCloseTimer.current);
  }, [media, galleryIndex, currentIsVideo]);

  useEffect(() => {
    if (!isGallery || !autoGallery || currentIsVideo || galleryIndex >= lastGalleryIndex) {
      return undefined;
    }
    const photoTimer = window.setTimeout(() => setGalleryIndex((index) => index + 1), 10000);
    return () => window.clearTimeout(photoTimer);
  }, [autoGallery, currentIsVideo, galleryIndex, isGallery, lastGalleryIndex]);

  if (!media) return null;

  const useGalleryArrow = (direction) => {
    setAutoGallery(false);
    setGalleryIndex((index) => Math.min(lastGalleryIndex, Math.max(0, index + direction)));
  };

  const handleVideoTime = (event) => {
    if (!isGallery || !autoGallery || galleryIndex >= lastGalleryIndex) return;
    const video = event.currentTarget;
    if (
      !autoAdvanceLocked.current &&
      Number.isFinite(video.duration) &&
      video.duration - video.currentTime <= 1
    ) {
      autoAdvanceLocked.current = true;
      setGalleryIndex((index) => Math.min(lastGalleryIndex, index + 1));
    }
  };

  return (
    <div
      className="media-popup"
      role="dialog"
      aria-modal="true"
      aria-label={`Visualização de ${media.title}`}
      data-testid="media-popup"
    >
      <div
        className="media-popup-frame"
        onPointerDownCapture={currentIsVideo ? showCloseTemporarily : undefined}
      >
        <button
          className={`media-popup-close ${!currentIsVideo || closeVisible ? "is-visible" : ""}`}
          type="button"
          aria-label="Fechar mídia"
          onClick={onClose}
          tabIndex={!currentIsVideo || closeVisible ? 0 : -1}
          data-testid="media-popup-close"
        >
          <X size={18} strokeWidth={1.8} aria-hidden="true" />
        </button>
        {currentIsVideo ? (
          <video
            key={currentMedia.src}
            className="media-popup-content"
            src={currentMedia.src}
            autoPlay
            muted
            playsInline
            controls
            onTimeUpdate={handleVideoTime}
          />
        ) : (
          <img
            key={currentMedia.src}
            className="media-popup-content"
            src={currentMedia.src}
            alt={media.title}
          />
        )}
        {isGallery && (
          <>
            <button
              className="media-gallery-arrow media-gallery-previous"
              type="button"
              aria-label="Mídia anterior"
              disabled={galleryIndex === 0}
              onClick={() => useGalleryArrow(-1)}
              data-testid="media-gallery-previous"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              className="media-gallery-arrow media-gallery-next"
              type="button"
              aria-label="Próxima mídia"
              disabled={galleryIndex === lastGalleryIndex}
              onClick={() => useGalleryArrow(1)}
              data-testid="media-gallery-next"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState("pt");
  const [menu, setMenu] = useState(false);
  const [activeMedia, setActiveMedia] = useState(null);
  const mediaTriggerRef = useRef(null);
  const t = copy[language];
  const l = localized[language];
  const routeLabels =
    language === "en" ? routeEn : language === "es" ? routeEs : route;
  const whatsapp = (label) => {
    track("whatsapp_click", label);
  };
  const openMedia = (media, title, trigger) => {
    mediaTriggerRef.current = trigger;
    setActiveMedia({ ...media, title });
  };
  const closeMedia = () => {
    setActiveMedia(null);
    requestAnimationFrame(() => mediaTriggerRef.current?.focus());
  };
  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : language;
    document.title =
      language === "pt"
        ? "WL Tour Experience | Passeio na Rocinha e Experiências no Rio de Janeiro"
        : language === "en"
          ? "WL Tour Experience | Rocinha Tours & Rio Experiences"
          : "WL Tour Experience | Paseos en Rocinha y experiencias en Río";
  }, [language]);
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "WL Tour Experience",
      url: window.location.origin,
      sameAs: [C.instagram],
      telephone: "+5521995550707",
      description:
        "Empresa de turismo e experiências guiadas na Rocinha e no Rio de Janeiro.",
    };
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);
    return () => el.remove();
  }, []);
  useEffect(() => {
    const blocks = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, [language]);
  const navIds = ["top", "experience", "route", "other", "instagram"];
  return (
    <div className="site-shell" data-testid="wl-tour-landing-page">
      <header className="header">
        <a className="brand" href="#top" data-testid="brand-home">
          <span className="brand-mark">WL</span>
          <span>
            TOUR
            <br />
            <b>EXPERIENCE</b>
          </span>
        </a>
        <nav className={menu ? "nav nav-open" : "nav"}>
          {t.nav.map((item, i) => (
            <a
              key={item}
              href={`#${navIds[i]}`}
              data-testid={`nav-${navIds[i]}`}
              onClick={() => setMenu(false)}
            >
              {item}
            </a>
          ))}
          <LinkCTA
            href={C.whatsapp}
            type="small"
            testid="header-reserve-button"
            onClick={() => whatsapp("header")}
          >
            {l.reserve}
          </LinkCTA>
        </nav>
        <div className="header-actions">
          <div className="languages" data-testid="language-switcher">
            {["pt", "en", "es"].map((l) => (
              <button
                key={l}
                className={language === l ? "active" : ""}
                onClick={() => setLanguage(l)}
                data-testid={`language-${l}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            className="menu-button"
            onClick={() => setMenu(!menu)}
            aria-label="Abrir menu"
            data-testid="mobile-menu-button"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        {/* Efeito cortina (E6): a fotografia da seção principal
            fica presa no topo e continua visível enquanto os textos rolam por
            cima dela. Quando este bloco termina, a fotografia do Cristo na
            seção "É uma história para contar" empurra a primeira para fora e o
            resto da página rola normalmente. */}
        <div className="curtain">
        <div className="curtain-photo">
          <div className="hero-image">
            <div className="hero-photo" />
          </div>
          <div className="hero-grid" />
        </div>
        <section className="hero" id="top" data-testid="hero-section">
          <div className="hero-content">
            <p className="eyebrow reveal">
              {t.heroKicker}
            </p>
            <h1 className="hero-title reveal delay-1">
              {t.heroTitle.split("\n").map((line, i) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="hero-copy reveal delay-2">{t.heroBody}</p>
            <div className="hero-actions reveal delay-3">
              <LinkCTA
                href={C.whatsapp}
                testid="hero-whatsapp-button"
                onClick={() => whatsapp("hero")}
              >
                {t.primary}
              </LinkCTA>
            </div>
          </div>
          <a
            className="scroll-cue"
            href="#experience"
            data-testid="hero-scroll-link"
          >
            <span>↓</span>
            {t.explore}
          </a>
        </section>
        <section
          className="manifest section-pad"
          id="experience"
          data-testid="positioning-section"
        >
          <div className="section-label">{l.labels.experience}</div>
          <div className="manifest-grid">
            <h2 className="display-title">
              {t.manifest.split("\n").map((x) => (
                <span key={x}>{x}</span>
              ))}
            </h2>
            <div>
              <p className="lead-copy">{t.intro}</p>
              <div className="rule" />
              <p className="micro">
                RIO DE JANEIRO · BRASIL
                <br />
                ROCINHA / SÃO CONRADO / ZONA SUL
              </p>
            </div>
          </div>
        </section>
        <section className="benefit-wrap section-pad">
          <div className="section-heading">
            <div>
              <div className="section-label">{t.benefitTitle}</div>
              <h2 className="display-title compact">
                {l.benefitHead[0]}
                <br />
                <i>{l.benefitHead[1]}</i>
              </h2>
            </div>
            <span className="corner-note">{l.labels.motto}</span>
          </div>
          <div className="benefit-grid">
            {l.benefits.map(([title, body], i) => (
              <article
                key={title}
                className="benefit-card reveal"
                style={{ transitionDelay: revealDelays[i] }}
                data-testid={`benefit-card-${String(i + 1).padStart(2, "0")}`}
              >
                <button
                  className="benefit-media-title"
                  type="button"
                  onClick={(event) => openMedia(benefitMedia[i], title, event.currentTarget)}
                  aria-label={`Abrir mídia: ${title}`}
                  data-testid={`benefit-media-${String(i + 1).padStart(2, "0")}`}
                >
                  <h3>{title}</h3>
                </button>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <p className="disclaimer">
            *{" "}
            <span
              data-ve-dynamic="true"
              style={{
                display: "contents",
              }}
            >
              {language === "pt"
                ? "Registros aéreos sujeitos às condições climáticas, operacionais e às regras aplicáveis."
                : language === "en"
                  ? "Aerial records subject to weather, operational conditions and applicable rules."
                  : "Registros aéreos sujetos a condiciones climáticas, operativas y reglas aplicables."}
            </span>
          </p>
        </section>
        </div>
        <section className="story section-pad">
          <div className="story-image reveal">
            <img
              src={images.christ}
              alt="Cristo Redentor visto entre as montanhas do Rio de Janeiro"
              loading="lazy"
            />
          </div>
          <div className="story-copy reveal" style={{ transitionDelay: "120ms" }}>
            <div className="section-label story-kicker">{t.storyKicker}</div>
            <h2 className="display-title">
              {t.storyTitle.split("\n").map((x) => (
                <span key={x}>{x}</span>
              ))}
            </h2>
            <p className="lead-copy">{t.storyBody}</p>
            <p className="quote">{l.quote}</p>
          </div>
        </section>
        <section
          className="route section-pad"
          id="route"
          data-testid="route-section"
        >
          <div className="route-intro reveal">
            <div className="section-label">{t.routeKicker}</div>
            <h2 className="display-title">
              {t.routeTitle.split("\n").map((x) => (
                <span key={x}>{x}</span>
              ))}
            </h2>
            <p className="lead-copy">{t.routeBody}</p>
          </div>
          <div className="timeline">
            {routeLabels.map((name, i) => (
              <article
                key={name}
                className="timeline-item reveal"
                style={{ transitionDelay: revealDelays[i % revealDelays.length] }}
                data-testid={`route-step-${i + 1}`}
              >
                <div>
                  {routeMedia[i] ? (
                    <button
                      className="media-title-button"
                      type="button"
                      onClick={(event) => openMedia(routeMedia[i], name, event.currentTarget)}
                      aria-label={`Abrir mídia: ${name}`}
                      data-testid={`route-media-${i + 1}`}
                    >
                      <h3>{name}</h3>
                    </button>
                  ) : (
                    <h3>{name}</h3>
                  )}
                  <p>
                    {language === "pt"
                      ? routeBody[i]
                      : language === "en"
                        ? [
                            "The adventure starts with a motorcycle taxi ride to the top of Rocinha.",
                            "Stop to take in views of Christ the Redeemer, the Lagoon, Sugarloaf, Ipanema and São Conrado.",
                            "An important Brazilian cultural expression, presented by those who keep it alive.",
                            "A moment for photos, contemplation and stories about Rocinha and São Conrado.",
                            "You live the moment. We record it for you, when possible.",
                            "Visit a studio of a local resident and graffiti artist.",
                            "Pass by the local court, with the possibility to join when available.",
                            "Discover Curva do S and hear stories and curiosities about the area.",
                            "One of the busiest streets, connected to local culture and events.",
                            "At the end, discover other WL Tour experiences.",
                          ][i]
                        : [
                            "La aventura comienza con el traslado en mototaxi hasta la cima de Rocinha.",
                            "Parada para contemplar y fotografiar el Cristo Redentor, la Laguna, el Pan de Azúcar y más.",
                            "Una importante manifestación cultural brasileña, presentada por quienes la mantienen viva.",
                            "Un momento para fotos, contemplación e historias sobre Rocinha y São Conrado.",
                            "Vives el momento. Nosotros lo registramos cuando es posible.",
                            "Visita un estudio de un residente y artista local de graffiti.",
                            "Pasa por la cancha local, con posibilidad de participar cuando esté disponible.",
                            "Conoce la Curva do S y escucha historias y curiosidades de la zona.",
                            "Una calle muy transitada, ligada a la cultura y eventos locales.",
                            "Al final, conoce otras experiencias disponibles de WL Tour.",
                          ][i]}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="gallery section-pad">
          <div className="section-heading reveal">
            <div>
              <div className="section-label">{l.labels.gallery}</div>
              <h2 className="display-title compact">{t.gallery}</h2>
            </div>
          </div>
          <div className="gallery-grid">
            {gallery.map(([src, alt], i) => (
              <figure
                key={src}
                className={`gallery-item gallery-${i + 1} reveal`}
                style={{ transitionDelay: revealDelays[i] }}
              >
                <img src={src} alt={alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>
        <section className="why section-pad">
          <div className="section-label reveal">{t.why}</div>
          <div className="why-grid">
            {l.why.map((item, i) => (
              <div
                key={item}
                className="why-item reveal"
                style={{ transitionDelay: revealDelays[i] }}
              >
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </section>
        <section
          className="other section-pad"
          id="other"
          data-testid="other-experiences-section"
        >
          <div className="reveal">
            <div className="section-label">{t.otherKicker}</div>
            <h2 className="display-title">
              {t.otherTitle.split("\n").map((x) => (
                <span key={x}>{x}</span>
              ))}
            </h2>
          </div>
          <div className="experience-list">
            {experiences.map((item, i) => (
              <div
                key={item}
                className="experience-row reveal"
                style={{ transitionDelay: revealDelays[i] }}
              >
                {i === 0 ? (
                  <button
                    className="media-title-button"
                    type="button"
                    onClick={(event) =>
                      openMedia(trailGallery, item, event.currentTarget)
                    }
                    aria-label={`Abrir galeria: ${item}`}
                    data-testid="trail-gallery-trigger"
                  >
                    <h3>{item}</h3>
                  </button>
                ) : (
                  <h3>{item}</h3>
                )}
                <p>{l.other[i]}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="social-proof section-pad">
          <div className="social-card">
            <div className="section-label">{l.labels.testimonials}</div>
            <h2 className="display-title">{t.testimonials}</h2>
            <div className="coming">
              <span className="coming-dot" />
              <strong>{t.soon}</strong>
              <p>{t.soonBody}</p>
            </div>
          </div>
        </section>
        <section
          className="instagram section-pad"
          id="instagram"
          data-testid="instagram-section"
        >
          <div className="instagram-visual">
            <div className="qr-frame">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=080907&bgcolor=E8A521&data=https%3A%2F%2Fwww.instagram.com%2Fwl.rocinha95%2F"
                alt="QR Code para seguir a WL Tour no Instagram"
              />
              <span>SCAN / FOLLOW</span>
            </div>
            <Instagram size={28} />
          </div>
          <div className="instagram-copy">
            <div className="section-label">{l.labels.instagram}</div>
            <h2 className="display-title">{t.follow}</h2>
            <p className="lead-copy">{t.followBody}</p>
            <a
              className="handle"
              href={C.instagram}
              target="_blank"
              rel="noreferrer"
              data-testid="instagram-handle-link"
              onClick={() => track("instagram_click", "instagram-section")}
            >
              <Instagram size={18} /> @wl.rocinha95 <ArrowUpRight size={18} />
            </a>
            <p className="micro qr-text">{l.scan}</p>
          </div>
        </section>
        <section
          className="final-cta section-pad"
          id="contact"
          data-testid="final-cta-section"
        >
          <div className="final-watermark">WL</div>
          <div className="section-label">{l.labels.contact}</div>
          <h2 className="display-title">
            {t.final.split("\n").map((x) => (
              <span key={x}>{x}</span>
            ))}
          </h2>
          <p className="lead-copy">{t.finalBody}</p>
          <div className="hero-actions">
            <LinkCTA
              href={C.whatsapp}
              testid="final-whatsapp-button"
              onClick={() => whatsapp("final")}
            >
              {t.primary}
            </LinkCTA>
            <LinkCTA
              href={C.phone}
              type="ghost"
              testid="final-phone-button"
              onClick={() => track("phone_click", "final")}
            >
              {t.call}
            </LinkCTA>
          </div>
        </section>
      </main>
      <MediaPopup media={activeMedia} onClose={closeMedia} />
      <footer className="footer">
        <a className="brand" href="#top" data-testid="footer-brand">
          <span className="brand-mark">WL</span>
          <span>
            TOUR
            <br />
            <b>EXPERIENCE</b>
          </span>
        </a>
        <p>
          {l.footerLead[0]}
          <br />
          {l.footerLead[1]}
        </p>
        <div className="footer-contact">
          <a
            href={C.instagram}
            target="_blank"
            rel="noreferrer"
            data-testid="footer-instagram-link"
            onClick={() => track("instagram_click", "footer")}
          >
            @wl.rocinha95
          </a>
          <a
            href={C.whatsapp}
            data-testid="footer-whatsapp-link"
            onClick={() => whatsapp("footer")}
          >
            +55 21 99555-0707
          </a>
        </div>
        <div className="footer-note">
          {l.footerNote}
          <br />
          <span>© 2025 WL TOUR EXPERIENCE · RIO DE JANEIRO, BRASIL</span>
          <br />
          <a
            href="https://www.xdouglas.com.br"
            target="_blank"
            rel="noreferrer"
            className="footer-credit"
            data-testid="footer-credit-link"
          >
            <strong>{l.footerCredit}</strong>
          </a>
        </div>
      </footer>
      <div className="social-float">
        <a
          className="social-float-button social-float-instagram"
          href={C.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label={l.ariaInstagram}
          data-testid="floating-instagram-button"
          onClick={() => track("instagram_click", "floating")}
        >
          <Instagram size={22} strokeWidth={2} />
        </a>
        <a
          className="social-float-button social-float-whatsapp"
          href={C.whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label={l.aria}
          data-testid="floating-whatsapp-button"
          onClick={() => whatsapp("floating")}
        >
          <WhatsAppIcon />
        </a>
      </div>
    </div>
  );
}

export default App;
