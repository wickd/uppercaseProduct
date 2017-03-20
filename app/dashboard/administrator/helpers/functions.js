let pug = require('pug');
let config = require('../config');
let h = require('./index');
let moment = require('moment');
let url = require('url');
let querystring = require('querystring');
let _ = require('lodash');
let mkdirp = require('mkdirp');
let path = require('path');
let htmlToText = require('html-to-text');

const
    TEXT = 'text',
    HIDDEN = 'hidden',
    BOOL = 'bool',
    EMAIL = 'email',
    NUMBER = 'number';

/**
 * Render html from file.
 *
 * @param view_path
 * @param {*} options
 * @param {*} fn
 * @return {String}
 */
exports.view = (view_path, options, fn = undefined) => {
    // todo: rework it or find better way to resolve it..
    return pug.renderFile(`${config.get('dashboard.get_administrator_path')}${view_path}`, options, fn);
};

/**
 * Render image.
 *
 * @param {*} row
 * @param {string|null} field
 * @param {{}} attributes
 */
exports.output_image = (row, field = null, attributes = {}) => {
    let path = '';

    if(h.is_object(row) && h.is_string(field))
    {
        if(h.is_undef(row[field]))
        {
            console.log(`Unknown property ${field} in class ${h.get_class(row)}`);

            return '';
        }

        path = row[field];
    } else if(h.is_object(row) && h.is_callable(field))
    {
        path = field(row);
    } else if(h.is_string(row)) {
        path = row;
    }

    attributes = module.exports.html_attributes(attributes);

    return (path ? `<img src="${path}" ${attributes}>` : '');
};

/**
 * Render output label
 * 
 * @param {*} row
 * @param {string|null} field
 * @param {Object} types [ primary, success, warning, danger, info, default ]
 * @return {String}
 */
exports.output_label = (row, field = null, types = {}, value = null, attributes = {}) => {
    let title = value ? value : row[field];
    let _type = 'default';
    let _title = 'none';
    attributes = module.exports.html_attributes(attributes);    

    if(title)
    {
        _title = h.uc_first(h.explode("_", title).join(" "));
        _type = types[title] ? types[title] : 'default';
    } else {
        _title = types['default'] ? (types['default']['title'] ? types['default']['title'] : 'none') : 'none';
        _type = types['default'] ? (types['default']['type'] ? types['default']['type'] : 'default') : 'default';
    }

    return `<span style="width: 100%" class="label label-${_type}" ${attributes}>${_title}</span>`;
};

/**
 *
 * @param row
 * @param field
 * @returns {*}
 */
exports.output_boolean = (row, field = 'active') => {
    if(h.is_undef(row[field]))
    {
        console.log(`Unknown property ${field} in class ${h.get_class(row)}`);

        return '';
    }

    return (row[field] ? `<i class="fa fa-fw fa-check"></i>` : '');
};

/**
 * Output url.
 *
 * @param row
 * @param field
 * @param href
 * @return {string}
 */
exports.output_url = (row, field = 'id', href = '#') => {
    return `<a href="${href}">${row[field]}</a>`;
};

/**
 * Output date.
 *
 * @param row
 * @param field
 * @param format
 * @return {*}
 */
exports.output_date = (row, field = 'created_at', format = "MM-DD-YYYY") => {
    if(h.is_undef(row[field]))
    {
        console.log(`Unknown property ${field} in class ${h.get_class(row)}`);

        return '';
    }

    if(moment(row[field]))
    {
        return (row[field] ? moment(row[field]).format(format) : '');
    }

    console.log('Moment can\'t generate a date from timestamp');

    return '';
};

/**
 * Output desc. Need to avoid html tags ecranize. Костыль
 *
 * @param row
 * @param field
 * @return {*}
 */
exports.output_desc = (row, field = 'body') => {
    let text =  htmlToText.fromString(row[field]);

    if(text)
    {
        return text;
    }

    return '';
};

/**
 * Output color. ! Only hex|string formats, do not suppoer rgb(255,255,255)
 *
 * @param {*} row
 * @param {String} field
 * @param {String|'#000'} _default, Default color
 * @param {Object} options, Block options
 * @return {String}
 */
