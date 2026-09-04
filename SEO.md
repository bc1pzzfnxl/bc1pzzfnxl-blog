# Guide Global SEO, Core Web Vitals & IA (GEO / AEO) — Framework Astro

Ce guide constitue la référence technique et architecturale exhaustive pour concevoir, développer ou régénérer un blog statique ou hybride ultra-performant. Il combine les normes officielles Google Search Central, les métriques Core Web Vitals (LCP, CLS, INP) et les exigences de citation des moteurs d'intelligence artificielle (GEO / AEO).

---

## 1. Architecture des Données & Schéma Zod

Toutes les publications doivent être validées à la compilation par un schéma Zod strict dans le fichier de configuration des collections.

### Fichier : `src/content.config.ts`

```typescript
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content" }),
  schema: z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(50).max(200).optional(),
    author: z.string().default("bc1pzzfnxl"),
    date: z.coerce.date(),
    dateModified: z.coerce.date().optional(),
    image: z.string().url().or(z.string().startsWith("/")),
    imageAlt: z.string().min(10).max(150),
    canonicalUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

---

## 2. Layout Principal Universel (SEO, Social, Core Web Vitals)

Ce layout intègre automatiquement la balise canonique, le préchargement LCP haute priorité, les balises Open Graph / Twitter Cards et les données structurées JSON-LD.

### Fichier : `src/layouts/BaseLayout.astro`

```astro
---
interface Props {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  canonicalUrl?: string;
}

const {
  title,
  description = "Blog de référence | Théologie biblique, exégèse et réflexions.",
  image = "/images/default-cover.webp",
  imageAlt = "Illustration de couverture du blog",
  ogType = "website",
  publishedTime,
  modifiedTime,
  canonicalUrl,
} = Astro.props;

const siteUrl = Astro.site ? Astro.site.origin : "https://bc1pzzfnxl.com";
const fullCanonicalUrl = canonicalUrl || new URL(Astro.url.pathname, siteUrl).href;
const fullImageUrl = image.startsWith("http") ? image : new URL(image, siteUrl).href;
const formattedTitle = title === "Home" ? "bc1pzzfnxl | Théologie biblique et pensée" : `${title} | bc1pzzfnxl`;

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "bc1pzzfnxl",
  "url": siteUrl,
  "description": description,
  "inLanguage": "fr",
  "publisher": {
    "@type": "Person",
    "name": "bc1pzzfnxl",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/logo.png`
    }
  }
};

const jsonLdArticle = ogType === "article" ? {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": title,
  "description": description,
  "image": fullImageUrl,
  "url": fullCanonicalUrl,
  "inLanguage": "fr",
  "datePublished": publishedTime,
  "dateModified": modifiedTime || publishedTime,
  "author": {
    "@type": "Person",
    "name": "bc1pzzfnxl",
    "url": siteUrl
  },
  "publisher": {
    "@type": "Person",
    "name": "bc1pzzfnxl",
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/logo.png`
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": fullCanonicalUrl
  }
} : null;
---

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

    {image && <link rel="preload" as="image" href={fullImageUrl} fetchpriority="high" />}

    <title>{formattedTitle}</title>
    <meta name="title" content={formattedTitle} />
    <meta name="description" content={description} />
    <link rel="canonical" href={fullCanonicalUrl} />

    <meta property="og:type" content={ogType} />
    <meta property="og:url" content={fullCanonicalUrl} />
    <meta property="og:title" content={formattedTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={fullImageUrl} />
    <meta property="og:image:alt" content={imageAlt} />
    {publishedTime && <meta property="article:published_time" content={publishedTime} />}
    {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={fullCanonicalUrl} />
    <meta property="twitter:title" content={formattedTitle} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={fullImageUrl} />
    <meta property="twitter:image:alt" content={imageAlt} />

    <script type="application/ld+json" is:inline set:html={JSON.stringify(jsonLdWebsite)} />
    {jsonLdArticle && <script type="application/ld+json" is:inline set:html={JSON.stringify(jsonLdArticle)} />}
  </head>
  <body>
    <header class="site-header">
      <nav aria-label="Navigation principale">
        <a href="/" class="site-title">bc1pzzfnxl</a>
      </nav>
    </header>
    <main id="main-content">
      <slot />
    </main>
  </body>
</html>

<style is:global>
  :root {
    --max-width: 680px;
    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  body {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 40px 20px;
    font-family: var(--font-sans);
    line-height: 1.65;
    color: #1f2937;
    background-color: #ffffff;
  }

  .article-cover-container {
    width: 100%;
    margin: 1.5rem 0 2rem 0;
  }

  .article-cover-img {
    width: 100%;
    height: auto;
    max-height: 400px;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 8px;
    display: block;
  }

  .article-cover-caption {
    font-size: 0.85rem;
    color: #6b7280;
    margin-top: 0.5rem;
    text-align: center;
    font-style: italic;
  }

  article img {
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1.5rem 0;
    display: block;
  }
</style>
```

---

## 3. Template de Page d'Article Dynamique

Gère l'extraction automatique de la description, le calcul du temps de lecture, le fil d'Ariane Schema.org et la conformité CLS = 0.

### Fichier : `src/pages/[slug].astro`

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";

export async function getStaticPaths() {
  const posts = import.meta.glob("../content/*.{md,mdx}", { eager: true });
  return Object.entries(posts).map(([path, post]: [string, any]) => {
    const slug = path.split("/").pop()?.replace(/\.(md|mdx)$/, "");
    return {
      params: { slug },
      props: { post, slug },
    };
  });
}

const { post, slug } = Astro.props;
const { Content, rawContent, frontmatter = {} } = post;

const title = frontmatter.title || decodeURIComponent(slug || "")
  .toLowerCase()
  .split("-")
  .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
  .join(" ");

const cleanBodyText = typeof rawContent === "function" 
  ? rawContent()
      .replace(/^---[\s\S]*?---\s*/m, "")
      .replace(/[#*`_\[\]>]/g, "")
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/\n+/g, " ")
      .trim()
  : "";

