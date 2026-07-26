/* @ds-bundle: {"format":4,"namespace":"DGDesignSystem_9728f7","components":[{"name":"Badge","sourcePath":"components/badges/Badge.jsx"},{"name":"DG_STATUSES","sourcePath":"components/badges/StatusPill.jsx"},{"name":"StatusPill","sourcePath":"components/badges/StatusPill.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"EmptyState","sourcePath":"components/cards/EmptyState.jsx"},{"name":"HeroBand","sourcePath":"components/cards/HeroBand.jsx"},{"name":"PricingPlanCard","sourcePath":"components/cards/PricingPlanCard.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"TextInput","sourcePath":"components/forms/TextInput.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"SidebarRow","sourcePath":"components/navigation/SidebarRow.jsx"}],"sourceHashes":{"components/badges/Badge.jsx":"18800dc2db41","components/badges/StatusPill.jsx":"bf901e4422b5","components/buttons/Button.jsx":"f5d203766700","components/buttons/IconButton.jsx":"f0e93ce1e44b","components/cards/Card.jsx":"39d6de823864","components/cards/EmptyState.jsx":"d16701d60228","components/cards/HeroBand.jsx":"66943ca69f3b","components/cards/PricingPlanCard.jsx":"9b96b89752fe","components/data/DataTable.jsx":"56bd61a4108d","components/feedback/Modal.jsx":"889edb107463","components/feedback/Toast.jsx":"67529d41cc57","components/forms/Checkbox.jsx":"aff8bf2c26c2","components/forms/Select.jsx":"a65a4c813d78","components/forms/TextInput.jsx":"cb9c7cbc8edd","components/navigation/Footer.jsx":"0319a52117bc","components/navigation/NavBar.jsx":"3decacd12599","components/navigation/SidebarRow.jsx":"a3b62f2897df","ui_kits/atelier/AppShell.jsx":"e929a66766e3","ui_kits/atelier/NewRepairModal.jsx":"039c420dcb0b","ui_kits/atelier/RepairDetail.jsx":"5ff0e30e355d","ui_kits/atelier/RepairRegister.jsx":"9c71f0674759","ui_kits/atelier/app.jsx":"83354e99e60e","ui_kits/atelier/data.js":"09f400b44bc2","ui_kits/espace-client/Lookup.jsx":"12a003fc971f","ui_kits/espace-client/RepairStatus.jsx":"b82e4b4391af","ui_kits/espace-client/app.jsx":"6e9b91f4e29b","ui_kits/site-vitrine/Landing.jsx":"0fa8a723de2d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DGDesignSystem_9728f7 = window.DGDesignSystem_9728f7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/badges/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  tone = 'blue',
  children,
  style,
  ...rest
}) {
  const tones = {
    blue: {
      background: 'var(--surface-card)',
      color: 'var(--action)',
      border: '1px solid var(--border-hairline)'
    },
    neutral: {
      background: 'var(--canvas)',
      color: 'var(--text-muted)',
      border: '1px solid var(--border-hairline)'
    },
    solid: {
      background: 'var(--action)',
      color: 'var(--on-action)',
      border: '1px solid transparent'
    },
    inverse: {
      background: 'rgba(255,255,255,.14)',
      color: 'var(--text-on-inverse)',
      border: '1px solid rgba(255,255,255,.2)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "dg-badge",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 8px',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--eyebrow-size)',
      fontWeight: 'var(--eyebrow-weight)',
      lineHeight: 'var(--eyebrow-lh)',
      letterSpacing: 'var(--eyebrow-ls)',
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/Badge.jsx", error: String((e && e.message) || e) }); }

// components/badges/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DG_STATUSES = {
  received: {
    label: 'Reçu',
    color: 'var(--status-received)',
    tint: 'var(--status-received-tint)'
  },
  diagnostic: {
    label: 'Diagnostic',
    color: 'var(--status-diagnostic)',
    tint: 'var(--status-diagnostic-tint)'
  },
  waiting_part: {
    label: 'Attente pièce',
    color: 'var(--status-waiting-part)',
    tint: 'var(--status-waiting-part-tint)'
  },
  in_progress: {
    label: 'En réparation',
    color: 'var(--status-in-progress)',
    tint: 'var(--status-in-progress-tint)'
  },
  ready: {
    label: 'Prêt',
    color: 'var(--status-ready)',
    tint: 'var(--status-ready-tint)'
  },
  collected: {
    label: 'Récupéré',
    color: 'var(--status-collected)',
    tint: 'var(--status-collected-tint)'
  }
};
function StatusPill({
  status = 'received',
  label,
  dotOnly = false,
  style,
  ...rest
}) {
  const s = DG_STATUSES[status] || DG_STATUSES.received;
  const dot = /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 'var(--radius-full)',
      background: s.color,
      flex: 'none'
    }
  });
  if (dotOnly) return /*#__PURE__*/React.createElement("span", _extends({
    title: label || s.label,
    style: {
      display: 'inline-flex',
      ...style
    }
  }, rest), dot);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "dg-status-pill",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '3px 10px 3px 8px',
      borderRadius: 'var(--radius-sm)',
      background: s.tint,
      color: 'var(--text-body)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--eyebrow-size)',
      fontWeight: 600,
      letterSpacing: 'var(--eyebrow-ls)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot, label || s.label);
}
Object.assign(__ds_scope, { DG_STATUSES, StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BASE = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--button-size)',
  fontWeight: 'var(--button-weight)',
  lineHeight: 'var(--button-lh)',
  letterSpacing: 'var(--button-ls)',
  border: '1px solid transparent',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
  whiteSpace: 'nowrap'
};
const VARIANTS = {
  primary: {
    background: 'var(--action)',
    color: 'var(--on-action)',
    borderRadius: 'var(--radius-cta)'
  },
  secondary: {
    background: 'var(--surface-card)',
    color: 'var(--text-heading)',
    borderRadius: 'var(--radius-cta)',
    boxShadow: 'var(--shadow-1)'
  },
  utility: {
    background: 'var(--surface-card)',
    color: 'var(--text-heading)',
    borderRadius: 'var(--radius-utility)',
    borderColor: 'var(--border-hairline)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-body)',
    borderRadius: 'var(--radius-utility)'
  }
};
const SIZES = {
  sm: {
    padding: '4px 14px',
    fontSize: '15px'
  },
  md: {
    padding: '8px 18px'
  },
  lg: {
    padding: '12px 26px'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  as = 'button',
  href,
  onClick,
  style,
  children,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const Tag = as === 'a' ? 'a' : 'button';
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = {
    ...BASE,
    ...v,
    ...(SIZES[size] || SIZES.md),
    width: fullWidth ? '100%' : undefined,
    opacity: disabled ? 0.4 : 1,
    pointerEvents: disabled ? 'none' : undefined,
    transform: pressed ? 'scale(var(--press-scale))' : 'none',
    ...(hover && !disabled ? HOVER[variant] : null),
    ...(pressed && variant === 'primary' ? {
      background: 'var(--action-pressed)'
    } : null),
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: "dg-button",
    style: s,
    href: href,
    onClick: onClick,
    disabled: Tag === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false)
  }, rest), iconLeft, children, iconRight);
}
const HOVER = {
  primary: {
    background: 'var(--action-pressed)'
  },
  secondary: {
    boxShadow: 'var(--shadow-2)'
  },
  utility: {
    background: 'var(--canvas)'
  },
  ghost: {
    background: 'var(--surface-translucent)'
  }
};
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  tone = 'neutral',
  size = 36,
  label,
  onClick,
  disabled,
  style,
  children,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const tones = {
    neutral: {
      background: hover ? 'rgba(0,0,0,.08)' : 'var(--surface-translucent)',
      color: 'var(--text-body)'
    },
    inverse: {
      background: hover ? 'rgba(255,255,255,.22)' : 'rgba(255,255,255,.14)',
      color: 'var(--text-on-inverse)'
    },
    bare: {
      background: hover ? 'var(--surface-translucent)' : 'transparent',
      color: 'var(--text-muted)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    className: "dg-icon-button",
    "aria-label": label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    style: {
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      opacity: disabled ? 0.4 : 1,
      transform: pressed ? 'scale(var(--press-scale))' : 'none',
      transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/cards/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  elevated = false,
  accent,
  title,
  eyebrow,
  footer,
  padding,
  as = 'div',
  style,
  children,
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: "dg-card",
    style: {
      background: 'var(--surface-card)',
      color: 'var(--text-body)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-card)',
      boxShadow: elevated ? 'var(--shadow-1)' : 'var(--shadow-0)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, rest), accent && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      background: accent,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: padding || 'var(--card-padding)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      flex: 1
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--eyebrow-size)',
      fontWeight: 'var(--eyebrow-weight)',
      letterSpacing: 'var(--eyebrow-ls)',
      color: 'var(--text-faint)',
      textTransform: 'uppercase'
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--heading-3-size)',
      fontWeight: 'var(--heading-3-weight)',
      lineHeight: 'var(--heading-3-lh)',
      letterSpacing: 'var(--heading-3-ls)',
      color: 'var(--text-heading)'
    }
  }, title), children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px var(--card-padding)',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/cards/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function EmptyState({
  icon,
  title,
  description,
  action,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "dg-empty",
    style: {
      background: 'var(--canvas)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-xxl)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      textAlign: 'center',
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-faint)',
      display: 'flex'
    }
  }, icon), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--body-md-size)',
      fontWeight: 500,
      color: 'var(--text-heading)'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--body-sm-size)',
      color: 'var(--text-muted)',
      maxWidth: 360
    }
  }, description), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, action));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/cards/HeroBand.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function HeroBand({
  eyebrow,
  title,
  subtitle,
  actions,
  align = 'center',
  minHeight = 420,
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    className: "dg-hero",
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-inverse)',
      minHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      padding: 'var(--space-4xl) var(--space-xxl)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(120% 90% at 50% 110%, rgba(98,174,240,.35), transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 760,
      textAlign: align,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      alignItems: align === 'center' ? 'center' : 'flex-start'
    }
  }, eyebrow, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 'var(--display-1-size)',
      fontWeight: 'var(--display-1-weight)',
      lineHeight: 'var(--display-1-lh)',
      letterSpacing: 'var(--display-1-ls)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--body-md-size)',
      lineHeight: 'var(--body-md-lh)',
      color: 'rgba(255,255,255,.78)',
      maxWidth: 560
    }
  }, subtitle), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      justifyContent: align === 'center' ? 'center' : 'flex-start'
    }
  }, actions), children));
}
Object.assign(__ds_scope, { HeroBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/HeroBand.jsx", error: String((e && e.message) || e) }); }

// components/cards/PricingPlanCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PricingPlanCard({
  name,
  price,
  period = '/ mois',
  description,
  features = [],
  featured = false,
  ctaLabel = 'Choisir',
  onSelect,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "dg-plan",
    style: {
      background: featured ? 'var(--canvas)' : 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--title-size)',
      fontWeight: 'var(--title-weight)',
      letterSpacing: 'var(--title-ls)',
      color: 'var(--text-heading)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--heading-2-size)',
      fontWeight: 700,
      letterSpacing: 'var(--heading-2-ls)',
      color: 'var(--text-heading)'
    }
  }, price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--caption-size)',
      color: 'var(--text-faint)'
    }
  }, period)), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--body-sm-size)',
      lineHeight: 1.45,
      color: 'var(--text-muted)'
    }
  }, description), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: featured ? 'primary' : 'utility',
    size: "sm",
    fullWidth: true,
    onClick: onSelect,
    style: {
      marginTop: 4
    }
  }, ctaLabel), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: '8px 0 0',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, features.map((ft, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: 8,
      fontSize: 'var(--body-sm-size)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: 'var(--sticker-green)',
      flex: 'none'
    }
  }, "\u2713"), ft))));
}
Object.assign(__ds_scope, { PricingPlanCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/PricingPlanCard.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DataTable({
  columns = [],
  rows = [],
  onRowClick,
  dense = false,
  style,
  ...rest
}) {
  const pad = dense ? '8px 12px' : 'var(--space-sm) var(--space-md)';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "dg-table",
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      background: 'var(--canvas)',
      padding: pad,
      fontSize: 'var(--eyebrow-size)',
      fontWeight: 'var(--eyebrow-weight)',
      letterSpacing: 'var(--eyebrow-ls)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      borderBottom: '1px solid var(--border-hairline)',
      width: c.width
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement(Row, {
    key: r.id ?? i,
    row: r,
    columns: columns,
    pad: pad,
    onRowClick: onRowClick,
    last: i === rows.length - 1
  })))));
}
function Row({
  row,
  columns,
  pad,
  onRowClick,
  last
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("tr", {
    onClick: onRowClick ? () => onRowClick(row) : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      cursor: onRowClick ? 'pointer' : 'default',
      background: hover && onRowClick ? 'var(--canvas)' : 'transparent',
      transition: 'background var(--dur-fast) var(--ease-standard)'
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      padding: pad,
      textAlign: c.align || 'left',
      fontSize: 'var(--body-sm-size)',
      color: 'var(--text-body)',
      borderBottom: last ? 'none' : '1px solid var(--border-hairline)',
      verticalAlign: 'middle'
    }
  }, c.render ? c.render(row) : row[c.key])));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Modal({
  open = true,
  title,
  description,
  footer,
  onClose,
  width = 480,
  style,
  children,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(15,15,15,.32)',
      backdropFilter: 'blur(2px)'
    }
  }), /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    style: {
      position: 'relative',
      width,
      maxWidth: '100%',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-2)',
      padding: 'var(--space-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--heading-3-size)',
      fontWeight: 700,
      letterSpacing: 'var(--heading-3-ls)',
      color: 'var(--text-heading)'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--body-sm-size)',
      color: 'var(--text-muted)'
    }
  }, description), children, footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8,
      marginTop: 4
    }
  }, footer)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Toast({
  tone = 'neutral',
  title,
  description,
  action,
  onClose,
  style,
  ...rest
}) {
  const dot = {
    neutral: 'var(--text-faint)',
    success: 'var(--sticker-green)',
    warning: 'var(--sticker-orange)',
    info: 'var(--action)'
  }[tone];
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "dg-toast",
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-2)',
      padding: 'var(--space-sm) var(--space-md)',
      maxWidth: 420,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 'var(--radius-full)',
      background: dot,
      marginTop: 6,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--body-sm-size)',
      fontWeight: 500,
      color: 'var(--text-heading)'
    }
  }, title), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--caption-size)',
      color: 'var(--text-muted)'
    }
  }, description)), action, onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fermer",
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--text-faint)',
      cursor: 'pointer',
      fontSize: 16,
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  description,
  style,
  id,
  ...rest
}) {
  const uid = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: description ? 'flex-start' : 'center',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: uid,
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled,
    style: {
      width: 16,
      height: 16,
      margin: 0,
      marginTop: description ? 3 : 0,
      accentColor: 'var(--action)',
      flex: 'none',
      cursor: 'inherit'
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--body-sm-size)',
      color: 'var(--text-body)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--caption-size)',
      color: 'var(--text-faint)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  options = [],
  style,
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const uid = id || React.useId();
  return /*#__PURE__*/React.createElement("div", {
    className: "dg-field",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--caption-size)',
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, label), /*#__PURE__*/React.createElement("select", _extends({
    id: uid,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      width: '100%',
      padding: '6px 28px 6px 8px',
      background: 'var(--surface-card) url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'none\' stroke=\'%23615d59\' stroke-width=\'1.5\'><path d=\'M2 4.5 6 8.5 10 4.5\'/></svg>") no-repeat right 8px center',
      border: '1px solid var(--border-input)',
      borderRadius: 'var(--radius-input)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--body-sm-size)',
      color: 'var(--text-heading)',
      boxShadow: focus ? 'var(--ring-focus)' : 'none',
      outline: 'none',
      cursor: 'pointer'
    }
  }, rest), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--caption-size)',
      color: 'var(--text-faint)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextInput({
  label,
  hint,
  error,
  prefix,
  suffix,
  multiline = false,
  rows = 3,
  style,
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const uid = id || React.useId();
  const Field = multiline ? 'textarea' : 'input';
  return /*#__PURE__*/React.createElement("div", {
    className: "dg-field",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--caption-size)',
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 8px',
      background: 'var(--surface-card)',
      color: 'var(--text-heading)',
      border: '1px solid ' + (error ? 'var(--sticker-orange)' : 'var(--border-input)'),
      borderRadius: 'var(--radius-input)',
      boxShadow: focus ? 'var(--ring-focus)' : 'none',
      transition: 'box-shadow var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)'
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)',
      display: 'inline-flex'
    }
  }, prefix), /*#__PURE__*/React.createElement(Field, _extends({
    id: uid,
    rows: multiline ? rows : undefined,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      resize: multiline ? 'vertical' : undefined,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--body-sm-size)',
      lineHeight: 'var(--body-sm-lh)',
      color: 'inherit',
      minWidth: 0
    }
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)',
      display: 'inline-flex'
    }
  }, suffix)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--caption-size)',
      color: error ? 'var(--sticker-orange)' : 'var(--text-faint)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { TextInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextInput.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Footer({
  brand = 'D-g',
  tagline,
  columns = [],
  legal,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    className: "dg-footer",
    style: {
      background: 'var(--canvas)',
      color: 'var(--text-body)',
      borderTop: '1px solid var(--border-hairline)',
      padding: 'var(--space-xxl)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4xl)',
      flexWrap: 'wrap',
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 200,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--title-size)',
      fontWeight: 700,
      letterSpacing: '-.5px',
      color: 'var(--text-heading)'
    }
  }, brand), tagline && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--caption-size)',
      color: 'var(--text-muted)',
      maxWidth: 240
    }
  }, tagline)), columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--eyebrow-size)',
      fontWeight: 600,
      letterSpacing: 'var(--eyebrow-ls)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, col.title), col.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href || '#',
    style: {
      fontSize: 'var(--caption-size)',
      color: 'var(--text-body)',
      textDecoration: 'none'
    }
  }, l.label))))), legal && /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      paddingTop: 'var(--space-xxl)',
      fontSize: 'var(--caption-size)',
      color: 'var(--text-faint)'
    }
  }, legal));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NavBar({
  brand = 'D-g',
  links = [],
  actions,
  sticky = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    className: "dg-nav",
    style: {
      position: sticky ? 'sticky' : 'static',
      top: 0,
      zIndex: 20,
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-hairline)',
      padding: 'var(--space-md) var(--space-lg)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-lg)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--title-size)',
      fontWeight: 700,
      letterSpacing: '-.5px',
      color: 'var(--text-heading)'
    }
  }, brand), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-lg)',
      alignItems: 'center',
      flex: 1
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href || '#',
    onClick: l.onClick,
    style: {
      fontSize: 'var(--body-sm-size)',
      color: l.active ? 'var(--action)' : 'var(--text-body)',
      textDecoration: 'none',
      fontWeight: l.active ? 500 : 400
    }
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-sm)',
      alignItems: 'center'
    }
  }, actions));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SidebarRow({
  icon,
  label,
  count,
  active = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    className: "dg-sidebar-row",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      textAlign: 'left',
      padding: 'var(--space-xs) var(--space-sm)',
      border: 'none',
      cursor: 'pointer',
      borderRadius: 'var(--radius-sm)',
      background: active ? 'rgba(0,117,222,.08)' : hover ? 'var(--surface-translucent)' : 'transparent',
      color: active ? 'var(--action)' : 'var(--text-body)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--body-sm-size)',
      fontWeight: active ? 500 : 400,
      transition: 'background var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 16,
      justifyContent: 'center',
      flex: 'none',
      opacity: active ? 1 : .7
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, label), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--caption-size)',
      color: 'var(--text-faint)'
    }
  }, count));
}
Object.assign(__ds_scope, { SidebarRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarRow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atelier/AppShell.jsx
try { (() => {
const {
  SidebarRow,
  Button,
  Badge,
  IconButton
} = window.DGDesignSystem_9728f7;
function Icon({
  name,
  size = 16
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '<i data-lucide="' + name + '"></i>';
      window.lucide.createIcons({
        attrs: {
          'stroke-width': 1.5,
          width: size,
          height: size
        },
        nameAttr: 'data-lucide'
      });
    }
  }, [name, size]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      width: size,
      height: size
    }
  });
}
function Sidebar({
  filter,
  setFilter,
  counts,
  onNew
}) {
  const items = [{
    key: 'all',
    label: 'Toutes les fiches',
    icon: 'clipboard-list'
  }, {
    key: 'diagnostic',
    label: 'Diagnostic',
    icon: 'search'
  }, {
    key: 'waiting_part',
    label: 'Attente pièce',
    icon: 'package'
  }, {
    key: 'in_progress',
    label: 'En réparation',
    icon: 'wrench'
  }, {
    key: 'ready',
    label: 'Prêtes',
    icon: 'check'
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 236,
      flex: 'none',
      background: 'var(--surface-card)',
      borderRight: '1px solid var(--border-hairline)',
      display: 'flex',
      flexDirection: 'column',
      padding: 'var(--space-md)',
      gap: 'var(--space-md)',
      position: 'sticky',
      top: 0,
      height: '100vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      letterSpacing: '-.5px',
      color: 'var(--text-heading)'
    }
  }, "D-g"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "Atelier Nord")), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    fullWidth: true,
    onClick: onNew,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    })
  }, "Nouvelle fiche"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '.125px',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      padding: '6px 12px'
    }
  }, "R\xE9parations"), items.map(i => /*#__PURE__*/React.createElement(SidebarRow, {
    key: i.key,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: i.icon
    }),
    label: i.label,
    count: counts[i.key],
    active: filter === i.key,
    onClick: () => setFilter(i.key)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '.125px',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      padding: '6px 12px'
    }
  }, "Atelier"), /*#__PURE__*/React.createElement(SidebarRow, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar"
    }),
    label: "Planning"
  }), /*#__PURE__*/React.createElement(SidebarRow, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "users"
    }),
    label: "Clients"
  }), /*#__PURE__*/React.createElement(SidebarRow, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "settings"
    }),
    label: "R\xE9glages"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 4px',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: 'var(--status-diagnostic-tint)',
      color: 'var(--sticker-purple-deep)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 600
    }
  }, "LM"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--text-body)',
      flex: 1
    }
  }, "L\xE9a M."), /*#__PURE__*/React.createElement(IconButton, {
    tone: "bare",
    size: 28,
    label: "Options"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-horizontal"
  }))));
}
function TopBar({
  title,
  subtitle,
  actions
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
      padding: 'var(--space-lg) var(--space-xxl) var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 26,
      fontWeight: 700,
      letterSpacing: '-.625px',
      color: 'var(--text-heading)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 15,
      color: 'var(--text-muted)'
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, actions));
}
Object.assign(window, {
  Icon,
  Sidebar,
  TopBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atelier/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atelier/NewRepairModal.jsx
try { (() => {
const {
  Modal,
  TextInput,
  Select,
  Checkbox,
  Button
} = window.DGDesignSystem_9728f7;
function NewRepairModal({
  open,
  onClose,
  onCreate
}) {
  return /*#__PURE__*/React.createElement(Modal, {
    open: open,
    onClose: onClose,
    width: 520,
    title: "Nouvelle fiche de r\xE9paration",
    description: "Le client recevra un lien de suivi d\xE8s l\u2019enregistrement.",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: onClose
    }, "Annuler"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: onCreate
    }, "Cr\xE9er la fiche"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    label: "Client",
    placeholder: "Nom et pr\xE9nom"
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "T\xE9l\xE9phone",
    placeholder: "06 00 00 00 00"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Type de v\xE9lo",
    options: ['Ville', 'VTT', 'Route', 'VTC', 'Électrique']
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "Mod\xE8le",
    placeholder: "Rockrider ST 520"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    label: "Motif / diagnostic initial",
    multiline: true,
    rows: 3,
    placeholder: "Roue arri\xE8re voil\xE9e, freins \xE0 revoir\u2026"
  })), /*#__PURE__*/React.createElement(Select, {
    label: "M\xE9cano assign\xE9",
    options: ['Léa M.', 'Yanis B.', 'Non assigné']
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "\xC9ch\xE9ance souhait\xE9e",
    placeholder: "31/07"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Pr\xE9venir le client par SMS",
    description: "\xC0 chaque changement de statut",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Devis \xE0 valider avant intervention"
  }))));
}
Object.assign(window, {
  NewRepairModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atelier/NewRepairModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atelier/RepairDetail.jsx
try { (() => {
const {
  Card,
  StatusPill,
  Button,
  Badge,
  Checkbox,
  DG_STATUSES
} = window.DGDesignSystem_9728f7;
function Timeline({
  items
}) {
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, items.map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 99,
      background: DG_STATUSES[t.status].color,
      marginTop: 5
    }
  }), i < items.length - 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      flex: 1,
      background: 'var(--border-hairline)',
      minHeight: 26
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: i < items.length - 1 ? 14 : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'var(--text-body)'
    }
  }, t.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-faint)'
    }
  }, t.date)))));
}
function Field({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      padding: '8px 0',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--text-body)',
      textAlign: 'right'
    }
  }, value));
}
function RepairDetail({
  repair,
  onBack,
  onAdvance
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--space-xxl) var(--space-xxl)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) 320px',
      gap: 'var(--space-lg)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: repair.bike,
    eyebrow: repair.id
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    status: repair.status
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-faint)'
    }
  }, "Re\xE7u le ", repair.received, " \xB7 ", repair.mechanic)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '.125px',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, "Interventions"), repair.tasks.map((t, i) => /*#__PURE__*/React.createElement(Checkbox, {
    key: i,
    label: t.label,
    defaultChecked: t.done
  })))), /*#__PURE__*/React.createElement(Card, {
    title: "Historique"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Timeline, {
    items: repair.timeline
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      position: 'sticky',
      top: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    elevated: true,
    padding: "var(--space-md) var(--space-lg)"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '.125px',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, "Client"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: '-.125px',
      color: 'var(--text-heading)',
      marginTop: 2
    }
  }, repair.client), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'var(--text-muted)'
    }
  }, repair.phone), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Devis",
    value: repair.quote
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\xC9ch\xE9ance",
    value: repair.due
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Suivi client",
    value: /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "d-g.fr/", repair.id)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    onClick: onAdvance
  }, "Faire avancer le statut"), /*#__PURE__*/React.createElement(Button, {
    variant: "utility",
    size: "sm",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "message-square",
      size: 14
    })
  }, "Envoyer un SMS"))), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-md) var(--space-lg)"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '.125px',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, "Pi\xE8ces"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("span", null, "Plaquettes Shimano"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "18 \u20AC")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("span", null, "C\xE2ble de frein"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "6 \u20AC")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 15,
      paddingTop: 8,
      borderTop: '1px solid var(--border-hairline)',
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", null, "Main-d\u2019\u0153uvre"), /*#__PURE__*/React.createElement("span", null, "62 \u20AC"))))));
}
Object.assign(window, {
  RepairDetail,
  Timeline
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atelier/RepairDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atelier/RepairRegister.jsx
try { (() => {
const {
  DataTable,
  StatusPill,
  Button,
  TextInput,
  EmptyState,
  Card
} = window.DGDesignSystem_9728f7;
function StatCard({
  label,
  value,
  tone
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-card)',
      padding: 'var(--space-md) var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 99,
      background: tone
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '.125px',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      fontWeight: 700,
      letterSpacing: '-1px',
      lineHeight: 1.1,
      marginTop: 6,
      color: 'var(--text-heading)'
    }
  }, value));
}
function RepairRegister({
  repairs,
  filter,
  onOpen,
  query,
  setQuery
}) {
  const rows = repairs.filter(r => (filter === 'all' || r.status === filter) && (r.id + r.client + r.bike).toLowerCase().includes(query.toLowerCase()));
  const counts = k => repairs.filter(r => r.status === k).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--space-xxl) var(--space-xxl)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "En r\xE9paration",
    value: counts('in_progress'),
    tone: "var(--status-in-progress)"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Attente pi\xE8ce",
    value: counts('waiting_part'),
    tone: "var(--status-waiting-part)"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Pr\xEAtes",
    value: counts('ready'),
    tone: "var(--status-ready)"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Re\xE7ues aujourd\u2019hui",
    value: 2,
    tone: "var(--status-received)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "Rechercher une fiche, un client, un v\xE9lo\u2026",
    value: query,
    onChange: e => setQuery(e.target.value),
    prefix: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 14
    }),
    style: {
      flex: 1,
      maxWidth: 360
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "utility",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "sliders-horizontal",
      size: 14
    })
  }, "Filtres"), /*#__PURE__*/React.createElement(Button, {
    variant: "utility",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 14
    })
  }, "Exporter")), rows.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "clipboard-list",
      size: 24
    }),
    title: "Aucune fiche ne correspond",
    description: "Modifiez le filtre ou la recherche pour voir d\u2019autres r\xE9parations.",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "utility",
      size: "sm",
      onClick: () => setQuery('')
    }, "Effacer la recherche")
  }) : /*#__PURE__*/React.createElement(DataTable, {
    onRowClick: onOpen,
    rows: rows,
    columns: [{
      key: 'id',
      label: 'Fiche',
      width: 96,
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 500,
          fontVariantNumeric: 'tabular-nums'
        }
      }, r.id)
    }, {
      key: 'client',
      label: 'Client'
    }, {
      key: 'bike',
      label: 'Vélo'
    }, {
      key: 'mechanic',
      label: 'Mécano',
      width: 96
    }, {
      key: 'status',
      label: 'Statut',
      width: 150,
      render: r => /*#__PURE__*/React.createElement(StatusPill, {
        status: r.status
      })
    }, {
      key: 'due',
      label: 'Échéance',
      align: 'right',
      width: 120,
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          color: r.due === 'Aujourd’hui' ? 'var(--text-heading)' : 'var(--text-muted)',
          fontWeight: r.due === 'Aujourd’hui' ? 500 : 400
        }
      }, r.due)
    }]
  }));
}
Object.assign(window, {
  RepairRegister
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atelier/RepairRegister.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atelier/app.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  Toast,
  DG_STATUSES
} = window.DGDesignSystem_9728f7;
const ORDER = ['received', 'diagnostic', 'waiting_part', 'in_progress', 'ready', 'collected'];
function AtelierApp() {
  const [repairs, setRepairs] = React.useState(window.DG_DATA.repairs);
  const [filter, setFilter] = React.useState('all');
  const [query, setQuery] = React.useState('');
  const [openId, setOpenId] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const open = repairs.find(r => r.id === openId);
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);
  const counts = {
    all: repairs.length
  };
  ORDER.forEach(k => {
    counts[k] = repairs.filter(r => r.status === k).length;
  });
  const advance = () => {
    const next = ORDER[Math.min(ORDER.indexOf(open.status) + 1, ORDER.length - 1)];
    setRepairs(rs => rs.map(r => r.id === open.id ? {
      ...r,
      status: next,
      timeline: [...r.timeline, {
        status: next,
        label: DG_STATUSES[next].label + ' — mis à jour par Léa',
        date: '26 juil. · 10:04'
      }]
    } : r));
    setToast({
      tone: 'success',
      title: 'Statut mis à jour : ' + DG_STATUSES[next].label,
      description: 'Le client a reçu un SMS.'
    });
  };
  const create = () => {
    const id = 'DG-' + (1043 + repairs.length - 5);
    setRepairs(rs => [{
      id,
      client: 'Nouveau client',
      phone: '06 00 00 00 00',
      bike: 'Vélo de ville',
      status: 'received',
      due: 'Ven. 31',
      mechanic: 'Léa',
      received: '26 juil.',
      quote: '—',
      tasks: [{
        label: 'Diagnostic à réaliser',
        done: false
      }],
      timeline: [{
        status: 'received',
        label: 'Vélo réceptionné',
        date: '26 juil. · 09:58'
      }]
    }, ...rs]);
    setModal(false);
    setToast({
      tone: 'info',
      title: 'Fiche ' + id + ' créée',
      description: 'Lien de suivi envoyé au client.'
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--canvas)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    filter: filter,
    setFilter: setFilter,
    counts: counts,
    onNew: () => setModal(true)
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, open ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopBar, {
    title: open.id + ' · ' + open.client,
    subtitle: open.bike,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => setOpenId(null),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-left",
        size: 14
      })
    }, "Retour au registre"), /*#__PURE__*/React.createElement(Button, {
      variant: "utility",
      size: "sm"
    }, "Imprimer l\u2019\xE9tiquette"))
  }), /*#__PURE__*/React.createElement(RepairDetail, {
    repair: open,
    onBack: () => setOpenId(null),
    onAdvance: advance
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopBar, {
    title: "Registre des r\xE9parations",
    subtitle: "Samedi 26 juillet \xB7 Atelier Nord",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "utility",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "bell",
        size: 14
      })
    }, "Notifications"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: () => setModal(true)
    }, "Nouvelle fiche"))
  }), /*#__PURE__*/React.createElement(RepairRegister, {
    repairs: repairs,
    filter: filter,
    query: query,
    setQuery: setQuery,
    onOpen: r => setOpenId(r.id)
  }))), /*#__PURE__*/React.createElement(NewRepairModal, {
    open: modal,
    onClose: () => setModal(false),
    onCreate: create
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 24,
      bottom: 24,
      zIndex: 80
    }
  }, /*#__PURE__*/React.createElement(Toast, _extends({}, toast, {
    onClose: () => setToast(null)
  }))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(AtelierApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atelier/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atelier/data.js
try { (() => {
window.DG_DATA = {
  repairs: [{
    id: 'DG-1042',
    client: 'M. Bertrand',
    phone: '06 12 34 56 78',
    bike: 'VTT Rockrider ST 520',
    status: 'in_progress',
    due: 'Aujourd’hui',
    mechanic: 'Léa',
    received: '24 juil.',
    quote: '86 €',
    tasks: [{
      label: 'Roue arrière voilée — dévoilage',
      done: true
    }, {
      label: 'Remplacement plaquettes arrière',
      done: true
    }, {
      label: 'Réglage dérailleur',
      done: false
    }],
    timeline: [{
      status: 'received',
      label: 'Vélo réceptionné',
      date: '24 juil. · 09:12'
    }, {
      status: 'diagnostic',
      label: 'Diagnostic établi, devis envoyé',
      date: '24 juil. · 11:40'
    }, {
      status: 'in_progress',
      label: 'Réparation en cours — Léa',
      date: '25 juil. · 08:05'
    }]
  }, {
    id: 'DG-1041',
    client: 'Camille N.',
    phone: '07 88 21 04 55',
    bike: 'Vélo de ville Elops 520',
    status: 'waiting_part',
    due: 'Ven. 31',
    mechanic: 'Yanis',
    received: '23 juil.',
    quote: '142 €',
    tasks: [{
      label: 'Changement de moyeu arrière',
      done: false
    }, {
      label: 'Commande moyeu Shimano',
      done: true
    }],
    timeline: [{
      status: 'received',
      label: 'Vélo réceptionné',
      date: '23 juil. · 16:30'
    }, {
      status: 'waiting_part',
      label: 'Moyeu commandé — réception vendredi',
      date: '24 juil. · 10:02'
    }]
  }, {
    id: 'DG-1038',
    client: 'Atelier Vélo+',
    phone: '01 45 22 88 10',
    bike: 'Route Triban RC 520',
    status: 'ready',
    due: '—',
    mechanic: 'Léa',
    received: '21 juil.',
    quote: '64 €',
    tasks: [{
      label: 'Révision complète',
      done: true
    }, {
      label: 'Changement câbles de frein',
      done: true
    }],
    timeline: [{
      status: 'received',
      label: 'Vélo réceptionné',
      date: '21 juil. · 14:00'
    }, {
      status: 'in_progress',
      label: 'Réparation en cours — Léa',
      date: '22 juil. · 09:15'
    }, {
      status: 'ready',
      label: 'Prêt — client prévenu par SMS',
      date: '24 juil. · 17:22'
    }]
  }, {
    id: 'DG-1035',
    client: 'S. Morel',
    phone: '06 74 90 31 27',
    bike: 'VAE Elops 900 E',
    status: 'diagnostic',
    due: 'Lun. 3',
    mechanic: 'Yanis',
    received: '25 juil.',
    quote: '—',
    tasks: [{
      label: 'Diagnostic assistance électrique',
      done: false
    }],
    timeline: [{
      status: 'received',
      label: 'Vélo réceptionné',
      date: '25 juil. · 08:40'
    }, {
      status: 'diagnostic',
      label: 'Diagnostic en cours',
      date: '25 juil. · 15:10'
    }]
  }, {
    id: 'DG-1031',
    client: 'J. Fauvel',
    phone: '06 03 55 77 12',
    bike: 'VTC Riverside 500',
    status: 'collected',
    due: '—',
    mechanic: 'Léa',
    received: '18 juil.',
    quote: '38 €',
    tasks: [{
      label: 'Crevaison avant',
      done: true
    }],
    timeline: [{
      status: 'received',
      label: 'Vélo réceptionné',
      date: '18 juil. · 10:05'
    }, {
      status: 'ready',
      label: 'Prêt',
      date: '18 juil. · 15:30'
    }, {
      status: 'collected',
      label: 'Récupéré par le client',
      date: '19 juil. · 09:50'
    }]
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atelier/data.js", error: String((e && e.message) || e) }); }

// ui_kits/espace-client/Lookup.jsx
try { (() => {
const {
  Card,
  TextInput,
  Button,
  Badge
} = window.DGDesignSystem_9728f7;
function Icon({
  name,
  size = 16
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '<i data-lucide="' + name + '"></i>';
      window.lucide.createIcons({
        attrs: {
          'stroke-width': 1.5,
          width: size,
          height: size
        }
      });
    }
  }, [name, size]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      width: size,
      height: size
    }
  });
}
function Lookup({
  onSubmit,
  error
}) {
  const [ref, setRef] = React.useState('DG-1042');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 460,
      margin: '0 auto',
      padding: 'var(--space-4xl) var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement(Badge, null, "Suivi de r\xE9paration"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '14px 0 8px',
      fontSize: 40,
      fontWeight: 700,
      letterSpacing: '-1px',
      lineHeight: 1.1,
      color: 'var(--text-heading)'
    }
  }, "O\xF9 en est votre v\xE9lo ?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16,
      lineHeight: 1.5,
      color: 'var(--text-muted)'
    }
  }, "Saisissez le num\xE9ro de fiche indiqu\xE9 sur votre re\xE7u d\u2019atelier.")), /*#__PURE__*/React.createElement(Card, {
    elevated: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    label: "Num\xE9ro de fiche",
    value: ref,
    onChange: e => setRef(e.target.value),
    placeholder: "DG-1042",
    error: error,
    hint: error ? undefined : 'Format : DG suivi de quatre chiffres',
    prefix: /*#__PURE__*/React.createElement(Icon, {
      name: "clipboard-list",
      size: 14
    })
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "Nom de famille",
    placeholder: "Bertrand"
  }), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    onClick: () => onSubmit(ref)
  }, "Voir ma r\xE9paration"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: 'var(--text-faint)',
      textAlign: 'center'
    }
  }, "Num\xE9ro perdu ? ", /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Contactez l\u2019atelier")))));
}
Object.assign(window, {
  Lookup,
  Icon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/espace-client/Lookup.jsx", error: String((e && e.message) || e) }); }

// ui_kits/espace-client/RepairStatus.jsx
try { (() => {
const {
  Card,
  StatusPill,
  Button,
  Badge,
  DG_STATUSES,
  Toast,
  Modal
} = window.DGDesignSystem_9728f7;
const STEPS = ['received', 'diagnostic', 'waiting_part', 'in_progress', 'ready', 'collected'];
function Stepper({
  current
}) {
  const idx = STEPS.indexOf(current);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 0
    }
  }, STEPS.map((s, i) => {
    const done = i <= idx;
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 12,
        height: 12,
        borderRadius: 99,
        flex: 'none',
        background: done ? DG_STATUSES[s].color : 'var(--border-hairline)'
      }
    }), i < STEPS.length - 1 && /*#__PURE__*/React.createElement("span", {
      style: {
        height: 2,
        flex: 1,
        background: i < idx ? DG_STATUSES[STEPS[i + 1]].color : 'var(--border-hairline)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: done ? 'var(--text-body)' : 'var(--text-faint)',
        fontWeight: i === idx ? 500 : 400,
        paddingRight: 8
      }
    }, DG_STATUSES[s].label));
  }));
}
function RepairStatus({
  repair,
  onQuote,
  quoteApproved
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 780,
      margin: '0 auto',
      padding: 'var(--space-xxl) var(--space-lg) var(--space-4xl)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '.125px',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, "Fiche ", repair.id), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '4px 0 0',
      fontSize: 40,
      fontWeight: 700,
      letterSpacing: '-1px',
      lineHeight: 1.1,
      color: 'var(--text-heading)'
    }
  }, repair.bike), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 16,
      color: 'var(--text-muted)'
    }
  }, "D\xE9pos\xE9 le ", repair.received, " \xB7 Atelier Nord, 14 rue des Peupliers")), /*#__PURE__*/React.createElement(StatusPill, {
    status: repair.status
  })), /*#__PURE__*/React.createElement(Card, {
    elevated: true
  }, /*#__PURE__*/React.createElement(Stepper, {
    current: repair.status
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '16px 0 0',
      fontSize: 16,
      lineHeight: 1.5,
      color: 'var(--text-body)'
    }
  }, repair.status === 'waiting_part' ? 'La pièce est commandée. Réception prévue vendredi 31 juillet.' : 'Votre vélo est en cours de réparation. Récupération prévue le 31 juillet.')), !quoteApproved && /*#__PURE__*/React.createElement(Card, {
    accent: "var(--sticker-orange)",
    title: "Devis \xE0 valider"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16,
      lineHeight: 1.5,
      color: 'var(--text-muted)'
    }
  }, "L\u2019atelier a \xE9tabli un devis de ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-heading)'
    }
  }, repair.quote), ". La r\xE9paration d\xE9marre apr\xE8s votre validation."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: onQuote
  }, "Valider le devis"), /*#__PURE__*/React.createElement(Button, {
    variant: "utility",
    size: "sm"
  }, "Voir le d\xE9tail"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Interventions pr\xE9vues"
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: '6px 0 0',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, repair.tasks.map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: 8,
      fontSize: 15,
      color: t.done ? 'var(--text-muted)' : 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.done ? 'var(--sticker-green)' : 'var(--text-faint)'
    }
  }, t.done ? '✓' : '·'), t.label)))), /*#__PURE__*/React.createElement(Card, {
    title: "Historique"
  }, /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: '6px 0 0',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [...repair.timeline].reverse().map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 99,
      background: DG_STATUSES[t.status].color,
      marginTop: 6,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--text-body)'
    }
  }, t.label), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-faint)'
    }
  }, t.date))))))), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-md) var(--space-lg)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--text-body)',
      flex: 1
    }
  }, "Une question sur votre r\xE9paration ?"), /*#__PURE__*/React.createElement(Button, {
    variant: "utility",
    size: "sm"
  }, "\xC9crire \xE0 l\u2019atelier"), /*#__PURE__*/React.createElement(Button, {
    variant: "utility",
    size: "sm"
  }, "01 45 22 88 10"))));
}
Object.assign(window, {
  RepairStatus,
  Stepper
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/espace-client/RepairStatus.jsx", error: String((e && e.message) || e) }); }

// ui_kits/espace-client/app.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  NavBar,
  Footer,
  Button,
  Toast
} = window.DGDesignSystem_9728f7;
const REPAIR = {
  id: 'DG-1042',
  bike: 'VTT Rockrider ST 520',
  status: 'waiting_part',
  received: '23 juillet',
  quote: '142 €',
  tasks: [{
    label: 'Changement de moyeu arrière',
    done: false
  }, {
    label: 'Dévoilage roue arrière',
    done: true
  }, {
    label: 'Réglage des freins',
    done: false
  }],
  timeline: [{
    status: 'received',
    label: 'Vélo réceptionné par l’atelier',
    date: '23 juil. · 16:30'
  }, {
    status: 'diagnostic',
    label: 'Diagnostic établi, devis envoyé',
    date: '24 juil. · 09:15'
  }, {
    status: 'waiting_part',
    label: 'Moyeu commandé — réception vendredi',
    date: '24 juil. · 10:02'
  }]
};
function ClientApp() {
  const [view, setView] = React.useState('lookup');
  const [error, setError] = React.useState(undefined);
  const [quoteApproved, setQuote] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);
  const submit = ref => {
    if (!/^DG-\d{4}$/i.test(ref.trim())) {
      setError('Numéro de fiche introuvable. Vérifiez votre reçu.');
      return;
    }
    setError(undefined);
    setView('status');
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--canvas)'
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    links: [{
      label: 'Suivre ma réparation',
      active: true
    }, {
      label: 'L’atelier'
    }, {
      label: 'Horaires'
    }],
    actions: view === 'status' ? /*#__PURE__*/React.createElement(Button, {
      variant: "utility",
      size: "sm",
      onClick: () => setView('lookup')
    }, "Autre fiche") : /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        fontSize: 15
      }
    }, "Espace atelier")
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1
    }
  }, view === 'lookup' ? /*#__PURE__*/React.createElement(Lookup, {
    onSubmit: submit,
    error: error
  }) : /*#__PURE__*/React.createElement(RepairStatus, {
    repair: REPAIR,
    quoteApproved: quoteApproved,
    onQuote: () => {
      setQuote(true);
      setToast({
        tone: 'success',
        title: 'Devis validé',
        description: 'L’atelier a été prévenu, la réparation peut démarrer.'
      });
    }
  })), /*#__PURE__*/React.createElement(Footer, {
    tagline: "Le suivi de r\xE9paration, sans appels.",
    legal: "\xA9 2026 D-g \xB7 Atelier Nord, 14 rue des Peupliers",
    columns: [{
      title: 'Client',
      links: [{
        label: 'Suivre une réparation'
      }, {
        label: 'Horaires'
      }, {
        label: 'Nous contacter'
      }]
    }, {
      title: 'Atelier',
      links: [{
        label: 'Espace atelier'
      }, {
        label: 'Tarifs'
      }]
    }, {
      title: 'Légal',
      links: [{
        label: 'Mentions légales'
      }, {
        label: 'Confidentialité'
      }]
    }]
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 24,
      bottom: 24,
      zIndex: 80
    }
  }, /*#__PURE__*/React.createElement(Toast, _extends({}, toast, {
    onClose: () => setToast(null)
  }))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(ClientApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/espace-client/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site-vitrine/Landing.jsx
try { (() => {
const {
  NavBar,
  HeroBand,
  Card,
  Badge,
  Button,
  PricingPlanCard,
  Footer,
  StatusPill
} = window.DGDesignSystem_9728f7;
function Section({
  eyebrow,
  title,
  subtitle,
  children,
  background
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: background || 'transparent',
      padding: 'var(--space-4xl) var(--space-xxl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      marginBottom: 'var(--space-xxl)'
    }
  }, eyebrow && /*#__PURE__*/React.createElement(Badge, null, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 8px',
      fontSize: 40,
      fontWeight: 700,
      letterSpacing: '-1px',
      lineHeight: 1.1,
      color: 'var(--text-heading)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16,
      lineHeight: 1.5,
      color: 'var(--text-muted)'
    }
  }, subtitle)), children));
}
function Landing() {
  const features = [{
    accent: 'var(--sticker-teal)',
    title: 'Un registre, pas un cahier',
    body: 'Toutes les fiches au même endroit : vélo, client, pièces, mécano assigné, échéance.'
  }, {
    accent: 'var(--sticker-purple)',
    title: 'Le client se renseigne seul',
    body: 'Un lien de suivi par réparation. Le téléphone de l’atelier arrête de sonner.'
  }, {
    accent: 'var(--sticker-orange)',
    title: 'Les pièces sous contrôle',
    body: 'Le statut « attente pièce » indique ce qui bloque et depuis combien de temps.'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--canvas)'
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    links: [{
      label: 'Fonctionnalités',
      active: true
    }, {
      label: 'Espace client'
    }, {
      label: 'Tarifs'
    }],
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        fontSize: 15
      }
    }, "Se connecter"), /*#__PURE__*/React.createElement(Button, {
      variant: "utility",
      size: "sm"
    }, "Essayer D-g"))
  }), /*#__PURE__*/React.createElement(HeroBand, {
    eyebrow: /*#__PURE__*/React.createElement(Badge, {
      tone: "inverse"
    }, "Pour les ateliers v\xE9lo"),
    title: "Vos r\xE9parations, au clair",
    subtitle: "D-g centralise le suivi des r\xE9parations : l\u2019atelier s\u2019organise, le client suit l\u2019avancement tout seul.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      size: "lg"
    }, "Essayer gratuitement"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "lg"
    }, "Voir une d\xE9mo"))
  }), /*#__PURE__*/React.createElement(Section, {
    eyebrow: "Atelier",
    title: "Ce qui change d\xE8s la premi\xE8re semaine",
    subtitle: "Trois fonctions, aucune formation n\xE9cessaire."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-lg)'
    }
  }, features.map(ft => /*#__PURE__*/React.createElement(Card, {
    key: ft.title,
    accent: ft.accent,
    title: ft.title
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16,
      lineHeight: 1.5,
      color: 'var(--text-muted)'
    }
  }, ft.body))))), /*#__PURE__*/React.createElement(Section, {
    title: "Six \xE9tats, du d\xE9p\xF4t \xE0 la restitution",
    subtitle: "Le m\xEAme vocabulaire pour l\u2019atelier et pour le client.",
    background: "var(--surface-card)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      marginBottom: 'var(--space-lg)'
    }
  }, ['received', 'diagnostic', 'waiting_part', 'in_progress', 'ready', 'collected'].map(s => /*#__PURE__*/React.createElement(StatusPill, {
    key: s,
    status: s
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--canvas)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-xl)',
      height: 260,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-faint)',
      fontSize: 14
    }
  }, "Emplacement capture produit \u2014 aucun visuel fourni dans les sources")), /*#__PURE__*/React.createElement(Section, {
    eyebrow: "Tarifs",
    title: "Un prix par atelier, pas par m\xE9cano",
    subtitle: "Sans engagement, r\xE9siliable \xE0 tout moment."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-lg)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(PricingPlanCard, {
    name: "Solo",
    price: "19 \u20AC",
    description: "Pour un r\xE9parateur ind\xE9pendant.",
    features: ['50 fiches / mois', 'Lien de suivi client', 'Export CSV']
  }), /*#__PURE__*/React.createElement(PricingPlanCard, {
    name: "Atelier",
    price: "39 \u20AC",
    featured: true,
    description: "Pour un atelier de 2 \xE0 5 m\xE9canos.",
    features: ['Fiches illimitées', 'SMS clients automatiques', 'Suivi des pièces', 'Planning partagé'],
    ctaLabel: "Commencer"
  }), /*#__PURE__*/React.createElement(PricingPlanCard, {
    name: "R\xE9seau",
    price: "89 \u20AC",
    description: "Pour plusieurs points de vente.",
    features: ['Multi-ateliers', 'Statistiques consolidées', 'Support prioritaire']
  }))), /*#__PURE__*/React.createElement(Footer, {
    tagline: "Le suivi de r\xE9paration, sans appels.",
    legal: "\xA9 2026 D-g",
    columns: [{
      title: 'Produit',
      links: [{
        label: 'Fonctionnalités'
      }, {
        label: 'Tarifs'
      }, {
        label: 'Espace client'
      }]
    }, {
      title: 'Ressources',
      links: [{
        label: 'Guide de démarrage'
      }, {
        label: 'Support'
      }]
    }, {
      title: 'Légal',
      links: [{
        label: 'Mentions légales'
      }, {
        label: 'Confidentialité'
      }]
    }]
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Landing, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site-vitrine/Landing.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.DG_STATUSES = __ds_scope.DG_STATUSES;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.HeroBand = __ds_scope.HeroBand;

__ds_ns.PricingPlanCard = __ds_scope.PricingPlanCard;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.TextInput = __ds_scope.TextInput;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.SidebarRow = __ds_scope.SidebarRow;

})();