exports.output_color = (row, field = 'color', _default = '#000', options = { size: '15px', border: '#000' }) => {
    let no_color = '#000';

    let parseColor = palette => {

        let pallets = {
            indianred: '#CD5C5C',
            lightcoral: '#F08080',
            salmon: '#FA8072',
            darksalmon: '#E9967A',
            lightsalmon: '#FFA07A',
            crimson: '#DC143C',
            red: '#FF0000',
            firebrick: '#B22222',
            brick: '#B22222',
            darkred: '#8B0000',
            pink: '#FFC0CB',
            lightpink: '#FFB6C1',
            hotpink: '#FF69B4',
            deeppink: '#FF1493',
            mediumvioletred: '#C71585',
            palevioletred: '#DB7093',
            coral: '#FF7F50',
            tomato: '#FF6347',
            orangered: '#FF4500',
            darkorange: '#FF8C00',
            orange: '#FFA500',
            gold: '#FFD700',
            yellow: '#FFFF00',
            lightyellow: '#FFFFE0',
            lemoncheffon: '#FFFACD',
            lightgoldenrodyyellow: '#FAFAD2',
            papayawhip: '#FFEFD5',
            moccasin: '#FFE4B5',
            peachpuff: '#FFDAB9',
            palegoldenrod: '#EEE8AA',
            khaki: '#F0E68C',
            darkkhaki: '#BDB76B',
            lavender: '#E6E6FA',
            thistle: '#D8BFD8',
            plum: '#DDA0DD',
            violet: '#EE82EE',
            orchid: '#DA70D6',
            fuchsia: '#FF00FF',
            magenta: '#FF00FF',
            mediumorchid: '#BA55D3',
            mediumpurple: '#9370DB',
            rebeccapurple: '#663399',
            blueviolet: '#8A2BE2',
            darkviolet: '#9400D3',
            darkorchid: '#9932CC',
            darkmagenta: '#8B008B',
            purple: '#800080',
            indigo: '#4B0082',
            slateblue: '#6A5ACD',
            darkslateblue: '#483D8B',
            mediumslateblue: '#7B68EE',
            greenyellow: '#ADFF2F',
            chartreuse: '#7FFF00',
            lawngreen: '#7CFC00',
            lime: '#00FF00',
            limegreen: '#32CD32',
            palegreen: '#98FB98',
            lightgreen: '#90EE90',
            mediumspringgreen: '#00FA9A',
            springgreen: '#00FF7F',
            mediumseagreen: '#3CB371',
            seagreen: '#2E8B57',
            forestgreen: '#228B22',
            green: '#008000',
            darkgreen: '#006400',
            yellowgreen: '#9ACD32',
            olivedrab: '#6B8E23',
            olive: '#808000',
            darkolivegreen: '#556B2F',
            mediumaquamarine: '#66CDAA',
            darkseagreen: '#8FBC8B',
            lightseagreen: '#20B2AA',
            darkcyan: '#008B8B',
            teal: '#008080',
            aqua: '#00FFFF',
            cyan: '#00FFFF',
            lightcyan: '#E0FFFF',
            paleturquoise: '#AFEEEE',
            aquamarine: '#7FFFD4',
            turquoise: '#40E0D0',
            mediumtruquoise: '#48D1CC',
            darkturquoise: '#00CED1',
            cadetblue: '#5F9EA0',
            steelblue: '#4682B4',
            lightsteelblue: '#B0C4DE',
            powderblue: '#B0E0E6',
            lightblue: '#ADD8E6',
            skyblue: '#87CEEB',
            lightskyblue: '#87CEFA',
            deepskyblue: '#00BFFF',
            dodgerblue: '#1E90FF',
            cornflowerblue: '#6495ED',
            royalblue: '#4169E1',
            blue: '#0000FF',
            mediumblue: '#0000CD',
            darkblue: '#00008B',
            navy: '#000080',
            midnightblue: '#191970',
            cornsilk: '#FFF8DC',
            blanchedalmond: '#FFEBCD',
            bisque: '#FFE4C4',
            navajowhite: '#FFDEAD',
            wheat: '#F5DEB3',
            burlywood: '#DEB887',
            tan: '#D2B48C',
            rosybrown: '#BC8F8F',
            sandybrown: '#F4A460',
            goldenrod: '#DAA520',
            darkgoldenrod: '#B8860B',
            peru: '#CD853F',
            chocolate: '#D2691E',
            saddlebrown: '#8B4513',
            sienna: '#A0522D',
            brown: '#A52A2A',
            maroon: '#800000',
            white: '#FFFFFF',
            snow: '#FFFAFA',
            honeydew: '#F0FFF0',
            mintcream: '#F5FFFA',
            azure: '#F0FFFF',
            aliceblue: '#F0F8FF',
            ghostwhite: '#F8F8FF',
            whitesmoke: '#F5F5F5',
            seasheal: '#FFF5EE',
            beidge: '#F5F5DC',
            oldlace: '#FDF5E6',
            floralwhite: '#FFFAF0',
            ivory: '#FFFFF0',
            antiquewhite: '#FAEBD7',
            linen: '#FAF0E6',
            lavenderblush: '#FFF0F5',
            mistyrose: '#FFE4E1',
            gainsboro: '#DCDCDC',
            lightgray: '#D3D3D3',
            silver: '#C0C0C0',
            darkgray: '#A9A9A9',
            gray: '#808080',
            dimgray: '#696969',
            lightslategray: '#778899',
            slategray: '#708090',
            darkslategray: '#2F4F4F',
            black: '#000000'
        };

        if(h.object_key_exists(palette, pallets))
        {
            return pallets[palette];
        }

        if(h.isHex(palette))
        {
            return palette;
        }

        return (h.object_key_exists(_default, pallets) ? pallets[_default] : _default);
    };

    let color = parseColor((row && row[field]) ? row[field] : no_color );

    let style = `background-color: ${color};`
        +`height: ${options.size ? options.size : '15px'};`
        +`width: ${options.size ? options.size : '15px'};`
        +`border: 0.2px solid ${options.border ? options.border : '#000'}`;

    return `<div style="${style}"></div>`;
};

