let model = require(_namespace.app_path() + '/Option');

let element =
    {
        title: "General Settings",
        model: model,
        query: q => q.order("id", false),
        edit_fields: {

            'site::name' : {
                label : 'Site name',
                type : 'text'
            },
            'site::status' : {
                label : 'Site Status',
                type : 'text'
            },
            'site::mail_support' : {
                label : 'Support email',
                type : 'email'
            },
            // 'contact::skype' : {
            //     label : 'Contact skype',
            //     type : 'text'
            // },
            // 'site::address' : {
            //     label: 'Site Adress',
            //     type: 'summernote'
            // },
            // 'site::phone' : {
            //     label: 'Site phone',
            //     type: 'text'
            // },
            // 'contact::email' : {
            //     label: 'Contact email',
            //     type: 'email'
            // },
            // 'site::business_hours' : {
            //     label: 'Business hours',
            //     type: 'date'
            // },
            // 'contact::phone' : {
            //     label: 'Contact phone',
            //     type: 'text',
            // },
            // 'site::link' : {
            //     label: 'site link',
            //     type: 'text'
            // },
            // 'contact::office_email' : {
            //     label: 'Office email',
            //     type: 'email'
            // },
            // 'site::facebook_id' : {
            //     label: 'Facebook application id',
            //     type: 'text'
            // },
            // 'site::facebook_secret' : {
            //     label: 'Facebook application secret',
            //     type: 'text'
            // },
            // 'site::google_recaptcha_key' : {
            //     label: 'Google reCaptcha key',
            //     type: 'text'
            // },
            // 'site::google_recaptcha_secret' : {
            //     label: 'Googel reCaptcha seecret',
            //     type: 'text'
            // },
            // 'site::google_maps_key' : {
            //     label: 'Google maps key',
            //     type: 'text'
            // }
        }
    };

module.exports = element;