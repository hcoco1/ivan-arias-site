---
title:  "From a simple map to a full Web GIS system."
description: "A new stage in my journey: learning Web GIS and full-stack web development by directing Claude Code instead of writing every line myself."
pubDate: "Apr 6 2026"
heroImage: "https://images.unsplash.com/photo-1586449480537-3a22cf98b04c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
Comments: True
badge: "Web App"
tags: ["web-gis","leaflet", "python", "claude-code"]

---

Maps are everywhere in modern software, but building one from scratch teaches you a lot about performance, data, and user experience. In this post, I want to share a small project I built: a **Web GIS application** that shows oil and gas infrastructure data on an interactive map.

The project is called **map-gis**, and you can find the code on [GitHub](https://github.com/hcoco1/map-gis).

## What is the project about?

The app shows three types of geographic data on a map of the Netherlands:

- **Boreholes** (points) – wells with a status, a depth, and an operator
- **Pipelines** (lines) – connections between locations, with material and pressure information
- **Licenses** (polygons) – areas operated by different companies

The data is not real. It comes from a local mock database, but the app is built the same way a real production GIS tool would work. This makes it a great learning project and a solid base for a real-world version later.

## The tech behind it

The app is intentionally simple on the technology side:

- **Vanilla JavaScript** – no frameworks, no build tools
- **[Leaflet](https://leafletjs.com/)** – a lightweight, popular library for interactive maps
- **HTML5 and CSS3** – for the layout and styling
- **GeoJSON** – the standard format for storing geographic features

There is no backend server. All the "API" calls happen locally, filtering data in the browser. This design makes the app easy to run and easy to understand, while still following the same patterns a real API-based app would use.

## Key features

### Viewport-based loading

Instead of loading all the data at once, the app only loads the features that are visible in the current map view. Every time the user moves or zooms the map, the app recalculates the bounding box (the rectangle that defines what's visible) and filters the data again. This is a common technique in real GIS systems, where datasets can be huge and loading everything at once would be too slow.

### Smart rendering by zoom level

Not everything needs to be visible at every zoom level. In this app:

- Boreholes are always shown, at any zoom level
- Pipelines only appear from zoom level 8 and above
- Licenses only appear from zoom level 7 and above

This keeps the map clean when zoomed out, and adds detail as the user zooms in — exactly like real map applications behave.

### Filtering and color coding

Users can filter boreholes by status: **Completed**, **Drilling**, or **Abandoned**. Each status also has its own color on the map, so it's easy to understand the situation at a glance:

- 🟢 Green: Completed
- 🟠 Orange: Drilling
- 🔴 Red: Abandoned
- 🔵 Blue: Other

### Interactive popups and a live info panel

Clicking on any feature opens a popup with details, like the borehole's name, year, and status, or a license's operator and area size. A small control panel on the map also shows the current filter, the number of features visible, a loading indicator, and a color legend.

### Performance optimizations

Even though the app is small, it includes several optimizations that matter in bigger projects too:

- **Request deduplication** – if the map view hasn't really changed, the app skips a new data request
- **Debounced map events** – the app waits a short moment after the user stops moving the map before it reloads data, instead of reacting to every tiny movement
- **Stale response handling** – if a new request starts before an old one finishes, the app ignores the old, outdated result

## How it works, step by step

1. The user moves or zooms the map
2. The app reads the current bounding box (the visible area)
3. `api.js` filters the local GeoJSON data based on that bounding box and any active filters
4. The filtered data is sent back through the same functions a real API would use
5. The map layers update with the new data

Because the "API" functions are async and return data in the same shape a real backend would, swapping the mock database for a real server in the future would need very little change to the rest of the app.

## What I learned

This project was a good exercise in several areas:

- Designing a **viewport-based system**, where the visible area decides what data to load
- Mocking a backend "contract" using local GeoJSON data, so the frontend logic can be built and tested without a real server
- Managing **asynchronous data flows** in a frontend app
- Separating concerns cleanly between UI, data access, and the data itself
- Thinking about how a small demo can scale into something closer to a real GIS product

## What's next

There are a few improvements I would like to add in the future:

- **Marker clustering**, to handle large numbers of boreholes without slowing down the map
- **Vector tiles**, for better performance at a larger scale
- **Advanced filtering**, such as by year, company, or depth
- **User authentication and saved views**, so users can keep their own custom map setups

## Try it yourself

The project is easy to run locally. Just clone the repository and serve it with any simple HTTP server:

```sh
git clone https://github.com/hcoco1/map-gis.git
cd map-gis
python3 -m http.server
```

Then open `http://localhost:8000` in your browser, and you'll see the map with all the data layers ready to explore.

---

If you're interested in GIS, frontend performance, or just want to see how a map-based app is structured, feel free to check out the code and experiment with it.
