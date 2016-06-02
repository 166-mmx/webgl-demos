SystemJS.config({
  baseURL: "/",
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/",
    "app/": "src/"
  },
  bundles: {
    "bundle/main.bundle.js": [
      "src/app.js",
      "src/scripts/main.js",
      "npm:three@0.77.1/build/three.js",
      "npm:three@0.77.1.json",
      "src/styles/main.scss!github:mobilexag/plugin-sass@0.2.1/index.js",
      "github:mobilexag/plugin-sass@0.2.1.json"
    ]
  }
});
