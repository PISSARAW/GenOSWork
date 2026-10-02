import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { RecordedRunExplorer } from "@/components/p3-explorers";

export const metadata: Metadata = { title: "Exécutions GenOS enregistrées", description: "Relecture en français d’une campagne GenOS historique, avec ses statuts de mission, ses échecs et sa provenance.", alternates: { canonical: "/fr/runs", languages: { en: "/runs", fr: "/fr/runs" } }, openGraph: { locale: "fr_FR" } };

export default function FrenchRunsPage() { return <div className="page-shell" lang="fr"><section className="page-hero section-wrap p3-hero"><Eyebrow>EXÉCUTIONS ENREGISTRÉES · PREUVES</Eyebrow><h1>Les runs tels<br /><em>qu’ils se terminent.</em></h1><p>Cette page relit une campagne locale historique de GenOS. Elle conserve les contrôles échoués, sépare un dispatch accepté du travail achevé et indique le commit source.</p><div className="p3-hero-links"><a href="/fr/benchmarks">Explorer les résultats →</a><a href="/fr/sandbox">Connecter un runtime →</a></div></section><RecordedRunExplorer locale="fr" /></div>; }
