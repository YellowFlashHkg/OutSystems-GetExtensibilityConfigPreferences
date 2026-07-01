# OutSystems JavaScript Nodes

Paste each file into the **JavaScript** flow element of the matching Client Action in your wrapper module.

## Actions

| File | Client Action name | Parameters |
|---|---|---|
| `CheckExtensibilityPreferencesPlugin.js` | `CheckExtensibilityPreferencesPlugin` | Out: `IsAvailable` (Boolean) |
| `GetPreference.js` | `GetPreference` | In: `Key` (Text) — Out: `Value` (Text), `HasValue` (Boolean) |
| `GetBooleanPreference.js` | `GetBooleanPreference` | In: `Key` (Text), `DefaultValue` (Boolean) — Out: `Value` (Boolean) |
| `GetPreferences.js` | `GetPreferences` | In: `Keys` (Text, comma-separated) — Out: `ValuesJSON` (Text) |
| `IsNewBrandingEnabled.js` | `IsNewBrandingEnabled` | Out: `IsEnabled` (Boolean) |

## Wiring tips

1. In Service Studio, create the action parameters first, then open the JavaScript node and map them as input/output variables.
2. The Cordova global exposed by the plugin is `ExtensibilityPreferences` (matches `clobbers` in `plugin.xml`).
3. All async actions call `$resolve()` on both success and error paths so the OutSystems flow continues reliably.
4. See [STEPS.md](../STEPS.md) for full packaging and extensibility configuration instructions.
