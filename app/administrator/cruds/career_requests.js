let model = require(_namespace.app_path() + '/CareerRequest');
let f = require('../../dashboard/administrator/helpers/functions');
let h = require('../../dashboard/administrator/helpers');

let element =
    {
        title : "Career requests",
        model : model,
        columns : {
            id : {},
            firstname : {},
            lastname : {},
            email : {},
            position_id : {
                title : "Position",
                output : row => row.position().then(post => post ? post.name : 'no-post')
            },
            cv : {
                title : "CV",
                output : row => row.cover('cv')
                    .then(att => att
                        ? `<a href="/${att.present().renderPath()}" target="_blank">${att.present().original()}</a>`
                        : 'no-cv'
                    )
            },
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