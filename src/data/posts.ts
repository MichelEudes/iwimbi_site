export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

export const postsData: Post[] = [
  {
    slug: "impact-ia-afrique",
    title: "L'impact de l'IA générative sur les entreprises africaines",
    excerpt: "Comment l'automatisation intelligente redéfinit l'efficacité opérationnelle à Cotonou et au-delà.",
    category: "IA Strategy",
    date: "04 Mars 2026",
    readTime: "5 min",
    content: `L'intelligence artificielle n'est plus une promesse lointaine. Pour les entreprises basées en Afrique, elle représente un levier de croissance sans précédent, permettant de sauter des étapes technologiques entières.

Dans nos récents projets au sein d'Iwimbi Group, nous avons observé une réduction de 40% des tâches répétitives grâce à l'intégration de micro-services IA. Qu'il s'agisse de support client automatisé ou d'analyse prédictive, la précision est désormais accessible.

L'adoption stratégique de ces outils n'est plus une option pour rester compétitif sur le marché local et international. Nous accompagnons nos partenaires dans cette transition vers une intelligence augmentée.`
  },
  {
    slug: "design-system-premium",
    title: "Design System : L'actif invisible des marques premium",
    excerpt: "Pourquoi la cohérence visuelle est le socle de la confiance numérique et de la scalabilité.",
    category: "Design",
    date: "28 Fév 2026",
    readTime: "4 min",
    content: `Un Design System n'est pas qu'une bibliothèque de composants. C'est le langage visuel d'une entreprise, sa signature unique dans un monde numérique saturé.

Pour Iwimbi, la création d'un système cohérent permet de réduire les coûts de développement tout en garantissant une expérience utilisateur irréprochable sur tous les supports.

La clarté visuelle engendre la confiance. Et dans l'économie numérique, la confiance est la monnaie la plus précieuse.`
  }
];