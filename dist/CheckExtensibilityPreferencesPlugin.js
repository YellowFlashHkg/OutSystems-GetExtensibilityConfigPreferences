// Client Action: CheckExtensibilityPreferencesPlugin
// Output: IsAvailable (Boolean)

$parameters.IsAvailable = false;

if (typeof ExtensibilityPreferences !== 'undefined') {
    $parameters.IsAvailable = true;
}

$resolve();
