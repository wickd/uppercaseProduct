let model = require(_namespace.app_path() + '/Contact');
let f = require('../../dashboard/administrator/helpers/functions');
let h = require('../../dashboard/administrator/helpers');

let element =
    {
        title : "Contact Us",
        model : model,
        columns : {
            id : {},
            name : {},
            email : {},
            subject : {},
            message : {},
            active : {
                output : row => f.output_boolean(row)
            }
        },
        actions : {
            global : {
                create : {
                    disabled : true
                }
            }
        },
        query : q => q.order("id", false),
        edit_fields : {
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