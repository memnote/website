if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise((async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},s=(s,a)=>{Promise.all(s.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(s)};self.define=(s,r,c)=>{a[s]||(a[s]=Promise.resolve().then((()=>{let a={};const i={uri:location.origin+s.slice(1)};return Promise.all(r.map((s=>{switch(s){case"exports":return a;case"module":return i;default:return e(s)}}))).then((e=>{const s=c(...e);return a.default||(a.default=s),a}))})))}}define("./sw.js",["./workbox-8778d57b"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/7H1QS4681JrUjloK2sEvQ/_buildManifest.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/7H1QS4681JrUjloK2sEvQ/_ssgManifest.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/chunks/647010edf86d559830c2b3d3bf2f86d607b0ff47.d2feecdd39a974f85383.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/chunks/cd973a175a3c7c37351914d5a5995831765c262e.d7844f7a6bc3869eb91a.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/chunks/commons.08a5356b5c7aae0de011.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/chunks/fcfdfdd0603d82d2eed5669826ea64a695f9c5e3.41d096c9df57028ef18e.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/chunks/framework.29f9e2f3d4a33bafbaa5.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/chunks/main-cceccdba418b847dcc98.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/chunks/pages/404-a02279e2ca6c5f5df795.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/chunks/pages/_app-32c7b18a98c272b96cf5.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/chunks/pages/_error-9c2de55637fb197c71d2.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/chunks/pages/index-d66a0f50d542edcc17b2.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/chunks/pages/posts/%5Bid%5D-c18138b5bbb50bcb40aa.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/chunks/pages/sitemap.xml-67f1080796656575479d.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/chunks/polyfills-feb8a7604fa7fce626b2.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/css/3bc015845e89f185bb67.css",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/_next/static/css/fbce98fc65d9529549a4.css",revision:"7H1QS4681JrUjloK2sEvQ"},{url:"/android-chrome-192x192.png",revision:"495d386c75b509709a4048c8f972d0fa"},{url:"/android-chrome-512x512.png",revision:"0e86d8df39e6519711f56d38630cfeb5"},{url:"/apple-touch-icon.png",revision:"6cc82d11baf1e6cc6d056c62f2ef997f"},{url:"/arrowleft.svg",revision:"349c9bd3cc1f6c45a7ad935e38a688e4"},{url:"/arrowup.svg",revision:"93bbdd595c038c01d91f86009ec9dc14"},{url:"/favicon.ico",revision:"11992e5bc2ae47b9c72a6ec223c16e77"},{url:"/loading.gif",revision:"bb533f76423cab3aa8f798501357e763"},{url:"/manifest.json",revision:"df98e1e070513c3e567dd3123bc11caf"},{url:"/og-image.png",revision:"8ba55c9cecad696530ffd618d6ea0267"},{url:"/static/adatkezeles.svg",revision:"e52e17043b4d2f8a5fdba2bff33812b6"},{url:"/static/algraf.svg",revision:"366cb8b4c4ce8ee8581612a3fd1ca48b"},{url:"/static/ami.svg",revision:"df44628b46cb5d08e2f94b4deb7030b4"},{url:"/static/egyeb.svg",revision:"aad761488eaf80767a06607eae3d2ca5"},{url:"/static/evip.svg",revision:"0a72b1d4c3703ccc6acf061e233a8247"},{url:"/static/hau.svg",revision:"b9e985e1f02de6ba4961d862da646577"},{url:"/static/hero.svg",revision:"884673e973d42bc6c43a1c6f55bb713d"},{url:"/static/hwa.svg",revision:"f0d8ae8ee0e447cf958f49869d0a9a83"},{url:"/static/kodit.svg",revision:"7c5c375ef0c4c57b072c2345bf94f066"},{url:"/static/mia.svg",revision:"4212ec8d92037e5db0b11526d314fb2a"},{url:"/static/oop.svg",revision:"bb6d2a6f05a8aa78280368aaeccd0aed"},{url:"/static/opre.svg",revision:"969aa38b80c261e36b29dfaaf94eec7d"},{url:"/static/progalap.svg",revision:"1e37e4b5b8ba5f8c0b8bbde60f49ca87"},{url:"/static/szoftech.svg",revision:"54b21bd67276380540a5260170eeabee"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
