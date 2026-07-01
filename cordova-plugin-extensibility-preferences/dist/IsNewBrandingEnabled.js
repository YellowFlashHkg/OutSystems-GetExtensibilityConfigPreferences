// Client Action: IsNewBrandingEnabled
// Output: IsEnabled (Boolean)
//
// Convenience wrapper — reads the "NewBranding" preference from extensibility config.
// For other flags, use GetBooleanPreference with the key name instead.

$parameters.IsEnabled = false;

if (typeof ExtensibilityPreferences === 'undefined') {
    $resolve();
    return;
}

ExtensibilityPreferences.getBoolean(
    'NewBranding',
    false,
    function (enabled) {
        $parameters.IsEnabled = enabled;
        $resolve();
    },
    function () {
        $resolve();
    }
);
