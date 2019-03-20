// Copyright 2015-present 650 Industries. All rights reserved.
#import <Firebase.h>

#import "AppDelegate.h"

// Put your app delegate methods here. Remember to also call methods from EXStandaloneAppDelegate superclass
// in order to keep Expo working. See example below.

// @import UIKit;
// @import Firebase;

@implementation AppDelegate

// - (BOOL)application:(UIApplication *)application
//     didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
//   [FIRApp configure];
//   return YES;
// }

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

@end
