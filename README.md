# TrendRadar – Dropshipping Product Tracker

TrendRadar is a Vue 3 + Vite MVP that helps dropshippers discover and evaluate trending products by aggregating metrics from platforms such as AliExpress, TikTok, Google Trends, and Etsy. The application ships with a polished UI, Firebase-ready authentication, and mock data services so you can demo product discovery workflows immediately and wire real data sources later.

## ✨ Features

- **Trending dashboard** with filters, category chips, and growth-based sorting.
- **Responsive product cards** that surface pricing, engagement, rating, viral score, and sparkline growth charts.
- **Product detail view** featuring deep-dive analytics, supplier links, and a 7-day trend chart.
- **Firebase Authentication scaffolding** (email/password & Google) with modal UI.
- **Watchlist management** that persists to `localStorage` and syncs with Firestore when Firebase credentials are provided.
- **Composable data layer** powered by mock data (ready to swap for live APIs or Cloud Functions).
- **TailwindCSS styling** tuned for a clean, tech-forward look using the provided palette.

## 🏗️ Tech Stack

- [Vue 3](https://vuejs.org/) with the Composition API
- [Vite](https://vitejs.dev/) bundler
- [Pinia](https://pinia.vuejs.org/) state management
- [Vue Router](https://router.vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/) + `@headlessui/vue` components
- [Chart.js](https://www.chartjs.org/) via `vue-chartjs`
- [Firebase JS SDK](https://firebase.google.com/docs/web/setup) for Auth & Firestore integration hooks

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

   The app defaults to [http://localhost:5173](http://localhost:5173).

3. **Build for production**

   ```bash
   npm run build
   ```

4. **Preview the production build**

   ```bash
   npm run preview
   ```

## 🔐 Firebase Configuration

The project is ready for Firebase Auth and Firestore. Create a `.env.local` file and supply your Firebase project keys:

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
```

When the keys are not provided, the app gracefully falls back to local mock data and `localStorage` persistence.

## 📦 Mock Data & Extensibility

- Mock product records live in [`src/data/mockProducts.js`](src/data/mockProducts.js).
- Service helpers in [`src/services/api.js`](src/services/api.js) abstract product fetching so you can replace the mock implementation with calls to your backend or Firebase Cloud Functions.
- Viral score is pre-computed within the mock data, but you can update the formula server-side and expose it via your API layer.

## ✅ Next Steps & Integrations

- Connect Firebase Cloud Functions or an Express API to hydrate Firestore with live data from AliExpress, TikTok Creative Center, Google Trends, and Etsy search trends.
- Schedule daily refreshes via Firebase Cloud Scheduler to keep the dashboard current.
- Wire up the optional weekly digest email by consuming stored watchlist data.

## 📁 Project Structure

```
TrendRadar/
├── index.html
├── package.json
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── router/
│   ├── services/
│   ├── store/
│   └── styles/
└── tailwind.config.js
```

## 🛠️ Linting

Run ESLint (configured with Vue 3 recommendations):

```bash
npm run lint
```

---

Feel free to iterate on the UI, replace the mock data layer, and deploy the frontend to Firebase Hosting, Vercel, or any static host.
