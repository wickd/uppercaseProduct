let model = require(_namespace.app_path() + '/Position');
let f = require('../../dashboard/administrator/helpers/functions');
let h = require('../../dashboard/administrator/helpers');

let element =
    {
        title : "Positions",
        model : model,
        columns : {
            id : {},
            name : {},
            active : {
                output : row => f.output_boolean(row)
            }
        },
        actions : {},
        query : q => q.order("id", false),
        edit_fields : {
            name : {
                type : 'text',
                translatable : true
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