let model = require(_namespace.app_path() + '/Construction');
let CategoriesRepository = require(_namespace.app_path() + '/repositories/categoriesRepository');
let f = require('../../dashboard/administrator/helpers/functions');
let h = require('../../dashboard/administrator/helpers');

let element =
    {
        title : "Constructions",
        model : model,
        columns : {
            id : {},
            cover_image : {
                output : row => row.cover('cover_image')
                    .then(att => att
                        ? f.output_image(att, att => att.getFullPath(), {width: 170})
                        : 'no-image'
                    )
            },  
            slug : {},
            name : {},
            description : {
                output : row => row.present().renderDescription('description')
            },
            long_description : {
                output : row => row.present().renderDescription('long_description')
            },
            active : {
                output : row => f.output_boolean(row)
            }
        },
        actions : {},
        query : q => q.order("id", false),
        edit_fields : {
            category_id : {
                label : 'Category',
                type : 'select',
                options : () => (new CategoriesRepository()).getPublic()
                    .then(categories => categories ? categories.list('name') : [])
            },
            cover_image : {
                type : "image",
                multiple : true,
                options : {
                    dstPath : 'uploads/constructions',
                    width : 1920,
                    height : 1080
                }
            },
            name : {
                type : 'text',
                translatable : true
            },
            description : {
                type : 'summernote',
                translatable : true
            },
            long_description : {
                type : 'summernote',
                translatable : true
            },
            address : {
                type : 'text',
                translatable : true
            },
            beneficiary : {
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