# Extensibility Preferences Plugin — Implementation Steps

This guide walks through packaging the Cordova plugin and wiring it into an OutSystems mobile app.

## Prerequisites

- OutSystems 11 mobile app (Cordova / MABS)
- [Template Plugin](https://www.outsystems.com/forge/) from Forge (wrapper module scaffold)
- Service Studio with access to the home module's **Extensibility Configurations**

---

## Step 1 — Package the Cordova plugin as a ZIP

1. Zip the entire `cordova-plugin-extensibility-preferences` folder.
2. The archive structure must be:

   ```
   cordova-plugin-extensibility-preferences.zip
   └── cordova-plugin-extensibility-preferences/
       ├── plugin.xml
       ├── package.json
       ├── www/
       └── src/
   ```

3. Confirm `plugin.xml` is at `cordova-plugin-extensibility-preferences/plugin.xml` inside the ZIP (not at the root).

---

## Step 2 — Create the OutSystems wrapper module

1. Clone the **Template Plugin** from Forge into a new application (e.g. `ExtensibilityPreferencesPlugin`).
2. Rename the wrapper module meaningfully (e.g. `ExtensibilityPreferences`).
3. On the **Data** tab, add the ZIP as a **Resource**:
   - Resource name: `cordova-plugin-extensibility-preferences.zip`
   - Deploy Action: **Do Nothing**
4. Delete or replace the template plugin's sample actions with the actions below.

---

## Step 3 — Create wrapper Client Actions

Create one Client Action per row. Each action needs a **JavaScript** flow element; paste the corresponding file from the [`dist/`](dist/) folder.

| Client Action | Input parameters | Output parameters | JS source file |
|---|---|---|---|
| `CheckExtensibilityPreferencesPlugin` | — | `IsAvailable` (Boolean) | [`dist/CheckExtensibilityPreferencesPlugin.js`](dist/CheckExtensibilityPreferencesPlugin.js) |
| `GetPreference` | `Key` (Text) | `Value` (Text), `HasValue` (Boolean) | [`dist/GetPreference.js`](dist/GetPreference.js) |
| `GetBooleanPreference` | `Key` (Text), `DefaultValue` (Boolean) | `Value` (Boolean) | [`dist/GetBooleanPreference.js`](dist/GetBooleanPreference.js) |
| `GetPreferences` | `Keys` (Text) | `ValuesJSON` (Text) | [`dist/GetPreferences.js`](dist/GetPreferences.js) |
| `IsNewBrandingEnabled` | — | `IsEnabled` (Boolean) | [`dist/IsNewBrandingEnabled.js`](dist/IsNewBrandingEnabled.js) |

For each action:

1. Set the JavaScript element's **input/output** variables to match the action parameters.
2. Mark the action as **Public**.
3. Add descriptions to the action and its parameters (helps consumers in Service Studio).

`GetPreferences.Keys` is a comma-separated list, e.g. `NewBranding,EnableBetaFeatures`.

---

## Step 4 — Register the plugin in Extensibility Configurations

Open the **home module** properties → **Extensibility Configurations** and merge the plugin reference with your preferences:

```json
{
  "plugin": {
    "resource": "cordova-plugin-extensibility-preferences"
  },
  "preferences": {
    "global": [
      {
        "name": "orientation",
        "value": "portrait"
      },
      {
        "name": "EnableSQLCipherSelfHealing",
        "value": "true"
      },
      {
        "name": "NewBranding",
        "value": true
      }
    ]
  }
}
```

Notes:

- Add any custom preference under `preferences.global` (or `android` / `ios` for platform-specific values).
- Boolean values may be `true` / `false` in JSON; they are stored as strings in `config.xml` at build time.
- Reference the plugin via `plugin.resource` (ZIP), `plugin.url` (git), or `plugin.identifier` (npm) — use only one.

---

## Step 5 — Reference the wrapper in your app

1. Add the wrapper module as a dependency of your mobile app.
2. Before calling plugin actions, check availability:

   ```
   if ExtensibilityPreferences.CheckExtensibilityPreferencesPlugin().IsAvailable then
     // call plugin actions
   end if;
   ```

3. Example usage:

   ```
   // Generic boolean flag
   BetaOn = ExtensibilityPreferences.GetBooleanPreference("EnableBetaFeatures", False).Value

   // Generic string value
   ApiUrl = ExtensibilityPreferences.GetPreference("CustomApiUrl").Value

   // Convenience action for NewBranding
   UseNewBranding = ExtensibilityPreferences.IsNewBrandingEnabled().IsEnabled
   ```

---

## Step 6 — Build and verify

1. Generate a **native mobile build** (browser preview will not load Cordova plugins).
2. In the MABS build output, confirm `config.xml` contains your preferences:

   ```xml
   <preference name="NewBranding" value="true" />
   ```

3. On a device or emulator, call the wrapper actions and verify returned values match extensibility JSON.
4. (Optional) Override preferences per environment in **LifeTime**, rebuild, and re-test.

---

## Adding a new preference later

1. Add a `name` / `value` entry to `preferences.global` in Extensibility Configurations.
2. Rebuild the native app.
3. Read it with `GetPreference` or `GetBooleanPreference` — **no plugin or wrapper changes required**.

Optionally add a named convenience action (like `IsNewBrandingEnabled`) by copying an existing `dist/*.js` file and hardcoding the key.

---

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `IsAvailable` is false | Plugin not registered in extensibility JSON, or testing in browser |
| Value is always default / empty | Preference name typo; rebuild required after JSON change |
| Build fails on plugin install | ZIP structure wrong; `plugin.xml` not at expected path |
| iOS returns null | Key casing — plugin normalizes to lowercase internally; verify name in extensibility JSON |

---

## Project layout

```
ExtensibilityConfig_BoolFlag/
├── STEPS.md                                          ← this file
├── cordova-plugin-extensibility-preferences/         ← Cordova plugin source
│   ├── plugin.xml
│   ├── package.json
│   ├── www/extensibility-preferences.js
│   └── src/
│       ├── android/ExtensibilityPreferencesPlugin.java
│       └── ios/ExtensibilityPreferencesPlugin.{h,m}
└── dist/                                             ← OutSystems JS node code
    ├── CheckExtensibilityPreferencesPlugin.js
    ├── GetPreference.js
    ├── GetBooleanPreference.js
    ├── GetPreferences.js
    └── IsNewBrandingEnabled.js
```
