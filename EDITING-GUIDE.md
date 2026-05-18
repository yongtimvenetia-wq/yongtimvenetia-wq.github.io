# Editing your portfolio website

This guide explains how to update the site after it's built — no coding experience required. Every change you'll need to make happens in **one file**: `content.js`.

## What's in this folder

```
portfolio-website/
├── index.html              ← "About me" page
├── portfolio.html          ← "Portfolio" page
├── experience.html         ← "Experience" page
├── ai-exploration.html     ← "AI Exploration" page
├── styles.css              ← Visual styling (don't need to touch)
├── content.js              ← ★ THIS IS WHERE YOU EDIT TEXT, LINKS, IMAGES
├── script.js               ← Wiring (don't need to touch)
├── images/                 ← Drop your image files here
└── EDITING-GUIDE.md        ← This file
```

## Previewing the site on your own computer

Double-click `index.html`. It opens in your default browser. The nav links at the top take you to the other pages. You can preview any change to `content.js` instantly — save the file, then reload the browser tab.

## The 5 things you'll do most often

### 1. Edit text

Open `content.js` in any text editor (TextEdit on Mac is fine, but **VS Code** — free at code.visualstudio.com — is much nicer because it color-codes the file). Find the line you want, change the text between the `"double quotes"`, and save.

Example — to change your bio:

```js
about: {
  headline: "Hi, I'm Venetia.",        // ← change this string
  subheadline: "Welcome to my portfolio.",
  bio: "I'm a product manager based in ...",   // ← or this one
  ...
}
```

If you want a paragraph break inside the bio, use `\n\n`:

```js
bio: "First paragraph here.\n\nSecond paragraph here."
```

### 2. Add a project

Inside the `portfolio` section, find the `projects: [ ... ]` block. Copy one of the existing `{ ... }` blocks (including its trailing comma) and paste it below. Then edit its fields.

```js
projects: [
  {
    title: "Project One",
    summary: "Description",
    image: "images/one.jpg",
    link: "https://example.com",
    linkLabel: "View project",
    tags: ["Design", "Research"]
  },
  // ← paste a new { ... } block here
]
```

### 3. Add a link

Anywhere you see a `link: ""` field, paste a URL between the quotes:

```js
link: "https://www.linkedin.com/in/yourprofile/"
```

For email links, use the `mailto:` prefix:

```js
url: "mailto:yongtimvenetia@yahoo.com"
```

### 4. Add an image

1. Drop the image file (JPG or PNG) into the `images/` folder.
2. In `content.js`, reference it by filename, prefixed with `images/`:

   ```js
   image: "images/my-project.jpg"
   ```

Tips: keep images under ~1MB each so the site loads quickly. Resize big phone photos with Preview (Mac) or any free online tool before adding them. Square images work best for the About Me headshot; 16:10 images work best for project tiles.

### 5. Add an experience entry

Inside the `experience` section, find the `roles: [ ... ]` block and add another `{ ... }` block, same pattern as projects. Bullets go inside the `bullets: [ ... ]` array, each one in quotes, separated by commas:

```js
{
  title: "Designer",
  company: "Acme Inc.",
  location: "London, UK",
  dates: "2023 – Present",
  bullets: [
    "Led the rebrand of the product suite.",
    "Mentored two junior designers."
  ]
}
```

## Common mistakes (and how to avoid them)

**Missing comma between items.** Every item inside `[ ... ]` needs a comma after its closing `}` — except the very last one (optional). If the site shows a blank page after an edit, this is usually why.

**Missing closing quote.** Every `"text"` needs both the opening and closing quote. If your text has a quote inside it, escape it with a backslash: `"She said \"hello\"."`.

**Deleted a closing bracket.** If you accidentally delete a `}` or `]`, the page won't render. Compare against the original layout and add it back.

If something breaks, the quickest way to find the problem is to open the page in your browser, right-click → "Inspect" → "Console" tab. Any error will be shown there with a line number pointing into `content.js`.

## Publishing your changes to the live site

Once your site is live on GitHub Pages, updating it means re-uploading your edited files.

### Easiest path: GitHub web UI

1. Go to your repository on github.com (e.g., `github.com/your-username/portfolio`).
2. Click on `content.js`.
3. Click the pencil icon (✏️ "Edit this file").
4. Make your changes directly in the browser, scroll down, and click **Commit changes**.
5. Your live site updates within a minute.

For uploading new images: click into the `images/` folder, click **Add file → Upload files**, drag your image in, and commit.

### Nicer path: GitHub Desktop

Once your site is more active, install **GitHub Desktop** (free, at desktop.github.com). It gives you a visual app where you:

1. Edit files in your local folder however you like.
2. Open GitHub Desktop — it shows what changed.
3. Type a short message like "Updated bio" and click **Commit to main**, then **Push origin**.

Your live site updates within a minute. This is what most non-developers end up using.

## Getting help

If you get stuck:
- Open the file in VS Code — it will underline broken syntax with a red squiggle.
- Compare your edits against the original `content.js` (you can always view the original on GitHub).
- Ask me — I can look at your `content.js` and fix it.
