import { actionStateFormRehydrator } from "./action-state-form/demo";
import { asynchronousRehydrator } from "./asynchronous/demo";
import { accessibleDisclosureRehydrator } from "./accessible-disclosure/demo";
import { automaticBatchingRehydrator } from "./automatic-batching/demo";
import { contactFormRehydrator } from "./validated-form/demo";
import { dataFetchCardRehydrator } from "./data-fetch/demo";
import { deferredSearchRehydrator } from "./deferred-search/demo";
import { errorBoundaryWidgetRehydrator } from "./error-boundary/demo";
import {
  analyticsTrackerRehydrator,
  contextAwareRehydrator,
  contextLegendRehydrator
} from "./extra-context/demo";
import { helloUserRehydrator } from "./hello-user/demo";
import { isolatedCounterRehydrator } from "./isolated-widgets/demo";
import { optimisticCommentsRehydrator } from "./optimistic-updates/demo";
import { searchFilterRehydrator } from "./concurrent-search/demo";
import { showMoreRehydrator } from "./show-more/demo";
import { showMoreTextRehydrator } from "./show-more-text/demo";
import { suspenseGreetingRehydrator } from "./suspense-lazy/demo";
import {
  themeSelectorRehydrator,
  themedWidgetRehydrator
} from "./shared-store/demo";
import { undoCounterRehydrator } from "./undo-counter/demo";

const allRehydrators = {
  AccessibleDisclosure: accessibleDisclosureRehydrator,
  ActionStateForm: actionStateFormRehydrator,
  AsynchronousRehydrator: asynchronousRehydrator,
  AutomaticBatching: automaticBatchingRehydrator,
  ContactForm: contactFormRehydrator,
  DataFetchCard: dataFetchCardRehydrator,
  DeferredSearch: deferredSearchRehydrator,
  ErrorBoundaryWidget: errorBoundaryWidgetRehydrator,
  ContextAware: contextAwareRehydrator,
  ContextLegend: contextLegendRehydrator,
  AnalyticsTracker: analyticsTrackerRehydrator,
  HelloUser: helloUserRehydrator,
  IsolatedCounter: isolatedCounterRehydrator,
  OptimisticComments: optimisticCommentsRehydrator,
  SearchFilter: searchFilterRehydrator,
  ShowMore: showMoreRehydrator,
  ShowMoreText: showMoreTextRehydrator,
  SuspenseGreeting: suspenseGreetingRehydrator,
  ThemeSelector: themeSelectorRehydrator,
  ThemedWidget: themedWidgetRehydrator,
  UndoCounter: undoCounterRehydrator
};

const exampleRegistry = {
  "accessible-disclosure": {
    options: { extra: {} },
    rehydratorNames: ["AccessibleDisclosure"]
  },
  "action-state-form": {
    options: { extra: {} },
    rehydratorNames: ["ActionStateForm"]
  },
  asynchronous: {
    options: { extra: {} },
    rehydratorNames: ["AsynchronousRehydrator"]
  },
  "automatic-batching": {
    options: { extra: {} },
    rehydratorNames: ["AutomaticBatching"]
  },
  "concurrent-search": {
    options: { extra: {} },
    rehydratorNames: ["SearchFilter"]
  },
  "data-fetch": {
    options: { extra: {} },
    rehydratorNames: ["DataFetchCard"]
  },
  "deferred-search": {
    options: { extra: {} },
    rehydratorNames: ["DeferredSearch"]
  },
  "error-boundary": {
    options: { extra: {} },
    rehydratorNames: ["ErrorBoundaryWidget"]
  },
  "extra-context": {
    options: {
      extra: {
        user: { name: "John Smith", role: "admin" },
        features: { betaFeatures: true, analytics: true },
        config: { environment: "staging", trackingId: "ga-demo-001" }
      }
    },
    rehydratorNames: ["ContextAware", "ContextLegend", "AnalyticsTracker"]
  },
  "extra-context-beta": {
    options: {
      extra: {
        user: { name: "Ava Miller", role: "viewer" },
        features: { betaFeatures: true, analytics: false },
        config: { environment: "preview", trackingId: "ga-demo-002" }
      }
    },
    rehydratorNames: ["ContextAware", "ContextLegend", "AnalyticsTracker"]
  },
  "hello-user": {
    options: { extra: { userName: "John Smith" } },
    rehydratorNames: ["HelloUser"]
  },
  "isolated-widgets": {
    options: { extra: {} },
    rehydratorNames: ["IsolatedCounter"]
  },
  "optimistic-updates": {
    options: { extra: {} },
    rehydratorNames: ["OptimisticComments"]
  },
  "show-more": {
    options: { extra: { userName: "John Smith" } },
    rehydratorNames: ["HelloUser", "ShowMore"]
  },
  "show-more-text": {
    options: { extra: {} },
    rehydratorNames: ["ShowMoreText"]
  },
  "shared-store": {
    options: { extra: {} },
    rehydratorNames: ["ThemeSelector", "ThemedWidget"]
  },
  static: {
    options: { extra: {} },
    rehydratorNames: []
  },
  "suspense-lazy": {
    options: { extra: {} },
    rehydratorNames: ["SuspenseGreeting"]
  },
  "undo-counter": {
    options: { extra: {} },
    rehydratorNames: ["UndoCounter"]
  },
  "validated-form": {
    options: { extra: {} },
    rehydratorNames: ["ContactForm"]
  }
};

const getRehydrators = rehydratorNames =>
  rehydratorNames.reduce((acc, name) => {
    acc[name] = allRehydrators[name];
    return acc;
  }, {});

export { allRehydrators, exampleRegistry, getRehydrators };
