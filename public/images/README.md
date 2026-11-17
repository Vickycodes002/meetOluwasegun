# Image folders

Drop your real images here, then point to them in `src/lib/content.ts`.
The files currently in these folders are generated placeholders (`.svg`).
Delete a placeholder and add your own file (`.jpg`, `.png`, `.webp`), then
update the extension in `content.ts` to match.

```
public/images/
  brand/            og.(png|jpg)        1200x630 social share image
  hero/
    row-1/          01..06              square 900x900, scrolls left
    row-2/          01..06              square 900x900, scrolls right
  projects/
    <project-slug>/ cover               16:10, 1600x1000 or larger
                    01, 02, 03 ...      case study gallery, 16:10
  about/            01..04              portrait 4:5, 800x1000
  testimonials/                         optional headshots (not used yet)
  logos/                                client logos (not used yet)
public/files/       resume.pdf          linked from the nav, hero and footer
```

Tips
- Export at 2x the display size, keep each file under about 500 KB. Next.js
  will resize and convert to WebP/AVIF for you.
- Folder name under `projects/` must match the `slug` in `content.ts`.
- Write real alt text for every image in `content.ts`.
