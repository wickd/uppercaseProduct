let model = require(_namespace.app_path() + '/Admin');
let f = require('../../dashboard/administrator/helpers/functions');
let h = require('../../dashboard/administrator/helpers');

let element =
    {
        title : "Admins",
        model : model,
        columns : {
            id : {},
            email : {}
        },
        actions : {},
        query : q => q.order("id", false),
        edit_fields : {
            id : {
                type : "hidden",
            },
            name : {},
            active : {
                type : 'select',
                options : {
                    0 : 'No',
                    1 : 'Yes'
                }
            }
        }
    };

module.exports = element;