/**
 * Html attributes.
 *
 * @param attributes
 * @return {string}
 */
exports.html_attributes = (attributes = {}) => {
    let out = [];

    h.each(attributes, (value, key) => {
        if(h.is_bool(value))
        {
            out.push(`${key}="${key}"`);
        } else if(h.is_number(key))
        {
            out.push(`${value}="${value}"`);
        } else {
            value = module.exports.htmlspecialchars(value);

            out.push(`${key}="${value}"`);
        }
    });

    return out.join(" ");
};

/**
 * Escape html. HtmlSpecialChars equivalent.
 *
 * @param html
 * @return {*}
 */
exports.htmlspecialchars = html => {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return String(html).replace(/[&<>"']/g, m => map[m]);
};

/**
 * html escape
 * @param str
 * @returns {string}
 */
exports.escape = (str='')=>{
    return _.escape(str);
};

/**
 * Remove html tags from text
 *
 * @param html
 * @returns {string}
 */
exports.strip_html = html => {
    if (html)
    {
        return html.replace(/(<([^>]+)>)/ig,"");
    }

    return '';
};

/**
 * html unescape
 * @param str
 * @returns {string}
 */
exports.unescape = (str = '')=>{
    return _.unescape(str);
};

/**
 * json to querystring
 * @param json
 * @returns {*}
 */
exports.toQstring= (json)=>{
    return querystring.stringify(json);
};

/**
 * url parser
 * @param path
 * @param {*|null} elem
 * @returns {module:jsdoc/tag/type.TagInfo}
 */
exports.urlParse = (path, elem = null)=>{

    if(!h.is_null(elem))
    {
        return url.parse(path,true)[elem] || {}
    }

    return url.parse(path,true)
};

/**
 * create dir if not exists
 * @param fullPath
 * @param mask
 * @param cb
 */
exports.ensureExists =(fullPath, mask, cb) =>{
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = '0777';
    }

    mkdirp(path.dirname(fullPath), mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
};