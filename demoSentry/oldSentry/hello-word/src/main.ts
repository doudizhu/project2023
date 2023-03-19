import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// createApp(App).use(store).use(router).mount('#app')

import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

const app = createApp(App)
Sentry.init({
  app,
  dsn: "http://7fa08e91caf64acfa26d739bd1fd3e31@localhost:9000/3",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracePropagationTargets: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  logErrors: true,
  release: 'pro@1.0.0'
});
app.use(store)
app.use(router)
app.mount('#app')
