// Client Action: GetPreferences
// Input:  Keys (Text) — comma-separated preference names, e.g. "NewBranding,EnableBetaFeatures"
// Output: ValuesJSON (Text) — JSON object string, e.g. '{"NewBranding":"true"}'

$parameters.ValuesJSON = '{}';

if (typeof ExtensibilityPreferences === 'undefined') {
    $resolve();
    return;
}

var keys = $parameters.Keys
    .split(',')
    .map(function (key) { return key.trim(); })
    .filter(function (key) { return key.length > 0; });

if (keys.length === 0) {
    $resolve();
    return;
}

ExtensibilityPreferences.get(
    keys,
    function (result) {
        $parameters.ValuesJSON = JSON.stringify(result || {});
        $resolve();
    },
    function () {
        $resolve();
    }
);
