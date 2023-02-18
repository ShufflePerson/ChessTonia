var x11 = require('x11');
var Exposure = x11.eventMask.Exposure;
var PointerMotion = x11.eventMask.PointerMotion;

x11.createClient(function(err, display) {
  if (!err) {
    var X = display.client;
    var root = display.screen[0].root;
    X.require('composite', function(err, Composite) {
      Composite.GetOverlayWindow(root, function(err, overlayId) {
        var gc = X.AllocID();
        X.CreateGC(gc, overlayId);
        var white = display.screen[0].white_pixel;
        var black = display.screen[0].black_pixel;
        cidBlack = X.AllocID();
        cidWhite = X.AllocID();
        X.CreateGC(cidBlack, overlayId, { foreground: black, background: white });
        X.CreateGC(cidWhite, overlayId, { foreground: white, background: black });
        X.ChangeWindowAttributes(overlayId, { eventMask: Exposure | PointerMotion });
        X.MapWindow(overlayId);
        X.on('event', function(ev) {
          if (ev.type == 12) {
            X.PolyFillRectangle(overlayId, cidWhite, [0, 0, display.screen[0].width_in_pixels, display.screen[0].height_in_pixels]);
            X.PolyText8(overlayId, cidBlack, 50, 50, ['Hello, Node.JS!']);
          }
        });
        X.on('error', function(e) {
          console.log(e);
        });
      });
    });
  } else {
    console.log(err);
  }
});