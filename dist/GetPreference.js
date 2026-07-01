// Client Action: GetPreference
// Input:  Key (Text)
// Output: Value (Text), HasValue (Boolean)

$parameters.Value = '';
$parameters.HasValue = false;

if (typeof ExtensibilityPreferences === 'undefined') {
    $resolve();
    return;
}

ExtensibilityPreferences.getString(
    $parameters.Key,
    function (value) {
        if (value !== null && value !== undefined && value !== '') {
            $parameters.Value = value;
            $parameters.HasValue = true;
        }
        $resolve();
    },
    function () {
        $resolve();
    }
);
