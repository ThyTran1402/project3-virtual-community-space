const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=80`

// Order matters: ids 1-4 line up with venue1-venue4 on the plaza map
export const locations = [
    {
        slug: 'echo-dome',
        name: 'The Echo Dome',
        address: '1 Halo Loop',
        city: 'UnityGrid',
        state: 'TX',
        zip: '75201',
        image: '/locations/echo-dome.jpg',
        description: 'A cluster of glass domes on the west side of the plaza, wired for sound. Home to live music, DJ sets, and open jams.'
    },
    {
        slug: 'spire-commons',
        name: 'Spire Commons',
        address: '100 Meridian Way',
        city: 'UnityGrid',
        state: 'TX',
        zip: '75202',
        image: '/locations/spire-commons.jpg',
        description: 'The tallest tower in the plaza. Its lower floors host talks, hack nights, and community meetups.'
    },
    {
        slug: 'greenleaf-terraces',
        name: 'Greenleaf Terraces',
        address: '42 Canopy Court',
        city: 'UnityGrid',
        state: 'TX',
        zip: '75203',
        image: '/locations/greenleaf-terraces.jpg',
        description: 'Stacked rooftop gardens on the east towers. Come for yoga, seed swaps, and evenings under the stars.'
    },
    {
        slug: 'prism-pavilion',
        name: 'Prism Pavilion',
        address: '8 Facet Street',
        city: 'UnityGrid',
        state: 'TX',
        zip: '75204',
        image: '/locations/prism-pavilion.jpg',
        description: 'A geodesic glass hall that hosts art shows, night markets, and food festivals.'
    }
]

// Times are Central (UnityGrid's local time). A few are in the past on purpose to show the "event has passed" styling.
export const events = [
    { location: 'echo-dome', title: 'Neon Nights Live', starts_at: '2026-09-12T20:00:00-05:00', image: unsplash('1470229722913-7c0e2dbbafd3'), description: 'Synthwave bands light up the main dome.' },
    { location: 'echo-dome', title: 'Plaza Jazz Session', starts_at: '2026-10-17T19:30:00-05:00', image: unsplash('1415201364774-f6f0bb35f28f'), description: 'A late-night jazz quartet with an open jam afterward.' },
    { location: 'echo-dome', title: 'Halloween Dome Rave', starts_at: '2026-10-31T21:00:00-05:00', image: unsplash('1492684223066-81342ee5ff30'), description: 'Costumes encouraged. Three DJs, one very large disco ball.' },
    { location: 'echo-dome', title: 'Winter Solstice Concert', starts_at: '2026-12-21T18:00:00-06:00', image: unsplash('1501281668745-f7f57925c3b4'), description: 'Local bands play out the longest night of the year.' },

    { location: 'spire-commons', title: 'Community Hack Night', starts_at: '2026-09-25T18:00:00-05:00', image: unsplash('1504384308090-c894fdcc538d'), description: 'Bring a laptop and an idea. Pizza provided.' },
    { location: 'spire-commons', title: 'Future of Cities Talk', starts_at: '2026-10-22T18:30:00-05:00', image: unsplash('1540575467063-178a50c2df87'), description: 'Urban planners on how the plaza was designed and what comes next.' },
    { location: 'spire-commons', title: 'Robotics Showcase', starts_at: '2026-11-14T13:00:00-06:00', image: unsplash('1485827404703-89b55fcc595e'), description: 'Student teams demo the robots they built this semester.' },
    { location: 'spire-commons', title: 'Founders Meetup', starts_at: '2027-01-15T18:00:00-06:00', image: unsplash('1517245386807-bb43f82c33c4'), description: 'An informal mixer for people building things in UnityGrid.' },

    { location: 'greenleaf-terraces', title: 'Sunrise Rooftop Yoga', starts_at: '2026-09-20T07:00:00-05:00', image: unsplash('1544367567-0f2fcb009e0b'), description: 'An all-levels flow among the planters as the sun comes up.' },
    { location: 'greenleaf-terraces', title: 'Fall Seed Swap', starts_at: '2026-10-11T10:00:00-05:00', image: unsplash('1416879595882-3373a0480b5b'), description: 'Trade seeds and cuttings, and get tips from the terrace gardeners.' },
    { location: 'greenleaf-terraces', title: 'Stargazing on the Terraces', starts_at: '2026-11-07T20:00:00-06:00', image: unsplash('1419242902214-272b3f66ee7a'), description: 'Telescopes on the top terrace with the astronomy club.' },
    { location: 'greenleaf-terraces', title: 'Morning Meditation', starts_at: '2026-12-05T08:00:00-06:00', image: unsplash('1506126613408-eca07ce68773'), description: 'A quiet guided meditation in the winter garden.' },

    { location: 'prism-pavilion', title: 'Light & Glass Art Show', starts_at: '2026-09-05T17:00:00-05:00', image: unsplash('1531058020387-3be344556be6'), description: 'Installations made to play with the pavilion\'s glass walls.' },
    { location: 'prism-pavilion', title: 'Night Market', starts_at: '2026-10-24T18:00:00-05:00', image: unsplash('1488459716781-31db52582fe9'), description: 'Over fifty vendors selling produce, crafts, and street food.' },
    { location: 'prism-pavilion', title: 'Global Food Festival', starts_at: '2026-11-21T12:00:00-06:00', image: unsplash('1555939594-58d7cb561ad1'), description: 'Dishes from every neighborhood in the grid.' },
    { location: 'prism-pavilion', title: 'New Year\'s Eve Countdown', starts_at: '2026-12-31T21:00:00-06:00', image: unsplash('1513151233558-d860c5398176'), description: 'Ring in 2027 under the glass dome.' }
]
