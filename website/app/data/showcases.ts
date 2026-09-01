export type Location = [number, number]
export type GlobeColor = [number, number, number]

export interface ShowcaseItem {
  id: string
  location: Location
  label?: string
  sticker?: string
  image?: string
  caption?: string
  rotate?: number
  users?: number
  visitors?: number
  trend?: number
  value?: number
  delay?: number
  emoji?: string
  region?: string
}

export interface ShowcaseArc {
  id: string
  from: Location
  to: Location
  label?: string
  traffic?: string
}

export interface Showcase {
  key: string
  name: string
  items: ShowcaseItem[]
  arcs?: ShowcaseArc[]
  dark?: number
  mapBrightness?: number
  baseColor?: GlobeColor
  markerColor?: GlobeColor
  arcColor?: GlobeColor
  markerSize?: number
  markerElevation?: number
  arcHeight?: number
}

const defaultItems: ShowcaseItem[] = [
  { id: 'default-sf', location: [37.76, -122.44], label: 'San Francisco' },
  { id: 'default-nyc', location: [40.71, -74.01], label: 'New York' },
  { id: 'default-tokyo', location: [35.68, 139.65], label: 'Tokyo' },
  { id: 'default-london', location: [51.51, -0.13], label: 'London' },
  { id: 'default-sydney', location: [-33.87, 151.21], label: 'Sydney' },
  { id: 'default-capetown', location: [-33.92, 18.42], label: 'Cape Town' },
  { id: 'default-dubai', location: [25.2, 55.27], label: 'Dubai' },
  { id: 'default-paris', location: [48.86, 2.35], label: 'Paris' },
  { id: 'default-saopaulo', location: [-23.55, -46.63], label: 'São Paulo' },
]

const defaultArcs: ShowcaseArc[] = [
  { id: 'default-sf-tokyo', from: [37.76, -122.44], to: [35.68, 139.65], label: 'SF → Tokyo' },
  { id: 'default-nyc-london', from: [40.71, -74.01], to: [51.51, -0.13], label: 'NYC → London' },
]

const cdnItems: ShowcaseItem[] = [
  { id: 'cdn-iad', location: [38.95, -77.45], region: 'iad1' },
  { id: 'cdn-sfo', location: [37.62, -122.38], region: 'sfo1' },
  { id: 'cdn-cdg', location: [49.01, 2.55], region: 'cdg1' },
  { id: 'cdn-hnd', location: [35.55, 139.78], region: 'hnd1' },
  { id: 'cdn-syd', location: [-33.95, 151.18], region: 'syd1' },
  { id: 'cdn-gru', location: [-23.43, -46.47], region: 'gru1' },
  { id: 'cdn-sin', location: [1.36, 103.99], region: 'sin1' },
  { id: 'cdn-arn', location: [59.65, 17.93], region: 'arn1' },
  { id: 'cdn-dub', location: [53.43, -6.25], region: 'dub1' },
  { id: 'cdn-bom', location: [19.09, 72.87], region: 'bom1' },
]

const cdnArcs: ShowcaseArc[] = [
  { id: 'cdn-arc-1', from: [38.95, -77.45], to: [49.01, 2.55], traffic: '2.4 TB/s' },
  { id: 'cdn-arc-2', from: [37.62, -122.38], to: [35.55, 139.78], traffic: '1.8 TB/s' },
  { id: 'cdn-arc-3', from: [49.01, 2.55], to: [1.36, 103.99], traffic: '1.2 TB/s' },
  { id: 'cdn-arc-4', from: [38.95, -77.45], to: [-23.43, -46.47], traffic: '890 GB/s' },
  { id: 'cdn-arc-5', from: [35.55, 139.78], to: [-33.95, 151.18], traffic: '720 GB/s' },
  { id: 'cdn-arc-6', from: [49.01, 2.55], to: [19.09, 72.87], traffic: '650 GB/s' },
]

const stickerItems: ShowcaseItem[] = [
  ['paris', 48.86, 2.35, '🥐'],
  ['tokyo', 35.68, 139.65, '🗼'],
  ['nyc', 40.71, -74.01, '🍎'],
  ['rio', -22.91, -43.17, '🎭'],
  ['sydney', -33.87, 151.21, '🐨'],
  ['cairo', 30.04, 31.24, '🐪'],
  ['rome', 41.9, 12.5, '🍕'],
  ['mexico', 19.43, -99.13, '🌮'],
  ['india', 28.61, 77.21, '🐘'],
  ['iceland', 64.15, -21.94, '🧊'],
  ['london', 51.51, -0.13, '☕'],
  ['hawaii', 21.31, -157.86, '🏄'],
  ['amsterdam', 52.37, 4.9, '🚲'],
  ['beijing', 39.9, 116.4, '🐉'],
  ['moscow', 55.75, 37.62, '🪆'],
  ['seoul', 37.57, 126.98, '🎮'],
].map(([id, lat, lon, sticker]) => ({
  id: `sticker-${id}`,
  location: [lat, lon],
  sticker,
})) as ShowcaseItem[]

