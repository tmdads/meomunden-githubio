# Meomuden Portfolio Home v2

A GitHub Pages-ready static site built from the Behance portfolio.

## Included improvements

- real gallery images stored locally
- light and dark theme toggle with local persistence
- Open Graph and Twitter metadata
- structured data (Schema.org Person)
- favicon set and web manifest
- responsive gallery with filters and lightbox preview
- GitHub Actions workflow for Pages deployment

## Local preview

### Python

```bash
cd /path/to/meomuden_v2
python3 -m http.server 8080
```

### Docker + nginx

```bash
docker run -d -p 8080:80 -v $(pwd):/usr/share/nginx/html:ro --name meomuden-preview nginx:alpine
```

Open `http://localhost:8080`

## Deploy

1. Push this folder to a GitHub repository.
2. In GitHub, enable **Settings -> Pages -> Source: GitHub Actions**.
3. Push to `main` and the workflow will deploy automatically.
