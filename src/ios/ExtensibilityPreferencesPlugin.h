#import <Cordova/CDV.h>

@interface ExtensibilityPreferencesPlugin : CDVPlugin

- (void)get:(CDVInvokedUrlCommand*)command;
- (void)getString:(CDVInvokedUrlCommand*)command;

@end
