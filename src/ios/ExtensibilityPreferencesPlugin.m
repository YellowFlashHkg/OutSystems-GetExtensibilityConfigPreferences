#import "ExtensibilityPreferencesPlugin.h"

@implementation ExtensibilityPreferencesPlugin

- (void)get:(CDVInvokedUrlCommand*)command {
    NSArray *keys = [command argumentAtIndex:0];
    NSMutableDictionary *result = [NSMutableDictionary dictionary];

    for (id keyObject in keys) {
        if (![keyObject isKindOfClass:[NSString class]]) {
            continue;
        }
        NSString *key = (NSString *)keyObject;
        NSString *lookupKey = [key lowercaseString];
        NSString *value = [self.commandDelegate.settings objectForKey:lookupKey];
        if (value != nil) {
            result[key] = value;
        }
    }

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVStatus_OK
                                                messageAsDictionary:result];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getString:(CDVInvokedUrlCommand*)command {
    NSString *key = [command argumentAtIndex:0];
    if (![key isKindOfClass:[NSString class]]) {
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVStatus_ERROR
                                                          messageAsString:@"Key must be a string"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return;
    }

    NSString *lookupKey = [key lowercaseString];
    NSString *value = [self.commandDelegate.settings objectForKey:lookupKey];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVStatus_OK
                                                      messageAsString:value];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
