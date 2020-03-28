"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var clsx_1 = __importDefault(require("clsx"));
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var Popper_1 = __importDefault(require("@material-ui/core/Popper"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var List_1 = __importDefault(require("@material-ui/core/List"));
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var react_window_1 = require("react-window");
var styles_1 = require("@material-ui/core/styles");
var fontFamilies_1 = require("./fontFamilies");
var fontListStyles = function (theme) {
    return styles_1.createStyles({
        root: {
            minWidth: 225
        }
    });
};
var FONT_CACHE = {};
var isServer = typeof window === 'undefined';
function loadFont(family) {
    if (!family || isServer || FONT_CACHE[family]) {
        return;
    }
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    var css = "@import url('https://fonts.googleapis.com/css?family=" + family.replace(/\s/gi, '+') + "');";
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
    FONT_CACHE[family] = true;
}
function Row(props) {
    var index = props.index, style = props.style, data = props.data;
    var onFontSelected = data && data.onFontSelected ? data.onFontSelected : null;
    var family = data.filteredFontFamilies[index].family;
    react_1.useEffect(function () {
        loadFont(family);
    }, [data.filteredFontFamilies]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ListItem_1.default, { button: true, style: style, key: index, onClick: function () { return onFontSelected && onFontSelected(data.filteredFontFamilies[index]); } },
            react_1.default.createElement(ListItemText_1.default, { primary: family, style: { fontFamily: family }, disableTypography: true }))));
}
function _FontList(_a) {
    var classes = _a.classes, className = _a.className, onFontSelected = _a.onFontSelected, searchable = _a.searchable;
    var _b = react_1.useState(''), query = _b[0], setQuery = _b[1];
    var _c = react_1.useState(fontFamilies_1.fontFamilies), filteredFontFamilies = _c[0], setFilteredFontFamilies = _c[1];
    return (react_1.default.createElement(Paper_1.default, { className: clsx_1.default(classes.root, className) },
        searchable && (react_1.default.createElement(ListItem_1.default, null,
            react_1.default.createElement(TextField_1.default, { value: query, margin: "dense", variant: "outlined", placeholder: "Search...", onChange: function (event) {
                    var value = event.target.value || '';
                    setQuery(value);
                    if (value === '') {
                        setFilteredFontFamilies(fontFamilies_1.fontFamilies);
                    }
                    else {
                        setFilteredFontFamilies(fontFamilies_1.fontFamilies.filter(function (family) {
                            var re = new RegExp(value, 'gi');
                            return re.test(family.family);
                        }));
                    }
                } }))),
        react_1.default.createElement(react_window_1.FixedSizeList, { height: 300, width: 225, itemSize: 46, itemCount: filteredFontFamilies.length, outerElementType: List_1.default, itemData: { onFontSelected: onFontSelected, filteredFontFamilies: filteredFontFamilies } }, Row)));
}
var FontList = styles_1.withStyles(fontListStyles)(_FontList);
var fontPickerStyles = function (theme) {
    return styles_1.createStyles({
        root: {},
        pickerButton: {
            marginLeft: theme.spacing(2),
            textTransform: 'none'
        }
    });
};
function GoogleFontPicker(_a) {
    var className = _a.className, classes = _a.classes, defaultFont = _a.defaultFont, label = _a.label, onFontSelected = _a.onFontSelected, _b = _a.placement, placement = _b === void 0 ? 'left' : _b, _c = _a.buttonColor, buttonColor = _c === void 0 ? 'primary' : _c, _d = _a.buttonVariant, buttonVariant = _d === void 0 ? 'contained' : _d, searchable = _a.searchable;
    var _e = react_1.useState(null), currentFont = _e[0], setCurrentFont = _e[1];
    var _f = react_1.default.useState(null), anchorEl = _f[0], setAnchorEl = _f[1];
    var open = Boolean(anchorEl);
    var id = open ? 'simple-popper' : undefined;
    react_1.useEffect(function () {
        loadFont(defaultFont);
        setCurrentFont(defaultFont);
    }, [defaultFont]);
    return (react_1.default.createElement("div", { className: clsx_1.default(classes.root, className) },
        react_1.default.createElement(Grid_1.default, { container: true, alignItems: "center" },
            label && (react_1.default.createElement(Grid_1.default, { item: true },
                react_1.default.createElement(Typography_1.default, { className: classes.label, variant: "body1" }, label))),
            react_1.default.createElement(Grid_1.default, { item: true },
                react_1.default.createElement(Button_1.default, { className: classes.pickerButton, onClick: function (event) {
                        setAnchorEl(anchorEl ? null : event.currentTarget);
                    }, color: buttonColor, variant: buttonVariant },
                    react_1.default.createElement("span", { style: { fontFamily: currentFont || 'sans-serif' } }, currentFont)))),
        react_1.default.createElement(Popper_1.default, { id: id, open: open, anchorEl: anchorEl, placement: placement, transition: true },
            react_1.default.createElement(FontList, { onFontSelected: function (family) {
                    setAnchorEl(null);
                    var familyName = typeof family === 'string' ? family : family.family;
                    setCurrentFont(familyName);
                    onFontSelected && onFontSelected(family);
                }, searchable: searchable }))));
}
exports.default = styles_1.withStyles(fontPickerStyles)(GoogleFontPicker);
//# sourceMappingURL=index.js.map

