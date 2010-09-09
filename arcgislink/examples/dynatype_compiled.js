(function(){/*
 http://google-maps-utility-library-v3.googlecode.com
*/
var i, j = Math.PI / 180, l = 0;
window.ags_jsonp = window.ags_jsonp || {};
var m = google.maps, o, q, r, s = {Z:null, S:false}, t = {}, u = {};
function v(a, b, c) {
  var d = b === "" ? 0 : a.indexOf(b);
  return a.substring(d + b.length, c === "" ? a.length : a.indexOf(c, d + b.length))
}
function w(a) {
  return a && typeof a === "string"
}
function x(a, b, c) {
  if(a && b) {
    var d;
    for(d in a) {
      if(c || !(d in b)) {
        b[d] = a[d]
      }
    }
  }
  return b
}
function y() {
  m.event.trigger.apply(this, arguments)
}
function z(a, b) {
  var c = "";
  if(a) {
    c += a.getTime() - a.getTimezoneOffset() * 6E4
  }
  if(b) {
    c += ", " + (b.getTime() - b.getTimezoneOffset() * 6E4)
  }
  return c
}
function A(a, b) {
  b = Math.min(Math.max(b, 0), 1);
  if(a) {
    var c = a.style;
    if(typeof c.opacity !== "undefined") {
      c.opacity = b
    }
    if(typeof c.filters !== "undefined") {
      c.filters.alpha.opacity = Math.floor(100 * b)
    }
    if(typeof c.filter !== "undefined") {
      c.filter = "alpha(opacity:" + Math.floor(b * 100) + ")"
    }
  }
}
function aa(a) {
  var b = "";
  for(var c in a) {
    if(a.hasOwnProperty(c)) {
      if(b.length > 0) {
        b += ";"
      }
      b += c + ":" + a[c]
    }
  }
  return b
}
function ba() {
  if(typeof XMLHttpRequest === "undefined") {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0")
    }catch(a) {
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0")
    }catch(b) {
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP")
    }catch(c) {
    }
    throw new Error("This browser does not support XMLHttpRequest.");
  }else {
    return new XMLHttpRequest
  }
}
var B = "esriGeometryPoint", C = "esriGeometryMultipoint", D = "esriGeometryPolyline", E = "esriGeometryPolygon", F = "esriGeometryEnvelope";
function ca(a) {
  var b = a;
  if(a && a.splice && a.length > 0) {
    b = a[0]
  }
  if(b instanceof m.LatLng || b instanceof m.Marker) {
    return a && a.splice && a.length > 1 ? C : B
  }else {
    if(b instanceof m.Polyline) {
      return D
    }else {
      if(b instanceof m.Polygon) {
        return E
      }else {
        if(b instanceof m.LatLngBounds) {
          return F
        }else {
          if(b.x !== undefined && b.y !== undefined) {
            return B
          }else {
            if(b.points) {
              return C
            }else {
              if(b.paths) {
                return D
              }else {
                if(b.rings) {
                  return E
                }
              }
            }
          }
        }
      }
    }
  }
  return null
}
function G(a) {
  var b = a;
  if(a && a.splice && a.length > 0) {
    b = a[0]
  }
  if(b && b.splice && b.length > 0) {
    b = b[0]
  }
  if(b instanceof m.LatLng || b instanceof m.Marker || b instanceof m.Polyline || b instanceof m.Polygon || b instanceof m.LatLngBounds) {
    return true
  }
  return false
}
function H(a, b) {
  for(var c = [], d, e = 0, f = a.getLength();e < f;e++) {
    d = a.getAt(e);
    c.push("[" + d.lng() + "," + d.lat() + "]")
  }
  b && c.length > 0 && c.push("[" + a.getAt(0).lng() + "," + a.getAt(0).lat() + "]");
  return c.join(",")
}
function I(a) {
  var b;
  if(typeof a === "object") {
    if(a && a.splice) {
      b = [];
      for(var c = 0, d = a.length;c < d;c++) {
        b.push(I(a[c]))
      }
      return"[" + b.join(",") + "]"
    }else {
      if(G(a)) {
        var e;
        d = "{";
        switch(ca(a)) {
          case B:
            e = a && a.splice ? a[0] : a;
            if(e instanceof m.Marker) {
              e = e.getPosition()
            }
            d += "x:" + e.lng() + ",y:" + e.lat();
            break;
          case C:
            c = [];
            for(b = 0;b < a.length;b++) {
              e = a[b] instanceof m.Marker ? a[b].getPosition() : a[b];
              c.push("[" + e.lng() + "," + e.lat() + "]")
            }
            d += "points: [" + c.join(",") + "]";
            break;
          case D:
            c = [];
            a = a && a.splice ? a : [a];
            for(b = 0;b < a.length;b++) {
              c.push("[" + H(a[b].getPath()) + "]")
            }
            d += "paths:[" + c.join(",") + "]";
            break;
          case E:
            c = [];
            e = a && a.splice ? a[0] : a;
            a = e.getPaths();
            for(b = 0;b < a.getLength();b++) {
              c.push("[" + H(a.getAt(b), true) + "]")
            }
            d += "rings:[" + c.join(",") + "]";
            break;
          case F:
            e = a && a.splice ? a[0] : a;
            d += "xmin:" + e.getSouthWest().lng() + ",ymin:" + e.getSouthWest().lat() + ",xmax:" + e.getNorthEast().lng() + ",ymax:" + e.getNorthEast().lat();
            break
        }
        d += ", spatialReference:{wkid:4326}";
        d += "}";
        return d
      }else {
        if(a.toJSON) {
          return a.toJSON()
        }else {
          b = "";
          for(c in a) {
            if(a.hasOwnProperty(c)) {
              if(b.length > 0) {
                b += ", "
              }
              b += c + ":" + I(a[c])
            }
          }
          return"{" + b + "}"
        }
      }
    }
  }
  return a.toString()
}
function J(a) {
  var b = "";
  if(a) {
    a.f = a.f || "json";
    for(var c in a) {
      if(a.hasOwnProperty(c) && a[c] !== null && a[c] !== undefined) {
        var d = I(a[c]);
        b += c + "=" + (escape ? escape(d) : encodeURIComponent(d)) + "&"
      }
    }
  }
  return b
}
function K(a, b, c, d) {
  var e = "ags_jsonp_" + l++ + "_" + Math.floor(Math.random() * 1E6), f = null;
  b = b || {};
  b[c || "callback"] = "ags_jsonp." + e + " && ags_jsonp." + e;
  b = J(b);
  var k = document.getElementsByTagName("head")[0];
  if(!k) {
    throw new Error("document must have header tag");
  }
  window.ags_jsonp[e] = function() {
    window.ags_jsonp[e] && delete window.ags_jsonp[e];
    f && k.removeChild(f);
    f = null;
    d.apply(null, arguments);
    y(u, "jsonpend", e)
  };
  if((b + a).length < 2E3 && !s.S) {
    f = document.createElement("script");
    f.src = a + (a.indexOf("?") === -1 ? "?" : "&") + b;
    f.id = e;
    k.appendChild(f)
  }else {
    c = window.location;
    c = c.protocol + "//" + c.hostname + (!c.port || c.port === 80 ? "" : ":" + c.port + "/");
    var h = true;
    if(a.toLowerCase().indexOf(c.toLowerCase()) !== -1) {
      h = false
    }
    if(s.S) {
      h = true
    }
    if(h && !s.Z) {
      throw new Error("No proxyUrl property in Config is defined");
    }
    var g = ba();
    g.onreadystatechange = function() {
      if(g.readyState === 4) {
        if(g.status === 200) {
          eval(g.responseText)
        }else {
          throw new Error("Error code " + g.status);
        }
      }
    };
    g.open("POST", h ? s.Z + "?" + a : a, true);
    g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    g.send(b)
  }
  y(u, "jsonpstart", e);
  return e
}
u.ha = function(a, b, c, d) {
  K(a, b, c, d)
};
u.R = function(a, b) {
  if(b && b.splice) {
    for(var c, d = 0, e = b.length;d < e;d++) {
      if((c = b[d]) && c.splice) {
        u.R(a, c)
      }else {
        G(c) && c.setMap(a)
      }
    }
  }
};
u.la = function(a, b) {
  u.R(null, a);
  if(b) {
    a.length = 0
  }
};
function L(a) {
  a = a || {};
  this.wkid = a.wkid;
  this.wkt = a.wkt
}
L.prototype.forward = function(a) {
  return a
};
L.prototype.n = function(a) {
  return a
};
L.prototype.q = function() {
  return 360
};
L.prototype.toJSON = function() {
  return"{" + (this.wkid ? " wkid:" + this.wkid : "wkt: '" + this.wkt + "'") + "}"
};
function M(a) {
  a = a || {};
  L.call(this, a)
}
M.prototype = new L;
function N(a) {
  a = a || {};
  L.call(this, a);
  var b = a.K, c = a.O * j, d = a.P * j, e = a.L * j;
  this.a = a.r / a.unit;
  this.e = a.p * j;
  this.i = a.I;
  this.j = a.J;
  a = 1 / b;
  b = 2 * a - a * a;
  this.d = Math.sqrt(b);
  a = this.k(c, b);
  b = this.k(d, b);
  e = O(this, e, this.d);
  c = O(this, c, this.d);
  d = O(this, d, this.d);
  this.b = Math.log(a / b) / Math.log(c / d);
  this.G = a / (this.b * Math.pow(c, this.b));
  this.h = this.t(this.a, this.G, e, this.b)
}
N.prototype = new L;
N.prototype.k = function(a, b) {
  var c = Math.sin(a);
  return Math.cos(a) / Math.sqrt(1 - b * c * c)
};
function O(a, b, c) {
  a = c * Math.sin(b);
  return Math.tan(Math.PI / 4 - b / 2) / Math.pow((1 - a) / (1 + a), c / 2)
}
i = N.prototype;
i.t = function(a, b, c, d) {
  return a * b * Math.pow(c, d)
};
i.s = function(a, b, c) {
  c = b * Math.sin(c);
  return Math.PI / 2 - 2 * Math.atan(a * Math.pow((1 - c) / (1 + c), b / 2))
};
i.N = function(a, b, c) {
  var d = 0;
  c = c;
  for(var e = this.s(a, b, c);Math.abs(e - c) > 1.0E-9 && d < 10;) {
    d++;
    c = e;
    e = this.s(a, b, c)
  }
  return e
};
i.forward = function(a) {
  var b = a[0] * j;
  a = this.t(this.a, this.G, O(this, a[1] * j, this.d), this.b);
  b = this.b * (b - this.e);
  return[this.i + a * Math.sin(b), this.j + this.h - a * Math.cos(b)]
};
i.n = function(a) {
  var b = a[0] - this.i, c = a[1] - this.j;
  a = Math.atan(b / (this.h - c));
  b = Math.pow((this.b > 0 ? 1 : -1) * Math.sqrt(b * b + (this.h - c) * (this.h - c)) / (this.a * this.G), 1 / this.b);
  return[(a / this.b + this.e) / j, this.N(b, this.d, Math.PI / 2 - 2 * Math.atan(b)) / j]
};
i.q = function() {
  return Math.PI * 2 * this.a
};
function P(a) {
  a = a || {};
  L.call(this, a);
  this.a = a.r / a.unit;
  var b = a.K;
  this.A = a.fa;
  var c = a.L * j;
  this.e = a.p * j;
  this.i = a.I;
  this.j = a.J;
  a = 1 / b;
  this.c = 2 * a - a * a;
  this.w = this.c * this.c;
  this.H = this.w * this.c;
  this.m = this.c / (1 - this.c);
  this.Q = this.k(c, this.a, this.c, this.w, this.H)
}
P.prototype = new L;
P.prototype.k = function(a, b, c, d, e) {
  return b * ((1 - c / 4 - 3 * d / 64 - 5 * e / 256) * a - (3 * c / 8 + 3 * d / 32 + 45 * e / 1024) * Math.sin(2 * a) + (15 * d / 256 + 45 * e / 1024) * Math.sin(4 * a) - 35 * e / 3072 * Math.sin(6 * a))
};
P.prototype.forward = function(a) {
  var b = a[1] * j, c = a[0] * j;
  a = this.a / Math.sqrt(1 - this.c * Math.pow(Math.sin(b), 2));
  var d = Math.pow(Math.tan(b), 2), e = this.m * Math.pow(Math.cos(b), 2);
  c = (c - this.e) * Math.cos(b);
  var f = this.k(b, this.a, this.c, this.w, this.H);
  return[this.i + this.A * a * (c + (1 - d + e) * Math.pow(c, 3) / 6 + (5 - 18 * d + d * d + 72 * e - 58 * this.m) * Math.pow(c, 5) / 120), this.j + this.A * (f - this.Q) + a * Math.tan(b) * (c * c / 2 + (5 - d + 9 * e + 4 * e * e) * Math.pow(c, 4) / 120 + (61 - 58 * d + d * d + 600 * e - 330 * this.m) * Math.pow(c, 6) / 720)]
};
P.prototype.n = function(a) {
  var b = a[0], c = a[1];
  a = (1 - Math.sqrt(1 - this.c)) / (1 + Math.sqrt(1 - this.c));
  c = (this.Q + (c - this.j) / this.A) / (this.a * (1 - this.c / 4 - 3 * this.w / 64 - 5 * this.H / 256));
  a = c + (3 * a / 2 - 27 * Math.pow(a, 3) / 32) * Math.sin(2 * c) + (21 * a * a / 16 - 55 * Math.pow(a, 4) / 32) * Math.sin(4 * c) + 151 * Math.pow(a, 3) / 6 * Math.sin(6 * c) + 1097 * Math.pow(a, 4) / 512 * Math.sin(8 * c);
  c = this.m * Math.pow(Math.cos(a), 2);
  var d = Math.pow(Math.tan(a), 2), e = this.a / Math.sqrt(1 - this.c * Math.pow(Math.sin(a), 2)), f = this.a * (1 - this.c) / Math.pow(1 - this.c * Math.pow(Math.sin(a), 2), 1.5);
  b = (b - this.i) / (e * this.A);
  e = a - e * Math.tan(a) / f * (b * b / 2 - (5 + 3 * d + 10 * c - 4 * c * c - 9 * this.m) * Math.pow(b, 4) / 24 + (61 + 90 * d + 28 * c + 45 * d * d - 252 * this.m - 3 * c * c) * Math.pow(b, 6) / 720);
  return[(this.e + (b - (1 + 2 * d + c) * Math.pow(b, 3) / 6 + (5 - 2 * c + 28 * d - 3 * c * c + 8 * this.m + 24 * d * d) * Math.pow(b, 5) / 120) / Math.cos(a)) / j, e / j]
};
P.prototype.q = function() {
  return Math.PI * 2 * this.a
};
function Q(a) {
  a = a || {};
  L.call(this, a);
  this.a = (a.r || 6378137) / (a.unit || 1);
  this.e = (a.p || 0) * j
}
Q.prototype = new L;
Q.prototype.forward = function(a) {
  var b = a[1] * j;
  return[this.a * (a[0] * j - this.e), this.a / 2 * Math.log((1 + Math.sin(b)) / (1 - Math.sin(b)))]
};
Q.prototype.n = function(a) {
  return[(a[0] / this.a + this.e) / j, (Math.PI / 2 - 2 * Math.atan(Math.exp(-a[1] / this.a))) / j]
};
Q.prototype.q = function() {
  return Math.PI * 2 * this.a
};
function R(a) {
  a = a || {};
  L.call(this, a);
  var b = a.K, c = a.O * j, d = a.P * j, e = a.L * j;
  this.a = a.r / a.unit;
  this.e = a.p * j;
  this.i = a.I;
  this.j = a.J;
  a = 1 / b;
  b = 2 * a - a * a;
  this.d = Math.sqrt(b);
  a = this.k(c, b);
  b = this.k(d, b);
  c = S(this, c, this.d);
  d = S(this, d, this.d);
  e = S(this, e, this.d);
  this.b = (a * a - b * b) / (d - c);
  this.F = a * a + this.b * c;
  this.h = this.t(this.a, this.F, this.b, e)
}
R.prototype = new L;
R.prototype.k = function(a, b) {
  var c = Math.sin(a);
  return Math.cos(a) / Math.sqrt(1 - b * c * c)
};
function S(a, b, c) {
  a = c * Math.sin(b);
  return(1 - c * c) * (Math.sin(b) / (1 - a * a) - 1 / (2 * c) * Math.log((1 - a) / (1 + a)))
}
i = R.prototype;
i.t = function(a, b, c, d) {
  return a * Math.sqrt(b - c * d) / c
};
i.s = function(a, b, c) {
  var d = b * Math.sin(c);
  return c + (1 - d * d) * (1 - d * d) / (2 * Math.cos(c)) * (a / (1 - b * b) - Math.sin(c) / (1 - d * d) + Math.log((1 - d) / (1 + d)) / (2 * b))
};
i.N = function(a, b, c) {
  var d = 0;
  c = c;
  for(var e = this.s(a, b, c);Math.abs(e - c) > 1.0E-8 && d < 10;) {
    d++;
    c = e;
    e = this.s(a, b, c)
  }
  return e
};
i.forward = function(a) {
  var b = a[0] * j;
  a = this.t(this.a, this.F, this.b, S(this, a[1] * j, this.d));
  b = this.b * (b - this.e);
  return[this.i + a * Math.sin(b), this.j + this.h - a * Math.cos(b)]
};
i.n = function(a) {
  var b = a[0] - this.i;
  a = a[1] - this.j;
  var c = Math.sqrt(b * b + (this.h - a) * (this.h - a)), d = this.b > 0 ? 1 : -1;
  c = (this.F - c * c * this.b * this.b / (this.a * this.a)) / this.b;
  return[(Math.atan(d * b / (d * this.h - d * a)) / this.b + this.e) / j, this.N(c, this.d, Math.asin(c / 2)) / j]
};
i.q = function() {
  return Math.PI * 2 * this.a
};
i.q = function() {
  return Math.PI * 2 * this.a
};
o = new M({wkid:4326});
q = new M({wkid:4269});
r = new Q({wkid:102113, r:6378137, p:0, unit:1});
t = {"4326":o, "4269":q, "102113":r, "102100":new Q({wkid:102100, r:6378137, p:0, unit:1})};
u.ka = function(a, b) {
  var c = t["" + a];
  if(c) {
    return c
  }
  if(b instanceof L) {
    c = t["" + a] = b
  }else {
    c = b || a;
    var d = {wkt:a};
    if(a === parseInt(a, 10)) {
      d = {wkid:a}
    }
    var e = v(c, 'PROJECTION["', '"]'), f = v(c, "SPHEROID[", "]").split(",");
    if(e !== "") {
      d.unit = parseFloat(v(v(c, "PROJECTION", ""), "UNIT[", "]").split(",")[1]);
      d.r = parseFloat(f[1]);
      d.K = parseFloat(f[2]);
      d.L = parseFloat(v(c, '"Latitude_Of_Origin",', "]"));
      d.p = parseFloat(v(c, '"Central_Meridian",', "]"));
      d.I = parseFloat(v(c, '"False_Easting",', "]"));
      d.J = parseFloat(v(c, '"False_Northing",', "]"))
    }
    switch(e) {
      case "":
        c = new L(d);
        break;
      case "Lambert_Conformal_Conic":
        d.O = parseFloat(v(c, '"Standard_Parallel_1",', "]"));
        d.P = parseFloat(v(c, '"Standard_Parallel_2",', "]"));
        c = new N(d);
        break;
      case "Transverse_Mercator":
        d.fa = parseFloat(v(c, '"Scale_Factor",', "]"));
        c = new P(d);
        break;
      case "Albers":
        d.O = parseFloat(v(c, '"Standard_Parallel_1",', "]"));
        d.P = parseFloat(v(c, '"Standard_Parallel_2",', "]"));
        c = new R(d);
        break;
      default:
        throw new Error(e + "  not supported");
    }
    if(c) {
      t["" + a] = c
    }
  }
  return c
};
function T(a) {
  this.url = a;
  this.definition = null
}
function U(a, b) {
  this.url = a;
  this.M = false;
  var c = a.split("/");
  this.name = c[c.length - 2].replace(/_/g, " ");
  b = b || {};
  if(b.ca) {
    var d = this;
    window.setTimeout(function() {
      V(d)
    }, b.ca * 1E3)
  }else {
    V(this)
  }
}
function V(a) {
  K(a.url, {}, "", function(b) {
    a.z(b)
  })
}
U.prototype.z = function(a) {
  var b = this;
  x(a, this);
  this.spatialReference = a.spatialReference.wkt ? L.ja(a.spatialReference.wkt) : t[a.spatialReference.wkid];
  a.tables !== undefined ? K(this.url + "/layers", {}, "", function(c) {
    W(b, c)
  }) : W(b, a)
};
function W(a, b) {
  var c = [], d = [];
  a.layers = c;
  if(b.tables) {
    a.tables = d
  }
  var e, f, k, h;
  f = 0;
  for(k = b.layers.length;f < k;f++) {
    h = b.layers[f];
    e = new T(a.url + "/" + h.id);
    x(h, e);
    e.visible = e.defaultVisibility;
    c.push(e)
  }
  if(b.tables) {
    f = 0;
    for(k = b.tables.length;f < k;f++) {
      h = b.tables[f];
      e = new T(a.url + "/" + h.id);
      x(h, e);
      d.push(e)
    }
  }
  f = 0;
  for(k = c.length;f < k;f++) {
    e = c[f];
    if(e.subLayerIds) {
      e.C = [];
      d = 0;
      for(h = e.subLayerIds.length;d < h;d++) {
        var g;
        a: {
          g = e.subLayerIds[d];
          var n = a.layers;
          if(n) {
            for(var p = 0, da = n.length;p < da;p++) {
              if(g === n[p].id) {
                g = n[p];
                break a
              }
              if(w(g) && n[p].name.toLowerCase() === g.toLowerCase()) {
                g = n[p];
                break a
              }
            }
          }
          g = null
        }
        e.C.push(g);
        g.ia = e
      }
    }
  }
  a.M = true;
  y(a, "load")
}
function ea(a) {
  var b = {};
  if(a.layers) {
    for(var c = 0, d = a.layers.length;c < d;c++) {
      var e = a.layers[c];
      if(e.definition) {
        b[String(e.id)] = e.definition
      }
    }
  }
  return b
}
function fa(a) {
  var b = [];
  if(a.layers) {
    var c, d, e;
    d = 0;
    for(e = a.layers.length;d < e;d++) {
      c = a.layers[d];
      if(c.C) {
        for(var f = 0, k = c.C.length;f < k;f++) {
          if(c.C[f].visible === false) {
            c.visible = false;
            break
          }
        }
      }
    }
    d = 0;
    for(e = a.layers.length;d < e;d++) {
      c = a.layers[d];
      c.visible === true && b.push(c.id)
    }
  }
  return b
}
function ga(a, b, c, d) {
  if(b && b.bounds) {
    var e = {};
    e.f = b.f;
    var f = b.bounds;
    e.bbox = "" + f.getSouthWest().lng() + "," + f.getSouthWest().lat() + "," + f.getNorthEast().lng() + "," + f.getNorthEast().lat();
    e.size = "" + b.width + "," + b.height;
    e.dpi = b.dpi;
    if(b.imageSR) {
      e.imageSR = b.imageSR.wkid ? b.imageSR.wkid : "{wkt:" + b.imageSR.wkt + "}"
    }
    e.bboxSR = "4326";
    e.format = b.format;
    f = b.layerDefinitions;
    if(f === undefined) {
      f = ea(a)
    }
    e.layerDefs = aa(f);
    f = b.layerIds;
    var k = b.layerOption || "show";
    if(f === undefined) {
      f = fa(a)
    }
    if(f.length > 0) {
      e.layers = k + ":" + f.join(",")
    }else {
      if(a.M && c) {
        c({href:null});
        return
      }
    }
    e.transparent = b.transparent === false ? false : true;
    if(b.time) {
      e.time = z(b.time, b.ga)
    }
    e.da = b.da;
    if(e.f === "image") {
      return a.url + "/export?" + J(e)
    }else {
      K(a.url + "/export", e, "", function(h) {
        if(h.extent) {
          var g, n = h.extent, p = t[n.spatialReference.wkid || n.spatialReference.wkt];
          p = p || o;
          g = p.n([n.xmin, n.ymin]);
          n = p.n([n.xmax, n.ymax]);
          g = new m.LatLngBounds(new m.LatLng(g[1], g[0]), new m.LatLng(n[1], n[0]));
          h.bounds = g;
          delete h.extent;
          c(h)
        }else {
          h = h.error;
          d && h && h.error && d(h.error)
        }
      })
    }
  }
}
function X(a) {
  this.ea = a ? a.lods : null;
  this.v = a ? t[a.spatialReference.wkid || a.spatialReference.wkt] : r;
  if(!this.v) {
    throw new Error("unsupported Spatial Reference");
  }
  this.$ = a ? a.lods[0].resolution : 156543.033928;
  this.minZoom = Math.floor(Math.log(this.v.q() / this.$ / 256) / Math.LN2 + 0.5);
  this.maxZoom = a ? this.minZoom + this.ea.length - 1 : 20;
  if(m.Size) {
    this.aa = a ? new m.Size(a.cols, a.rows) : new m.Size(256, 256)
  }
  this.B = Math.pow(2, this.minZoom) * this.$;
  this.X = a ? a.origin.x : -2.0037508342787E7;
  this.Y = a ? a.origin.y : 2.0037508342787E7;
  if(a) {
    for(var b, c = 0;c < a.lods.length - 1;c++) {
      b = a.lods[c].resolution / a.lods[c + 1].resolution;
      if(b > 2.001 || b < 1.999) {
        throw new Error("This type of map cache is not supported in V3. \nScale ratio between zoom levels must be 2");
      }
    }
  }
}
X.prototype.fromLatLngToPoint = function(a, b) {
  if(!a || isNaN(a.lat()) || isNaN(a.lng())) {
    return null
  }
  var c = this.v.forward([a.lng(), a.lat()]), d = b || new m.Point(0, 0);
  d.x = (c[0] - this.X) / this.B;
  d.y = (this.Y - c[1]) / this.B;
  return d
};
X.prototype.fromLatLngToPoint = X.prototype.fromLatLngToPoint;
X.prototype.fromPointToLatLng = function(a) {
  if(a === null) {
    return null
  }
  a = this.v.n([a.x * this.B + this.X, this.Y - a.y * this.B]);
  return new m.LatLng(a[1], a[0])
};
var Y = new X;
function Z(a, b) {
  b = b || {};
  if(b.opacity) {
    this.u = b.opacity;
    delete b.opacity
  }
  x(b, this);
  this.g = a instanceof U ? a : new U(a);
  if(b.U) {
    var c = v(this.g.url, "", "://");
    this.ba = c + "://" + b.U + v(this.g.url, c + "://" + v(this.g.url, "://", "/"), "");
    this.W = parseInt(v(b.U, "[", "]"), 10)
  }
  this.name = b.name || this.g.name;
  this.maxZoom = b.maxZoom || 19;
  this.minZoom = b.minZoom || 0;
  this.T = b.T || this.maxZoom;
  if(this.g.M) {
    this.z(b)
  }else {
    var d = this;
    m.event.addListenerOnce(this.g, "load", function() {
      d.z(b)
    })
  }
  this.o = {};
  this.V = b.map
}
Z.prototype.z = function(a) {
  if(this.g.tileInfo) {
    this.l = new X(this.g.tileInfo);
    this.minZoom = a.minZoom || this.l.minZoom;
    this.maxZoom = a.maxZoom || this.l.maxZoom
  }
};
Z.prototype.getTileUrl = function(a, b) {
  var c = b - (this.l ? this.l.minZoom : this.minZoom), d = "";
  if(!isNaN(a.x) && !isNaN(a.y) && c >= 0 && a.x >= 0 && a.y >= 0) {
    d = this.g.url;
    if(this.ba) {
      d = this.ba.replace("[" + this.W + "]", "" + (a.y + a.x) % this.W)
    }
    if(this.g.singleFusedMapCache === false || b > this.T) {
      c = this.l || (this.V ? this.V.getProjection() : Y);
      if(!c instanceof X) {
        c = Y
      }
      d = c.aa;
      var e = 1 << b, f = new m.Point(a.x * d.width / e, (a.y + 1) * d.height / e);
      e = new m.Point((a.x + 1) * d.width / e, a.y * d.height / e);
      f = new m.LatLngBounds(c.fromPointToLatLng(f), c.fromPointToLatLng(e));
      e = {f:"image"};
      e.bounds = f;
      e.format = "png32";
      e.width = d.width;
      e.height = d.height;
      e.imageSR = c.v;
      d = ga(this.g, e)
    }else {
      d = d + "/tile/" + c + "/" + a.y + "/" + a.x
    }
  }
  return d
};
function $(a, b) {
  b = b || {};
  var c;
  if(b.opacity) {
    this.u = b.opacity;
    delete b.opacity
  }
  x(b, this);
  var d = a;
  if(w(a)) {
    d = [new Z(a, b)]
  }else {
    if(a instanceof U) {
      d = [new Z(a, b)]
    }else {
      if(a instanceof Z) {
        d = [a]
      }else {
        if(a.length > 0 && w(a[0])) {
          d = [];
          for(c = 0;c < a.length;c++) {
            d[c] = new Z(a[c], b)
          }
        }
      }
    }
  }
  this.D = d;
  this.o = {};
  if(b.maxZoom !== undefined) {
    this.maxZoom = b.maxZoom
  }else {
    var e = 0;
    for(c = 0;c < d.length;c++) {
      e = Math.max(e, d[c].maxZoom)
    }
    this.maxZoom = e
  }
  if(d[0].l) {
    this.tileSize = d[0].l.aa;
    this.projection = d[0].l
  }else {
    this.tileSize = new m.Size(256, 256)
  }
  if(!this.name) {
    this.name = d[0].name
  }
}
$.prototype.getTile = function(a, b, c) {
  for(var d = c.createElement("div"), e = "_" + a.x + "_" + a.y + "_" + b, f = 0;f < this.D.length;f++) {
    var k = this.D[f];
    if(b <= k.maxZoom && b >= k.minZoom) {
      var h = k.getTileUrl(a, b);
      if(h) {
        var g = c.createElement(document.all ? "img" : "div");
        g.style.border = "0px none";
        g.style.margin = "0px";
        g.style.padding = "0px";
        g.style.overflow = "hidden";
        g.style.position = "absolute";
        g.style.top = "0px";
        g.style.left = "0px";
        g.style.width = "" + this.tileSize.width + "px";
        g.style.height = "" + this.tileSize.height + "px";
        if(document.all) {
          g.src = h
        }else {
          g.style.backgroundImage = "url(" + h + ")"
        }
        d.appendChild(g);
        k.o[e] = g;
        if(k.u !== undefined) {
          A(g, k.u)
        }else {
          this.u !== undefined && A(g, this.u)
        }
      }
    }
  }
  this.o[e] = d;
  d.setAttribute("tid", e);
  return d
};
$.prototype.getTile = $.prototype.getTile;
$.prototype.releaseTile = function(a) {
  if(a.getAttribute("tid")) {
    a = a.getAttribute("tid");
    this.o[a] && delete this.o[a];
    for(var b = 0;b < this.D.length;b++) {
      var c = this.D[b];
      c.o[a] && delete c.o[a]
    }
  }
};
$.prototype.releaseTile = $.prototype.releaseTile;
new m.OverlayView;window.onload = function() {
  var a = {zoom:14, center:new google.maps.LatLng(45.5, -122.7), mapTypeId:google.maps.MapTypeId.ROADMAP, mapTypeControlOptions:{mapTypeIds:["arcgis", google.maps.MapTypeId.ROADMAP]}, streetViewControl:true};
  a = new google.maps.Map(document.getElementById("map_canvas"), a);
  var b = new $("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer", {name:"ArcGIS"});
  a.mapTypes.set("arcgis", b);
  a.overlayMapTypes.insertAt(0, b)
};})()
