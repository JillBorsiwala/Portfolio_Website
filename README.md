# Portfolio Website

A high-performance portfolio website built with Express, EJS templates, Tailwind CSS, and vanilla JavaScript.

## Project structure

- `server.js` runs the Express server.
- `views/index.ejs` contains the main page markup.
- `public/` holds static assets (CSS, JS, images).

Replace `public/images/xyz.jpg` and `public/images/certificate1.jpg` with your own
assets, or update the paths in `views/index.ejs`.

## Run locally

From the repository root, run:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the local server:

   ```bash
   npm start
   ```

3. Open http://localhost:3002 in your browser.

## Run with Docker

Build the image:

```bash
docker build -t portfolio-website .
```

Run the container:

```bash
docker run --rm -p 8080:3002 portfolio-website
```

Then visit `http://localhost:8080` in your browser.
