# Portfolio Website

A clean, responsive portfolio website built with HTML, CSS, and vanilla JavaScript.

## Run locally

Open `index.html` directly in your browser, or use any static file server of
your choice.

## Run with Docker

Build the image:

```bash
docker build -t portfolio-website .
```

Run the container:

```bash
docker run --rm -p 8080:80 portfolio-website
```

Then visit `http://localhost:8080` in your browser.
