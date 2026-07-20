# Guide SEO & Indexation (Humains & Agents IA)

Ce document décrit les règles et bonnes pratiques pour la création d'articles et la gestion du SEO sur le blog `bc1pzzfnxl.com`.

---

## 1. Structure et Format d'un Article

Tous les articles de blog doivent être créés sous forme de fichiers Markdown (`.md` ou `.mdx`) dans le dossier `src/content/`.

### Métadonnées Frontmatter (Obligatoire)
Chaque article doit commencer par un bloc frontmatter YAML contenant obligatoirement l'auteur et la date de publication pour alimenter le schéma JSON-LD structuré (`BlogPosting`) :

```yaml
---
author: bc1pzzfnxl
date: AAAA-MM-JJ
---
```

### Nom de Fichier (Slug de l'URL)
*   Utiliser exclusivement des minuscules et des traits d'union (`-`).
*   **Ne pas utiliser d'underscores (`_`)** ou d'espaces.
*   *Exemple valide* : `le-secret-du-psaume-91.md`

---

## 2. Structure des Liens & Canoniques

L'application est configurée pour utiliser des URL avec **slash final obligatoire** (`trailingSlash: "always"`).

*   **Liens internes** : Tous les liens hypertextes internes doivent se terminer par un slash.
    *   *Correct* : `<a href="/le-mystere-de-barabbas/">`
    *   *Incorrect* : `<a href="/le-mystere-de-barabbas">` (Provoque une redirection 307 nuisible à l'indexation)
*   **URL Canonique** : Générée automatiquement par `MainLayout.astro` au format `https://bc1pzzfnxl.com/nom-article/`.

---

## 3. Plan du Site (Sitemap)

Le sitemap est automatiquement généré à chaque compilation (`astro build`) par l'intégration `@astrojs/sitemap`.

*   **Index du sitemap** : `https://bc1pzzfnxl.com/sitemap-index.xml`
*   **Sitemap des pages** : `https://bc1pzzfnxl.com/sitemap-0.xml`
*   **robots.txt** : Référence explicitement le sitemap-index à la racine pour guider les moteurs de recherche.

---

## 4. Indexation Google Search Console (GSC)

Google Search Console met parfois du temps à retélécharger le sitemap automatiquement. En cas de publication d'un nouvel article :

1.  Accédez à la **Google Search Console** (Propriété domaine : `sc-domain:bc1pzzfnxl.com`).
2.  Allez dans la section **Sitemaps** et soumettez à nouveau l'URL `https://bc1pzzfnxl.com/sitemap-index.xml`.
3.  Utilisez l'outil d'**inspection d'URL** pour inspecter la nouvelle adresse (ex: `https://bc1pzzfnxl.com/nom-article/`) et cliquez sur **Demander l'indexation**.

---

## 5. Configuration Cloudflare

Pour éviter des boucles de redirection ou des échecs de sécurité empêchant l'indexation :
*   Le SSL/TLS dans Cloudflare doit être réglé sur **Full** ou **Full (Strict)**.
*   **Always Use HTTPS** et **Automatic HTTPS Rewrites** doivent être actifs.
