// Client Action: GetBooleanPreference
// Input:  Key (Text), DefaultValue (Boolean)
// Output: Value (Boolean)

$parameters.Value = $parameters.DefaultValue;

if (typeof ExtensibilityPreferences === 'undefined') {
    $resolve();
    return;
}

ExtensibilityPreferences.getBoolean(
    $parameters.Key,
    $parameters.DefaultValue,
    function (value) {
        $parameters.Value = value;
        $resolve();
    },
    function () {
        $resolve();
    }
);
