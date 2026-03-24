import React from 'react';
import { Reveal } from './Reveal';
import { Building2, ShieldCheck, Camera, FileText, Wrench, Ruler, BadgeCheck, CheckCircle2, Layers, Route } from 'lucide-react';

export const InspectionBuildings: React.FC = () => {
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
              <span className="tracking-[0.25em] text-xs font-bold uppercase">Inspection de bâtiments</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              Inspection par drone
              <br />
              <span className="text-accent">toitures, façades, structures</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-textSecondary leading-relaxed">
              Constatez l’état des toitures, façades et structures sans nacelle ni risque. Vues 4K, détails annotables,
              rapports concis et exploitables.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Camera size={22} className="text-accent" />, title: 'Détails annotables', text: 'Photos 4K précises, zones sensibles et constats.' },
              { icon: <ShieldCheck size={22} className="text-accent" />, title: 'Sécurité', text: 'Opérations au sol, périmètres, autorisations.' },
              { icon: <Wrench size={22} className="text-accent" />, title: 'Maintenance', text: 'Aide à la décision: quoi, où, quand intervenir.' },
            ].map((item, i) => (
              <div key={i} className="bg-surfaceHighlight/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
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
              <div className="flex items-center gap-3 text-accent mb-2">
                <Layers size={18} />
                <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Livrables</span>
              </div>
              <div className="space-y-3">
                {[
                  { icon: <Camera size={18} />, label: 'Photos 4K (globales + détails)' },
                  { icon: <BadgeCheck size={18} />, label: 'Comparatifs avant/après (si revisite)' },
                  { icon: <FileText size={18} />, label: 'Rapport PDF illustré (2–4 pages)' }
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                    <div className="p-1.5 bg-accent/10 rounded-md text-accent">{f.icon}</div>
                    <p className="text-sm text-white/85 leading-relaxed">{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-accent mb-2">
                <Ruler size={18} />
                <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Cibles fréquentes</span>
              </div>
              <div className="space-y-3">
                {[
                  'Étanchéité (toitures, zinguerie)',
                  'Façades (fissures, joints, parements)',
                  'Structures (angles, points d’accès, zones contraintes)',
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
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 text-accent mb-4">
            <Route size={18} />
            <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Déroulé type</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { n: '01', title: 'Brief & périmètre', text: 'Quoi inspecter, où, priorités & contraintes.' },
              { n: '02', title: 'Étude & autorisations', text: 'Vérif. règlementaires et balisage.' },
              { n: '03', title: 'Vol & captation', text: 'Vues globales + détails, sécurité.' },
              { n: '04', title: 'Traitement & rapport', text: 'Sélection visuels + rapport PDF.' },
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
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">Parlons de votre inspection</h3>
                <p className="text-white/80 mt-1">Obtenez un devis et un exemple de rapport.</p>
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

