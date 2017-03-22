let model = require(_namespace.app_path() + '/Language');
let f = require('../../dashboard/administrator/helpers/functions');
let h = require('../../dashboard/administrator/helpers');

let element =
    {
        title : "Languages",
        model : model,
        columns : {
            id : {},
            title : {},
            slug : {},
            active : {
                output : row => f.output_boolean(row)
            }
        },
        actions : {},
        query : q => q,
        edit_fields : {
            title : {
                type : "text"
            },
            "slug" : {
                type : "text"
            },
            active : {
                type : 'select',
                options : {
                    0 : 'Inactive',
                    1 : 'Active'
                }
            }
        }
    };

module.exports = element;