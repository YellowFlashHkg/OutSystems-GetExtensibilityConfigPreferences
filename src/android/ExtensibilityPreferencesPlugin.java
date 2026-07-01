package com.outsystems.extensibility;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ExtensibilityPreferencesPlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext)
            throws JSONException {
        switch (action) {
            case "get":
                return getBatch(args.getJSONArray(0), callbackContext);
            case "getString":
                return getSingle(args.getString(0), callbackContext);
            default:
                return false;
        }
    }

    private boolean getSingle(String key, CallbackContext callbackContext) {
        String value = preferences.getString(key, null);
        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, value));
        return true;
    }

    private boolean getBatch(JSONArray keys, CallbackContext callbackContext) throws JSONException {
        JSONObject result = new JSONObject();
        for (int i = 0; i < keys.length(); i++) {
            String key = keys.getString(i);
            String value = preferences.getString(key, null);
            if (value != null) {
                result.put(key, value);
            }
        }
        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, result));
        return true;
    }
}
