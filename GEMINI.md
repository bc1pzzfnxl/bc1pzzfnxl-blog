# GEMINI.md

## Project Overview

This is a personal blog created with the [Astro](https://astro.build/) framework. It's a minimal setup designed for publishing articles written in MDX.

*   **Framework**: Astro
*   **Content**: Posts are written in MDX (`.mdx`), allowing for the use of components within Markdown.
*   **Styling**: Global CSS is defined directly within the main layout file. It includes a basic dark mode.
*   **Dependencies**: Key dependencies include `@astrojs/mdx` for content. The project uses `bun` as its package manager.

## Project Structure

*   `src/content/`: This directory holds all blog posts as individual `.mdx` files.
*   `src/pages/`: This directory contains the main routing logic.
    *   `index.astro`: The homepage, which lists all available articles from `src/content/`.
    *   `[slug].astro`: A dynamic page that renders a single article based on its filename (slug).
*   `src/layouts/MainLayout.astro`: This is the primary layout component, containing the site's header, global styles, and overall HTML structure.

## Building and Running

The project uses `bun` for package management and running scripts.

1.  **Install Dependencies:**
    ```sh
    bun install
    ```

2.  **Run Development Server:**
    Starts a local development server at `http://localhost:4321` with hot-reloading.
    ```sh
    bun dev
    ```

3.  **Build for Production:**
    Builds the static site to the `dist/` directory.
    ```sh
    bun build
    ```

4.  **Preview Production Build:**
    Starts a local server to preview the contents of the `dist/` directory.
    ```sh
    bun preview
    ```

## Development Conventions

*   **Creating a New Post**: To create a new blog post, add a new `.mdx` file to the `src/content/` directory. The filename will be used as the URL slug (e.g., `my-new-post.mdx` becomes `/my-new-post`).
*   **Post Titles**: The title of a blog post is automatically generated from its filename by capitalizing the words.
*   **Styling**: All global styles are located in a `<style is:global>` tag within `src/layouts/MainLayout.astro`.
