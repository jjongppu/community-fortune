import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "community-fortune",

  initialize() {
    withPluginApi("1.8.0", (api) => {
      api.renderInOutlet("discovery-top", "community-fortune");
    });
  },
};
