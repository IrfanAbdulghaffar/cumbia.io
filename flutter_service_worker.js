'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "3048ecf3393767342964f53c62dc65ee",
"splash/img/light-2x.png": "744a5dd8959c23c2fc5caa9b7685b11e",
"splash/img/dark-4x.png": "eb2f23eafd348898728e59c188f8b5e6",
"splash/img/light-3x.png": "c4b139180a5441ff8e371e124ce40aeb",
"splash/img/dark-3x.png": "c4b139180a5441ff8e371e124ce40aeb",
"splash/img/light-4x.png": "eb2f23eafd348898728e59c188f8b5e6",
"splash/img/dark-2x.png": "744a5dd8959c23c2fc5caa9b7685b11e",
"splash/img/dark-1x.png": "cce59d5f106f36b055a18eb4e72228c9",
"splash/img/light-1x.png": "cce59d5f106f36b055a18eb4e72228c9",
"splash/splash.js": "123c400b58bea74c1305ca3ac966748d",
"splash/style.css": "9ebbb58421b01c6ef0862b1b77200f5a",
"index.html": "2fa2cb5eb431a6418322dd67c878b362",
"/": "2fa2cb5eb431a6418322dd67c878b362",
"main.dart.js": "547dcdf33c352898746abcc5437492f6",
"favicon.png": "bfd475a0d1a6f0d746012142bfffedda",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "42ea88296d645501a92617a2b30534e9",
"web.iml": "731a1a3080009db8d4572ef3fb1679c3",
"assets/AssetManifest.json": "97e5d212e17ca28fcdd3ad24369aaf50",
"assets/NOTICES": "634042635a964bb921659ad16799758e",
"assets/FontManifest.json": "05c4b363546d3f21f57db0a4619bc653",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/zego_express_engine/assets/ZegoExpressWebFlutterWrapper.js": "269a2438c9a30608cc0dd04b9faa73ae",
"assets/packages/easy_stepper/assets/loading_black.json": "d412b17ec906f03090996d68abab4eca",
"assets/packages/easy_stepper/assets/loading_white.json": "92623d18291ed579cf8bfe3f5fc74213",
"assets/packages/wakelock_plus/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/pdf/privacy.pdf": "40e8793c0c886f3d6256e593c3a85c07",
"assets/assets/img/createAccountBG.jpg": "8cb9a7d1ad47bb5e74322f34d0e58b0f",
"assets/assets/img/icon.png": "bd7886db327a2b695addf57be61c17f3",
"assets/assets/img/aprobado.png": "443b4fc8cbbd581186aeb73729591bb3",
"assets/assets/img/logowhite.png": "4123308ce0c9254e0d68a56374e06404",
"assets/assets/img/dot.png": "d6aaae6741aaae0078adec0df2b76b2b",
"assets/assets/img/bgPhoneNew.png": "e5903bd9d6b1b55d947f49bf1a416f6e",
"assets/assets/img/bgPhone.png": "ff33a7fa6660ecea66cbd5ff0e2b7bef",
"assets/assets/img/checkmark.png": "849ba332d0dc32eeb501171f21a7ca87",
"assets/assets/img/placeholder.png": "b7ccd51e95daf4edba8d27b7e8b7b75b",
"assets/assets/img/photo_1.png": "01e34c0b11b5ec0ff59c56425e5e7eb0",
"assets/assets/img/photo_2.png": "eb8697f6ad7e3504e3b83b25763c13e0",
"assets/assets/img/error.png": "289273cdd8dca5383ded9f74779b4ab3",
"assets/assets/img/logo.png": "22fc6ce8d55ef6d6f2bff69ecf6b75ef",
"assets/assets/img/loginBG.jpg": "77bba30f69f55ae7726e8a4ad54e3837",
"assets/assets/font/light.otf": "bceda3fae660177ae570735feec62811",
"assets/assets/font/book.otf": "eca1317ee8a99162d0d0e2df77330cec",
"assets/assets/font/bold.otf": "722c5f898bbca8b2eb3fce0287688326",
".idea/runConfigurations/main_dart.xml": "2b82ac5d547e7256de51268edfd10dc3",
".idea/libraries/Dart_SDK.xml": "f360bf001720d69c7afcdc39becdfe9d",
".idea/libraries/KotlinJavaRuntime.xml": "4b0df607078b06360237b0a81046129d",
".idea/workspace.xml": "cc5f609be0f96835c87839f62217d14b",
".idea/modules.xml": "6e562bd2e74aaa79b0f10c5b25fab769"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
