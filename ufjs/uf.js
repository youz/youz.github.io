/*!
 * UserFilter for canvas
 * version: 0.1
 *
 * Copyright 2011, Y.Ushiki
 * released under the MIT license.
 *
 * git repository available at
 * https://github.com/youz/ufjs/
 */

var UserFilter = function () {
  // constants
  var rmin = gmin = bmin = amin = cmin = 0;
  var rmax = gmax = bmax = amax = cmax = 255;
  var R = G = B = A = C = 255;
  /*
  var imin = 0, umin = -56, vmin = -78;
  var imax = 255, umax = 56, vmax = 78;
   */
  var xmin = ymin = mmin = dmin = 0;
  var D = 1024, dmax = 1023;
  var Z = 4, zmin = 0, zmax = 3;

  // canvas size
  var X, xmax, Y, ymax, M, mmax;

  // filter functions for each channel
  var filters = new Array(4);

  // controller values (for ctl, val, map)
  var ctls = [0, 0, 0, 0, 0, 0, 0, 0];

  // filter functions
  function ctl (i) {
    return ctls[i];
  }

  function val (i, a, b) {
    return a + ctls[i] * (b - a) / 255;
  }

  function map (i, n) {
    if (n <= ctls[2*i+1]) {
      return 0;
    } else if (n >= ctls[2*i]) {
      return 255;
    } else if (ctls[2*i+1] < n && n < ctls[2*i]) {
      return (n - ctls[2*i+1]) * 255 / (ctls[2*i] - ctls[2*i+1]);
    } else {
      return 0;
    }
  }
  
  var prev = [];
  function src (x, y, z) {
    if (x < 0 || x >= X || y < 0 || y >= Y) return 0;
    return prev[(Math.floor(x) + Math.floor(y) * X) * 4 + z];
  }

  function rad (d, m, z) {
    return src(Math.floor(r2x(d, m)), Math.floor(r2y(d, m)), z);
  }

  function _cnv (x, y, z) {
    return function (m11, m12, m13, m21, m22, m23, m31, m32, m33, d) {
      return (m11 * src(x-1, y-1, z) +
              m12 * src(x, y-1, z) +
              m13 * src(x+1, y-1, z) +
              m21 * src(x-1, y, z) +
              m22 * src(x, y, z) +
              m23 * src(x+1, y, z) +
              m31 * src(x-1, y+1, z) +
              m32 * src(x, y+1, z) +
              m33 * src(x+1, y+1, z)) / d;
    };
  }

  var min = Math.min;
  var max = Math.max;
  var abs = Math.abs;

  function add (a, b, c) { return min(a + b, c); }
  function dif (a, b)    { return abs(a - b); }
  function sub (a, b, c) { return max(dif(a, b), c); }

  function rnd (a, b) {
    return a + Math.floor(Math.random() * (b - a + 1));
  }

  function mix (a, b, n, d) {
    return d == 0 ? 0 : (a * n + b * (d - n)) / d;
  }

  function scl (a, il, ih, ol, oh) {
    if (a < il) {
      return ol;
    } else if (a > ih) {
      return oh;
    } else if (il == ih) {
      return ol;
    } else {
      return ol + (a - il) * (oh - ol) / (ih - il);
    }
  }

  function sqr (x) {
    return (x < 0) ? 0 : Math.sqrt(x);
  }

  var sintbl = [];
  for (var d = 0; d < 1024; ++d) {
    sintbl[d] = Math.sin(Math.PI * d / 512) * 1024;
  }

  function sin (x) {
    return sintbl[x & 1023];
  }
  function cos (x) { return sintbl[(x + 256) & 1023]; }
  function tan (x) {
    var _cos = cos(x);
    return (_cos == 0) ? 0 : 1024 * sintbl[x & 1023] / _cos;
  }

  function r2x (d, m) {
    return m * cos(d) / 1024;
  }

  function r2y (d, m) {
    return m * sin(d) / 1024;
  }

  function c2d (x, y) {
    var dx = x - X/2;
    var dy = Y/2 - y;
    return Math.atan2(dy, dx) * 512 / Math.PI + (dy > 0 ? 0 : 1024);
  }

  function c2m (x, y) {
    var dx = x - X/2;
    var dy = Y/2 - y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  var temp = new Array(256);
  function put (v, i) {
    if (i < 0 || i > 255) return 0;
    temp[i >> 0] = v;
    return v;
  }

  function get (i) {
    return (i < 0 || i > 255) ? 0 : temp[i];
  }

  // additions
  var PI = Math.PI;
  function rad2d (rad) { return (rad * 512 / PI) & 1023; }
  function deg2d (deg) { return (deg * 1024 / 360) & 1023; }
  var ceil = Math.ceil;
  var floor = Math.floor;
  var log = Math.log;
  var exp = Math.exp;
  var pow = Math.pow;
  
  // for animation
  var f = 0;  // frame counter
  var t = 0;  // elapsed time from this.start() (msec)

  var builtins = [
    'R','r','rmin','rmax','G','g','gmin','gmax','B','b','bmin','bmax',
    'A','a','amin','amax','C','c','cmin','cmax','Z','z','zmin','zmax',
    'X','x','xmin','xmax','Y','y','ymin','ymax',
    'D','d','dmin','dmax','M','m','mmin','mmax',
    'ctl','val','map','src','rad','cnv','min','max',
    'abs','add','dif','sub','rnd','mix','scl',
    'sqr','sin','cos','tan','r2x','r2y','c2d','c2m','put','get',
    'PI','rad2d','deg2d','ceil','floor','log','exp','pow',
    'f','t'
    ];

  var user_functions = {};
  
  function make_func (formula) {
    var identifiers = builtins.slice(0);
    for (var k in user_functions) { identifiers.push(k); }
    var checker = new RegExp('^(' + identifiers.join('|') + '|' + ')$');

    var tokens = formula.split(/[\s,?:&|=!<>()*%+/~^-]+/);
    for (var i in tokens) {
      if (isNaN(tokens[i]) && !tokens[i].match(checker)) {
        throw "ILLEGAL TOKEN: '" + tokens[i] + "'";
      }
    }
    var funcstr = "(function (x,y,m,d,r,g,b,a,c,z) { ";
    if (formula.match(/cnv/)) funcstr += "var cnv = _cnv(x, y, z);";
    for (var name in user_functions) {
      if (typeof user_functions[name] == "string") {
        funcstr += "var " + name + " = " + user_functions[name] + ";";
      } else {
        funcstr += "var " + name + " = user_functions['" + name + "'];";
      }
    }
    funcstr += " var _; _=" + formula + ";return _; })";
    return eval(funcstr);
  }

  function apply_filter (canvas) {
    X = canvas.width;
    Y = canvas.height;
    xmax = X - 1;
    ymax = Y - 1;
    M = Math.floor(c2m(0, 0));
    mmax = M - 1;

    var ctx = canvas.getContext('2d');
    var imagedata = ctx.getImageData(0, 0, X, Y);
    var data = imagedata.data;

    // for 'src' function
    prev = [].slice.call(data, 0);

    for (var offset=0, y=0; y < Y; ++y) {
      for (var x=0; x < X; ++x) {
        var m = c2m(x, y);
        var d = c2d(x, y);
        var r = data[offset];
        var g = data[offset+1];
        var b = data[offset+2];
        var a = data[offset+3];
        /*
        var i = (76*r + 150*g + 29*b) / 256;
        var u = (-19*r - 37*g + 56*b) / 256;
        var v = (78*r - 65*g - 13*b) / 256;
         */
        for (var z=0; z<4; ++z) {
          try {
            data[offset + z] = filters[z](x, y, m, d, r, g, b, a, data[offset + z], z);
          } catch (e) {
            throw "Error in formula: " + "RGBA"[z] + "\n" + e;
          }
        }
        offset += 4;
      }
    }
    ctx.putImageData(imagedata, 0, 0);
    return true;
  }

  // public members
  this.setFormula = function () {
    for (var i=0; i<4; ++i) {
      try {
        filters[i] = make_func(arguments[i]);
      } catch (e) {
        throw "Error in formula: " + "RGBA"[i] + "\n" + e;
      }
    }
    return true;
  };
  
  this.controller = ctls;
  this.apply = function (elm) {
    if (elm.constructor == HTMLCanvasElement) {
      return apply_filter(elm);
    } else if (elm.constructor == HTMLImageElement) {
      var e = document.createElement('canvas');
      e.width = elm.width;
      e.height = elm.height;
      e.getContext('2d').drawImage(elm, 0, 0);
      var result = apply_filter(e);
      if (result) elm.src = e.toDataURL();
      return result;
    } else {
      throw "filter can not apply to " + elm.toString();
    }
  };
  this.check = function (formula) {
    try { make_func(formula); } catch (e) { return e; }
    return "ok";
  };
  this.addFunction = function (name, func) {
    user_functions[name] = func;
  };
  
  // animation
  var timer;
  this.reset_timer = function () { f = 0; };
  this.start = function (canvas, interval) {
    clearInterval(timer);
    var start_time = new Date();
    f = 0;
    timer = setInterval(
      function () {
        f++; t = new Date() - start_time;
        if (!apply_filter(canvas)) clearInterval(timer);
      }, interval || 33);
  };
  this.stop = function () {
    clearInterval(timer);
  };

  // initialize
  if (arguments.length == 4) {
    this.setFormula.apply(this, arguments);
  } else {
    this.setFormula("r", "g", "b", "a");
  }
};
