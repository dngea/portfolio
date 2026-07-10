(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
  new MutationObserver((i) => {
    for (const r of i)
      if (r.type === "childList")
        for (const o of r.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(i) {
    const r = {};
    return (
      i.integrity && (r.integrity = i.integrity),
      i.referrerPolicy && (r.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (r.credentials = "omit")
          : (r.credentials = "same-origin"),
      r
    );
  }
  function s(i) {
    if (i.ep) return;
    i.ep = !0;
    const r = e(i);
    fetch(i.href, r);
  }
})();
var ai = !1,
  ci = !1,
  Ee = [],
  ui = -1;
function Xc(n) {
  Yc(n);
}
function Yc(n) {
  (Ee.includes(n) || Ee.push(n), Qc());
}
function Kc(n) {
  let t = Ee.indexOf(n);
  t !== -1 && t > ui && Ee.splice(t, 1);
}
function Qc() {
  !ci && !ai && ((ai = !0), queueMicrotask(Jc));
}
function Jc() {
  ((ai = !1), (ci = !0));
  for (let n = 0; n < Ee.length; n++) (Ee[n](), (ui = n));
  ((Ee.length = 0), (ui = -1), (ci = !1));
}
var un,
  We,
  ln,
  Ao,
  li = !0;
function tu(n) {
  ((li = !1), n(), (li = !0));
}
function eu(n) {
  ((un = n.reactive),
    (ln = n.release),
    (We = (t) =>
      n.effect(t, {
        scheduler: (e) => {
          li ? Xc(e) : e();
        },
      })),
    (Ao = n.raw));
}
function jr(n) {
  We = n;
}
function nu(n) {
  let t = () => {};
  return [
    (s) => {
      let i = We(s);
      return (
        n._x_effects ||
          ((n._x_effects = new Set()),
          (n._x_runEffects = () => {
            n._x_effects.forEach((r) => r());
          })),
        n._x_effects.add(i),
        (t = () => {
          i !== void 0 && (n._x_effects.delete(i), ln(i));
        }),
        i
      );
    },
    () => {
      t();
    },
  ];
}
function ko(n, t) {
  let e = !0,
    s,
    i = We(() => {
      let r = n();
      (JSON.stringify(r),
        e
          ? (s = r)
          : queueMicrotask(() => {
              (t(r, s), (s = r));
            }),
        (e = !1));
    });
  return () => ln(i);
}
var No = [],
  Oo = [],
  Eo = [];
function su(n) {
  Eo.push(n);
}
function Ri(n, t) {
  typeof t == "function"
    ? (n._x_cleanups || (n._x_cleanups = []), n._x_cleanups.push(t))
    : ((t = n), Oo.push(t));
}
function Mo(n) {
  No.push(n);
}
function Io(n, t, e) {
  (n._x_attributeCleanups || (n._x_attributeCleanups = {}),
    n._x_attributeCleanups[t] || (n._x_attributeCleanups[t] = []),
    n._x_attributeCleanups[t].push(e));
}
function Do(n, t) {
  n._x_attributeCleanups &&
    Object.entries(n._x_attributeCleanups).forEach(([e, s]) => {
      (t === void 0 || t.includes(e)) &&
        (s.forEach((i) => i()), delete n._x_attributeCleanups[e]);
    });
}
function iu(n) {
  for (n._x_effects?.forEach(Kc); n._x_cleanups?.length;) n._x_cleanups.pop()();
}
var Pi = new MutationObserver(qi),
  Fi = !1;
function Vi() {
  (Pi.observe(document, {
    subtree: !0,
    childList: !0,
    attributes: !0,
    attributeOldValue: !0,
  }),
    (Fi = !0));
}
function Ro() {
  (ru(), Pi.disconnect(), (Fi = !1));
}
var bn = [];
function ru() {
  let n = Pi.takeRecords();
  bn.push(() => n.length > 0 && qi(n));
  let t = bn.length;
  queueMicrotask(() => {
    if (bn.length === t) for (; bn.length > 0;) bn.shift()();
  });
}
function at(n) {
  if (!Fi) return n();
  Ro();
  let t = n();
  return (Vi(), t);
}
var Li = !1,
  cs = [];
function ou() {
  Li = !0;
}
function au() {
  ((Li = !1), qi(cs), (cs = []));
}
function qi(n) {
  if (Li) {
    cs = cs.concat(n);
    return;
  }
  let t = [],
    e = new Set(),
    s = new Map(),
    i = new Map();
  for (let r = 0; r < n.length; r++)
    if (
      !n[r].target._x_ignoreMutationObserver &&
      (n[r].type === "childList" &&
        (n[r].removedNodes.forEach((o) => {
          o.nodeType === 1 && o._x_marker && e.add(o);
        }),
        n[r].addedNodes.forEach((o) => {
          if (o.nodeType === 1) {
            if (e.has(o)) {
              e.delete(o);
              return;
            }
            o._x_marker || t.push(o);
          }
        })),
      n[r].type === "attributes")
    ) {
      let o = n[r].target,
        a = n[r].attributeName,
        c = n[r].oldValue,
        u = () => {
          (s.has(o) || s.set(o, []),
            s.get(o).push({ name: a, value: o.getAttribute(a) }));
        },
        l = () => {
          (i.has(o) || i.set(o, []), i.get(o).push(a));
        };
      o.hasAttribute(a) && c === null
        ? u()
        : o.hasAttribute(a)
          ? (l(), u())
          : l();
    }
  (i.forEach((r, o) => {
    Do(o, r);
  }),
    s.forEach((r, o) => {
      No.forEach((a) => a(o, r));
    }));
  for (let r of e) t.some((o) => o.contains(r)) || Oo.forEach((o) => o(r));
  for (let r of t) r.isConnected && Eo.forEach((o) => o(r));
  ((t = null), (e = null), (s = null), (i = null));
}
function Po(n) {
  return Pn(tn(n));
}
function Rn(n, t, e) {
  return (
    (n._x_dataStack = [t, ...tn(e || n)]),
    () => {
      n._x_dataStack = n._x_dataStack.filter((s) => s !== t);
    }
  );
}
function tn(n) {
  return n._x_dataStack
    ? n._x_dataStack
    : typeof ShadowRoot == "function" && n instanceof ShadowRoot
      ? tn(n.host)
      : n.parentNode
        ? tn(n.parentNode)
        : [];
}
function Pn(n) {
  return new Proxy({ objects: n }, cu);
}
var cu = {
  ownKeys({ objects: n }) {
    return Array.from(new Set(n.flatMap((t) => Object.keys(t))));
  },
  has({ objects: n }, t) {
    return t == Symbol.unscopables
      ? !1
      : n.some(
          (e) =>
            Object.prototype.hasOwnProperty.call(e, t) || Reflect.has(e, t),
        );
  },
  get({ objects: n }, t, e) {
    return t == "toJSON"
      ? uu
      : Reflect.get(n.find((s) => Reflect.has(s, t)) || {}, t, e);
  },
  set({ objects: n }, t, e, s) {
    const i =
        n.find((o) => Object.prototype.hasOwnProperty.call(o, t)) ||
        n[n.length - 1],
      r = Object.getOwnPropertyDescriptor(i, t);
    return r?.set && r?.get ? r.set.call(s, e) || !0 : Reflect.set(i, t, e);
  },
};
function uu() {
  return Reflect.ownKeys(this).reduce(
    (t, e) => ((t[e] = Reflect.get(this, e)), t),
    {},
  );
}
function Fo(n) {
  let t = (s) => typeof s == "object" && !Array.isArray(s) && s !== null,
    e = (s, i = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(s)).forEach(
        ([r, { value: o, enumerable: a }]) => {
          if (
            a === !1 ||
            o === void 0 ||
            (typeof o == "object" && o !== null && o.__v_skip)
          )
            return;
          let c = i === "" ? r : `${i}.${r}`;
          typeof o == "object" && o !== null && o._x_interceptor
            ? (s[r] = o.initialize(n, c, r))
            : t(o) && o !== s && !(o instanceof Element) && e(o, c);
        },
      );
    };
  return e(n);
}
function Vo(n, t = () => {}) {
  let e = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(s, i, r) {
      return n(
        this.initialValue,
        () => lu(s, i),
        (o) => hi(s, i, o),
        i,
        r,
      );
    },
  };
  return (
    t(e),
    (s) => {
      if (typeof s == "object" && s !== null && s._x_interceptor) {
        let i = e.initialize.bind(e);
        e.initialize = (r, o, a) => {
          let c = s.initialize(r, o, a);
          return ((e.initialValue = c), i(r, o, a));
        };
      } else e.initialValue = s;
      return e;
    }
  );
}
function lu(n, t) {
  return t.split(".").reduce((e, s) => e[s], n);
}
function hi(n, t, e) {
  if ((typeof t == "string" && (t = t.split(".")), t.length === 1)) n[t[0]] = e;
  else {
    if (t.length === 0) throw error;
    return (n[t[0]] || (n[t[0]] = {}), hi(n[t[0]], t.slice(1), e));
  }
}
var Lo = {};
function Ut(n, t) {
  Lo[n] = t;
}
function di(n, t) {
  let e = hu(t);
  return (
    Object.entries(Lo).forEach(([s, i]) => {
      Object.defineProperty(n, `$${s}`, {
        get() {
          return i(t, e);
        },
        enumerable: !1,
      });
    }),
    n
  );
}
function hu(n) {
  let [t, e] = $o(n),
    s = { interceptor: Vo, ...t };
  return (Ri(n, e), s);
}
function du(n, t, e, ...s) {
  try {
    return e(...s);
  } catch (i) {
    En(i, n, t);
  }
}
function En(n, t, e = void 0) {
  ((n = Object.assign(n ?? { message: "No error message given." }, {
    el: t,
    expression: e,
  })),
    console.warn(
      `Alpine Expression Error: ${n.message}

${
  e
    ? 'Expression: "' +
      e +
      `"

`
    : ""
}`,
      t,
    ),
    setTimeout(() => {
      throw n;
    }, 0));
}
var is = !0;
function qo(n) {
  let t = is;
  is = !1;
  let e = n();
  return ((is = t), e);
}
function Me(n, t, e = {}) {
  let s;
  return (xt(n, t)((i) => (s = i), e), s);
}
function xt(...n) {
  return Wo(...n);
}
var Wo = jo;
function fu(n) {
  Wo = n;
}
function jo(n, t) {
  let e = {};
  di(e, n);
  let s = [e, ...tn(n)],
    i = typeof t == "function" ? pu(s, t) : _u(s, t, n);
  return du.bind(null, n, t, i);
}
function pu(n, t) {
  return (e = () => {}, { scope: s = {}, params: i = [] } = {}) => {
    let r = t.apply(Pn([s, ...n]), i);
    us(e, r);
  };
}
var ei = {};
function mu(n, t) {
  if (ei[n]) return ei[n];
  let e = Object.getPrototypeOf(async function () {}).constructor,
    s =
      /^[\n\s]*if.*\(.*\)/.test(n.trim()) || /^(let|const)\s/.test(n.trim())
        ? `(async()=>{ ${n} })()`
        : n,
    r = (() => {
      try {
        let o = new e(
          ["__self", "scope"],
          `with (scope) { __self.result = ${s} }; __self.finished = true; return __self.result;`,
        );
        return (
          Object.defineProperty(o, "name", { value: `[Alpine] ${n}` }),
          o
        );
      } catch (o) {
        return (En(o, t, n), Promise.resolve());
      }
    })();
  return ((ei[n] = r), r);
}
function _u(n, t, e) {
  let s = mu(t, e);
  return (i = () => {}, { scope: r = {}, params: o = [] } = {}) => {
    ((s.result = void 0), (s.finished = !1));
    let a = Pn([r, ...n]);
    if (typeof s == "function") {
      let c = s(s, a).catch((u) => En(u, e, t));
      s.finished
        ? (us(i, s.result, a, o, e), (s.result = void 0))
        : c
            .then((u) => {
              us(i, u, a, o, e);
            })
            .catch((u) => En(u, e, t))
            .finally(() => (s.result = void 0));
    }
  };
}
function us(n, t, e, s, i) {
  if (is && typeof t == "function") {
    let r = t.apply(e, s);
    r instanceof Promise
      ? r.then((o) => us(n, o, e, s)).catch((o) => En(o, i, t))
      : n(r);
  } else
    typeof t == "object" && t instanceof Promise ? t.then((r) => n(r)) : n(t);
}
var Wi = "x-";
function hn(n = "") {
  return Wi + n;
}
function gu(n) {
  Wi = n;
}
var ls = {};
function pt(n, t) {
  return (
    (ls[n] = t),
    {
      before(e) {
        if (!ls[e]) {
          console.warn(
            String.raw`Cannot find directive \`${e}\`. \`${n}\` will use the default order of execution`,
          );
          return;
        }
        const s = Ne.indexOf(e);
        Ne.splice(s >= 0 ? s : Ne.indexOf("DEFAULT"), 0, n);
      },
    }
  );
}
function yu(n) {
  return Object.keys(ls).includes(n);
}
function ji(n, t, e) {
  if (((t = Array.from(t)), n._x_virtualDirectives)) {
    let r = Object.entries(n._x_virtualDirectives).map(([a, c]) => ({
        name: a,
        value: c,
      })),
      o = Bo(r);
    ((r = r.map((a) =>
      o.find((c) => c.name === a.name)
        ? { name: `x-bind:${a.name}`, value: `"${a.value}"` }
        : a,
    )),
      (t = t.concat(r)));
  }
  let s = {};
  return t
    .map(Zo((r, o) => (s[r] = o)))
    .filter(Xo)
    .map(Tu(s, e))
    .sort(bu)
    .map((r) => wu(n, r));
}
function Bo(n) {
  return Array.from(n)
    .map(Zo())
    .filter((t) => !Xo(t));
}
var fi = !1,
  Cn = new Map(),
  Uo = Symbol();
function vu(n) {
  fi = !0;
  let t = Symbol();
  ((Uo = t), Cn.set(t, []));
  let e = () => {
      for (; Cn.get(t).length;) Cn.get(t).shift()();
      Cn.delete(t);
    },
    s = () => {
      ((fi = !1), e());
    };
  (n(e), s());
}
function $o(n) {
  let t = [],
    e = (a) => t.push(a),
    [s, i] = nu(n);
  return (
    t.push(i),
    [
      {
        Alpine: Fn,
        effect: s,
        cleanup: e,
        evaluateLater: xt.bind(xt, n),
        evaluate: Me.bind(Me, n),
      },
      () => t.forEach((a) => a()),
    ]
  );
}
function wu(n, t) {
  let e = () => {},
    s = ls[t.type] || e,
    [i, r] = $o(n);
  Io(n, t.original, r);
  let o = () => {
    n._x_ignore ||
      n._x_ignoreSelf ||
      (s.inline && s.inline(n, t, i),
      (s = s.bind(s, n, t, i)),
      fi ? Cn.get(Uo).push(s) : s());
  };
  return ((o.runCleanups = r), o);
}
var zo =
    (n, t) =>
    ({ name: e, value: s }) => (
      e.startsWith(n) && (e = e.replace(n, t)),
      { name: e, value: s }
    ),
  Go = (n) => n;
function Zo(n = () => {}) {
  return ({ name: t, value: e }) => {
    let { name: s, value: i } = Ho.reduce((r, o) => o(r), {
      name: t,
      value: e,
    });
    return (s !== t && n(s, t), { name: s, value: i });
  };
}
var Ho = [];
function Bi(n) {
  Ho.push(n);
}
function Xo({ name: n }) {
  return Yo().test(n);
}
var Yo = () => new RegExp(`^${Wi}([^:^.]+)\\b`);
function Tu(n, t) {
  return ({ name: e, value: s }) => {
    let i = e.match(Yo()),
      r = e.match(/:([a-zA-Z0-9\-_:]+)/),
      o = e.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
      a = t || n[e] || e;
    return {
      type: i ? i[1] : null,
      value: r ? r[1] : null,
      modifiers: o.map((c) => c.replace(".", "")),
      expression: s,
      original: a,
    };
  };
}
var pi = "DEFAULT",
  Ne = [
    "ignore",
    "ref",
    "data",
    "id",
    "anchor",
    "bind",
    "init",
    "for",
    "model",
    "modelable",
    "transition",
    "show",
    "if",
    pi,
    "teleport",
  ];
function bu(n, t) {
  let e = Ne.indexOf(n.type) === -1 ? pi : n.type,
    s = Ne.indexOf(t.type) === -1 ? pi : t.type;
  return Ne.indexOf(e) - Ne.indexOf(s);
}
function An(n, t, e = {}) {
  n.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0,
      cancelable: !0,
    }),
  );
}
function Pe(n, t) {
  if (typeof ShadowRoot == "function" && n instanceof ShadowRoot) {
    Array.from(n.children).forEach((i) => Pe(i, t));
    return;
  }
  let e = !1;
  if ((t(n, () => (e = !0)), e)) return;
  let s = n.firstElementChild;
  for (; s;) (Pe(s, t), (s = s.nextElementSibling));
}
function Dt(n, ...t) {
  console.warn(`Alpine Warning: ${n}`, ...t);
}
var Br = !1;
function xu() {
  (Br &&
    Dt(
      "Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.",
    ),
    (Br = !0),
    document.body ||
      Dt(
        "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?",
      ),
    An(document, "alpine:init"),
    An(document, "alpine:initializing"),
    Vi(),
    su((t) => ne(t, Pe)),
    Ri((t) => fn(t)),
    Mo((t, e) => {
      ji(t, e).forEach((s) => s());
    }));
  let n = (t) => !As(t.parentElement, !0);
  (Array.from(document.querySelectorAll(Jo().join(",")))
    .filter(n)
    .forEach((t) => {
      ne(t);
    }),
    An(document, "alpine:initialized"),
    setTimeout(() => {
      ku();
    }));
}
var Ui = [],
  Ko = [];
function Qo() {
  return Ui.map((n) => n());
}
function Jo() {
  return Ui.concat(Ko).map((n) => n());
}
function ta(n) {
  Ui.push(n);
}
function ea(n) {
  Ko.push(n);
}
function As(n, t = !1) {
  return dn(n, (e) => {
    if ((t ? Jo() : Qo()).some((i) => e.matches(i))) return !0;
  });
}
function dn(n, t) {
  if (n) {
    if (t(n)) return n;
    if ((n._x_teleportBack && (n = n._x_teleportBack), !!n.parentElement))
      return dn(n.parentElement, t);
  }
}
function Su(n) {
  return Qo().some((t) => n.matches(t));
}
var na = [];
function Cu(n) {
  na.push(n);
}
var Au = 1;
function ne(n, t = Pe, e = () => {}) {
  dn(n, (s) => s._x_ignore) ||
    vu(() => {
      t(n, (s, i) => {
        s._x_marker ||
          (e(s, i),
          na.forEach((r) => r(s, i)),
          ji(s, s.attributes).forEach((r) => r()),
          s._x_ignore || (s._x_marker = Au++),
          s._x_ignore && i());
      });
    });
}
function fn(n, t = Pe) {
  t(n, (e) => {
    (iu(e), Do(e), delete e._x_marker);
  });
}
function ku() {
  [
    ["ui", "dialog", ["[x-dialog], [x-popover]"]],
    ["anchor", "anchor", ["[x-anchor]"]],
    ["sort", "sort", ["[x-sort]"]],
  ].forEach(([t, e, s]) => {
    yu(e) ||
      s.some((i) => {
        if (document.querySelector(i))
          return (Dt(`found "${i}", but missing ${t} plugin`), !0);
      });
  });
}
var mi = [],
  $i = !1;
function zi(n = () => {}) {
  return (
    queueMicrotask(() => {
      $i ||
        setTimeout(() => {
          _i();
        });
    }),
    new Promise((t) => {
      mi.push(() => {
        (n(), t());
      });
    })
  );
}
function _i() {
  for ($i = !1; mi.length;) mi.shift()();
}
function Nu() {
  $i = !0;
}
function Gi(n, t) {
  return Array.isArray(t)
    ? Ur(n, t.join(" "))
    : typeof t == "object" && t !== null
      ? Ou(n, t)
      : typeof t == "function"
        ? Gi(n, t())
        : Ur(n, t);
}
function Ur(n, t) {
  let e = (i) =>
      i
        .split(" ")
        .filter((r) => !n.classList.contains(r))
        .filter(Boolean),
    s = (i) => (
      n.classList.add(...i),
      () => {
        n.classList.remove(...i);
      }
    );
  return ((t = t === !0 ? (t = "") : t || ""), s(e(t)));
}
function Ou(n, t) {
  let e = (a) => a.split(" ").filter(Boolean),
    s = Object.entries(t)
      .flatMap(([a, c]) => (c ? e(a) : !1))
      .filter(Boolean),
    i = Object.entries(t)
      .flatMap(([a, c]) => (c ? !1 : e(a)))
      .filter(Boolean),
    r = [],
    o = [];
  return (
    i.forEach((a) => {
      n.classList.contains(a) && (n.classList.remove(a), o.push(a));
    }),
    s.forEach((a) => {
      n.classList.contains(a) || (n.classList.add(a), r.push(a));
    }),
    () => {
      (o.forEach((a) => n.classList.add(a)),
        r.forEach((a) => n.classList.remove(a)));
    }
  );
}
function ks(n, t) {
  return typeof t == "object" && t !== null ? Eu(n, t) : Mu(n, t);
}
function Eu(n, t) {
  let e = {};
  return (
    Object.entries(t).forEach(([s, i]) => {
      ((e[s] = n.style[s]),
        s.startsWith("--") || (s = Iu(s)),
        n.style.setProperty(s, i));
    }),
    setTimeout(() => {
      n.style.length === 0 && n.removeAttribute("style");
    }),
    () => {
      ks(n, e);
    }
  );
}
function Mu(n, t) {
  let e = n.getAttribute("style", t);
  return (
    n.setAttribute("style", t),
    () => {
      n.setAttribute("style", e || "");
    }
  );
}
function Iu(n) {
  return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function gi(n, t = () => {}) {
  let e = !1;
  return function () {
    e ? t.apply(this, arguments) : ((e = !0), n.apply(this, arguments));
  };
}
pt(
  "transition",
  (n, { value: t, modifiers: e, expression: s }, { evaluate: i }) => {
    (typeof s == "function" && (s = i(s)),
      s !== !1 && (!s || typeof s == "boolean" ? Ru(n, e, t) : Du(n, s, t)));
  },
);
function Du(n, t, e) {
  (sa(n, Gi, ""),
    {
      enter: (i) => {
        n._x_transition.enter.during = i;
      },
      "enter-start": (i) => {
        n._x_transition.enter.start = i;
      },
      "enter-end": (i) => {
        n._x_transition.enter.end = i;
      },
      leave: (i) => {
        n._x_transition.leave.during = i;
      },
      "leave-start": (i) => {
        n._x_transition.leave.start = i;
      },
      "leave-end": (i) => {
        n._x_transition.leave.end = i;
      },
    }[e](t));
}
function Ru(n, t, e) {
  sa(n, ks);
  let s = !t.includes("in") && !t.includes("out") && !e,
    i = s || t.includes("in") || ["enter"].includes(e),
    r = s || t.includes("out") || ["leave"].includes(e);
  (t.includes("in") && !s && (t = t.filter((g, T) => T < t.indexOf("out"))),
    t.includes("out") && !s && (t = t.filter((g, T) => T > t.indexOf("out"))));
  let o = !t.includes("opacity") && !t.includes("scale"),
    a = o || t.includes("opacity"),
    c = o || t.includes("scale"),
    u = a ? 0 : 1,
    l = c ? xn(t, "scale", 95) / 100 : 1,
    h = xn(t, "delay", 0) / 1e3,
    d = xn(t, "origin", "center"),
    p = "opacity, transform",
    f = xn(t, "duration", 150) / 1e3,
    _ = xn(t, "duration", 75) / 1e3,
    m = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  (i &&
    ((n._x_transition.enter.during = {
      transformOrigin: d,
      transitionDelay: `${h}s`,
      transitionProperty: p,
      transitionDuration: `${f}s`,
      transitionTimingFunction: m,
    }),
    (n._x_transition.enter.start = { opacity: u, transform: `scale(${l})` }),
    (n._x_transition.enter.end = { opacity: 1, transform: "scale(1)" })),
    r &&
      ((n._x_transition.leave.during = {
        transformOrigin: d,
        transitionDelay: `${h}s`,
        transitionProperty: p,
        transitionDuration: `${_}s`,
        transitionTimingFunction: m,
      }),
      (n._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }),
      (n._x_transition.leave.end = { opacity: u, transform: `scale(${l})` })));
}
function sa(n, t, e = {}) {
  n._x_transition ||
    (n._x_transition = {
      enter: { during: e, start: e, end: e },
      leave: { during: e, start: e, end: e },
      in(s = () => {}, i = () => {}) {
        yi(
          n,
          t,
          {
            during: this.enter.during,
            start: this.enter.start,
            end: this.enter.end,
          },
          s,
          i,
        );
      },
      out(s = () => {}, i = () => {}) {
        yi(
          n,
          t,
          {
            during: this.leave.during,
            start: this.leave.start,
            end: this.leave.end,
          },
          s,
          i,
        );
      },
    });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (
  n,
  t,
  e,
  s,
) {
  const i =
    document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let r = () => i(e);
  if (t) {
    n._x_transition && (n._x_transition.enter || n._x_transition.leave)
      ? n._x_transition.enter &&
        (Object.entries(n._x_transition.enter.during).length ||
          Object.entries(n._x_transition.enter.start).length ||
          Object.entries(n._x_transition.enter.end).length)
        ? n._x_transition.in(e)
        : r()
      : n._x_transition
        ? n._x_transition.in(e)
        : r();
    return;
  }
  ((n._x_hidePromise = n._x_transition
    ? new Promise((o, a) => {
        (n._x_transition.out(
          () => {},
          () => o(s),
        ),
          n._x_transitioning &&
            n._x_transitioning.beforeCancel(() =>
              a({ isFromCancelledTransition: !0 }),
            ));
      })
    : Promise.resolve(s)),
    queueMicrotask(() => {
      let o = ia(n);
      o
        ? (o._x_hideChildren || (o._x_hideChildren = []),
          o._x_hideChildren.push(n))
        : i(() => {
            let a = (c) => {
              let u = Promise.all([
                c._x_hidePromise,
                ...(c._x_hideChildren || []).map(a),
              ]).then(([l]) => l?.());
              return (delete c._x_hidePromise, delete c._x_hideChildren, u);
            };
            a(n).catch((c) => {
              if (!c.isFromCancelledTransition) throw c;
            });
          });
    }));
};
function ia(n) {
  let t = n.parentNode;
  if (t) return t._x_hidePromise ? t : ia(t);
}
function yi(
  n,
  t,
  { during: e, start: s, end: i } = {},
  r = () => {},
  o = () => {},
) {
  if (
    (n._x_transitioning && n._x_transitioning.cancel(),
    Object.keys(e).length === 0 &&
      Object.keys(s).length === 0 &&
      Object.keys(i).length === 0)
  ) {
    (r(), o());
    return;
  }
  let a, c, u;
  Pu(n, {
    start() {
      a = t(n, s);
    },
    during() {
      c = t(n, e);
    },
    before: r,
    end() {
      (a(), (u = t(n, i)));
    },
    after: o,
    cleanup() {
      (c(), u());
    },
  });
}
function Pu(n, t) {
  let e,
    s,
    i,
    r = gi(() => {
      at(() => {
        ((e = !0),
          s || t.before(),
          i || (t.end(), _i()),
          t.after(),
          n.isConnected && t.cleanup(),
          delete n._x_transitioning);
      });
    });
  ((n._x_transitioning = {
    beforeCancels: [],
    beforeCancel(o) {
      this.beforeCancels.push(o);
    },
    cancel: gi(function () {
      for (; this.beforeCancels.length;) this.beforeCancels.shift()();
      r();
    }),
    finish: r,
  }),
    at(() => {
      (t.start(), t.during());
    }),
    Nu(),
    requestAnimationFrame(() => {
      if (e) return;
      let o =
          Number(
            getComputedStyle(n)
              .transitionDuration.replace(/,.*/, "")
              .replace("s", ""),
          ) * 1e3,
        a =
          Number(
            getComputedStyle(n)
              .transitionDelay.replace(/,.*/, "")
              .replace("s", ""),
          ) * 1e3;
      (o === 0 &&
        (o =
          Number(getComputedStyle(n).animationDuration.replace("s", "")) * 1e3),
        at(() => {
          t.before();
        }),
        (s = !0),
        requestAnimationFrame(() => {
          e ||
            (at(() => {
              t.end();
            }),
            _i(),
            setTimeout(n._x_transitioning.finish, o + a),
            (i = !0));
        }));
    }));
}
function xn(n, t, e) {
  if (n.indexOf(t) === -1) return e;
  const s = n[n.indexOf(t) + 1];
  if (!s || (t === "scale" && isNaN(s))) return e;
  if (t === "duration" || t === "delay") {
    let i = s.match(/([0-9]+)ms/);
    if (i) return i[1];
  }
  return t === "origin" &&
    ["top", "right", "left", "center", "bottom"].includes(n[n.indexOf(t) + 2])
    ? [s, n[n.indexOf(t) + 2]].join(" ")
    : s;
}
var pe = !1;
function ye(n, t = () => {}) {
  return (...e) => (pe ? t(...e) : n(...e));
}
function Fu(n) {
  return (...t) => pe && n(...t);
}
var ra = [];
function Ns(n) {
  ra.push(n);
}
function Vu(n, t) {
  (ra.forEach((e) => e(n, t)),
    (pe = !0),
    oa(() => {
      ne(t, (e, s) => {
        s(e, () => {});
      });
    }),
    (pe = !1));
}
var vi = !1;
function Lu(n, t) {
  (t._x_dataStack || (t._x_dataStack = n._x_dataStack),
    (pe = !0),
    (vi = !0),
    oa(() => {
      qu(t);
    }),
    (pe = !1),
    (vi = !1));
}
function qu(n) {
  let t = !1;
  ne(n, (s, i) => {
    Pe(s, (r, o) => {
      if (t && Su(r)) return o();
      ((t = !0), i(r, o));
    });
  });
}
function oa(n) {
  let t = We;
  (jr((e, s) => {
    let i = t(e);
    return (ln(i), () => {});
  }),
    n(),
    jr(t));
}
function aa(n, t, e, s = []) {
  switch (
    (n._x_bindings || (n._x_bindings = un({})),
    (n._x_bindings[t] = e),
    (t = s.includes("camel") ? Zu(t) : t),
    t)
  ) {
    case "value":
      Wu(n, e);
      break;
    case "style":
      Bu(n, e);
      break;
    case "class":
      ju(n, e);
      break;
    case "selected":
    case "checked":
      Uu(n, t, e);
      break;
    default:
      ca(n, t, e);
      break;
  }
}
function Wu(n, t) {
  if (ha(n))
    (n.attributes.value === void 0 && (n.value = t),
      window.fromModel &&
        (typeof t == "boolean"
          ? (n.checked = rs(n.value) === t)
          : (n.checked = $r(n.value, t))));
  else if (Zi(n))
    Number.isInteger(t)
      ? (n.value = t)
      : !Array.isArray(t) &&
          typeof t != "boolean" &&
          ![null, void 0].includes(t)
        ? (n.value = String(t))
        : Array.isArray(t)
          ? (n.checked = t.some((e) => $r(e, n.value)))
          : (n.checked = !!t);
  else if (n.tagName === "SELECT") Gu(n, t);
  else {
    if (n.value === t) return;
    n.value = t === void 0 ? "" : t;
  }
}
function ju(n, t) {
  (n._x_undoAddedClasses && n._x_undoAddedClasses(),
    (n._x_undoAddedClasses = Gi(n, t)));
}
function Bu(n, t) {
  (n._x_undoAddedStyles && n._x_undoAddedStyles(),
    (n._x_undoAddedStyles = ks(n, t)));
}
function Uu(n, t, e) {
  (ca(n, t, e), zu(n, t, e));
}
function ca(n, t, e) {
  [null, void 0, !1].includes(e) && Xu(t)
    ? n.removeAttribute(t)
    : (ua(t) && (e = t), $u(n, t, e));
}
function $u(n, t, e) {
  n.getAttribute(t) != e && n.setAttribute(t, e);
}
function zu(n, t, e) {
  n[t] !== e && (n[t] = e);
}
function Gu(n, t) {
  const e = [].concat(t).map((s) => s + "");
  Array.from(n.options).forEach((s) => {
    s.selected = e.includes(s.value);
  });
}
function Zu(n) {
  return n.toLowerCase().replace(/-(\w)/g, (t, e) => e.toUpperCase());
}
function $r(n, t) {
  return n == t;
}
function rs(n) {
  return [1, "1", "true", "on", "yes", !0].includes(n)
    ? !0
    : [0, "0", "false", "off", "no", !1].includes(n)
      ? !1
      : n
        ? !!n
        : null;
}
var Hu = new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
  "shadowrootclonable",
  "shadowrootdelegatesfocus",
  "shadowrootserializable",
]);
function ua(n) {
  return Hu.has(n);
}
function Xu(n) {
  return ![
    "aria-pressed",
    "aria-checked",
    "aria-expanded",
    "aria-selected",
  ].includes(n);
}
function Yu(n, t, e) {
  return n._x_bindings && n._x_bindings[t] !== void 0
    ? n._x_bindings[t]
    : la(n, t, e);
}
function Ku(n, t, e, s = !0) {
  if (n._x_bindings && n._x_bindings[t] !== void 0) return n._x_bindings[t];
  if (n._x_inlineBindings && n._x_inlineBindings[t] !== void 0) {
    let i = n._x_inlineBindings[t];
    return ((i.extract = s), qo(() => Me(n, i.expression)));
  }
  return la(n, t, e);
}
function la(n, t, e) {
  let s = n.getAttribute(t);
  return s === null
    ? typeof e == "function"
      ? e()
      : e
    : s === ""
      ? !0
      : ua(t)
        ? !![t, "true"].includes(s)
        : s;
}
function Zi(n) {
  return (
    n.type === "checkbox" ||
    n.localName === "ui-checkbox" ||
    n.localName === "ui-switch"
  );
}
function ha(n) {
  return n.type === "radio" || n.localName === "ui-radio";
}
function da(n, t) {
  var e;
  return function () {
    var s = this,
      i = arguments,
      r = function () {
        ((e = null), n.apply(s, i));
      };
    (clearTimeout(e), (e = setTimeout(r, t)));
  };
}
function fa(n, t) {
  let e;
  return function () {
    let s = this,
      i = arguments;
    e || (n.apply(s, i), (e = !0), setTimeout(() => (e = !1), t));
  };
}
function pa({ get: n, set: t }, { get: e, set: s }) {
  let i = !0,
    r,
    o = We(() => {
      let a = n(),
        c = e();
      if (i) (s(ni(a)), (i = !1));
      else {
        let u = JSON.stringify(a),
          l = JSON.stringify(c);
        u !== r ? s(ni(a)) : u !== l && t(ni(c));
      }
      ((r = JSON.stringify(n())), JSON.stringify(e()));
    });
  return () => {
    ln(o);
  };
}
function ni(n) {
  return typeof n == "object" ? JSON.parse(JSON.stringify(n)) : n;
}
function Qu(n) {
  (Array.isArray(n) ? n : [n]).forEach((e) => e(Fn));
}
var ke = {},
  zr = !1;
function Ju(n, t) {
  if ((zr || ((ke = un(ke)), (zr = !0)), t === void 0)) return ke[n];
  ((ke[n] = t),
    Fo(ke[n]),
    typeof t == "object" &&
      t !== null &&
      t.hasOwnProperty("init") &&
      typeof t.init == "function" &&
      ke[n].init());
}
function tl() {
  return ke;
}
var ma = {};
function el(n, t) {
  let e = typeof t != "function" ? () => t : t;
  return n instanceof Element ? _a(n, e()) : ((ma[n] = e), () => {});
}
function nl(n) {
  return (
    Object.entries(ma).forEach(([t, e]) => {
      Object.defineProperty(n, t, {
        get() {
          return (...s) => e(...s);
        },
      });
    }),
    n
  );
}
function _a(n, t, e) {
  let s = [];
  for (; s.length;) s.pop()();
  let i = Object.entries(t).map(([o, a]) => ({ name: o, value: a })),
    r = Bo(i);
  return (
    (i = i.map((o) =>
      r.find((a) => a.name === o.name)
        ? { name: `x-bind:${o.name}`, value: `"${o.value}"` }
        : o,
    )),
    ji(n, i, e).map((o) => {
      (s.push(o.runCleanups), o());
    }),
    () => {
      for (; s.length;) s.pop()();
    }
  );
}
var ga = {};
function sl(n, t) {
  ga[n] = t;
}
function il(n, t) {
  return (
    Object.entries(ga).forEach(([e, s]) => {
      Object.defineProperty(n, e, {
        get() {
          return (...i) => s.bind(t)(...i);
        },
        enumerable: !1,
      });
    }),
    n
  );
}
var rl = {
    get reactive() {
      return un;
    },
    get release() {
      return ln;
    },
    get effect() {
      return We;
    },
    get raw() {
      return Ao;
    },
    version: "3.14.9",
    flushAndStopDeferringMutations: au,
    dontAutoEvaluateFunctions: qo,
    disableEffectScheduling: tu,
    startObservingMutations: Vi,
    stopObservingMutations: Ro,
    setReactivityEngine: eu,
    onAttributeRemoved: Io,
    onAttributesAdded: Mo,
    closestDataStack: tn,
    skipDuringClone: ye,
    onlyDuringClone: Fu,
    addRootSelector: ta,
    addInitSelector: ea,
    interceptClone: Ns,
    addScopeToNode: Rn,
    deferMutations: ou,
    mapAttributes: Bi,
    evaluateLater: xt,
    interceptInit: Cu,
    setEvaluator: fu,
    mergeProxies: Pn,
    extractProp: Ku,
    findClosest: dn,
    onElRemoved: Ri,
    closestRoot: As,
    destroyTree: fn,
    interceptor: Vo,
    transition: yi,
    setStyles: ks,
    mutateDom: at,
    directive: pt,
    entangle: pa,
    throttle: fa,
    debounce: da,
    evaluate: Me,
    initTree: ne,
    nextTick: zi,
    prefixed: hn,
    prefix: gu,
    plugin: Qu,
    magic: Ut,
    store: Ju,
    start: xu,
    clone: Lu,
    cloneNode: Vu,
    bound: Yu,
    $data: Po,
    watch: ko,
    walk: Pe,
    data: sl,
    bind: el,
  },
  Fn = rl;
function ol(n, t) {
  const e = Object.create(null),
    s = n.split(",");
  for (let i = 0; i < s.length; i++) e[s[i]] = !0;
  return (i) => !!e[i];
}
var al = Object.freeze({}),
  cl = Object.prototype.hasOwnProperty,
  Os = (n, t) => cl.call(n, t),
  Ie = Array.isArray,
  kn = (n) => ya(n) === "[object Map]",
  ul = (n) => typeof n == "string",
  Hi = (n) => typeof n == "symbol",
  Es = (n) => n !== null && typeof n == "object",
  ll = Object.prototype.toString,
  ya = (n) => ll.call(n),
  va = (n) => ya(n).slice(8, -1),
  Xi = (n) =>
    ul(n) && n !== "NaN" && n[0] !== "-" && "" + parseInt(n, 10) === n,
  hl = (n) => {
    const t = Object.create(null);
    return (e) => t[e] || (t[e] = n(e));
  },
  dl = hl((n) => n.charAt(0).toUpperCase() + n.slice(1)),
  wa = (n, t) => n !== t && (n === n || t === t),
  wi = new WeakMap(),
  Sn = [],
  Zt,
  De = Symbol("iterate"),
  Ti = Symbol("Map key iterate");
function fl(n) {
  return n && n._isEffect === !0;
}
function pl(n, t = al) {
  fl(n) && (n = n.raw);
  const e = gl(n, t);
  return (t.lazy || e(), e);
}
function ml(n) {
  n.active && (Ta(n), n.options.onStop && n.options.onStop(), (n.active = !1));
}
var _l = 0;
function gl(n, t) {
  const e = function () {
    if (!e.active) return n();
    if (!Sn.includes(e)) {
      Ta(e);
      try {
        return (vl(), Sn.push(e), (Zt = e), n());
      } finally {
        (Sn.pop(), ba(), (Zt = Sn[Sn.length - 1]));
      }
    }
  };
  return (
    (e.id = _l++),
    (e.allowRecurse = !!t.allowRecurse),
    (e._isEffect = !0),
    (e.active = !0),
    (e.raw = n),
    (e.deps = []),
    (e.options = t),
    e
  );
}
function Ta(n) {
  const { deps: t } = n;
  if (t.length) {
    for (let e = 0; e < t.length; e++) t[e].delete(n);
    t.length = 0;
  }
}
var en = !0,
  Yi = [];
function yl() {
  (Yi.push(en), (en = !1));
}
function vl() {
  (Yi.push(en), (en = !0));
}
function ba() {
  const n = Yi.pop();
  en = n === void 0 ? !0 : n;
}
function jt(n, t, e) {
  if (!en || Zt === void 0) return;
  let s = wi.get(n);
  s || wi.set(n, (s = new Map()));
  let i = s.get(e);
  (i || s.set(e, (i = new Set())),
    i.has(Zt) ||
      (i.add(Zt),
      Zt.deps.push(i),
      Zt.options.onTrack &&
        Zt.options.onTrack({ effect: Zt, target: n, type: t, key: e })));
}
function me(n, t, e, s, i, r) {
  const o = wi.get(n);
  if (!o) return;
  const a = new Set(),
    c = (l) => {
      l &&
        l.forEach((h) => {
          (h !== Zt || h.allowRecurse) && a.add(h);
        });
    };
  if (t === "clear") o.forEach(c);
  else if (e === "length" && Ie(n))
    o.forEach((l, h) => {
      (h === "length" || h >= s) && c(l);
    });
  else
    switch ((e !== void 0 && c(o.get(e)), t)) {
      case "add":
        Ie(n)
          ? Xi(e) && c(o.get("length"))
          : (c(o.get(De)), kn(n) && c(o.get(Ti)));
        break;
      case "delete":
        Ie(n) || (c(o.get(De)), kn(n) && c(o.get(Ti)));
        break;
      case "set":
        kn(n) && c(o.get(De));
        break;
    }
  const u = (l) => {
    (l.options.onTrigger &&
      l.options.onTrigger({
        effect: l,
        target: n,
        key: e,
        type: t,
        newValue: s,
        oldValue: i,
        oldTarget: r,
      }),
      l.options.scheduler ? l.options.scheduler(l) : l());
  };
  a.forEach(u);
}
var wl = ol("__proto__,__v_isRef,__isVue"),
  xa = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((n) => Symbol[n])
      .filter(Hi),
  ),
  Tl = Sa(),
  bl = Sa(!0),
  Gr = xl();
function xl() {
  const n = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      n[t] = function (...e) {
        const s = tt(this);
        for (let r = 0, o = this.length; r < o; r++) jt(s, "get", r + "");
        const i = s[t](...e);
        return i === -1 || i === !1 ? s[t](...e.map(tt)) : i;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      n[t] = function (...e) {
        yl();
        const s = tt(this)[t].apply(this, e);
        return (ba(), s);
      };
    }),
    n
  );
}
function Sa(n = !1, t = !1) {
  return function (s, i, r) {
    if (i === "__v_isReactive") return !n;
    if (i === "__v_isReadonly") return n;
    if (i === "__v_raw" && r === (n ? (t ? Vl : Na) : t ? Fl : ka).get(s))
      return s;
    const o = Ie(s);
    if (!n && o && Os(Gr, i)) return Reflect.get(Gr, i, r);
    const a = Reflect.get(s, i, r);
    return (Hi(i) ? xa.has(i) : wl(i)) || (n || jt(s, "get", i), t)
      ? a
      : bi(a)
        ? !o || !Xi(i)
          ? a.value
          : a
        : Es(a)
          ? n
            ? Oa(a)
            : tr(a)
          : a;
  };
}
var Sl = Cl();
function Cl(n = !1) {
  return function (e, s, i, r) {
    let o = e[s];
    if (!n && ((i = tt(i)), (o = tt(o)), !Ie(e) && bi(o) && !bi(i)))
      return ((o.value = i), !0);
    const a = Ie(e) && Xi(s) ? Number(s) < e.length : Os(e, s),
      c = Reflect.set(e, s, i, r);
    return (
      e === tt(r) &&
        (a ? wa(i, o) && me(e, "set", s, i, o) : me(e, "add", s, i)),
      c
    );
  };
}
function Al(n, t) {
  const e = Os(n, t),
    s = n[t],
    i = Reflect.deleteProperty(n, t);
  return (i && e && me(n, "delete", t, void 0, s), i);
}
function kl(n, t) {
  const e = Reflect.has(n, t);
  return ((!Hi(t) || !xa.has(t)) && jt(n, "has", t), e);
}
function Nl(n) {
  return (jt(n, "iterate", Ie(n) ? "length" : De), Reflect.ownKeys(n));
}
var Ol = { get: Tl, set: Sl, deleteProperty: Al, has: kl, ownKeys: Nl },
  El = {
    get: bl,
    set(n, t) {
      return (
        console.warn(
          `Set operation on key "${String(t)}" failed: target is readonly.`,
          n,
        ),
        !0
      );
    },
    deleteProperty(n, t) {
      return (
        console.warn(
          `Delete operation on key "${String(t)}" failed: target is readonly.`,
          n,
        ),
        !0
      );
    },
  },
  Ki = (n) => (Es(n) ? tr(n) : n),
  Qi = (n) => (Es(n) ? Oa(n) : n),
  Ji = (n) => n,
  Ms = (n) => Reflect.getPrototypeOf(n);
function Xn(n, t, e = !1, s = !1) {
  n = n.__v_raw;
  const i = tt(n),
    r = tt(t);
  (t !== r && !e && jt(i, "get", t), !e && jt(i, "get", r));
  const { has: o } = Ms(i),
    a = s ? Ji : e ? Qi : Ki;
  if (o.call(i, t)) return a(n.get(t));
  if (o.call(i, r)) return a(n.get(r));
  n !== i && n.get(t);
}
function Yn(n, t = !1) {
  const e = this.__v_raw,
    s = tt(e),
    i = tt(n);
  return (
    n !== i && !t && jt(s, "has", n),
    !t && jt(s, "has", i),
    n === i ? e.has(n) : e.has(n) || e.has(i)
  );
}
function Kn(n, t = !1) {
  return (
    (n = n.__v_raw),
    !t && jt(tt(n), "iterate", De),
    Reflect.get(n, "size", n)
  );
}
function Zr(n) {
  n = tt(n);
  const t = tt(this);
  return (Ms(t).has.call(t, n) || (t.add(n), me(t, "add", n, n)), this);
}
function Hr(n, t) {
  t = tt(t);
  const e = tt(this),
    { has: s, get: i } = Ms(e);
  let r = s.call(e, n);
  r ? Aa(e, s, n) : ((n = tt(n)), (r = s.call(e, n)));
  const o = i.call(e, n);
  return (
    e.set(n, t),
    r ? wa(t, o) && me(e, "set", n, t, o) : me(e, "add", n, t),
    this
  );
}
function Xr(n) {
  const t = tt(this),
    { has: e, get: s } = Ms(t);
  let i = e.call(t, n);
  i ? Aa(t, e, n) : ((n = tt(n)), (i = e.call(t, n)));
  const r = s ? s.call(t, n) : void 0,
    o = t.delete(n);
  return (i && me(t, "delete", n, void 0, r), o);
}
function Yr() {
  const n = tt(this),
    t = n.size !== 0,
    e = kn(n) ? new Map(n) : new Set(n),
    s = n.clear();
  return (t && me(n, "clear", void 0, void 0, e), s);
}
function Qn(n, t) {
  return function (s, i) {
    const r = this,
      o = r.__v_raw,
      a = tt(o),
      c = t ? Ji : n ? Qi : Ki;
    return (
      !n && jt(a, "iterate", De),
      o.forEach((u, l) => s.call(i, c(u), c(l), r))
    );
  };
}
function Jn(n, t, e) {
  return function (...s) {
    const i = this.__v_raw,
      r = tt(i),
      o = kn(r),
      a = n === "entries" || (n === Symbol.iterator && o),
      c = n === "keys" && o,
      u = i[n](...s),
      l = e ? Ji : t ? Qi : Ki;
    return (
      !t && jt(r, "iterate", c ? Ti : De),
      {
        next() {
          const { value: h, done: d } = u.next();
          return d
            ? { value: h, done: d }
            : { value: a ? [l(h[0]), l(h[1])] : l(h), done: d };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function ue(n) {
  return function (...t) {
    {
      const e = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(
        `${dl(n)} operation ${e}failed: target is readonly.`,
        tt(this),
      );
    }
    return n === "delete" ? !1 : this;
  };
}
function Ml() {
  const n = {
      get(r) {
        return Xn(this, r);
      },
      get size() {
        return Kn(this);
      },
      has: Yn,
      add: Zr,
      set: Hr,
      delete: Xr,
      clear: Yr,
      forEach: Qn(!1, !1),
    },
    t = {
      get(r) {
        return Xn(this, r, !1, !0);
      },
      get size() {
        return Kn(this);
      },
      has: Yn,
      add: Zr,
      set: Hr,
      delete: Xr,
      clear: Yr,
      forEach: Qn(!1, !0),
    },
    e = {
      get(r) {
        return Xn(this, r, !0);
      },
      get size() {
        return Kn(this, !0);
      },
      has(r) {
        return Yn.call(this, r, !0);
      },
      add: ue("add"),
      set: ue("set"),
      delete: ue("delete"),
      clear: ue("clear"),
      forEach: Qn(!0, !1),
    },
    s = {
      get(r) {
        return Xn(this, r, !0, !0);
      },
      get size() {
        return Kn(this, !0);
      },
      has(r) {
        return Yn.call(this, r, !0);
      },
      add: ue("add"),
      set: ue("set"),
      delete: ue("delete"),
      clear: ue("clear"),
      forEach: Qn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
      ((n[r] = Jn(r, !1, !1)),
        (e[r] = Jn(r, !0, !1)),
        (t[r] = Jn(r, !1, !0)),
        (s[r] = Jn(r, !0, !0)));
    }),
    [n, e, t, s]
  );
}
var [Il, Dl, Y_, K_] = Ml();
function Ca(n, t) {
  const e = n ? Dl : Il;
  return (s, i, r) =>
    i === "__v_isReactive"
      ? !n
      : i === "__v_isReadonly"
        ? n
        : i === "__v_raw"
          ? s
          : Reflect.get(Os(e, i) && i in s ? e : s, i, r);
}
var Rl = { get: Ca(!1) },
  Pl = { get: Ca(!0) };
function Aa(n, t, e) {
  const s = tt(e);
  if (s !== e && t.call(n, s)) {
    const i = va(n);
    console.warn(
      `Reactive ${i} contains both the raw and reactive versions of the same object${
        i === "Map" ? " as keys" : ""
      }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`,
    );
  }
}
var ka = new WeakMap(),
  Fl = new WeakMap(),
  Na = new WeakMap(),
  Vl = new WeakMap();
function Ll(n) {
  switch (n) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ql(n) {
  return n.__v_skip || !Object.isExtensible(n) ? 0 : Ll(va(n));
}
function tr(n) {
  return n && n.__v_isReadonly ? n : Ea(n, !1, Ol, Rl, ka);
}
function Oa(n) {
  return Ea(n, !0, El, Pl, Na);
}
function Ea(n, t, e, s, i) {
  if (!Es(n))
    return (console.warn(`value cannot be made reactive: ${String(n)}`), n);
  if (n.__v_raw && !(t && n.__v_isReactive)) return n;
  const r = i.get(n);
  if (r) return r;
  const o = ql(n);
  if (o === 0) return n;
  const a = new Proxy(n, o === 2 ? s : e);
  return (i.set(n, a), a);
}
function tt(n) {
  return (n && tt(n.__v_raw)) || n;
}
function bi(n) {
  return !!(n && n.__v_isRef === !0);
}
Ut("nextTick", () => zi);
Ut("dispatch", (n) => An.bind(An, n));
Ut("watch", (n, { evaluateLater: t, cleanup: e }) => (s, i) => {
  let r = t(s),
    a = ko(() => {
      let c;
      return (r((u) => (c = u)), c);
    }, i);
  e(a);
});
Ut("store", tl);
Ut("data", (n) => Po(n));
Ut("root", (n) => As(n));
Ut(
  "refs",
  (n) => (n._x_refs_proxy || (n._x_refs_proxy = Pn(Wl(n))), n._x_refs_proxy),
);
function Wl(n) {
  let t = [];
  return (
    dn(n, (e) => {
      e._x_refs && t.push(e._x_refs);
    }),
    t
  );
}
var si = {};
function Ma(n) {
  return (si[n] || (si[n] = 0), ++si[n]);
}
function jl(n, t) {
  return dn(n, (e) => {
    if (e._x_ids && e._x_ids[t]) return !0;
  });
}
function Bl(n, t) {
  (n._x_ids || (n._x_ids = {}), n._x_ids[t] || (n._x_ids[t] = Ma(t)));
}
Ut("id", (n, { cleanup: t }) => (e, s = null) => {
  let i = `${e}${s ? `-${s}` : ""}`;
  return Ul(n, i, t, () => {
    let r = jl(n, e),
      o = r ? r._x_ids[e] : Ma(e);
    return s ? `${e}-${o}-${s}` : `${e}-${o}`;
  });
});
Ns((n, t) => {
  n._x_id && (t._x_id = n._x_id);
});
function Ul(n, t, e, s) {
  if ((n._x_id || (n._x_id = {}), n._x_id[t])) return n._x_id[t];
  let i = s();
  return (
    (n._x_id[t] = i),
    e(() => {
      delete n._x_id[t];
    }),
    i
  );
}
Ut("el", (n) => n);
Ia("Focus", "focus", "focus");
Ia("Persist", "persist", "persist");
function Ia(n, t, e) {
  Ut(t, (s) =>
    Dt(
      `You can't use [$${t}] without first installing the "${n}" plugin here: https://alpinejs.dev/plugins/${e}`,
      s,
    ),
  );
}
pt(
  "modelable",
  (n, { expression: t }, { effect: e, evaluateLater: s, cleanup: i }) => {
    let r = s(t),
      o = () => {
        let l;
        return (r((h) => (l = h)), l);
      },
      a = s(`${t} = __placeholder`),
      c = (l) => a(() => {}, { scope: { __placeholder: l } }),
      u = o();
    (c(u),
      queueMicrotask(() => {
        if (!n._x_model) return;
        n._x_removeModelListeners.default();
        let l = n._x_model.get,
          h = n._x_model.set,
          d = pa(
            {
              get() {
                return l();
              },
              set(p) {
                h(p);
              },
            },
            {
              get() {
                return o();
              },
              set(p) {
                c(p);
              },
            },
          );
        i(d);
      }));
  },
);
pt("teleport", (n, { modifiers: t, expression: e }, { cleanup: s }) => {
  n.tagName.toLowerCase() !== "template" &&
    Dt("x-teleport can only be used on a <template> tag", n);
  let i = Kr(e),
    r = n.content.cloneNode(!0).firstElementChild;
  ((n._x_teleport = r),
    (r._x_teleportBack = n),
    n.setAttribute("data-teleport-template", !0),
    r.setAttribute("data-teleport-target", !0),
    n._x_forwardEvents &&
      n._x_forwardEvents.forEach((a) => {
        r.addEventListener(a, (c) => {
          (c.stopPropagation(), n.dispatchEvent(new c.constructor(c.type, c)));
        });
      }),
    Rn(r, {}, n));
  let o = (a, c, u) => {
    u.includes("prepend")
      ? c.parentNode.insertBefore(a, c)
      : u.includes("append")
        ? c.parentNode.insertBefore(a, c.nextSibling)
        : c.appendChild(a);
  };
  (at(() => {
    (o(r, i, t),
      ye(() => {
        ne(r);
      })());
  }),
    (n._x_teleportPutBack = () => {
      let a = Kr(e);
      at(() => {
        o(n._x_teleport, a, t);
      });
    }),
    s(() =>
      at(() => {
        (r.remove(), fn(r));
      }),
    ));
});
var $l = document.createElement("div");
function Kr(n) {
  let t = ye(
    () => document.querySelector(n),
    () => $l,
  )();
  return (t || Dt(`Cannot find x-teleport element for selector: "${n}"`), t);
}
var Da = () => {};
Da.inline = (n, { modifiers: t }, { cleanup: e }) => {
  (t.includes("self") ? (n._x_ignoreSelf = !0) : (n._x_ignore = !0),
    e(() => {
      t.includes("self") ? delete n._x_ignoreSelf : delete n._x_ignore;
    }));
};
pt("ignore", Da);
pt(
  "effect",
  ye((n, { expression: t }, { effect: e }) => {
    e(xt(n, t));
  }),
);
function xi(n, t, e, s) {
  let i = n,
    r = (c) => s(c),
    o = {},
    a = (c, u) => (l) => u(c, l);
  if (
    (e.includes("dot") && (t = zl(t)),
    e.includes("camel") && (t = Gl(t)),
    e.includes("passive") && (o.passive = !0),
    e.includes("capture") && (o.capture = !0),
    e.includes("window") && (i = window),
    e.includes("document") && (i = document),
    e.includes("debounce"))
  ) {
    let c = e[e.indexOf("debounce") + 1] || "invalid-wait",
      u = hs(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
    r = da(r, u);
  }
  if (e.includes("throttle")) {
    let c = e[e.indexOf("throttle") + 1] || "invalid-wait",
      u = hs(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
    r = fa(r, u);
  }
  return (
    e.includes("prevent") &&
      (r = a(r, (c, u) => {
        (u.preventDefault(), c(u));
      })),
    e.includes("stop") &&
      (r = a(r, (c, u) => {
        (u.stopPropagation(), c(u));
      })),
    e.includes("once") &&
      (r = a(r, (c, u) => {
        (c(u), i.removeEventListener(t, r, o));
      })),
    (e.includes("away") || e.includes("outside")) &&
      ((i = document),
      (r = a(r, (c, u) => {
        n.contains(u.target) ||
          (u.target.isConnected !== !1 &&
            ((n.offsetWidth < 1 && n.offsetHeight < 1) ||
              (n._x_isShown !== !1 && c(u))));
      }))),
    e.includes("self") &&
      (r = a(r, (c, u) => {
        u.target === n && c(u);
      })),
    (Hl(t) || Ra(t)) &&
      (r = a(r, (c, u) => {
        Xl(u, e) || c(u);
      })),
    i.addEventListener(t, r, o),
    () => {
      i.removeEventListener(t, r, o);
    }
  );
}
function zl(n) {
  return n.replace(/-/g, ".");
}
function Gl(n) {
  return n.toLowerCase().replace(/-(\w)/g, (t, e) => e.toUpperCase());
}
function hs(n) {
  return !Array.isArray(n) && !isNaN(n);
}
function Zl(n) {
  return [" ", "_"].includes(n)
    ? n
    : n
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[_\s]/, "-")
        .toLowerCase();
}
function Hl(n) {
  return ["keydown", "keyup"].includes(n);
}
function Ra(n) {
  return ["contextmenu", "click", "mouse"].some((t) => n.includes(t));
}
function Xl(n, t) {
  let e = t.filter(
    (r) =>
      ![
        "window",
        "document",
        "prevent",
        "stop",
        "once",
        "capture",
        "self",
        "away",
        "outside",
        "passive",
      ].includes(r),
  );
  if (e.includes("debounce")) {
    let r = e.indexOf("debounce");
    e.splice(r, hs((e[r + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (e.includes("throttle")) {
    let r = e.indexOf("throttle");
    e.splice(r, hs((e[r + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (e.length === 0 || (e.length === 1 && Qr(n.key).includes(e[0]))) return !1;
  const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((r) =>
    e.includes(r),
  );
  return (
    (e = e.filter((r) => !i.includes(r))),
    !(
      i.length > 0 &&
      i.filter(
        (o) => ((o === "cmd" || o === "super") && (o = "meta"), n[`${o}Key`]),
      ).length === i.length &&
      (Ra(n.type) || Qr(n.key).includes(e[0]))
    )
  );
}
function Qr(n) {
  if (!n) return [];
  n = Zl(n);
  let t = {
    ctrl: "control",
    slash: "/",
    space: " ",
    spacebar: " ",
    cmd: "meta",
    esc: "escape",
    up: "arrow-up",
    down: "arrow-down",
    left: "arrow-left",
    right: "arrow-right",
    period: ".",
    comma: ",",
    equal: "=",
    minus: "-",
    underscore: "_",
  };
  return (
    (t[n] = n),
    Object.keys(t)
      .map((e) => {
        if (t[e] === n) return e;
      })
      .filter((e) => e)
  );
}
pt("model", (n, { modifiers: t, expression: e }, { effect: s, cleanup: i }) => {
  let r = n;
  t.includes("parent") && (r = n.parentNode);
  let o = xt(r, e),
    a;
  typeof e == "string"
    ? (a = xt(r, `${e} = __placeholder`))
    : typeof e == "function" && typeof e() == "string"
      ? (a = xt(r, `${e()} = __placeholder`))
      : (a = () => {});
  let c = () => {
      let d;
      return (o((p) => (d = p)), Jr(d) ? d.get() : d);
    },
    u = (d) => {
      let p;
      (o((f) => (p = f)),
        Jr(p) ? p.set(d) : a(() => {}, { scope: { __placeholder: d } }));
    };
  typeof e == "string" &&
    n.type === "radio" &&
    at(() => {
      n.hasAttribute("name") || n.setAttribute("name", e);
    });
  var l =
    n.tagName.toLowerCase() === "select" ||
    ["checkbox", "radio"].includes(n.type) ||
    t.includes("lazy")
      ? "change"
      : "input";
  let h = pe
    ? () => {}
    : xi(n, l, t, (d) => {
        u(ii(n, t, d, c()));
      });
  if (
    (t.includes("fill") &&
      ([void 0, null, ""].includes(c()) ||
        (Zi(n) && Array.isArray(c())) ||
        (n.tagName.toLowerCase() === "select" && n.multiple)) &&
      u(ii(n, t, { target: n }, c())),
    n._x_removeModelListeners || (n._x_removeModelListeners = {}),
    (n._x_removeModelListeners.default = h),
    i(() => n._x_removeModelListeners.default()),
    n.form)
  ) {
    let d = xi(n.form, "reset", [], (p) => {
      zi(() => n._x_model && n._x_model.set(ii(n, t, { target: n }, c())));
    });
    i(() => d());
  }
  ((n._x_model = {
    get() {
      return c();
    },
    set(d) {
      u(d);
    },
  }),
    (n._x_forceModelUpdate = (d) => {
      (d === void 0 && typeof e == "string" && e.match(/\./) && (d = ""),
        (window.fromModel = !0),
        at(() => aa(n, "value", d)),
        delete window.fromModel);
    }),
    s(() => {
      let d = c();
      (t.includes("unintrusive") && document.activeElement.isSameNode(n)) ||
        n._x_forceModelUpdate(d);
    }));
});
function ii(n, t, e, s) {
  return at(() => {
    if (e instanceof CustomEvent && e.detail !== void 0)
      return e.detail !== null && e.detail !== void 0
        ? e.detail
        : e.target.value;
    if (Zi(n))
      if (Array.isArray(s)) {
        let i = null;
        return (
          t.includes("number")
            ? (i = ri(e.target.value))
            : t.includes("boolean")
              ? (i = rs(e.target.value))
              : (i = e.target.value),
          e.target.checked
            ? s.includes(i)
              ? s
              : s.concat([i])
            : s.filter((r) => !Yl(r, i))
        );
      } else return e.target.checked;
    else {
      if (n.tagName.toLowerCase() === "select" && n.multiple)
        return t.includes("number")
          ? Array.from(e.target.selectedOptions).map((i) => {
              let r = i.value || i.text;
              return ri(r);
            })
          : t.includes("boolean")
            ? Array.from(e.target.selectedOptions).map((i) => {
                let r = i.value || i.text;
                return rs(r);
              })
            : Array.from(e.target.selectedOptions).map(
                (i) => i.value || i.text,
              );
      {
        let i;
        return (
          ha(n)
            ? e.target.checked
              ? (i = e.target.value)
              : (i = s)
            : (i = e.target.value),
          t.includes("number")
            ? ri(i)
            : t.includes("boolean")
              ? rs(i)
              : t.includes("trim")
                ? i.trim()
                : i
        );
      }
    }
  });
}
function ri(n) {
  let t = n ? parseFloat(n) : null;
  return Kl(t) ? t : n;
}
function Yl(n, t) {
  return n == t;
}
function Kl(n) {
  return !Array.isArray(n) && !isNaN(n);
}
function Jr(n) {
  return (
    n !== null &&
    typeof n == "object" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  );
}
pt("cloak", (n) =>
  queueMicrotask(() => at(() => n.removeAttribute(hn("cloak")))),
);
ea(() => `[${hn("init")}]`);
pt(
  "init",
  ye((n, { expression: t }, { evaluate: e }) =>
    typeof t == "string" ? !!t.trim() && e(t, {}, !1) : e(t, {}, !1),
  ),
);
pt("text", (n, { expression: t }, { effect: e, evaluateLater: s }) => {
  let i = s(t);
  e(() => {
    i((r) => {
      at(() => {
        n.textContent = r;
      });
    });
  });
});
pt("html", (n, { expression: t }, { effect: e, evaluateLater: s }) => {
  let i = s(t);
  e(() => {
    i((r) => {
      at(() => {
        ((n.innerHTML = r),
          (n._x_ignoreSelf = !0),
          ne(n),
          delete n._x_ignoreSelf);
      });
    });
  });
});
Bi(zo(":", Go(hn("bind:"))));
var Pa = (
  n,
  { value: t, modifiers: e, expression: s, original: i },
  { effect: r, cleanup: o },
) => {
  if (!t) {
    let c = {};
    (nl(c),
      xt(n, s)(
        (l) => {
          _a(n, l, i);
        },
        { scope: c },
      ));
    return;
  }
  if (t === "key") return Ql(n, s);
  if (
    n._x_inlineBindings &&
    n._x_inlineBindings[t] &&
    n._x_inlineBindings[t].extract
  )
    return;
  let a = xt(n, s);
  (r(() =>
    a((c) => {
      (c === void 0 && typeof s == "string" && s.match(/\./) && (c = ""),
        at(() => aa(n, t, c, e)));
    }),
  ),
    o(() => {
      (n._x_undoAddedClasses && n._x_undoAddedClasses(),
        n._x_undoAddedStyles && n._x_undoAddedStyles());
    }));
};
Pa.inline = (n, { value: t, modifiers: e, expression: s }) => {
  t &&
    (n._x_inlineBindings || (n._x_inlineBindings = {}),
    (n._x_inlineBindings[t] = { expression: s, extract: !1 }));
};
pt("bind", Pa);
function Ql(n, t) {
  n._x_keyExpression = t;
}
ta(() => `[${hn("data")}]`);
pt("data", (n, { expression: t }, { cleanup: e }) => {
  if (Jl(n)) return;
  t = t === "" ? "{}" : t;
  let s = {};
  di(s, n);
  let i = {};
  il(i, s);
  let r = Me(n, t, { scope: i });
  ((r === void 0 || r === !0) && (r = {}), di(r, n));
  let o = un(r);
  Fo(o);
  let a = Rn(n, o);
  (o.init && Me(n, o.init),
    e(() => {
      (o.destroy && Me(n, o.destroy), a());
    }));
});
Ns((n, t) => {
  n._x_dataStack &&
    ((t._x_dataStack = n._x_dataStack),
    t.setAttribute("data-has-alpine-state", !0));
});
function Jl(n) {
  return pe ? (vi ? !0 : n.hasAttribute("data-has-alpine-state")) : !1;
}
pt("show", (n, { modifiers: t, expression: e }, { effect: s }) => {
  let i = xt(n, e);
  (n._x_doHide ||
    (n._x_doHide = () => {
      at(() => {
        n.style.setProperty(
          "display",
          "none",
          t.includes("important") ? "important" : void 0,
        );
      });
    }),
    n._x_doShow ||
      (n._x_doShow = () => {
        at(() => {
          n.style.length === 1 && n.style.display === "none"
            ? n.removeAttribute("style")
            : n.style.removeProperty("display");
        });
      }));
  let r = () => {
      (n._x_doHide(), (n._x_isShown = !1));
    },
    o = () => {
      (n._x_doShow(), (n._x_isShown = !0));
    },
    a = () => setTimeout(o),
    c = gi(
      (h) => (h ? o() : r()),
      (h) => {
        typeof n._x_toggleAndCascadeWithTransitions == "function"
          ? n._x_toggleAndCascadeWithTransitions(n, h, o, r)
          : h
            ? a()
            : r();
      },
    ),
    u,
    l = !0;
  s(() =>
    i((h) => {
      (!l && h === u) ||
        (t.includes("immediate") && (h ? a() : r()), c(h), (u = h), (l = !1));
    }),
  );
});
pt("for", (n, { expression: t }, { effect: e, cleanup: s }) => {
  let i = eh(t),
    r = xt(n, i.items),
    o = xt(n, n._x_keyExpression || "index");
  ((n._x_prevKeys = []),
    (n._x_lookup = {}),
    e(() => th(n, i, r, o)),
    s(() => {
      (Object.values(n._x_lookup).forEach((a) =>
        at(() => {
          (fn(a), a.remove());
        }),
      ),
        delete n._x_prevKeys,
        delete n._x_lookup);
    }));
});
function th(n, t, e, s) {
  let i = (o) => typeof o == "object" && !Array.isArray(o),
    r = n;
  e((o) => {
    (nh(o) && o >= 0 && (o = Array.from(Array(o).keys(), (m) => m + 1)),
      o === void 0 && (o = []));
    let a = n._x_lookup,
      c = n._x_prevKeys,
      u = [],
      l = [];
    if (i(o))
      o = Object.entries(o).map(([m, g]) => {
        let T = to(t, g, m, o);
        (s(
          (x) => {
            (l.includes(x) && Dt("Duplicate key on x-for", n), l.push(x));
          },
          { scope: { index: m, ...T } },
        ),
          u.push(T));
      });
    else
      for (let m = 0; m < o.length; m++) {
        let g = to(t, o[m], m, o);
        (s(
          (T) => {
            (l.includes(T) && Dt("Duplicate key on x-for", n), l.push(T));
          },
          { scope: { index: m, ...g } },
        ),
          u.push(g));
      }
    let h = [],
      d = [],
      p = [],
      f = [];
    for (let m = 0; m < c.length; m++) {
      let g = c[m];
      l.indexOf(g) === -1 && p.push(g);
    }
    c = c.filter((m) => !p.includes(m));
    let _ = "template";
    for (let m = 0; m < l.length; m++) {
      let g = l[m],
        T = c.indexOf(g);
      if (T === -1) (c.splice(m, 0, g), h.push([_, m]));
      else if (T !== m) {
        let x = c.splice(m, 1)[0],
          S = c.splice(T - 1, 1)[0];
        (c.splice(m, 0, S), c.splice(T, 0, x), d.push([x, S]));
      } else f.push(g);
      _ = g;
    }
    for (let m = 0; m < p.length; m++) {
      let g = p[m];
      g in a &&
        (at(() => {
          (fn(a[g]), a[g].remove());
        }),
        delete a[g]);
    }
    for (let m = 0; m < d.length; m++) {
      let [g, T] = d[m],
        x = a[g],
        S = a[T],
        y = document.createElement("div");
      (at(() => {
        (S || Dt('x-for ":key" is undefined or invalid', r, T, a),
          S.after(y),
          x.after(S),
          S._x_currentIfEl && S.after(S._x_currentIfEl),
          y.before(x),
          x._x_currentIfEl && x.after(x._x_currentIfEl),
          y.remove());
      }),
        S._x_refreshXForScope(u[l.indexOf(T)]));
    }
    for (let m = 0; m < h.length; m++) {
      let [g, T] = h[m],
        x = g === "template" ? r : a[g];
      x._x_currentIfEl && (x = x._x_currentIfEl);
      let S = u[T],
        y = l[T],
        w = document.importNode(r.content, !0).firstElementChild,
        b = un(S);
      (Rn(w, b, r),
        (w._x_refreshXForScope = (v) => {
          Object.entries(v).forEach(([N, A]) => {
            b[N] = A;
          });
        }),
        at(() => {
          (x.after(w), ye(() => ne(w))());
        }),
        typeof y == "object" &&
          Dt(
            "x-for key cannot be an object, it must be a string or an integer",
            r,
          ),
        (a[y] = w));
    }
    for (let m = 0; m < f.length; m++)
      a[f[m]]._x_refreshXForScope(u[l.indexOf(f[m])]);
    r._x_prevKeys = l;
  });
}
function eh(n) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
    e = /^\s*\(|\)\s*$/g,
    s = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
    i = n.match(s);
  if (!i) return;
  let r = {};
  r.items = i[2].trim();
  let o = i[1].replace(e, "").trim(),
    a = o.match(t);
  return (
    a
      ? ((r.item = o.replace(t, "").trim()),
        (r.index = a[1].trim()),
        a[2] && (r.collection = a[2].trim()))
      : (r.item = o),
    r
  );
}
function to(n, t, e, s) {
  let i = {};
  return (
    /^\[.*\]$/.test(n.item) && Array.isArray(t)
      ? n.item
          .replace("[", "")
          .replace("]", "")
          .split(",")
          .map((o) => o.trim())
          .forEach((o, a) => {
            i[o] = t[a];
          })
      : /^\{.*\}$/.test(n.item) && !Array.isArray(t) && typeof t == "object"
        ? n.item
            .replace("{", "")
            .replace("}", "")
            .split(",")
            .map((o) => o.trim())
            .forEach((o) => {
              i[o] = t[o];
            })
        : (i[n.item] = t),
    n.index && (i[n.index] = e),
    n.collection && (i[n.collection] = s),
    i
  );
}
function nh(n) {
  return !Array.isArray(n) && !isNaN(n);
}
function Fa() {}
Fa.inline = (n, { expression: t }, { cleanup: e }) => {
  let s = As(n);
  (s._x_refs || (s._x_refs = {}),
    (s._x_refs[t] = n),
    e(() => delete s._x_refs[t]));
};
pt("ref", Fa);
pt("if", (n, { expression: t }, { effect: e, cleanup: s }) => {
  n.tagName.toLowerCase() !== "template" &&
    Dt("x-if can only be used on a <template> tag", n);
  let i = xt(n, t),
    r = () => {
      if (n._x_currentIfEl) return n._x_currentIfEl;
      let a = n.content.cloneNode(!0).firstElementChild;
      return (
        Rn(a, {}, n),
        at(() => {
          (n.after(a), ye(() => ne(a))());
        }),
        (n._x_currentIfEl = a),
        (n._x_undoIf = () => {
          (at(() => {
            (fn(a), a.remove());
          }),
            delete n._x_currentIfEl);
        }),
        a
      );
    },
    o = () => {
      n._x_undoIf && (n._x_undoIf(), delete n._x_undoIf);
    };
  (e(() =>
    i((a) => {
      a ? r() : o();
    }),
  ),
    s(() => n._x_undoIf && n._x_undoIf()));
});
pt("id", (n, { expression: t }, { evaluate: e }) => {
  e(t).forEach((i) => Bl(n, i));
});
Ns((n, t) => {
  n._x_ids && (t._x_ids = n._x_ids);
});
Bi(zo("@", Go(hn("on:"))));
pt(
  "on",
  ye((n, { value: t, modifiers: e, expression: s }, { cleanup: i }) => {
    let r = s ? xt(n, s) : () => {};
    n.tagName.toLowerCase() === "template" &&
      (n._x_forwardEvents || (n._x_forwardEvents = []),
      n._x_forwardEvents.includes(t) || n._x_forwardEvents.push(t));
    let o = xi(n, t, e, (a) => {
      r(() => {}, { scope: { $event: a }, params: [a] });
    });
    i(() => o());
  }),
);
Is("Collapse", "collapse", "collapse");
Is("Intersect", "intersect", "intersect");
Is("Focus", "trap", "focus");
Is("Mask", "mask", "mask");
function Is(n, t, e) {
  pt(t, (s) =>
    Dt(
      `You can't use [x-${t}] without first installing the "${n}" plugin here: https://alpinejs.dev/plugins/${e}`,
      s,
    ),
  );
}
Fn.setEvaluator(jo);
Fn.setReactivityEngine({ reactive: tr, effect: pl, release: ml, raw: tt });
var sh = Fn,
  er = sh;
const Va = "15.1.22",
  eo = (n, t, e) => ({
    endTime: t,
    insertTime: e,
    type: "exponentialRampToValue",
    value: n,
  }),
  no = (n, t, e) => ({
    endTime: t,
    insertTime: e,
    type: "linearRampToValue",
    value: n,
  }),
  Si = (n, t) => ({ startTime: t, type: "setValue", value: n }),
  La = (n, t, e) => ({
    duration: e,
    startTime: t,
    type: "setValueCurve",
    values: n,
  }),
  qa = (n, t, { startTime: e, target: s, timeConstant: i }) =>
    s + (t - s) * Math.exp((e - n) / i),
  He = (n) => n.type === "exponentialRampToValue",
  ds = (n) => n.type === "linearRampToValue",
  he = (n) => He(n) || ds(n),
  nr = (n) => n.type === "setValue",
  te = (n) => n.type === "setValueCurve",
  fs = (n, t, e, s) => {
    const i = n[t];
    return i === void 0
      ? s
      : he(i) || nr(i)
        ? i.value
        : te(i)
          ? i.values[i.values.length - 1]
          : qa(e, fs(n, t - 1, i.startTime, s), i);
  },
  so = (n, t, e, s, i) =>
    e === void 0
      ? [s.insertTime, i]
      : he(e)
        ? [e.endTime, e.value]
        : nr(e)
          ? [e.startTime, e.value]
          : te(e)
            ? [e.startTime + e.duration, e.values[e.values.length - 1]]
            : [e.startTime, fs(n, t - 1, e.startTime, i)],
  Ci = (n) => n.type === "cancelAndHold",
  Ai = (n) => n.type === "cancelScheduledValues",
  le = (n) =>
    Ci(n) || Ai(n) ? n.cancelTime : He(n) || ds(n) ? n.endTime : n.startTime,
  io = (n, t, e, { endTime: s, value: i }) =>
    e === i
      ? i
      : (0 < e && 0 < i) || (e < 0 && i < 0)
        ? e * (i / e) ** ((n - t) / (s - t))
        : 0,
  ro = (n, t, e, { endTime: s, value: i }) => e + ((n - t) / (s - t)) * (i - e),
  ih = (n, t) => {
    const e = Math.floor(t),
      s = Math.ceil(t);
    return e === s ? n[e] : (1 - (t - e)) * n[e] + (1 - (s - t)) * n[s];
  },
  rh = (n, { duration: t, startTime: e, values: s }) => {
    const i = ((n - e) / t) * (s.length - 1);
    return ih(s, i);
  },
  ts = (n) => n.type === "setTarget";
class oh {
  constructor(t) {
    ((this._automationEvents = []),
      (this._currenTime = 0),
      (this._defaultValue = t));
  }
  [Symbol.iterator]() {
    return this._automationEvents[Symbol.iterator]();
  }
  add(t) {
    const e = le(t);
    if (Ci(t) || Ai(t)) {
      const s = this._automationEvents.findIndex((r) =>
          Ai(t) && te(r) ? r.startTime + r.duration >= e : le(r) >= e,
        ),
        i = this._automationEvents[s];
      if (
        (s !== -1 &&
          (this._automationEvents = this._automationEvents.slice(0, s)),
        Ci(t))
      ) {
        const r = this._automationEvents[this._automationEvents.length - 1];
        if (i !== void 0 && he(i)) {
          if (r !== void 0 && ts(r))
            throw new Error("The internal list is malformed.");
          const o =
              r === void 0
                ? i.insertTime
                : te(r)
                  ? r.startTime + r.duration
                  : le(r),
            a =
              r === void 0
                ? this._defaultValue
                : te(r)
                  ? r.values[r.values.length - 1]
                  : r.value,
            c = He(i) ? io(e, o, a, i) : ro(e, o, a, i),
            u = He(i) ? eo(c, e, this._currenTime) : no(c, e, this._currenTime);
          this._automationEvents.push(u);
        }
        if (
          (r !== void 0 &&
            ts(r) &&
            this._automationEvents.push(Si(this.getValue(e), e)),
          r !== void 0 && te(r) && r.startTime + r.duration > e)
        ) {
          const o = e - r.startTime,
            a = (r.values.length - 1) / r.duration,
            c = Math.max(2, 1 + Math.ceil(o * a)),
            u = (o / (c - 1)) * a,
            l = r.values.slice(0, c);
          if (u < 1)
            for (let h = 1; h < c; h += 1) {
              const d = (u * h) % 1;
              l[h] = r.values[h - 1] * (1 - d) + r.values[h] * d;
            }
          this._automationEvents[this._automationEvents.length - 1] = La(
            l,
            r.startTime,
            o,
          );
        }
      }
    } else {
      const s = this._automationEvents.findIndex((o) => le(o) > e),
        i =
          s === -1
            ? this._automationEvents[this._automationEvents.length - 1]
            : this._automationEvents[s - 1];
      if (i !== void 0 && te(i) && le(i) + i.duration > e) return !1;
      const r = He(t)
        ? eo(t.value, t.endTime, this._currenTime)
        : ds(t)
          ? no(t.value, e, this._currenTime)
          : t;
      if (s === -1) this._automationEvents.push(r);
      else {
        if (te(t) && e + t.duration > le(this._automationEvents[s])) return !1;
        this._automationEvents.splice(s, 0, r);
      }
    }
    return !0;
  }
  flush(t) {
    const e = this._automationEvents.findIndex((s) => le(s) > t);
    if (e > 1) {
      const s = this._automationEvents.slice(e - 1),
        i = s[0];
      (ts(i) &&
        s.unshift(
          Si(
            fs(this._automationEvents, e - 2, i.startTime, this._defaultValue),
            i.startTime,
          ),
        ),
        (this._automationEvents = s));
    }
  }
  getValue(t) {
    if (this._automationEvents.length === 0) return this._defaultValue;
    const e = this._automationEvents.findIndex((o) => le(o) > t),
      s = this._automationEvents[e],
      i = (e === -1 ? this._automationEvents.length : e) - 1,
      r = this._automationEvents[i];
    if (r !== void 0 && ts(r) && (s === void 0 || !he(s) || s.insertTime > t))
      return qa(
        t,
        fs(this._automationEvents, i - 1, r.startTime, this._defaultValue),
        r,
      );
    if (r !== void 0 && nr(r) && (s === void 0 || !he(s))) return r.value;
    if (
      r !== void 0 &&
      te(r) &&
      (s === void 0 || !he(s) || r.startTime + r.duration > t)
    )
      return t < r.startTime + r.duration
        ? rh(t, r)
        : r.values[r.values.length - 1];
    if (r !== void 0 && he(r) && (s === void 0 || !he(s))) return r.value;
    if (s !== void 0 && He(s)) {
      const [o, a] = so(this._automationEvents, i, r, s, this._defaultValue);
      return io(t, o, a, s);
    }
    if (s !== void 0 && ds(s)) {
      const [o, a] = so(this._automationEvents, i, r, s, this._defaultValue);
      return ro(t, o, a, s);
    }
    return this._defaultValue;
  }
}
const ah = (n) => ({ cancelTime: n, type: "cancelAndHold" }),
  ch = (n) => ({ cancelTime: n, type: "cancelScheduledValues" }),
  uh = (n, t) => ({ endTime: t, type: "exponentialRampToValue", value: n }),
  lh = (n, t) => ({ endTime: t, type: "linearRampToValue", value: n }),
  hh = (n, t, e) => ({
    startTime: t,
    target: n,
    timeConstant: e,
    type: "setTarget",
  }),
  dh = () => new DOMException("", "AbortError"),
  fh =
    (n) =>
    (t, e, [s, i, r], o) => {
      n(t[i], [e, s, r], (a) => a[0] === e && a[1] === s, o);
    },
  ph = (n) => (t, e, s) => {
    const i = [];
    for (let r = 0; r < s.numberOfInputs; r += 1) i.push(new Set());
    n.set(t, {
      activeInputs: i,
      outputs: new Set(),
      passiveInputs: new WeakMap(),
      renderer: e,
    });
  },
  mh = (n) => (t, e) => {
    n.set(t, {
      activeInputs: new Set(),
      passiveInputs: new WeakMap(),
      renderer: e,
    });
  },
  nn = new WeakSet(),
  Wa = new WeakMap(),
  sr = new WeakMap(),
  ja = new WeakMap(),
  ir = new WeakMap(),
  Ds = new WeakMap(),
  Ba = new WeakMap(),
  ki = new WeakMap(),
  Ni = new WeakMap(),
  Oi = new WeakMap(),
  Ua = {
    construct() {
      return Ua;
    },
  },
  _h = (n) => {
    try {
      const t = new Proxy(n, Ua);
      new t();
    } catch {
      return !1;
    }
    return !0;
  },
  oo =
    /^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/,
  ao = (n, t) => {
    const e = [];
    let s = n.replace(/^[\s]+/, ""),
      i = s.match(oo);
    for (; i !== null;) {
      const r = i[1].slice(1, -1),
        o = i[0]
          .replace(/([\s]+)?;?$/, "")
          .replace(r, new URL(r, t).toString());
      (e.push(o),
        (s = s.slice(i[0].length).replace(/^[\s]+/, "")),
        (i = s.match(oo)));
    }
    return [e.join(";"), s];
  },
  co = (n) => {
    if (n !== void 0 && !Array.isArray(n))
      throw new TypeError(
        "The parameterDescriptors property of given value for processorCtor is not an array.",
      );
  },
  uo = (n) => {
    if (!_h(n))
      throw new TypeError(
        "The given value for processorCtor should be a constructor.",
      );
    if (n.prototype === null || typeof n.prototype != "object")
      throw new TypeError(
        "The given value for processorCtor should have a prototype.",
      );
  },
  gh = (n, t, e, s, i, r, o, a, c, u, l, h, d) => {
    let p = 0;
    return (f, _, m = { credentials: "omit" }) => {
      const g = l.get(f);
      if (g !== void 0 && g.has(_)) return Promise.resolve();
      const T = u.get(f);
      if (T !== void 0) {
        const y = T.get(_);
        if (y !== void 0) return y;
      }
      const x = r(f),
        S =
          x.audioWorklet === void 0
            ? i(_)
                .then(([y, w]) => {
                  const [b, v] = ao(y, w),
                    N = `${b};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${v}
})})(window,'_AWGS')`;
                  return e(N);
                })
                .then(() => {
                  const y = d._AWGS.pop();
                  if (y === void 0) throw new SyntaxError();
                  s(x.currentTime, x.sampleRate, () =>
                    y(
                      class {},
                      void 0,
                      (w, b) => {
                        if (w.trim() === "") throw t();
                        const v = Ni.get(x);
                        if (v !== void 0) {
                          if (v.has(w)) throw t();
                          (uo(b), co(b.parameterDescriptors), v.set(w, b));
                        } else
                          (uo(b),
                            co(b.parameterDescriptors),
                            Ni.set(x, new Map([[w, b]])));
                      },
                      x.sampleRate,
                      void 0,
                      void 0,
                    ),
                  );
                })
            : Promise.all([i(_), Promise.resolve(n(h, h))]).then(
                ([[y, w], b]) => {
                  const v = p + 1;
                  p = v;
                  const [N, A] = ao(y, w),
                    E = `${N};((AudioWorkletProcessor,registerProcessor)=>{${A}
})(${
                      b
                        ? "AudioWorkletProcessor"
                        : "class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"
                    },(n,p)=>registerProcessor(n,class extends p{${
                      b
                        ? ""
                        : "__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"
                    }process(i,o,p){${
                      b
                        ? ""
                        : "i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"
                    }return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${v}',class extends AudioWorkletProcessor{process(){return !1}})`,
                    P = new Blob([E], {
                      type: "application/javascript; charset=utf-8",
                    }),
                    I = URL.createObjectURL(P);
                  return x.audioWorklet
                    .addModule(I, m)
                    .then(() => {
                      if (a(x)) return x;
                      const D = o(x);
                      return D.audioWorklet.addModule(I, m).then(() => D);
                    })
                    .then((D) => {
                      if (c === null) throw new SyntaxError();
                      try {
                        new c(D, `__sac${v}`);
                      } catch {
                        throw new SyntaxError();
                      }
                    })
                    .finally(() => URL.revokeObjectURL(I));
                },
              );
      return (
        T === void 0 ? u.set(f, new Map([[_, S]])) : T.set(_, S),
        S.then(() => {
          const y = l.get(f);
          y === void 0 ? l.set(f, new Set([_])) : y.add(_);
        }).finally(() => {
          const y = u.get(f);
          y !== void 0 && y.delete(_);
        }),
        S
      );
    };
  },
  Bt = (n, t) => {
    const e = n.get(t);
    if (e === void 0)
      throw new Error("A value with the given key could not be found.");
    return e;
  },
  Rs = (n, t) => {
    const e = Array.from(n).filter(t);
    if (e.length > 1) throw Error("More than one element was found.");
    if (e.length === 0) throw Error("No element was found.");
    const [s] = e;
    return (n.delete(s), s);
  },
  $a = (n, t, e, s) => {
    const i = Bt(n, t),
      r = Rs(i, (o) => o[0] === e && o[1] === s);
    return (i.size === 0 && n.delete(t), r);
  },
  Vn = (n) => Bt(Ba, n),
  sn = (n) => {
    if (nn.has(n)) throw new Error("The AudioNode is already stored.");
    (nn.add(n), Vn(n).forEach((t) => t(!0)));
  },
  za = (n) => "port" in n,
  Ln = (n) => {
    if (!nn.has(n)) throw new Error("The AudioNode is not stored.");
    (nn.delete(n), Vn(n).forEach((t) => t(!1)));
  },
  Ei = (n, t) => {
    !za(n) && t.every((e) => e.size === 0) && Ln(n);
  },
  yh = (n, t, e, s, i, r, o, a, c, u, l, h, d) => {
    const p = new WeakMap();
    return (f, _, m, g, T) => {
      const { activeInputs: x, passiveInputs: S } = r(_),
        { outputs: y } = r(f),
        w = a(f),
        b = (v) => {
          const N = c(_),
            A = c(f);
          if (v) {
            const k = $a(S, f, m, g);
            (n(x, f, k, !1), !T && !h(f) && e(A, N, m, g), d(_) && sn(_));
          } else {
            const k = s(x, f, m, g);
            (t(S, g, k, !1), !T && !h(f) && i(A, N, m, g));
            const C = o(_);
            if (C === 0) l(_) && Ei(_, x);
            else {
              const M = p.get(_);
              (M !== void 0 && clearTimeout(M),
                p.set(
                  _,
                  setTimeout(() => {
                    l(_) && Ei(_, x);
                  }, C * 1e3),
                ));
            }
          }
        };
      return u(y, [_, m, g], (v) => v[0] === _ && v[1] === m && v[2] === g, !0)
        ? (w.add(b), l(f) ? n(x, f, [m, g, b], !0) : t(S, g, [f, m, b], !0), !0)
        : !1;
    };
  },
  vh =
    (n) =>
    (t, e, [s, i, r], o) => {
      const a = t.get(s);
      a === void 0
        ? t.set(s, new Set([[i, e, r]]))
        : n(a, [i, e, r], (c) => c[0] === i && c[1] === e, o);
    },
  wh = (n) => (t, e) => {
    const s = n(t, {
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "discrete",
      gain: 0,
    });
    e.connect(s).connect(t.destination);
    const i = () => {
      (e.removeEventListener("ended", i), e.disconnect(s), s.disconnect());
    };
    e.addEventListener("ended", i);
  },
  Th = (n) => (t, e) => {
    n(t).add(e);
  },
  bh = {
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    fftSize: 2048,
    maxDecibels: -30,
    minDecibels: -100,
    smoothingTimeConstant: 0.8,
  },
  xh = (n, t, e, s, i, r) =>
    class extends n {
      constructor(a, c) {
        const u = i(a),
          l = { ...bh, ...c },
          h = s(u, l),
          d = r(u) ? t() : null;
        (super(a, !1, h, d), (this._nativeAnalyserNode = h));
      }
      get fftSize() {
        return this._nativeAnalyserNode.fftSize;
      }
      set fftSize(a) {
        this._nativeAnalyserNode.fftSize = a;
      }
      get frequencyBinCount() {
        return this._nativeAnalyserNode.frequencyBinCount;
      }
      get maxDecibels() {
        return this._nativeAnalyserNode.maxDecibels;
      }
      set maxDecibels(a) {
        const c = this._nativeAnalyserNode.maxDecibels;
        if (
          ((this._nativeAnalyserNode.maxDecibels = a),
          !(a > this._nativeAnalyserNode.minDecibels))
        )
          throw ((this._nativeAnalyserNode.maxDecibels = c), e());
      }
      get minDecibels() {
        return this._nativeAnalyserNode.minDecibels;
      }
      set minDecibels(a) {
        const c = this._nativeAnalyserNode.minDecibels;
        if (
          ((this._nativeAnalyserNode.minDecibels = a),
          !(this._nativeAnalyserNode.maxDecibels > a))
        )
          throw ((this._nativeAnalyserNode.minDecibels = c), e());
      }
      get smoothingTimeConstant() {
        return this._nativeAnalyserNode.smoothingTimeConstant;
      }
      set smoothingTimeConstant(a) {
        this._nativeAnalyserNode.smoothingTimeConstant = a;
      }
      getByteFrequencyData(a) {
        this._nativeAnalyserNode.getByteFrequencyData(a);
      }
      getByteTimeDomainData(a) {
        this._nativeAnalyserNode.getByteTimeDomainData(a);
      }
      getFloatFrequencyData(a) {
        this._nativeAnalyserNode.getFloatFrequencyData(a);
      }
      getFloatTimeDomainData(a) {
        this._nativeAnalyserNode.getFloatTimeDomainData(a);
      }
    },
  vt = (n, t) => n.context === t,
  Sh = (n, t, e) => () => {
    const s = new WeakMap(),
      i = async (r, o) => {
        let a = t(r);
        if (!vt(a, o)) {
          const u = {
            channelCount: a.channelCount,
            channelCountMode: a.channelCountMode,
            channelInterpretation: a.channelInterpretation,
            fftSize: a.fftSize,
            maxDecibels: a.maxDecibels,
            minDecibels: a.minDecibels,
            smoothingTimeConstant: a.smoothingTimeConstant,
          };
          a = n(o, u);
        }
        return (s.set(o, a), await e(r, o, a), a);
      };
    return {
      render(r, o) {
        const a = s.get(o);
        return a !== void 0 ? Promise.resolve(a) : i(r, o);
      },
    };
  },
  ps = (n) => {
    try {
      n.copyToChannel(new Float32Array(1), 0, -1);
    } catch {
      return !1;
    }
    return !0;
  },
  Yt = () => new DOMException("", "IndexSizeError"),
  rr = (n) => {
    n.getChannelData = ((t) => (e) => {
      try {
        return t.call(n, e);
      } catch (s) {
        throw s.code === 12 ? Yt() : s;
      }
    })(n.getChannelData);
  },
  Ch = { numberOfChannels: 1 },
  Ah = (n, t, e, s, i, r, o, a) => {
    let c = null;
    return class Ga {
      constructor(l) {
        if (i === null)
          throw new Error(
            "Missing the native OfflineAudioContext constructor.",
          );
        const {
          length: h,
          numberOfChannels: d,
          sampleRate: p,
        } = { ...Ch, ...l };
        c === null && (c = new i(1, 1, 44100));
        const f =
          s !== null && t(r, r)
            ? new s({ length: h, numberOfChannels: d, sampleRate: p })
            : c.createBuffer(d, h, p);
        if (f.numberOfChannels === 0) throw e();
        return (
          typeof f.copyFromChannel != "function"
            ? (o(f), rr(f))
            : t(ps, () => ps(f)) || a(f),
          n.add(f),
          f
        );
      }
      static [Symbol.hasInstance](l) {
        return (
          (l !== null &&
            typeof l == "object" &&
            Object.getPrototypeOf(l) === Ga.prototype) ||
          n.has(l)
        );
      }
    };
  },
  Ct = -34028234663852886e22,
  Tt = -Ct,
  ee = (n) => nn.has(n),
  kh = {
    buffer: null,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    loop: !1,
    loopEnd: 0,
    loopStart: 0,
    playbackRate: 1,
  },
  Nh = (n, t, e, s, i, r, o, a) =>
    class extends n {
      constructor(u, l) {
        const h = r(u),
          d = { ...kh, ...l },
          p = i(h, d),
          f = o(h),
          _ = f ? t() : null;
        (super(u, !1, p, _),
          (this._audioBufferSourceNodeRenderer = _),
          (this._isBufferNullified = !1),
          (this._isBufferSet = d.buffer !== null),
          (this._nativeAudioBufferSourceNode = p),
          (this._onended = null),
          (this._playbackRate = e(this, f, p.playbackRate, Tt, Ct)));
      }
      get buffer() {
        return this._isBufferNullified
          ? null
          : this._nativeAudioBufferSourceNode.buffer;
      }
      set buffer(u) {
        if (((this._nativeAudioBufferSourceNode.buffer = u), u !== null)) {
          if (this._isBufferSet) throw s();
          this._isBufferSet = !0;
        }
      }
      get loop() {
        return this._nativeAudioBufferSourceNode.loop;
      }
      set loop(u) {
        this._nativeAudioBufferSourceNode.loop = u;
      }
      get loopEnd() {
        return this._nativeAudioBufferSourceNode.loopEnd;
      }
      set loopEnd(u) {
        this._nativeAudioBufferSourceNode.loopEnd = u;
      }
      get loopStart() {
        return this._nativeAudioBufferSourceNode.loopStart;
      }
      set loopStart(u) {
        this._nativeAudioBufferSourceNode.loopStart = u;
      }
      get onended() {
        return this._onended;
      }
      set onended(u) {
        const l = typeof u == "function" ? a(this, u) : null;
        this._nativeAudioBufferSourceNode.onended = l;
        const h = this._nativeAudioBufferSourceNode.onended;
        this._onended = h !== null && h === l ? u : h;
      }
      get playbackRate() {
        return this._playbackRate;
      }
      start(u = 0, l = 0, h) {
        if (
          (this._nativeAudioBufferSourceNode.start(u, l, h),
          this._audioBufferSourceNodeRenderer !== null &&
            (this._audioBufferSourceNodeRenderer.start =
              h === void 0 ? [u, l] : [u, l, h]),
          this.context.state !== "closed")
        ) {
          sn(this);
          const d = () => {
            (this._nativeAudioBufferSourceNode.removeEventListener("ended", d),
              ee(this) && Ln(this));
          };
          this._nativeAudioBufferSourceNode.addEventListener("ended", d);
        }
      }
      stop(u = 0) {
        (this._nativeAudioBufferSourceNode.stop(u),
          this._audioBufferSourceNodeRenderer !== null &&
            (this._audioBufferSourceNodeRenderer.stop = u));
      }
    },
  Oh = (n, t, e, s, i) => () => {
    const r = new WeakMap();
    let o = null,
      a = null;
    const c = async (u, l) => {
      let h = e(u);
      const d = vt(h, l);
      if (!d) {
        const p = {
          buffer: h.buffer,
          channelCount: h.channelCount,
          channelCountMode: h.channelCountMode,
          channelInterpretation: h.channelInterpretation,
          loop: h.loop,
          loopEnd: h.loopEnd,
          loopStart: h.loopStart,
          playbackRate: h.playbackRate.value,
        };
        ((h = t(l, p)), o !== null && h.start(...o), a !== null && h.stop(a));
      }
      return (
        r.set(l, h),
        d
          ? await n(l, u.playbackRate, h.playbackRate)
          : await s(l, u.playbackRate, h.playbackRate),
        await i(u, l, h),
        h
      );
    };
    return {
      set start(u) {
        o = u;
      },
      set stop(u) {
        a = u;
      },
      render(u, l) {
        const h = r.get(l);
        return h !== void 0 ? Promise.resolve(h) : c(u, l);
      },
    };
  },
  Eh = (n) => "playbackRate" in n,
  Mh = (n) => "frequency" in n && "gain" in n,
  Ih = (n) => "offset" in n,
  Dh = (n) => !("frequency" in n) && "gain" in n,
  Rh = (n) => "detune" in n && "frequency" in n && !("gain" in n),
  Ph = (n) => "pan" in n,
  bt = (n) => Bt(Wa, n),
  qn = (n) => Bt(ja, n),
  Mi = (n, t) => {
    const { activeInputs: e } = bt(n);
    e.forEach((i) =>
      i.forEach(([r]) => {
        t.includes(n) || Mi(r, [...t, n]);
      }),
    );
    const s = Eh(n)
      ? [n.playbackRate]
      : za(n)
        ? Array.from(n.parameters.values())
        : Mh(n)
          ? [n.Q, n.detune, n.frequency, n.gain]
          : Ih(n)
            ? [n.offset]
            : Dh(n)
              ? [n.gain]
              : Rh(n)
                ? [n.detune, n.frequency]
                : Ph(n)
                  ? [n.pan]
                  : [];
    for (const i of s) {
      const r = qn(i);
      r !== void 0 && r.activeInputs.forEach(([o]) => Mi(o, t));
    }
    ee(n) && Ln(n);
  },
  Za = (n) => {
    Mi(n.destination, []);
  },
  Fh = (n) =>
    n === void 0 ||
    typeof n == "number" ||
    (typeof n == "string" &&
      (n === "balanced" || n === "interactive" || n === "playback")),
  Vh = (n, t, e, s, i, r, o, a, c) =>
    class extends n {
      constructor(l = {}) {
        if (c === null)
          throw new Error("Missing the native AudioContext constructor.");
        let h;
        try {
          h = new c(l);
        } catch (f) {
          throw f.code === 12 && f.message === "sampleRate is not in range"
            ? e()
            : f;
        }
        if (h === null) throw s();
        if (!Fh(l.latencyHint))
          throw new TypeError(
            `The provided value '${l.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`,
          );
        if (l.sampleRate !== void 0 && h.sampleRate !== l.sampleRate) throw e();
        super(h, 2);
        const { latencyHint: d } = l,
          { sampleRate: p } = h;
        if (
          ((this._baseLatency =
            typeof h.baseLatency == "number"
              ? h.baseLatency
              : d === "balanced"
                ? 512 / p
                : d === "interactive" || d === void 0
                  ? 256 / p
                  : d === "playback"
                    ? 1024 / p
                    : (Math.max(2, Math.min(128, Math.round((d * p) / 128))) *
                        128) /
                      p),
          (this._nativeAudioContext = h),
          c.name === "webkitAudioContext"
            ? ((this._nativeGainNode = h.createGain()),
              (this._nativeOscillatorNode = h.createOscillator()),
              (this._nativeGainNode.gain.value = 1e-37),
              this._nativeOscillatorNode
                .connect(this._nativeGainNode)
                .connect(h.destination),
              this._nativeOscillatorNode.start())
            : ((this._nativeGainNode = null),
              (this._nativeOscillatorNode = null)),
          (this._state = null),
          h.state === "running")
        ) {
          this._state = "suspended";
          const f = () => {
            (this._state === "suspended" && (this._state = null),
              h.removeEventListener("statechange", f));
          };
          h.addEventListener("statechange", f);
        }
      }
      get baseLatency() {
        return this._baseLatency;
      }
      get state() {
        return this._state !== null
          ? this._state
          : this._nativeAudioContext.state;
      }
      close() {
        return this.state === "closed"
          ? this._nativeAudioContext.close().then(() => {
              throw t();
            })
          : (this._state === "suspended" && (this._state = null),
            this._nativeAudioContext.close().then(() => {
              (this._nativeGainNode !== null &&
                this._nativeOscillatorNode !== null &&
                (this._nativeOscillatorNode.stop(),
                this._nativeGainNode.disconnect(),
                this._nativeOscillatorNode.disconnect()),
                Za(this));
            }));
      }
      createMediaElementSource(l) {
        return new i(this, { mediaElement: l });
      }
      createMediaStreamDestination() {
        return new r(this);
      }
      createMediaStreamSource(l) {
        return new o(this, { mediaStream: l });
      }
      createMediaStreamTrackSource(l) {
        return new a(this, { mediaStreamTrack: l });
      }
      resume() {
        return this._state === "suspended"
          ? new Promise((l, h) => {
              const d = () => {
                (this._nativeAudioContext.removeEventListener("statechange", d),
                  this._nativeAudioContext.state === "running"
                    ? l()
                    : this.resume().then(l, h));
              };
              this._nativeAudioContext.addEventListener("statechange", d);
            })
          : this._nativeAudioContext.resume().catch((l) => {
              throw l === void 0 || l.code === 15 ? t() : l;
            });
      }
      suspend() {
        return this._nativeAudioContext.suspend().catch((l) => {
          throw l === void 0 ? t() : l;
        });
      }
    },
  Lh = (n, t, e, s, i, r, o, a) =>
    class extends n {
      constructor(u, l) {
        const h = r(u),
          d = o(h),
          p = i(h, l, d),
          f = d ? t(a) : null;
        (super(u, !1, p, f),
          (this._isNodeOfNativeOfflineAudioContext = d),
          (this._nativeAudioDestinationNode = p));
      }
      get channelCount() {
        return this._nativeAudioDestinationNode.channelCount;
      }
      set channelCount(u) {
        if (this._isNodeOfNativeOfflineAudioContext) throw s();
        if (u > this._nativeAudioDestinationNode.maxChannelCount) throw e();
        this._nativeAudioDestinationNode.channelCount = u;
      }
      get channelCountMode() {
        return this._nativeAudioDestinationNode.channelCountMode;
      }
      set channelCountMode(u) {
        if (this._isNodeOfNativeOfflineAudioContext) throw s();
        this._nativeAudioDestinationNode.channelCountMode = u;
      }
      get maxChannelCount() {
        return this._nativeAudioDestinationNode.maxChannelCount;
      }
    },
  qh = (n) => {
    const t = new WeakMap(),
      e = async (s, i) => {
        const r = i.destination;
        return (t.set(i, r), await n(s, i, r), r);
      };
    return {
      render(s, i) {
        const r = t.get(i);
        return r !== void 0 ? Promise.resolve(r) : e(s, i);
      },
    };
  },
  Wh = (n, t, e, s, i, r, o, a) => (c, u) => {
    const l = u.listener,
      h = () => {
        const y = new Float32Array(1),
          w = t(u, {
            channelCount: 1,
            channelCountMode: "explicit",
            channelInterpretation: "speakers",
            numberOfInputs: 9,
          }),
          b = o(u);
        let v = !1,
          N = [0, 0, -1, 0, 1, 0],
          A = [0, 0, 0];
        const k = () => {
            if (v) return;
            v = !0;
            const P = s(u, 256, 9, 0);
            ((P.onaudioprocess = ({ inputBuffer: I }) => {
              const D = [
                r(I, y, 0),
                r(I, y, 1),
                r(I, y, 2),
                r(I, y, 3),
                r(I, y, 4),
                r(I, y, 5),
              ];
              D.some((F, j) => F !== N[j]) && (l.setOrientation(...D), (N = D));
              const U = [r(I, y, 6), r(I, y, 7), r(I, y, 8)];
              U.some((F, j) => F !== A[j]) && (l.setPosition(...U), (A = U));
            }),
              w.connect(P));
          },
          C = (P) => (I) => {
            I !== N[P] && ((N[P] = I), l.setOrientation(...N));
          },
          M = (P) => (I) => {
            I !== A[P] && ((A[P] = I), l.setPosition(...A));
          },
          E = (P, I, D) => {
            const U = e(u, {
              channelCount: 1,
              channelCountMode: "explicit",
              channelInterpretation: "discrete",
              offset: I,
            });
            (U.connect(w, 0, P),
              U.start(),
              Object.defineProperty(U.offset, "defaultValue", {
                get() {
                  return I;
                },
              }));
            const F = n({ context: c }, b, U.offset, Tt, Ct);
            return (
              a(
                F,
                "value",
                (j) => () => j.call(F),
                (j) => (q) => {
                  try {
                    j.call(F, q);
                  } catch (H) {
                    if (H.code !== 9) throw H;
                  }
                  (k(), b && D(q));
                },
              ),
              (F.cancelAndHoldAtTime = ((j) =>
                b
                  ? () => {
                      throw i();
                    }
                  : (...q) => {
                      const H = j.apply(F, q);
                      return (k(), H);
                    })(F.cancelAndHoldAtTime)),
              (F.cancelScheduledValues = ((j) =>
                b
                  ? () => {
                      throw i();
                    }
                  : (...q) => {
                      const H = j.apply(F, q);
                      return (k(), H);
                    })(F.cancelScheduledValues)),
              (F.exponentialRampToValueAtTime = ((j) =>
                b
                  ? () => {
                      throw i();
                    }
                  : (...q) => {
                      const H = j.apply(F, q);
                      return (k(), H);
                    })(F.exponentialRampToValueAtTime)),
              (F.linearRampToValueAtTime = ((j) =>
                b
                  ? () => {
                      throw i();
                    }
                  : (...q) => {
                      const H = j.apply(F, q);
                      return (k(), H);
                    })(F.linearRampToValueAtTime)),
              (F.setTargetAtTime = ((j) =>
                b
                  ? () => {
                      throw i();
                    }
                  : (...q) => {
                      const H = j.apply(F, q);
                      return (k(), H);
                    })(F.setTargetAtTime)),
              (F.setValueAtTime = ((j) =>
                b
                  ? () => {
                      throw i();
                    }
                  : (...q) => {
                      const H = j.apply(F, q);
                      return (k(), H);
                    })(F.setValueAtTime)),
              (F.setValueCurveAtTime = ((j) =>
                b
                  ? () => {
                      throw i();
                    }
                  : (...q) => {
                      const H = j.apply(F, q);
                      return (k(), H);
                    })(F.setValueCurveAtTime)),
              F
            );
          };
        return {
          forwardX: E(0, 0, C(0)),
          forwardY: E(1, 0, C(1)),
          forwardZ: E(2, -1, C(2)),
          positionX: E(6, 0, M(0)),
          positionY: E(7, 0, M(1)),
          positionZ: E(8, 0, M(2)),
          upX: E(3, 0, C(3)),
          upY: E(4, 1, C(4)),
          upZ: E(5, 0, C(5)),
        };
      },
      {
        forwardX: d,
        forwardY: p,
        forwardZ: f,
        positionX: _,
        positionY: m,
        positionZ: g,
        upX: T,
        upY: x,
        upZ: S,
      } = l.forwardX === void 0 ? h() : l;
    return {
      get forwardX() {
        return d;
      },
      get forwardY() {
        return p;
      },
      get forwardZ() {
        return f;
      },
      get positionX() {
        return _;
      },
      get positionY() {
        return m;
      },
      get positionZ() {
        return g;
      },
      get upX() {
        return T;
      },
      get upY() {
        return x;
      },
      get upZ() {
        return S;
      },
    };
  },
  ms = (n) => "context" in n,
  Wn = (n) => ms(n[0]),
  je = (n, t, e, s) => {
    for (const i of n)
      if (e(i)) {
        if (s) return !1;
        throw Error("The set contains at least one similar element.");
      }
    return (n.add(t), !0);
  },
  lo = (n, t, [e, s], i) => {
    je(n, [t, e, s], (r) => r[0] === t && r[1] === e, i);
  },
  ho = (n, [t, e, s], i) => {
    const r = n.get(t);
    r === void 0
      ? n.set(t, new Set([[e, s]]))
      : je(r, [e, s], (o) => o[0] === e, i);
  },
  pn = (n) => "inputs" in n,
  _s = (n, t, e, s) => {
    if (pn(t)) {
      const i = t.inputs[s];
      return (n.connect(i, e, 0), [i, e, 0]);
    }
    return (n.connect(t, e, s), [t, e, s]);
  },
  Ha = (n, t, e) => {
    for (const s of n) if (s[0] === t && s[1] === e) return (n.delete(s), s);
    return null;
  },
  jh = (n, t, e) => Rs(n, (s) => s[0] === t && s[1] === e),
  Xa = (n, t) => {
    if (!Vn(n).delete(t))
      throw new Error("Missing the expected event listener.");
  },
  Ya = (n, t, e) => {
    const s = Bt(n, t),
      i = Rs(s, (r) => r[0] === e);
    return (s.size === 0 && n.delete(t), i);
  },
  gs = (n, t, e, s) => {
    pn(t) ? n.disconnect(t.inputs[s], e, 0) : n.disconnect(t, e, s);
  },
  et = (n) => Bt(sr, n),
  Mn = (n) => Bt(ir, n),
  Fe = (n) => ki.has(n),
  os = (n) => !nn.has(n),
  fo = (n, t) =>
    new Promise((e) => {
      if (t !== null) e(!0);
      else {
        const s = n.createScriptProcessor(256, 1, 1),
          i = n.createGain(),
          r = n.createBuffer(1, 2, 44100),
          o = r.getChannelData(0);
        ((o[0] = 1), (o[1] = 1));
        const a = n.createBufferSource();
        ((a.buffer = r),
          (a.loop = !0),
          a.connect(s).connect(n.destination),
          a.connect(i),
          a.disconnect(i),
          (s.onaudioprocess = (c) => {
            const u = c.inputBuffer.getChannelData(0);
            (Array.prototype.some.call(u, (l) => l === 1) ? e(!0) : e(!1),
              a.stop(),
              (s.onaudioprocess = null),
              a.disconnect(s),
              s.disconnect(n.destination));
          }),
          a.start());
      }
    }),
  oi = (n, t) => {
    const e = new Map();
    for (const s of n)
      for (const i of s) {
        const r = e.get(i);
        e.set(i, r === void 0 ? 1 : r + 1);
      }
    e.forEach((s, i) => t(i, s));
  },
  ys = (n) => "context" in n,
  Bh = (n) => {
    const t = new Map();
    ((n.connect = (
      (e) =>
      (s, i = 0, r = 0) => {
        const o = ys(s) ? e(s, i, r) : e(s, i),
          a = t.get(s);
        return (
          a === void 0
            ? t.set(s, [{ input: r, output: i }])
            : a.every((c) => c.input !== r || c.output !== i) &&
              a.push({ input: r, output: i }),
          o
        );
      }
    )(n.connect.bind(n))),
      (n.disconnect = ((e) => (s, i, r) => {
        if ((e.apply(n), s === void 0)) t.clear();
        else if (typeof s == "number")
          for (const [o, a] of t) {
            const c = a.filter((u) => u.output !== s);
            c.length === 0 ? t.delete(o) : t.set(o, c);
          }
        else if (t.has(s))
          if (i === void 0) t.delete(s);
          else {
            const o = t.get(s);
            if (o !== void 0) {
              const a = o.filter(
                (c) => c.output !== i && (c.input !== r || r === void 0),
              );
              a.length === 0 ? t.delete(s) : t.set(s, a);
            }
          }
        for (const [o, a] of t)
          a.forEach((c) => {
            ys(o) ? n.connect(o, c.output, c.input) : n.connect(o, c.output);
          });
      })(n.disconnect)));
  },
  Uh = (n, t, e, s) => {
    const { activeInputs: i, passiveInputs: r } = qn(t),
      { outputs: o } = bt(n),
      a = Vn(n),
      c = (u) => {
        const l = et(n),
          h = Mn(t);
        if (u) {
          const d = Ya(r, n, e);
          (lo(i, n, d, !1), !s && !Fe(n) && l.connect(h, e));
        } else {
          const d = jh(i, n, e);
          (ho(r, d, !1), !s && !Fe(n) && l.disconnect(h, e));
        }
      };
    return je(o, [t, e], (u) => u[0] === t && u[1] === e, !0)
      ? (a.add(c), ee(n) ? lo(i, n, [e, c], !0) : ho(r, [n, e, c], !0), !0)
      : !1;
  },
  $h = (n, t, e, s) => {
    const { activeInputs: i, passiveInputs: r } = bt(t),
      o = Ha(i[s], n, e);
    return o === null ? [$a(r, n, e, s)[2], !1] : [o[2], !0];
  },
  zh = (n, t, e) => {
    const { activeInputs: s, passiveInputs: i } = qn(t),
      r = Ha(s, n, e);
    return r === null ? [Ya(i, n, e)[1], !1] : [r[2], !0];
  },
  or = (n, t, e, s, i) => {
    const [r, o] = $h(n, e, s, i);
    if (
      (r !== null && (Xa(n, r), o && !t && !Fe(n) && gs(et(n), et(e), s, i)),
      ee(e))
    ) {
      const { activeInputs: a } = bt(e);
      Ei(e, a);
    }
  },
  ar = (n, t, e, s) => {
    const [i, r] = zh(n, e, s);
    i !== null && (Xa(n, i), r && !t && !Fe(n) && et(n).disconnect(Mn(e), s));
  },
  Gh = (n, t) => {
    const e = bt(n),
      s = [];
    for (const i of e.outputs)
      (Wn(i) ? or(n, t, ...i) : ar(n, t, ...i), s.push(i[0]));
    return (e.outputs.clear(), s);
  },
  Zh = (n, t, e) => {
    const s = bt(n),
      i = [];
    for (const r of s.outputs)
      r[1] === e &&
        (Wn(r) ? or(n, t, ...r) : ar(n, t, ...r),
        i.push(r[0]),
        s.outputs.delete(r));
    return i;
  },
  Hh = (n, t, e, s, i) => {
    const r = bt(n);
    return Array.from(r.outputs)
      .filter(
        (o) =>
          o[0] === e &&
          (s === void 0 || o[1] === s) &&
          (i === void 0 || o[2] === i),
      )
      .map(
        (o) => (
          Wn(o) ? or(n, t, ...o) : ar(n, t, ...o),
          r.outputs.delete(o),
          o[0]
        ),
      );
  },
  Xh = (n, t, e, s, i, r, o, a, c, u, l, h, d, p, f, _) =>
    class extends u {
      constructor(g, T, x, S) {
        (super(x), (this._context = g), (this._nativeAudioNode = x));
        const y = l(g);
        (h(y) && e(fo, () => fo(y, _)) !== !0 && Bh(x),
          sr.set(this, x),
          Ba.set(this, new Set()),
          g.state !== "closed" && T && sn(this),
          n(this, S, x));
      }
      get channelCount() {
        return this._nativeAudioNode.channelCount;
      }
      set channelCount(g) {
        this._nativeAudioNode.channelCount = g;
      }
      get channelCountMode() {
        return this._nativeAudioNode.channelCountMode;
      }
      set channelCountMode(g) {
        this._nativeAudioNode.channelCountMode = g;
      }
      get channelInterpretation() {
        return this._nativeAudioNode.channelInterpretation;
      }
      set channelInterpretation(g) {
        this._nativeAudioNode.channelInterpretation = g;
      }
      get context() {
        return this._context;
      }
      get numberOfInputs() {
        return this._nativeAudioNode.numberOfInputs;
      }
      get numberOfOutputs() {
        return this._nativeAudioNode.numberOfOutputs;
      }
      connect(g, T = 0, x = 0) {
        if (T < 0 || T >= this._nativeAudioNode.numberOfOutputs) throw i();
        const S = l(this._context),
          y = f(S);
        if (d(g) || p(g)) throw r();
        if (ms(g)) {
          const v = et(g);
          try {
            const A = _s(this._nativeAudioNode, v, T, x),
              k = os(this);
            ((y || k) && this._nativeAudioNode.disconnect(...A),
              this.context.state !== "closed" && !k && os(g) && sn(g));
          } catch (A) {
            throw A.code === 12 ? r() : A;
          }
          if (t(this, g, T, x, y)) {
            const A = c([this], g);
            oi(A, s(y));
          }
          return g;
        }
        const w = Mn(g);
        if (w.name === "playbackRate" && w.maxValue === 1024) throw o();
        try {
          (this._nativeAudioNode.connect(w, T),
            (y || os(this)) && this._nativeAudioNode.disconnect(w, T));
        } catch (v) {
          throw v.code === 12 ? r() : v;
        }
        if (Uh(this, g, T, y)) {
          const v = c([this], g);
          oi(v, s(y));
        }
      }
      disconnect(g, T, x) {
        let S;
        const y = l(this._context),
          w = f(y);
        if (g === void 0) S = Gh(this, w);
        else if (typeof g == "number") {
          if (g < 0 || g >= this.numberOfOutputs) throw i();
          S = Zh(this, w, g);
        } else {
          if (
            (T !== void 0 && (T < 0 || T >= this.numberOfOutputs)) ||
            (ms(g) && x !== void 0 && (x < 0 || x >= g.numberOfInputs))
          )
            throw i();
          if (((S = Hh(this, w, g, T, x)), S.length === 0)) throw r();
        }
        for (const b of S) {
          const v = c([this], b);
          oi(v, a);
        }
      }
    },
  Yh =
    (n, t, e, s, i, r, o, a, c, u, l, h, d) =>
    (p, f, _, m = null, g = null) => {
      const T = _.value,
        x = new oh(T),
        S = f ? s(x) : null,
        y = {
          get defaultValue() {
            return T;
          },
          get maxValue() {
            return m === null ? _.maxValue : m;
          },
          get minValue() {
            return g === null ? _.minValue : g;
          },
          get value() {
            return _.value;
          },
          set value(w) {
            ((_.value = w), y.setValueAtTime(w, p.context.currentTime));
          },
          cancelAndHoldAtTime(w) {
            if (typeof _.cancelAndHoldAtTime == "function")
              (S === null && x.flush(p.context.currentTime),
                x.add(i(w)),
                _.cancelAndHoldAtTime(w));
            else {
              const b = Array.from(x).pop();
              (S === null && x.flush(p.context.currentTime), x.add(i(w)));
              const v = Array.from(x).pop();
              (_.cancelScheduledValues(w),
                b !== v &&
                  v !== void 0 &&
                  (v.type === "exponentialRampToValue"
                    ? _.exponentialRampToValueAtTime(v.value, v.endTime)
                    : v.type === "linearRampToValue"
                      ? _.linearRampToValueAtTime(v.value, v.endTime)
                      : v.type === "setValue"
                        ? _.setValueAtTime(v.value, v.startTime)
                        : v.type === "setValueCurve" &&
                          _.setValueCurveAtTime(
                            v.values,
                            v.startTime,
                            v.duration,
                          )));
            }
            return y;
          },
          cancelScheduledValues(w) {
            return (
              S === null && x.flush(p.context.currentTime),
              x.add(r(w)),
              _.cancelScheduledValues(w),
              y
            );
          },
          exponentialRampToValueAtTime(w, b) {
            if (w === 0) throw new RangeError();
            if (!Number.isFinite(b) || b < 0) throw new RangeError();
            const v = p.context.currentTime;
            return (
              S === null && x.flush(v),
              Array.from(x).length === 0 &&
                (x.add(u(T, v)), _.setValueAtTime(T, v)),
              x.add(o(w, b)),
              _.exponentialRampToValueAtTime(w, b),
              y
            );
          },
          linearRampToValueAtTime(w, b) {
            const v = p.context.currentTime;
            return (
              S === null && x.flush(v),
              Array.from(x).length === 0 &&
                (x.add(u(T, v)), _.setValueAtTime(T, v)),
              x.add(a(w, b)),
              _.linearRampToValueAtTime(w, b),
              y
            );
          },
          setTargetAtTime(w, b, v) {
            return (
              S === null && x.flush(p.context.currentTime),
              x.add(c(w, b, v)),
              _.setTargetAtTime(w, b, v),
              y
            );
          },
          setValueAtTime(w, b) {
            return (
              S === null && x.flush(p.context.currentTime),
              x.add(u(w, b)),
              _.setValueAtTime(w, b),
              y
            );
          },
          setValueCurveAtTime(w, b, v) {
            const N = w instanceof Float32Array ? w : new Float32Array(w);
            if (h !== null && h.name === "webkitAudioContext") {
              const A = b + v,
                k = p.context.sampleRate,
                C = Math.ceil(b * k),
                M = Math.floor(A * k),
                E = M - C,
                P = new Float32Array(E);
              for (let D = 0; D < E; D += 1) {
                const U = ((N.length - 1) / v) * ((C + D) / k - b),
                  F = Math.floor(U),
                  j = Math.ceil(U);
                P[D] =
                  F === j ? N[F] : (1 - (U - F)) * N[F] + (1 - (j - U)) * N[j];
              }
              (S === null && x.flush(p.context.currentTime),
                x.add(l(P, b, v)),
                _.setValueCurveAtTime(P, b, v));
              const I = M / k;
              (I < A && d(y, P[P.length - 1], I), d(y, N[N.length - 1], A));
            } else
              (S === null && x.flush(p.context.currentTime),
                x.add(l(N, b, v)),
                _.setValueCurveAtTime(N, b, v));
            return y;
          },
        };
      return (e.set(y, _), t.set(y, p), n(y, S), y);
    },
  Kh = (n) => ({
    replay(t) {
      for (const e of n)
        if (e.type === "exponentialRampToValue") {
          const { endTime: s, value: i } = e;
          t.exponentialRampToValueAtTime(i, s);
        } else if (e.type === "linearRampToValue") {
          const { endTime: s, value: i } = e;
          t.linearRampToValueAtTime(i, s);
        } else if (e.type === "setTarget") {
          const { startTime: s, target: i, timeConstant: r } = e;
          t.setTargetAtTime(i, s, r);
        } else if (e.type === "setValue") {
          const { startTime: s, value: i } = e;
          t.setValueAtTime(i, s);
        } else if (e.type === "setValueCurve") {
          const { duration: s, startTime: i, values: r } = e;
          t.setValueCurveAtTime(r, i, s);
        } else throw new Error("Can't apply an unknown automation.");
    },
  });
class Ka {
  constructor(t) {
    this._map = new Map(t);
  }
  get size() {
    return this._map.size;
  }
  entries() {
    return this._map.entries();
  }
  forEach(t, e = null) {
    return this._map.forEach((s, i) => t.call(e, s, i, this));
  }
  get(t) {
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
  keys() {
    return this._map.keys();
  }
  values() {
    return this._map.values();
  }
}
const Qh = {
    channelCount: 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers",
    numberOfInputs: 1,
    numberOfOutputs: 1,
    parameterData: {},
    processorOptions: {},
  },
  Jh = (n, t, e, s, i, r, o, a, c, u, l, h, d, p) =>
    class extends t {
      constructor(_, m, g) {
        var T;
        const x = a(_),
          S = c(x),
          y = l({ ...Qh, ...g });
        d(y);
        const w = Ni.get(x),
          b = w?.get(m),
          v =
            S || x.state !== "closed"
              ? x
              : (T = o(x)) !== null && T !== void 0
                ? T
                : x,
          N = i(v, S ? null : _.baseLatency, u, m, b, y),
          A = S ? s(m, y, b) : null;
        super(_, !0, N, A);
        const k = [];
        (N.parameters.forEach((M, E) => {
          const P = e(this, S, M);
          k.push([E, P]);
        }),
          (this._nativeAudioWorkletNode = N),
          (this._onprocessorerror = null),
          (this._parameters = new Ka(k)),
          S && n(x, this));
        const { activeInputs: C } = r(this);
        h(N, C);
      }
      get onprocessorerror() {
        return this._onprocessorerror;
      }
      set onprocessorerror(_) {
        const m = typeof _ == "function" ? p(this, _) : null;
        this._nativeAudioWorkletNode.onprocessorerror = m;
        const g = this._nativeAudioWorkletNode.onprocessorerror;
        this._onprocessorerror = g !== null && g === m ? _ : g;
      }
      get parameters() {
        return this._parameters === null
          ? this._nativeAudioWorkletNode.parameters
          : this._parameters;
      }
      get port() {
        return this._nativeAudioWorkletNode.port;
      }
    };
function vs(n, t, e, s, i) {
  if (typeof n.copyFromChannel == "function")
    (t[e].byteLength === 0 && (t[e] = new Float32Array(128)),
      n.copyFromChannel(t[e], s, i));
  else {
    const r = n.getChannelData(s);
    if (t[e].byteLength === 0) t[e] = r.slice(i, i + 128);
    else {
      const o = new Float32Array(
        r.buffer,
        i * Float32Array.BYTES_PER_ELEMENT,
        128,
      );
      t[e].set(o);
    }
  }
}
const Qa = (n, t, e, s, i) => {
    typeof n.copyToChannel == "function"
      ? t[e].byteLength !== 0 && n.copyToChannel(t[e], s, i)
      : t[e].byteLength !== 0 && n.getChannelData(s).set(t[e], i);
  },
  ws = (n, t) => {
    const e = [];
    for (let s = 0; s < n; s += 1) {
      const i = [],
        r = typeof t == "number" ? t : t[s];
      for (let o = 0; o < r; o += 1) i.push(new Float32Array(128));
      e.push(i);
    }
    return e;
  },
  td = (n, t) => {
    const e = Bt(Oi, n),
      s = et(t);
    return Bt(e, s);
  },
  ed = async (n, t, e, s, i, r, o) => {
    const a = t === null ? Math.ceil(n.context.length / 128) * 128 : t.length,
      c = s.channelCount * s.numberOfInputs,
      u = i.reduce((m, g) => m + g, 0),
      l = u === 0 ? null : e.createBuffer(u, a, e.sampleRate);
    if (r === void 0) throw new Error("Missing the processor constructor.");
    const h = bt(n),
      d = await td(e, n),
      p = ws(s.numberOfInputs, s.channelCount),
      f = ws(s.numberOfOutputs, i),
      _ = Array.from(n.parameters.keys()).reduce(
        (m, g) => ({ ...m, [g]: new Float32Array(128) }),
        {},
      );
    for (let m = 0; m < a; m += 128) {
      if (s.numberOfInputs > 0 && t !== null)
        for (let g = 0; g < s.numberOfInputs; g += 1)
          for (let T = 0; T < s.channelCount; T += 1) vs(t, p[g], T, T, m);
      r.parameterDescriptors !== void 0 &&
        t !== null &&
        r.parameterDescriptors.forEach(({ name: g }, T) => {
          vs(t, _, g, c + T, m);
        });
      for (let g = 0; g < s.numberOfInputs; g += 1)
        for (let T = 0; T < i[g]; T += 1)
          f[g][T].byteLength === 0 && (f[g][T] = new Float32Array(128));
      try {
        const g = p.map((x, S) => (h.activeInputs[S].size === 0 ? [] : x)),
          T = o(m / e.sampleRate, e.sampleRate, () => d.process(g, f, _));
        if (l !== null)
          for (let x = 0, S = 0; x < s.numberOfOutputs; x += 1) {
            for (let y = 0; y < i[x]; y += 1) Qa(l, f[x], y, S + y, m);
            S += i[x];
          }
        if (!T) break;
      } catch (g) {
        n.dispatchEvent(
          new ErrorEvent("processorerror", {
            colno: g.colno,
            filename: g.filename,
            lineno: g.lineno,
            message: g.message,
          }),
        );
        break;
      }
    }
    return l;
  },
  nd = (n, t, e, s, i, r, o, a, c, u, l, h, d, p, f, _) => (m, g, T) => {
    const x = new WeakMap();
    let S = null;
    const y = async (w, b) => {
      let v = l(w),
        N = null;
      const A = vt(v, b),
        k = Array.isArray(g.outputChannelCount)
          ? g.outputChannelCount
          : Array.from(g.outputChannelCount);
      if (h === null) {
        const C = k.reduce((I, D) => I + D, 0),
          M = i(b, {
            channelCount: Math.max(1, C),
            channelCountMode: "explicit",
            channelInterpretation: "discrete",
            numberOfOutputs: Math.max(1, C),
          }),
          E = [];
        for (let I = 0; I < w.numberOfOutputs; I += 1)
          E.push(
            s(b, {
              channelCount: 1,
              channelCountMode: "explicit",
              channelInterpretation: "speakers",
              numberOfInputs: k[I],
            }),
          );
        const P = o(b, {
          channelCount: g.channelCount,
          channelCountMode: g.channelCountMode,
          channelInterpretation: g.channelInterpretation,
          gain: 1,
        });
        ((P.connect = t.bind(null, E)),
          (P.disconnect = c.bind(null, E)),
          (N = [M, E, P]));
      } else A || (v = new h(b, m));
      if ((x.set(b, N === null ? v : N[2]), N !== null)) {
        if (S === null) {
          if (T === void 0)
            throw new Error("Missing the processor constructor.");
          if (d === null)
            throw new Error(
              "Missing the native OfflineAudioContext constructor.",
            );
          const D = w.channelCount * w.numberOfInputs,
            U =
              T.parameterDescriptors === void 0
                ? 0
                : T.parameterDescriptors.length,
            F = D + U;
          S = ed(
            w,
            F === 0
              ? null
              : await (async () => {
                  const q = new d(
                      F,
                      Math.ceil(w.context.length / 128) * 128,
                      b.sampleRate,
                    ),
                    H = [],
                    Nt = [];
                  for (let nt = 0; nt < g.numberOfInputs; nt += 1)
                    (H.push(
                      o(q, {
                        channelCount: g.channelCount,
                        channelCountMode: g.channelCountMode,
                        channelInterpretation: g.channelInterpretation,
                        gain: 1,
                      }),
                    ),
                      Nt.push(
                        i(q, {
                          channelCount: g.channelCount,
                          channelCountMode: "explicit",
                          channelInterpretation: "discrete",
                          numberOfOutputs: g.channelCount,
                        }),
                      ));
                  const Ot = await Promise.all(
                      Array.from(w.parameters.values()).map(async (nt) => {
                        const wt = r(q, {
                          channelCount: 1,
                          channelCountMode: "explicit",
                          channelInterpretation: "discrete",
                          offset: nt.value,
                        });
                        return (await p(q, nt, wt.offset), wt);
                      }),
                    ),
                    $ = s(q, {
                      channelCount: 1,
                      channelCountMode: "explicit",
                      channelInterpretation: "speakers",
                      numberOfInputs: Math.max(1, D + U),
                    });
                  for (let nt = 0; nt < g.numberOfInputs; nt += 1) {
                    H[nt].connect(Nt[nt]);
                    for (let wt = 0; wt < g.channelCount; wt += 1)
                      Nt[nt].connect($, wt, nt * g.channelCount + wt);
                  }
                  for (const [nt, wt] of Ot.entries())
                    (wt.connect($, 0, D + nt), wt.start(0));
                  return (
                    $.connect(q.destination),
                    await Promise.all(H.map((nt) => f(w, q, nt))),
                    _(q)
                  );
                })(),
            b,
            g,
            k,
            T,
            u,
          );
        }
        const C = await S,
          M = e(b, {
            buffer: null,
            channelCount: 2,
            channelCountMode: "max",
            channelInterpretation: "speakers",
            loop: !1,
            loopEnd: 0,
            loopStart: 0,
            playbackRate: 1,
          }),
          [E, P, I] = N;
        (C !== null && ((M.buffer = C), M.start(0)), M.connect(E));
        for (let D = 0, U = 0; D < w.numberOfOutputs; D += 1) {
          const F = P[D];
          for (let j = 0; j < k[D]; j += 1) E.connect(F, U + j, j);
          U += k[D];
        }
        return I;
      }
      if (A)
        for (const [C, M] of w.parameters.entries())
          await n(b, M, v.parameters.get(C));
      else
        for (const [C, M] of w.parameters.entries())
          await p(b, M, v.parameters.get(C));
      return (await f(w, b, v), v);
    };
    return {
      render(w, b) {
        a(b, w);
        const v = x.get(b);
        return v !== void 0 ? Promise.resolve(v) : y(w, b);
      },
    };
  },
  sd = (n, t, e, s, i, r, o, a, c, u, l, h, d, p, f, _, m, g, T, x) =>
    class extends f {
      constructor(y, w) {
        (super(y, w),
          (this._nativeContext = y),
          (this._audioWorklet =
            n === void 0 ? void 0 : { addModule: (b, v) => n(this, b, v) }));
      }
      get audioWorklet() {
        return this._audioWorklet;
      }
      createAnalyser() {
        return new t(this);
      }
      createBiquadFilter() {
        return new i(this);
      }
      createBuffer(y, w, b) {
        return new e({ length: w, numberOfChannels: y, sampleRate: b });
      }
      createBufferSource() {
        return new s(this);
      }
      createChannelMerger(y = 6) {
        return new r(this, { numberOfInputs: y });
      }
      createChannelSplitter(y = 6) {
        return new o(this, { numberOfOutputs: y });
      }
      createConstantSource() {
        return new a(this);
      }
      createConvolver() {
        return new c(this);
      }
      createDelay(y = 1) {
        return new l(this, { maxDelayTime: y });
      }
      createDynamicsCompressor() {
        return new h(this);
      }
      createGain() {
        return new d(this);
      }
      createIIRFilter(y, w) {
        return new p(this, { feedback: w, feedforward: y });
      }
      createOscillator() {
        return new _(this);
      }
      createPanner() {
        return new m(this);
      }
      createPeriodicWave(y, w, b = { disableNormalization: !1 }) {
        return new g(this, { ...b, imag: w, real: y });
      }
      createStereoPanner() {
        return new T(this);
      }
      createWaveShaper() {
        return new x(this);
      }
      decodeAudioData(y, w, b) {
        return u(this._nativeContext, y).then(
          (v) => (typeof w == "function" && w(v), v),
          (v) => {
            throw (typeof b == "function" && b(v), v);
          },
        );
      }
    },
  id = {
    Q: 1,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    detune: 0,
    frequency: 350,
    gain: 0,
    type: "lowpass",
  },
  rd = (n, t, e, s, i, r, o, a) =>
    class extends n {
      constructor(u, l) {
        const h = r(u),
          d = { ...id, ...l },
          p = i(h, d),
          f = o(h),
          _ = f ? e() : null;
        (super(u, !1, p, _),
          (this._Q = t(this, f, p.Q, Tt, Ct)),
          (this._detune = t(
            this,
            f,
            p.detune,
            1200 * Math.log2(Tt),
            -1200 * Math.log2(Tt),
          )),
          (this._frequency = t(this, f, p.frequency, u.sampleRate / 2, 0)),
          (this._gain = t(this, f, p.gain, 40 * Math.log10(Tt), Ct)),
          (this._nativeBiquadFilterNode = p),
          a(this, 1));
      }
      get detune() {
        return this._detune;
      }
      get frequency() {
        return this._frequency;
      }
      get gain() {
        return this._gain;
      }
      get Q() {
        return this._Q;
      }
      get type() {
        return this._nativeBiquadFilterNode.type;
      }
      set type(u) {
        this._nativeBiquadFilterNode.type = u;
      }
      getFrequencyResponse(u, l, h) {
        try {
          this._nativeBiquadFilterNode.getFrequencyResponse(u, l, h);
        } catch (d) {
          throw d.code === 11 ? s() : d;
        }
        if (u.length !== l.length || l.length !== h.length) throw s();
      }
    },
  od = (n, t, e, s, i) => () => {
    const r = new WeakMap(),
      o = async (a, c) => {
        let u = e(a);
        const l = vt(u, c);
        if (!l) {
          const h = {
            Q: u.Q.value,
            channelCount: u.channelCount,
            channelCountMode: u.channelCountMode,
            channelInterpretation: u.channelInterpretation,
            detune: u.detune.value,
            frequency: u.frequency.value,
            gain: u.gain.value,
            type: u.type,
          };
          u = t(c, h);
        }
        return (
          r.set(c, u),
          l
            ? (await n(c, a.Q, u.Q),
              await n(c, a.detune, u.detune),
              await n(c, a.frequency, u.frequency),
              await n(c, a.gain, u.gain))
            : (await s(c, a.Q, u.Q),
              await s(c, a.detune, u.detune),
              await s(c, a.frequency, u.frequency),
              await s(c, a.gain, u.gain)),
          await i(a, c, u),
          u
        );
      };
    return {
      render(a, c) {
        const u = r.get(c);
        return u !== void 0 ? Promise.resolve(u) : o(a, c);
      },
    };
  },
  ad = (n, t) => (e, s) => {
    const i = t.get(e);
    if (i !== void 0) return i;
    const r = n.get(e);
    if (r !== void 0) return r;
    try {
      const o = s();
      return o instanceof Promise
        ? (n.set(e, o),
          o.catch(() => !1).then((a) => (n.delete(e), t.set(e, a), a)))
        : (t.set(e, o), o);
    } catch {
      return (t.set(e, !1), !1);
    }
  },
  cd = {
    channelCount: 1,
    channelCountMode: "explicit",
    channelInterpretation: "speakers",
    numberOfInputs: 6,
  },
  ud = (n, t, e, s, i) =>
    class extends n {
      constructor(o, a) {
        const c = s(o),
          u = { ...cd, ...a },
          l = e(c, u),
          h = i(c) ? t() : null;
        super(o, !1, l, h);
      }
    },
  ld = (n, t, e) => () => {
    const s = new WeakMap(),
      i = async (r, o) => {
        let a = t(r);
        if (!vt(a, o)) {
          const u = {
            channelCount: a.channelCount,
            channelCountMode: a.channelCountMode,
            channelInterpretation: a.channelInterpretation,
            numberOfInputs: a.numberOfInputs,
          };
          a = n(o, u);
        }
        return (s.set(o, a), await e(r, o, a), a);
      };
    return {
      render(r, o) {
        const a = s.get(o);
        return a !== void 0 ? Promise.resolve(a) : i(r, o);
      },
    };
  },
  hd = {
    channelCount: 6,
    channelCountMode: "explicit",
    channelInterpretation: "discrete",
    numberOfOutputs: 6,
  },
  dd = (n, t, e, s, i, r) =>
    class extends n {
      constructor(a, c) {
        const u = s(a),
          l = r({ ...hd, ...c }),
          h = e(u, l),
          d = i(u) ? t() : null;
        super(a, !1, h, d);
      }
    },
  fd = (n, t, e) => () => {
    const s = new WeakMap(),
      i = async (r, o) => {
        let a = t(r);
        if (!vt(a, o)) {
          const u = {
            channelCount: a.channelCount,
            channelCountMode: a.channelCountMode,
            channelInterpretation: a.channelInterpretation,
            numberOfOutputs: a.numberOfOutputs,
          };
          a = n(o, u);
        }
        return (s.set(o, a), await e(r, o, a), a);
      };
    return {
      render(r, o) {
        const a = s.get(o);
        return a !== void 0 ? Promise.resolve(a) : i(r, o);
      },
    };
  },
  pd = (n) => (t, e, s) => n(e, t, s),
  md =
    (n) =>
    (t, e, s = 0, i = 0) => {
      const r = t[s];
      if (r === void 0) throw n();
      return ys(e) ? r.connect(e, 0, i) : r.connect(e, 0);
    },
  _d = (n) => (t, e) => {
    const s = n(t, {
        buffer: null,
        channelCount: 2,
        channelCountMode: "max",
        channelInterpretation: "speakers",
        loop: !1,
        loopEnd: 0,
        loopStart: 0,
        playbackRate: 1,
      }),
      i = t.createBuffer(1, 2, 44100);
    return (
      (s.buffer = i),
      (s.loop = !0),
      s.connect(e),
      s.start(),
      () => {
        (s.stop(), s.disconnect(e));
      }
    );
  },
  gd = {
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    offset: 1,
  },
  yd = (n, t, e, s, i, r, o) =>
    class extends n {
      constructor(c, u) {
        const l = i(c),
          h = { ...gd, ...u },
          d = s(l, h),
          p = r(l),
          f = p ? e() : null;
        (super(c, !1, d, f),
          (this._constantSourceNodeRenderer = f),
          (this._nativeConstantSourceNode = d),
          (this._offset = t(this, p, d.offset, Tt, Ct)),
          (this._onended = null));
      }
      get offset() {
        return this._offset;
      }
      get onended() {
        return this._onended;
      }
      set onended(c) {
        const u = typeof c == "function" ? o(this, c) : null;
        this._nativeConstantSourceNode.onended = u;
        const l = this._nativeConstantSourceNode.onended;
        this._onended = l !== null && l === u ? c : l;
      }
      start(c = 0) {
        if (
          (this._nativeConstantSourceNode.start(c),
          this._constantSourceNodeRenderer !== null &&
            (this._constantSourceNodeRenderer.start = c),
          this.context.state !== "closed")
        ) {
          sn(this);
          const u = () => {
            (this._nativeConstantSourceNode.removeEventListener("ended", u),
              ee(this) && Ln(this));
          };
          this._nativeConstantSourceNode.addEventListener("ended", u);
        }
      }
      stop(c = 0) {
        (this._nativeConstantSourceNode.stop(c),
          this._constantSourceNodeRenderer !== null &&
            (this._constantSourceNodeRenderer.stop = c));
      }
    },
  vd = (n, t, e, s, i) => () => {
    const r = new WeakMap();
    let o = null,
      a = null;
    const c = async (u, l) => {
      let h = e(u);
      const d = vt(h, l);
      if (!d) {
        const p = {
          channelCount: h.channelCount,
          channelCountMode: h.channelCountMode,
          channelInterpretation: h.channelInterpretation,
          offset: h.offset.value,
        };
        ((h = t(l, p)), o !== null && h.start(o), a !== null && h.stop(a));
      }
      return (
        r.set(l, h),
        d ? await n(l, u.offset, h.offset) : await s(l, u.offset, h.offset),
        await i(u, l, h),
        h
      );
    };
    return {
      set start(u) {
        o = u;
      },
      set stop(u) {
        a = u;
      },
      render(u, l) {
        const h = r.get(l);
        return h !== void 0 ? Promise.resolve(h) : c(u, l);
      },
    };
  },
  wd = (n) => (t) => ((n[0] = t), n[0]),
  Td = {
    buffer: null,
    channelCount: 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers",
    disableNormalization: !1,
  },
  bd = (n, t, e, s, i, r) =>
    class extends n {
      constructor(a, c) {
        const u = s(a),
          l = { ...Td, ...c },
          h = e(u, l),
          p = i(u) ? t() : null;
        (super(a, !1, h, p),
          (this._isBufferNullified = !1),
          (this._nativeConvolverNode = h),
          l.buffer !== null && r(this, l.buffer.duration));
      }
      get buffer() {
        return this._isBufferNullified
          ? null
          : this._nativeConvolverNode.buffer;
      }
      set buffer(a) {
        if (
          ((this._nativeConvolverNode.buffer = a),
          a === null && this._nativeConvolverNode.buffer !== null)
        ) {
          const c = this._nativeConvolverNode.context;
          ((this._nativeConvolverNode.buffer = c.createBuffer(
            1,
            1,
            c.sampleRate,
          )),
            (this._isBufferNullified = !0),
            r(this, 0));
        } else
          ((this._isBufferNullified = !1),
            r(
              this,
              this._nativeConvolverNode.buffer === null
                ? 0
                : this._nativeConvolverNode.buffer.duration,
            ));
      }
      get normalize() {
        return this._nativeConvolverNode.normalize;
      }
      set normalize(a) {
        this._nativeConvolverNode.normalize = a;
      }
    },
  xd = (n, t, e) => () => {
    const s = new WeakMap(),
      i = async (r, o) => {
        let a = t(r);
        if (!vt(a, o)) {
          const u = {
            buffer: a.buffer,
            channelCount: a.channelCount,
            channelCountMode: a.channelCountMode,
            channelInterpretation: a.channelInterpretation,
            disableNormalization: !a.normalize,
          };
          a = n(o, u);
        }
        return (
          s.set(o, a),
          pn(a) ? await e(r, o, a.inputs[0]) : await e(r, o, a),
          a
        );
      };
    return {
      render(r, o) {
        const a = s.get(o);
        return a !== void 0 ? Promise.resolve(a) : i(r, o);
      },
    };
  },
  Sd = (n, t) => (e, s, i) => {
    if (t === null)
      throw new Error("Missing the native OfflineAudioContext constructor.");
    try {
      return new t(e, s, i);
    } catch (r) {
      throw r.name === "SyntaxError" ? n() : r;
    }
  },
  Cd = () => new DOMException("", "DataCloneError"),
  po = (n) => {
    const { port1: t, port2: e } = new MessageChannel();
    return new Promise((s) => {
      const i = () => {
        ((e.onmessage = null), t.close(), e.close(), s());
      };
      e.onmessage = () => i();
      try {
        t.postMessage(n, [n]);
      } catch {
      } finally {
        i();
      }
    });
  },
  Ad = (n, t, e, s, i, r, o, a, c, u, l) => (h, d) => {
    const p = o(h) ? h : r(h);
    if (i.has(d)) {
      const f = e();
      return Promise.reject(f);
    }
    try {
      i.add(d);
    } catch {}
    return t(c, () => c(p))
      ? p
          .decodeAudioData(d)
          .then(
            (f) => (
              po(d).catch(() => {}),
              t(a, () => a(f)) || l(f),
              n.add(f),
              f
            ),
          )
      : new Promise((f, _) => {
          const m = async () => {
              try {
                await po(d);
              } catch {}
            },
            g = (T) => {
              (_(T), m());
            };
          try {
            p.decodeAudioData(
              d,
              (T) => {
                (typeof T.copyFromChannel != "function" && (u(T), rr(T)),
                  n.add(T),
                  m().then(() => f(T)));
              },
              (T) => {
                g(T === null ? s() : T);
              },
            );
          } catch (T) {
            g(T);
          }
        });
  },
  kd = (n, t, e, s, i, r, o, a) => (c, u) => {
    const l = t.get(c);
    if (l === void 0) throw new Error("Missing the expected cycle count.");
    const h = r(c.context),
      d = a(h);
    if (l === u) {
      if ((t.delete(c), !d && o(c))) {
        const p = s(c),
          { outputs: f } = e(c);
        for (const _ of f)
          if (Wn(_)) {
            const m = s(_[0]);
            n(p, m, _[1], _[2]);
          } else {
            const m = i(_[0]);
            p.connect(m, _[1]);
          }
      }
    } else t.set(c, l - u);
  },
  Nd = {
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    delayTime: 0,
    maxDelayTime: 1,
  },
  Od = (n, t, e, s, i, r, o) =>
    class extends n {
      constructor(c, u) {
        const l = i(c),
          h = { ...Nd, ...u },
          d = s(l, h),
          p = r(l),
          f = p ? e(h.maxDelayTime) : null;
        (super(c, !1, d, f),
          (this._delayTime = t(this, p, d.delayTime)),
          o(this, h.maxDelayTime));
      }
      get delayTime() {
        return this._delayTime;
      }
    },
  Ed = (n, t, e, s, i) => (r) => {
    const o = new WeakMap(),
      a = async (c, u) => {
        let l = e(c);
        const h = vt(l, u);
        if (!h) {
          const d = {
            channelCount: l.channelCount,
            channelCountMode: l.channelCountMode,
            channelInterpretation: l.channelInterpretation,
            delayTime: l.delayTime.value,
            maxDelayTime: r,
          };
          l = t(u, d);
        }
        return (
          o.set(u, l),
          h
            ? await n(u, c.delayTime, l.delayTime)
            : await s(u, c.delayTime, l.delayTime),
          await i(c, u, l),
          l
        );
      };
    return {
      render(c, u) {
        const l = o.get(u);
        return l !== void 0 ? Promise.resolve(l) : a(c, u);
      },
    };
  },
  Md = (n) => (t, e, s, i) => n(t[i], (r) => r[0] === e && r[1] === s),
  Id = (n) => (t, e) => {
    n(t).delete(e);
  },
  Dd = (n) => "delayTime" in n,
  Rd = (n, t, e) =>
    function s(i, r) {
      const o = ms(r) ? r : e(n, r);
      if (Dd(o)) return [];
      if (i[0] === o) return [i];
      if (i.includes(o)) return [];
      const { outputs: a } = t(o);
      return Array.from(a)
        .map((c) => s([...i, o], c[0]))
        .reduce((c, u) => c.concat(u), []);
    },
  es = (n, t, e) => {
    const s = t[e];
    if (s === void 0) throw n();
    return s;
  },
  Pd =
    (n) =>
    (t, e = void 0, s = void 0, i = 0) =>
      e === void 0
        ? t.forEach((r) => r.disconnect())
        : typeof e == "number"
          ? es(n, t, e).disconnect()
          : ys(e)
            ? s === void 0
              ? t.forEach((r) => r.disconnect(e))
              : i === void 0
                ? es(n, t, s).disconnect(e, 0)
                : es(n, t, s).disconnect(e, 0, i)
            : s === void 0
              ? t.forEach((r) => r.disconnect(e))
              : es(n, t, s).disconnect(e, 0),
  Fd = {
    attack: 0.003,
    channelCount: 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers",
    knee: 30,
    ratio: 12,
    release: 0.25,
    threshold: -24,
  },
  Vd = (n, t, e, s, i, r, o, a) =>
    class extends n {
      constructor(u, l) {
        const h = r(u),
          d = { ...Fd, ...l },
          p = s(h, d),
          f = o(h),
          _ = f ? e() : null;
        (super(u, !1, p, _),
          (this._attack = t(this, f, p.attack)),
          (this._knee = t(this, f, p.knee)),
          (this._nativeDynamicsCompressorNode = p),
          (this._ratio = t(this, f, p.ratio)),
          (this._release = t(this, f, p.release)),
          (this._threshold = t(this, f, p.threshold)),
          a(this, 0.006));
      }
      get attack() {
        return this._attack;
      }
      get channelCount() {
        return this._nativeDynamicsCompressorNode.channelCount;
      }
      set channelCount(u) {
        const l = this._nativeDynamicsCompressorNode.channelCount;
        if (((this._nativeDynamicsCompressorNode.channelCount = u), u > 2))
          throw ((this._nativeDynamicsCompressorNode.channelCount = l), i());
      }
      get channelCountMode() {
        return this._nativeDynamicsCompressorNode.channelCountMode;
      }
      set channelCountMode(u) {
        const l = this._nativeDynamicsCompressorNode.channelCountMode;
        if (
          ((this._nativeDynamicsCompressorNode.channelCountMode = u),
          u === "max")
        )
          throw (
            (this._nativeDynamicsCompressorNode.channelCountMode = l),
            i()
          );
      }
      get knee() {
        return this._knee;
      }
      get ratio() {
        return this._ratio;
      }
      get reduction() {
        return typeof this._nativeDynamicsCompressorNode.reduction.value ==
          "number"
          ? this._nativeDynamicsCompressorNode.reduction.value
          : this._nativeDynamicsCompressorNode.reduction;
      }
      get release() {
        return this._release;
      }
      get threshold() {
        return this._threshold;
      }
    },
  Ld = (n, t, e, s, i) => () => {
    const r = new WeakMap(),
      o = async (a, c) => {
        let u = e(a);
        const l = vt(u, c);
        if (!l) {
          const h = {
            attack: u.attack.value,
            channelCount: u.channelCount,
            channelCountMode: u.channelCountMode,
            channelInterpretation: u.channelInterpretation,
            knee: u.knee.value,
            ratio: u.ratio.value,
            release: u.release.value,
            threshold: u.threshold.value,
          };
          u = t(c, h);
        }
        return (
          r.set(c, u),
          l
            ? (await n(c, a.attack, u.attack),
              await n(c, a.knee, u.knee),
              await n(c, a.ratio, u.ratio),
              await n(c, a.release, u.release),
              await n(c, a.threshold, u.threshold))
            : (await s(c, a.attack, u.attack),
              await s(c, a.knee, u.knee),
              await s(c, a.ratio, u.ratio),
              await s(c, a.release, u.release),
              await s(c, a.threshold, u.threshold)),
          await i(a, c, u),
          u
        );
      };
    return {
      render(a, c) {
        const u = r.get(c);
        return u !== void 0 ? Promise.resolve(u) : o(a, c);
      },
    };
  },
  qd = () => new DOMException("", "EncodingError"),
  Wd = (n) => (t) =>
    new Promise((e, s) => {
      if (n === null) {
        s(new SyntaxError());
        return;
      }
      const i = n.document.head;
      if (i === null) s(new SyntaxError());
      else {
        const r = n.document.createElement("script"),
          o = new Blob([t], { type: "application/javascript" }),
          a = URL.createObjectURL(o),
          c = n.onerror,
          u = () => {
            ((n.onerror = c), URL.revokeObjectURL(a));
          };
        ((n.onerror = (l, h, d, p, f) => {
          if (h === a || (h === n.location.href && d === 1 && p === 1))
            return (u(), s(f), !1);
          if (c !== null) return c(l, h, d, p, f);
        }),
          (r.onerror = () => {
            (u(), s(new SyntaxError()));
          }),
          (r.onload = () => {
            (u(), e());
          }),
          (r.src = a),
          (r.type = "module"),
          i.appendChild(r));
      }
    }),
  jd = (n) =>
    class {
      constructor(e) {
        ((this._nativeEventTarget = e), (this._listeners = new WeakMap()));
      }
      addEventListener(e, s, i) {
        if (s !== null) {
          let r = this._listeners.get(s);
          (r === void 0 &&
            ((r = n(this, s)),
            typeof s == "function" && this._listeners.set(s, r)),
            this._nativeEventTarget.addEventListener(e, r, i));
        }
      }
      dispatchEvent(e) {
        return this._nativeEventTarget.dispatchEvent(e);
      }
      removeEventListener(e, s, i) {
        const r = s === null ? void 0 : this._listeners.get(s);
        this._nativeEventTarget.removeEventListener(
          e,
          r === void 0 ? null : r,
          i,
        );
      }
    },
  Bd = (n) => (t, e, s) => {
    Object.defineProperties(n, {
      currentFrame: {
        configurable: !0,
        get() {
          return Math.round(t * e);
        },
      },
      currentTime: {
        configurable: !0,
        get() {
          return t;
        },
      },
    });
    try {
      return s();
    } finally {
      n !== null && (delete n.currentFrame, delete n.currentTime);
    }
  },
  Ud = (n) => async (t) => {
    try {
      const e = await fetch(t);
      if (e.ok) return [await e.text(), e.url];
    } catch {}
    throw n();
  },
  $d = {
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    gain: 1,
  },
  zd = (n, t, e, s, i, r) =>
    class extends n {
      constructor(a, c) {
        const u = i(a),
          l = { ...$d, ...c },
          h = s(u, l),
          d = r(u),
          p = d ? e() : null;
        (super(a, !1, h, p), (this._gain = t(this, d, h.gain, Tt, Ct)));
      }
      get gain() {
        return this._gain;
      }
    },
  Gd = (n, t, e, s, i) => () => {
    const r = new WeakMap(),
      o = async (a, c) => {
        let u = e(a);
        const l = vt(u, c);
        if (!l) {
          const h = {
            channelCount: u.channelCount,
            channelCountMode: u.channelCountMode,
            channelInterpretation: u.channelInterpretation,
            gain: u.gain.value,
          };
          u = t(c, h);
        }
        return (
          r.set(c, u),
          l ? await n(c, a.gain, u.gain) : await s(c, a.gain, u.gain),
          await i(a, c, u),
          u
        );
      };
    return {
      render(a, c) {
        const u = r.get(c);
        return u !== void 0 ? Promise.resolve(u) : o(a, c);
      },
    };
  },
  Zd = (n, t) => (e) => t(n, e),
  Hd = (n) => (t) => {
    const e = n(t);
    if (e.renderer === null)
      throw new Error(
        "Missing the renderer of the given AudioNode in the audio graph.",
      );
    return e.renderer;
  },
  Xd = (n) => (t) => {
    var e;
    return (e = n.get(t)) !== null && e !== void 0 ? e : 0;
  },
  Yd = (n) => (t) => {
    const e = n(t);
    if (e.renderer === null)
      throw new Error(
        "Missing the renderer of the given AudioParam in the audio graph.",
      );
    return e.renderer;
  },
  Kd = (n) => (t) => n.get(t),
  gt = () => new DOMException("", "InvalidStateError"),
  Qd = (n) => (t) => {
    const e = n.get(t);
    if (e === void 0) throw gt();
    return e;
  },
  Jd = (n, t) => (e) => {
    let s = n.get(e);
    if (s !== void 0) return s;
    if (t === null)
      throw new Error("Missing the native OfflineAudioContext constructor.");
    return ((s = new t(1, 1, 44100)), n.set(e, s), s);
  },
  tf = (n) => (t) => {
    const e = n.get(t);
    if (e === void 0)
      throw new Error("The context has no set of AudioWorkletNodes.");
    return e;
  },
  Ps = () => new DOMException("", "InvalidAccessError"),
  ef = (n) => {
    n.getFrequencyResponse = ((t) => (e, s, i) => {
      if (e.length !== s.length || s.length !== i.length) throw Ps();
      return t.call(n, e, s, i);
    })(n.getFrequencyResponse);
  },
  nf = {
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
  },
  sf = (n, t, e, s, i, r) =>
    class extends n {
      constructor(a, c) {
        const u = s(a),
          l = i(u),
          h = { ...nf, ...c },
          d = t(u, l ? null : a.baseLatency, h),
          p = l ? e(h.feedback, h.feedforward) : null;
        (super(a, !1, d, p),
          ef(d),
          (this._nativeIIRFilterNode = d),
          r(this, 1));
      }
      getFrequencyResponse(a, c, u) {
        return this._nativeIIRFilterNode.getFrequencyResponse(a, c, u);
      }
    },
  Ja = (n, t, e, s, i, r, o, a, c, u, l) => {
    const h = u.length;
    let d = a;
    for (let p = 0; p < h; p += 1) {
      let f = e[0] * u[p];
      for (let _ = 1; _ < i; _ += 1) {
        const m = (d - _) & (c - 1);
        ((f += e[_] * r[m]), (f -= n[_] * o[m]));
      }
      for (let _ = i; _ < s; _ += 1) f += e[_] * r[(d - _) & (c - 1)];
      for (let _ = i; _ < t; _ += 1) f -= n[_] * o[(d - _) & (c - 1)];
      ((r[d] = u[p]), (o[d] = f), (d = (d + 1) & (c - 1)), (l[p] = f));
    }
    return d;
  },
  rf = (n, t, e, s) => {
    const i = e instanceof Float64Array ? e : new Float64Array(e),
      r = s instanceof Float64Array ? s : new Float64Array(s),
      o = i.length,
      a = r.length,
      c = Math.min(o, a);
    if (i[0] !== 1) {
      for (let f = 0; f < o; f += 1) r[f] /= i[0];
      for (let f = 1; f < a; f += 1) i[f] /= i[0];
    }
    const u = 32,
      l = new Float32Array(u),
      h = new Float32Array(u),
      d = t.createBuffer(n.numberOfChannels, n.length, n.sampleRate),
      p = n.numberOfChannels;
    for (let f = 0; f < p; f += 1) {
      const _ = n.getChannelData(f),
        m = d.getChannelData(f);
      (l.fill(0), h.fill(0), Ja(i, o, r, a, c, l, h, 0, u, _, m));
    }
    return d;
  },
  of = (n, t, e, s, i) => (r, o) => {
    const a = new WeakMap();
    let c = null;
    const u = async (l, h) => {
      let d = null,
        p = t(l);
      const f = vt(p, h);
      if (
        (h.createIIRFilter === void 0
          ? (d = n(h, {
              buffer: null,
              channelCount: 2,
              channelCountMode: "max",
              channelInterpretation: "speakers",
              loop: !1,
              loopEnd: 0,
              loopStart: 0,
              playbackRate: 1,
            }))
          : f || (p = h.createIIRFilter(o, r)),
        a.set(h, d === null ? p : d),
        d !== null)
      ) {
        if (c === null) {
          if (e === null)
            throw new Error(
              "Missing the native OfflineAudioContext constructor.",
            );
          const m = new e(
            l.context.destination.channelCount,
            l.context.length,
            h.sampleRate,
          );
          c = (async () => {
            await s(l, m, m.destination);
            const g = await i(m);
            return rf(g, h, r, o);
          })();
        }
        const _ = await c;
        return ((d.buffer = _), d.start(0), d);
      }
      return (await s(l, h, p), p);
    };
    return {
      render(l, h) {
        const d = a.get(h);
        return d !== void 0 ? Promise.resolve(d) : u(l, h);
      },
    };
  },
  af = (n, t, e, s, i, r) => (o) => (a, c) => {
    const u = n.get(a);
    if (u === void 0) {
      if (!o && r(a)) {
        const l = s(a),
          { outputs: h } = e(a);
        for (const d of h)
          if (Wn(d)) {
            const p = s(d[0]);
            t(l, p, d[1], d[2]);
          } else {
            const p = i(d[0]);
            l.disconnect(p, d[1]);
          }
      }
      n.set(a, c);
    } else n.set(a, u + c);
  },
  cf = (n, t) => (e) => {
    const s = n.get(e);
    return t(s) || t(e);
  },
  uf = (n, t) => (e) => n.has(e) || t(e),
  lf = (n, t) => (e) => n.has(e) || t(e),
  hf = (n, t) => (e) => {
    const s = n.get(e);
    return t(s) || t(e);
  },
  df = (n) => (t) => n !== null && t instanceof n,
  ff = (n) => (t) =>
    n !== null && typeof n.AudioNode == "function" && t instanceof n.AudioNode,
  pf = (n) => (t) =>
    n !== null &&
    typeof n.AudioParam == "function" &&
    t instanceof n.AudioParam,
  mf = (n, t) => (e) => n(e) || t(e),
  _f = (n) => (t) => n !== null && t instanceof n,
  gf = (n) => n !== null && n.isSecureContext,
  yf = (n, t, e, s) =>
    class extends n {
      constructor(r, o) {
        const a = e(r),
          c = t(a, o);
        if (s(a)) throw TypeError();
        (super(r, !0, c, null), (this._nativeMediaElementAudioSourceNode = c));
      }
      get mediaElement() {
        return this._nativeMediaElementAudioSourceNode.mediaElement;
      }
    },
  vf = {
    channelCount: 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers",
  },
  wf = (n, t, e, s) =>
    class extends n {
      constructor(r, o) {
        const a = e(r);
        if (s(a)) throw new TypeError();
        const c = { ...vf, ...o },
          u = t(a, c);
        (super(r, !1, u, null),
          (this._nativeMediaStreamAudioDestinationNode = u));
      }
      get stream() {
        return this._nativeMediaStreamAudioDestinationNode.stream;
      }
    },
  Tf = (n, t, e, s) =>
    class extends n {
      constructor(r, o) {
        const a = e(r),
          c = t(a, o);
        if (s(a)) throw new TypeError();
        (super(r, !0, c, null), (this._nativeMediaStreamAudioSourceNode = c));
      }
      get mediaStream() {
        return this._nativeMediaStreamAudioSourceNode.mediaStream;
      }
    },
  bf = (n, t, e) =>
    class extends n {
      constructor(i, r) {
        const o = e(i),
          a = t(o, r);
        super(i, !0, a, null);
      }
    },
  xf = (n, t, e, s, i, r) =>
    class extends e {
      constructor(a, c) {
        (super(a),
          (this._nativeContext = a),
          Ds.set(this, a),
          s(a) && i.set(a, new Set()),
          (this._destination = new n(this, c)),
          (this._listener = t(this, a)),
          (this._onstatechange = null));
      }
      get currentTime() {
        return this._nativeContext.currentTime;
      }
      get destination() {
        return this._destination;
      }
      get listener() {
        return this._listener;
      }
      get onstatechange() {
        return this._onstatechange;
      }
      set onstatechange(a) {
        const c = typeof a == "function" ? r(this, a) : null;
        this._nativeContext.onstatechange = c;
        const u = this._nativeContext.onstatechange;
        this._onstatechange = u !== null && u === c ? a : u;
      }
      get sampleRate() {
        return this._nativeContext.sampleRate;
      }
      get state() {
        return this._nativeContext.state;
      }
    },
  In = (n) => {
    const t = new Uint32Array([
      1179011410, 40, 1163280727, 544501094, 16, 131073, 44100, 176400, 1048580,
      1635017060, 4, 0,
    ]);
    try {
      const e = n.decodeAudioData(t.buffer, () => {});
      return e === void 0 ? !1 : (e.catch(() => {}), !0);
    } catch {}
    return !1;
  },
  Sf = (n, t) => (e, s, i) => {
    const r = new Set();
    return (
      (e.connect = (
        (o) =>
        (a, c = 0, u = 0) => {
          const l = r.size === 0;
          if (t(a))
            return (
              o.call(e, a, c, u),
              n(
                r,
                [a, c, u],
                (h) => h[0] === a && h[1] === c && h[2] === u,
                !0,
              ),
              l && s(),
              a
            );
          (o.call(e, a, c),
            n(r, [a, c], (h) => h[0] === a && h[1] === c, !0),
            l && s());
        }
      )(e.connect)),
      (e.disconnect = ((o) => (a, c, u) => {
        const l = r.size > 0;
        if (a === void 0) (o.apply(e), r.clear());
        else if (typeof a == "number") {
          o.call(e, a);
          for (const d of r) d[1] === a && r.delete(d);
        } else {
          t(a) ? o.call(e, a, c, u) : o.call(e, a, c);
          for (const d of r)
            d[0] === a &&
              (c === void 0 || d[1] === c) &&
              (u === void 0 || d[2] === u) &&
              r.delete(d);
        }
        const h = r.size === 0;
        l && h && i();
      })(e.disconnect)),
      e
    );
  },
  it = (n, t, e) => {
    const s = t[e];
    s !== void 0 && s !== n[e] && (n[e] = s);
  },
  _t = (n, t) => {
    (it(n, t, "channelCount"),
      it(n, t, "channelCountMode"),
      it(n, t, "channelInterpretation"));
  },
  mo = (n) => typeof n.getFloatTimeDomainData == "function",
  Cf = (n) => {
    n.getFloatTimeDomainData = (t) => {
      const e = new Uint8Array(t.length);
      n.getByteTimeDomainData(e);
      const s = Math.max(e.length, n.fftSize);
      for (let i = 0; i < s; i += 1) t[i] = (e[i] - 128) * 0.0078125;
      return t;
    };
  },
  Af = (n, t) => (e, s) => {
    const i = e.createAnalyser();
    if ((_t(i, s), !(s.maxDecibels > s.minDecibels))) throw t();
    return (
      it(i, s, "fftSize"),
      it(i, s, "maxDecibels"),
      it(i, s, "minDecibels"),
      it(i, s, "smoothingTimeConstant"),
      n(mo, () => mo(i)) || Cf(i),
      i
    );
  },
  kf = (n) =>
    n === null ? null : n.hasOwnProperty("AudioBuffer") ? n.AudioBuffer : null,
  ut = (n, t, e) => {
    const s = t[e];
    s !== void 0 && s !== n[e].value && (n[e].value = s);
  },
  Nf = (n) => {
    n.start = ((t) => {
      let e = !1;
      return (s = 0, i = 0, r) => {
        if (e) throw gt();
        (t.call(n, s, i, r), (e = !0));
      };
    })(n.start);
  },
  cr = (n) => {
    n.start = (
      (t) =>
      (e = 0, s = 0, i) => {
        if ((typeof i == "number" && i < 0) || s < 0 || e < 0)
          throw new RangeError("The parameters can't be negative.");
        t.call(n, e, s, i);
      }
    )(n.start);
  },
  ur = (n) => {
    n.stop = (
      (t) =>
      (e = 0) => {
        if (e < 0) throw new RangeError("The parameter can't be negative.");
        t.call(n, e);
      }
    )(n.stop);
  },
  Of = (n, t, e, s, i, r, o, a, c, u, l) => (h, d) => {
    const p = h.createBufferSource();
    return (
      _t(p, d),
      ut(p, d, "playbackRate"),
      it(p, d, "buffer"),
      it(p, d, "loop"),
      it(p, d, "loopEnd"),
      it(p, d, "loopStart"),
      t(e, () => e(h)) || Nf(p),
      t(s, () => s(h)) || c(p),
      t(i, () => i(h)) || u(p, h),
      t(r, () => r(h)) || cr(p),
      t(o, () => o(h)) || l(p, h),
      t(a, () => a(h)) || ur(p),
      n(h, p),
      p
    );
  },
  Ef = (n) =>
    n === null
      ? null
      : n.hasOwnProperty("AudioContext")
        ? n.AudioContext
        : n.hasOwnProperty("webkitAudioContext")
          ? n.webkitAudioContext
          : null,
  Mf = (n, t) => (e, s, i) => {
    const r = e.destination;
    if (r.channelCount !== s)
      try {
        r.channelCount = s;
      } catch {}
    (i &&
      r.channelCountMode !== "explicit" &&
      (r.channelCountMode = "explicit"),
      r.maxChannelCount === 0 &&
        Object.defineProperty(r, "maxChannelCount", { value: s }));
    const o = n(e, {
      channelCount: s,
      channelCountMode: r.channelCountMode,
      channelInterpretation: r.channelInterpretation,
      gain: 1,
    });
    return (
      t(
        o,
        "channelCount",
        (a) => () => a.call(o),
        (a) => (c) => {
          a.call(o, c);
          try {
            r.channelCount = c;
          } catch (u) {
            if (c > r.maxChannelCount) throw u;
          }
        },
      ),
      t(
        o,
        "channelCountMode",
        (a) => () => a.call(o),
        (a) => (c) => {
          (a.call(o, c), (r.channelCountMode = c));
        },
      ),
      t(
        o,
        "channelInterpretation",
        (a) => () => a.call(o),
        (a) => (c) => {
          (a.call(o, c), (r.channelInterpretation = c));
        },
      ),
      Object.defineProperty(o, "maxChannelCount", {
        get: () => r.maxChannelCount,
      }),
      o.connect(r),
      o
    );
  },
  If = (n) =>
    n === null
      ? null
      : n.hasOwnProperty("AudioWorkletNode")
        ? n.AudioWorkletNode
        : null,
  Df = (n) => {
    const { port1: t } = new MessageChannel();
    try {
      t.postMessage(n);
    } finally {
      t.close();
    }
  },
  Rf = (n, t, e, s, i) => (r, o, a, c, u, l) => {
    if (a !== null)
      try {
        const h = new a(r, c, l),
          d = new Map();
        let p = null;
        if (
          (Object.defineProperties(h, {
            channelCount: {
              get: () => l.channelCount,
              set: () => {
                throw n();
              },
            },
            channelCountMode: {
              get: () => "explicit",
              set: () => {
                throw n();
              },
            },
            onprocessorerror: {
              get: () => p,
              set: (f) => {
                (typeof p == "function" &&
                  h.removeEventListener("processorerror", p),
                  (p = typeof f == "function" ? f : null),
                  typeof p == "function" &&
                    h.addEventListener("processorerror", p));
              },
            },
          }),
          (h.addEventListener = (
            (f) =>
            (..._) => {
              if (_[0] === "processorerror") {
                const m =
                  typeof _[1] == "function"
                    ? _[1]
                    : typeof _[1] == "object" &&
                        _[1] !== null &&
                        typeof _[1].handleEvent == "function"
                      ? _[1].handleEvent
                      : null;
                if (m !== null) {
                  const g = d.get(_[1]);
                  g !== void 0
                    ? (_[1] = g)
                    : ((_[1] = (T) => {
                        T.type === "error"
                          ? (Object.defineProperties(T, {
                              type: { value: "processorerror" },
                            }),
                            m(T))
                          : m(new ErrorEvent(_[0], { ...T }));
                      }),
                      d.set(m, _[1]));
                }
              }
              return (f.call(h, "error", _[1], _[2]), f.call(h, ..._));
            }
          )(h.addEventListener)),
          (h.removeEventListener = (
            (f) =>
            (..._) => {
              if (_[0] === "processorerror") {
                const m = d.get(_[1]);
                m !== void 0 && (d.delete(_[1]), (_[1] = m));
              }
              return (
                f.call(h, "error", _[1], _[2]),
                f.call(h, _[0], _[1], _[2])
              );
            }
          )(h.removeEventListener)),
          l.numberOfOutputs !== 0)
        ) {
          const f = e(r, {
            channelCount: 1,
            channelCountMode: "explicit",
            channelInterpretation: "discrete",
            gain: 0,
          });
          return (
            h.connect(f).connect(r.destination),
            i(
              h,
              () => f.disconnect(),
              () => f.connect(r.destination),
            )
          );
        }
        return h;
      } catch (h) {
        throw h.code === 11 ? s() : h;
      }
    if (u === void 0) throw s();
    return (Df(l), t(r, o, u, l));
  },
  tc = (n, t) =>
    n === null
      ? 512
      : Math.max(
          512,
          Math.min(16384, Math.pow(2, Math.round(Math.log2(n * t)))),
        ),
  Pf = (n) =>
    new Promise((t, e) => {
      const { port1: s, port2: i } = new MessageChannel();
      ((s.onmessage = ({ data: r }) => {
        (s.close(), i.close(), t(r));
      }),
        (s.onmessageerror = ({ data: r }) => {
          (s.close(), i.close(), e(r));
        }),
        i.postMessage(n));
    }),
  Ff = async (n, t) => {
    const e = await Pf(t);
    return new n(e);
  },
  Vf = (n, t, e, s) => {
    let i = Oi.get(n);
    i === void 0 && ((i = new WeakMap()), Oi.set(n, i));
    const r = Ff(e, s);
    return (i.set(t, r), r);
  },
  Lf = (n, t, e, s, i, r, o, a, c, u, l, h, d) => (p, f, _, m) => {
    if (m.numberOfInputs === 0 && m.numberOfOutputs === 0) throw c();
    const g = Array.isArray(m.outputChannelCount)
      ? m.outputChannelCount
      : Array.from(m.outputChannelCount);
    if (g.some((O) => O < 1)) throw c();
    if (g.length !== m.numberOfOutputs) throw t();
    if (m.channelCountMode !== "explicit") throw c();
    const T = m.channelCount * m.numberOfInputs,
      x = g.reduce((O, L) => O + L, 0),
      S = _.parameterDescriptors === void 0 ? 0 : _.parameterDescriptors.length;
    if (T + S > 6 || x > 6) throw c();
    const y = new MessageChannel(),
      w = [],
      b = [];
    for (let O = 0; O < m.numberOfInputs; O += 1)
      (w.push(
        o(p, {
          channelCount: m.channelCount,
          channelCountMode: m.channelCountMode,
          channelInterpretation: m.channelInterpretation,
          gain: 1,
        }),
      ),
        b.push(
          i(p, {
            channelCount: m.channelCount,
            channelCountMode: "explicit",
            channelInterpretation: "discrete",
            numberOfOutputs: m.channelCount,
          }),
        ));
    const v = [];
    if (_.parameterDescriptors !== void 0)
      for (const {
        defaultValue: O,
        maxValue: L,
        minValue: mt,
        name: ot,
      } of _.parameterDescriptors) {
        const G = r(p, {
          channelCount: 1,
          channelCountMode: "explicit",
          channelInterpretation: "discrete",
          offset:
            m.parameterData[ot] !== void 0
              ? m.parameterData[ot]
              : O === void 0
                ? 0
                : O,
        });
        (Object.defineProperties(G.offset, {
          defaultValue: { get: () => (O === void 0 ? 0 : O) },
          maxValue: { get: () => (L === void 0 ? Tt : L) },
          minValue: { get: () => (mt === void 0 ? Ct : mt) },
        }),
          v.push(G));
      }
    const N = s(p, {
        channelCount: 1,
        channelCountMode: "explicit",
        channelInterpretation: "speakers",
        numberOfInputs: Math.max(1, T + S),
      }),
      A = tc(f, p.sampleRate),
      k = a(p, A, T + S, Math.max(1, x)),
      C = i(p, {
        channelCount: Math.max(1, x),
        channelCountMode: "explicit",
        channelInterpretation: "discrete",
        numberOfOutputs: Math.max(1, x),
      }),
      M = [];
    for (let O = 0; O < m.numberOfOutputs; O += 1)
      M.push(
        s(p, {
          channelCount: 1,
          channelCountMode: "explicit",
          channelInterpretation: "speakers",
          numberOfInputs: g[O],
        }),
      );
    for (let O = 0; O < m.numberOfInputs; O += 1) {
      w[O].connect(b[O]);
      for (let L = 0; L < m.channelCount; L += 1)
        b[O].connect(N, L, O * m.channelCount + L);
    }
    const E = new Ka(
      _.parameterDescriptors === void 0
        ? []
        : _.parameterDescriptors.map(({ name: O }, L) => {
            const mt = v[L];
            return (mt.connect(N, 0, T + L), mt.start(0), [O, mt.offset]);
          }),
    );
    N.connect(k);
    let P = m.channelInterpretation,
      I = null;
    const D = m.numberOfOutputs === 0 ? [k] : M,
      U = {
        get bufferSize() {
          return A;
        },
        get channelCount() {
          return m.channelCount;
        },
        set channelCount(O) {
          throw e();
        },
        get channelCountMode() {
          return m.channelCountMode;
        },
        set channelCountMode(O) {
          throw e();
        },
        get channelInterpretation() {
          return P;
        },
        set channelInterpretation(O) {
          for (const L of w) L.channelInterpretation = O;
          P = O;
        },
        get context() {
          return k.context;
        },
        get inputs() {
          return w;
        },
        get numberOfInputs() {
          return m.numberOfInputs;
        },
        get numberOfOutputs() {
          return m.numberOfOutputs;
        },
        get onprocessorerror() {
          return I;
        },
        set onprocessorerror(O) {
          (typeof I == "function" && U.removeEventListener("processorerror", I),
            (I = typeof O == "function" ? O : null),
            typeof I == "function" && U.addEventListener("processorerror", I));
        },
        get parameters() {
          return E;
        },
        get port() {
          return y.port2;
        },
        addEventListener(...O) {
          return k.addEventListener(O[0], O[1], O[2]);
        },
        connect: n.bind(null, D),
        disconnect: u.bind(null, D),
        dispatchEvent(...O) {
          return k.dispatchEvent(O[0]);
        },
        removeEventListener(...O) {
          return k.removeEventListener(O[0], O[1], O[2]);
        },
      },
      F = new Map();
    ((y.port1.addEventListener = (
      (O) =>
      (...L) => {
        if (L[0] === "message") {
          const mt =
            typeof L[1] == "function"
              ? L[1]
              : typeof L[1] == "object" &&
                  L[1] !== null &&
                  typeof L[1].handleEvent == "function"
                ? L[1].handleEvent
                : null;
          if (mt !== null) {
            const ot = F.get(L[1]);
            ot !== void 0
              ? (L[1] = ot)
              : ((L[1] = (G) => {
                  l(p.currentTime, p.sampleRate, () => mt(G));
                }),
                F.set(mt, L[1]));
          }
        }
        return O.call(y.port1, L[0], L[1], L[2]);
      }
    )(y.port1.addEventListener)),
      (y.port1.removeEventListener = (
        (O) =>
        (...L) => {
          if (L[0] === "message") {
            const mt = F.get(L[1]);
            mt !== void 0 && (F.delete(L[1]), (L[1] = mt));
          }
          return O.call(y.port1, L[0], L[1], L[2]);
        }
      )(y.port1.removeEventListener)));
    let j = null;
    (Object.defineProperty(y.port1, "onmessage", {
      get: () => j,
      set: (O) => {
        (typeof j == "function" && y.port1.removeEventListener("message", j),
          (j = typeof O == "function" ? O : null),
          typeof j == "function" &&
            (y.port1.addEventListener("message", j), y.port1.start()));
      },
    }),
      (_.prototype.port = y.port1));
    let q = null;
    Vf(p, U, _, m).then((O) => (q = O));
    const Nt = ws(m.numberOfInputs, m.channelCount),
      Ot = ws(m.numberOfOutputs, g),
      $ =
        _.parameterDescriptors === void 0
          ? []
          : _.parameterDescriptors.reduce(
              (O, { name: L }) => ({ ...O, [L]: new Float32Array(128) }),
              {},
            );
    let nt = !0;
    const wt = () => {
        m.numberOfOutputs > 0 && k.disconnect(C);
        for (let O = 0, L = 0; O < m.numberOfOutputs; O += 1) {
          const mt = M[O];
          for (let ot = 0; ot < g[O]; ot += 1) C.disconnect(mt, L + ot, ot);
          L += g[O];
        }
      },
      R = new Map();
    k.onaudioprocess = ({ inputBuffer: O, outputBuffer: L }) => {
      if (q !== null) {
        const mt = h(U);
        for (let ot = 0; ot < A; ot += 128) {
          for (let G = 0; G < m.numberOfInputs; G += 1)
            for (let ct = 0; ct < m.channelCount; ct += 1)
              vs(O, Nt[G], ct, ct, ot);
          _.parameterDescriptors !== void 0 &&
            _.parameterDescriptors.forEach(({ name: G }, ct) => {
              vs(O, $, G, T + ct, ot);
            });
          for (let G = 0; G < m.numberOfInputs; G += 1)
            for (let ct = 0; ct < g[G]; ct += 1)
              Ot[G][ct].byteLength === 0 && (Ot[G][ct] = new Float32Array(128));
          try {
            const G = Nt.map((It, ce) => {
              if (mt[ce].size > 0) return (R.set(ce, A / 128), It);
              const ti = R.get(ce);
              return ti === void 0
                ? []
                : (It.every((Zc) => Zc.every((Hc) => Hc === 0)) &&
                    (ti === 1 ? R.delete(ce) : R.set(ce, ti - 1)),
                  It);
            });
            nt = l(p.currentTime + ot / p.sampleRate, p.sampleRate, () =>
              q.process(G, Ot, $),
            );
            for (let It = 0, ce = 0; It < m.numberOfOutputs; It += 1) {
              for (let Tn = 0; Tn < g[It]; Tn += 1)
                Qa(L, Ot[It], Tn, ce + Tn, ot);
              ce += g[It];
            }
          } catch (G) {
            ((nt = !1),
              U.dispatchEvent(
                new ErrorEvent("processorerror", {
                  colno: G.colno,
                  filename: G.filename,
                  lineno: G.lineno,
                  message: G.message,
                }),
              ));
          }
          if (!nt) {
            for (let G = 0; G < m.numberOfInputs; G += 1) {
              w[G].disconnect(b[G]);
              for (let ct = 0; ct < m.channelCount; ct += 1)
                b[ot].disconnect(N, ct, G * m.channelCount + ct);
            }
            if (_.parameterDescriptors !== void 0) {
              const G = _.parameterDescriptors.length;
              for (let ct = 0; ct < G; ct += 1) {
                const It = v[ct];
                (It.disconnect(N, 0, T + ct), It.stop());
              }
            }
            (N.disconnect(k), (k.onaudioprocess = null), be ? wt() : ze());
            break;
          }
        }
      }
    };
    let be = !1;
    const xe = o(p, {
        channelCount: 1,
        channelCountMode: "explicit",
        channelInterpretation: "discrete",
        gain: 0,
      }),
      $e = () => k.connect(xe).connect(p.destination),
      ze = () => {
        (k.disconnect(xe), xe.disconnect());
      },
      zc = () => {
        if (nt) {
          (ze(), m.numberOfOutputs > 0 && k.connect(C));
          for (let O = 0, L = 0; O < m.numberOfOutputs; O += 1) {
            const mt = M[O];
            for (let ot = 0; ot < g[O]; ot += 1) C.connect(mt, L + ot, ot);
            L += g[O];
          }
        }
        be = !0;
      },
      Gc = () => {
        (nt && ($e(), wt()), (be = !1));
      };
    return ($e(), d(U, zc, Gc));
  },
  ec = (n, t) => {
    const e = n.createBiquadFilter();
    return (
      _t(e, t),
      ut(e, t, "Q"),
      ut(e, t, "detune"),
      ut(e, t, "frequency"),
      ut(e, t, "gain"),
      it(e, t, "type"),
      e
    );
  },
  qf = (n, t) => (e, s) => {
    const i = e.createChannelMerger(s.numberOfInputs);
    return (
      n !== null && n.name === "webkitAudioContext" && t(e, i),
      _t(i, s),
      i
    );
  },
  Wf = (n) => {
    const t = n.numberOfOutputs;
    (Object.defineProperty(n, "channelCount", {
      get: () => t,
      set: (e) => {
        if (e !== t) throw gt();
      },
    }),
      Object.defineProperty(n, "channelCountMode", {
        get: () => "explicit",
        set: (e) => {
          if (e !== "explicit") throw gt();
        },
      }),
      Object.defineProperty(n, "channelInterpretation", {
        get: () => "discrete",
        set: (e) => {
          if (e !== "discrete") throw gt();
        },
      }));
  },
  jn = (n, t) => {
    const e = n.createChannelSplitter(t.numberOfOutputs);
    return (_t(e, t), Wf(e), e);
  },
  jf = (n, t, e, s, i) => (r, o) => {
    if (r.createConstantSource === void 0) return e(r, o);
    const a = r.createConstantSource();
    return (
      _t(a, o),
      ut(a, o, "offset"),
      t(s, () => s(r)) || cr(a),
      t(i, () => i(r)) || ur(a),
      n(r, a),
      a
    );
  },
  mn = (n, t) => (
    (n.connect = t.connect.bind(t)),
    (n.disconnect = t.disconnect.bind(t)),
    n
  ),
  Bf =
    (n, t, e, s) =>
    (i, { offset: r, ...o }) => {
      const a = i.createBuffer(1, 2, 44100),
        c = t(i, {
          buffer: null,
          channelCount: 2,
          channelCountMode: "max",
          channelInterpretation: "speakers",
          loop: !1,
          loopEnd: 0,
          loopStart: 0,
          playbackRate: 1,
        }),
        u = e(i, { ...o, gain: r }),
        l = a.getChannelData(0);
      ((l[0] = 1), (l[1] = 1), (c.buffer = a), (c.loop = !0));
      const h = {
          get bufferSize() {},
          get channelCount() {
            return u.channelCount;
          },
          set channelCount(f) {
            u.channelCount = f;
          },
          get channelCountMode() {
            return u.channelCountMode;
          },
          set channelCountMode(f) {
            u.channelCountMode = f;
          },
          get channelInterpretation() {
            return u.channelInterpretation;
          },
          set channelInterpretation(f) {
            u.channelInterpretation = f;
          },
          get context() {
            return u.context;
          },
          get inputs() {
            return [];
          },
          get numberOfInputs() {
            return c.numberOfInputs;
          },
          get numberOfOutputs() {
            return u.numberOfOutputs;
          },
          get offset() {
            return u.gain;
          },
          get onended() {
            return c.onended;
          },
          set onended(f) {
            c.onended = f;
          },
          addEventListener(...f) {
            return c.addEventListener(f[0], f[1], f[2]);
          },
          dispatchEvent(...f) {
            return c.dispatchEvent(f[0]);
          },
          removeEventListener(...f) {
            return c.removeEventListener(f[0], f[1], f[2]);
          },
          start(f = 0) {
            c.start.call(c, f);
          },
          stop(f = 0) {
            c.stop.call(c, f);
          },
        },
        d = () => c.connect(u),
        p = () => c.disconnect(u);
      return (n(i, c), s(mn(h, u), d, p));
    },
  Uf = (n, t) => (e, s) => {
    const i = e.createConvolver();
    if (
      (_t(i, s),
      s.disableNormalization === i.normalize &&
        (i.normalize = !s.disableNormalization),
      it(i, s, "buffer"),
      s.channelCount > 2 ||
        (t(
          i,
          "channelCount",
          (r) => () => r.call(i),
          (r) => (o) => {
            if (o > 2) throw n();
            return r.call(i, o);
          },
        ),
        s.channelCountMode === "max"))
    )
      throw n();
    return (
      t(
        i,
        "channelCountMode",
        (r) => () => r.call(i),
        (r) => (o) => {
          if (o === "max") throw n();
          return r.call(i, o);
        },
      ),
      i
    );
  },
  nc = (n, t) => {
    const e = n.createDelay(t.maxDelayTime);
    return (_t(e, t), ut(e, t, "delayTime"), e);
  },
  $f = (n) => (t, e) => {
    const s = t.createDynamicsCompressor();
    if ((_t(s, e), e.channelCount > 2 || e.channelCountMode === "max"))
      throw n();
    return (
      ut(s, e, "attack"),
      ut(s, e, "knee"),
      ut(s, e, "ratio"),
      ut(s, e, "release"),
      ut(s, e, "threshold"),
      s
    );
  },
  kt = (n, t) => {
    const e = n.createGain();
    return (_t(e, t), ut(e, t, "gain"), e);
  },
  zf = (n) => (t, e, s) => {
    if (t.createIIRFilter === void 0) return n(t, e, s);
    const i = t.createIIRFilter(s.feedforward, s.feedback);
    return (_t(i, s), i);
  };
function Gf(n, t) {
  const e = t[0] * t[0] + t[1] * t[1];
  return [(n[0] * t[0] + n[1] * t[1]) / e, (n[1] * t[0] - n[0] * t[1]) / e];
}
function Zf(n, t) {
  return [n[0] * t[0] - n[1] * t[1], n[0] * t[1] + n[1] * t[0]];
}
function _o(n, t) {
  let e = [0, 0];
  for (let s = n.length - 1; s >= 0; s -= 1) ((e = Zf(e, t)), (e[0] += n[s]));
  return e;
}
const Hf =
    (n, t, e, s) =>
    (
      i,
      r,
      {
        channelCount: o,
        channelCountMode: a,
        channelInterpretation: c,
        feedback: u,
        feedforward: l,
      },
    ) => {
      const h = tc(r, i.sampleRate),
        d = u instanceof Float64Array ? u : new Float64Array(u),
        p = l instanceof Float64Array ? l : new Float64Array(l),
        f = d.length,
        _ = p.length,
        m = Math.min(f, _);
      if (f === 0 || f > 20) throw s();
      if (d[0] === 0) throw t();
      if (_ === 0 || _ > 20) throw s();
      if (p[0] === 0) throw t();
      if (d[0] !== 1) {
        for (let v = 0; v < _; v += 1) p[v] /= d[0];
        for (let v = 1; v < f; v += 1) d[v] /= d[0];
      }
      const g = e(i, h, o, o);
      ((g.channelCount = o),
        (g.channelCountMode = a),
        (g.channelInterpretation = c));
      const T = 32,
        x = [],
        S = [],
        y = [];
      for (let v = 0; v < o; v += 1) {
        x.push(0);
        const N = new Float32Array(T),
          A = new Float32Array(T);
        (N.fill(0), A.fill(0), S.push(N), y.push(A));
      }
      g.onaudioprocess = (v) => {
        const N = v.inputBuffer,
          A = v.outputBuffer,
          k = N.numberOfChannels;
        for (let C = 0; C < k; C += 1) {
          const M = N.getChannelData(C),
            E = A.getChannelData(C);
          x[C] = Ja(d, f, p, _, m, S[C], y[C], x[C], T, M, E);
        }
      };
      const w = i.sampleRate / 2;
      return mn(
        {
          get bufferSize() {
            return h;
          },
          get channelCount() {
            return g.channelCount;
          },
          set channelCount(v) {
            g.channelCount = v;
          },
          get channelCountMode() {
            return g.channelCountMode;
          },
          set channelCountMode(v) {
            g.channelCountMode = v;
          },
          get channelInterpretation() {
            return g.channelInterpretation;
          },
          set channelInterpretation(v) {
            g.channelInterpretation = v;
          },
          get context() {
            return g.context;
          },
          get inputs() {
            return [g];
          },
          get numberOfInputs() {
            return g.numberOfInputs;
          },
          get numberOfOutputs() {
            return g.numberOfOutputs;
          },
          addEventListener(...v) {
            return g.addEventListener(v[0], v[1], v[2]);
          },
          dispatchEvent(...v) {
            return g.dispatchEvent(v[0]);
          },
          getFrequencyResponse(v, N, A) {
            if (v.length !== N.length || N.length !== A.length) throw n();
            const k = v.length;
            for (let C = 0; C < k; C += 1) {
              const M = -Math.PI * (v[C] / w),
                E = [Math.cos(M), Math.sin(M)],
                P = _o(p, E),
                I = _o(d, E),
                D = Gf(P, I);
              ((N[C] = Math.sqrt(D[0] * D[0] + D[1] * D[1])),
                (A[C] = Math.atan2(D[1], D[0])));
            }
          },
          removeEventListener(...v) {
            return g.removeEventListener(v[0], v[1], v[2]);
          },
        },
        g,
      );
    },
  Xf = (n, t) => n.createMediaElementSource(t.mediaElement),
  Yf = (n, t) => {
    const e = n.createMediaStreamDestination();
    return (
      _t(e, t),
      e.numberOfOutputs === 1 &&
        Object.defineProperty(e, "numberOfOutputs", { get: () => 0 }),
      e
    );
  },
  Kf = (n, { mediaStream: t }) => {
    const e = t.getAudioTracks();
    e.sort((r, o) => (r.id < o.id ? -1 : r.id > o.id ? 1 : 0));
    const s = e.slice(0, 1),
      i = n.createMediaStreamSource(new MediaStream(s));
    return (Object.defineProperty(i, "mediaStream", { value: t }), i);
  },
  Qf =
    (n, t) =>
    (e, { mediaStreamTrack: s }) => {
      if (typeof e.createMediaStreamTrackSource == "function")
        return e.createMediaStreamTrackSource(s);
      const i = new MediaStream([s]),
        r = e.createMediaStreamSource(i);
      if (s.kind !== "audio") throw n();
      if (t(e)) throw new TypeError();
      return r;
    },
  Jf = (n) =>
    n === null
      ? null
      : n.hasOwnProperty("OfflineAudioContext")
        ? n.OfflineAudioContext
        : n.hasOwnProperty("webkitOfflineAudioContext")
          ? n.webkitOfflineAudioContext
          : null,
  tp = (n, t, e, s, i, r) => (o, a) => {
    const c = o.createOscillator();
    return (
      _t(c, a),
      ut(c, a, "detune"),
      ut(c, a, "frequency"),
      a.periodicWave !== void 0
        ? c.setPeriodicWave(a.periodicWave)
        : it(c, a, "type"),
      t(e, () => e(o)) || cr(c),
      t(s, () => s(o)) || r(c, o),
      t(i, () => i(o)) || ur(c),
      n(o, c),
      c
    );
  },
  ep = (n) => (t, e) => {
    const s = t.createPanner();
    return s.orientationX === void 0
      ? n(t, e)
      : (_t(s, e),
        ut(s, e, "orientationX"),
        ut(s, e, "orientationY"),
        ut(s, e, "orientationZ"),
        ut(s, e, "positionX"),
        ut(s, e, "positionY"),
        ut(s, e, "positionZ"),
        it(s, e, "coneInnerAngle"),
        it(s, e, "coneOuterAngle"),
        it(s, e, "coneOuterGain"),
        it(s, e, "distanceModel"),
        it(s, e, "maxDistance"),
        it(s, e, "panningModel"),
        it(s, e, "refDistance"),
        it(s, e, "rolloffFactor"),
        s);
  },
  np =
    (n, t, e, s, i, r, o, a, c, u) =>
    (
      l,
      {
        coneInnerAngle: h,
        coneOuterAngle: d,
        coneOuterGain: p,
        distanceModel: f,
        maxDistance: _,
        orientationX: m,
        orientationY: g,
        orientationZ: T,
        panningModel: x,
        positionX: S,
        positionY: y,
        positionZ: w,
        refDistance: b,
        rolloffFactor: v,
        ...N
      },
    ) => {
      const A = l.createPanner();
      if (N.channelCount > 2 || N.channelCountMode === "max") throw o();
      _t(A, N);
      const k = {
          channelCount: 1,
          channelCountMode: "explicit",
          channelInterpretation: "discrete",
        },
        C = e(l, {
          ...k,
          channelInterpretation: "speakers",
          numberOfInputs: 6,
        }),
        M = s(l, { ...N, gain: 1 }),
        E = s(l, { ...k, gain: 1 }),
        P = s(l, { ...k, gain: 0 }),
        I = s(l, { ...k, gain: 0 }),
        D = s(l, { ...k, gain: 0 }),
        U = s(l, { ...k, gain: 0 }),
        F = s(l, { ...k, gain: 0 }),
        j = i(l, 256, 6, 1),
        q = r(l, { ...k, curve: new Float32Array([1, 1]), oversample: "none" });
      let H = [m, g, T],
        Nt = [S, y, w];
      const Ot = new Float32Array(1);
      ((j.onaudioprocess = ({ inputBuffer: R }) => {
        const be = [c(R, Ot, 0), c(R, Ot, 1), c(R, Ot, 2)];
        be.some(($e, ze) => $e !== H[ze]) &&
          (A.setOrientation(...be), (H = be));
        const xe = [c(R, Ot, 3), c(R, Ot, 4), c(R, Ot, 5)];
        xe.some(($e, ze) => $e !== Nt[ze]) && (A.setPosition(...xe), (Nt = xe));
      }),
        Object.defineProperty(P.gain, "defaultValue", { get: () => 0 }),
        Object.defineProperty(I.gain, "defaultValue", { get: () => 0 }),
        Object.defineProperty(D.gain, "defaultValue", { get: () => 0 }),
        Object.defineProperty(U.gain, "defaultValue", { get: () => 0 }),
        Object.defineProperty(F.gain, "defaultValue", { get: () => 0 }));
      const $ = {
        get bufferSize() {},
        get channelCount() {
          return A.channelCount;
        },
        set channelCount(R) {
          if (R > 2) throw o();
          ((M.channelCount = R), (A.channelCount = R));
        },
        get channelCountMode() {
          return A.channelCountMode;
        },
        set channelCountMode(R) {
          if (R === "max") throw o();
          ((M.channelCountMode = R), (A.channelCountMode = R));
        },
        get channelInterpretation() {
          return A.channelInterpretation;
        },
        set channelInterpretation(R) {
          ((M.channelInterpretation = R), (A.channelInterpretation = R));
        },
        get coneInnerAngle() {
          return A.coneInnerAngle;
        },
        set coneInnerAngle(R) {
          A.coneInnerAngle = R;
        },
        get coneOuterAngle() {
          return A.coneOuterAngle;
        },
        set coneOuterAngle(R) {
          A.coneOuterAngle = R;
        },
        get coneOuterGain() {
          return A.coneOuterGain;
        },
        set coneOuterGain(R) {
          if (R < 0 || R > 1) throw t();
          A.coneOuterGain = R;
        },
        get context() {
          return A.context;
        },
        get distanceModel() {
          return A.distanceModel;
        },
        set distanceModel(R) {
          A.distanceModel = R;
        },
        get inputs() {
          return [M];
        },
        get maxDistance() {
          return A.maxDistance;
        },
        set maxDistance(R) {
          if (R < 0) throw new RangeError();
          A.maxDistance = R;
        },
        get numberOfInputs() {
          return A.numberOfInputs;
        },
        get numberOfOutputs() {
          return A.numberOfOutputs;
        },
        get orientationX() {
          return E.gain;
        },
        get orientationY() {
          return P.gain;
        },
        get orientationZ() {
          return I.gain;
        },
        get panningModel() {
          return A.panningModel;
        },
        set panningModel(R) {
          A.panningModel = R;
        },
        get positionX() {
          return D.gain;
        },
        get positionY() {
          return U.gain;
        },
        get positionZ() {
          return F.gain;
        },
        get refDistance() {
          return A.refDistance;
        },
        set refDistance(R) {
          if (R < 0) throw new RangeError();
          A.refDistance = R;
        },
        get rolloffFactor() {
          return A.rolloffFactor;
        },
        set rolloffFactor(R) {
          if (R < 0) throw new RangeError();
          A.rolloffFactor = R;
        },
        addEventListener(...R) {
          return M.addEventListener(R[0], R[1], R[2]);
        },
        dispatchEvent(...R) {
          return M.dispatchEvent(R[0]);
        },
        removeEventListener(...R) {
          return M.removeEventListener(R[0], R[1], R[2]);
        },
      };
      (h !== $.coneInnerAngle && ($.coneInnerAngle = h),
        d !== $.coneOuterAngle && ($.coneOuterAngle = d),
        p !== $.coneOuterGain && ($.coneOuterGain = p),
        f !== $.distanceModel && ($.distanceModel = f),
        _ !== $.maxDistance && ($.maxDistance = _),
        m !== $.orientationX.value && ($.orientationX.value = m),
        g !== $.orientationY.value && ($.orientationY.value = g),
        T !== $.orientationZ.value && ($.orientationZ.value = T),
        x !== $.panningModel && ($.panningModel = x),
        S !== $.positionX.value && ($.positionX.value = S),
        y !== $.positionY.value && ($.positionY.value = y),
        w !== $.positionZ.value && ($.positionZ.value = w),
        b !== $.refDistance && ($.refDistance = b),
        v !== $.rolloffFactor && ($.rolloffFactor = v),
        (H[0] !== 1 || H[1] !== 0 || H[2] !== 0) && A.setOrientation(...H),
        (Nt[0] !== 0 || Nt[1] !== 0 || Nt[2] !== 0) && A.setPosition(...Nt));
      const nt = () => {
          (M.connect(A),
            n(M, q, 0, 0),
            q.connect(E).connect(C, 0, 0),
            q.connect(P).connect(C, 0, 1),
            q.connect(I).connect(C, 0, 2),
            q.connect(D).connect(C, 0, 3),
            q.connect(U).connect(C, 0, 4),
            q.connect(F).connect(C, 0, 5),
            C.connect(j).connect(l.destination));
        },
        wt = () => {
          (M.disconnect(A),
            a(M, q, 0, 0),
            q.disconnect(E),
            E.disconnect(C),
            q.disconnect(P),
            P.disconnect(C),
            q.disconnect(I),
            I.disconnect(C),
            q.disconnect(D),
            D.disconnect(C),
            q.disconnect(U),
            U.disconnect(C),
            q.disconnect(F),
            F.disconnect(C),
            C.disconnect(j),
            j.disconnect(l.destination));
        };
      return u(mn($, A), nt, wt);
    },
  sp =
    (n) =>
    (t, { disableNormalization: e, imag: s, real: i }) => {
      const r = s instanceof Float32Array ? s : new Float32Array(s),
        o = i instanceof Float32Array ? i : new Float32Array(i),
        a = t.createPeriodicWave(o, r, { disableNormalization: e });
      if (Array.from(s).length < 2) throw n();
      return a;
    },
  Bn = (n, t, e, s) => n.createScriptProcessor(t, e, s),
  ip = (n, t) => (e, s) => {
    const i = s.channelCountMode;
    if (i === "clamped-max") throw t();
    if (e.createStereoPanner === void 0) return n(e, s);
    const r = e.createStereoPanner();
    return (
      _t(r, s),
      ut(r, s, "pan"),
      Object.defineProperty(r, "channelCountMode", {
        get: () => i,
        set: (o) => {
          if (o !== i) throw t();
        },
      }),
      r
    );
  },
  rp = (n, t, e, s, i, r) => {
    const a = new Float32Array([1, 1]),
      c = Math.PI / 2,
      u = {
        channelCount: 1,
        channelCountMode: "explicit",
        channelInterpretation: "discrete",
      },
      l = { ...u, oversample: "none" },
      h = (f, _, m, g) => {
        const T = new Float32Array(16385),
          x = new Float32Array(16385);
        for (let N = 0; N < 16385; N += 1) {
          const A = (N / 16384) * c;
          ((T[N] = Math.cos(A)), (x[N] = Math.sin(A)));
        }
        const S = e(f, { ...u, gain: 0 }),
          y = s(f, { ...l, curve: T }),
          w = s(f, { ...l, curve: a }),
          b = e(f, { ...u, gain: 0 }),
          v = s(f, { ...l, curve: x });
        return {
          connectGraph() {
            (_.connect(S),
              _.connect(w.inputs === void 0 ? w : w.inputs[0]),
              _.connect(b),
              w.connect(m),
              m.connect(y.inputs === void 0 ? y : y.inputs[0]),
              m.connect(v.inputs === void 0 ? v : v.inputs[0]),
              y.connect(S.gain),
              v.connect(b.gain),
              S.connect(g, 0, 0),
              b.connect(g, 0, 1));
          },
          disconnectGraph() {
            (_.disconnect(S),
              _.disconnect(w.inputs === void 0 ? w : w.inputs[0]),
              _.disconnect(b),
              w.disconnect(m),
              m.disconnect(y.inputs === void 0 ? y : y.inputs[0]),
              m.disconnect(v.inputs === void 0 ? v : v.inputs[0]),
              y.disconnect(S.gain),
              v.disconnect(b.gain),
              S.disconnect(g, 0, 0),
              b.disconnect(g, 0, 1));
          },
        };
      },
      d = (f, _, m, g) => {
        const T = new Float32Array(16385),
          x = new Float32Array(16385),
          S = new Float32Array(16385),
          y = new Float32Array(16385),
          w = Math.floor(16385 / 2);
        for (let D = 0; D < 16385; D += 1)
          if (D > w) {
            const U = ((D - w) / (16384 - w)) * c;
            ((T[D] = Math.cos(U)),
              (x[D] = Math.sin(U)),
              (S[D] = 0),
              (y[D] = 1));
          } else {
            const U = (D / (16384 - w)) * c;
            ((T[D] = 1),
              (x[D] = 0),
              (S[D] = Math.cos(U)),
              (y[D] = Math.sin(U)));
          }
        const b = t(f, {
            channelCount: 2,
            channelCountMode: "explicit",
            channelInterpretation: "discrete",
            numberOfOutputs: 2,
          }),
          v = e(f, { ...u, gain: 0 }),
          N = s(f, { ...l, curve: T }),
          A = e(f, { ...u, gain: 0 }),
          k = s(f, { ...l, curve: x }),
          C = s(f, { ...l, curve: a }),
          M = e(f, { ...u, gain: 0 }),
          E = s(f, { ...l, curve: S }),
          P = e(f, { ...u, gain: 0 }),
          I = s(f, { ...l, curve: y });
        return {
          connectGraph() {
            (_.connect(b),
              _.connect(C.inputs === void 0 ? C : C.inputs[0]),
              b.connect(v, 0),
              b.connect(A, 0),
              b.connect(M, 1),
              b.connect(P, 1),
              C.connect(m),
              m.connect(N.inputs === void 0 ? N : N.inputs[0]),
              m.connect(k.inputs === void 0 ? k : k.inputs[0]),
              m.connect(E.inputs === void 0 ? E : E.inputs[0]),
              m.connect(I.inputs === void 0 ? I : I.inputs[0]),
              N.connect(v.gain),
              k.connect(A.gain),
              E.connect(M.gain),
              I.connect(P.gain),
              v.connect(g, 0, 0),
              M.connect(g, 0, 0),
              A.connect(g, 0, 1),
              P.connect(g, 0, 1));
          },
          disconnectGraph() {
            (_.disconnect(b),
              _.disconnect(C.inputs === void 0 ? C : C.inputs[0]),
              b.disconnect(v, 0),
              b.disconnect(A, 0),
              b.disconnect(M, 1),
              b.disconnect(P, 1),
              C.disconnect(m),
              m.disconnect(N.inputs === void 0 ? N : N.inputs[0]),
              m.disconnect(k.inputs === void 0 ? k : k.inputs[0]),
              m.disconnect(E.inputs === void 0 ? E : E.inputs[0]),
              m.disconnect(I.inputs === void 0 ? I : I.inputs[0]),
              N.disconnect(v.gain),
              k.disconnect(A.gain),
              E.disconnect(M.gain),
              I.disconnect(P.gain),
              v.disconnect(g, 0, 0),
              M.disconnect(g, 0, 0),
              A.disconnect(g, 0, 1),
              P.disconnect(g, 0, 1));
          },
        };
      },
      p = (f, _, m, g, T) => {
        if (_ === 1) return h(f, m, g, T);
        if (_ === 2) return d(f, m, g, T);
        throw i();
      };
    return (f, { channelCount: _, channelCountMode: m, pan: g, ...T }) => {
      if (m === "max") throw i();
      const x = n(f, {
          ...T,
          channelCount: 1,
          channelCountMode: m,
          numberOfInputs: 2,
        }),
        S = e(f, { ...T, channelCount: _, channelCountMode: m, gain: 1 }),
        y = e(f, {
          channelCount: 1,
          channelCountMode: "explicit",
          channelInterpretation: "discrete",
          gain: g,
        });
      let { connectGraph: w, disconnectGraph: b } = p(f, _, S, y, x);
      (Object.defineProperty(y.gain, "defaultValue", { get: () => 0 }),
        Object.defineProperty(y.gain, "maxValue", { get: () => 1 }),
        Object.defineProperty(y.gain, "minValue", { get: () => -1 }));
      const v = {
        get bufferSize() {},
        get channelCount() {
          return S.channelCount;
        },
        set channelCount(C) {
          (S.channelCount !== C &&
            (N && b(),
            ({ connectGraph: w, disconnectGraph: b } = p(f, C, S, y, x)),
            N && w()),
            (S.channelCount = C));
        },
        get channelCountMode() {
          return S.channelCountMode;
        },
        set channelCountMode(C) {
          if (C === "clamped-max" || C === "max") throw i();
          S.channelCountMode = C;
        },
        get channelInterpretation() {
          return S.channelInterpretation;
        },
        set channelInterpretation(C) {
          S.channelInterpretation = C;
        },
        get context() {
          return S.context;
        },
        get inputs() {
          return [S];
        },
        get numberOfInputs() {
          return S.numberOfInputs;
        },
        get numberOfOutputs() {
          return S.numberOfOutputs;
        },
        get pan() {
          return y.gain;
        },
        addEventListener(...C) {
          return S.addEventListener(C[0], C[1], C[2]);
        },
        dispatchEvent(...C) {
          return S.dispatchEvent(C[0]);
        },
        removeEventListener(...C) {
          return S.removeEventListener(C[0], C[1], C[2]);
        },
      };
      let N = !1;
      const A = () => {
          (w(), (N = !0));
        },
        k = () => {
          (b(), (N = !1));
        };
      return r(mn(v, x), A, k);
    };
  },
  op = (n, t, e, s, i, r, o) => (a, c) => {
    const u = a.createWaveShaper();
    if (
      r !== null &&
      r.name === "webkitAudioContext" &&
      a.createGain().gain.automationRate === void 0
    )
      return e(a, c);
    _t(u, c);
    const l =
      c.curve === null || c.curve instanceof Float32Array
        ? c.curve
        : new Float32Array(c.curve);
    if (l !== null && l.length < 2) throw t();
    (it(u, { curve: l }, "curve"), it(u, c, "oversample"));
    let h = null,
      d = !1;
    return (
      o(
        u,
        "curve",
        (_) => () => _.call(u),
        (_) => (m) => (
          _.call(u, m),
          d &&
            (s(m) && h === null
              ? (h = n(a, u))
              : !s(m) && h !== null && (h(), (h = null))),
          m
        ),
      ),
      i(
        u,
        () => {
          ((d = !0), s(u.curve) && (h = n(a, u)));
        },
        () => {
          ((d = !1), h !== null && (h(), (h = null)));
        },
      )
    );
  },
  ap =
    (n, t, e, s, i) =>
    (r, { curve: o, oversample: a, ...c }) => {
      const u = r.createWaveShaper(),
        l = r.createWaveShaper();
      (_t(u, c), _t(l, c));
      const h = e(r, { ...c, gain: 1 }),
        d = e(r, { ...c, gain: -1 }),
        p = e(r, { ...c, gain: 1 }),
        f = e(r, { ...c, gain: -1 });
      let _ = null,
        m = !1,
        g = null;
      const T = {
        get bufferSize() {},
        get channelCount() {
          return u.channelCount;
        },
        set channelCount(y) {
          ((h.channelCount = y),
            (d.channelCount = y),
            (u.channelCount = y),
            (p.channelCount = y),
            (l.channelCount = y),
            (f.channelCount = y));
        },
        get channelCountMode() {
          return u.channelCountMode;
        },
        set channelCountMode(y) {
          ((h.channelCountMode = y),
            (d.channelCountMode = y),
            (u.channelCountMode = y),
            (p.channelCountMode = y),
            (l.channelCountMode = y),
            (f.channelCountMode = y));
        },
        get channelInterpretation() {
          return u.channelInterpretation;
        },
        set channelInterpretation(y) {
          ((h.channelInterpretation = y),
            (d.channelInterpretation = y),
            (u.channelInterpretation = y),
            (p.channelInterpretation = y),
            (l.channelInterpretation = y),
            (f.channelInterpretation = y));
        },
        get context() {
          return u.context;
        },
        get curve() {
          return g;
        },
        set curve(y) {
          if (y !== null && y.length < 2) throw t();
          if (y === null) ((u.curve = y), (l.curve = y));
          else {
            const w = y.length,
              b = new Float32Array(w + 2 - (w % 2)),
              v = new Float32Array(w + 2 - (w % 2));
            ((b[0] = y[0]), (v[0] = -y[w - 1]));
            const N = Math.ceil((w + 1) / 2),
              A = (w + 1) / 2 - 1;
            for (let k = 1; k < N; k += 1) {
              const C = (k / N) * A,
                M = Math.floor(C),
                E = Math.ceil(C);
              ((b[k] =
                M === E ? y[M] : (1 - (C - M)) * y[M] + (1 - (E - C)) * y[E]),
                (v[k] =
                  M === E
                    ? -y[w - 1 - M]
                    : -((1 - (C - M)) * y[w - 1 - M]) -
                      (1 - (E - C)) * y[w - 1 - E]));
            }
            ((b[N] = w % 2 === 1 ? y[N - 1] : (y[N - 2] + y[N - 1]) / 2),
              (u.curve = b),
              (l.curve = v));
          }
          ((g = y),
            m &&
              (s(g) && _ === null
                ? (_ = n(r, h))
                : _ !== null && (_(), (_ = null))));
        },
        get inputs() {
          return [h];
        },
        get numberOfInputs() {
          return u.numberOfInputs;
        },
        get numberOfOutputs() {
          return u.numberOfOutputs;
        },
        get oversample() {
          return u.oversample;
        },
        set oversample(y) {
          ((u.oversample = y), (l.oversample = y));
        },
        addEventListener(...y) {
          return h.addEventListener(y[0], y[1], y[2]);
        },
        dispatchEvent(...y) {
          return h.dispatchEvent(y[0]);
        },
        removeEventListener(...y) {
          return h.removeEventListener(y[0], y[1], y[2]);
        },
      };
      (o !== null &&
        (T.curve = o instanceof Float32Array ? o : new Float32Array(o)),
        a !== T.oversample && (T.oversample = a));
      const x = () => {
          (h.connect(u).connect(p),
            h.connect(d).connect(l).connect(f).connect(p),
            (m = !0),
            s(g) && (_ = n(r, h)));
        },
        S = () => {
          (h.disconnect(u),
            u.disconnect(p),
            h.disconnect(d),
            d.disconnect(l),
            l.disconnect(f),
            f.disconnect(p),
            (m = !1),
            _ !== null && (_(), (_ = null)));
        };
      return i(mn(T, p), x, S);
    },
  St = () => new DOMException("", "NotSupportedError"),
  cp = { numberOfChannels: 1 },
  up = (n, t, e, s, i) =>
    class extends n {
      constructor(o, a, c) {
        let u;
        if (typeof o == "number" && a !== void 0 && c !== void 0)
          u = { length: a, numberOfChannels: o, sampleRate: c };
        else if (typeof o == "object") u = o;
        else throw new Error("The given parameters are not valid.");
        const {
            length: l,
            numberOfChannels: h,
            sampleRate: d,
          } = { ...cp, ...u },
          p = s(h, l, d);
        (t(In, () => In(p)) ||
          p.addEventListener(
            "statechange",
            (() => {
              let f = 0;
              const _ = (m) => {
                this._state === "running" &&
                  (f > 0
                    ? (p.removeEventListener("statechange", _),
                      m.stopImmediatePropagation(),
                      this._waitForThePromiseToSettle(m))
                    : (f += 1));
              };
              return _;
            })(),
          ),
          super(p, h),
          (this._length = l),
          (this._nativeOfflineAudioContext = p),
          (this._state = null));
      }
      get length() {
        return this._nativeOfflineAudioContext.length === void 0
          ? this._length
          : this._nativeOfflineAudioContext.length;
      }
      get state() {
        return this._state === null
          ? this._nativeOfflineAudioContext.state
          : this._state;
      }
      startRendering() {
        return this._state === "running"
          ? Promise.reject(e())
          : ((this._state = "running"),
            i(this.destination, this._nativeOfflineAudioContext).finally(() => {
              ((this._state = null), Za(this));
            }));
      }
      _waitForThePromiseToSettle(o) {
        this._state === null
          ? this._nativeOfflineAudioContext.dispatchEvent(o)
          : setTimeout(() => this._waitForThePromiseToSettle(o));
      }
    },
  lp = {
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    detune: 0,
    frequency: 440,
    periodicWave: void 0,
    type: "sine",
  },
  hp = (n, t, e, s, i, r, o) =>
    class extends n {
      constructor(c, u) {
        const l = i(c),
          h = { ...lp, ...u },
          d = e(l, h),
          p = r(l),
          f = p ? s() : null,
          _ = c.sampleRate / 2;
        (super(c, !1, d, f),
          (this._detune = t(this, p, d.detune, 153600, -153600)),
          (this._frequency = t(this, p, d.frequency, _, -_)),
          (this._nativeOscillatorNode = d),
          (this._onended = null),
          (this._oscillatorNodeRenderer = f),
          this._oscillatorNodeRenderer !== null &&
            h.periodicWave !== void 0 &&
            (this._oscillatorNodeRenderer.periodicWave = h.periodicWave));
      }
      get detune() {
        return this._detune;
      }
      get frequency() {
        return this._frequency;
      }
      get onended() {
        return this._onended;
      }
      set onended(c) {
        const u = typeof c == "function" ? o(this, c) : null;
        this._nativeOscillatorNode.onended = u;
        const l = this._nativeOscillatorNode.onended;
        this._onended = l !== null && l === u ? c : l;
      }
      get type() {
        return this._nativeOscillatorNode.type;
      }
      set type(c) {
        ((this._nativeOscillatorNode.type = c),
          this._oscillatorNodeRenderer !== null &&
            (this._oscillatorNodeRenderer.periodicWave = null));
      }
      setPeriodicWave(c) {
        (this._nativeOscillatorNode.setPeriodicWave(c),
          this._oscillatorNodeRenderer !== null &&
            (this._oscillatorNodeRenderer.periodicWave = c));
      }
      start(c = 0) {
        if (
          (this._nativeOscillatorNode.start(c),
          this._oscillatorNodeRenderer !== null &&
            (this._oscillatorNodeRenderer.start = c),
          this.context.state !== "closed")
        ) {
          sn(this);
          const u = () => {
            (this._nativeOscillatorNode.removeEventListener("ended", u),
              ee(this) && Ln(this));
          };
          this._nativeOscillatorNode.addEventListener("ended", u);
        }
      }
      stop(c = 0) {
        (this._nativeOscillatorNode.stop(c),
          this._oscillatorNodeRenderer !== null &&
            (this._oscillatorNodeRenderer.stop = c));
      }
    },
  dp = (n, t, e, s, i) => () => {
    const r = new WeakMap();
    let o = null,
      a = null,
      c = null;
    const u = async (l, h) => {
      let d = e(l);
      const p = vt(d, h);
      if (!p) {
        const f = {
          channelCount: d.channelCount,
          channelCountMode: d.channelCountMode,
          channelInterpretation: d.channelInterpretation,
          detune: d.detune.value,
          frequency: d.frequency.value,
          periodicWave: o === null ? void 0 : o,
          type: d.type,
        };
        ((d = t(h, f)), a !== null && d.start(a), c !== null && d.stop(c));
      }
      return (
        r.set(h, d),
        p
          ? (await n(h, l.detune, d.detune),
            await n(h, l.frequency, d.frequency))
          : (await s(h, l.detune, d.detune),
            await s(h, l.frequency, d.frequency)),
        await i(l, h, d),
        d
      );
    };
    return {
      set periodicWave(l) {
        o = l;
      },
      set start(l) {
        a = l;
      },
      set stop(l) {
        c = l;
      },
      render(l, h) {
        const d = r.get(h);
        return d !== void 0 ? Promise.resolve(d) : u(l, h);
      },
    };
  },
  fp = {
    channelCount: 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers",
    coneInnerAngle: 360,
    coneOuterAngle: 360,
    coneOuterGain: 0,
    distanceModel: "inverse",
    maxDistance: 1e4,
    orientationX: 1,
    orientationY: 0,
    orientationZ: 0,
    panningModel: "equalpower",
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    refDistance: 1,
    rolloffFactor: 1,
  },
  pp = (n, t, e, s, i, r, o) =>
    class extends n {
      constructor(c, u) {
        const l = i(c),
          h = { ...fp, ...u },
          d = e(l, h),
          p = r(l),
          f = p ? s() : null;
        (super(c, !1, d, f),
          (this._nativePannerNode = d),
          (this._orientationX = t(this, p, d.orientationX, Tt, Ct)),
          (this._orientationY = t(this, p, d.orientationY, Tt, Ct)),
          (this._orientationZ = t(this, p, d.orientationZ, Tt, Ct)),
          (this._positionX = t(this, p, d.positionX, Tt, Ct)),
          (this._positionY = t(this, p, d.positionY, Tt, Ct)),
          (this._positionZ = t(this, p, d.positionZ, Tt, Ct)),
          o(this, 1));
      }
      get coneInnerAngle() {
        return this._nativePannerNode.coneInnerAngle;
      }
      set coneInnerAngle(c) {
        this._nativePannerNode.coneInnerAngle = c;
      }
      get coneOuterAngle() {
        return this._nativePannerNode.coneOuterAngle;
      }
      set coneOuterAngle(c) {
        this._nativePannerNode.coneOuterAngle = c;
      }
      get coneOuterGain() {
        return this._nativePannerNode.coneOuterGain;
      }
      set coneOuterGain(c) {
        this._nativePannerNode.coneOuterGain = c;
      }
      get distanceModel() {
        return this._nativePannerNode.distanceModel;
      }
      set distanceModel(c) {
        this._nativePannerNode.distanceModel = c;
      }
      get maxDistance() {
        return this._nativePannerNode.maxDistance;
      }
      set maxDistance(c) {
        this._nativePannerNode.maxDistance = c;
      }
      get orientationX() {
        return this._orientationX;
      }
      get orientationY() {
        return this._orientationY;
      }
      get orientationZ() {
        return this._orientationZ;
      }
      get panningModel() {
        return this._nativePannerNode.panningModel;
      }
      set panningModel(c) {
        this._nativePannerNode.panningModel = c;
      }
      get positionX() {
        return this._positionX;
      }
      get positionY() {
        return this._positionY;
      }
      get positionZ() {
        return this._positionZ;
      }
      get refDistance() {
        return this._nativePannerNode.refDistance;
      }
      set refDistance(c) {
        this._nativePannerNode.refDistance = c;
      }
      get rolloffFactor() {
        return this._nativePannerNode.rolloffFactor;
      }
      set rolloffFactor(c) {
        this._nativePannerNode.rolloffFactor = c;
      }
    },
  mp = (n, t, e, s, i, r, o, a, c, u) => () => {
    const l = new WeakMap();
    let h = null;
    const d = async (p, f) => {
      let _ = null,
        m = r(p);
      const g = {
          channelCount: m.channelCount,
          channelCountMode: m.channelCountMode,
          channelInterpretation: m.channelInterpretation,
        },
        T = {
          ...g,
          coneInnerAngle: m.coneInnerAngle,
          coneOuterAngle: m.coneOuterAngle,
          coneOuterGain: m.coneOuterGain,
          distanceModel: m.distanceModel,
          maxDistance: m.maxDistance,
          panningModel: m.panningModel,
          refDistance: m.refDistance,
          rolloffFactor: m.rolloffFactor,
        },
        x = vt(m, f);
      if ("bufferSize" in m) _ = s(f, { ...g, gain: 1 });
      else if (!x) {
        const S = {
          ...T,
          orientationX: m.orientationX.value,
          orientationY: m.orientationY.value,
          orientationZ: m.orientationZ.value,
          positionX: m.positionX.value,
          positionY: m.positionY.value,
          positionZ: m.positionZ.value,
        };
        m = i(f, S);
      }
      if ((l.set(f, _ === null ? m : _), _ !== null)) {
        if (h === null) {
          if (o === null)
            throw new Error(
              "Missing the native OfflineAudioContext constructor.",
            );
          const k = new o(6, p.context.length, f.sampleRate),
            C = t(k, {
              channelCount: 1,
              channelCountMode: "explicit",
              channelInterpretation: "speakers",
              numberOfInputs: 6,
            });
          (C.connect(k.destination),
            (h = (async () => {
              const M = await Promise.all(
                [
                  p.orientationX,
                  p.orientationY,
                  p.orientationZ,
                  p.positionX,
                  p.positionY,
                  p.positionZ,
                ].map(async (E, P) => {
                  const I = e(k, {
                    channelCount: 1,
                    channelCountMode: "explicit",
                    channelInterpretation: "discrete",
                    offset: P === 0 ? 1 : 0,
                  });
                  return (await a(k, E, I.offset), I);
                }),
              );
              for (let E = 0; E < 6; E += 1)
                (M[E].connect(C, 0, E), M[E].start(0));
              return u(k);
            })()));
        }
        const S = await h,
          y = s(f, { ...g, gain: 1 });
        await c(p, f, y);
        const w = [];
        for (let k = 0; k < S.numberOfChannels; k += 1)
          w.push(S.getChannelData(k));
        let b = [w[0][0], w[1][0], w[2][0]],
          v = [w[3][0], w[4][0], w[5][0]],
          N = s(f, { ...g, gain: 1 }),
          A = i(f, {
            ...T,
            orientationX: b[0],
            orientationY: b[1],
            orientationZ: b[2],
            positionX: v[0],
            positionY: v[1],
            positionZ: v[2],
          });
        (y.connect(N).connect(A.inputs[0]), A.connect(_));
        for (let k = 128; k < S.length; k += 128) {
          const C = [w[0][k], w[1][k], w[2][k]],
            M = [w[3][k], w[4][k], w[5][k]];
          if (C.some((E, P) => E !== b[P]) || M.some((E, P) => E !== v[P])) {
            ((b = C), (v = M));
            const E = k / f.sampleRate;
            (N.gain.setValueAtTime(0, E),
              (N = s(f, { ...g, gain: 0 })),
              (A = i(f, {
                ...T,
                orientationX: b[0],
                orientationY: b[1],
                orientationZ: b[2],
                positionX: v[0],
                positionY: v[1],
                positionZ: v[2],
              })),
              N.gain.setValueAtTime(1, E),
              y.connect(N).connect(A.inputs[0]),
              A.connect(_));
          }
        }
        return _;
      }
      return (
        x
          ? (await n(f, p.orientationX, m.orientationX),
            await n(f, p.orientationY, m.orientationY),
            await n(f, p.orientationZ, m.orientationZ),
            await n(f, p.positionX, m.positionX),
            await n(f, p.positionY, m.positionY),
            await n(f, p.positionZ, m.positionZ))
          : (await a(f, p.orientationX, m.orientationX),
            await a(f, p.orientationY, m.orientationY),
            await a(f, p.orientationZ, m.orientationZ),
            await a(f, p.positionX, m.positionX),
            await a(f, p.positionY, m.positionY),
            await a(f, p.positionZ, m.positionZ)),
        pn(m) ? await c(p, f, m.inputs[0]) : await c(p, f, m),
        m
      );
    };
    return {
      render(p, f) {
        const _ = l.get(f);
        return _ !== void 0 ? Promise.resolve(_) : d(p, f);
      },
    };
  },
  _p = { disableNormalization: !1 },
  gp = (n, t, e, s) =>
    class sc {
      constructor(r, o) {
        const a = t(r),
          c = s({ ..._p, ...o }),
          u = n(a, c);
        return (e.add(u), u);
      }
      static [Symbol.hasInstance](r) {
        return (
          (r !== null &&
            typeof r == "object" &&
            Object.getPrototypeOf(r) === sc.prototype) ||
          e.has(r)
        );
      }
    },
  yp = (n, t) => (e, s, i) => (n(s).replay(i), t(s, e, i)),
  vp = (n, t, e) => async (s, i, r) => {
    const o = n(s);
    await Promise.all(
      o.activeInputs
        .map((a, c) =>
          Array.from(a).map(async ([u, l]) => {
            const d = await t(u).render(u, i),
              p = s.context.destination;
            !e(u) && (s !== p || !e(s)) && d.connect(r, l, c);
          }),
        )
        .reduce((a, c) => [...a, ...c], []),
    );
  },
  wp = (n, t, e) => async (s, i, r) => {
    const o = t(s);
    await Promise.all(
      Array.from(o.activeInputs).map(async ([a, c]) => {
        const l = await n(a).render(a, i);
        e(a) || l.connect(r, c);
      }),
    );
  },
  Tp = (n, t, e, s) => (i) =>
    n(In, () => In(i))
      ? Promise.resolve(n(s, s)).then((r) => {
          if (!r) {
            const o = e(i, 512, 0, 1);
            ((i.oncomplete = () => {
              ((o.onaudioprocess = null), o.disconnect());
            }),
              (o.onaudioprocess = () => i.currentTime),
              o.connect(i.destination));
          }
          return i.startRendering();
        })
      : new Promise((r) => {
          const o = t(i, {
            channelCount: 1,
            channelCountMode: "explicit",
            channelInterpretation: "discrete",
            gain: 0,
          });
          ((i.oncomplete = (a) => {
            (o.disconnect(), r(a.renderedBuffer));
          }),
            o.connect(i.destination),
            i.startRendering());
        }),
  bp = (n) => (t, e) => {
    n.set(t, e);
  },
  xp = (n) => (t, e) => n.set(t, e),
  Sp = (n, t, e, s, i, r, o, a) => (c, u) =>
    e(c)
      .render(c, u)
      .then(() => Promise.all(Array.from(s(u)).map((l) => e(l).render(l, u))))
      .then(() => i(u))
      .then(
        (l) => (
          typeof l.copyFromChannel != "function"
            ? (o(l), rr(l))
            : t(r, () => r(l)) || a(l),
          n.add(l),
          l
        ),
      ),
  Cp = {
    channelCount: 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers",
    pan: 0,
  },
  Ap = (n, t, e, s, i, r) =>
    class extends n {
      constructor(a, c) {
        const u = i(a),
          l = { ...Cp, ...c },
          h = e(u, l),
          d = r(u),
          p = d ? s() : null;
        (super(a, !1, h, p), (this._pan = t(this, d, h.pan)));
      }
      get pan() {
        return this._pan;
      }
    },
  kp = (n, t, e, s, i) => () => {
    const r = new WeakMap(),
      o = async (a, c) => {
        let u = e(a);
        const l = vt(u, c);
        if (!l) {
          const h = {
            channelCount: u.channelCount,
            channelCountMode: u.channelCountMode,
            channelInterpretation: u.channelInterpretation,
            pan: u.pan.value,
          };
          u = t(c, h);
        }
        return (
          r.set(c, u),
          l ? await n(c, a.pan, u.pan) : await s(c, a.pan, u.pan),
          pn(u) ? await i(a, c, u.inputs[0]) : await i(a, c, u),
          u
        );
      };
    return {
      render(a, c) {
        const u = r.get(c);
        return u !== void 0 ? Promise.resolve(u) : o(a, c);
      },
    };
  },
  Np = (n) => () => {
    if (n === null) return !1;
    try {
      new n({ length: 1, sampleRate: 44100 });
    } catch {
      return !1;
    }
    return !0;
  },
  Op = (n, t) => async () => {
    if (n === null) return !0;
    if (t === null) return !1;
    const e = new Blob(
        [
          'class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)',
        ],
        { type: "application/javascript; charset=utf-8" },
      ),
      s = new t(1, 128, 44100),
      i = URL.createObjectURL(e);
    let r = !1,
      o = !1;
    try {
      await s.audioWorklet.addModule(i);
      const a = new n(s, "a", { numberOfOutputs: 0 }),
        c = s.createOscillator();
      ((a.port.onmessage = () => (r = !0)),
        (a.onprocessorerror = () => (o = !0)),
        c.connect(a),
        c.start(0),
        await s.startRendering(),
        await new Promise((u) => setTimeout(u)));
    } catch {
    } finally {
      URL.revokeObjectURL(i);
    }
    return r && !o;
  },
  Ep = (n, t) => () => {
    if (t === null) return Promise.resolve(!1);
    const e = new t(1, 1, 44100),
      s = n(e, {
        channelCount: 1,
        channelCountMode: "explicit",
        channelInterpretation: "discrete",
        gain: 0,
      });
    return new Promise((i) => {
      ((e.oncomplete = () => {
        (s.disconnect(), i(e.currentTime !== 0));
      }),
        e.startRendering());
    });
  },
  Mp = () => new DOMException("", "UnknownError"),
  Ip = {
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    curve: null,
    oversample: "none",
  },
  Dp = (n, t, e, s, i, r, o) =>
    class extends n {
      constructor(c, u) {
        const l = i(c),
          h = { ...Ip, ...u },
          d = e(l, h),
          f = r(l) ? s() : null;
        (super(c, !0, d, f),
          (this._isCurveNullified = !1),
          (this._nativeWaveShaperNode = d),
          o(this, 1));
      }
      get curve() {
        return this._isCurveNullified ? null : this._nativeWaveShaperNode.curve;
      }
      set curve(c) {
        if (c === null)
          ((this._isCurveNullified = !0),
            (this._nativeWaveShaperNode.curve = new Float32Array([0, 0])));
        else {
          if (c.length < 2) throw t();
          ((this._isCurveNullified = !1),
            (this._nativeWaveShaperNode.curve = c));
        }
      }
      get oversample() {
        return this._nativeWaveShaperNode.oversample;
      }
      set oversample(c) {
        this._nativeWaveShaperNode.oversample = c;
      }
    },
  Rp = (n, t, e) => () => {
    const s = new WeakMap(),
      i = async (r, o) => {
        let a = t(r);
        if (!vt(a, o)) {
          const u = {
            channelCount: a.channelCount,
            channelCountMode: a.channelCountMode,
            channelInterpretation: a.channelInterpretation,
            curve: a.curve,
            oversample: a.oversample,
          };
          a = n(o, u);
        }
        return (
          s.set(o, a),
          pn(a) ? await e(r, o, a.inputs[0]) : await e(r, o, a),
          a
        );
      };
    return {
      render(r, o) {
        const a = s.get(o);
        return a !== void 0 ? Promise.resolve(a) : i(r, o);
      },
    };
  },
  Pp = () => (typeof window > "u" ? null : window),
  Fp = (n, t) => (e) => {
    ((e.copyFromChannel = (s, i, r = 0) => {
      const o = n(r),
        a = n(i);
      if (a >= e.numberOfChannels) throw t();
      const c = e.length,
        u = e.getChannelData(a),
        l = s.length;
      for (let h = o < 0 ? -o : 0; h + o < c && h < l; h += 1) s[h] = u[h + o];
    }),
      (e.copyToChannel = (s, i, r = 0) => {
        const o = n(r),
          a = n(i);
        if (a >= e.numberOfChannels) throw t();
        const c = e.length,
          u = e.getChannelData(a),
          l = s.length;
        for (let h = o < 0 ? -o : 0; h + o < c && h < l; h += 1)
          u[h + o] = s[h];
      }));
  },
  Vp = (n) => (t) => {
    ((t.copyFromChannel = (
      (e) =>
      (s, i, r = 0) => {
        const o = n(r),
          a = n(i);
        if (o < t.length) return e.call(t, s, a, o);
      }
    )(t.copyFromChannel)),
      (t.copyToChannel = (
        (e) =>
        (s, i, r = 0) => {
          const o = n(r),
            a = n(i);
          if (o < t.length) return e.call(t, s, a, o);
        }
      )(t.copyToChannel)));
  },
  Lp = (n) => (t, e) => {
    const s = e.createBuffer(1, 1, 44100);
    (t.buffer === null && (t.buffer = s),
      n(
        t,
        "buffer",
        (i) => () => {
          const r = i.call(t);
          return r === s ? null : r;
        },
        (i) => (r) => i.call(t, r === null ? s : r),
      ));
  },
  qp = (n, t) => (e, s) => {
    ((s.channelCount = 1),
      (s.channelCountMode = "explicit"),
      Object.defineProperty(s, "channelCount", {
        get: () => 1,
        set: () => {
          throw n();
        },
      }),
      Object.defineProperty(s, "channelCountMode", {
        get: () => "explicit",
        set: () => {
          throw n();
        },
      }));
    const i = e.createBufferSource();
    t(
      s,
      () => {
        const a = s.numberOfInputs;
        for (let c = 0; c < a; c += 1) i.connect(s, 0, c);
      },
      () => i.disconnect(s),
    );
  },
  ic = (n, t, e) =>
    n.copyFromChannel === void 0
      ? n.getChannelData(e)[0]
      : (n.copyFromChannel(t, e), t[0]),
  rc = (n) => {
    if (n === null) return !1;
    const t = n.length;
    return t % 2 !== 0
      ? n[Math.floor(t / 2)] !== 0
      : n[t / 2 - 1] + n[t / 2] !== 0;
  },
  Un = (n, t, e, s) => {
    let i = n;
    for (; !i.hasOwnProperty(t);) i = Object.getPrototypeOf(i);
    const { get: r, set: o } = Object.getOwnPropertyDescriptor(i, t);
    Object.defineProperty(n, t, { get: e(r), set: s(o) });
  },
  Wp = (n) => ({
    ...n,
    outputChannelCount:
      n.outputChannelCount !== void 0
        ? n.outputChannelCount
        : n.numberOfInputs === 1 && n.numberOfOutputs === 1
          ? [n.channelCount]
          : Array.from({ length: n.numberOfOutputs }, () => 1),
  }),
  jp = (n) => ({ ...n, channelCount: n.numberOfOutputs }),
  Bp = (n) => {
    const { imag: t, real: e } = n;
    return t === void 0
      ? e === void 0
        ? { ...n, imag: [0, 0], real: [0, 0] }
        : { ...n, imag: Array.from(e, () => 0), real: e }
      : e === void 0
        ? { ...n, imag: t, real: Array.from(t, () => 0) }
        : { ...n, imag: t, real: e };
  },
  oc = (n, t, e) => {
    try {
      n.setValueAtTime(t, e);
    } catch (s) {
      if (s.code !== 9) throw s;
      oc(n, t, e + 1e-7);
    }
  },
  Up = (n) => {
    const t = n.createBufferSource();
    t.start();
    try {
      t.start();
    } catch {
      return !0;
    }
    return !1;
  },
  $p = (n) => {
    const t = n.createBufferSource(),
      e = n.createBuffer(1, 1, 44100);
    t.buffer = e;
    try {
      t.start(0, 1);
    } catch {
      return !1;
    }
    return !0;
  },
  zp = (n) => {
    const t = n.createBufferSource();
    t.start();
    try {
      t.stop();
    } catch {
      return !1;
    }
    return !0;
  },
  lr = (n) => {
    const t = n.createOscillator();
    try {
      t.start(-1);
    } catch (e) {
      return e instanceof RangeError;
    }
    return !1;
  },
  ac = (n) => {
    const t = n.createBuffer(1, 1, 44100),
      e = n.createBufferSource();
    ((e.buffer = t), e.start(), e.stop());
    try {
      return (e.stop(), !0);
    } catch {
      return !1;
    }
  },
  hr = (n) => {
    const t = n.createOscillator();
    try {
      t.stop(-1);
    } catch (e) {
      return e instanceof RangeError;
    }
    return !1;
  },
  Gp = (n) => {
    const { port1: t, port2: e } = new MessageChannel();
    try {
      t.postMessage(n);
    } finally {
      (t.close(), e.close());
    }
  },
  Zp = (n) => {
    n.start = (
      (t) =>
      (e = 0, s = 0, i) => {
        const r = n.buffer,
          o = r === null ? s : Math.min(r.duration, s);
        r !== null && o > r.duration - 0.5 / n.context.sampleRate
          ? t.call(n, e, 0, 0)
          : t.call(n, e, o, i);
      }
    )(n.start);
  },
  cc = (n, t) => {
    const e = t.createGain();
    n.connect(e);
    const s = ((i) => () => {
      (i.call(n, e), n.removeEventListener("ended", s));
    })(n.disconnect);
    (n.addEventListener("ended", s),
      mn(n, e),
      (n.stop = ((i) => {
        let r = !1;
        return (o = 0) => {
          if (r)
            try {
              i.call(n, o);
            } catch {
              e.gain.setValueAtTime(0, o);
            }
          else (i.call(n, o), (r = !0));
        };
      })(n.stop)));
  },
  _n = (n, t) => (e) => {
    const s = { value: n };
    return (
      Object.defineProperties(e, { currentTarget: s, target: s }),
      typeof t == "function" ? t.call(n, e) : t.handleEvent.call(n, e)
    );
  },
  Hp = fh(je),
  Xp = vh(je),
  Yp = Md(Rs),
  uc = new WeakMap(),
  Kp = Xd(uc),
  $t = ad(new Map(), new WeakMap()),
  Ht = Pp(),
  lc = Af($t, Yt),
  dr = Hd(bt),
  yt = vp(bt, dr, Fe),
  Qp = Sh(lc, et, yt),
  J = Qd(Ds),
  re = Jf(Ht),
  K = _f(re),
  hc = new WeakMap(),
  dc = jd(_n),
  $n = Ef(Ht),
  fr = df($n),
  pr = ff(Ht),
  fc = pf(Ht),
  Dn = If(Ht),
  ht = Xh(
    ph(Wa),
    yh(Hp, Xp, _s, Yp, gs, bt, Kp, Vn, et, je, ee, Fe, os),
    $t,
    af(ki, gs, bt, et, Mn, ee),
    Yt,
    Ps,
    St,
    kd(_s, ki, bt, et, Mn, J, ee, K),
    Rd(hc, bt, Bt),
    dc,
    J,
    fr,
    pr,
    fc,
    K,
    Dn,
  ),
  Jp = xh(ht, Qp, Yt, lc, J, K),
  mr = new WeakSet(),
  go = kf(Ht),
  pc = wd(new Uint32Array(1)),
  _r = Fp(pc, Yt),
  gr = Vp(pc),
  mc = Ah(mr, $t, St, go, re, Np(go), _r, gr),
  Fs = wh(kt),
  _c = wp(dr, qn, Fe),
  Kt = pd(_c),
  gn = Of(Fs, $t, Up, $p, zp, lr, ac, hr, Zp, Lp(Un), cc),
  Qt = yp(Yd(qn), _c),
  tm = Oh(Kt, gn, et, Qt, yt),
  zt = Yh(mh(ja), hc, ir, Kh, ah, ch, uh, lh, hh, Si, La, $n, oc),
  em = Nh(ht, tm, zt, gt, gn, J, K, _n),
  nm = Lh(ht, qh, Yt, gt, Mf(kt, Un), J, K, yt),
  sm = od(Kt, ec, et, Qt, yt),
  Be = xp(uc),
  im = rd(ht, zt, sm, Ps, ec, J, K, Be),
  ve = Sf(je, pr),
  rm = qp(gt, ve),
  we = qf($n, rm),
  om = ld(we, et, yt),
  am = ud(ht, om, we, J, K),
  cm = fd(jn, et, yt),
  um = dd(ht, cm, jn, J, K, jp),
  lm = Bf(Fs, gn, kt, ve),
  yn = jf(Fs, $t, lm, lr, hr),
  hm = vd(Kt, yn, et, Qt, yt),
  dm = yd(ht, zt, hm, yn, J, K, _n),
  gc = Uf(St, Un),
  fm = xd(gc, et, yt),
  pm = bd(ht, fm, gc, J, K, Be),
  mm = Ed(Kt, nc, et, Qt, yt),
  _m = Od(ht, zt, mm, nc, J, K, Be),
  yc = $f(St),
  gm = Ld(Kt, yc, et, Qt, yt),
  ym = Vd(ht, zt, gm, yc, St, J, K, Be),
  vm = Gd(Kt, kt, et, Qt, yt),
  wm = zd(ht, zt, vm, kt, J, K),
  Tm = Hf(Ps, gt, Bn, St),
  Vs = Tp($t, kt, Bn, Ep(kt, re)),
  bm = of(gn, et, re, yt, Vs),
  xm = zf(Tm),
  Sm = sf(ht, xm, bm, J, K, Be),
  Cm = Wh(zt, we, yn, Bn, St, ic, K, Un),
  vc = new WeakMap(),
  Am = xf(nm, Cm, dc, K, vc, _n),
  wc = tp(Fs, $t, lr, ac, hr, cc),
  km = dp(Kt, wc, et, Qt, yt),
  Nm = hp(ht, zt, wc, km, J, K, _n),
  Tc = _d(gn),
  Om = ap(Tc, gt, kt, rc, ve),
  Ls = op(Tc, gt, Om, rc, ve, $n, Un),
  Em = np(_s, gt, we, kt, Bn, Ls, St, gs, ic, ve),
  bc = ep(Em),
  Mm = mp(Kt, we, yn, kt, bc, et, re, Qt, yt, Vs),
  Im = pp(ht, zt, bc, Mm, J, K, Be),
  Dm = sp(Yt),
  Rm = gp(Dm, J, new WeakSet(), Bp),
  Pm = rp(we, jn, kt, Ls, St, ve),
  xc = ip(Pm, St),
  Fm = kp(Kt, xc, et, Qt, yt),
  Vm = Ap(ht, zt, xc, Fm, J, K),
  Lm = Rp(Ls, et, yt),
  qm = Dp(ht, gt, Ls, Lm, J, K, Be),
  Sc = gf(Ht),
  yr = Bd(Ht),
  Cc = new WeakMap(),
  Wm = Jd(Cc, re),
  jm = Sc
    ? gh(
        $t,
        St,
        Wd(Ht),
        yr,
        Ud(dh),
        J,
        Wm,
        K,
        Dn,
        new WeakMap(),
        new WeakMap(),
        Op(Dn, re),
        Ht,
      )
    : void 0,
  Bm = mf(fr, K),
  Um = Ad(mr, $t, Cd, qd, new WeakSet(), J, Bm, ps, In, _r, gr),
  Ac = sd(
    jm,
    Jp,
    mc,
    em,
    im,
    am,
    um,
    dm,
    pm,
    Um,
    _m,
    ym,
    wm,
    Sm,
    Am,
    Nm,
    Im,
    Rm,
    Vm,
    qm,
  ),
  $m = yf(ht, Xf, J, K),
  zm = wf(ht, Yf, J, K),
  Gm = Tf(ht, Kf, J, K),
  Zm = Qf(gt, K),
  Hm = bf(ht, Zm, J),
  Xm = Vh(Ac, gt, St, Mp, $m, zm, Gm, Hm, $n),
  vr = tf(vc),
  Ym = Th(vr),
  kc = md(Yt),
  Km = Id(vr),
  Nc = Pd(Yt),
  Oc = new WeakMap(),
  Qm = Zd(Oc, Bt),
  Jm = Lf(kc, Yt, gt, we, jn, yn, kt, Bn, St, Nc, yr, Qm, ve),
  t_ = Rf(gt, Jm, kt, St, ve),
  e_ = nd(Kt, kc, gn, we, jn, yn, kt, Km, Nc, yr, et, Dn, re, Qt, yt, Vs),
  n_ = Kd(Cc),
  s_ = bp(Oc),
  yo = Sc ? Jh(Ym, ht, zt, e_, t_, bt, n_, J, K, Dn, Wp, s_, Gp, _n) : void 0,
  i_ = Sd(St, re),
  r_ = Sp(mr, $t, dr, vr, Vs, ps, _r, gr),
  o_ = up(Ac, $t, gt, i_, r_),
  a_ = cf(Ds, fr),
  c_ = uf(sr, pr),
  u_ = lf(ir, fc),
  l_ = hf(Ds, K);
function Pt(n) {
  return n === void 0;
}
function z(n) {
  return n !== void 0;
}
function h_(n) {
  return typeof n == "function";
}
function Ve(n) {
  return typeof n == "number";
}
function Re(n) {
  return (
    Object.prototype.toString.call(n) === "[object Object]" &&
    n.constructor === Object
  );
}
function d_(n) {
  return typeof n == "boolean";
}
function Wt(n) {
  return Array.isArray(n);
}
function se(n) {
  return typeof n == "string";
}
function ns(n) {
  return se(n) && /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(n);
}
function B(n, t) {
  if (!n) throw new Error(t);
}
function _e(n, t, e = 1 / 0) {
  if (!(t <= n && n <= e))
    throw new RangeError(`Value must be within [${t}, ${e}], got: ${n}`);
}
function Ec(n) {
  !n.isOffline &&
    n.state !== "running" &&
    wr(
      'The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.',
    );
}
let Mc = !1,
  vo = !1;
function wo(n) {
  Mc = n;
}
function f_(n) {
  Pt(n) &&
    Mc &&
    !vo &&
    ((vo = !0),
    wr(
      "Events scheduled inside of scheduled callbacks should use the passed in scheduling time. See https://github.com/Tonejs/Tone.js/wiki/Accurate-Timing",
    ));
}
let Ic = console;
function p_(...n) {
  Ic.log(...n);
}
function wr(...n) {
  Ic.warn(...n);
}
function m_(n) {
  return new Xm(n);
}
function __(n, t, e) {
  return new o_(n, t, e);
}
const Et = typeof self == "object" ? self : null,
  g_ =
    Et &&
    (Et.hasOwnProperty("AudioContext") ||
      Et.hasOwnProperty("webkitAudioContext"));
function y_(n, t, e) {
  return (
    B(
      z(yo),
      "AudioWorkletNode only works in a secure context (https or localhost)",
    ),
    new (n instanceof Et?.BaseAudioContext ? Et?.AudioWorkletNode : yo)(n, t, e)
  );
}
function Gt(n, t, e, s) {
  var i = arguments.length,
    r =
      i < 3 ? t : s === null ? (s = Object.getOwnPropertyDescriptor(t, e)) : s,
    o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    r = Reflect.decorate(n, t, e, s);
  else
    for (var a = n.length - 1; a >= 0; a--)
      (o = n[a]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, e, r) : o(t, e)) || r);
  return (i > 3 && r && Object.defineProperty(t, e, r), r);
}
function ft(n, t, e, s) {
  function i(r) {
    return r instanceof e
      ? r
      : new e(function (o) {
          o(r);
        });
  }
  return new (e || (e = Promise))(function (r, o) {
    function a(l) {
      try {
        u(s.next(l));
      } catch (h) {
        o(h);
      }
    }
    function c(l) {
      try {
        u(s.throw(l));
      } catch (h) {
        o(h);
      }
    }
    function u(l) {
      l.done ? r(l.value) : i(l.value).then(a, c);
    }
    u((s = s.apply(n, t || [])).next());
  });
}
class v_ {
  constructor(t, e, s, i) {
    ((this._callback = t),
      (this._type = e),
      (this._minimumUpdateInterval = Math.max(128 / (i || 44100), 0.001)),
      (this.updateInterval = s),
      this._createClock());
  }
  _createWorker() {
    const t = new Blob(
        [
          `
			// the initial timeout time
			let timeoutTime =  ${(this._updateInterval * 1e3).toFixed(1)};
			// onmessage callback
			self.onmessage = function(msg){
				timeoutTime = parseInt(msg.data);
			};
			// the tick function which posts a message
			// and schedules a new tick
			function tick(){
				setTimeout(tick, timeoutTime);
				self.postMessage('tick');
			}
			// call tick initially
			tick();
			`,
        ],
        { type: "text/javascript" },
      ),
      e = URL.createObjectURL(t),
      s = new Worker(e);
    ((s.onmessage = this._callback.bind(this)), (this._worker = s));
  }
  _createTimeout() {
    this._timeout = setTimeout(() => {
      (this._createTimeout(), this._callback());
    }, this._updateInterval * 1e3);
  }
  _createClock() {
    if (this._type === "worker")
      try {
        this._createWorker();
      } catch {
        ((this._type = "timeout"), this._createClock());
      }
    else this._type === "timeout" && this._createTimeout();
  }
  _disposeClock() {
    (this._timeout && clearTimeout(this._timeout),
      this._worker &&
        (this._worker.terminate(), (this._worker.onmessage = null)));
  }
  get updateInterval() {
    return this._updateInterval;
  }
  set updateInterval(t) {
    var e;
    ((this._updateInterval = Math.max(t, this._minimumUpdateInterval)),
      this._type === "worker" &&
        ((e = this._worker) === null ||
          e === void 0 ||
          e.postMessage(this._updateInterval * 1e3)));
  }
  get type() {
    return this._type;
  }
  set type(t) {
    (this._disposeClock(), (this._type = t), this._createClock());
  }
  dispose() {
    this._disposeClock();
  }
}
function Le(n) {
  return u_(n);
}
function fe(n) {
  return c_(n);
}
function as(n) {
  return l_(n);
}
function Ze(n) {
  return a_(n);
}
function w_(n) {
  return n instanceof mc;
}
function T_(n, t) {
  return n === "value" || Le(t) || fe(t) || w_(t);
}
function Ke(n, ...t) {
  if (!t.length) return n;
  const e = t.shift();
  if (Re(n) && Re(e))
    for (const s in e)
      T_(s, e[s])
        ? (n[s] = e[s])
        : Re(e[s])
          ? (n[s] || Object.assign(n, { [s]: {} }), Ke(n[s], e[s]))
          : Object.assign(n, { [s]: e[s] });
  return Ke(n, ...t);
}
function b_(n, t) {
  return n.length === t.length && n.every((e, s) => t[s] === e);
}
function V(n, t, e = [], s) {
  const i = {},
    r = Array.from(t);
  if (
    (Re(r[0]) &&
      s &&
      !Reflect.has(r[0], s) &&
      (Object.keys(r[0]).some((a) => Reflect.has(n, a)) ||
        (Ke(i, { [s]: r[0] }), e.splice(e.indexOf(s), 1), r.shift())),
    r.length === 1 && Re(r[0]))
  )
    Ke(i, r[0]);
  else for (let o = 0; o < e.length; o++) z(r[o]) && (i[e[o]] = r[o]);
  return Ke(n, i);
}
function x_(n) {
  return n.constructor.getDefaults();
}
function Qe(n, t) {
  return Pt(n) ? t : n;
}
function To(n, t) {
  return (
    t.forEach((e) => {
      Reflect.has(n, e) && delete n[e];
    }),
    n
  );
}
/**
 * Tone.js
 * @author Yotam Mann
 * @license http://opensource.org/licenses/MIT MIT License
 * @copyright 2014-2024 Yotam Mann
 */ class oe {
  constructor() {
    ((this.debug = !1), (this._wasDisposed = !1));
  }
  static getDefaults() {
    return {};
  }
  log(...t) {
    (this.debug || (Et && this.toString() === Et.TONE_DEBUG_CLASS)) &&
      p_(this, ...t);
  }
  dispose() {
    return ((this._wasDisposed = !0), this);
  }
  get disposed() {
    return this._wasDisposed;
  }
  toString() {
    return this.name;
  }
}
oe.version = Va;
const Tr = 1e-6;
function rn(n, t) {
  return n > t + Tr;
}
function Ii(n, t) {
  return rn(n, t) || Vt(n, t);
}
function Ts(n, t) {
  return n + Tr < t;
}
function Vt(n, t) {
  return Math.abs(n - t) < Tr;
}
function S_(n, t, e) {
  return Math.max(Math.min(n, e), t);
}
class Ft extends oe {
  constructor() {
    (super(), (this.name = "Timeline"), (this._timeline = []));
    const t = V(Ft.getDefaults(), arguments, ["memory"]);
    ((this.memory = t.memory), (this.increasing = t.increasing));
  }
  static getDefaults() {
    return { memory: 1 / 0, increasing: !1 };
  }
  get length() {
    return this._timeline.length;
  }
  add(t) {
    if (
      (B(Reflect.has(t, "time"), "Timeline: events must have a time attribute"),
      (t.time = t.time.valueOf()),
      this.increasing && this.length)
    ) {
      const e = this._timeline[this.length - 1];
      (B(
        Ii(t.time, e.time),
        "The time must be greater than or equal to the last scheduled time",
      ),
        this._timeline.push(t));
    } else {
      const e = this._search(t.time);
      this._timeline.splice(e + 1, 0, t);
    }
    if (this.length > this.memory) {
      const e = this.length - this.memory;
      this._timeline.splice(0, e);
    }
    return this;
  }
  remove(t) {
    const e = this._timeline.indexOf(t);
    return (e !== -1 && this._timeline.splice(e, 1), this);
  }
  get(t, e = "time") {
    const s = this._search(t, e);
    return s !== -1 ? this._timeline[s] : null;
  }
  peek() {
    return this._timeline[0];
  }
  shift() {
    return this._timeline.shift();
  }
  getAfter(t, e = "time") {
    const s = this._search(t, e);
    return s + 1 < this._timeline.length ? this._timeline[s + 1] : null;
  }
  getBefore(t) {
    const e = this._timeline.length;
    if (e > 0 && this._timeline[e - 1].time < t) return this._timeline[e - 1];
    const s = this._search(t);
    return s - 1 >= 0 ? this._timeline[s - 1] : null;
  }
  cancel(t) {
    if (this._timeline.length > 1) {
      let e = this._search(t);
      if (e >= 0)
        if (Vt(this._timeline[e].time, t)) {
          for (let s = e; s >= 0 && Vt(this._timeline[s].time, t); s--) e = s;
          this._timeline = this._timeline.slice(0, e);
        } else this._timeline = this._timeline.slice(0, e + 1);
      else this._timeline = [];
    } else
      this._timeline.length === 1 &&
        Ii(this._timeline[0].time, t) &&
        (this._timeline = []);
    return this;
  }
  cancelBefore(t) {
    const e = this._search(t);
    return (e >= 0 && (this._timeline = this._timeline.slice(e + 1)), this);
  }
  previousEvent(t) {
    const e = this._timeline.indexOf(t);
    return e > 0 ? this._timeline[e - 1] : null;
  }
  _search(t, e = "time") {
    if (this._timeline.length === 0) return -1;
    let s = 0;
    const i = this._timeline.length;
    let r = i;
    if (i > 0 && this._timeline[i - 1][e] <= t) return i - 1;
    for (; s < r;) {
      let o = Math.floor(s + (r - s) / 2);
      const a = this._timeline[o],
        c = this._timeline[o + 1];
      if (Vt(a[e], t)) {
        for (let u = o; u < this._timeline.length; u++) {
          const l = this._timeline[u];
          if (Vt(l[e], t)) o = u;
          else break;
        }
        return o;
      } else {
        if (Ts(a[e], t) && rn(c[e], t)) return o;
        rn(a[e], t) ? (r = o) : (s = o + 1);
      }
    }
    return -1;
  }
  _iterate(t, e = 0, s = this._timeline.length - 1) {
    this._timeline.slice(e, s + 1).forEach(t);
  }
  forEach(t) {
    return (this._iterate(t), this);
  }
  forEachBefore(t, e) {
    const s = this._search(t);
    return (s !== -1 && this._iterate(e, 0, s), this);
  }
  forEachAfter(t, e) {
    const s = this._search(t);
    return (this._iterate(e, s + 1), this);
  }
  forEachBetween(t, e, s) {
    let i = this._search(t),
      r = this._search(e);
    return (
      i !== -1 && r !== -1
        ? (this._timeline[i].time !== t && (i += 1),
          this._timeline[r].time === e && (r -= 1),
          this._iterate(s, i, r))
        : i === -1 && this._iterate(s, 0, r),
      this
    );
  }
  forEachFrom(t, e) {
    let s = this._search(t);
    for (; s >= 0 && this._timeline[s].time >= t;) s--;
    return (this._iterate(e, s + 1), this);
  }
  forEachAtTime(t, e) {
    const s = this._search(t);
    if (s !== -1 && Vt(this._timeline[s].time, t)) {
      let i = s;
      for (let r = s; r >= 0 && Vt(this._timeline[r].time, t); r--) i = r;
      this._iterate(
        (r) => {
          e(r);
        },
        i,
        s,
      );
    }
    return this;
  }
  dispose() {
    return (super.dispose(), (this._timeline = []), this);
  }
}
const Dc = [];
function qs(n) {
  Dc.push(n);
}
function C_(n) {
  Dc.forEach((t) => t(n));
}
const Rc = [];
function Ws(n) {
  Rc.push(n);
}
function A_(n) {
  Rc.forEach((t) => t(n));
}
class zn extends oe {
  constructor() {
    (super(...arguments), (this.name = "Emitter"));
  }
  on(t, e) {
    return (
      t.split(/\W+/).forEach((i) => {
        (Pt(this._events) && (this._events = {}),
          this._events.hasOwnProperty(i) || (this._events[i] = []),
          this._events[i].push(e));
      }),
      this
    );
  }
  once(t, e) {
    const s = (...i) => {
      (e(...i), this.off(t, s));
    };
    return (this.on(t, s), this);
  }
  off(t, e) {
    return (
      t.split(/\W+/).forEach((i) => {
        if (
          (Pt(this._events) && (this._events = {}),
          this._events.hasOwnProperty(i))
        )
          if (Pt(e)) this._events[i] = [];
          else {
            const r = this._events[i];
            for (let o = r.length - 1; o >= 0; o--)
              r[o] === e && r.splice(o, 1);
          }
      }),
      this
    );
  }
  emit(t, ...e) {
    if (this._events && this._events.hasOwnProperty(t)) {
      const s = this._events[t].slice(0);
      for (let i = 0, r = s.length; i < r; i++) s[i].apply(this, e);
    }
    return this;
  }
  static mixin(t) {
    ["on", "once", "off", "emit"].forEach((e) => {
      const s = Object.getOwnPropertyDescriptor(zn.prototype, e);
      Object.defineProperty(t.prototype, e, s);
    });
  }
  dispose() {
    return (super.dispose(), (this._events = void 0), this);
  }
}
class Pc extends zn {
  constructor() {
    (super(...arguments), (this.isOffline = !1));
  }
  toJSON() {
    return {};
  }
}
class Gn extends Pc {
  constructor() {
    var t, e;
    (super(),
      (this.name = "Context"),
      (this._constants = new Map()),
      (this._timeouts = new Ft()),
      (this._timeoutIds = 0),
      (this._initialized = !1),
      (this._closeStarted = !1),
      (this.isOffline = !1),
      (this._workletPromise = null));
    const s = V(Gn.getDefaults(), arguments, ["context"]);
    (s.context
      ? ((this._context = s.context),
        (this._latencyHint =
          ((t = arguments[0]) === null || t === void 0
            ? void 0
            : t.latencyHint) || ""))
      : ((this._context = m_({ latencyHint: s.latencyHint })),
        (this._latencyHint = s.latencyHint)),
      (this._ticker = new v_(
        this.emit.bind(this, "tick"),
        s.clockSource,
        s.updateInterval,
        this._context.sampleRate,
      )),
      this.on("tick", this._timeoutLoop.bind(this)),
      (this._context.onstatechange = () => {
        this.emit("statechange", this.state);
      }),
      (this[
        !((e = arguments[0]) === null || e === void 0) &&
        e.hasOwnProperty("updateInterval")
          ? "_lookAhead"
          : "lookAhead"
      ] = s.lookAhead));
  }
  static getDefaults() {
    return {
      clockSource: "worker",
      latencyHint: "interactive",
      lookAhead: 0.1,
      updateInterval: 0.05,
    };
  }
  initialize() {
    return (this._initialized || (C_(this), (this._initialized = !0)), this);
  }
  createAnalyser() {
    return this._context.createAnalyser();
  }
  createOscillator() {
    return this._context.createOscillator();
  }
  createBufferSource() {
    return this._context.createBufferSource();
  }
  createBiquadFilter() {
    return this._context.createBiquadFilter();
  }
  createBuffer(t, e, s) {
    return this._context.createBuffer(t, e, s);
  }
  createChannelMerger(t) {
    return this._context.createChannelMerger(t);
  }
  createChannelSplitter(t) {
    return this._context.createChannelSplitter(t);
  }
  createConstantSource() {
    return this._context.createConstantSource();
  }
  createConvolver() {
    return this._context.createConvolver();
  }
  createDelay(t) {
    return this._context.createDelay(t);
  }
  createDynamicsCompressor() {
    return this._context.createDynamicsCompressor();
  }
  createGain() {
    return this._context.createGain();
  }
  createIIRFilter(t, e) {
    return this._context.createIIRFilter(t, e);
  }
  createPanner() {
    return this._context.createPanner();
  }
  createPeriodicWave(t, e, s) {
    return this._context.createPeriodicWave(t, e, s);
  }
  createStereoPanner() {
    return this._context.createStereoPanner();
  }
  createWaveShaper() {
    return this._context.createWaveShaper();
  }
  createMediaStreamSource(t) {
    return (
      B(Ze(this._context), "Not available if OfflineAudioContext"),
      this._context.createMediaStreamSource(t)
    );
  }
  createMediaElementSource(t) {
    return (
      B(Ze(this._context), "Not available if OfflineAudioContext"),
      this._context.createMediaElementSource(t)
    );
  }
  createMediaStreamDestination() {
    return (
      B(Ze(this._context), "Not available if OfflineAudioContext"),
      this._context.createMediaStreamDestination()
    );
  }
  decodeAudioData(t) {
    return this._context.decodeAudioData(t);
  }
  get currentTime() {
    return this._context.currentTime;
  }
  get state() {
    return this._context.state;
  }
  get sampleRate() {
    return this._context.sampleRate;
  }
  get listener() {
    return (this.initialize(), this._listener);
  }
  set listener(t) {
    (B(!this._initialized, "The listener cannot be set after initialization."),
      (this._listener = t));
  }
  get transport() {
    return (this.initialize(), this._transport);
  }
  set transport(t) {
    (B(!this._initialized, "The transport cannot be set after initialization."),
      (this._transport = t));
  }
  get draw() {
    return (this.initialize(), this._draw);
  }
  set draw(t) {
    (B(!this._initialized, "Draw cannot be set after initialization."),
      (this._draw = t));
  }
  get destination() {
    return (this.initialize(), this._destination);
  }
  set destination(t) {
    (B(
      !this._initialized,
      "The destination cannot be set after initialization.",
    ),
      (this._destination = t));
  }
  createAudioWorkletNode(t, e) {
    return y_(this.rawContext, t, e);
  }
  addAudioWorkletModule(t) {
    return ft(this, void 0, void 0, function* () {
      (B(
        z(this.rawContext.audioWorklet),
        "AudioWorkletNode is only available in a secure context (https or localhost)",
      ),
        this._workletPromise ||
          (this._workletPromise = this.rawContext.audioWorklet.addModule(t)),
        yield this._workletPromise);
    });
  }
  workletsAreReady() {
    return ft(this, void 0, void 0, function* () {
      (yield this._workletPromise) ? this._workletPromise : Promise.resolve();
    });
  }
  get updateInterval() {
    return this._ticker.updateInterval;
  }
  set updateInterval(t) {
    this._ticker.updateInterval = t;
  }
  get clockSource() {
    return this._ticker.type;
  }
  set clockSource(t) {
    this._ticker.type = t;
  }
  get lookAhead() {
    return this._lookAhead;
  }
  set lookAhead(t) {
    ((this._lookAhead = t), (this.updateInterval = t ? t / 2 : 0.01));
  }
  get latencyHint() {
    return this._latencyHint;
  }
  get rawContext() {
    return this._context;
  }
  now() {
    return this._context.currentTime + this._lookAhead;
  }
  immediate() {
    return this._context.currentTime;
  }
  resume() {
    return Ze(this._context) ? this._context.resume() : Promise.resolve();
  }
  close() {
    return ft(this, void 0, void 0, function* () {
      (Ze(this._context) &&
        this.state !== "closed" &&
        !this._closeStarted &&
        ((this._closeStarted = !0), yield this._context.close()),
        this._initialized && A_(this));
    });
  }
  getConstant(t) {
    if (this._constants.has(t)) return this._constants.get(t);
    {
      const e = this._context.createBuffer(1, 128, this._context.sampleRate),
        s = e.getChannelData(0);
      for (let r = 0; r < s.length; r++) s[r] = t;
      const i = this._context.createBufferSource();
      return (
        (i.channelCount = 1),
        (i.channelCountMode = "explicit"),
        (i.buffer = e),
        (i.loop = !0),
        i.start(0),
        this._constants.set(t, i),
        i
      );
    }
  }
  dispose() {
    return (
      super.dispose(),
      this._ticker.dispose(),
      this._timeouts.dispose(),
      Object.keys(this._constants).map((t) => this._constants[t].disconnect()),
      this.close(),
      this
    );
  }
  _timeoutLoop() {
    const t = this.now();
    this._timeouts.forEachBefore(t, (e) => {
      (e.callback(), this._timeouts.remove(e));
    });
  }
  setTimeout(t, e) {
    this._timeoutIds++;
    const s = this.now();
    return (
      this._timeouts.add({ callback: t, id: this._timeoutIds, time: s + e }),
      this._timeoutIds
    );
  }
  clearTimeout(t) {
    return (
      this._timeouts.forEach((e) => {
        e.id === t && this._timeouts.remove(e);
      }),
      this
    );
  }
  clearInterval(t) {
    return this.clearTimeout(t);
  }
  setInterval(t, e) {
    const s = ++this._timeoutIds,
      i = () => {
        const r = this.now();
        this._timeouts.add({
          callback: () => {
            (t(), i());
          },
          id: s,
          time: r + e,
        });
      };
    return (i(), s);
  }
}
class k_ extends Pc {
  constructor() {
    (super(...arguments),
      (this.lookAhead = 0),
      (this.latencyHint = 0),
      (this.isOffline = !1));
  }
  createAnalyser() {
    return {};
  }
  createOscillator() {
    return {};
  }
  createBufferSource() {
    return {};
  }
  createBiquadFilter() {
    return {};
  }
  createBuffer(t, e, s) {
    return {};
  }
  createChannelMerger(t) {
    return {};
  }
  createChannelSplitter(t) {
    return {};
  }
  createConstantSource() {
    return {};
  }
  createConvolver() {
    return {};
  }
  createDelay(t) {
    return {};
  }
  createDynamicsCompressor() {
    return {};
  }
  createGain() {
    return {};
  }
  createIIRFilter(t, e) {
    return {};
  }
  createPanner() {
    return {};
  }
  createPeriodicWave(t, e, s) {
    return {};
  }
  createStereoPanner() {
    return {};
  }
  createWaveShaper() {
    return {};
  }
  createMediaStreamSource(t) {
    return {};
  }
  createMediaElementSource(t) {
    return {};
  }
  createMediaStreamDestination() {
    return {};
  }
  decodeAudioData(t) {
    return Promise.resolve({});
  }
  createAudioWorkletNode(t, e) {
    return {};
  }
  get rawContext() {
    return {};
  }
  addAudioWorkletModule(t) {
    return ft(this, void 0, void 0, function* () {
      return Promise.resolve();
    });
  }
  resume() {
    return Promise.resolve();
  }
  setTimeout(t, e) {
    return 0;
  }
  clearTimeout(t) {
    return this;
  }
  setInterval(t, e) {
    return 0;
  }
  clearInterval(t) {
    return this;
  }
  getConstant(t) {
    return {};
  }
  get currentTime() {
    return 0;
  }
  get state() {
    return {};
  }
  get sampleRate() {
    return 0;
  }
  get listener() {
    return {};
  }
  get transport() {
    return {};
  }
  get draw() {
    return {};
  }
  set draw(t) {}
  get destination() {
    return {};
  }
  set destination(t) {}
  now() {
    return 0;
  }
  immediate() {
    return 0;
  }
}
function Q(n, t) {
  Wt(t)
    ? t.forEach((e) => Q(n, e))
    : Object.defineProperty(n, t, { enumerable: !0, writable: !1 });
}
function Fc(n, t) {
  Wt(t)
    ? t.forEach((e) => Fc(n, e))
    : Object.defineProperty(n, t, { writable: !0 });
}
const X = () => {};
class st extends oe {
  constructor() {
    (super(), (this.name = "ToneAudioBuffer"), (this.onload = X));
    const t = V(st.getDefaults(), arguments, ["url", "onload", "onerror"]);
    ((this.reverse = t.reverse),
      (this.onload = t.onload),
      se(t.url) ? this.load(t.url).catch(t.onerror) : t.url && this.set(t.url));
  }
  static getDefaults() {
    return { onerror: X, onload: X, reverse: !1 };
  }
  get sampleRate() {
    return this._buffer ? this._buffer.sampleRate : Lt().sampleRate;
  }
  set(t) {
    return (
      t instanceof st
        ? t.loaded
          ? (this._buffer = t.get())
          : (t.onload = () => {
              (this.set(t), this.onload(this));
            })
        : (this._buffer = t),
      this._reversed && this._reverse(),
      this
    );
  }
  get() {
    return this._buffer;
  }
  load(t) {
    return ft(this, void 0, void 0, function* () {
      const e = st.load(t).then((s) => {
        (this.set(s), this.onload(this));
      });
      st.downloads.push(e);
      try {
        yield e;
      } finally {
        const s = st.downloads.indexOf(e);
        st.downloads.splice(s, 1);
      }
      return this;
    });
  }
  dispose() {
    return (super.dispose(), (this._buffer = void 0), this);
  }
  fromArray(t) {
    const e = Wt(t) && t[0].length > 0,
      s = e ? t.length : 1,
      i = e ? t[0].length : t.length,
      r = Lt(),
      o = r.createBuffer(s, i, r.sampleRate),
      a = !e && s === 1 ? [t] : t;
    for (let c = 0; c < s; c++) o.copyToChannel(a[c], c);
    return ((this._buffer = o), this);
  }
  toMono(t) {
    if (Ve(t)) this.fromArray(this.toArray(t));
    else {
      let e = new Float32Array(this.length);
      const s = this.numberOfChannels;
      for (let i = 0; i < s; i++) {
        const r = this.toArray(i);
        for (let o = 0; o < r.length; o++) e[o] += r[o];
      }
      ((e = e.map((i) => i / s)), this.fromArray(e));
    }
    return this;
  }
  toArray(t) {
    if (Ve(t)) return this.getChannelData(t);
    if (this.numberOfChannels === 1) return this.toArray(0);
    {
      const e = [];
      for (let s = 0; s < this.numberOfChannels; s++)
        e[s] = this.getChannelData(s);
      return e;
    }
  }
  getChannelData(t) {
    return this._buffer ? this._buffer.getChannelData(t) : new Float32Array(0);
  }
  slice(t, e = this.duration) {
    B(this.loaded, "Buffer is not loaded");
    const s = Math.floor(t * this.sampleRate),
      i = Math.floor(e * this.sampleRate);
    B(s < i, "The start time must be less than the end time");
    const r = i - s,
      o = Lt().createBuffer(this.numberOfChannels, r, this.sampleRate);
    for (let a = 0; a < this.numberOfChannels; a++)
      o.copyToChannel(this.getChannelData(a).subarray(s, i), a);
    return new st(o);
  }
  _reverse() {
    if (this.loaded)
      for (let t = 0; t < this.numberOfChannels; t++)
        this.getChannelData(t).reverse();
    return this;
  }
  get loaded() {
    return this.length > 0;
  }
  get duration() {
    return this._buffer ? this._buffer.duration : 0;
  }
  get length() {
    return this._buffer ? this._buffer.length : 0;
  }
  get numberOfChannels() {
    return this._buffer ? this._buffer.numberOfChannels : 0;
  }
  get reverse() {
    return this._reversed;
  }
  set reverse(t) {
    this._reversed !== t && ((this._reversed = t), this._reverse());
  }
  static fromArray(t) {
    return new st().fromArray(t);
  }
  static fromUrl(t) {
    return ft(this, void 0, void 0, function* () {
      return yield new st().load(t);
    });
  }
  static load(t) {
    return ft(this, void 0, void 0, function* () {
      const e =
          st.baseUrl === "" || st.baseUrl.endsWith("/")
            ? st.baseUrl
            : st.baseUrl + "/",
        s = yield fetch(e + t);
      if (!s.ok) throw new Error(`could not load url: ${t}`);
      const i = yield s.arrayBuffer();
      return yield Lt().decodeAudioData(i);
    });
  }
  static supportsType(t) {
    const e = t.split("."),
      s = e[e.length - 1];
    return document.createElement("audio").canPlayType("/audio/" + s) !== "";
  }
  static loaded() {
    return ft(this, void 0, void 0, function* () {
      for (yield Promise.resolve(); st.downloads.length;) yield st.downloads[0];
    });
  }
}
st.baseUrl = "";
st.downloads = [];
class br extends Gn {
  constructor() {
    (super({
      clockSource: "offline",
      context: as(arguments[0])
        ? arguments[0]
        : __(arguments[0], arguments[1] * arguments[2], arguments[2]),
      lookAhead: 0,
      updateInterval: as(arguments[0])
        ? 128 / arguments[0].sampleRate
        : 128 / arguments[2],
    }),
      (this.name = "OfflineContext"),
      (this._currentTime = 0),
      (this.isOffline = !0),
      (this._duration = as(arguments[0])
        ? arguments[0].length / arguments[0].sampleRate
        : arguments[1]));
  }
  now() {
    return this._currentTime;
  }
  get currentTime() {
    return this._currentTime;
  }
  _renderClock(t) {
    return ft(this, void 0, void 0, function* () {
      let e = 0;
      for (; this._duration - this._currentTime >= 0;) {
        (this.emit("tick"), (this._currentTime += 128 / this.sampleRate), e++);
        const s = Math.floor(this.sampleRate / 128);
        t && e % s === 0 && (yield new Promise((i) => setTimeout(i, 1)));
      }
    });
  }
  render() {
    return ft(this, arguments, void 0, function* (t = !0) {
      (yield this.workletsAreReady(), yield this._renderClock(t));
      const e = yield this._context.startRendering();
      return new st(e);
    });
  }
  close() {
    return Promise.resolve();
  }
}
const Vc = new k_();
let Oe = Vc;
function Lt() {
  return (Oe === Vc && g_ && N_(new Gn()), Oe);
}
function N_(n, t = !1) {
  (t && Oe.dispose(),
    Ze(n) ? (Oe = new Gn(n)) : as(n) ? (Oe = new br(n)) : (Oe = n));
}
function O_() {
  return Oe.resume();
}
if (Et && !Et.TONE_SILENCE_LOGGING) {
  const t = ` * Tone.js v${Va} * `;
}
function E_(n) {
  return Math.pow(10, n / 20);
}
function M_(n) {
  return 20 * (Math.log(n) / Math.LN10);
}
function bs(n) {
  return Math.pow(2, n / 12);
}
let js = 440;
function I_() {
  return js;
}
function D_(n) {
  js = n;
}
function Di(n) {
  return Math.round(Lc(n));
}
function Lc(n) {
  return 69 + 12 * Math.log2(n / js);
}
function R_(n) {
  return js * Math.pow(2, (n - 69) / 12);
}
class xr extends oe {
  constructor(t, e, s) {
    (super(),
      (this.defaultUnits = "s"),
      (this._val = e),
      (this._units = s),
      (this.context = t),
      (this._expressions = this._getExpressions()));
  }
  _getExpressions() {
    return {
      hz: {
        method: (t) => this._frequencyToUnits(parseFloat(t)),
        regexp: /^(\d+(?:\.\d+)?)hz$/i,
      },
      i: {
        method: (t) => this._ticksToUnits(parseInt(t, 10)),
        regexp: /^(\d+)i$/i,
      },
      m: {
        method: (t) =>
          this._beatsToUnits(parseInt(t, 10) * this._getTimeSignature()),
        regexp: /^(\d+)m$/i,
      },
      n: {
        method: (t, e) => {
          const s = parseInt(t, 10),
            i = e === "." ? 1.5 : 1;
          return s === 1
            ? this._beatsToUnits(this._getTimeSignature()) * i
            : this._beatsToUnits(4 / s) * i;
        },
        regexp: /^(\d+)n(\.?)$/i,
      },
      number: {
        method: (t) =>
          this._expressions[this.defaultUnits].method.call(this, t),
        regexp: /^(\d+(?:\.\d+)?)$/,
      },
      s: {
        method: (t) => this._secondsToUnits(parseFloat(t)),
        regexp: /^(\d+(?:\.\d+)?)s$/,
      },
      samples: {
        method: (t) => parseInt(t, 10) / this.context.sampleRate,
        regexp: /^(\d+)samples$/,
      },
      t: {
        method: (t) => {
          const e = parseInt(t, 10);
          return this._beatsToUnits(8 / (Math.floor(e) * 3));
        },
        regexp: /^(\d+)t$/i,
      },
      tr: {
        method: (t, e, s) => {
          let i = 0;
          return (
            t &&
              t !== "0" &&
              (i += this._beatsToUnits(
                this._getTimeSignature() * parseFloat(t),
              )),
            e && e !== "0" && (i += this._beatsToUnits(parseFloat(e))),
            s && s !== "0" && (i += this._beatsToUnits(parseFloat(s) / 4)),
            i
          );
        },
        regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/,
      },
    };
  }
  valueOf() {
    if ((this._val instanceof xr && this.fromType(this._val), Pt(this._val)))
      return this._noArg();
    if (se(this._val) && Pt(this._units)) {
      for (const t in this._expressions)
        if (this._expressions[t].regexp.test(this._val.trim())) {
          this._units = t;
          break;
        }
    } else if (Re(this._val)) {
      let t = 0;
      for (const e in this._val)
        if (z(this._val[e])) {
          const s = this._val[e],
            i = new this.constructor(this.context, e).valueOf() * s;
          t += i;
        }
      return t;
    }
    if (z(this._units)) {
      const t = this._expressions[this._units],
        e = this._val.toString().trim().match(t.regexp);
      return e
        ? t.method.apply(this, e.slice(1))
        : t.method.call(this, this._val);
    } else return se(this._val) ? parseFloat(this._val) : this._val;
  }
  _frequencyToUnits(t) {
    return 1 / t;
  }
  _beatsToUnits(t) {
    return (60 / this._getBpm()) * t;
  }
  _secondsToUnits(t) {
    return t;
  }
  _ticksToUnits(t) {
    return (t * this._beatsToUnits(1)) / this._getPPQ();
  }
  _noArg() {
    return this._now();
  }
  _getBpm() {
    return this.context.transport.bpm.value;
  }
  _getTimeSignature() {
    return this.context.transport.timeSignature;
  }
  _getPPQ() {
    return this.context.transport.PPQ;
  }
  fromType(t) {
    switch (((this._units = void 0), this.defaultUnits)) {
      case "s":
        this._val = t.toSeconds();
        break;
      case "i":
        this._val = t.toTicks();
        break;
      case "hz":
        this._val = t.toFrequency();
        break;
      case "midi":
        this._val = t.toMidi();
        break;
    }
    return this;
  }
  toFrequency() {
    return 1 / this.toSeconds();
  }
  toSamples() {
    return this.toSeconds() * this.context.sampleRate;
  }
  toMilliseconds() {
    return this.toSeconds() * 1e3;
  }
}
class qt extends xr {
  constructor() {
    (super(...arguments), (this.name = "TimeClass"));
  }
  _getExpressions() {
    return Object.assign(super._getExpressions(), {
      now: {
        method: (t) =>
          this._now() + new this.constructor(this.context, t).valueOf(),
        regexp: /^\+(.+)/,
      },
      quantize: {
        method: (t) => {
          const e = new qt(this.context, t).valueOf();
          return this._secondsToUnits(
            this.context.transport.nextSubdivision(e),
          );
        },
        regexp: /^@(.+)/,
      },
    });
  }
  quantize(t, e = 1) {
    const s = new this.constructor(this.context, t).valueOf(),
      i = this.valueOf(),
      a = Math.round(i / s) * s - i;
    return i + a * e;
  }
  toNotation() {
    const t = this.toSeconds(),
      e = ["1m"];
    for (let r = 1; r < 9; r++) {
      const o = Math.pow(2, r);
      (e.push(o + "n."), e.push(o + "n"), e.push(o + "t"));
    }
    e.push("0");
    let s = e[0],
      i = new qt(this.context, e[0]).toSeconds();
    return (
      e.forEach((r) => {
        const o = new qt(this.context, r).toSeconds();
        Math.abs(o - t) < Math.abs(i - t) && ((s = r), (i = o));
      }),
      s
    );
  }
  toBarsBeatsSixteenths() {
    const t = this._beatsToUnits(1);
    let e = this.valueOf() / t;
    e = parseFloat(e.toFixed(4));
    const s = Math.floor(e / this._getTimeSignature());
    let i = (e % 1) * 4;
    e = Math.floor(e) % this._getTimeSignature();
    const r = i.toString();
    return (
      r.length > 3 && (i = parseFloat(parseFloat(r).toFixed(3))),
      [s, e, i].join(":")
    );
  }
  toTicks() {
    const t = this._beatsToUnits(1);
    return (this.valueOf() / t) * this._getPPQ();
  }
  toSeconds() {
    return this.valueOf();
  }
  toMidi() {
    return Di(this.toFrequency());
  }
  _now() {
    return this.context.now();
  }
}
class Rt extends qt {
  constructor() {
    (super(...arguments),
      (this.name = "Frequency"),
      (this.defaultUnits = "hz"));
  }
  static get A4() {
    return I_();
  }
  static set A4(t) {
    D_(t);
  }
  _getExpressions() {
    return Object.assign({}, super._getExpressions(), {
      midi: {
        regexp: /^(\d+(?:\.\d+)?midi)/,
        method(t) {
          return this.defaultUnits === "midi" ? t : Rt.mtof(t);
        },
      },
      note: {
        regexp: /^([a-g]{1}(?:b|#|##|x|bb|###|#x|x#|bbb)?)(-?[0-9]+)/i,
        method(t, e) {
          const i = P_[t.toLowerCase()] + (parseInt(e, 10) + 1) * 12;
          return this.defaultUnits === "midi" ? i : Rt.mtof(i);
        },
      },
      tr: {
        regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,
        method(t, e, s) {
          let i = 1;
          return (
            t &&
              t !== "0" &&
              (i *= this._beatsToUnits(
                this._getTimeSignature() * parseFloat(t),
              )),
            e && e !== "0" && (i *= this._beatsToUnits(parseFloat(e))),
            s && s !== "0" && (i *= this._beatsToUnits(parseFloat(s) / 4)),
            i
          );
        },
      },
    });
  }
  transpose(t) {
    return new Rt(this.context, this.valueOf() * bs(t));
  }
  harmonize(t) {
    return t.map((e) => this.transpose(e));
  }
  toMidi() {
    return Di(this.valueOf());
  }
  toNote() {
    const t = this.toFrequency(),
      e = Math.log2(t / Rt.A4);
    let s = Math.round(12 * e) + 57;
    const i = Math.floor(s / 12);
    return (i < 0 && (s += -12 * i), F_[s % 12] + i.toString());
  }
  toSeconds() {
    return 1 / super.toSeconds();
  }
  toTicks() {
    const t = this._beatsToUnits(1),
      e = this.valueOf() / t;
    return Math.floor(e * this._getPPQ());
  }
  _noArg() {
    return 0;
  }
  _frequencyToUnits(t) {
    return t;
  }
  _ticksToUnits(t) {
    return 1 / ((t * 60) / (this._getBpm() * this._getPPQ()));
  }
  _beatsToUnits(t) {
    return 1 / super._beatsToUnits(t);
  }
  _secondsToUnits(t) {
    return 1 / t;
  }
  static mtof(t) {
    return R_(t);
  }
  static ftom(t) {
    return Di(t);
  }
}
const P_ = {
    cbbb: -3,
    cbb: -2,
    cb: -1,
    c: 0,
    "c#": 1,
    cx: 2,
    "c##": 2,
    "c###": 3,
    "cx#": 3,
    "c#x": 3,
    dbbb: -1,
    dbb: 0,
    db: 1,
    d: 2,
    "d#": 3,
    dx: 4,
    "d##": 4,
    "d###": 5,
    "dx#": 5,
    "d#x": 5,
    ebbb: 1,
    ebb: 2,
    eb: 3,
    e: 4,
    "e#": 5,
    ex: 6,
    "e##": 6,
    "e###": 7,
    "ex#": 7,
    "e#x": 7,
    fbbb: 2,
    fbb: 3,
    fb: 4,
    f: 5,
    "f#": 6,
    fx: 7,
    "f##": 7,
    "f###": 8,
    "fx#": 8,
    "f#x": 8,
    gbbb: 4,
    gbb: 5,
    gb: 6,
    g: 7,
    "g#": 8,
    gx: 9,
    "g##": 9,
    "g###": 10,
    "gx#": 10,
    "g#x": 10,
    abbb: 6,
    abb: 7,
    ab: 8,
    a: 9,
    "a#": 10,
    ax: 11,
    "a##": 11,
    "a###": 12,
    "ax#": 12,
    "a#x": 12,
    bbbb: 8,
    bbb: 9,
    bb: 10,
    b: 11,
    "b#": 12,
    bx: 13,
    "b##": 13,
    "b###": 14,
    "bx#": 14,
    "b#x": 14,
  },
  F_ = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
class Nn extends qt {
  constructor() {
    (super(...arguments), (this.name = "TransportTime"));
  }
  _now() {
    return this.context.transport.seconds;
  }
}
class At extends oe {
  constructor() {
    super();
    const t = V(At.getDefaults(), arguments, ["context"]);
    this.defaultContext
      ? (this.context = this.defaultContext)
      : (this.context = t.context);
  }
  static getDefaults() {
    return { context: Lt() };
  }
  now() {
    return this.context.currentTime + this.context.lookAhead;
  }
  immediate() {
    return this.context.currentTime;
  }
  get sampleTime() {
    return 1 / this.context.sampleRate;
  }
  get blockTime() {
    return 128 / this.context.sampleRate;
  }
  toSeconds(t) {
    return (f_(t), new qt(this.context, t).toSeconds());
  }
  toFrequency(t) {
    return new Rt(this.context, t).toFrequency();
  }
  toTicks(t) {
    return new Nn(this.context, t).toTicks();
  }
  _getPartialProperties(t) {
    const e = this.get();
    return (
      Object.keys(e).forEach((s) => {
        Pt(t[s]) && delete e[s];
      }),
      e
    );
  }
  get() {
    const t = x_(this);
    return (
      Object.keys(t).forEach((e) => {
        if (Reflect.has(this, e)) {
          const s = this[e];
          z(s) && z(s.value) && z(s.setValueAtTime)
            ? (t[e] = s.value)
            : s instanceof At
              ? (t[e] = s._getPartialProperties(t[e]))
              : Wt(s) || Ve(s) || se(s) || d_(s)
                ? (t[e] = s)
                : delete t[e];
        }
      }),
      t
    );
  }
  set(t) {
    return (
      Object.keys(t).forEach((e) => {
        Reflect.has(this, e) &&
          z(this[e]) &&
          (this[e] && z(this[e].value) && z(this[e].setValueAtTime)
            ? this[e].value !== t[e] && (this[e].value = t[e])
            : this[e] instanceof At
              ? this[e].set(t[e])
              : (this[e] = t[e]));
      }),
      this
    );
  }
}
class Sr extends Ft {
  constructor(t = "stopped") {
    (super(),
      (this.name = "StateTimeline"),
      (this._initial = t),
      this.setStateAtTime(this._initial, 0));
  }
  getValueAtTime(t) {
    const e = this.get(t);
    return e !== null ? e.state : this._initial;
  }
  setStateAtTime(t, e, s) {
    return (
      _e(e, 0),
      this.add(Object.assign({}, s, { state: t, time: e })),
      this
    );
  }
  getLastState(t, e) {
    const s = this._search(e);
    for (let i = s; i >= 0; i--) {
      const r = this._timeline[i];
      if (r.state === t) return r;
    }
  }
  getNextState(t, e) {
    const s = this._search(e);
    if (s !== -1)
      for (let i = s; i < this._timeline.length; i++) {
        const r = this._timeline[i];
        if (r.state === t) return r;
      }
  }
}
class Z extends At {
  constructor() {
    const t = V(Z.getDefaults(), arguments, ["param", "units", "convert"]);
    for (
      super(t),
        this.name = "Param",
        this.overridden = !1,
        this._minOutput = 1e-7,
        B(
          z(t.param) && (Le(t.param) || t.param instanceof Z),
          "param must be an AudioParam",
        );
      !Le(t.param);
    )
      t.param = t.param._param;
    ((this._swappable = z(t.swappable) ? t.swappable : !1),
      this._swappable
        ? ((this.input = this.context.createGain()),
          (this._param = t.param),
          this.input.connect(this._param))
        : (this._param = this.input = t.param),
      (this._events = new Ft(1e3)),
      (this._initialValue = this._param.defaultValue),
      (this.units = t.units),
      (this.convert = t.convert),
      (this._minValue = t.minValue),
      (this._maxValue = t.maxValue),
      z(t.value) &&
        t.value !== this._toType(this._initialValue) &&
        this.setValueAtTime(t.value, 0));
  }
  static getDefaults() {
    return Object.assign(At.getDefaults(), { convert: !0, units: "number" });
  }
  get value() {
    const t = this.now();
    return this.getValueAtTime(t);
  }
  set value(t) {
    (this.cancelScheduledValues(this.now()),
      this.setValueAtTime(t, this.now()));
  }
  get minValue() {
    return z(this._minValue)
      ? this._minValue
      : this.units === "time" ||
          this.units === "frequency" ||
          this.units === "normalRange" ||
          this.units === "positive" ||
          this.units === "transportTime" ||
          this.units === "ticks" ||
          this.units === "bpm" ||
          this.units === "hertz" ||
          this.units === "samples"
        ? 0
        : this.units === "audioRange"
          ? -1
          : this.units === "decibels"
            ? -1 / 0
            : this._param.minValue;
  }
  get maxValue() {
    return z(this._maxValue)
      ? this._maxValue
      : this.units === "normalRange" || this.units === "audioRange"
        ? 1
        : this._param.maxValue;
  }
  _is(t, e) {
    return this.units === e;
  }
  _assertRange(t) {
    return (
      z(this.maxValue) &&
        z(this.minValue) &&
        _e(t, this._fromType(this.minValue), this._fromType(this.maxValue)),
      t
    );
  }
  _fromType(t) {
    return this.convert && !this.overridden
      ? this._is(t, "time")
        ? this.toSeconds(t)
        : this._is(t, "decibels")
          ? E_(t)
          : this._is(t, "frequency")
            ? this.toFrequency(t)
            : t
      : this.overridden
        ? 0
        : t;
  }
  _toType(t) {
    return this.convert && this.units === "decibels" ? M_(t) : t;
  }
  setValueAtTime(t, e) {
    const s = this.toSeconds(e),
      i = this._fromType(t);
    return (
      B(
        isFinite(i) && isFinite(s),
        `Invalid argument(s) to setValueAtTime: ${JSON.stringify(
          t,
        )}, ${JSON.stringify(e)}`,
      ),
      this._assertRange(i),
      this.log(this.units, "setValueAtTime", t, s),
      this._events.add({ time: s, type: "setValueAtTime", value: i }),
      this._param.setValueAtTime(i, s),
      this
    );
  }
  getValueAtTime(t) {
    const e = Math.max(this.toSeconds(t), 0),
      s = this._events.getAfter(e),
      i = this._events.get(e);
    let r = this._initialValue;
    if (i === null) r = this._initialValue;
    else if (
      i.type === "setTargetAtTime" &&
      (s === null || s.type === "setValueAtTime")
    ) {
      const o = this._events.getBefore(i.time);
      let a;
      (o === null ? (a = this._initialValue) : (a = o.value),
        i.type === "setTargetAtTime" &&
          (r = this._exponentialApproach(i.time, a, i.value, i.constant, e)));
    } else if (s === null) r = i.value;
    else if (
      s.type === "linearRampToValueAtTime" ||
      s.type === "exponentialRampToValueAtTime"
    ) {
      let o = i.value;
      if (i.type === "setTargetAtTime") {
        const a = this._events.getBefore(i.time);
        a === null ? (o = this._initialValue) : (o = a.value);
      }
      s.type === "linearRampToValueAtTime"
        ? (r = this._linearInterpolate(i.time, o, s.time, s.value, e))
        : (r = this._exponentialInterpolate(i.time, o, s.time, s.value, e));
    } else r = i.value;
    return this._toType(r);
  }
  setRampPoint(t) {
    t = this.toSeconds(t);
    let e = this.getValueAtTime(t);
    return (
      this.cancelAndHoldAtTime(t),
      this._fromType(e) === 0 && (e = this._toType(this._minOutput)),
      this.setValueAtTime(e, t),
      this
    );
  }
  linearRampToValueAtTime(t, e) {
    const s = this._fromType(t),
      i = this.toSeconds(e);
    return (
      B(
        isFinite(s) && isFinite(i),
        `Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(
          t,
        )}, ${JSON.stringify(e)}`,
      ),
      this._assertRange(s),
      this._events.add({ time: i, type: "linearRampToValueAtTime", value: s }),
      this.log(this.units, "linearRampToValueAtTime", t, i),
      this._param.linearRampToValueAtTime(s, i),
      this
    );
  }
  exponentialRampToValueAtTime(t, e) {
    let s = this._fromType(t);
    ((s = Vt(s, 0) ? this._minOutput : s), this._assertRange(s));
    const i = this.toSeconds(e);
    return (
      B(
        isFinite(s) && isFinite(i),
        `Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(
          t,
        )}, ${JSON.stringify(e)}`,
      ),
      this._events.add({
        time: i,
        type: "exponentialRampToValueAtTime",
        value: s,
      }),
      this.log(this.units, "exponentialRampToValueAtTime", t, i),
      this._param.exponentialRampToValueAtTime(s, i),
      this
    );
  }
  exponentialRampTo(t, e, s) {
    return (
      (s = this.toSeconds(s)),
      this.setRampPoint(s),
      this.exponentialRampToValueAtTime(t, s + this.toSeconds(e)),
      this
    );
  }
  linearRampTo(t, e, s) {
    return (
      (s = this.toSeconds(s)),
      this.setRampPoint(s),
      this.linearRampToValueAtTime(t, s + this.toSeconds(e)),
      this
    );
  }
  targetRampTo(t, e, s) {
    return (
      (s = this.toSeconds(s)),
      this.setRampPoint(s),
      this.exponentialApproachValueAtTime(t, s, e),
      this
    );
  }
  exponentialApproachValueAtTime(t, e, s) {
    ((e = this.toSeconds(e)), (s = this.toSeconds(s)));
    const i = Math.log(s + 1) / Math.log(200);
    return (
      this.setTargetAtTime(t, e, i),
      this.cancelAndHoldAtTime(e + s * 0.9),
      this.linearRampToValueAtTime(t, e + s),
      this
    );
  }
  setTargetAtTime(t, e, s) {
    const i = this._fromType(t);
    B(isFinite(s) && s > 0, "timeConstant must be a number greater than 0");
    const r = this.toSeconds(e);
    return (
      this._assertRange(i),
      B(
        isFinite(i) && isFinite(r),
        `Invalid argument(s) to setTargetAtTime: ${JSON.stringify(
          t,
        )}, ${JSON.stringify(e)}`,
      ),
      this._events.add({
        constant: s,
        time: r,
        type: "setTargetAtTime",
        value: i,
      }),
      this.log(this.units, "setTargetAtTime", t, r, s),
      this._param.setTargetAtTime(i, r, s),
      this
    );
  }
  setValueCurveAtTime(t, e, s, i = 1) {
    ((s = this.toSeconds(s)), (e = this.toSeconds(e)));
    const r = this._fromType(t[0]) * i;
    this.setValueAtTime(this._toType(r), e);
    const o = s / (t.length - 1);
    for (let a = 1; a < t.length; a++) {
      const c = this._fromType(t[a]) * i;
      this.linearRampToValueAtTime(this._toType(c), e + a * o);
    }
    return this;
  }
  cancelScheduledValues(t) {
    const e = this.toSeconds(t);
    return (
      B(
        isFinite(e),
        `Invalid argument to cancelScheduledValues: ${JSON.stringify(t)}`,
      ),
      this._events.cancel(e),
      this._param.cancelScheduledValues(e),
      this.log(this.units, "cancelScheduledValues", e),
      this
    );
  }
  cancelAndHoldAtTime(t) {
    const e = this.toSeconds(t),
      s = this._fromType(this.getValueAtTime(e));
    (B(
      isFinite(e),
      `Invalid argument to cancelAndHoldAtTime: ${JSON.stringify(t)}`,
    ),
      this.log(this.units, "cancelAndHoldAtTime", e, "value=" + s));
    const i = this._events.get(e),
      r = this._events.getAfter(e);
    return (
      i && Vt(i.time, e)
        ? r
          ? (this._param.cancelScheduledValues(r.time),
            this._events.cancel(r.time))
          : (this._param.cancelAndHoldAtTime(e),
            this._events.cancel(e + this.sampleTime))
        : r &&
          (this._param.cancelScheduledValues(r.time),
          this._events.cancel(r.time),
          r.type === "linearRampToValueAtTime"
            ? this.linearRampToValueAtTime(this._toType(s), e)
            : r.type === "exponentialRampToValueAtTime" &&
              this.exponentialRampToValueAtTime(this._toType(s), e)),
      this._events.add({ time: e, type: "setValueAtTime", value: s }),
      this._param.setValueAtTime(s, e),
      this
    );
  }
  rampTo(t, e = 0.1, s) {
    return (
      this.units === "frequency" ||
      this.units === "bpm" ||
      this.units === "decibels"
        ? this.exponentialRampTo(t, e, s)
        : this.linearRampTo(t, e, s),
      this
    );
  }
  apply(t) {
    const e = this.context.currentTime;
    t.setValueAtTime(this.getValueAtTime(e), e);
    const s = this._events.get(e);
    if (s && s.type === "setTargetAtTime") {
      const i = this._events.getAfter(s.time),
        r = i ? i.time : e + 2,
        o = (r - e) / 10;
      for (let a = e; a < r; a += o)
        t.linearRampToValueAtTime(this.getValueAtTime(a), a);
    }
    return (
      this._events.forEachAfter(this.context.currentTime, (i) => {
        i.type === "cancelScheduledValues"
          ? t.cancelScheduledValues(i.time)
          : i.type === "setTargetAtTime"
            ? t.setTargetAtTime(i.value, i.time, i.constant)
            : t[i.type](i.value, i.time);
      }),
      this
    );
  }
  setParam(t) {
    B(
      this._swappable,
      "The Param must be assigned as 'swappable' in the constructor",
    );
    const e = this.input;
    return (
      e.disconnect(this._param),
      this.apply(t),
      (this._param = t),
      e.connect(this._param),
      this
    );
  }
  dispose() {
    return (super.dispose(), this._events.dispose(), this);
  }
  get defaultValue() {
    return this._toType(this._param.defaultValue);
  }
  _exponentialApproach(t, e, s, i, r) {
    return s + (e - s) * Math.exp(-(r - t) / i);
  }
  _linearInterpolate(t, e, s, i, r) {
    return e + (i - e) * ((r - t) / (s - t));
  }
  _exponentialInterpolate(t, e, s, i, r) {
    return e * Math.pow(i / e, (r - t) / (s - t));
  }
}
class W extends At {
  constructor() {
    (super(...arguments), (this._internalChannels = []));
  }
  get numberOfInputs() {
    return z(this.input)
      ? Le(this.input) || this.input instanceof Z
        ? 1
        : this.input.numberOfInputs
      : 0;
  }
  get numberOfOutputs() {
    return z(this.output) ? this.output.numberOfOutputs : 0;
  }
  _isAudioNode(t) {
    return z(t) && (t instanceof W || fe(t));
  }
  _getInternalNodes() {
    const t = this._internalChannels.slice(0);
    return (
      this._isAudioNode(this.input) && t.push(this.input),
      this._isAudioNode(this.output) &&
        this.input !== this.output &&
        t.push(this.output),
      t
    );
  }
  _setChannelProperties(t) {
    this._getInternalNodes().forEach((s) => {
      ((s.channelCount = t.channelCount),
        (s.channelCountMode = t.channelCountMode),
        (s.channelInterpretation = t.channelInterpretation));
    });
  }
  _getChannelProperties() {
    const t = this._getInternalNodes();
    B(t.length > 0, "ToneAudioNode does not have any internal nodes");
    const e = t[0];
    return {
      channelCount: e.channelCount,
      channelCountMode: e.channelCountMode,
      channelInterpretation: e.channelInterpretation,
    };
  }
  get channelCount() {
    return this._getChannelProperties().channelCount;
  }
  set channelCount(t) {
    const e = this._getChannelProperties();
    this._setChannelProperties(Object.assign(e, { channelCount: t }));
  }
  get channelCountMode() {
    return this._getChannelProperties().channelCountMode;
  }
  set channelCountMode(t) {
    const e = this._getChannelProperties();
    this._setChannelProperties(Object.assign(e, { channelCountMode: t }));
  }
  get channelInterpretation() {
    return this._getChannelProperties().channelInterpretation;
  }
  set channelInterpretation(t) {
    const e = this._getChannelProperties();
    this._setChannelProperties(Object.assign(e, { channelInterpretation: t }));
  }
  connect(t, e = 0, s = 0) {
    return (ie(this, t, e, s), this);
  }
  toDestination() {
    return (this.connect(this.context.destination), this);
  }
  toMaster() {
    return (
      wr("toMaster() has been renamed toDestination()"),
      this.toDestination()
    );
  }
  disconnect(t, e = 0, s = 0) {
    return (qc(this, t, e, s), this);
  }
  chain(...t) {
    return (xs(this, ...t), this);
  }
  fan(...t) {
    return (t.forEach((e) => this.connect(e)), this);
  }
  dispose() {
    return (
      super.dispose(),
      z(this.input) &&
        (this.input instanceof W
          ? this.input.dispose()
          : fe(this.input) && this.input.disconnect()),
      z(this.output) &&
        (this.output instanceof W
          ? this.output.dispose()
          : fe(this.output) && this.output.disconnect()),
      (this._internalChannels = []),
      this
    );
  }
}
function xs(...n) {
  const t = n.shift();
  n.reduce((e, s) => (e instanceof W ? e.connect(s) : fe(e) && ie(e, s), s), t);
}
function ie(n, t, e = 0, s = 0) {
  for (
    B(z(n), "Cannot connect from undefined node"),
      B(z(t), "Cannot connect to undefined node"),
      (t instanceof W || fe(t)) &&
        B(t.numberOfInputs > 0, "Cannot connect to node with no inputs"),
      B(n.numberOfOutputs > 0, "Cannot connect from node with no outputs");
    t instanceof W || t instanceof Z;
  )
    z(t.input) && (t = t.input);
  for (; n instanceof W;) z(n.output) && (n = n.output);
  Le(t) ? n.connect(t, e) : n.connect(t, e, s);
}
function qc(n, t, e = 0, s = 0) {
  if (z(t)) for (; t instanceof W;) t = t.input;
  for (; !fe(n);) z(n.output) && (n = n.output);
  Le(t) ? n.disconnect(t, e) : fe(t) ? n.disconnect(t, e, s) : n.disconnect();
}
class Y extends W {
  constructor() {
    const t = V(Y.getDefaults(), arguments, ["gain", "units"]);
    (super(t),
      (this.name = "Gain"),
      (this._gainNode = this.context.createGain()),
      (this.input = this._gainNode),
      (this.output = this._gainNode),
      (this.gain = new Z({
        context: this.context,
        convert: t.convert,
        param: this._gainNode.gain,
        units: t.units,
        value: t.gain,
        minValue: t.minValue,
        maxValue: t.maxValue,
      })),
      Q(this, "gain"));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), {
      convert: !0,
      gain: 1,
      units: "gain",
    });
  }
  dispose() {
    return (
      super.dispose(),
      this._gainNode.disconnect(),
      this.gain.dispose(),
      this
    );
  }
}
class on extends W {
  constructor(t) {
    (super(t),
      (this.onended = X),
      (this._startTime = -1),
      (this._stopTime = -1),
      (this._timeout = -1),
      (this.output = new Y({ context: this.context, gain: 0 })),
      (this._gainNode = this.output),
      (this.getStateAtTime = function (e) {
        const s = this.toSeconds(e);
        return this._startTime !== -1 &&
          s >= this._startTime &&
          (this._stopTime === -1 || s <= this._stopTime)
          ? "started"
          : "stopped";
      }),
      (this._fadeIn = t.fadeIn),
      (this._fadeOut = t.fadeOut),
      (this._curve = t.curve),
      (this.onended = t.onended));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), {
      curve: "linear",
      fadeIn: 0,
      fadeOut: 0,
      onended: X,
    });
  }
  _startGain(t, e = 1) {
    B(this._startTime === -1, "Source cannot be started more than once");
    const s = this.toSeconds(this._fadeIn);
    return (
      (this._startTime = t + s),
      (this._startTime = Math.max(this._startTime, this.context.currentTime)),
      s > 0
        ? (this._gainNode.gain.setValueAtTime(0, t),
          this._curve === "linear"
            ? this._gainNode.gain.linearRampToValueAtTime(e, t + s)
            : this._gainNode.gain.exponentialApproachValueAtTime(e, t, s))
        : this._gainNode.gain.setValueAtTime(e, t),
      this
    );
  }
  stop(t) {
    return (this.log("stop", t), this._stopGain(this.toSeconds(t)), this);
  }
  _stopGain(t) {
    (B(this._startTime !== -1, "'start' must be called before 'stop'"),
      this.cancelStop());
    const e = this.toSeconds(this._fadeOut);
    return (
      (this._stopTime = this.toSeconds(t) + e),
      (this._stopTime = Math.max(this._stopTime, this.now())),
      e > 0
        ? this._curve === "linear"
          ? this._gainNode.gain.linearRampTo(0, e, t)
          : this._gainNode.gain.targetRampTo(0, e, t)
        : (this._gainNode.gain.cancelAndHoldAtTime(t),
          this._gainNode.gain.setValueAtTime(0, t)),
      this.context.clearTimeout(this._timeout),
      (this._timeout = this.context.setTimeout(() => {
        const s = this._curve === "exponential" ? e * 2 : 0;
        (this._stopSource(this.now() + s), this._onended());
      }, this._stopTime - this.context.currentTime)),
      this
    );
  }
  _onended() {
    if (
      this.onended !== X &&
      (this.onended(this), (this.onended = X), !this.context.isOffline)
    ) {
      const t = () => this.dispose();
      typeof requestIdleCallback < "u"
        ? requestIdleCallback(t)
        : setTimeout(t, 10);
    }
  }
  get state() {
    return this.getStateAtTime(this.now());
  }
  cancelStop() {
    return (
      this.log("cancelStop"),
      B(this._startTime !== -1, "Source is not started"),
      this._gainNode.gain.cancelScheduledValues(
        this._startTime + this.sampleTime,
      ),
      this.context.clearTimeout(this._timeout),
      (this._stopTime = -1),
      this
    );
  }
  dispose() {
    return (
      super.dispose(),
      this._gainNode.dispose(),
      (this.onended = X),
      this
    );
  }
}
class Cr extends on {
  constructor() {
    const t = V(Cr.getDefaults(), arguments, ["offset"]);
    (super(t),
      (this.name = "ToneConstantSource"),
      (this._source = this.context.createConstantSource()),
      ie(this._source, this._gainNode),
      (this.offset = new Z({
        context: this.context,
        convert: t.convert,
        param: this._source.offset,
        units: t.units,
        value: t.offset,
        minValue: t.minValue,
        maxValue: t.maxValue,
      })));
  }
  static getDefaults() {
    return Object.assign(on.getDefaults(), {
      convert: !0,
      offset: 1,
      units: "number",
    });
  }
  start(t) {
    const e = this.toSeconds(t);
    return (
      this.log("start", e),
      this._startGain(e),
      this._source.start(e),
      this
    );
  }
  _stopSource(t) {
    this._source.stop(t);
  }
  dispose() {
    return (
      super.dispose(),
      this.state === "started" && this.stop(),
      this._source.disconnect(),
      this.offset.dispose(),
      this
    );
  }
}
class rt extends W {
  constructor() {
    const t = V(rt.getDefaults(), arguments, ["value", "units"]);
    (super(t),
      (this.name = "Signal"),
      (this.override = !0),
      (this.output = this._constantSource =
        new Cr({
          context: this.context,
          convert: t.convert,
          offset: t.value,
          units: t.units,
          minValue: t.minValue,
          maxValue: t.maxValue,
        })),
      this._constantSource.start(0),
      (this.input = this._param = this._constantSource.offset));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), {
      convert: !0,
      units: "number",
      value: 0,
    });
  }
  connect(t, e = 0, s = 0) {
    return (Bs(this, t, e, s), this);
  }
  dispose() {
    return (
      super.dispose(),
      this._param.dispose(),
      this._constantSource.dispose(),
      this
    );
  }
  setValueAtTime(t, e) {
    return (this._param.setValueAtTime(t, e), this);
  }
  getValueAtTime(t) {
    return this._param.getValueAtTime(t);
  }
  setRampPoint(t) {
    return (this._param.setRampPoint(t), this);
  }
  linearRampToValueAtTime(t, e) {
    return (this._param.linearRampToValueAtTime(t, e), this);
  }
  exponentialRampToValueAtTime(t, e) {
    return (this._param.exponentialRampToValueAtTime(t, e), this);
  }
  exponentialRampTo(t, e, s) {
    return (this._param.exponentialRampTo(t, e, s), this);
  }
  linearRampTo(t, e, s) {
    return (this._param.linearRampTo(t, e, s), this);
  }
  targetRampTo(t, e, s) {
    return (this._param.targetRampTo(t, e, s), this);
  }
  exponentialApproachValueAtTime(t, e, s) {
    return (this._param.exponentialApproachValueAtTime(t, e, s), this);
  }
  setTargetAtTime(t, e, s) {
    return (this._param.setTargetAtTime(t, e, s), this);
  }
  setValueCurveAtTime(t, e, s, i) {
    return (this._param.setValueCurveAtTime(t, e, s, i), this);
  }
  cancelScheduledValues(t) {
    return (this._param.cancelScheduledValues(t), this);
  }
  cancelAndHoldAtTime(t) {
    return (this._param.cancelAndHoldAtTime(t), this);
  }
  rampTo(t, e, s) {
    return (this._param.rampTo(t, e, s), this);
  }
  get value() {
    return this._param.value;
  }
  set value(t) {
    this._param.value = t;
  }
  get convert() {
    return this._param.convert;
  }
  set convert(t) {
    this._param.convert = t;
  }
  get units() {
    return this._param.units;
  }
  get overridden() {
    return this._param.overridden;
  }
  set overridden(t) {
    this._param.overridden = t;
  }
  get maxValue() {
    return this._param.maxValue;
  }
  get minValue() {
    return this._param.minValue;
  }
  apply(t) {
    return (this._param.apply(t), this);
  }
}
function Bs(n, t, e, s) {
  ((t instanceof Z || Le(t) || (t instanceof rt && t.override)) &&
    (t.cancelScheduledValues(0),
    t.setValueAtTime(0, 0),
    t instanceof rt && (t.overridden = !0)),
    ie(n, t, e, s));
}
class Ar extends Z {
  constructor() {
    const t = V(Ar.getDefaults(), arguments, ["value"]);
    (super(t),
      (this.name = "TickParam"),
      (this._events = new Ft(1 / 0)),
      (this._multiplier = 1),
      (this._multiplier = t.multiplier),
      this._events.cancel(0),
      this._events.add({
        ticks: 0,
        time: 0,
        type: "setValueAtTime",
        value: this._fromType(t.value),
      }),
      this.setValueAtTime(t.value, 0));
  }
  static getDefaults() {
    return Object.assign(Z.getDefaults(), {
      multiplier: 1,
      units: "hertz",
      value: 1,
    });
  }
  setTargetAtTime(t, e, s) {
    ((e = this.toSeconds(e)), this.setRampPoint(e));
    const i = this._fromType(t),
      r = this._events.get(e),
      o = Math.round(Math.max(1 / s, 1));
    for (let a = 0; a <= o; a++) {
      const c = s * a + e,
        u = this._exponentialApproach(r.time, r.value, i, s, c);
      this.linearRampToValueAtTime(this._toType(u), c);
    }
    return this;
  }
  setValueAtTime(t, e) {
    const s = this.toSeconds(e);
    super.setValueAtTime(t, e);
    const i = this._events.get(s),
      r = this._events.previousEvent(i),
      o = this._getTicksUntilEvent(r, s);
    return ((i.ticks = Math.max(o, 0)), this);
  }
  linearRampToValueAtTime(t, e) {
    const s = this.toSeconds(e);
    super.linearRampToValueAtTime(t, e);
    const i = this._events.get(s),
      r = this._events.previousEvent(i),
      o = this._getTicksUntilEvent(r, s);
    return ((i.ticks = Math.max(o, 0)), this);
  }
  exponentialRampToValueAtTime(t, e) {
    e = this.toSeconds(e);
    const s = this._fromType(t),
      i = this._events.get(e),
      r = Math.round(Math.max((e - i.time) * 10, 1)),
      o = (e - i.time) / r;
    for (let a = 0; a <= r; a++) {
      const c = o * a + i.time,
        u = this._exponentialInterpolate(i.time, i.value, e, s, c);
      this.linearRampToValueAtTime(this._toType(u), c);
    }
    return this;
  }
  _getTicksUntilEvent(t, e) {
    if (t === null) t = { ticks: 0, time: 0, type: "setValueAtTime", value: 0 };
    else if (Pt(t.ticks)) {
      const o = this._events.previousEvent(t);
      t.ticks = this._getTicksUntilEvent(o, t.time);
    }
    const s = this._fromType(this.getValueAtTime(t.time));
    let i = this._fromType(this.getValueAtTime(e));
    const r = this._events.get(e);
    return (
      r &&
        r.time === e &&
        r.type === "setValueAtTime" &&
        (i = this._fromType(this.getValueAtTime(e - this.sampleTime))),
      0.5 * (e - t.time) * (s + i) + t.ticks
    );
  }
  getTicksAtTime(t) {
    const e = this.toSeconds(t),
      s = this._events.get(e);
    return Math.max(this._getTicksUntilEvent(s, e), 0);
  }
  getDurationOfTicks(t, e) {
    const s = this.toSeconds(e),
      i = this.getTicksAtTime(e);
    return this.getTimeOfTick(i + t) - s;
  }
  getTimeOfTick(t) {
    const e = this._events.get(t, "ticks"),
      s = this._events.getAfter(t, "ticks");
    if (e && e.ticks === t) return e.time;
    if (e && s && s.type === "linearRampToValueAtTime" && e.value !== s.value) {
      const i = this._fromType(this.getValueAtTime(e.time)),
        o =
          (this._fromType(this.getValueAtTime(s.time)) - i) / (s.time - e.time),
        a = Math.sqrt(Math.pow(i, 2) - 2 * o * (e.ticks - t)),
        c = (-i + a) / o,
        u = (-i - a) / o;
      return (c > 0 ? c : u) + e.time;
    } else
      return e
        ? e.value === 0
          ? 1 / 0
          : e.time + (t - e.ticks) / e.value
        : t / this._initialValue;
  }
  ticksToTime(t, e) {
    return this.getDurationOfTicks(t, e);
  }
  timeToTicks(t, e) {
    const s = this.toSeconds(e),
      i = this.toSeconds(t),
      r = this.getTicksAtTime(s);
    return this.getTicksAtTime(s + i) - r;
  }
  _fromType(t) {
    return this.units === "bpm" && this.multiplier
      ? 1 / (60 / t / this.multiplier)
      : super._fromType(t);
  }
  _toType(t) {
    return this.units === "bpm" && this.multiplier
      ? (t / this.multiplier) * 60
      : super._toType(t);
  }
  get multiplier() {
    return this._multiplier;
  }
  set multiplier(t) {
    const e = this.value;
    ((this._multiplier = t),
      this.cancelScheduledValues(0),
      this.setValueAtTime(e, 0));
  }
}
class kr extends rt {
  constructor() {
    const t = V(kr.getDefaults(), arguments, ["value"]);
    (super(t),
      (this.name = "TickSignal"),
      (this.input = this._param =
        new Ar({
          context: this.context,
          convert: t.convert,
          multiplier: t.multiplier,
          param: this._constantSource.offset,
          units: t.units,
          value: t.value,
        })));
  }
  static getDefaults() {
    return Object.assign(rt.getDefaults(), {
      multiplier: 1,
      units: "hertz",
      value: 1,
    });
  }
  ticksToTime(t, e) {
    return this._param.ticksToTime(t, e);
  }
  timeToTicks(t, e) {
    return this._param.timeToTicks(t, e);
  }
  getTimeOfTick(t) {
    return this._param.getTimeOfTick(t);
  }
  getDurationOfTicks(t, e) {
    return this._param.getDurationOfTicks(t, e);
  }
  getTicksAtTime(t) {
    return this._param.getTicksAtTime(t);
  }
  get multiplier() {
    return this._param.multiplier;
  }
  set multiplier(t) {
    this._param.multiplier = t;
  }
  dispose() {
    return (super.dispose(), this._param.dispose(), this);
  }
}
class Nr extends At {
  constructor() {
    const t = V(Nr.getDefaults(), arguments, ["frequency"]);
    (super(t),
      (this.name = "TickSource"),
      (this._state = new Sr()),
      (this._tickOffset = new Ft()),
      (this._ticksAtTime = new Ft()),
      (this._secondsAtTime = new Ft()),
      (this.frequency = new kr({
        context: this.context,
        units: t.units,
        value: t.frequency,
      })),
      Q(this, "frequency"),
      this._state.setStateAtTime("stopped", 0),
      this.setTicksAtTime(0, 0));
  }
  static getDefaults() {
    return Object.assign({ frequency: 1, units: "hertz" }, At.getDefaults());
  }
  get state() {
    return this.getStateAtTime(this.now());
  }
  start(t, e) {
    const s = this.toSeconds(t);
    return (
      this._state.getValueAtTime(s) !== "started" &&
        (this._state.setStateAtTime("started", s),
        z(e) && this.setTicksAtTime(e, s),
        this._ticksAtTime.cancel(s),
        this._secondsAtTime.cancel(s)),
      this
    );
  }
  stop(t) {
    const e = this.toSeconds(t);
    if (this._state.getValueAtTime(e) === "stopped") {
      const s = this._state.get(e);
      s &&
        s.time > 0 &&
        (this._tickOffset.cancel(s.time), this._state.cancel(s.time));
    }
    return (
      this._state.cancel(e),
      this._state.setStateAtTime("stopped", e),
      this.setTicksAtTime(0, e),
      this._ticksAtTime.cancel(e),
      this._secondsAtTime.cancel(e),
      this
    );
  }
  pause(t) {
    const e = this.toSeconds(t);
    return (
      this._state.getValueAtTime(e) === "started" &&
        (this._state.setStateAtTime("paused", e),
        this._ticksAtTime.cancel(e),
        this._secondsAtTime.cancel(e)),
      this
    );
  }
  cancel(t) {
    return (
      (t = this.toSeconds(t)),
      this._state.cancel(t),
      this._tickOffset.cancel(t),
      this._ticksAtTime.cancel(t),
      this._secondsAtTime.cancel(t),
      this
    );
  }
  getTicksAtTime(t) {
    const e = this.toSeconds(t),
      s = this._state.getLastState("stopped", e),
      i = this._ticksAtTime.get(e),
      r = { state: "paused", time: e };
    this._state.add(r);
    let o = i || s,
      a = i ? i.ticks : 0,
      c = null;
    return (
      this._state.forEachBetween(o.time, e + this.sampleTime, (u) => {
        let l = o.time;
        const h = this._tickOffset.get(u.time);
        (h && h.time >= o.time && ((a = h.ticks), (l = h.time)),
          o.state === "started" &&
            u.state !== "started" &&
            ((a +=
              this.frequency.getTicksAtTime(u.time) -
              this.frequency.getTicksAtTime(l)),
            u.time !== r.time &&
              (c = { state: u.state, time: u.time, ticks: a })),
          (o = u));
      }),
      this._state.remove(r),
      c && this._ticksAtTime.add(c),
      a
    );
  }
  get ticks() {
    return this.getTicksAtTime(this.now());
  }
  set ticks(t) {
    this.setTicksAtTime(t, this.now());
  }
  get seconds() {
    return this.getSecondsAtTime(this.now());
  }
  set seconds(t) {
    const e = this.now(),
      s = this.frequency.timeToTicks(t, e);
    this.setTicksAtTime(s, e);
  }
  getSecondsAtTime(t) {
    t = this.toSeconds(t);
    const e = this._state.getLastState("stopped", t),
      s = { state: "paused", time: t };
    this._state.add(s);
    const i = this._secondsAtTime.get(t);
    let r = i || e,
      o = i ? i.seconds : 0,
      a = null;
    return (
      this._state.forEachBetween(r.time, t + this.sampleTime, (c) => {
        let u = r.time;
        const l = this._tickOffset.get(c.time);
        (l && l.time >= r.time && ((o = l.seconds), (u = l.time)),
          r.state === "started" &&
            c.state !== "started" &&
            ((o += c.time - u),
            c.time !== s.time &&
              (a = { state: c.state, time: c.time, seconds: o })),
          (r = c));
      }),
      this._state.remove(s),
      a && this._secondsAtTime.add(a),
      o
    );
  }
  setTicksAtTime(t, e) {
    return (
      (e = this.toSeconds(e)),
      this._tickOffset.cancel(e),
      this._tickOffset.add({
        seconds: this.frequency.getDurationOfTicks(t, e),
        ticks: t,
        time: e,
      }),
      this._ticksAtTime.cancel(e),
      this._secondsAtTime.cancel(e),
      this
    );
  }
  getStateAtTime(t) {
    return ((t = this.toSeconds(t)), this._state.getValueAtTime(t));
  }
  getTimeOfTick(t, e = this.now()) {
    const s = this._tickOffset.get(e),
      i = this._state.get(e),
      r = Math.max(s.time, i.time),
      o = this.frequency.getTicksAtTime(r) + t - s.ticks;
    return this.frequency.getTimeOfTick(o);
  }
  forEachTickBetween(t, e, s) {
    let i = this._state.get(t);
    this._state.forEachBetween(t, e, (o) => {
      (i &&
        i.state === "started" &&
        o.state !== "started" &&
        this.forEachTickBetween(
          Math.max(i.time, t),
          o.time - this.sampleTime,
          s,
        ),
        (i = o));
    });
    let r = null;
    if (i && i.state === "started") {
      const o = Math.max(i.time, t),
        a = this.frequency.getTicksAtTime(o),
        c = this.frequency.getTicksAtTime(i.time),
        u = a - c;
      let l = Math.ceil(u) - u;
      l = Vt(l, 1) ? 0 : l;
      let h = this.frequency.getTimeOfTick(a + l);
      for (; h < e;) {
        try {
          s(h, Math.round(this.getTicksAtTime(h)));
        } catch (d) {
          r = d;
          break;
        }
        h += this.frequency.getDurationOfTicks(1, h);
      }
    }
    if (r) throw r;
    return this;
  }
  dispose() {
    return (
      super.dispose(),
      this._state.dispose(),
      this._tickOffset.dispose(),
      this._ticksAtTime.dispose(),
      this._secondsAtTime.dispose(),
      this.frequency.dispose(),
      this
    );
  }
}
class Us extends At {
  constructor() {
    const t = V(Us.getDefaults(), arguments, ["callback", "frequency"]);
    (super(t),
      (this.name = "Clock"),
      (this.callback = X),
      (this._lastUpdate = 0),
      (this._state = new Sr("stopped")),
      (this._boundLoop = this._loop.bind(this)),
      (this.callback = t.callback),
      (this._tickSource = new Nr({
        context: this.context,
        frequency: t.frequency,
        units: t.units,
      })),
      (this._lastUpdate = 0),
      (this.frequency = this._tickSource.frequency),
      Q(this, "frequency"),
      this._state.setStateAtTime("stopped", 0),
      this.context.on("tick", this._boundLoop));
  }
  static getDefaults() {
    return Object.assign(At.getDefaults(), {
      callback: X,
      frequency: 1,
      units: "hertz",
    });
  }
  get state() {
    return this._state.getValueAtTime(this.now());
  }
  start(t, e) {
    Ec(this.context);
    const s = this.toSeconds(t);
    return (
      this.log("start", s),
      this._state.getValueAtTime(s) !== "started" &&
        (this._state.setStateAtTime("started", s),
        this._tickSource.start(s, e),
        s < this._lastUpdate && this.emit("start", s, e)),
      this
    );
  }
  stop(t) {
    const e = this.toSeconds(t);
    return (
      this.log("stop", e),
      this._state.cancel(e),
      this._state.setStateAtTime("stopped", e),
      this._tickSource.stop(e),
      e < this._lastUpdate && this.emit("stop", e),
      this
    );
  }
  pause(t) {
    const e = this.toSeconds(t);
    return (
      this._state.getValueAtTime(e) === "started" &&
        (this._state.setStateAtTime("paused", e),
        this._tickSource.pause(e),
        e < this._lastUpdate && this.emit("pause", e)),
      this
    );
  }
  get ticks() {
    return Math.ceil(this.getTicksAtTime(this.now()));
  }
  set ticks(t) {
    this._tickSource.ticks = t;
  }
  get seconds() {
    return this._tickSource.seconds;
  }
  set seconds(t) {
    this._tickSource.seconds = t;
  }
  getSecondsAtTime(t) {
    return this._tickSource.getSecondsAtTime(t);
  }
  setTicksAtTime(t, e) {
    return (this._tickSource.setTicksAtTime(t, e), this);
  }
  getTimeOfTick(t, e = this.now()) {
    return this._tickSource.getTimeOfTick(t, e);
  }
  getTicksAtTime(t) {
    return this._tickSource.getTicksAtTime(t);
  }
  nextTickTime(t, e) {
    const s = this.toSeconds(e),
      i = this.getTicksAtTime(s);
    return this._tickSource.getTimeOfTick(i + t, s);
  }
  _loop() {
    const t = this._lastUpdate,
      e = this.now();
    ((this._lastUpdate = e),
      this.log("loop", t, e),
      t !== e &&
        (this._state.forEachBetween(t, e, (s) => {
          switch (s.state) {
            case "started":
              const i = this._tickSource.getTicksAtTime(s.time);
              this.emit("start", s.time, i);
              break;
            case "stopped":
              s.time !== 0 && this.emit("stop", s.time);
              break;
            case "paused":
              this.emit("pause", s.time);
              break;
          }
        }),
        this._tickSource.forEachTickBetween(t, e, (s, i) => {
          this.callback(s, i);
        })));
  }
  getStateAtTime(t) {
    const e = this.toSeconds(t);
    return this._state.getValueAtTime(e);
  }
  dispose() {
    return (
      super.dispose(),
      this.context.off("tick", this._boundLoop),
      this._tickSource.dispose(),
      this._state.dispose(),
      this
    );
  }
}
zn.mixin(Us);
class On extends W {
  constructor() {
    const t = V(On.getDefaults(), arguments, ["delayTime", "maxDelay"]);
    (super(t), (this.name = "Delay"));
    const e = this.toSeconds(t.maxDelay);
    ((this._maxDelay = Math.max(e, this.toSeconds(t.delayTime))),
      (this._delayNode =
        this.input =
        this.output =
          this.context.createDelay(e)),
      (this.delayTime = new Z({
        context: this.context,
        param: this._delayNode.delayTime,
        units: "time",
        value: t.delayTime,
        minValue: 0,
        maxValue: this.maxDelay,
      })),
      Q(this, "delayTime"));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), { delayTime: 0, maxDelay: 1 });
  }
  get maxDelay() {
    return this._maxDelay;
  }
  dispose() {
    return (
      super.dispose(),
      this._delayNode.disconnect(),
      this.delayTime.dispose(),
      this
    );
  }
}
class vn extends W {
  constructor() {
    const t = V(vn.getDefaults(), arguments, ["volume"]);
    (super(t),
      (this.name = "Volume"),
      (this.input = this.output =
        new Y({ context: this.context, gain: t.volume, units: "decibels" })),
      (this.volume = this.output.gain),
      Q(this, "volume"),
      (this._unmutedVolume = t.volume),
      (this.mute = t.mute));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), { mute: !1, volume: 0 });
  }
  get mute() {
    return this.volume.value === -1 / 0;
  }
  set mute(t) {
    !this.mute && t
      ? ((this._unmutedVolume = this.volume.value),
        (this.volume.value = -1 / 0))
      : this.mute && !t && (this.volume.value = this._unmutedVolume);
  }
  dispose() {
    return (super.dispose(), this.input.dispose(), this.volume.dispose(), this);
  }
}
class Or extends W {
  constructor() {
    const t = V(Or.getDefaults(), arguments);
    (super(t),
      (this.name = "Destination"),
      (this.input = new vn({ context: this.context })),
      (this.output = new Y({ context: this.context })),
      (this.volume = this.input.volume),
      xs(this.input, this.output, this.context.rawContext.destination),
      (this.mute = t.mute),
      (this._internalChannels = [
        this.input,
        this.context.rawContext.destination,
        this.output,
      ]));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), { mute: !1, volume: 0 });
  }
  get mute() {
    return this.input.mute;
  }
  set mute(t) {
    this.input.mute = t;
  }
  chain(...t) {
    return (
      this.input.disconnect(),
      t.unshift(this.input),
      t.push(this.output),
      xs(...t),
      this
    );
  }
  get maxChannelCount() {
    return this.context.rawContext.destination.maxChannelCount;
  }
  dispose() {
    return (super.dispose(), this.volume.dispose(), this);
  }
}
qs((n) => {
  n.destination = new Or({ context: n });
});
Ws((n) => {
  n.destination.dispose();
});
class V_ extends W {
  constructor() {
    (super(...arguments),
      (this.name = "Listener"),
      (this.positionX = new Z({
        context: this.context,
        param: this.context.rawContext.listener.positionX,
      })),
      (this.positionY = new Z({
        context: this.context,
        param: this.context.rawContext.listener.positionY,
      })),
      (this.positionZ = new Z({
        context: this.context,
        param: this.context.rawContext.listener.positionZ,
      })),
      (this.forwardX = new Z({
        context: this.context,
        param: this.context.rawContext.listener.forwardX,
      })),
      (this.forwardY = new Z({
        context: this.context,
        param: this.context.rawContext.listener.forwardY,
      })),
      (this.forwardZ = new Z({
        context: this.context,
        param: this.context.rawContext.listener.forwardZ,
      })),
      (this.upX = new Z({
        context: this.context,
        param: this.context.rawContext.listener.upX,
      })),
      (this.upY = new Z({
        context: this.context,
        param: this.context.rawContext.listener.upY,
      })),
      (this.upZ = new Z({
        context: this.context,
        param: this.context.rawContext.listener.upZ,
      })));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), {
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      forwardX: 0,
      forwardY: 0,
      forwardZ: -1,
      upX: 0,
      upY: 1,
      upZ: 0,
    });
  }
  dispose() {
    return (
      super.dispose(),
      this.positionX.dispose(),
      this.positionY.dispose(),
      this.positionZ.dispose(),
      this.forwardX.dispose(),
      this.forwardY.dispose(),
      this.forwardZ.dispose(),
      this.upX.dispose(),
      this.upY.dispose(),
      this.upZ.dispose(),
      this
    );
  }
}
qs((n) => {
  n.listener = new V_({ context: n });
});
Ws((n) => {
  n.listener.dispose();
});
class Er extends oe {
  constructor() {
    (super(),
      (this.name = "ToneAudioBuffers"),
      (this._buffers = new Map()),
      (this._loadingCount = 0));
    const t = V(
      Er.getDefaults(),
      arguments,
      ["urls", "onload", "baseUrl"],
      "urls",
    );
    ((this.baseUrl = t.baseUrl),
      Object.keys(t.urls).forEach((e) => {
        this._loadingCount++;
        const s = t.urls[e];
        this.add(e, s, this._bufferLoaded.bind(this, t.onload), t.onerror);
      }));
  }
  static getDefaults() {
    return { baseUrl: "", onerror: X, onload: X, urls: {} };
  }
  has(t) {
    return this._buffers.has(t.toString());
  }
  get(t) {
    return (
      B(this.has(t), `ToneAudioBuffers has no buffer named: ${t}`),
      this._buffers.get(t.toString())
    );
  }
  _bufferLoaded(t) {
    (this._loadingCount--, this._loadingCount === 0 && t && t());
  }
  get loaded() {
    return Array.from(this._buffers).every(([t, e]) => e.loaded);
  }
  add(t, e, s = X, i = X) {
    return (
      se(e)
        ? (this.baseUrl &&
            e.trim().substring(0, 11).toLowerCase() === "data:/audio/" &&
            (this.baseUrl = ""),
          this._buffers.set(t.toString(), new st(this.baseUrl + e, s, i)))
        : this._buffers.set(t.toString(), new st(e, s, i)),
      this
    );
  }
  dispose() {
    return (
      super.dispose(),
      this._buffers.forEach((t) => t.dispose()),
      this._buffers.clear(),
      this
    );
  }
}
class Xe extends Nn {
  constructor() {
    (super(...arguments), (this.name = "Ticks"), (this.defaultUnits = "i"));
  }
  _now() {
    return this.context.transport.ticks;
  }
  _beatsToUnits(t) {
    return this._getPPQ() * t;
  }
  _secondsToUnits(t) {
    return Math.floor((t / (60 / this._getBpm())) * this._getPPQ());
  }
  _ticksToUnits(t) {
    return t;
  }
  toTicks() {
    return this.valueOf();
  }
  toSeconds() {
    return (this.valueOf() / this._getPPQ()) * (60 / this._getBpm());
  }
}
class L_ extends At {
  constructor() {
    (super(...arguments),
      (this.name = "Draw"),
      (this.expiration = 0.25),
      (this.anticipation = 0.008),
      (this._events = new Ft()),
      (this._boundDrawLoop = this._drawLoop.bind(this)),
      (this._animationFrame = -1));
  }
  schedule(t, e) {
    return (
      this._events.add({ callback: t, time: this.toSeconds(e) }),
      this._events.length === 1 &&
        (this._animationFrame = requestAnimationFrame(this._boundDrawLoop)),
      this
    );
  }
  cancel(t) {
    return (this._events.cancel(this.toSeconds(t)), this);
  }
  _drawLoop() {
    const t = this.context.currentTime;
    (this._events.forEachBefore(t + this.anticipation, (e) => {
      (t - e.time <= this.expiration && e.callback(), this._events.remove(e));
    }),
      this._events.length > 0 &&
        (this._animationFrame = requestAnimationFrame(this._boundDrawLoop)));
  }
  dispose() {
    return (
      super.dispose(),
      this._events.dispose(),
      cancelAnimationFrame(this._animationFrame),
      this
    );
  }
}
qs((n) => {
  n.draw = new L_({ context: n });
});
Ws((n) => {
  n.draw.dispose();
});
class q_ extends oe {
  constructor() {
    (super(...arguments),
      (this.name = "IntervalTimeline"),
      (this._root = null),
      (this._length = 0));
  }
  add(t) {
    (B(z(t.time), "Events must have a time property"),
      B(z(t.duration), "Events must have a duration parameter"),
      (t.time = t.time.valueOf()));
    let e = new W_(t.time, t.time + t.duration, t);
    for (
      this._root === null ? (this._root = e) : this._root.insert(e),
        this._length++;
      e !== null;
    )
      (e.updateHeight(), e.updateMax(), this._rebalance(e), (e = e.parent));
    return this;
  }
  remove(t) {
    if (this._root !== null) {
      const e = [];
      this._root.search(t.time, e);
      for (const s of e)
        if (s.event === t) {
          (this._removeNode(s), this._length--);
          break;
        }
    }
    return this;
  }
  get length() {
    return this._length;
  }
  cancel(t) {
    return (this.forEachFrom(t, (e) => this.remove(e)), this);
  }
  _setRoot(t) {
    ((this._root = t), this._root !== null && (this._root.parent = null));
  }
  _replaceNodeInParent(t, e) {
    t.parent !== null
      ? (t.isLeftChild() ? (t.parent.left = e) : (t.parent.right = e),
        this._rebalance(t.parent))
      : this._setRoot(e);
  }
  _removeNode(t) {
    if (t.left === null && t.right === null) this._replaceNodeInParent(t, null);
    else if (t.right === null) this._replaceNodeInParent(t, t.left);
    else if (t.left === null) this._replaceNodeInParent(t, t.right);
    else {
      const e = t.getBalance();
      let s,
        i = null;
      if (e > 0)
        if (t.left.right === null) ((s = t.left), (s.right = t.right), (i = s));
        else {
          for (s = t.left.right; s.right !== null;) s = s.right;
          s.parent &&
            ((s.parent.right = s.left),
            (i = s.parent),
            (s.left = t.left),
            (s.right = t.right));
        }
      else if (t.right.left === null)
        ((s = t.right), (s.left = t.left), (i = s));
      else {
        for (s = t.right.left; s.left !== null;) s = s.left;
        s.parent &&
          ((s.parent.left = s.right),
          (i = s.parent),
          (s.left = t.left),
          (s.right = t.right));
      }
      (t.parent !== null
        ? t.isLeftChild()
          ? (t.parent.left = s)
          : (t.parent.right = s)
        : this._setRoot(s),
        i && this._rebalance(i));
    }
    t.dispose();
  }
  _rotateLeft(t) {
    const e = t.parent,
      s = t.isLeftChild(),
      i = t.right;
    (i && ((t.right = i.left), (i.left = t)),
      e !== null ? (s ? (e.left = i) : (e.right = i)) : this._setRoot(i));
  }
  _rotateRight(t) {
    const e = t.parent,
      s = t.isLeftChild(),
      i = t.left;
    (i && ((t.left = i.right), (i.right = t)),
      e !== null ? (s ? (e.left = i) : (e.right = i)) : this._setRoot(i));
  }
  _rebalance(t) {
    const e = t.getBalance();
    e > 1 && t.left
      ? t.left.getBalance() < 0
        ? this._rotateLeft(t.left)
        : this._rotateRight(t)
      : e < -1 &&
        t.right &&
        (t.right.getBalance() > 0
          ? this._rotateRight(t.right)
          : this._rotateLeft(t));
  }
  get(t) {
    if (this._root !== null) {
      const e = [];
      if ((this._root.search(t, e), e.length > 0)) {
        let s = e[0];
        for (let i = 1; i < e.length; i++) e[i].low > s.low && (s = e[i]);
        return s.event;
      }
    }
    return null;
  }
  forEach(t) {
    if (this._root !== null) {
      const e = [];
      (this._root.traverse((s) => e.push(s)),
        e.forEach((s) => {
          s.event && t(s.event);
        }));
    }
    return this;
  }
  forEachAtTime(t, e) {
    if (this._root !== null) {
      const s = [];
      (this._root.search(t, s),
        s.forEach((i) => {
          i.event && e(i.event);
        }));
    }
    return this;
  }
  forEachFrom(t, e) {
    if (this._root !== null) {
      const s = [];
      (this._root.searchAfter(t, s),
        s.forEach((i) => {
          i.event && e(i.event);
        }));
    }
    return this;
  }
  dispose() {
    return (
      super.dispose(),
      this._root !== null && this._root.traverse((t) => t.dispose()),
      (this._root = null),
      this
    );
  }
}
class W_ {
  constructor(t, e, s) {
    ((this._left = null),
      (this._right = null),
      (this.parent = null),
      (this.height = 0),
      (this.event = s),
      (this.low = t),
      (this.high = e),
      (this.max = this.high));
  }
  insert(t) {
    t.low <= this.low
      ? this.left === null
        ? (this.left = t)
        : this.left.insert(t)
      : this.right === null
        ? (this.right = t)
        : this.right.insert(t);
  }
  search(t, e) {
    t > this.max ||
      (this.left !== null && this.left.search(t, e),
      this.low <= t && this.high > t && e.push(this),
      !(this.low > t) && this.right !== null && this.right.search(t, e));
  }
  searchAfter(t, e) {
    (this.low >= t &&
      (e.push(this), this.left !== null && this.left.searchAfter(t, e)),
      this.right !== null && this.right.searchAfter(t, e));
  }
  traverse(t) {
    (t(this),
      this.left !== null && this.left.traverse(t),
      this.right !== null && this.right.traverse(t));
  }
  updateHeight() {
    this.left !== null && this.right !== null
      ? (this.height = Math.max(this.left.height, this.right.height) + 1)
      : this.right !== null
        ? (this.height = this.right.height + 1)
        : this.left !== null
          ? (this.height = this.left.height + 1)
          : (this.height = 0);
  }
  updateMax() {
    ((this.max = this.high),
      this.left !== null && (this.max = Math.max(this.max, this.left.max)),
      this.right !== null && (this.max = Math.max(this.max, this.right.max)));
  }
  getBalance() {
    let t = 0;
    return (
      this.left !== null && this.right !== null
        ? (t = this.left.height - this.right.height)
        : this.left !== null
          ? (t = this.left.height + 1)
          : this.right !== null && (t = -(this.right.height + 1)),
      t
    );
  }
  isLeftChild() {
    return this.parent !== null && this.parent.left === this;
  }
  get left() {
    return this._left;
  }
  set left(t) {
    ((this._left = t),
      t !== null && (t.parent = this),
      this.updateHeight(),
      this.updateMax());
  }
  get right() {
    return this._right;
  }
  set right(t) {
    ((this._right = t),
      t !== null && (t.parent = this),
      this.updateHeight(),
      this.updateMax());
  }
  dispose() {
    ((this.parent = null),
      (this._left = null),
      (this._right = null),
      (this.event = null));
  }
}
class j_ extends oe {
  constructor(t) {
    (super(),
      (this.name = "TimelineValue"),
      (this._timeline = new Ft({ memory: 10 })),
      (this._initialValue = t));
  }
  set(t, e) {
    return (this._timeline.add({ value: t, time: e }), this);
  }
  get(t) {
    const e = this._timeline.get(t);
    return e ? e.value : this._initialValue;
  }
}
class Xt extends W {
  constructor() {
    super(V(Xt.getDefaults(), arguments, ["context"]));
  }
  connect(t, e = 0, s = 0) {
    return (Bs(this, t, e, s), this);
  }
}
class wn extends Xt {
  constructor() {
    const t = V(wn.getDefaults(), arguments, ["mapping", "length"]);
    (super(t),
      (this.name = "WaveShaper"),
      (this._shaper = this.context.createWaveShaper()),
      (this.input = this._shaper),
      (this.output = this._shaper),
      Wt(t.mapping) || t.mapping instanceof Float32Array
        ? (this.curve = Float32Array.from(t.mapping))
        : h_(t.mapping) && this.setMap(t.mapping, t.length));
  }
  static getDefaults() {
    return Object.assign(rt.getDefaults(), { length: 1024 });
  }
  setMap(t, e = 1024) {
    const s = new Float32Array(e);
    for (let i = 0, r = e; i < r; i++) {
      const o = (i / (r - 1)) * 2 - 1;
      s[i] = t(o, i);
    }
    return ((this.curve = s), this);
  }
  get curve() {
    return this._shaper.curve;
  }
  set curve(t) {
    this._shaper.curve = t;
  }
  get oversample() {
    return this._shaper.oversample;
  }
  set oversample(t) {
    const e = ["none", "2x", "4x"].some((s) => s.includes(t));
    (B(e, "oversampling must be either 'none', '2x', or '4x'"),
      (this._shaper.oversample = t));
  }
  dispose() {
    return (super.dispose(), this._shaper.disconnect(), this);
  }
}
class Mr extends Xt {
  constructor() {
    const t = V(Mr.getDefaults(), arguments, ["value"]);
    (super(t),
      (this.name = "Pow"),
      (this._exponentScaler =
        this.input =
        this.output =
          new wn({
            context: this.context,
            mapping: this._expFunc(t.value),
            length: 8192,
          })),
      (this._exponent = t.value));
  }
  static getDefaults() {
    return Object.assign(Xt.getDefaults(), { value: 1 });
  }
  _expFunc(t) {
    return (e) => Math.pow(Math.abs(e), t);
  }
  get value() {
    return this._exponent;
  }
  set value(t) {
    ((this._exponent = t),
      this._exponentScaler.setMap(this._expFunc(this._exponent)));
  }
  dispose() {
    return (super.dispose(), this._exponentScaler.dispose(), this);
  }
}
class ge {
  constructor(t, e) {
    ((this.id = ge._eventId++), (this._remainderTime = 0));
    const s = Object.assign(ge.getDefaults(), e);
    ((this.transport = t),
      (this.callback = s.callback),
      (this._once = s.once),
      (this.time = Math.floor(s.time)),
      (this._remainderTime = s.time - this.time));
  }
  static getDefaults() {
    return { callback: X, once: !1, time: 0 };
  }
  get floatTime() {
    return this.time + this._remainderTime;
  }
  invoke(t) {
    if (this.callback) {
      const e = this.transport.bpm.getDurationOfTicks(1, t);
      (this.callback(t + this._remainderTime * e),
        this._once && this.transport.clear(this.id));
    }
  }
  dispose() {
    return ((this.callback = void 0), this);
  }
}
ge._eventId = 0;
class Ir extends ge {
  constructor(t, e) {
    (super(t, e),
      (this._currentId = -1),
      (this._nextId = -1),
      (this._nextTick = this.time),
      (this._boundRestart = this._restart.bind(this)));
    const s = Object.assign(Ir.getDefaults(), e);
    ((this.duration = s.duration),
      (this._interval = s.interval),
      (this._nextTick = s.time),
      this.transport.on("start", this._boundRestart),
      this.transport.on("loopStart", this._boundRestart),
      this.transport.on("ticks", this._boundRestart),
      (this.context = this.transport.context),
      this._restart());
  }
  static getDefaults() {
    return Object.assign({}, ge.getDefaults(), {
      duration: 1 / 0,
      interval: 1,
      once: !1,
    });
  }
  invoke(t) {
    (this._createEvents(t), super.invoke(t));
  }
  _createEvent() {
    return Ts(this._nextTick, this.floatTime + this.duration)
      ? this.transport.scheduleOnce(
          this.invoke.bind(this),
          new Xe(this.context, this._nextTick).toSeconds(),
        )
      : -1;
  }
  _createEvents(t) {
    Ts(this._nextTick + this._interval, this.floatTime + this.duration) &&
      ((this._nextTick += this._interval),
      (this._currentId = this._nextId),
      (this._nextId = this.transport.scheduleOnce(
        this.invoke.bind(this),
        new Xe(this.context, this._nextTick).toSeconds(),
      )));
  }
  _restart(t) {
    (this.transport.clear(this._currentId),
      this.transport.clear(this._nextId),
      (this._nextTick = this.floatTime));
    const e = this.transport.getTicksAtTime(t);
    (rn(e, this.time) &&
      (this._nextTick =
        this.floatTime +
        Math.ceil((e - this.floatTime) / this._interval) * this._interval),
      (this._currentId = this._createEvent()),
      (this._nextTick += this._interval),
      (this._nextId = this._createEvent()));
  }
  dispose() {
    return (
      super.dispose(),
      this.transport.clear(this._currentId),
      this.transport.clear(this._nextId),
      this.transport.off("start", this._boundRestart),
      this.transport.off("loopStart", this._boundRestart),
      this.transport.off("ticks", this._boundRestart),
      this
    );
  }
}
class $s extends At {
  constructor() {
    const t = V($s.getDefaults(), arguments);
    (super(t),
      (this.name = "Transport"),
      (this._loop = new j_(!1)),
      (this._loopStart = 0),
      (this._loopEnd = 0),
      (this._scheduledEvents = {}),
      (this._timeline = new Ft()),
      (this._repeatedEvents = new q_()),
      (this._syncedSignals = []),
      (this._swingAmount = 0),
      (this._ppq = t.ppq),
      (this._clock = new Us({
        callback: this._processTick.bind(this),
        context: this.context,
        frequency: 0,
        units: "bpm",
      })),
      this._bindClockEvents(),
      (this.bpm = this._clock.frequency),
      (this._clock.frequency.multiplier = t.ppq),
      this.bpm.setValueAtTime(t.bpm, 0),
      Q(this, "bpm"),
      (this._timeSignature = t.timeSignature),
      (this._swingTicks = t.ppq / 2));
  }
  static getDefaults() {
    return Object.assign(At.getDefaults(), {
      bpm: 120,
      loopEnd: "4m",
      loopStart: 0,
      ppq: 192,
      swing: 0,
      swingSubdivision: "8n",
      timeSignature: 4,
    });
  }
  _processTick(t, e) {
    if (
      (this._loop.get(t) &&
        e >= this._loopEnd &&
        (this.emit("loopEnd", t),
        this._clock.setTicksAtTime(this._loopStart, t),
        (e = this._loopStart),
        this.emit("loopStart", t, this._clock.getSecondsAtTime(t)),
        this.emit("loop", t)),
      this._swingAmount > 0 &&
        e % this._ppq !== 0 &&
        e % (this._swingTicks * 2) !== 0)
    ) {
      const s = (e % (this._swingTicks * 2)) / (this._swingTicks * 2),
        i = Math.sin(s * Math.PI) * this._swingAmount;
      t += new Xe(this.context, (this._swingTicks * 2) / 3).toSeconds() * i;
    }
    (wo(!0), this._timeline.forEachAtTime(e, (s) => s.invoke(t)), wo(!1));
  }
  schedule(t, e) {
    const s = new ge(this, {
      callback: t,
      time: new Nn(this.context, e).toTicks(),
    });
    return this._addEvent(s, this._timeline);
  }
  scheduleRepeat(t, e, s, i = 1 / 0) {
    const r = new Ir(this, {
      callback: t,
      duration: new qt(this.context, i).toTicks(),
      interval: new qt(this.context, e).toTicks(),
      time: new Nn(this.context, s).toTicks(),
    });
    return this._addEvent(r, this._repeatedEvents);
  }
  scheduleOnce(t, e) {
    const s = new ge(this, {
      callback: t,
      once: !0,
      time: new Nn(this.context, e).toTicks(),
    });
    return this._addEvent(s, this._timeline);
  }
  clear(t) {
    if (this._scheduledEvents.hasOwnProperty(t)) {
      const e = this._scheduledEvents[t.toString()];
      (e.timeline.remove(e.event),
        e.event.dispose(),
        delete this._scheduledEvents[t.toString()]);
    }
    return this;
  }
  _addEvent(t, e) {
    return (
      (this._scheduledEvents[t.id.toString()] = { event: t, timeline: e }),
      e.add(t),
      t.id
    );
  }
  cancel(t = 0) {
    const e = this.toTicks(t);
    return (
      this._timeline.forEachFrom(e, (s) => this.clear(s.id)),
      this._repeatedEvents.forEachFrom(e, (s) => this.clear(s.id)),
      this
    );
  }
  _bindClockEvents() {
    (this._clock.on("start", (t, e) => {
      ((e = new Xe(this.context, e).toSeconds()), this.emit("start", t, e));
    }),
      this._clock.on("stop", (t) => {
        this.emit("stop", t);
      }),
      this._clock.on("pause", (t) => {
        this.emit("pause", t);
      }));
  }
  get state() {
    return this._clock.getStateAtTime(this.now());
  }
  start(t, e) {
    this.context.resume();
    let s;
    return (z(e) && (s = this.toTicks(e)), this._clock.start(t, s), this);
  }
  stop(t) {
    return (this._clock.stop(t), this);
  }
  pause(t) {
    return (this._clock.pause(t), this);
  }
  toggle(t) {
    return (
      (t = this.toSeconds(t)),
      this._clock.getStateAtTime(t) !== "started"
        ? this.start(t)
        : this.stop(t),
      this
    );
  }
  get timeSignature() {
    return this._timeSignature;
  }
  set timeSignature(t) {
    (Wt(t) && (t = (t[0] / t[1]) * 4), (this._timeSignature = t));
  }
  get loopStart() {
    return new qt(this.context, this._loopStart, "i").toSeconds();
  }
  set loopStart(t) {
    this._loopStart = this.toTicks(t);
  }
  get loopEnd() {
    return new qt(this.context, this._loopEnd, "i").toSeconds();
  }
  set loopEnd(t) {
    this._loopEnd = this.toTicks(t);
  }
  get loop() {
    return this._loop.get(this.now());
  }
  set loop(t) {
    this._loop.set(t, this.now());
  }
  setLoopPoints(t, e) {
    return ((this.loopStart = t), (this.loopEnd = e), this);
  }
  get swing() {
    return this._swingAmount;
  }
  set swing(t) {
    this._swingAmount = t;
  }
  get swingSubdivision() {
    return new Xe(this.context, this._swingTicks).toNotation();
  }
  set swingSubdivision(t) {
    this._swingTicks = this.toTicks(t);
  }
  get position() {
    const t = this.now(),
      e = this._clock.getTicksAtTime(t);
    return new Xe(this.context, e).toBarsBeatsSixteenths();
  }
  set position(t) {
    const e = this.toTicks(t);
    this.ticks = e;
  }
  get seconds() {
    return this._clock.seconds;
  }
  set seconds(t) {
    const e = this.now(),
      s = this._clock.frequency.timeToTicks(t, e);
    this.ticks = s;
  }
  get progress() {
    if (this.loop) {
      const t = this.now();
      return (
        (this._clock.getTicksAtTime(t) - this._loopStart) /
        (this._loopEnd - this._loopStart)
      );
    } else return 0;
  }
  get ticks() {
    return this._clock.ticks;
  }
  set ticks(t) {
    if (this._clock.ticks !== t) {
      const e = this.now();
      if (this.state === "started") {
        const s = this._clock.getTicksAtTime(e),
          i = this._clock.frequency.getDurationOfTicks(Math.ceil(s) - s, e),
          r = e + i;
        (this.emit("stop", r),
          this._clock.setTicksAtTime(t, r),
          this.emit("start", r, this._clock.getSecondsAtTime(r)));
      } else (this.emit("ticks", e), this._clock.setTicksAtTime(t, e));
    }
  }
  getTicksAtTime(t) {
    return this._clock.getTicksAtTime(t);
  }
  getSecondsAtTime(t) {
    return this._clock.getSecondsAtTime(t);
  }
  get PPQ() {
    return this._clock.frequency.multiplier;
  }
  set PPQ(t) {
    this._clock.frequency.multiplier = t;
  }
  nextSubdivision(t) {
    if (((t = this.toTicks(t)), this.state !== "started")) return 0;
    {
      const e = this.now(),
        s = this.getTicksAtTime(e),
        i = t - (s % t);
      return this._clock.nextTickTime(i, e);
    }
  }
  syncSignal(t, e) {
    const s = this.now();
    let i = this.bpm,
      r = 1 / (60 / i.getValueAtTime(s) / this.PPQ),
      o = [];
    if (t.units === "time") {
      const c = 0.015625 / r,
        u = new Y(c),
        l = new Mr(-1),
        h = new Y(c);
      (i.chain(u, l, h), (i = h), (r = 1 / r), (o = [u, l, h]));
    }
    e || (t.getValueAtTime(s) !== 0 ? (e = t.getValueAtTime(s) / r) : (e = 0));
    const a = new Y(e);
    return (
      i.connect(a),
      a.connect(t._param),
      o.push(a),
      this._syncedSignals.push({ initial: t.value, nodes: o, signal: t }),
      (t.value = 0),
      this
    );
  }
  unsyncSignal(t) {
    for (let e = this._syncedSignals.length - 1; e >= 0; e--) {
      const s = this._syncedSignals[e];
      s.signal === t &&
        (s.nodes.forEach((i) => i.dispose()),
        (s.signal.value = s.initial),
        this._syncedSignals.splice(e, 1));
    }
    return this;
  }
  dispose() {
    return (
      super.dispose(),
      this._clock.dispose(),
      Fc(this, "bpm"),
      this._timeline.dispose(),
      this._repeatedEvents.dispose(),
      this
    );
  }
}
zn.mixin($s);
qs((n) => {
  n.transport = new $s({ context: n });
});
Ws((n) => {
  n.transport.dispose();
});
class Mt extends W {
  constructor(t) {
    (super(t),
      (this.input = void 0),
      (this._state = new Sr("stopped")),
      (this._synced = !1),
      (this._scheduled = []),
      (this._syncedStart = X),
      (this._syncedStop = X),
      (this._state.memory = 100),
      (this._state.increasing = !0),
      (this._volume = this.output =
        new vn({ context: this.context, mute: t.mute, volume: t.volume })),
      (this.volume = this._volume.volume),
      Q(this, "volume"),
      (this.onstop = t.onstop));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), { mute: !1, onstop: X, volume: 0 });
  }
  get state() {
    return this._synced
      ? this.context.transport.state === "started"
        ? this._state.getValueAtTime(this.context.transport.seconds)
        : "stopped"
      : this._state.getValueAtTime(this.now());
  }
  get mute() {
    return this._volume.mute;
  }
  set mute(t) {
    this._volume.mute = t;
  }
  _clampToCurrentTime(t) {
    return this._synced ? t : Math.max(t, this.context.currentTime);
  }
  start(t, e, s) {
    let i =
      Pt(t) && this._synced
        ? this.context.transport.seconds
        : this.toSeconds(t);
    if (
      ((i = this._clampToCurrentTime(i)),
      !this._synced && this._state.getValueAtTime(i) === "started")
    )
      (B(
        rn(i, this._state.get(i).time),
        "Start time must be strictly greater than previous start time",
      ),
        this._state.cancel(i),
        this._state.setStateAtTime("started", i),
        this.log("restart", i),
        this.restart(i, e, s));
    else if (
      (this.log("start", i),
      this._state.setStateAtTime("started", i),
      this._synced)
    ) {
      const r = this._state.get(i);
      r &&
        ((r.offset = this.toSeconds(Qe(e, 0))),
        (r.duration = s ? this.toSeconds(s) : void 0));
      const o = this.context.transport.schedule((a) => {
        this._start(a, e, s);
      }, i);
      (this._scheduled.push(o),
        this.context.transport.state === "started" &&
          this.context.transport.getSecondsAtTime(this.immediate()) > i &&
          this._syncedStart(this.now(), this.context.transport.seconds));
    } else (Ec(this.context), this._start(i, e, s));
    return this;
  }
  stop(t) {
    let e =
      Pt(t) && this._synced
        ? this.context.transport.seconds
        : this.toSeconds(t);
    if (
      ((e = this._clampToCurrentTime(e)),
      this._state.getValueAtTime(e) === "started" ||
        z(this._state.getNextState("started", e)))
    ) {
      if ((this.log("stop", e), !this._synced)) this._stop(e);
      else {
        const s = this.context.transport.schedule(this._stop.bind(this), e);
        this._scheduled.push(s);
      }
      (this._state.cancel(e), this._state.setStateAtTime("stopped", e));
    }
    return this;
  }
  restart(t, e, s) {
    return (
      (t = this.toSeconds(t)),
      this._state.getValueAtTime(t) === "started" &&
        (this._state.cancel(t), this._restart(t, e, s)),
      this
    );
  }
  sync() {
    return (
      this._synced ||
        ((this._synced = !0),
        (this._syncedStart = (t, e) => {
          if (rn(e, 0)) {
            const s = this._state.get(e);
            if (s && s.state === "started" && s.time !== e) {
              const i = e - this.toSeconds(s.time);
              let r;
              (s.duration && (r = this.toSeconds(s.duration) - i),
                this._start(t, this.toSeconds(s.offset) + i, r));
            }
          }
        }),
        (this._syncedStop = (t) => {
          const e = this.context.transport.getSecondsAtTime(
            Math.max(t - this.sampleTime, 0),
          );
          this._state.getValueAtTime(e) === "started" && this._stop(t);
        }),
        this.context.transport.on("start", this._syncedStart),
        this.context.transport.on("loopStart", this._syncedStart),
        this.context.transport.on("stop", this._syncedStop),
        this.context.transport.on("pause", this._syncedStop),
        this.context.transport.on("loopEnd", this._syncedStop)),
      this
    );
  }
  unsync() {
    return (
      this._synced &&
        (this.context.transport.off("stop", this._syncedStop),
        this.context.transport.off("pause", this._syncedStop),
        this.context.transport.off("loopEnd", this._syncedStop),
        this.context.transport.off("start", this._syncedStart),
        this.context.transport.off("loopStart", this._syncedStart)),
      (this._synced = !1),
      this._scheduled.forEach((t) => this.context.transport.clear(t)),
      (this._scheduled = []),
      this._state.cancel(0),
      this._stop(0),
      this
    );
  }
  dispose() {
    return (
      super.dispose(),
      (this.onstop = X),
      this.unsync(),
      this._volume.dispose(),
      this._state.dispose(),
      this
    );
  }
}
class zs extends on {
  constructor() {
    const t = V(zs.getDefaults(), arguments, ["url", "onload"]);
    (super(t),
      (this.name = "ToneBufferSource"),
      (this._source = this.context.createBufferSource()),
      (this._internalChannels = [this._source]),
      (this._sourceStarted = !1),
      (this._sourceStopped = !1),
      ie(this._source, this._gainNode),
      (this._source.onended = () => this._stopSource()),
      (this.playbackRate = new Z({
        context: this.context,
        param: this._source.playbackRate,
        units: "positive",
        value: t.playbackRate,
      })),
      (this.loop = t.loop),
      (this.loopStart = t.loopStart),
      (this.loopEnd = t.loopEnd),
      (this._buffer = new st(t.url, t.onload, t.onerror)),
      this._internalChannels.push(this._source));
  }
  static getDefaults() {
    return Object.assign(on.getDefaults(), {
      url: new st(),
      loop: !1,
      loopEnd: 0,
      loopStart: 0,
      onload: X,
      onerror: X,
      playbackRate: 1,
    });
  }
  get fadeIn() {
    return this._fadeIn;
  }
  set fadeIn(t) {
    this._fadeIn = t;
  }
  get fadeOut() {
    return this._fadeOut;
  }
  set fadeOut(t) {
    this._fadeOut = t;
  }
  get curve() {
    return this._curve;
  }
  set curve(t) {
    this._curve = t;
  }
  start(t, e, s, i = 1) {
    B(this.buffer.loaded, "buffer is either not set or not loaded");
    const r = this.toSeconds(t);
    (this._startGain(r, i),
      this.loop ? (e = Qe(e, this.loopStart)) : (e = Qe(e, 0)));
    let o = Math.max(this.toSeconds(e), 0);
    if (this.loop) {
      const a = this.toSeconds(this.loopEnd) || this.buffer.duration,
        c = this.toSeconds(this.loopStart),
        u = a - c;
      (Ii(o, a) && (o = ((o - c) % u) + c),
        Vt(o, this.buffer.duration) && (o = 0));
    }
    if (
      ((this._source.buffer = this.buffer.get()),
      (this._source.loopEnd =
        this.toSeconds(this.loopEnd) || this.buffer.duration),
      Ts(o, this.buffer.duration) &&
        ((this._sourceStarted = !0), this._source.start(r, o)),
      z(s))
    ) {
      let a = this.toSeconds(s);
      ((a = Math.max(a, 0)), this.stop(r + a));
    }
    return this;
  }
  _stopSource(t) {
    !this._sourceStopped &&
      this._sourceStarted &&
      ((this._sourceStopped = !0),
      this._source.stop(this.toSeconds(t)),
      this._onended());
  }
  get loopStart() {
    return this._source.loopStart;
  }
  set loopStart(t) {
    this._source.loopStart = this.toSeconds(t);
  }
  get loopEnd() {
    return this._source.loopEnd;
  }
  set loopEnd(t) {
    this._source.loopEnd = this.toSeconds(t);
  }
  get buffer() {
    return this._buffer;
  }
  set buffer(t) {
    this._buffer.set(t);
  }
  get loop() {
    return this._source.loop;
  }
  set loop(t) {
    ((this._source.loop = t), this._sourceStarted && this.cancelStop());
  }
  dispose() {
    return (
      super.dispose(),
      (this._source.onended = null),
      this._source.disconnect(),
      this._buffer.dispose(),
      this.playbackRate.dispose(),
      this
    );
  }
}
function Ue(n, t) {
  return ft(this, void 0, void 0, function* () {
    const e = t / n.context.sampleRate,
      s = new br(1, e, n.context.sampleRate);
    return (
      new n.constructor(
        Object.assign(n.get(), { frequency: 2 / e, detune: 0, context: s }),
      )
        .toDestination()
        .start(0),
      (yield s.render()).getChannelData(0)
    );
  });
}
class Dr extends on {
  constructor() {
    const t = V(Dr.getDefaults(), arguments, ["frequency", "type"]);
    (super(t),
      (this.name = "ToneOscillatorNode"),
      (this._oscillator = this.context.createOscillator()),
      (this._internalChannels = [this._oscillator]),
      ie(this._oscillator, this._gainNode),
      (this.type = t.type),
      (this.frequency = new Z({
        context: this.context,
        param: this._oscillator.frequency,
        units: "frequency",
        value: t.frequency,
      })),
      (this.detune = new Z({
        context: this.context,
        param: this._oscillator.detune,
        units: "cents",
        value: t.detune,
      })),
      Q(this, ["frequency", "detune"]));
  }
  static getDefaults() {
    return Object.assign(on.getDefaults(), {
      detune: 0,
      frequency: 440,
      type: "sine",
    });
  }
  start(t) {
    const e = this.toSeconds(t);
    return (
      this.log("start", e),
      this._startGain(e),
      this._oscillator.start(e),
      this
    );
  }
  _stopSource(t) {
    this._oscillator.stop(t);
  }
  setPeriodicWave(t) {
    return (this._oscillator.setPeriodicWave(t), this);
  }
  get type() {
    return this._oscillator.type;
  }
  set type(t) {
    this._oscillator.type = t;
  }
  dispose() {
    return (
      super.dispose(),
      this.state === "started" && this.stop(),
      this._oscillator.disconnect(),
      this.frequency.dispose(),
      this.detune.dispose(),
      this
    );
  }
}
class lt extends Mt {
  constructor() {
    const t = V(lt.getDefaults(), arguments, ["frequency", "type"]);
    (super(t),
      (this.name = "Oscillator"),
      (this._oscillator = null),
      (this.frequency = new rt({
        context: this.context,
        units: "frequency",
        value: t.frequency,
      })),
      Q(this, "frequency"),
      (this.detune = new rt({
        context: this.context,
        units: "cents",
        value: t.detune,
      })),
      Q(this, "detune"),
      (this._partials = t.partials),
      (this._partialCount = t.partialCount),
      (this._type = t.type),
      t.partialCount &&
        t.type !== "custom" &&
        (this._type = this.baseType + t.partialCount.toString()),
      (this.phase = t.phase));
  }
  static getDefaults() {
    return Object.assign(Mt.getDefaults(), {
      detune: 0,
      frequency: 440,
      partialCount: 0,
      partials: [],
      phase: 0,
      type: "sine",
    });
  }
  _start(t) {
    const e = this.toSeconds(t),
      s = new Dr({ context: this.context, onended: () => this.onstop(this) });
    ((this._oscillator = s),
      this._wave
        ? this._oscillator.setPeriodicWave(this._wave)
        : (this._oscillator.type = this._type),
      this._oscillator.connect(this.output),
      this.frequency.connect(this._oscillator.frequency),
      this.detune.connect(this._oscillator.detune),
      this._oscillator.start(e));
  }
  _stop(t) {
    const e = this.toSeconds(t);
    this._oscillator && this._oscillator.stop(e);
  }
  _restart(t) {
    const e = this.toSeconds(t);
    return (
      this.log("restart", e),
      this._oscillator && this._oscillator.cancelStop(),
      this._state.cancel(e),
      this
    );
  }
  syncFrequency() {
    return (this.context.transport.syncSignal(this.frequency), this);
  }
  unsyncFrequency() {
    return (this.context.transport.unsyncSignal(this.frequency), this);
  }
  _getCachedPeriodicWave() {
    if (this._type === "custom")
      return lt._periodicWaveCache.find(
        (e) => e.phase === this._phase && b_(e.partials, this._partials),
      );
    {
      const t = lt._periodicWaveCache.find(
        (e) => e.type === this._type && e.phase === this._phase,
      );
      return (
        (this._partialCount = t ? t.partialCount : this._partialCount),
        t
      );
    }
  }
  get type() {
    return this._type;
  }
  set type(t) {
    this._type = t;
    const e = ["sine", "square", "sawtooth", "triangle"].indexOf(t) !== -1;
    if (this._phase === 0 && e)
      ((this._wave = void 0),
        (this._partialCount = 0),
        this._oscillator !== null && (this._oscillator.type = t));
    else {
      const s = this._getCachedPeriodicWave();
      if (z(s)) {
        const { partials: i, wave: r } = s;
        ((this._wave = r),
          (this._partials = i),
          this._oscillator !== null &&
            this._oscillator.setPeriodicWave(this._wave));
      } else {
        const [i, r] = this._getRealImaginary(t, this._phase),
          o = this.context.createPeriodicWave(i, r);
        ((this._wave = o),
          this._oscillator !== null &&
            this._oscillator.setPeriodicWave(this._wave),
          lt._periodicWaveCache.push({
            imag: r,
            partialCount: this._partialCount,
            partials: this._partials,
            phase: this._phase,
            real: i,
            type: this._type,
            wave: this._wave,
          }),
          lt._periodicWaveCache.length > 100 && lt._periodicWaveCache.shift());
      }
    }
  }
  get baseType() {
    return this._type.replace(this.partialCount.toString(), "");
  }
  set baseType(t) {
    this.partialCount && this._type !== "custom" && t !== "custom"
      ? (this.type = t + this.partialCount)
      : (this.type = t);
  }
  get partialCount() {
    return this._partialCount;
  }
  set partialCount(t) {
    _e(t, 0);
    let e = this._type;
    const s = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);
    if ((s && (e = s[1]), this._type !== "custom"))
      t === 0 ? (this.type = e) : (this.type = e + t.toString());
    else {
      const i = new Float32Array(t);
      (this._partials.forEach((r, o) => (i[o] = r)),
        (this._partials = Array.from(i)),
        (this.type = this._type));
    }
  }
  _getRealImaginary(t, e) {
    let i = 2048;
    const r = new Float32Array(i),
      o = new Float32Array(i);
    let a = 1;
    if (t === "custom") {
      if (
        ((a = this._partials.length + 1),
        (this._partialCount = this._partials.length),
        (i = a),
        this._partials.length === 0)
      )
        return [r, o];
    } else {
      const c = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(t);
      (c
        ? ((a = parseInt(c[2], 10) + 1),
          (this._partialCount = parseInt(c[2], 10)),
          (t = c[1]),
          (a = Math.max(a, 2)),
          (i = a))
        : (this._partialCount = 0),
        (this._partials = []));
    }
    for (let c = 1; c < i; ++c) {
      const u = 2 / (c * Math.PI);
      let l;
      switch (t) {
        case "sine":
          ((l = c <= a ? 1 : 0), (this._partials[c - 1] = l));
          break;
        case "square":
          ((l = c & 1 ? 2 * u : 0), (this._partials[c - 1] = l));
          break;
        case "sawtooth":
          ((l = u * (c & 1 ? 1 : -1)), (this._partials[c - 1] = l));
          break;
        case "triangle":
          (c & 1 ? (l = 2 * (u * u) * (((c - 1) >> 1) & 1 ? -1 : 1)) : (l = 0),
            (this._partials[c - 1] = l));
          break;
        case "custom":
          l = this._partials[c - 1];
          break;
        default:
          throw new TypeError("Oscillator: invalid type: " + t);
      }
      l !== 0
        ? ((r[c] = -l * Math.sin(e * c)), (o[c] = l * Math.cos(e * c)))
        : ((r[c] = 0), (o[c] = 0));
    }
    return [r, o];
  }
  _inverseFFT(t, e, s) {
    let i = 0;
    const r = t.length;
    for (let o = 0; o < r; o++)
      i += t[o] * Math.cos(o * s) + e[o] * Math.sin(o * s);
    return i;
  }
  getInitialValue() {
    const [t, e] = this._getRealImaginary(this._type, 0);
    let s = 0;
    const i = Math.PI * 2,
      r = 32;
    for (let o = 0; o < r; o++)
      s = Math.max(this._inverseFFT(t, e, (o / r) * i), s);
    return S_(-this._inverseFFT(t, e, this._phase) / s, -1, 1);
  }
  get partials() {
    return this._partials.slice(0, this.partialCount);
  }
  set partials(t) {
    ((this._partials = t),
      (this._partialCount = this._partials.length),
      t.length && (this.type = "custom"));
  }
  get phase() {
    return this._phase * (180 / Math.PI);
  }
  set phase(t) {
    ((this._phase = (t * Math.PI) / 180), (this.type = this._type));
  }
  asArray() {
    return ft(this, arguments, void 0, function* (t = 1024) {
      return Ue(this, t);
    });
  }
  dispose() {
    return (
      super.dispose(),
      this._oscillator !== null && this._oscillator.dispose(),
      (this._wave = void 0),
      this.frequency.dispose(),
      this.detune.dispose(),
      this
    );
  }
}
lt._periodicWaveCache = [];
class Wc extends Xt {
  constructor() {
    (super(...arguments),
      (this.name = "AudioToGain"),
      (this._norm = new wn({
        context: this.context,
        mapping: (t) => (t + 1) / 2,
      })),
      (this.input = this._norm),
      (this.output = this._norm));
  }
  dispose() {
    return (super.dispose(), this._norm.dispose(), this);
  }
}
class qe extends rt {
  constructor() {
    const t = V(qe.getDefaults(), arguments, ["value"]);
    (super(t),
      (this.name = "Multiply"),
      (this.override = !1),
      (this._mult =
        this.input =
        this.output =
          new Y({
            context: this.context,
            minValue: t.minValue,
            maxValue: t.maxValue,
          })),
      (this.factor = this._param = this._mult.gain),
      this.factor.setValueAtTime(t.value, 0));
  }
  static getDefaults() {
    return Object.assign(rt.getDefaults(), { value: 0 });
  }
  dispose() {
    return (super.dispose(), this._mult.dispose(), this);
  }
}
class Gs extends Mt {
  constructor() {
    const t = V(Gs.getDefaults(), arguments, [
      "frequency",
      "type",
      "modulationType",
    ]);
    (super(t),
      (this.name = "AMOscillator"),
      (this._modulationScale = new Wc({ context: this.context })),
      (this._modulationNode = new Y({ context: this.context })),
      (this._carrier = new lt({
        context: this.context,
        detune: t.detune,
        frequency: t.frequency,
        onstop: () => this.onstop(this),
        phase: t.phase,
        type: t.type,
      })),
      (this.frequency = this._carrier.frequency),
      (this.detune = this._carrier.detune),
      (this._modulator = new lt({
        context: this.context,
        phase: t.phase,
        type: t.modulationType,
      })),
      (this.harmonicity = new qe({
        context: this.context,
        units: "positive",
        value: t.harmonicity,
      })),
      this.frequency.chain(this.harmonicity, this._modulator.frequency),
      this._modulator.chain(this._modulationScale, this._modulationNode.gain),
      this._carrier.chain(this._modulationNode, this.output),
      Q(this, ["frequency", "detune", "harmonicity"]));
  }
  static getDefaults() {
    return Object.assign(lt.getDefaults(), {
      harmonicity: 1,
      modulationType: "square",
    });
  }
  _start(t) {
    (this._modulator.start(t), this._carrier.start(t));
  }
  _stop(t) {
    (this._modulator.stop(t), this._carrier.stop(t));
  }
  _restart(t) {
    (this._modulator.restart(t), this._carrier.restart(t));
  }
  get type() {
    return this._carrier.type;
  }
  set type(t) {
    this._carrier.type = t;
  }
  get baseType() {
    return this._carrier.baseType;
  }
  set baseType(t) {
    this._carrier.baseType = t;
  }
  get partialCount() {
    return this._carrier.partialCount;
  }
  set partialCount(t) {
    this._carrier.partialCount = t;
  }
  get modulationType() {
    return this._modulator.type;
  }
  set modulationType(t) {
    this._modulator.type = t;
  }
  get phase() {
    return this._carrier.phase;
  }
  set phase(t) {
    ((this._carrier.phase = t), (this._modulator.phase = t));
  }
  get partials() {
    return this._carrier.partials;
  }
  set partials(t) {
    this._carrier.partials = t;
  }
  asArray() {
    return ft(this, arguments, void 0, function* (t = 1024) {
      return Ue(this, t);
    });
  }
  dispose() {
    return (
      super.dispose(),
      this.frequency.dispose(),
      this.detune.dispose(),
      this.harmonicity.dispose(),
      this._carrier.dispose(),
      this._modulator.dispose(),
      this._modulationNode.dispose(),
      this._modulationScale.dispose(),
      this
    );
  }
}
class Zs extends Mt {
  constructor() {
    const t = V(Zs.getDefaults(), arguments, [
      "frequency",
      "type",
      "modulationType",
    ]);
    (super(t),
      (this.name = "FMOscillator"),
      (this._modulationNode = new Y({ context: this.context, gain: 0 })),
      (this._carrier = new lt({
        context: this.context,
        detune: t.detune,
        frequency: 0,
        onstop: () => this.onstop(this),
        phase: t.phase,
        type: t.type,
      })),
      (this.detune = this._carrier.detune),
      (this.frequency = new rt({
        context: this.context,
        units: "frequency",
        value: t.frequency,
      })),
      (this._modulator = new lt({
        context: this.context,
        phase: t.phase,
        type: t.modulationType,
      })),
      (this.harmonicity = new qe({
        context: this.context,
        units: "positive",
        value: t.harmonicity,
      })),
      (this.modulationIndex = new qe({
        context: this.context,
        units: "positive",
        value: t.modulationIndex,
      })),
      this.frequency.connect(this._carrier.frequency),
      this.frequency.chain(this.harmonicity, this._modulator.frequency),
      this.frequency.chain(this.modulationIndex, this._modulationNode),
      this._modulator.connect(this._modulationNode.gain),
      this._modulationNode.connect(this._carrier.frequency),
      this._carrier.connect(this.output),
      this.detune.connect(this._modulator.detune),
      Q(this, ["modulationIndex", "frequency", "detune", "harmonicity"]));
  }
  static getDefaults() {
    return Object.assign(lt.getDefaults(), {
      harmonicity: 1,
      modulationIndex: 2,
      modulationType: "square",
    });
  }
  _start(t) {
    (this._modulator.start(t), this._carrier.start(t));
  }
  _stop(t) {
    (this._modulator.stop(t), this._carrier.stop(t));
  }
  _restart(t) {
    return (this._modulator.restart(t), this._carrier.restart(t), this);
  }
  get type() {
    return this._carrier.type;
  }
  set type(t) {
    this._carrier.type = t;
  }
  get baseType() {
    return this._carrier.baseType;
  }
  set baseType(t) {
    this._carrier.baseType = t;
  }
  get partialCount() {
    return this._carrier.partialCount;
  }
  set partialCount(t) {
    this._carrier.partialCount = t;
  }
  get modulationType() {
    return this._modulator.type;
  }
  set modulationType(t) {
    this._modulator.type = t;
  }
  get phase() {
    return this._carrier.phase;
  }
  set phase(t) {
    ((this._carrier.phase = t), (this._modulator.phase = t));
  }
  get partials() {
    return this._carrier.partials;
  }
  set partials(t) {
    this._carrier.partials = t;
  }
  asArray() {
    return ft(this, arguments, void 0, function* (t = 1024) {
      return Ue(this, t);
    });
  }
  dispose() {
    return (
      super.dispose(),
      this.frequency.dispose(),
      this.harmonicity.dispose(),
      this._carrier.dispose(),
      this._modulator.dispose(),
      this._modulationNode.dispose(),
      this.modulationIndex.dispose(),
      this
    );
  }
}
class Zn extends Mt {
  constructor() {
    const t = V(Zn.getDefaults(), arguments, ["frequency", "width"]);
    (super(t),
      (this.name = "PulseOscillator"),
      (this._widthGate = new Y({ context: this.context, gain: 0 })),
      (this._thresh = new wn({
        context: this.context,
        mapping: (e) => (e <= 0 ? -1 : 1),
      })),
      (this.width = new rt({
        context: this.context,
        units: "audioRange",
        value: t.width,
      })),
      (this._triangle = new lt({
        context: this.context,
        detune: t.detune,
        frequency: t.frequency,
        onstop: () => this.onstop(this),
        phase: t.phase,
        type: "triangle",
      })),
      (this.frequency = this._triangle.frequency),
      (this.detune = this._triangle.detune),
      this._triangle.chain(this._thresh, this.output),
      this.width.chain(this._widthGate, this._thresh),
      Q(this, ["width", "frequency", "detune"]));
  }
  static getDefaults() {
    return Object.assign(Mt.getDefaults(), {
      detune: 0,
      frequency: 440,
      phase: 0,
      type: "pulse",
      width: 0.2,
    });
  }
  _start(t) {
    ((t = this.toSeconds(t)),
      this._triangle.start(t),
      this._widthGate.gain.setValueAtTime(1, t));
  }
  _stop(t) {
    ((t = this.toSeconds(t)),
      this._triangle.stop(t),
      this._widthGate.gain.cancelScheduledValues(t),
      this._widthGate.gain.setValueAtTime(0, t));
  }
  _restart(t) {
    (this._triangle.restart(t),
      this._widthGate.gain.cancelScheduledValues(t),
      this._widthGate.gain.setValueAtTime(1, t));
  }
  get phase() {
    return this._triangle.phase;
  }
  set phase(t) {
    this._triangle.phase = t;
  }
  get type() {
    return "pulse";
  }
  get baseType() {
    return "pulse";
  }
  get partials() {
    return [];
  }
  get partialCount() {
    return 0;
  }
  set carrierType(t) {
    this._triangle.type = t;
  }
  asArray() {
    return ft(this, arguments, void 0, function* (t = 1024) {
      return Ue(this, t);
    });
  }
  dispose() {
    return (
      super.dispose(),
      this._triangle.dispose(),
      this.width.dispose(),
      this._widthGate.dispose(),
      this._thresh.dispose(),
      this
    );
  }
}
class Hs extends Mt {
  constructor() {
    const t = V(Hs.getDefaults(), arguments, ["frequency", "type", "spread"]);
    (super(t),
      (this.name = "FatOscillator"),
      (this._oscillators = []),
      (this.frequency = new rt({
        context: this.context,
        units: "frequency",
        value: t.frequency,
      })),
      (this.detune = new rt({
        context: this.context,
        units: "cents",
        value: t.detune,
      })),
      (this._spread = t.spread),
      (this._type = t.type),
      (this._phase = t.phase),
      (this._partials = t.partials),
      (this._partialCount = t.partialCount),
      (this.count = t.count),
      Q(this, ["frequency", "detune"]));
  }
  static getDefaults() {
    return Object.assign(lt.getDefaults(), {
      count: 3,
      spread: 20,
      type: "sawtooth",
    });
  }
  _start(t) {
    ((t = this.toSeconds(t)), this._forEach((e) => e.start(t)));
  }
  _stop(t) {
    ((t = this.toSeconds(t)), this._forEach((e) => e.stop(t)));
  }
  _restart(t) {
    this._forEach((e) => e.restart(t));
  }
  _forEach(t) {
    for (let e = 0; e < this._oscillators.length; e++)
      t(this._oscillators[e], e);
  }
  get type() {
    return this._type;
  }
  set type(t) {
    ((this._type = t), this._forEach((e) => (e.type = t)));
  }
  get spread() {
    return this._spread;
  }
  set spread(t) {
    if (((this._spread = t), this._oscillators.length > 1)) {
      const e = -t / 2,
        s = t / (this._oscillators.length - 1);
      this._forEach((i, r) => (i.detune.value = e + s * r));
    }
  }
  get count() {
    return this._oscillators.length;
  }
  set count(t) {
    if ((_e(t, 1), this._oscillators.length !== t)) {
      (this._forEach((e) => e.dispose()), (this._oscillators = []));
      for (let e = 0; e < t; e++) {
        const s = new lt({
          context: this.context,
          volume: -6 - t * 1.1,
          type: this._type,
          phase: this._phase + (e / t) * 360,
          partialCount: this._partialCount,
          onstop: e === 0 ? () => this.onstop(this) : X,
        });
        (this.type === "custom" && (s.partials = this._partials),
          this.frequency.connect(s.frequency),
          this.detune.connect(s.detune),
          (s.detune.overridden = !1),
          s.connect(this.output),
          (this._oscillators[e] = s));
      }
      ((this.spread = this._spread),
        this.state === "started" && this._forEach((e) => e.start()));
    }
  }
  get phase() {
    return this._phase;
  }
  set phase(t) {
    ((this._phase = t),
      this._forEach(
        (e, s) => (e.phase = this._phase + (s / this.count) * 360),
      ));
  }
  get baseType() {
    return this._oscillators[0].baseType;
  }
  set baseType(t) {
    (this._forEach((e) => (e.baseType = t)),
      (this._type = this._oscillators[0].type));
  }
  get partials() {
    return this._oscillators[0].partials;
  }
  set partials(t) {
    ((this._partials = t),
      (this._partialCount = this._partials.length),
      t.length &&
        ((this._type = "custom"), this._forEach((e) => (e.partials = t))));
  }
  get partialCount() {
    return this._oscillators[0].partialCount;
  }
  set partialCount(t) {
    ((this._partialCount = t),
      this._forEach((e) => (e.partialCount = t)),
      (this._type = this._oscillators[0].type));
  }
  asArray() {
    return ft(this, arguments, void 0, function* (t = 1024) {
      return Ue(this, t);
    });
  }
  dispose() {
    return (
      super.dispose(),
      this.frequency.dispose(),
      this.detune.dispose(),
      this._forEach((t) => t.dispose()),
      this
    );
  }
}
class Xs extends Mt {
  constructor() {
    const t = V(Xs.getDefaults(), arguments, [
      "frequency",
      "modulationFrequency",
    ]);
    (super(t),
      (this.name = "PWMOscillator"),
      (this.sourceType = "pwm"),
      (this._scale = new qe({ context: this.context, value: 2 })),
      (this._pulse = new Zn({
        context: this.context,
        frequency: t.modulationFrequency,
      })),
      (this._pulse.carrierType = "sine"),
      (this.modulationFrequency = this._pulse.frequency),
      (this._modulator = new lt({
        context: this.context,
        detune: t.detune,
        frequency: t.frequency,
        onstop: () => this.onstop(this),
        phase: t.phase,
      })),
      (this.frequency = this._modulator.frequency),
      (this.detune = this._modulator.detune),
      this._modulator.chain(this._scale, this._pulse.width),
      this._pulse.connect(this.output),
      Q(this, ["modulationFrequency", "frequency", "detune"]));
  }
  static getDefaults() {
    return Object.assign(Mt.getDefaults(), {
      detune: 0,
      frequency: 440,
      modulationFrequency: 0.4,
      phase: 0,
      type: "pwm",
    });
  }
  _start(t) {
    ((t = this.toSeconds(t)), this._modulator.start(t), this._pulse.start(t));
  }
  _stop(t) {
    ((t = this.toSeconds(t)), this._modulator.stop(t), this._pulse.stop(t));
  }
  _restart(t) {
    (this._modulator.restart(t), this._pulse.restart(t));
  }
  get type() {
    return "pwm";
  }
  get baseType() {
    return "pwm";
  }
  get partials() {
    return [];
  }
  get partialCount() {
    return 0;
  }
  get phase() {
    return this._modulator.phase;
  }
  set phase(t) {
    this._modulator.phase = t;
  }
  asArray() {
    return ft(this, arguments, void 0, function* (t = 1024) {
      return Ue(this, t);
    });
  }
  dispose() {
    return (
      super.dispose(),
      this._pulse.dispose(),
      this._scale.dispose(),
      this._modulator.dispose(),
      this
    );
  }
}
const bo = { am: Gs, fat: Hs, fm: Zs, oscillator: lt, pulse: Zn, pwm: Xs };
class Ss extends Mt {
  constructor() {
    const t = V(Ss.getDefaults(), arguments, ["frequency", "type"]);
    (super(t),
      (this.name = "OmniOscillator"),
      (this.frequency = new rt({
        context: this.context,
        units: "frequency",
        value: t.frequency,
      })),
      (this.detune = new rt({
        context: this.context,
        units: "cents",
        value: t.detune,
      })),
      Q(this, ["frequency", "detune"]),
      this.set(t));
  }
  static getDefaults() {
    return Object.assign(
      lt.getDefaults(),
      Zs.getDefaults(),
      Gs.getDefaults(),
      Hs.getDefaults(),
      Zn.getDefaults(),
      Xs.getDefaults(),
    );
  }
  _start(t) {
    this._oscillator.start(t);
  }
  _stop(t) {
    this._oscillator.stop(t);
  }
  _restart(t) {
    return (this._oscillator.restart(t), this);
  }
  get type() {
    let t = "";
    return (
      ["am", "fm", "fat"].some((e) => this._sourceType === e) &&
        (t = this._sourceType),
      t + this._oscillator.type
    );
  }
  set type(t) {
    t.substr(0, 2) === "fm"
      ? (this._createNewOscillator("fm"),
        (this._oscillator = this._oscillator),
        (this._oscillator.type = t.substr(2)))
      : t.substr(0, 2) === "am"
        ? (this._createNewOscillator("am"),
          (this._oscillator = this._oscillator),
          (this._oscillator.type = t.substr(2)))
        : t.substr(0, 3) === "fat"
          ? (this._createNewOscillator("fat"),
            (this._oscillator = this._oscillator),
            (this._oscillator.type = t.substr(3)))
          : t === "pwm"
            ? (this._createNewOscillator("pwm"),
              (this._oscillator = this._oscillator))
            : t === "pulse"
              ? this._createNewOscillator("pulse")
              : (this._createNewOscillator("oscillator"),
                (this._oscillator = this._oscillator),
                (this._oscillator.type = t));
  }
  get partials() {
    return this._oscillator.partials;
  }
  set partials(t) {
    !this._getOscType(this._oscillator, "pulse") &&
      !this._getOscType(this._oscillator, "pwm") &&
      (this._oscillator.partials = t);
  }
  get partialCount() {
    return this._oscillator.partialCount;
  }
  set partialCount(t) {
    !this._getOscType(this._oscillator, "pulse") &&
      !this._getOscType(this._oscillator, "pwm") &&
      (this._oscillator.partialCount = t);
  }
  set(t) {
    return (
      Reflect.has(t, "type") && t.type && (this.type = t.type),
      super.set(t),
      this
    );
  }
  _createNewOscillator(t) {
    if (t !== this._sourceType) {
      this._sourceType = t;
      const e = bo[t],
        s = this.now();
      if (this._oscillator) {
        const i = this._oscillator;
        (i.stop(s), this.context.setTimeout(() => i.dispose(), this.blockTime));
      }
      ((this._oscillator = new e({ context: this.context })),
        this.frequency.connect(this._oscillator.frequency),
        this.detune.connect(this._oscillator.detune),
        this._oscillator.connect(this.output),
        (this._oscillator.onstop = () => this.onstop(this)),
        this.state === "started" && this._oscillator.start(s));
    }
  }
  get phase() {
    return this._oscillator.phase;
  }
  set phase(t) {
    this._oscillator.phase = t;
  }
  get sourceType() {
    return this._sourceType;
  }
  set sourceType(t) {
    let e = "sine";
    (this._oscillator.type !== "pwm" &&
      this._oscillator.type !== "pulse" &&
      (e = this._oscillator.type),
      t === "fm"
        ? (this.type = "fm" + e)
        : t === "am"
          ? (this.type = "am" + e)
          : t === "fat"
            ? (this.type = "fat" + e)
            : t === "oscillator"
              ? (this.type = e)
              : t === "pulse"
                ? (this.type = "pulse")
                : t === "pwm" && (this.type = "pwm"));
  }
  _getOscType(t, e) {
    return t instanceof bo[e];
  }
  get baseType() {
    return this._oscillator.baseType;
  }
  set baseType(t) {
    !this._getOscType(this._oscillator, "pulse") &&
      !this._getOscType(this._oscillator, "pwm") &&
      t !== "pulse" &&
      t !== "pwm" &&
      (this._oscillator.baseType = t);
  }
  get width() {
    if (this._getOscType(this._oscillator, "pulse"))
      return this._oscillator.width;
  }
  get count() {
    if (this._getOscType(this._oscillator, "fat"))
      return this._oscillator.count;
  }
  set count(t) {
    this._getOscType(this._oscillator, "fat") &&
      Ve(t) &&
      (this._oscillator.count = t);
  }
  get spread() {
    if (this._getOscType(this._oscillator, "fat"))
      return this._oscillator.spread;
  }
  set spread(t) {
    this._getOscType(this._oscillator, "fat") &&
      Ve(t) &&
      (this._oscillator.spread = t);
  }
  get modulationType() {
    if (
      this._getOscType(this._oscillator, "fm") ||
      this._getOscType(this._oscillator, "am")
    )
      return this._oscillator.modulationType;
  }
  set modulationType(t) {
    (this._getOscType(this._oscillator, "fm") ||
      this._getOscType(this._oscillator, "am")) &&
      se(t) &&
      (this._oscillator.modulationType = t);
  }
  get modulationIndex() {
    if (this._getOscType(this._oscillator, "fm"))
      return this._oscillator.modulationIndex;
  }
  get harmonicity() {
    if (
      this._getOscType(this._oscillator, "fm") ||
      this._getOscType(this._oscillator, "am")
    )
      return this._oscillator.harmonicity;
  }
  get modulationFrequency() {
    if (this._getOscType(this._oscillator, "pwm"))
      return this._oscillator.modulationFrequency;
  }
  asArray() {
    return ft(this, arguments, void 0, function* (t = 1024) {
      return Ue(this, t);
    });
  }
  dispose() {
    return (
      super.dispose(),
      this.detune.dispose(),
      this.frequency.dispose(),
      this._oscillator.dispose(),
      this
    );
  }
}
class Rr extends rt {
  constructor() {
    (super(V(Rr.getDefaults(), arguments, ["value"])),
      (this.override = !1),
      (this.name = "Add"),
      (this._sum = new Y({ context: this.context })),
      (this.input = this._sum),
      (this.output = this._sum),
      (this.addend = this._param),
      xs(this._constantSource, this._sum));
  }
  static getDefaults() {
    return Object.assign(rt.getDefaults(), { value: 0 });
  }
  dispose() {
    return (super.dispose(), this._sum.dispose(), this);
  }
}
class Pr extends Xt {
  constructor() {
    const t = V(Pr.getDefaults(), arguments, ["min", "max"]);
    (super(t),
      (this.name = "Scale"),
      (this._mult = this.input =
        new qe({ context: this.context, value: t.max - t.min })),
      (this._add = this.output =
        new Rr({ context: this.context, value: t.min })),
      (this._min = t.min),
      (this._max = t.max),
      this.input.connect(this.output));
  }
  static getDefaults() {
    return Object.assign(Xt.getDefaults(), { max: 1, min: 0 });
  }
  get min() {
    return this._min;
  }
  set min(t) {
    ((this._min = t), this._setRange());
  }
  get max() {
    return this._max;
  }
  set max(t) {
    ((this._max = t), this._setRange());
  }
  _setRange() {
    ((this._add.value = this._min), (this._mult.value = this._max - this._min));
  }
  dispose() {
    return (super.dispose(), this._add.dispose(), this._mult.dispose(), this);
  }
}
class Fr extends Xt {
  constructor() {
    (super(V(Fr.getDefaults(), arguments)),
      (this.name = "Zero"),
      (this._gain = new Y({ context: this.context })),
      (this.output = this._gain),
      (this.input = void 0),
      ie(this.context.getConstant(0), this._gain));
  }
  dispose() {
    return (super.dispose(), qc(this.context.getConstant(0), this._gain), this);
  }
}
class Je extends W {
  constructor() {
    const t = V(Je.getDefaults(), arguments, ["frequency", "min", "max"]);
    (super(t),
      (this.name = "LFO"),
      (this._stoppedValue = 0),
      (this._units = "number"),
      (this.convert = !0),
      (this._fromType = Z.prototype._fromType),
      (this._toType = Z.prototype._toType),
      (this._is = Z.prototype._is),
      (this._clampValue = Z.prototype._clampValue),
      (this._oscillator = new lt(t)),
      (this.frequency = this._oscillator.frequency),
      (this._amplitudeGain = new Y({
        context: this.context,
        gain: t.amplitude,
        units: "normalRange",
      })),
      (this.amplitude = this._amplitudeGain.gain),
      (this._stoppedSignal = new rt({
        context: this.context,
        units: "audioRange",
        value: 0,
      })),
      (this._zeros = new Fr({ context: this.context })),
      (this._a2g = new Wc({ context: this.context })),
      (this._scaler = this.output =
        new Pr({ context: this.context, max: t.max, min: t.min })),
      (this.units = t.units),
      (this.min = t.min),
      (this.max = t.max),
      this._oscillator.chain(this._amplitudeGain, this._a2g, this._scaler),
      this._zeros.connect(this._a2g),
      this._stoppedSignal.connect(this._a2g),
      Q(this, ["amplitude", "frequency"]),
      (this.phase = t.phase));
  }
  static getDefaults() {
    return Object.assign(lt.getDefaults(), {
      amplitude: 1,
      frequency: "4n",
      max: 1,
      min: 0,
      type: "sine",
      units: "number",
    });
  }
  start(t) {
    return (
      (t = this.toSeconds(t)),
      this._stoppedSignal.setValueAtTime(0, t),
      this._oscillator.start(t),
      this
    );
  }
  stop(t) {
    return (
      (t = this.toSeconds(t)),
      this._stoppedSignal.setValueAtTime(this._stoppedValue, t),
      this._oscillator.stop(t),
      this
    );
  }
  sync() {
    return (this._oscillator.sync(), this._oscillator.syncFrequency(), this);
  }
  unsync() {
    return (
      this._oscillator.unsync(),
      this._oscillator.unsyncFrequency(),
      this
    );
  }
  _setStoppedValue() {
    ((this._stoppedValue = this._oscillator.getInitialValue()),
      (this._stoppedSignal.value = this._stoppedValue));
  }
  get min() {
    return this._toType(this._scaler.min);
  }
  set min(t) {
    ((t = this._fromType(t)), (this._scaler.min = t));
  }
  get max() {
    return this._toType(this._scaler.max);
  }
  set max(t) {
    ((t = this._fromType(t)), (this._scaler.max = t));
  }
  get type() {
    return this._oscillator.type;
  }
  set type(t) {
    ((this._oscillator.type = t), this._setStoppedValue());
  }
  get partials() {
    return this._oscillator.partials;
  }
  set partials(t) {
    ((this._oscillator.partials = t), this._setStoppedValue());
  }
  get phase() {
    return this._oscillator.phase;
  }
  set phase(t) {
    ((this._oscillator.phase = t), this._setStoppedValue());
  }
  get units() {
    return this._units;
  }
  set units(t) {
    const e = this.min,
      s = this.max;
    ((this._units = t), (this.min = e), (this.max = s));
  }
  get state() {
    return this._oscillator.state;
  }
  connect(t, e, s) {
    return (
      (t instanceof Z || t instanceof rt) &&
        ((this.convert = t.convert), (this.units = t.units)),
      Bs(this, t, e, s),
      this
    );
  }
  dispose() {
    return (
      super.dispose(),
      this._oscillator.dispose(),
      this._stoppedSignal.dispose(),
      this._zeros.dispose(),
      this._scaler.dispose(),
      this._a2g.dispose(),
      this._amplitudeGain.dispose(),
      this.amplitude.dispose(),
      this
    );
  }
}
function jc(n, t = 1 / 0) {
  const e = new WeakMap();
  return function (s, i) {
    Reflect.defineProperty(s, i, {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return e.get(this);
      },
      set: function (r) {
        (_e(r, n, t), e.set(this, r));
      },
    });
  };
}
function ae(n, t = 1 / 0) {
  const e = new WeakMap();
  return function (s, i) {
    Reflect.defineProperty(s, i, {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return e.get(this);
      },
      set: function (r) {
        (_e(this.toSeconds(r), n, t), e.set(this, r));
      },
    });
  };
}
class Hn extends Mt {
  constructor() {
    const t = V(Hn.getDefaults(), arguments, ["url", "onload"]);
    (super(t),
      (this.name = "Player"),
      (this._activeSources = new Set()),
      (this._buffer = new st({
        onload: this._onload.bind(this, t.onload),
        onerror: t.onerror,
        reverse: t.reverse,
        url: t.url,
      })),
      (this.autostart = t.autostart),
      (this._loop = t.loop),
      (this._loopStart = t.loopStart),
      (this._loopEnd = t.loopEnd),
      (this._playbackRate = t.playbackRate),
      (this.fadeIn = t.fadeIn),
      (this.fadeOut = t.fadeOut));
  }
  static getDefaults() {
    return Object.assign(Mt.getDefaults(), {
      autostart: !1,
      fadeIn: 0,
      fadeOut: 0,
      loop: !1,
      loopEnd: 0,
      loopStart: 0,
      onload: X,
      onerror: X,
      playbackRate: 1,
      reverse: !1,
    });
  }
  load(t) {
    return ft(this, void 0, void 0, function* () {
      return (yield this._buffer.load(t), this._onload(), this);
    });
  }
  _onload(t = X) {
    (t(), this.autostart && this.start());
  }
  _onSourceEnd(t) {
    (this.onstop(this),
      this._activeSources.delete(t),
      this._activeSources.size === 0 &&
        !this._synced &&
        this._state.getValueAtTime(this.now()) === "started" &&
        (this._state.cancel(this.now()),
        this._state.setStateAtTime("stopped", this.now())));
  }
  start(t, e, s) {
    return (super.start(t, e, s), this);
  }
  _start(t, e, s) {
    this._loop ? (e = Qe(e, this._loopStart)) : (e = Qe(e, 0));
    const i = this.toSeconds(e),
      r = s;
    s = Qe(s, Math.max(this._buffer.duration - i, 0));
    let o = this.toSeconds(s);
    ((o = o / this._playbackRate), (t = this.toSeconds(t)));
    const a = new zs({
      url: this._buffer,
      context: this.context,
      fadeIn: this.fadeIn,
      fadeOut: this.fadeOut,
      loop: this._loop,
      loopEnd: this._loopEnd,
      loopStart: this._loopStart,
      onended: this._onSourceEnd.bind(this),
      playbackRate: this._playbackRate,
    }).connect(this.output);
    (!this._loop &&
      !this._synced &&
      (this._state.cancel(t + o),
      this._state.setStateAtTime("stopped", t + o, { implicitEnd: !0 })),
      this._activeSources.add(a),
      this._loop && Pt(r)
        ? a.start(t, i)
        : a.start(t, i, o - this.toSeconds(this.fadeOut)));
  }
  _stop(t) {
    const e = this.toSeconds(t);
    this._activeSources.forEach((s) => s.stop(e));
  }
  restart(t, e, s) {
    return (super.restart(t, e, s), this);
  }
  _restart(t, e, s) {
    var i;
    ((i = [...this._activeSources].pop()) === null || i === void 0 || i.stop(t),
      this._start(t, e, s));
  }
  seek(t, e) {
    const s = this.toSeconds(e);
    if (this._state.getValueAtTime(s) === "started") {
      const i = this.toSeconds(t);
      (this._stop(s), this._start(s, i));
    }
    return this;
  }
  setLoopPoints(t, e) {
    return ((this.loopStart = t), (this.loopEnd = e), this);
  }
  get loopStart() {
    return this._loopStart;
  }
  set loopStart(t) {
    ((this._loopStart = t),
      this.buffer.loaded && _e(this.toSeconds(t), 0, this.buffer.duration),
      this._activeSources.forEach((e) => {
        e.loopStart = t;
      }));
  }
  get loopEnd() {
    return this._loopEnd;
  }
  set loopEnd(t) {
    ((this._loopEnd = t),
      this.buffer.loaded && _e(this.toSeconds(t), 0, this.buffer.duration),
      this._activeSources.forEach((e) => {
        e.loopEnd = t;
      }));
  }
  get buffer() {
    return this._buffer;
  }
  set buffer(t) {
    this._buffer.set(t);
  }
  get loop() {
    return this._loop;
  }
  set loop(t) {
    if (
      this._loop !== t &&
      ((this._loop = t),
      this._activeSources.forEach((e) => {
        e.loop = t;
      }),
      t)
    ) {
      const e = this._state.getNextState("stopped", this.now());
      e && this._state.cancel(e.time);
    }
  }
  get playbackRate() {
    return this._playbackRate;
  }
  set playbackRate(t) {
    this._playbackRate = t;
    const e = this.now(),
      s = this._state.getNextState("stopped", e);
    (s &&
      s.implicitEnd &&
      (this._state.cancel(s.time),
      this._activeSources.forEach((i) => i.cancelStop())),
      this._activeSources.forEach((i) => {
        i.playbackRate.setValueAtTime(t, e);
      }));
  }
  get reverse() {
    return this._buffer.reverse;
  }
  set reverse(t) {
    this._buffer.reverse = t;
  }
  get loaded() {
    return this._buffer.loaded;
  }
  dispose() {
    return (
      super.dispose(),
      this._activeSources.forEach((t) => t.dispose()),
      this._activeSources.clear(),
      this._buffer.dispose(),
      this
    );
  }
}
Gt([ae(0)], Hn.prototype, "fadeIn", void 0);
Gt([ae(0)], Hn.prototype, "fadeOut", void 0);
class B_ extends Xt {
  constructor() {
    (super(...arguments),
      (this.name = "GainToAudio"),
      (this._norm = new wn({
        context: this.context,
        mapping: (t) => Math.abs(t) * 2 - 1,
      })),
      (this.input = this._norm),
      (this.output = this._norm));
  }
  dispose() {
    return (super.dispose(), this._norm.dispose(), this);
  }
}
class Te extends W {
  constructor() {
    const t = V(Te.getDefaults(), arguments, [
      "attack",
      "decay",
      "sustain",
      "release",
    ]);
    (super(t),
      (this.name = "Envelope"),
      (this._sig = new rt({ context: this.context, value: 0 })),
      (this.output = this._sig),
      (this.input = void 0),
      (this.attack = t.attack),
      (this.decay = t.decay),
      (this.sustain = t.sustain),
      (this.release = t.release),
      (this.attackCurve = t.attackCurve),
      (this.releaseCurve = t.releaseCurve),
      (this.decayCurve = t.decayCurve));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), {
      attack: 0.01,
      attackCurve: "linear",
      decay: 0.1,
      decayCurve: "exponential",
      release: 1,
      releaseCurve: "exponential",
      sustain: 0.5,
    });
  }
  get value() {
    return this.getValueAtTime(this.now());
  }
  _getCurve(t, e) {
    if (se(t)) return t;
    {
      let s;
      for (s in ss) if (ss[s][e] === t) return s;
      return t;
    }
  }
  _setCurve(t, e, s) {
    if (se(s) && Reflect.has(ss, s)) {
      const i = ss[s];
      Re(i) ? t !== "_decayCurve" && (this[t] = i[e]) : (this[t] = i);
    } else if (Wt(s) && t !== "_decayCurve") this[t] = s;
    else throw new Error("Envelope: invalid curve: " + s);
  }
  get attackCurve() {
    return this._getCurve(this._attackCurve, "In");
  }
  set attackCurve(t) {
    this._setCurve("_attackCurve", "In", t);
  }
  get releaseCurve() {
    return this._getCurve(this._releaseCurve, "Out");
  }
  set releaseCurve(t) {
    this._setCurve("_releaseCurve", "Out", t);
  }
  get decayCurve() {
    return this._getCurve(this._decayCurve, "Out");
  }
  set decayCurve(t) {
    this._setCurve("_decayCurve", "Out", t);
  }
  triggerAttack(t, e = 1) {
    (this.log("triggerAttack", t, e), (t = this.toSeconds(t)));
    let i = this.toSeconds(this.attack);
    const r = this.toSeconds(this.decay),
      o = this.getValueAtTime(t);
    if (o > 0) {
      const a = 1 / i;
      i = (1 - o) / a;
    }
    if (i < this.sampleTime)
      (this._sig.cancelScheduledValues(t), this._sig.setValueAtTime(e, t));
    else if (this._attackCurve === "linear") this._sig.linearRampTo(e, i, t);
    else if (this._attackCurve === "exponential")
      this._sig.targetRampTo(e, i, t);
    else {
      this._sig.cancelAndHoldAtTime(t);
      let a = this._attackCurve;
      for (let c = 1; c < a.length; c++)
        if (a[c - 1] <= o && o <= a[c]) {
          ((a = this._attackCurve.slice(c)), (a[0] = o));
          break;
        }
      this._sig.setValueCurveAtTime(a, t, i, e);
    }
    if (r && this.sustain < 1) {
      const a = e * this.sustain,
        c = t + i;
      (this.log("decay", c),
        this._decayCurve === "linear"
          ? this._sig.linearRampToValueAtTime(a, r + c)
          : this._sig.exponentialApproachValueAtTime(a, c, r));
    }
    return this;
  }
  triggerRelease(t) {
    (this.log("triggerRelease", t), (t = this.toSeconds(t)));
    const e = this.getValueAtTime(t);
    if (e > 0) {
      const s = this.toSeconds(this.release);
      s < this.sampleTime
        ? this._sig.setValueAtTime(0, t)
        : this._releaseCurve === "linear"
          ? this._sig.linearRampTo(0, s, t)
          : this._releaseCurve === "exponential"
            ? this._sig.targetRampTo(0, s, t)
            : (B(
                Wt(this._releaseCurve),
                "releaseCurve must be either 'linear', 'exponential' or an array",
              ),
              this._sig.cancelAndHoldAtTime(t),
              this._sig.setValueCurveAtTime(this._releaseCurve, t, s, e));
    }
    return this;
  }
  getValueAtTime(t) {
    return this._sig.getValueAtTime(t);
  }
  triggerAttackRelease(t, e, s = 1) {
    return (
      (e = this.toSeconds(e)),
      this.triggerAttack(e, s),
      this.triggerRelease(e + this.toSeconds(t)),
      this
    );
  }
  cancel(t) {
    return (this._sig.cancelScheduledValues(this.toSeconds(t)), this);
  }
  connect(t, e = 0, s = 0) {
    return (Bs(this, t, e, s), this);
  }
  asArray() {
    return ft(this, arguments, void 0, function* (t = 1024) {
      const e = t / this.context.sampleRate,
        s = new br(1, e, this.context.sampleRate),
        i = this.toSeconds(this.attack) + this.toSeconds(this.decay),
        r = i + this.toSeconds(this.release),
        o = r * 0.1,
        a = r + o,
        c = new this.constructor(
          Object.assign(this.get(), {
            attack: (e * this.toSeconds(this.attack)) / a,
            decay: (e * this.toSeconds(this.decay)) / a,
            release: (e * this.toSeconds(this.release)) / a,
            context: s,
          }),
        );
      return (
        c._sig.toDestination(),
        c.triggerAttackRelease((e * (i + o)) / a, 0),
        (yield s.render()).getChannelData(0)
      );
    });
  }
  dispose() {
    return (super.dispose(), this._sig.dispose(), this);
  }
}
Gt([ae(0)], Te.prototype, "attack", void 0);
Gt([ae(0)], Te.prototype, "decay", void 0);
Gt([jc(0, 1)], Te.prototype, "sustain", void 0);
Gt([ae(0)], Te.prototype, "release", void 0);
const ss = (() => {
  let t, e;
  const s = [];
  for (t = 0; t < 128; t++) s[t] = Math.sin((t / 127) * (Math.PI / 2));
  const i = [],
    r = 6.4;
  for (t = 0; t < 127; t++) {
    e = t / 127;
    const d = Math.sin(e * (Math.PI * 2) * r - Math.PI / 2) + 1;
    i[t] = d / 10 + e * 0.83;
  }
  i[127] = 1;
  const o = [],
    a = 5;
  for (t = 0; t < 128; t++) o[t] = Math.ceil((t / 127) * a) / a;
  const c = [];
  for (t = 0; t < 128; t++)
    ((e = t / 127), (c[t] = 0.5 * (1 - Math.cos(Math.PI * e))));
  const u = [];
  for (t = 0; t < 128; t++) {
    e = t / 127;
    const d = Math.pow(e, 3) * 4 + 0.2,
      p = Math.cos(d * Math.PI * 2 * e);
    u[t] = Math.abs(p * (1 - e));
  }
  function l(d) {
    const p = new Array(d.length);
    for (let f = 0; f < d.length; f++) p[f] = 1 - d[f];
    return p;
  }
  function h(d) {
    return d.slice(0).reverse();
  }
  return {
    bounce: { In: l(u), Out: u },
    cosine: { In: s, Out: h(s) },
    exponential: "exponential",
    linear: "linear",
    ripple: { In: i, Out: l(i) },
    sine: { In: c, Out: l(c) },
    step: { In: o, Out: l(o) },
  };
})();
class an extends W {
  constructor() {
    const t = V(an.getDefaults(), arguments);
    (super(t),
      (this._scheduledEvents = []),
      (this._synced = !1),
      (this._original_triggerAttack = this.triggerAttack),
      (this._original_triggerRelease = this.triggerRelease),
      (this._syncedRelease = (e) => this._original_triggerRelease(e)),
      (this._volume = this.output =
        new vn({ context: this.context, volume: t.volume })),
      (this.volume = this._volume.volume),
      Q(this, "volume"));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), { volume: 0 });
  }
  sync() {
    return (
      this._syncState() &&
        (this._syncMethod("triggerAttack", 1),
        this._syncMethod("triggerRelease", 0),
        this.context.transport.on("stop", this._syncedRelease),
        this.context.transport.on("pause", this._syncedRelease),
        this.context.transport.on("loopEnd", this._syncedRelease)),
      this
    );
  }
  _syncState() {
    let t = !1;
    return (this._synced || ((this._synced = !0), (t = !0)), t);
  }
  _syncMethod(t, e) {
    const s = (this["_original_" + t] = this[t]);
    this[t] = (...i) => {
      const r = i[e],
        o = this.context.transport.schedule((a) => {
          ((i[e] = a), s.apply(this, i));
        }, r);
      this._scheduledEvents.push(o);
    };
  }
  unsync() {
    return (
      this._scheduledEvents.forEach((t) => this.context.transport.clear(t)),
      (this._scheduledEvents = []),
      this._synced &&
        ((this._synced = !1),
        (this.triggerAttack = this._original_triggerAttack),
        (this.triggerRelease = this._original_triggerRelease),
        this.context.transport.off("stop", this._syncedRelease),
        this.context.transport.off("pause", this._syncedRelease),
        this.context.transport.off("loopEnd", this._syncedRelease)),
      this
    );
  }
  triggerAttackRelease(t, e, s, i) {
    const r = this.toSeconds(s),
      o = this.toSeconds(e);
    return (this.triggerAttack(t, r, i), this.triggerRelease(r + o), this);
  }
  dispose() {
    return (
      super.dispose(),
      this._volume.dispose(),
      this.unsync(),
      (this._scheduledEvents = []),
      this
    );
  }
}
class cn extends an {
  constructor() {
    const t = V(cn.getDefaults(), arguments);
    (super(t),
      (this.portamento = t.portamento),
      (this.onsilence = t.onsilence));
  }
  static getDefaults() {
    return Object.assign(an.getDefaults(), {
      detune: 0,
      onsilence: X,
      portamento: 0,
    });
  }
  triggerAttack(t, e, s = 1) {
    this.log("triggerAttack", t, e, s);
    const i = this.toSeconds(e);
    return (this._triggerEnvelopeAttack(i, s), this.setNote(t, i), this);
  }
  triggerRelease(t) {
    this.log("triggerRelease", t);
    const e = this.toSeconds(t);
    return (this._triggerEnvelopeRelease(e), this);
  }
  setNote(t, e) {
    const s = this.toSeconds(e),
      i = t instanceof Rt ? t.toFrequency() : t;
    if (this.portamento > 0 && this.getLevelAtTime(s) > 0.05) {
      const r = this.toSeconds(this.portamento);
      this.frequency.exponentialRampTo(i, r, s);
    } else this.frequency.setValueAtTime(i, s);
    return this;
  }
}
Gt([ae(0)], cn.prototype, "portamento", void 0);
class Vr extends Te {
  constructor() {
    (super(
      V(Vr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"]),
    ),
      (this.name = "AmplitudeEnvelope"),
      (this._gainNode = new Y({ context: this.context, gain: 0 })),
      (this.output = this._gainNode),
      (this.input = this._gainNode),
      this._sig.connect(this._gainNode.gain),
      (this.output = this._gainNode),
      (this.input = this._gainNode));
  }
  dispose() {
    return (super.dispose(), this._gainNode.dispose(), this);
  }
}
class Cs extends cn {
  constructor() {
    const t = V(Cs.getDefaults(), arguments);
    (super(t),
      (this.name = "Synth"),
      (this.oscillator = new Ss(
        Object.assign(
          {
            context: this.context,
            detune: t.detune,
            onstop: () => this.onsilence(this),
          },
          t.oscillator,
        ),
      )),
      (this.frequency = this.oscillator.frequency),
      (this.detune = this.oscillator.detune),
      (this.envelope = new Vr(
        Object.assign({ context: this.context }, t.envelope),
      )),
      this.oscillator.chain(this.envelope, this.output),
      Q(this, ["oscillator", "frequency", "detune", "envelope"]));
  }
  static getDefaults() {
    return Object.assign(cn.getDefaults(), {
      envelope: Object.assign(
        To(Te.getDefaults(), Object.keys(W.getDefaults())),
        { attack: 0.005, decay: 0.1, release: 1, sustain: 0.3 },
      ),
      oscillator: Object.assign(
        To(Ss.getDefaults(), [
          ...Object.keys(Mt.getDefaults()),
          "frequency",
          "detune",
        ]),
        { type: "triangle" },
      ),
    });
  }
  _triggerEnvelopeAttack(t, e) {
    if (
      (this.envelope.triggerAttack(t, e),
      this.oscillator.start(t),
      this.envelope.sustain === 0)
    ) {
      const s = this.toSeconds(this.envelope.attack),
        i = this.toSeconds(this.envelope.decay);
      this.oscillator.stop(t + s + i);
    }
  }
  _triggerEnvelopeRelease(t) {
    (this.envelope.triggerRelease(t),
      this.oscillator.stop(t + this.toSeconds(this.envelope.release)));
  }
  getLevelAtTime(t) {
    return ((t = this.toSeconds(t)), this.envelope.getValueAtTime(t));
  }
  dispose() {
    return (
      super.dispose(),
      this.oscillator.dispose(),
      this.envelope.dispose(),
      this
    );
  }
}
class Ys extends Cs {
  constructor() {
    const t = V(Ys.getDefaults(), arguments);
    (super(t),
      (this.name = "MembraneSynth"),
      (this.portamento = 0),
      (this.pitchDecay = t.pitchDecay),
      (this.octaves = t.octaves),
      Q(this, ["oscillator", "envelope"]));
  }
  static getDefaults() {
    return Ke(cn.getDefaults(), Cs.getDefaults(), {
      envelope: {
        attack: 0.001,
        attackCurve: "exponential",
        decay: 0.4,
        release: 1.4,
        sustain: 0.01,
      },
      octaves: 10,
      oscillator: { type: "sine" },
      pitchDecay: 0.05,
    });
  }
  setNote(t, e) {
    const s = this.toSeconds(e),
      i = this.toFrequency(t instanceof Rt ? t.toFrequency() : t),
      r = i * this.octaves;
    return (
      this.oscillator.frequency.setValueAtTime(r, s),
      this.oscillator.frequency.exponentialRampToValueAtTime(
        i,
        s + this.toSeconds(this.pitchDecay),
      ),
      this
    );
  }
  dispose() {
    return (super.dispose(), this);
  }
}
Gt([jc(0)], Ys.prototype, "octaves", void 0);
Gt([ae(0)], Ys.prototype, "pitchDecay", void 0);
const Bc = new Set();
function Lr(n) {
  Bc.add(n);
}
function Uc(n, t) {
  const e = `registerProcessor("${n}", ${t})`;
  Bc.add(e);
}
const U_ = `
	/**
	 * The base AudioWorkletProcessor for use in Tone.js. Works with the {@link ToneAudioWorklet}. 
	 */
	class ToneAudioWorkletProcessor extends AudioWorkletProcessor {

		constructor(options) {
			
			super(options);
			/**
			 * If the processor was disposed or not. Keep alive until it's disposed.
			 */
			this.disposed = false;
		   	/** 
			 * The number of samples in the processing block
			 */
			this.blockSize = 128;
			/**
			 * the sample rate
			 */
			this.sampleRate = sampleRate;

			this.port.onmessage = (event) => {
				// when it receives a dispose 
				if (event.data === "dispose") {
					this.disposed = true;
				}
			};
		}
	}
`;
Lr(U_);
const $_ = `
	/**
	 * Abstract class for a single input/output processor. 
	 * has a 'generate' function which processes one sample at a time
	 */
	class SingleIOProcessor extends ToneAudioWorkletProcessor {

		constructor(options) {
			super(Object.assign(options, {
				numberOfInputs: 1,
				numberOfOutputs: 1
			}));
			/**
			 * Holds the name of the parameter and a single value of that
			 * parameter at the current sample
			 * @type { [name: string]: number }
			 */
			this.params = {}
		}

		/**
		 * Generate an output sample from the input sample and parameters
		 * @abstract
		 * @param input number
		 * @param channel number
		 * @param parameters { [name: string]: number }
		 * @returns number
		 */
		generate(){}

		/**
		 * Update the private params object with the 
		 * values of the parameters at the given index
		 * @param parameters { [name: string]: Float32Array },
		 * @param index number
		 */
		updateParams(parameters, index) {
			for (const paramName in parameters) {
				const param = parameters[paramName];
				if (param.length > 1) {
					this.params[paramName] = parameters[paramName][index];
				} else {
					this.params[paramName] = parameters[paramName][0];
				}
			}
		}

		/**
		 * Process a single frame of the audio
		 * @param inputs Float32Array[][]
		 * @param outputs Float32Array[][]
		 */
		process(inputs, outputs, parameters) {
			const input = inputs[0];
			const output = outputs[0];
			// get the parameter values
			const channelCount = Math.max(input && input.length || 0, output.length);
			for (let sample = 0; sample < this.blockSize; sample++) {
				this.updateParams(parameters, sample);
				for (let channel = 0; channel < channelCount; channel++) {
					const inputSample = input && input.length ? input[channel][sample] : 0;
					output[channel][sample] = this.generate(inputSample, channel, this.params);
				}
			}
			return !this.disposed;
		}
	};
`;
Lr($_);
const z_ = `
	/**
	 * A multichannel buffer for use within an AudioWorkletProcessor as a delay line
	 */
	class DelayLine {
		
		constructor(size, channels) {
			this.buffer = [];
			this.writeHead = []
			this.size = size;

			// create the empty channels
			for (let i = 0; i < channels; i++) {
				this.buffer[i] = new Float32Array(this.size);
				this.writeHead[i] = 0;
			}
		}

		/**
		 * Push a value onto the end
		 * @param channel number
		 * @param value number
		 */
		push(channel, value) {
			this.writeHead[channel] += 1;
			if (this.writeHead[channel] > this.size) {
				this.writeHead[channel] = 0;
			}
			this.buffer[channel][this.writeHead[channel]] = value;
		}

		/**
		 * Get the recorded value of the channel given the delay
		 * @param channel number
		 * @param delay number delay samples
		 */
		get(channel, delay) {
			let readHead = this.writeHead[channel] - Math.floor(delay);
			if (readHead < 0) {
				readHead += this.size;
			}
			return this.buffer[channel][readHead];
		}
	}
`;
Lr(z_);
const G_ = "feedback-comb-filter",
  Z_ = `
	class FeedbackCombFilterWorklet extends SingleIOProcessor {

		constructor(options) {
			super(options);
			this.delayLine = new DelayLine(this.sampleRate, options.channelCount || 2);
		}

		static get parameterDescriptors() {
			return [{
				name: "delayTime",
				defaultValue: 0.1,
				minValue: 0,
				maxValue: 1,
				automationRate: "k-rate"
			}, {
				name: "feedback",
				defaultValue: 0.5,
				minValue: 0,
				maxValue: 0.9999,
				automationRate: "k-rate"
			}];
		}

		generate(input, channel, parameters) {
			const delayedSample = this.delayLine.get(channel, parameters.delayTime * this.sampleRate);
			this.delayLine.push(channel, input + delayedSample * parameters.feedback);
			return delayedSample;
		}
	}
`;
Uc(G_, Z_);
class Ks extends an {
  constructor() {
    const t = V(
      Ks.getDefaults(),
      arguments,
      ["urls", "onload", "baseUrl"],
      "urls",
    );
    (super(t), (this.name = "Sampler"), (this._activeSources = new Map()));
    const e = {};
    (Object.keys(t.urls).forEach((s) => {
      const i = parseInt(s, 10);
      if (
        (B(
          ns(s) || (Ve(i) && isFinite(i)),
          `url key is neither a note or midi pitch: ${s}`,
        ),
        ns(s))
      ) {
        const r = new Rt(this.context, s).toMidi();
        e[r] = t.urls[s];
      } else Ve(i) && isFinite(i) && (e[i] = t.urls[i]);
    }),
      (this._buffers = new Er({
        urls: e,
        onload: t.onload,
        baseUrl: t.baseUrl,
        onerror: t.onerror,
      })),
      (this.attack = t.attack),
      (this.release = t.release),
      (this.curve = t.curve),
      this._buffers.loaded && Promise.resolve().then(t.onload));
  }
  static getDefaults() {
    return Object.assign(an.getDefaults(), {
      attack: 0,
      baseUrl: "",
      curve: "exponential",
      onload: X,
      onerror: X,
      release: 0.1,
      urls: {},
    });
  }
  _findClosest(t) {
    let s = 0;
    for (; s < 96;) {
      if (this._buffers.has(t + s)) return -s;
      if (this._buffers.has(t - s)) return s;
      s++;
    }
    throw new Error(`No available buffers for note: ${t}`);
  }
  triggerAttack(t, e, s = 1) {
    return (
      this.log("triggerAttack", t, e, s),
      Array.isArray(t) || (t = [t]),
      t.forEach((i) => {
        const r = Lc(new Rt(this.context, i).toFrequency()),
          o = Math.round(r),
          a = r - o,
          c = this._findClosest(o),
          u = o - c,
          l = this._buffers.get(u),
          h = bs(c + a),
          d = new zs({
            url: l,
            context: this.context,
            curve: this.curve,
            fadeIn: this.attack,
            fadeOut: this.release,
            playbackRate: h,
          }).connect(this.output);
        (d.start(e, 0, l.duration / h, s),
          Wt(this._activeSources.get(o)) || this._activeSources.set(o, []),
          this._activeSources.get(o).push(d),
          (d.onended = () => {
            if (this._activeSources && this._activeSources.has(o)) {
              const p = this._activeSources.get(o),
                f = p.indexOf(d);
              f !== -1 && p.splice(f, 1);
            }
          }));
      }),
      this
    );
  }
  triggerRelease(t, e) {
    return (
      this.log("triggerRelease", t, e),
      Array.isArray(t) || (t = [t]),
      t.forEach((s) => {
        const i = new Rt(this.context, s).toMidi();
        if (this._activeSources.has(i) && this._activeSources.get(i).length) {
          const r = this._activeSources.get(i);
          ((e = this.toSeconds(e)),
            r.forEach((o) => {
              o.stop(e);
            }),
            this._activeSources.set(i, []));
        }
      }),
      this
    );
  }
  releaseAll(t) {
    const e = this.toSeconds(t);
    return (
      this._activeSources.forEach((s) => {
        for (; s.length;) s.shift().stop(e);
      }),
      this
    );
  }
  sync() {
    return (
      this._syncState() &&
        (this._syncMethod("triggerAttack", 1),
        this._syncMethod("triggerRelease", 1)),
      this
    );
  }
  triggerAttackRelease(t, e, s, i = 1) {
    const r = this.toSeconds(s);
    return (
      this.triggerAttack(t, r, i),
      Wt(e)
        ? (B(Wt(t), "notes must be an array when duration is array"),
          t.forEach((o, a) => {
            const c = e[Math.min(a, e.length - 1)];
            this.triggerRelease(o, r + this.toSeconds(c));
          }))
        : this.triggerRelease(t, r + this.toSeconds(e)),
      this
    );
  }
  add(t, e, s) {
    if (
      (B(ns(t) || isFinite(t), `note must be a pitch or midi: ${t}`), ns(t))
    ) {
      const i = new Rt(this.context, t).toMidi();
      this._buffers.add(i, e, s);
    } else this._buffers.add(t, e, s);
    return this;
  }
  get loaded() {
    return this._buffers.loaded;
  }
  dispose() {
    return (
      super.dispose(),
      this._buffers.dispose(),
      this._activeSources.forEach((t) => {
        t.forEach((e) => e.dispose());
      }),
      this._activeSources.clear(),
      this
    );
  }
}
Gt([ae(0)], Ks.prototype, "attack", void 0);
Gt([ae(0)], Ks.prototype, "release", void 0);
class Qs extends W {
  constructor() {
    const t = V(Qs.getDefaults(), arguments, ["fade"]);
    (super(t),
      (this.name = "CrossFade"),
      (this._panner = this.context.createStereoPanner()),
      (this._split = this.context.createChannelSplitter(2)),
      (this._g2a = new B_({ context: this.context })),
      (this.a = new Y({ context: this.context, gain: 0 })),
      (this.b = new Y({ context: this.context, gain: 0 })),
      (this.output = new Y({ context: this.context })),
      (this._internalChannels = [this.a, this.b]),
      (this.fade = new rt({
        context: this.context,
        units: "normalRange",
        value: t.fade,
      })),
      Q(this, "fade"),
      this.context.getConstant(1).connect(this._panner),
      this._panner.connect(this._split),
      (this._panner.channelCount = 1),
      (this._panner.channelCountMode = "explicit"),
      ie(this._split, this.a.gain, 0),
      ie(this._split, this.b.gain, 1),
      this.fade.chain(this._g2a, this._panner.pan),
      this.a.connect(this.output),
      this.b.connect(this.output));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), { fade: 0.5 });
  }
  dispose() {
    return (
      super.dispose(),
      this.a.dispose(),
      this.b.dispose(),
      this.output.dispose(),
      this.fade.dispose(),
      this._g2a.dispose(),
      this._panner.disconnect(),
      this._split.disconnect(),
      this
    );
  }
}
class xo extends W {
  constructor(t) {
    (super(t),
      (this.name = "Effect"),
      (this._dryWet = new Qs({ context: this.context })),
      (this.wet = this._dryWet.fade),
      (this.effectSend = new Y({ context: this.context })),
      (this.effectReturn = new Y({ context: this.context })),
      (this.input = new Y({ context: this.context })),
      (this.output = this._dryWet),
      this.input.fan(this._dryWet.a, this.effectSend),
      this.effectReturn.connect(this._dryWet.b),
      this.wet.setValueAtTime(t.wet, 0),
      (this._internalChannels = [this.effectReturn, this.effectSend]),
      Q(this, "wet"));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), { wet: 1 });
  }
  connectEffect(t) {
    return (
      this._internalChannels.push(t),
      this.effectSend.chain(t, this.effectReturn),
      this
    );
  }
  dispose() {
    return (
      super.dispose(),
      this._dryWet.dispose(),
      this.effectSend.dispose(),
      this.effectReturn.dispose(),
      this.wet.dispose(),
      this
    );
  }
}
class Js extends W {
  constructor() {
    const t = V(Js.getDefaults(), arguments, ["pan"]);
    (super(t),
      (this.name = "Panner"),
      (this._panner = this.context.createStereoPanner()),
      (this.input = this._panner),
      (this.output = this._panner),
      (this.pan = new Z({
        context: this.context,
        param: this._panner.pan,
        value: t.pan,
        minValue: -1,
        maxValue: 1,
      })),
      (this._panner.channelCount = t.channelCount),
      (this._panner.channelCountMode = "explicit"),
      Q(this, "pan"));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), { pan: 0, channelCount: 1 });
  }
  dispose() {
    return (
      super.dispose(),
      this._panner.disconnect(),
      this.pan.dispose(),
      this
    );
  }
}
const H_ = "bit-crusher",
  X_ = `
	class BitCrusherWorklet extends SingleIOProcessor {

		static get parameterDescriptors() {
			return [{
				name: "bits",
				defaultValue: 12,
				minValue: 1,
				maxValue: 16,
				automationRate: 'k-rate'
			}];
		}

		generate(input, _channel, parameters) {
			const step = Math.pow(0.5, parameters.bits - 1);
			const val = step * Math.floor(input / step + 0.5);
			return val;
		}
	}
`;
Uc(H_, X_);
class So extends xo {
  constructor(t) {
    (super(t),
      (this.name = "FeedbackEffect"),
      (this._feedbackGain = new Y({
        context: this.context,
        gain: t.feedback,
        units: "normalRange",
      })),
      (this.feedback = this._feedbackGain.gain),
      Q(this, "feedback"),
      this.effectReturn.chain(this._feedbackGain, this.effectSend));
  }
  static getDefaults() {
    return Object.assign(xo.getDefaults(), { feedback: 0.125 });
  }
  dispose() {
    return (
      super.dispose(),
      this._feedbackGain.dispose(),
      this.feedback.dispose(),
      this
    );
  }
}
class qr extends So {
  constructor() {
    const t = V(qr.getDefaults(), arguments, ["pitch"]);
    (super(t),
      (this.name = "PitchShift"),
      (this._frequency = new rt({ context: this.context })),
      (this._delayA = new On({ maxDelay: 1, context: this.context })),
      (this._lfoA = new Je({
        context: this.context,
        min: 0,
        max: 0.1,
        type: "sawtooth",
      }).connect(this._delayA.delayTime)),
      (this._delayB = new On({ maxDelay: 1, context: this.context })),
      (this._lfoB = new Je({
        context: this.context,
        min: 0,
        max: 0.1,
        type: "sawtooth",
        phase: 180,
      }).connect(this._delayB.delayTime)),
      (this._crossFade = new Qs({ context: this.context })),
      (this._crossFadeLFO = new Je({
        context: this.context,
        min: 0,
        max: 1,
        type: "triangle",
        phase: 90,
      }).connect(this._crossFade.fade)),
      (this._feedbackDelay = new On({
        delayTime: t.delayTime,
        context: this.context,
      })),
      (this.delayTime = this._feedbackDelay.delayTime),
      Q(this, "delayTime"),
      (this._pitch = t.pitch),
      (this._windowSize = t.windowSize),
      this._delayA.connect(this._crossFade.a),
      this._delayB.connect(this._crossFade.b),
      this._frequency.fan(
        this._lfoA.frequency,
        this._lfoB.frequency,
        this._crossFadeLFO.frequency,
      ),
      this.effectSend.fan(this._delayA, this._delayB),
      this._crossFade.chain(this._feedbackDelay, this.effectReturn));
    const e = this.now();
    (this._lfoA.start(e),
      this._lfoB.start(e),
      this._crossFadeLFO.start(e),
      (this.windowSize = this._windowSize));
  }
  static getDefaults() {
    return Object.assign(So.getDefaults(), {
      pitch: 0,
      windowSize: 0.1,
      delayTime: 0,
      feedback: 0,
    });
  }
  get pitch() {
    return this._pitch;
  }
  set pitch(t) {
    this._pitch = t;
    let e = 0;
    (t < 0
      ? ((this._lfoA.min = 0),
        (this._lfoA.max = this._windowSize),
        (this._lfoB.min = 0),
        (this._lfoB.max = this._windowSize),
        (e = bs(t - 1) + 1))
      : ((this._lfoA.min = this._windowSize),
        (this._lfoA.max = 0),
        (this._lfoB.min = this._windowSize),
        (this._lfoB.max = 0),
        (e = bs(t) - 1)),
      (this._frequency.value = e * (1.2 / this._windowSize)));
  }
  get windowSize() {
    return this._windowSize;
  }
  set windowSize(t) {
    ((this._windowSize = this.toSeconds(t)), (this.pitch = this._pitch));
  }
  dispose() {
    return (
      super.dispose(),
      this._frequency.dispose(),
      this._delayA.dispose(),
      this._delayB.dispose(),
      this._lfoA.dispose(),
      this._lfoB.dispose(),
      this._crossFade.dispose(),
      this._crossFadeLFO.dispose(),
      this._feedbackDelay.dispose(),
      this
    );
  }
}
class dt extends W {
  constructor() {
    const t = V(dt.getDefaults(), arguments, ["solo"]);
    (super(t),
      (this.name = "Solo"),
      (this.input = this.output = new Y({ context: this.context })),
      dt._allSolos.has(this.context) ||
        dt._allSolos.set(this.context, new Set()),
      dt._allSolos.get(this.context).add(this),
      (this.solo = t.solo));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), { solo: !1 });
  }
  get solo() {
    return this._isSoloed();
  }
  set solo(t) {
    (t ? this._addSolo() : this._removeSolo(),
      dt._allSolos.get(this.context).forEach((e) => e._updateSolo()));
  }
  get muted() {
    return this.input.gain.value === 0;
  }
  _addSolo() {
    (dt._soloed.has(this.context) || dt._soloed.set(this.context, new Set()),
      dt._soloed.get(this.context).add(this));
  }
  _removeSolo() {
    dt._soloed.has(this.context) && dt._soloed.get(this.context).delete(this);
  }
  _isSoloed() {
    return (
      dt._soloed.has(this.context) && dt._soloed.get(this.context).has(this)
    );
  }
  _noSolos() {
    return (
      !dt._soloed.has(this.context) ||
      (dt._soloed.has(this.context) && dt._soloed.get(this.context).size === 0)
    );
  }
  _updateSolo() {
    this._isSoloed()
      ? (this.input.gain.value = 1)
      : this._noSolos()
        ? (this.input.gain.value = 1)
        : (this.input.gain.value = 0);
  }
  dispose() {
    return (
      super.dispose(),
      dt._allSolos.get(this.context).delete(this),
      this._removeSolo(),
      this
    );
  }
}
dt._allSolos = new Map();
dt._soloed = new Map();
class Wr extends W {
  constructor() {
    const t = V(Wr.getDefaults(), arguments, ["pan", "volume"]);
    (super(t),
      (this.name = "PanVol"),
      (this._panner = this.input =
        new Js({
          context: this.context,
          pan: t.pan,
          channelCount: t.channelCount,
        })),
      (this.pan = this._panner.pan),
      (this._volume = this.output =
        new vn({ context: this.context, volume: t.volume })),
      (this.volume = this._volume.volume),
      this._panner.connect(this._volume),
      (this.mute = t.mute),
      Q(this, ["pan", "volume"]));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), {
      mute: !1,
      pan: 0,
      volume: 0,
      channelCount: 1,
    });
  }
  get mute() {
    return this._volume.mute;
  }
  set mute(t) {
    this._volume.mute = t;
  }
  dispose() {
    return (
      super.dispose(),
      this._panner.dispose(),
      this.pan.dispose(),
      this._volume.dispose(),
      this.volume.dispose(),
      this
    );
  }
}
class Ye extends W {
  constructor() {
    const t = V(Ye.getDefaults(), arguments, ["volume", "pan"]);
    (super(t),
      (this.name = "Channel"),
      (this._solo = this.input =
        new dt({ solo: t.solo, context: this.context })),
      (this._panVol = this.output =
        new Wr({
          context: this.context,
          pan: t.pan,
          volume: t.volume,
          mute: t.mute,
          channelCount: t.channelCount,
        })),
      (this.pan = this._panVol.pan),
      (this.volume = this._panVol.volume),
      this._solo.connect(this._panVol),
      Q(this, ["pan", "volume"]));
  }
  static getDefaults() {
    return Object.assign(W.getDefaults(), {
      pan: 0,
      volume: 0,
      mute: !1,
      solo: !1,
      channelCount: 1,
    });
  }
  get solo() {
    return this._solo.solo;
  }
  set solo(t) {
    this._solo.solo = t;
  }
  get muted() {
    return this._solo.muted || this.mute;
  }
  get mute() {
    return this._panVol.mute;
  }
  set mute(t) {
    this._panVol.mute = t;
  }
  _getBus(t) {
    return (
      Ye.buses.has(t) || Ye.buses.set(t, new Y({ context: this.context })),
      Ye.buses.get(t)
    );
  }
  send(t, e = 0) {
    const s = this._getBus(t),
      i = new Y({ context: this.context, units: "decibels", gain: e });
    return (this.connect(i), i.connect(s), i);
  }
  receive(t) {
    return (this._getBus(t).connect(this), this);
  }
  dispose() {
    return (
      super.dispose(),
      this._panVol.dispose(),
      this.pan.dispose(),
      this.volume.dispose(),
      this._solo.dispose(),
      this
    );
  }
}
Ye.buses = new Map();
Lt().transport;
Lt().destination;
Lt().destination;
Lt().listener;
Lt().draw;
Lt();
window.Alpine = er;
window.imagesData = [
  {
    name: "ascensor",
    translation: "elevator",
    path: "/images/sound-navigation/ascensor.jpg",
    category: "interior",
    sound: "/audio/glasslow.wav",
    modulation: 2,
    modulation_info: 2,
    pitch: 1,
    pitch_info: 0,
  },
  {
    name: "banco",
    translation: "bench",
    path: "/images/sound-navigation/banco.jpg",
    category: "exterior",
    sound: "/audio/woodlow.wav",
    modulation: 1,
    modulation_info: 1,
    pitch: 1,
    pitch_info: 0,
  },
  {
    name: "bolardo",
    translation: "bollard",
    path: "/images/sound-navigation/bolardo.jpg",
    category: "exterior",
    sound: "/audio/metal.wav",
    modulation: 0,
    modulation_info: 0,
    pitch: 2,
    pitch_info: 2,
  },
  {
    name: "columna",
    translation: "column",
    path: "/images/sound-navigation/columna.jpg",
    category: "exterior",
    sound: "/audio/delimiter1.wav",
    modulation: 0,
    modulation_info: 0,
    pitch: 1,
    pitch_info: 1,
  },
  {
    name: "crosswalk1",
    translation: "crosswalk",
    path: "/images/sound-navigation/crosswalk1.jpg",
    category: "exterior",
    sound: "/audio/step_down.wav",
    modulation: 2,
    modulation_info: 2,
    pitch: 1,
    pitch_info: 1,
  },
  {
    name: "escaleras",
    translation: "stairs",
    path: "/images/sound-navigation/escaleras.jpg",
    sound: "/audio/starisUp.wav",
    category: "interior",
    modulation: 2,
    modulation_info: 2,
    pitch: 1,
    pitch_info: 1,
  },
  {
    name: "ext",
    translation: "exterior",
    path: "/images/sound-navigation/ext.png",
  },
  {
    name: "farola",
    translation: "street lamp",
    path: "/images/sound-navigation/farola.jpg",
    category: "exterior",
    sound: "/audio/metal.wav",
    modulation: 0,
    modulation_info: 0,
    pitch: 2,
    pitch_info: 2,
  },
  {
    name: "int",
    translation: "interior",
    path: "/images/sound-navigation/int.png",
  },
  {
    name: "mesa",
    translation: "table",
    path: "/images/sound-navigation/mesa.jpg",
    category: "interior",
    sound: "/audio/woodlow.wav",
    modulation: 0,
    modulation_info: 0,
    pitch: 1,
    pitch_info: 0,
  },
  {
    name: "muro",
    translation: "wall",
    path: "/images/sound-navigation/muro.jpg",
    category: "exterior",
    sound: "/audio/brick.wav",
    modulation: 0,
    modulation_info: 0,
    pitch: 1,
    pitch_info: 0,
  },
  {
    name: "papelera",
    translation: "trash can",
    path: "/images/sound-navigation/papelera.jpg",
    category: "exterior",
    sound: "/audio/metal.wav",
    modulation: 1,
    modulation_info: 1,
    pitch: 1,
    pitch_info: 1,
  },
  {
    name: "puerta",
    translation: "door",
    path: "/images/sound-navigation/puerta.jpg",
    category: "interior",
    sound: "/audio/wood.wav",
    modulation: 2,
    modulation_info: 2,
    pitch: 1,
    pitch_info: 1,
  },
  {
    name: "semaforo",
    translation: "traffic light",
    path: "/images/sound-navigation/semaforo.jpg",
    category: "exterior",
    sound: "/audio/metal.wav",
    modulation: 2,
    modulation_info: 2,
    pitch: 2,
    pitch_info: 2,
  },
  {
    name: "silla",
    translation: "chair",
    path: "/images/sound-navigation/silla.jpg",
    category: "interior",
    sound: "/audio/wood.wav",
    modulation: 1,
    modulation_info: 1,
    pitch: 1,
    pitch_info: 1,
  },
  {
    name: "ventana",
    translation: "window",
    path: "/images/sound-navigation/ventana.png",
    category: "interior",
    sound: "/audio/glass.wav",
    modulation: 1,
    modulation_info: 1,
    pitch: 1,
    pitch_info: 1,
  },
  {
    name: "buzon",
    translation: "mailbox",
    path: "/images/sound-navigation/buzon.jpg",
    category: "exterior",
    sound: "/audio/metallow.wav",
    modulation: 1,
    modulation_info: 1,
    pitch: 1,
    pitch_info: 0,
  },
  {
    name: "valla",
    translation: "fence",
    path: "/images/sound-navigation/valla.jpg",
    category: "exterior",
    sound: "/audio/delimiter1.wav",
    modulation: 0,
    modulation_info: 0,
    pitch: 1,
    pitch_info: 0,
  },
];
let de = null;
const $c = document.querySelectorAll('[data-role="playBtn"]');
let Ge = null,
  Se = null,
  Ce = null,
  Jt = null,
  Ae = null;
async function Co(n, t = 1, e = 0) {
  (de && (de.dispose(), (de = null)),
    Ge && (Ge.dispose(), (Ge = null)),
    Jt && (Jt.dispose(), (Jt = null)),
    Ae && (Ae.dispose(), (Ae = null)),
    Se && (Se.stop(), Se.disconnect(), (Se = null)),
    Ce && (Ce.disconnect(), (Ce = null)),
    (Ce = new Js(0)),
    (Jt = new Y(1)),
    (Ae = new Y(1)),
    (Ge = new qr({ pitch: 0 }).connect(Jt)),
    Jt.connect(Ae),
    Ae.connect(Ce),
    Ce.toDestination(),
    (de = new Hn().connect(Ge)),
    (window.player = de),
    (window.modulationGainNode = Jt),
    (window.volumeGainNode = Ae),
    (window.panner = Ce));
  try {
    await de.load(n);
    let s = 0;
    if (
      (t === 2 ? (s = 12) : t === 0 && (s = -4),
      (Ge.pitch = s),
      e === 1 || e === 2)
    ) {
      let i = e === 1 ? 1.5 : 3;
      ((Se = new Je(i, 0.4, 1)), Se.connect(Jt.gain), Se.start());
    } else Jt.gain.value = 1;
    $c.forEach((i) => (i.disabled = !1));
  } catch (s) {
    console.error("Error cargando audio:", s);
  }
}
$c.forEach((n) => {
  n.addEventListener("click", async () => {
    de && (await O_(), de.start());
  });
});
window.addEventListener("alpine:init", () => {
  er.data("imageSoundPlayer", () => ({
    selectedImage: null,
    megaMenu: !1,
    mobileMenu: !1,
    mobileMegaMenu: !1,
    list_ext: !1,
    list_int: !1,
    imagesItems: imagesData,
    init() {
      ((this.selectedImage =
        this.imagesItems.find((n) => n.name === "papelera") ||
        this.imagesItems[0]),
        Co(
          this.selectedImage.sound,
          this.selectedImage.pitch ?? 1,
          this.selectedImage.modulation ?? 0,
        ),
        this.$watch("selectedImage", (n) => {
          n?.sound
            ? Co(n.sound, n.pitch ?? 1, n.modulation ?? 0)
            : console.warn("No sound for selected image:", n);
        }));
    },
  }));
});
er.start();
