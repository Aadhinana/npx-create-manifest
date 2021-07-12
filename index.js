#!/usr/bin/env node

const prompts = require("prompts");
const fs = require("fs");
const path = require("path");
const { bold } = require("kleur");

// Check for -y passed in
const args = process.argv.slice(2);

(async () => {
  const questions = [
    {
      type: "text",
      name: "name",
      initial: "Chrome Extension",
      message: "Name? ",
    },
    {
      type: "text",
      name: "version",
      initial: "0.0.1",
      message: "Version? ",
      validate: (v) =>
        v.split(".").length === 3 ? true : `Semver is followed here`,
    },
    {
      type: "text",
      name: "description",
      message: "Describe your extension:",
      initial: "A Chrome extension",
    },
    {
      type: (prev) => prev && "text",
      name: "service_worker",
      message: "name your service worker file: ",
      initial: "background",
      format: (v) => `${v}.js`,
    },
    {
      type: "text",
      name: "deafult_title",
      message: "Tool tip text? ",
      initial: "You're hovering over me!",
    },
    {
      type: "text",
      name: "content_script",
      message: "Name of the content script file? ",
      initial: "contentScript",
      format: (v) => `${v}.js`,
    },
    {
      type: "multiselect",
      name: "permissions",
      message: "Select permissions: ",
      hint: false,
      choices: [
        {
          title: "activeTab",
          value: "activeTab",
        },
        {
          title: "alarms",
          value: "alarms",
        },
        {
          title: "background",
          value: "background",
        },
        {
          title: "bookmarks",
          value: "bookmarks",
        },
        {
          title: "browsingData",
          value: "browsingData",
        },
        {
          title: "certificateProvider",
          value: "certificateProvider",
        },
        {
          title: "clipboardRead",
          value: "clipboardRead",
        },
        {
          title: "clipboardWrite",
          value: "clipboardWrite",
        },
        {
          title: "contentSettings",
          value: "contentSettings",
        },
        {
          title: "contextMenus",
          value: "contextMenus",
        },
        {
          title: "cookies",
          value: "cookies",
        },
        {
          title: "debugger",
          value: "debugger",
        },
        {
          title: "declarativeContent",
          value: "declarativeContent",
        },
        {
          title: "declarativeNetRequest",
          value: "declarativeNetRequest",
        },
        {
          title: "declarativeNetRequestFeedback",
          value: "declarativeNetRequestFeedback",
        },
        {
          title: "declarativeWebRequest",
          value: "declarativeWebRequest",
        },
        {
          title: "desktopCapture",
          value: "desktopCapture",
        },
        {
          title: "documentScan",
          value: "documentScan",
        },
        {
          title: "downloads",
          value: "downloads",
        },
        {
          title: "enterprise.deviceAttributes",
          value: "enterprise.deviceAttributes",
        },
        {
          title: "enterprise.hardwarePlatform",
          value: "enterprise.hardwarePlatform",
        },
        {
          title: "enterprise.networkingAttributes",
          value: "enterprise.networkingAttributes",
        },
        {
          title: "enterprise.platformKeys",
          value: "enterprise.platformKeys",
        },
        {
          title: "experimental",
          value: "experimental",
        },
        {
          title: "fileBrowserHandler",
          value: "fileBrowserHandler",
        },
        {
          title: "fileSystemProvider",
          value: "fileSystemProvider",
        },
        {
          title: "fontSettings",
          value: "fontSettings",
        },
        {
          title: "gcm",
          value: "gcm",
        },
        {
          title: "geolocation",
          value: "geolocation",
        },
        {
          title: "history",
          value: "history",
        },
        {
          title: "identity",
          value: "identity",
        },
        {
          title: "idle",
          value: "idle",
        },
        {
          title: "loginState",
          value: "loginState",
        },
        {
          title: "management",
          value: "management",
        },
        {
          title: "nativeMessaging",
          value: "nativeMessaging",
        },
        {
          title: "notifications",
          value: "notifications",
        },
        {
          title: "pageCapture",
          value: "pageCapture",
        },
        {
          title: "platformKeys",
          value: "platformKeys",
        },
        {
          title: "power",
          value: "power",
        },
        {
          title: "printerProvider",
          value: "printerProvider",
        },
        {
          title: "printing",
          value: "printing",
        },
        {
          title: "printingMetrics",
          value: "printingMetrics",
        },
        {
          title: "privacy",
          value: "privacy",
        },
        {
          title: "processes",
          value: "processes",
        },
        {
          title: "proxy",
          value: "proxy",
        },
        {
          title: "scripting",
          value: "scripting",
        },
        {
          title: "search",
          value: "search",
        },
        {
          title: "sessions",
          value: "sessions",
        },
        {
          title: "signedInDevices",
          value: "signedInDevices",
        },
        {
          title: "storage",
          value: "storage",
        },
        {
          title: "system.cpu",
          value: "system.cpu",
        },
        {
          title: "system.display",
          value: "system.display",
        },
        {
          title: "system.memory",
          value: "system.memory",
        },
        {
          title: "system.storage",
          value: "system.storage",
        },
        {
          title: "tabCapture",
          value: "tabCapture",
        },
        {
          title: "tabGroups",
          value: "tabGroups",
        },
        {
          title: "tabs",
          value: "tabs",
        },
        {
          title: "topSites",
          value: "topSites",
        },
        {
          title: "tts",
          value: "tts",
        },
        {
          title: "ttsEngine",
          value: "ttsEngine",
        },
        {
          title: "unlimitedStorage",
          value: "unlimitedStorage",
        },
        {
          title: "vpnProvider",
          value: "vpnProvider",
        },
        {
          title: "wallpaper",
          value: "wallpaper",
        },
        {
          title: "webNavigation",
          value: "webNavigation",
        },
        {
          title: "webRequest",
          value: "webRequest",
        },
        {
          title: "webRequestBlocking",
          value: "webRequestBlocking",
        },
      ],
    },
  ];

  if (args[0] === "-y") {
    return Promise.resolve(
      (result = {
        name: "Chrome Extension",
        version: "0.0.1",
        description: "Describe your extension here",
        deafult_title: "Seen on hover",
        service_worker: "background.js",
        content_script: "contentScript.js",
        permissions: [],
      })
    );
  }

  return await prompts(questions);
})()
  .then((result) => {
    // console.log(result);

    const p = process.cwd();
    const manifestFile = path.join(p, "manifest.json");
    const contentScriptFile = path.join(p, result.content_script);
    const serviceWorkerFile = path.join(p, result.service_worker);

    const permissions = result.permissions.map((a) => `"${a}"`).join(",");

    const data = `{
  "manifest_version": 3,
  "name": "${result.name}",
  "version": "${result.version}",
  "description": "${result.description}",
  "action": {
    "default_title": "${result.deafult_title}",
    "default_popup": "popup.html"
  },
  "background": {
    "service_worker": "${result.service_worker}"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["${result.content_script}"]
    }
  ],
  "permissions": [${permissions}]
}`;

    fs.writeFileSync(manifestFile, data);
    // create files if it does not exist
    fs.closeSync(fs.openSync(contentScriptFile, "w"));
    fs.closeSync(fs.openSync(serviceWorkerFile, "w"));

    console.log(bold("Created manifest.json and other files! 🎉"));
    process.exit(0);
  })
  .catch((err) => console.log(err));