const labelItems: ShowcaseItem[] = [
  ['paris', 48.86, 2.35, 'visit soon!', -8],
  ['tokyo', 35.68, 139.65, 'amazing food', 5],
  ['nyc', 40.71, -74.01, 'home ♥', -3],
  ['sydney', -33.87, 151.21, 'bucket list', 7],
  ['london', 51.51, -0.13, 'rainy but fun', -5],
  ['rio', -22.91, -43.17, 'samba time!', 4],
  ['moscow', 55.75, 37.62, 'cold but cozy', -6],
  ['dubai', 25.2, 55.27, 'so luxurious', 3],
  ['singapore', 1.35, 103.82, 'foodie heaven', -4],
  ['buenosaires', -34.6, -58.38, 'tango nights', 6],
].map(([id, lat, lon, label, rotate]) => ({
  id: `label-${id}`,
  location: [lat, lon],
  label,
  rotate,
})) as ShowcaseItem[]

const satelliteItems: ShowcaseItem[] = [
  [45, -120],
  [30, 45],
  [-15, 100],
  [60, -30],
  [-40, -60],
  [10, 150],
  [55, 80],
  [-25, 20],
  [70, 25],
  [-5, -75],
  [35, -95],
  [-50, 140],
  [20, -20],
  [50, 120],
  [-30, 70],
  [5, -150],
].map((location, index) => ({ id: `sat-${index + 1}`, location: location as Location }))

const polaroidItems: ShowcaseItem[] = [
  ['sf', 37.78, -122.44, '/showcases/sf.jpg', 'San Francisco', -5],
  ['nyc', 40.71, -74.01, '/showcases/nyc.jpg', 'New York', 4],
  ['tokyo', 35.68, 139.65, '/showcases/tokyo.jpg', 'Tokyo', -3],
  ['sydney', -33.87, 151.21, '/showcases/sydney.jpg', 'Sydney', 6],
  ['beijing', 39.9, 116.4, '/showcases/beijing.jpg', 'Beijing', -4],
  ['egypt', 29.98, 31.13, '/showcases/egypt.jpg', 'Egypt', 3],
  ['pisa', 43.72, 10.4, '/showcases/pisa.jpg', 'Pisa', -6],
  ['singapore', 1.35, 103.82, '/showcases/singapore.jpg', 'Singapore', 5],
].map(([id, lat, lon, image, caption, rotate]) => ({
  id: `polaroid-${id}`,
  location: [lat, lon],
  image,
  caption,
  rotate,
})) as ShowcaseItem[]

const liveItems: ShowcaseItem[] = [
  ['sf', 37.78, -122.44],
  ['london', 51.51, -0.13],
  ['tokyo', 35.68, 139.65],
  ['paris', 48.86, 2.35],
  ['sydney', -33.87, 151.21],
  ['nyc', 40.71, -74.01],
].map(([id, lat, lon]) => ({ id: `live-${id}`, location: [lat, lon] })) as ShowcaseItem[]

const flightItems: ShowcaseItem[] = [
  ['jfk', 40.64, -73.78],
  ['lhr', 51.47, -0.46],
  ['dxb', 25.25, 55.36],
  ['nrt', 35.55, 139.78],
  ['sfo', 37.62, -122.38],
  ['sin', 1.36, 103.99],
  ['syd', -33.95, 151.18],
  ['cdg', 48.86, 2.35],
].map(([id, lat, lon]) => ({ id: `apt-${id}`, location: [lat, lon] })) as ShowcaseItem[]

const flightArcs: ShowcaseArc[] = [
  { id: 'flight-1', from: [40.64, -73.78], to: [51.47, -0.46] },
  { id: 'flight-2', from: [51.47, -0.46], to: [25.25, 55.36] },
  { id: 'flight-3', from: [35.55, 139.78], to: [37.62, -122.38] },
  { id: 'flight-4', from: [1.36, 103.99], to: [-33.95, 151.18] },
  { id: 'flight-5', from: [48.86, 2.35], to: [40.64, -73.78] },
]

const interactiveItems: ShowcaseItem[] = [
  { id: 'hq', location: [37.78, -122.44], label: 'HQ', users: 1420 },
  { id: 'eu', location: [52.52, 13.41], label: 'EU', users: 892 },
  { id: 'asia', location: [35.68, 139.65], label: 'Asia', users: 2103 },
  { id: 'latam', location: [-23.55, -46.63], label: 'LATAM', users: 567 },
  { id: 'mena', location: [25.2, 55.27], label: 'MENA', users: 734 },
  { id: 'oceania', location: [-33.87, 151.21], label: 'APAC', users: 445 },
]

