# Checklist SEO — Google Search Central

## 1. Déjà en place (Validé)

- [x] **Crawlabilité & Indexation** : Fichier `robots.txt` valide avec directive `Allow: /` et déclaration du Sitemap.
- [x] **Sitemap XML** : Génération automatique via `@astrojs/sitemap` (`https://bc1pzzfnxl.com/sitemap-index.xml`).
- [x] **Balise Canonique** : `<link rel="canonical" href="...">` dynamique et auto-référencée sur chaque URL.
- [x] **Données structurées `BlogPosting` (JSON-LD)** :
  - `headline` (titre H1)
  - `description` (résumé 160 caractères)
  - `image` (URL absolue de l'image de couverture)
  - `url` (URL canonique de l'article)
  - `author` & `publisher` (type `Person`)
  - `datePublished` & `dateModified` (norme ISO 8601)
  - `mainEntityOfPage` (ID WebPage)
- [x] **Protocole Open Graph & Twitter Cards** : Balises `og:title`, `og:description`, `og:image`, `og:url`, `og:type` et `twitter:card="summary_large_image"`.
- [x] **Structure sémantique HTML5** :
  - Balise `lang="fr"` déclarée sur l'élément racine `<html>`.
  - Un seul `<h1>` par page.
  - Hiérarchie logique des sous-titres (`<h2>` puis `<h3>`).
- [x] **Accessibilité & Images** :
  - Balises `alt` descriptives sur toutes les images.
  - Balises sémantiques `<figure>` et `<figcaption>` pour les légendes d'images.
  - Attributs `loading="eager"` et `decoding="async"` sur l'image principale au-dessus de la ligne de flottaison (LCP).
- [x] **Typographie & URLs sémantiques** : Titres UI (`<h1>`, `<title>`, `post.frontmatter.title`) avec accents complets pour la lisibilité et le NLP Google, et URLs (Slugs) en pur ASCII kebab-case sans accents pour éviter le pourcent-encodage (`%C3%A9`) et garantir une indexation propre.
- [x] **Métadonnées visibles pour l'utilisateur** : Date de publication sous le titre H1 et date de dernière modification en bas de page face au lien retour.
- [x] **Attributs de dimension & Norme images (CLS = 0)** : Ratio d'aspect défini (`aspect-ratio: 16 / 9` sur couverture, `width="680"` / `height="382"`, `width: 100%; height: auto` dans le flux de lecture) empêchant tout Cumulative Layout Shift.
- [x] **Performance technique** :
  - Rendu statique précompilé (`prerender = true`).
  - Hébergement Edge via Cloudflare Pages (faible TTFB).
  - Cache immutable sur les assets statiques `/_astro/*`.

---

## 2. À implémenter (Recommandations Google Search Docs)

### A. Données Structurées & Rich Results
- [ ] **Fil d'Ariane (`BreadcrumbList`)** : Ajouter le balisage JSON-LD `BreadcrumbList` sur les pages d'articles pour afficher le fil d'Ariane (`Accueil > Titre de l'article`) dans les résultats Google au lieu de l'URL brute.
- [x] **Schéma `WebSite` sur la page d'accueil** : Déclarer l'entité globale du site (`name`, `url`, `description`, `inLanguage`) sur `index.astro`.
- [x] **Champ `logo` dans `publisher`** : Compléter l'objet `publisher` avec un `ImageObject` pointant vers le logo officiel du site (`/logo.png`).

### B. Découvrabilité & Indexation
- [ ] **Flux RSS / Atom (`rss.xml`)** : Intégrer `@astrojs/rss` pour permettre aux moteurs de recherche et aux agrégateurs de détecter immédiatement la publication de nouveaux articles.
- [ ] **Page d'erreur 404 dédiée (`src/pages/404.astro`)** : Éviter les "Soft 404" et conserver le trafic avec une page 404 explicite renvoyant vers l'accueil et les derniers articles.
- [x] **Favicon Google SERP & Touch Icons** : Déclarer explicitement les icônes (`favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`) pour l'affichage de l'icône de marque dans les SERP mobiles et desktop.

### C. Transparence & Signaux E-E-A-T (Expérience, Expertise, Autorité, Confiance)
- [ ] **Maillage interne contextuel** : Créer des liens hypertextes croisés au sein du contenu entre articles abordant des concepts bibliques ou théologiques complémentaires.
- [ ] **Section / Page Auteur** : Renseigner une biographie d'auteur avec liens sociaux/profils vérifiés (`sameAs` dans Schema.org) pour renforcer l'indice d'expertise.
