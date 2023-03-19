import Vue from 'vue'
import App from './App.vue'
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import * as Router from "vue-router";

Vue.use(Router);
const router = new Router({
  // ...
});
Sentry.init({
  Vue,
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
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
