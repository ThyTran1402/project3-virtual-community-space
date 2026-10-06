# WEB103 Project 3 - *UnityGrid Plaza*

Submitted by: **Thy Tran**

About this web app: **UnityGrid Plaza is a virtual community space for a futuristic city plaza. Users click a building on an illustrated map of the plaza to see the events happening there: concerts at The Echo Dome, talks at Spire Commons, rooftop gardens at Greenleaf Terraces, and markets at Prism Pavilion. Data lives in a Render PostgreSQL database, served by an Express API and displayed with React.**

Time spent: 1.5 hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `events` table**
  - [ ] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [ ] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select a location they would like to view.**
  - [x] *Note: A non-visual list of links to different locations is insufficient.*
- [x] **Each location has a detail page with its own unique URL.**
- [x] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

The following **optional** features are implemented:

- [x] An additional page shows all possible events
  - [x] Users can sort *or* filter events by location.
- [x] Events display a countdown showing the time remaining before that event
  - [x] Events appear with different formatting when the event has passed (ex. negative time, indication the event has passed, crossed out, etc.).

The following **additional** features are implemented:

- [x] Events page can also sort by date (earliest/latest first) and hide past events
- [x] Countdowns update live every second
- [x] Map buildings highlight on hover and are keyboard accessible (Tab + Enter)
- [x] Unknown locations and routes show a "not found" page

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='assets/walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [ScreenToGif](https://www.screentogif.com/)

## Notes

### Database schema

```sql
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL,
  zip VARCHAR(10) NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  image TEXT NOT NULL,
  location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE
);
```

### API routes

| Route | Returns |
| --- | --- |
| `GET /api/locations` | All locations |
| `GET /api/locations/:slug` | One location |
| `GET /api/locations/:slug/events` | Events at that location |
| `GET /api/events` | All events, with location name and slug |
| `GET /api/events/:id` | One event |

### Running locally

1. `npm install`
2. Copy `server/.env.example` to `server/.env` and fill in the values from your Render database's **Connections** section
3. `npm run reset` to create and seed the tables
4. `npm run dev` and open http://localhost:5173

## License

Copyright 2026 Thy Tran

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
