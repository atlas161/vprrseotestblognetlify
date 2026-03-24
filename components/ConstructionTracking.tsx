import React from 'react';
import { Reveal } from './Reveal';
import { Building2, Ruler, Layers, MapPinned, Clock, ShieldCheck, Camera, FileText, Route, BadgeCheck, CheckCircle2, Briefcase, Factory, Calendar, HelpCircle, ClipboardCheck, BadgeEuro, Image as ImageIcon } from 'lucide-react';

export const ConstructionTracking: React.FC = () => {
  return (
    <div className="relative bg-background overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[680px] h-[680px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-white/5 blur-[120px]" />
      </div>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-14">
          <Reveal>
            <div className="flex items-center gap-3 text-accent mb-4">
              <Building2 size={20} />
              <span className="tracking-[0.25em] text-xs font-bold uppercase">Suivi de chantier BTP</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              Suivi de chantier par drone
              <br />
              <span className="text-accent">précision, sécurité, visibilité</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-textSecondary leading-relaxed">
              Documentez l’avancement de vos travaux, anticipez les risques et facilitez la coordination grâce à des prises de vue aériennes régulières,
              des orthophotos et des rapports clairs, adaptés au terrain.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="text-[11px] uppercase tracking-widest bg-white/10 border border-white/15 text-white px-3 py-1.5 rounded-full">
                Télépilote certifié DGAC
              </span>
              <span className="text-[11px] uppercase tracking-widest bg-accent/20 border border-accent/30 text-accent px-3 py-1.5 rounded-full">
                Assurance RC Pro
              </span>
              <span className="text-[11px] uppercase tracking-widest bg-white/10 border border-white/15 text-white px-3 py-1.5 rounded-full">
                Opérations zones urbaines étudiées
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <MapPinned size={22} className="text-accent" />,
                title: 'Orthophotos & vues globales',
                text:
                  "Visualisez l'ensemble du chantier avec des cartes haute définition et des angles impossibles depuis le sol.",
              },
              {
                icon: <Ruler size={22} className="text-accent" />,
                title: 'Mesures et contrôle',
                text:
                  "Suivi métrique de zones, volumétrie approximative et contrôle de conformité visuel pour vos revues de projet.",
              },
              {
                icon: <Clock size={22} className="text-accent" />,
                title: 'Récurrence planifiée',
                text:
                  "Survols hebdomadaires ou mensuels, mêmes points de vue, même cadrage pour comparer efficacement dans le temps.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-surfaceHighlight/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-textSecondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-b from-transparent to-white/[0.02] rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Reveal>
                <div className="flex items-center gap-3 text-accent mb-2">
                  <Layers size={18} />
                  <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Livrables</span>
                </div>
              </Reveal>
              <div className="space-y-3">
                {[
                  { icon: <Camera size={18} />, label: 'Photos / vidéos aériennes 4K cadrées aux points de repère' },
                  { icon: <FileText size={18} />, label: 'Rapport PDF concis avec légendes et remarques' },
                  { icon: <MapPinned size={18} />, label: 'Orthophoto (image géoréférencée) et vues top-down' },
                  { icon: <BadgeCheck size={18} />, label: 'Comparatifs T-1 / T (mêmes altitudes et axes)' },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                    <div className="p-1.5 bg-accent/10 rounded-md text-accent">{f.icon}</div>
                    <p className="text-sm text-white/85 leading-relaxed">{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Reveal>
                <div className="flex items-center gap-3 text-accent mb-2">
                  <ShieldCheck size={18} />
                  <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Sécurité & conformité</span>
                </div>
              </Reveal>
              <div className="space-y-3">
                {[
                  'Étude des zones et autorisations admin. gérées',
                  'Respect des hauteurs et périmètres de sécurité',
                  'Plan de vol préparé, brief terrain, balisage',
                  'Assurance RC Pro et sauvegarde des données',
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                    <CheckCircle2 size={18} className="text-textPrimary shrink-0" />
                    <p className="text-sm text-white/85 leading-relaxed">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 text-accent mb-4">
            <Briefcase size={18} />
            <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Cas d'usage</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Factory size={20} className="text-accent" />, title: 'Gros-œuvre & structures', text: 'Suivi des élévations, coffrages, ferraillages et zones techniques complexes.' },
              { icon: <Ruler size={20} className="text-accent" />, title: 'VRD & terrassements', text: 'Comparaisons top-down et contrôle des zones et remblais.' },
              { icon: <Building2 size={20} className="text-accent" />, title: 'Charpente & toiture', text: 'Détection visuelle d’écarts, zones sensibles, protections et accès.' },
              { icon: <ClipboardCheck size={20} className="text-accent" />, title: 'Sécurité & coordination', text: 'Points de brief, circulations, zones interdites, documentés en images.' },
              { icon: <FileText size={20} className="text-accent" />, title: 'Comptes rendus MOE/MOA', text: 'Rapports synthétiques avec légendes et repères temporels.' },
              { icon: <ImageIcon size={20} className="text-accent" />, title: 'Communication chantier', text: 'Visuels réguliers pour newsletters, réunions et réseaux internes.' },
            ].map((c, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">{c.icon}</div>
                  <h4 className="text-white font-bold">{c.title}</h4>
                </div>
                <p className="text-sm text-textSecondary leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 text-accent mb-4">
            <Calendar size={18} />
            <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Fréquences & packs</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Visite ponctuelle',
                badge: 'Intervention unique',
                items: ['Plan de vol adapté', 'Vues globales et détails', 'Rapport court illustré'],
                price: 'Sur devis',
              },
              {
                title: 'Mensuel',
                badge: 'Rythme classique',
                items: ['Même cadrage chaque session', 'Comparatifs T-1/T', 'Orthophoto si pertinent'],
                price: 'Sur devis',
              },
              {
                title: 'Hebdomadaire',
                badge: 'Chantier dynamique',
                items: ['Points récurrents', 'Mise à jour sécurité', 'Flux médias organisé'],
                price: 'Sur devis',
              },
            ].map((p, i) => (
              <div key={i} className="rounded-2xl p-6 border border-white/10 bg-surfaceHighlight/40 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-bold">{p.title}</h4>
                  <span className="text-[10px] uppercase tracking-widest bg-white/10 text-white/80 px-2 py-1 rounded-full border border-white/20">{p.badge}</span>
                </div>
                <ul className="space-y-2 mb-4">
                  {p.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-white/85">
                      <CheckCircle2 size={16} className="text-textPrimary shrink-0 mt-0.5" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-accent font-bold">
                  <BadgeEuro size={18} />
                  <span>{p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 text-accent mb-4">
            <ClipboardCheck size={18} />
            <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Checklist réglementaire</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Étude préalable des zones et espaces aériens',
              'Validation des hauteurs et périmètres de sécurité',
              'Brief sécurité et périmètre balisé',
              'Fenêtre météo et plan de repli',
              'Gestion des autorisations si nécessaires',
              'Traçabilité des vols et sauvegardes',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                <CheckCircle2 size={18} className="text-textPrimary shrink-0 mt-0.5" />
                <p className="text-sm text-white/85 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 text-accent mb-4">
            <HelpCircle size={18} />
            <span className="tracking-[0.2em] text-[11px] font-bold uppercase">FAQ chantier</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: 'Quelles zones sont possibles en agglomération ?', a: "Selon l’emplacement, une étude est menée. Des démarches peuvent être requises pour les zones sensibles, avec délais à anticiper." },
              { q: 'Peut-on obtenir exactement les mêmes cadrages à chaque session ?', a: "Oui, des points de repère et altitudes récurrents sont définis pour comparer les états d’un mois à l’autre." },
              { q: 'Proposez-vous de la photogrammétrie avancée ?', a: "Sur étude. Selon le besoin, orthophotos ou livrables plus poussés peuvent être envisagés." },
              { q: 'Comment sont remis les livrables ?', a: "Lien sécurisé structuré par dates et zones, avec rapport PDF et médias classés." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl p-6 border border-white/10 bg-white/5">
                <h4 className="text-white font-bold mb-2">{f.q}</h4>
                <p className="text-sm text-textSecondary leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 text-accent mb-4">
            <Layers size={18} />
            <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Exemples de livrables</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Rapport PDF', desc: 'Recto 2-4 pages avec images légendées et remarques.' },
              { title: 'Orthophoto', desc: 'Vue top-down à haute définition avec repères et zones.' },
              { title: 'Vues comparatives', desc: 'Paires T-1/T aux mêmes altitudes et axes.' },
            ].map((l, i) => (
              <div key={i} className="rounded-2xl p-6 border border-white/10 bg-surfaceHighlight/40">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                    <BadgeCheck size={18} className="text-accent" />
                  </div>
                  <h4 className="text-white font-bold">{l.title}</h4>
                </div>
                <p className="text-sm text-textSecondary leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <div className="flex items-center gap-3 text-accent mb-4">
              <Route size={18} />
              <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Déroulé type</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { n: '01', title: 'Brief & périmètre', text: 'Cadrage des besoins, zones sensibles, planning et livrables.' },
              { n: '02', title: 'Étude & autorisations', text: 'Vérifications réglementaires et démarches si nécessaires.' },
              { n: '03', title: 'Vol & captation', text: 'Prise de vues selon plan de vol, sécurité et redondance.' },
              { n: '04', title: 'Traitement & rapport', text: 'Tri, colorimétrie, orthophoto et envoi rapport + médias.' },
            ].map((s, i) => (
              <div key={i} className="relative bg-surfaceHighlight/50 border border-white/10 rounded-2xl p-6">
                <div className="absolute -top-3 -left-3 bg-accent text-background text-xs font-bold rounded-md px-2 py-1 border border-accent/50">
                  {s.n}
                </div>
                <h4 className="text-white font-bold mb-2">{s.title}</h4>
                <p className="text-sm text-textSecondary leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="rounded-[2rem] border border-accent/30 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-8 md:p-10 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">Discutons de votre chantier</h3>
                <p className="text-white/80 mt-1">Recevez une proposition sur-mesure et un exemple de rapport.</p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-accent text-background font-bold px-6 py-3 rounded-full hover:bg-white transition-colors border border-accent/40"
              >
                Demander un devis
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
