# Restore the Web Gallery tab

The **Web Gallery** route (`/web`) is intentionally hidden: links were removed from the desktop header and the slide-out menu, and **middleware** redirects anyone who opens `/web` directly to the home page.

The page implementation still lives at `src/app/web/page.tsx` so you can bring the feature back without recovering deleted UI from git.

## 1. Remove the URL block

Delete the file **`src/middleware.ts`**, or edit it and remove:

- The `if (pathname === '/web' || pathname.startsWith('/web/')) { ... }` branch (and the `matcher` for `/web` if nothing else uses this file).

If you delete the whole file, ensure no other routes depended on that middleware.

## 2. Add the link back to the desktop header

File: **`src/components/layout/header.tsx`**

Inside the middle column (the block that contains **Blog**), add a **Magnetic** + **Link** for Web Gallery **above** Blog, matching the existing pattern:

```tsx
<Magnetic>
  <Link href="/web" prefetch={false}>
    Web Gallery
  </Link>
</Magnetic>
```

Place it in the same `<div className="flex flex-col">` as the Blog link.

## 3. Add the item back to the slide-out menu

File: **`src/components/nav/index.tsx`**

In the `links` array, insert an object **after** `projects` and **before** `blog`:

```ts
{
  title: 'web gallery',
  href: '/web'
},
```

The `title` string is what appears in the large italic menu labels (lowercase matches the rest of the nav).

## 4. Verify

1. Run `npm run dev` and confirm **Web Gallery** appears in the header and hamburger menu.
2. Open **`/web`** and confirm the gallery page loads (no redirect to `/`).
3. Optional: run `npm run build` before deploying.

## Files touched when hiding the gallery

| Area              | File                         | What was done                                      |
|-------------------|------------------------------|----------------------------------------------------|
| Desktop nav       | `src/components/layout/header.tsx` | Removed Web Gallery `Link`                   |
| Slide-out menu    | `src/components/nav/index.tsx`     | Removed entry from `links`                   |
| Direct URL        | `src/middleware.ts`                  | Redirects `/web` → `/` (add this file back = block) |

No change was made to **`src/app/web/page.tsx`**; it remains the page source for when you re-enable the route.