const description = frontmatter.description || (cleanBodyText.substring(0, 160) + "...");
const wordCount = cleanBodyText.split(/\s+/).filter(Boolean).length;
const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

const formatDate = (dateValue?: string | Date) => {
  if (!dateValue) return "";
  const d = new Date(dateValue);
  return isNaN(d.getTime()) 
    ? String(dateValue) 
    : new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(d);
};

const publishedFormatted = formatDate(frontmatter.date);
const modifiedFormatted = formatDate(frontmatter.dateModified);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": Astro.site ? Astro.site.origin : "https://bc1pzzfnxl.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": title,
      "item": new URL(Astro.url.pathname, Astro.site || "https://bc1pzzfnxl.com").href
    }
  ]
};
---

<BaseLayout
  title={title}
  description={description}
  image={frontmatter.image}
  imageAlt={frontmatter.imageAlt}
  ogType="article"
  publishedTime={frontmatter.date ? new Date(frontmatter.date).toISOString() : undefined}
  modifiedTime={frontmatter.dateModified ? new Date(frontmatter.dateModified).toISOString() : undefined}
>
  <script type="application/ld+json" is:inline set:html={JSON.stringify(breadcrumbSchema)} />

  <article>
    <header class="article-header">
      <nav aria-label="Fil d'ariane" class="breadcrumbs">
        <a href="/">Accueil</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{title}</span>
      </nav>

      <h1>{title}</h1>

      <div class="article-metadata">
        {publishedFormatted && <time datetime={new Date(frontmatter.date).toISOString()}>Publié le {publishedFormatted}</time>}
        <span aria-hidden="true">•</span>
        <span>{readingTimeMinutes} min de lecture</span>
      </div>
    </header>

    {frontmatter.image && (
      <figure class="article-cover-container">
        <img
          src={frontmatter.image}
          alt={frontmatter.imageAlt || title}
          class="article-cover-img"
          width="680"
          height="382"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
        {frontmatter.imageAlt && (
          <figcaption class="article-cover-caption">{frontmatter.imageAlt}</figcaption>
        )}
      </figure>
    )}

    <div class="article-body">
      <Content />
    </div>

    <footer class="article-footer">
      <a href="/" class="back-link">← Retour</a>
      {modifiedFormatted && (
        <span class="modified-label">Mis à jour le {modifiedFormatted}</span>
      )}
    </footer>
  </article>
</BaseLayout>

<style>
  .breadcrumbs {
    display: flex;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
  }
  .breadcrumbs a {
    color: inherit;
    text-decoration: underline;
  }
  .article-header h1 {
    font-size: 2.25rem;
    line-height: 1.25;
    margin: 0 0 0.75rem 0;
    letter-spacing: -0.02em;
  }
  .article-metadata {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    font-size: 0.9rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
  }
  .article-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
    font-size: 0.9rem;
  }
  .modified-label {
    color: #6b7280;
  }
