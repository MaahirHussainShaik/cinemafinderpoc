## Bug Fixes

### 1. Cinema click on map did not snap or show info

**Before:**  
Clicking a cinema marker on the map didn’t reliably move the map to that cinema and showed no extra information.

**Now:**  
- Clicking a **marker on the map** recenters/zooms the map on that cinema.  
- A small **info card** appears on the map showing:
  - Cinema name  
  - Address (if available)  
  - Phone number (clickable `tel:` link if available)  
- Clicking the **location icon next to the cinema name in the list** does the same thing:  
  the map snaps to that cinema and the same info card is shown.

---

### 2. Country filter header overlapped while scrolling

**Before:**  
When filtering by country, and list items visually overlapped it when scrolling.

**Now:**  
- The **country/franchise header is fixed (sticky) at the top** of the right-hand column.  
- As you scroll through cinemas, the header stays in place and the list scrolls underneath it.

---

### 3. Map could move anywhere in the world

**Before:**  
You could pan and move the map anywhere across the world, even outside the area where cinemas exist.

**Now:**  
- Both map types are **restricted to a fixed bounding box around Australia and New Zealand**.  
- You can still pan and zoom within this region, but you can’t drag the map off into unrelated parts of the world.

---

### 4. Leaflet map showed only markers, no basemap

**Before:**  
Switching to the **Leaflet** map type only showed markers on a flat background — no map tiles.

**Now:**  
- The Leaflet view uses **OpenStreetMap tiles**, so a full basemap is visible under the markers.  
- Switching between MapLibre and Leaflet works correctly, with both showing:
  - Cinemas as markers  
  - Snapping to selected cinemas  
  - The AU/NZ-only map bounds.