const analyticsItems: ShowcaseItem[] = [
  ['nyc', 40.71, -74.01, 847, 12],
  ['london', 51.51, -0.13, 623, -3],
  ['tokyo', 35.68, 139.65, 412, 8],
  ['paris', 48.86, 2.35, 385, 5],
  ['sydney', -33.87, 151.21, 201, 15],
  ['berlin', 52.52, 13.41, 178, -1],
].map(([id, lat, lon, visitors, trend]) => ({
  id: `vis-${id}`,
  location: [lat, lon],
  visitors,
  trend,
})) as ShowcaseItem[]

const pulseItems: ShowcaseItem[] = [
  { id: 'pulse-1', location: [51.51, -0.13], delay: 0 },
  { id: 'pulse-2', location: [40.71, -74.01], delay: 0.5 },
  { id: 'pulse-3', location: [35.68, 139.65], delay: 1 },
  { id: 'pulse-4', location: [-33.87, 151.21], delay: 1.5 },
]

const weatherItems: ShowcaseItem[] = [
  [50, -100, '☀️'],
  [55, 10, '🌧️'],
  [25, 80, '⛈️'],
  [-10, -60, '🌤️'],
  [65, 100, '❄️'],
  [35, 140, '🌸'],
  [-30, 25, '🌈'],
  [40, -5, '☁️'],
  [-45, 170, '🌊'],
  [15, -130, '🌴'],
  [70, -40, '🌨️'],
  [-20, 130, '🔥'],
  [5, 40, '🌪️'],
  [45, 60, '🌙'],
  [-35, -70, '⭐'],
  [20, -20, '🌞'],
].map(([lat, lon, emoji], index) => ({
  id: `weather-${index + 1}`,
  location: [lat, lon],
  emoji,
})) as ShowcaseItem[]

const barItems: ShowcaseItem[] = [
  ['nyc', 40.71, -74.01, 85],
  ['london', 51.51, -0.13, 62],
  ['tokyo', 35.68, 139.65, 94],
  ['singapore', 1.35, 103.82, 78],
].map(([label, lat, lon, value]) => ({
  id: `bar-${label}`,
  location: [lat, lon],
  label: String(label).toUpperCase(),
  value,
})) as ShowcaseItem[]

const navy: GlobeColor = [0.08, 0.12, 0.22]
const green: GlobeColor = [0, 0.86, 0.51]
const cyan: GlobeColor = [0.21, 0.89, 0.85]
const white: GlobeColor = [0.9, 0.96, 1]

export const showcases: Showcase[] = [
  {
    key: 'default',
    name: 'COBE for Vue',
    items: defaultItems,
    arcs: defaultArcs,
    baseColor: navy,
    markerColor: green,
    arcColor: cyan,
    markerSize: 0.027,
  },
  {
    key: 'cdn',
    name: 'Nuxt Edge',
    items: cdnItems,
    arcs: cdnArcs,
    baseColor: navy,
    markerColor: green,
    arcColor: green,
    markerSize: 0.014,
  },
  {
    key: 'stickers',
    name: 'Stickers',
    items: stickerItems,
    baseColor: navy,
    markerColor: cyan,
    markerSize: 0.025,
  },
  {
    key: 'labels',
    name: 'Labels',
    items: labelItems,
    baseColor: navy,
    markerColor: green,
    markerSize: 0.023,
  },
  {
    key: 'satellites',
    name: 'Satellites',
    items: satelliteItems,
    baseColor: navy,
    markerColor: white,
    markerSize: 0.025,
    markerElevation: 0.13,
  },
  {
    key: 'polaroids',
    name: 'Polaroids',
    items: polaroidItems,
    baseColor: navy,
    markerColor: cyan,
    markerSize: 0.018,
  },
  {
    key: 'live',
    name: 'Live Badge',
    items: liveItems,
    baseColor: navy,
    markerColor: green,
    markerSize: 0.025,
  },
  {
    key: 'flights',
    name: 'Flights',
    items: flightItems,
    arcs: flightArcs,
    baseColor: navy,
    markerColor: white,
    arcColor: cyan,
    markerSize: 0.018,
    arcHeight: 0.28,
  },
  {
    key: 'interactive',
    name: 'Interactive',
    items: interactiveItems,
    baseColor: navy,
    markerColor: green,
    markerSize: 0.028,
  },
  {
    key: 'analytics',
    name: 'Analytics',
    items: analyticsItems,
    baseColor: navy,
    markerColor: green,
    markerSize: 0.035,
  },
  {
    key: 'pulse',
    name: 'Pulse',
    items: pulseItems,
    baseColor: navy,
    markerColor: cyan,
    markerSize: 0.025,
  },
  {
    key: 'weather',
    name: 'Weather',
    items: weatherItems,
    baseColor: navy,
    markerColor: white,
    markerSize: 0.022,
    markerElevation: 0.1,
  },
  {
    key: 'bars',
    name: 'Bars',
    items: barItems,
    baseColor: navy,
    markerColor: green,
    markerSize: 0.022,
  },
]