</style>
```

---

## 4. Flux RSS Automatique

Permet aux agrégateurs et moteurs de recherche d'indexer instantanément les nouvelles publications.

### Fichier : `src/pages/rss.xml.ts`

```typescript
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = import.meta.glob("../content/*.{md,mdx}", { eager: true });
  const siteUrl = context.site?.href || "https://bc1pzzfnxl.com";

  const items = Object.entries(posts).map(([path, post]: [string, any]) => {
    const slug = path.split("/").pop()?.replace(/\.(md|mdx)$/, "");
    const { frontmatter = {} } = post;
    return {
      title: frontmatter.title || slug,
      pubDate: new Date(frontmatter.date || Date.now()),
      description: frontmatter.description || "",
      link: `/${slug}/`,
    };
  }).sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: "bc1pzzfnxl Blog",
    description: "Blog personnel sur la théologie biblique, exégèse et pensée.",
    site: siteUrl,
    items,
    customData: `<language>fr</language>`,
  });
}
```

---

## 5. Page d'Erreur 404 Dédiée (Anti-Soft 404)

Retourne un code HTTP 404 strict tout en préservant le maillage interne.

### Fichier : `src/pages/404.astro`

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="Page non trouvée" description="La page demandée n'existe pas ou a été déplacée.">
  <div class="not-found-wrapper">
    <h1>404</h1>
    <h2>Page non trouvée</h2>
    <p>Le document recherché n'existe pas, a été renommé ou a changé d'adresse.</p>
    <a href="/" class="home-button">Retourner à l'accueil</a>
  </div>
</BaseLayout>

<style>
  .not-found-wrapper {
    text-align: center;
    padding: 60px 0;
  }
  .not-found-wrapper h1 {
    font-size: 5rem;
    margin: 0;
    color: #e5e7eb;
    line-height: 1;
  }
  .not-found-wrapper h2 {
    margin-top: 1rem;
    font-size: 1.5rem;
  }
  .not-found-wrapper p {
    color: #6b7280;
    margin-bottom: 2rem;
  }
  .home-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #111827;
    color: #ffffff;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
  }
</style>
```

---

## 6. Fichiers Découvrabilité & Indexation IA (`public/robots.txt` et `public/llms.txt`)

### Fichier : `public/robots.txt`

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Disallow: /

Sitemap: https://bc1pzzfnxl.com/sitemap-index.xml
```

### Fichier : `public/llms.txt`

```text
# bc1pzzfnxl Blog
> Blog personnel d'exégèse biblique, théologie et linguistique textuelle.

## Articles
- [Le Mystère de Barabbas](https://bc1pzzfnxl.com/le-mystere-de-barabbas/): Analyse textuelle et gématrique du nom Yeshoua Barabbas.
- [Le Secret du Psaume 91](https://bc1pzzfnxl.com/le-secret-du-psaume-91/): Étude croisée de la Genèse et du Psaume 91 sur les désignations divines Elyon et Shaddaï.
- [Les 613 Lois de la Torah](https://bc1pzzfnxl.com/les-613-lois-de-la-torah/): Décomposition spirituelle et mathématique des préceptes de la Torah.
```

---

## 7. Automatisation de l'Optimisation d'Images

Script Bun exécutable pour redimensionner, compresser et générer les équivalents WebP (< 150 KB) sans dégradation visuelle.

### Fichier : `scripts/optimize-images.ts`

```typescript
import { readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const IMAGES_DIR = "./public/images";
const TARGET_WIDTH = 1200;
const QUALITY = 80;

async function run() {
  const files = await readdir(IMAGES_DIR);
  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const sourcePath = join(IMAGES_DIR, file);
    const destWebpPath = join(IMAGES_DIR, `${file.replace(/\.[^.]+$/, "")}.webp`);

    const image = sharp(sourcePath);
    const metadata = await image.metadata();

    if (metadata.width && metadata.width > TARGET_WIDTH) {
      image.resize({ width: TARGET_WIDTH, withoutEnlargement: true });
    }

    await image.webp({ quality: QUALITY }).toFile(destWebpPath);
    const sBefore = (await stat(sourcePath)).size;
    const sAfter = (await stat(destWebpPath)).size;

    console.log(`${file}: ${Math.round(sBefore / 1024)}KB -> ${Math.round(sAfter / 1024)}KB (.webp)`);
  }
}

run();
```

---

## 8. Checklist de Déploiement & Audit Qualité

1. **Slugs & Noms de fichiers** : Uniquement `kebab-case` ASCII sans accents.
2. **Titres UI & Métadonnées** : Accents complets dans `title`, `headline` et balises `<h1>`.
3. **Core Web Vitals LCP** : Image principale servie en WebP local (< 150 KB) avec `<link rel="preload" as="image" fetchpriority="high">`.
4. **Core Web Vitals CLS** : Balise `<img>` avec attributs explicites `width="680"` `height="382"` et CSS `aspect-ratio: 16 / 9`.
5. **E-E-A-T** : Date de publication sous le H1, date de modification en pied de page.
6. **Rich Results** : Schémas `WebSite`, `BlogPosting` et `BreadcrumbList` validés dans l'outil de test des résultats enrichis Google.
7. **Sitemaps & Robots** : `sitemap-index.xml` valide et `robots.txt` autorisant explicitement les crawlers IA.