//# sourceMappingURL={"version":3,"file":"index.js","sourceRoot":"","sources":["index.tsx"],"names":[],"mappings":";;;;;;;;;;;;AAAA,6CAAmD;AACnD,8CAAwB;AACxB,kEAA4C;AAC5C,oEAA8C;AAC9C,oEAA8C;AAC9C,gEAA0C;AAC1C,wEAAkD;AAClD,gFAA0D;AAC1D,4EAAsD;AACtD,gEAA0C;AAC1C,0EAAoD;AACpD,6CAAsE;AACtE,mDAA2E;AAE3E,+CAA8C;AAE9C,IAAM,cAAc,GAAG,UAAC,KAAY;IAClC,OAAA,qBAAY,CAAC;QACX,IAAI,EAAE;YACJ,QAAQ,EAAE,GAAG;SACd;KACF,CAAC;AAJF,CAIE,CAAC;AAEL,IAAI,UAAU,GAAQ,EAAE,CAAC;AAEzB,IAAM,QAAQ,GAAG,OAAO,MAAM,KAAK,WAAW,CAAC;AAE/C,SAAS,QAAQ,CAAC,MAA0B;IAC1C,IAAI,CAAC,MAAM,IAAI,QAAQ,IAAI,UAAU,CAAC,MAAM,CAAC,EAAE;QAC7C,OAAO;KACR;IACD,IAAM,IAAI,GAAG,QAAQ,CAAC,IAAI,IAAI,QAAQ,CAAC,oBAAoB,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,CAAC;IACvE,IAAM,KAAK,GAAG,QAAQ,CAAC,aAAa,CAAC,OAAO,CAAC,CAAC;IAC9C,KAAK,CAAC,IAAI,GAAG,UAAU,CAAC;IACxB,IAAM,GAAG,GAAG,0DAAwD,MAAM,CAAC,OAAO,CAChF,MAAM,EACN,GAAG,CACJ,QAAK,CAAC;IACP,KAAK,CAAC,WAAW,CAAC,QAAQ,CAAC,cAAc,CAAC,GAAG,CAAC,CAAC,CAAC;IAChD,IAAI,CAAC,WAAW,CAAC,KAAK,CAAC,CAAC;IAExB,UAAU,CAAC,MAAM,CAAC,GAAG,IAAI,CAAC;AAC5B,CAAC;AAED,SAAS,GAAG,CAAC,KAA8B;IACjC,IAAA,mBAAK,EAAE,mBAAK,EAAE,iBAAI,CAAW;IACrC,IAAM,cAAc,GAClB,IAAI,IAAI,IAAI,CAAC,cAAc,CAAC,CAAC,CAAC,IAAI,CAAC,cAAc,CAAC,CAAC,CAAC,IAAI,CAAC;IAEnD,IAAA,gDAAM,CAAsC;IAEpD,iBAAS,CAAC;QACR,QAAQ,CAAC,MAAM,CAAC,CAAC;IACnB,CAAC,EAAE,CAAC,IAAI,CAAC,oBAAoB,CAAC,CAAC,CAAC;IAEhC,OAAO,CACL;QACE,8BAAC,kBAAQ,IACP,MAAM,QACN,KAAK,EAAE,KAAK,EACZ,GAAG,EAAE,KAAK,EACV,OAAO,EAAE,cAAM,OAAA,cAAc,IAAI,cAAc,CAAC,IAAI,CAAC,oBAAoB,CAAC,KAAK,CAAC,CAAC,EAAlE,CAAkE;YAEjF,8BAAC,sBAAY,IACX,OAAO,EAAE,MAAM,EACf,KAAK,EAAE,EAAE,UAAU,EAAE,MAAM,EAAE,EAC7B,iBAAiB,SACjB,CACO,CACV,CACJ,CAAC;AACJ,CAAC;AASD,SAAS,SAAS,CAAC,EAAiE;QAA/D,oBAAO,EAAE,wBAAS,EAAE,kCAAc,EAAE,0BAAU;IAC3D,IAAA,yBAAgC,EAA/B,aAAK,EAAE,gBAAwB,CAAC;IACjC,IAAA,kDAAwE,EAAvE,4BAAoB,EAAE,+BAAiD,CAAC;IAE/E,OAAO,CACL,8BAAC,eAAK,IAAC,SAAS,EAAE,cAAI,CAAC,OAAO,CAAC,IAAI,EAAE,SAAS,CAAC;QAC5C,UAAU,IAAI,CACb,8BAAC,kBAAQ;YACP,8BAAC,mBAAS,IACR,KAAK,EAAE,KAAK,EACZ,MAAM,EAAC,OAAO,EACd,OAAO,EAAC,UAAU,EAClB,WAAW,EAAC,WAAW,EACvB,QAAQ,EAAE,UAAC,KAAU;oBACnB,IAAM,KAAK,GAAG,KAAK,CAAC,MAAM,CAAC,KAAK,IAAI,EAAE,CAAC;oBACvC,QAAQ,CAAC,KAAK,CAAC,CAAC;oBAChB,IAAI,KAAK,KAAK,EAAE,EAAE;wBAChB,uBAAuB,CAAC,2BAAY,CAAC,CAAC;qBACvC;yBAAM;wBACL,uBAAuB,CAAC,2BAAY,CAAC,MAAM,CAAC,UAAC,MAAW;4BACtD,IAAM,EAAE,GAAG,IAAI,MAAM,CAAC,KAAK,EAAE,IAAI,CAAC,CAAC;4BACnC,OAAO,EAAE,CAAC,IAAI,CAAC,MAAM,CAAC,MAAM,CAAC,CAAC;wBAChC,CAAC,CAAC,CAAC,CAAA;qBACJ;gBACH,CAAC,GACD,CACO,CACZ;QACD,8BAAC,4BAAa,IACZ,MAAM,EAAE,GAAG,EACX,KAAK,EAAE,GAAG,EACV,QAAQ,EAAE,EAAE,EACZ,SAAS,EAAE,oBAAoB,CAAC,MAAM,EACtC,gBAAgB,EAAE,cAAI,EACtB,QAAQ,EAAE,EAAE,cAAc,gBAAA,EAAE,oBAAoB,sBAAA,EAAE,IAEjD,GAAG,CACU,CACV,CACT,CAAC;AACJ,CAAC;AAED,IAAM,QAAQ,GAAG,mBAAU,CAAC,cAAc,CAAC,CAAC,SAAS,CAAC,CAAC;AA2BvD,IAAM,gBAAgB,GAAG,UAAC,KAAY;IACpC,OAAA,qBAAY,CAAC;QACX,IAAI,EAAE,EAAE;QACR,YAAY,EAAE;YACZ,UAAU,EAAE,KAAK,CAAC,OAAO,CAAC,CAAC,CAAC;YAC5B,aAAa,EAAE,MAAM;SACtB;KACF,CAAC;AANF,CAME,CAAC;AAEL,SAAS,gBAAgB,CAAC,EAUlB;QATN,wBAAS,EACT,oBAAO,EACP,4BAAW,EACX,gBAAK,EACL,kCAAc,EACd,iBAAkB,EAAlB,uCAAkB,EAClB,mBAAuB,EAAvB,4CAAuB,EACvB,qBAA2B,EAA3B,gDAA2B,EAC3B,0BAAU;IAEJ,IAAA,2BAAyE,EAAxE,mBAAW,EAAE,sBAA2D,CAAC;IAC1E,IAAA,mCAA8C,EAA7C,gBAAQ,EAAE,mBAAmC,CAAC;IAErD,IAAM,IAAI,GAAG,OAAO,CAAC,QAAQ,CAAC,CAAC;IAC/B,IAAM,EAAE,GAAG,IAAI,CAAC,CAAC,CAAC,eAAe,CAAC,CAAC,CAAC,SAAS,CAAC;IAE9C,iBAAS,CAAC;QACR,QAAQ,CAAC,WAAW,CAAC,CAAC;QACtB,cAAc,CAAC,WAAW,CAAC,CAAC;IAC9B,CAAC,EAAE,CAAC,WAAW,CAAC,CAAC,CAAC;IAElB,OAAO,CACL,uCAAK,SAAS,EAAE,cAAI,CAAC,OAAO,CAAC,IAAI,EAAE,SAAS,CAAC;QAC3C,8BAAC,cAAI,IAAC,SAAS,QAAC,UAAU,EAAC,QAAQ;YAChC,KAAK,IAAI,CACR,8BAAC,cAAI,IAAC,IAAI;gBACR,8BAAC,oBAAU,IAAC,SAAS,EAAE,OAAO,CAAC,KAAK,EAAE,OAAO,EAAC,OAAO,IAClD,KAAK,CACK,CACR,CACR;YACD,8BAAC,cAAI,IAAC,IAAI;gBACR,8BAAC,gBAAM,IACL,SAAS,EAAE,OAAO,CAAC,YAAY,EAC/B,OAAO,EAAE,UAAC,KAAU;wBAClB,WAAW,CAAC,QAAQ,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,KAAK,CAAC,aAAa,CAAC,CAAC;oBACrD,CAAC,EACD,KAAK,EAAE,WAAW,EAClB,OAAO,EAAE,aAAa;oBAEtB,wCAAM,KAAK,EAAE,EAAE,UAAU,EAAE,WAAW,IAAI,YAAY,EAAE,IACrD,WAAW,CACP,CACA,CACJ,CACF;QACP,8BAAC,gBAAM,IACL,EAAE,EAAE,EAAE,EACN,IAAI,EAAE,IAAI,EACV,QAAQ,EAAE,QAAQ,EAClB,SAAS,EAAE,SAAS,EACpB,UAAU;YAEV,8BAAC,QAAQ,IACP,cAAc,EAAE,UAAC,MAAW;oBAC1B,WAAW,CAAC,IAAI,CAAC,CAAC;oBAClB,IAAM,UAAU,GACd,OAAO,MAAM,KAAK,QAAQ,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,MAAM,CAAC,MAAM,CAAC;oBACtD,cAAc,CAAC,UAAU,CAAC,CAAC;oBAC3B,cAAc,IAAI,cAAc,CAAC,MAAM,CAAC,CAAC;gBAC3C,CAAC,EACD,UAAU,EAAE,UAAU,GACtB,CACK,CACL,CACP,CAAC;AACJ,CAAC;AAED,kBAAe,mBAAU,CAAC,gBAAgB,CAAC,CAAC,gBAAgB,CAAC,CAAC"}