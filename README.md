# Personal Blog

A simple, minimalist blog built with the [Astro](https://astro.build/) framework. This project is designed for easy content creation, where new articles are added simply by creating Markdown files.

## ✨ Features

-   **Minimalist Design**: A clean, content-focused layout with a built-in dark mode.
-   **MDX Support**: Write posts in MDX (`.mdx`) to use components directly in your Markdown.
-   **Dynamic Routing**: Each post's URL is automatically generated from its filename.
-   **Automatic Titling**: The title of each post is derived from its filename.

## 🛠️ Tech Stack

-   **Framework**: [Astro](https://astro.build/)
-   **Content**: [MDX](https://mdxjs.com/)
-   **Package Manager**: [Bun](https://bun.sh/)

## 📂 Project Structure

The project follows a standard Astro structure:

```
.
├── src/
│   ├── content/         # Blog posts are stored here as .md or .mdx files
│   ├── layouts/         # Main site layout and global styles
│   │   └── MainLayout.astro
│   └── pages/           # Site pages and routing
│       ├── [slug].astro # Dynamic route for rendering individual posts
│       └── index.astro  # Homepage that lists all posts
├── public/              # Static assets (fonts, images, etc.)
└── package.json         # Project dependencies and scripts
```

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

You need to have [Bun](https://bun.sh/docs/installation) installed.

### Installation & Development

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/bc1pzzfnxl/AstroBlog.git
    cd AstroBlog
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

3.  **Run the development server:**
    This command starts a local development server at `http://localhost:4321` with hot-reloading.
    ```sh
    bun dev
    ```

## ✍️ How to Use and Modify

### Creating a New Post

To create a new blog post, simply add a new `.md` or `.mdx` file to the `src/content/` directory.

-   The **URL slug** will be the filename (e.g., `my-new-post.mdx` becomes `/my-new-post`).
-   The **post title** is automatically generated from the filename by capitalizing the words (e.g., `my-new-post` becomes "My New Post").

### Customizing Styles

All global CSS is located within a `<style is:global>` tag in the `src/layouts/MainLayout.astro` file. You can modify this file to change the site's appearance.

## 📦 Build and Deployment

### Build for Production

This command builds the static site into the `dist/` directory, ready for deployment.
```sh
bun build
```

### Preview Production Build

To preview the production build locally, run:
```sh
bun preview
```
