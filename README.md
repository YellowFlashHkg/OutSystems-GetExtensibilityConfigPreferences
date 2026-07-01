# cordova-plugin-extensibility-preferences

Reads Cordova `config.xml` preferences set via OutSystems **Extensibility Configurations** at runtime.

## JavaScript API

```javascript
// Batch read
ExtensibilityPreferences.get(['NewBranding', 'EnableBetaFeatures'], function (data) {
    console.log(data.NewBranding);
}, console.error);

// Single string
ExtensibilityPreferences.getString('CustomApiUrl', function (value) {
    console.log(value);
}, console.error);

// Single boolean (default false when missing)
ExtensibilityPreferences.getBoolean('NewBranding', false, function (enabled) {
    console.log(enabled);
}, console.error);
```

## Platforms

- Android
- iOS

## OutSystems

See [STEPS.md](../STEPS.md) and [dist/](../dist/) for wrapper module setup.
