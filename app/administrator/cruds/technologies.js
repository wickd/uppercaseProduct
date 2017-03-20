let model = require('../models/technology');
let f = require('../../dashboard/administrator/helpers/functions');
let h = require('../../dashboard/administrator/helpers');

let element =
    {
        title : "Technologies",
        model : model,
        columns : {
            id : {},
            name : {},
            active : {
                output : row => f.output_boolean(row)
            }
        },
        actions : {
            each : {
                showcases : {
                    title : 'Showcases',
                    url : `showcase_technologies?technology=(:id)`
                }
            }
        },
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