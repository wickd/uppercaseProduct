let b = require('bluebird');
let Subscriber = require('../../../administrator/models/Subscriber');
let Email = require('../../../dashboard/administrator/helpers/email');
let h = require('../../../dashboard/administrator/helpers');
let f = require('../../../dashboard/administrator/helpers/functions');

const EMAIL_SUBJECT = "PGI ";

/**
 * attachment mixin
 * @param superclass
 */
module.exports = superclass => class extends superclass {

    /**
     * get all media resources
     * @returns {*}
     */
    subscribers() {
        return (new Subscriber()).where('active', '=', 1).all();
    }

    save() {
        let app = global.dashboard;
        let locale = app.get('locale').id() || 1;

        let module = this.constructor.name;


        return b.all([super.save(), this.subscribers()])
        //send emails
            .spread((data, subscribers)=> {

                let info = (this['hasTranslation'] && this.hasTranslation())
                    ? this.translations[locale]
                    : this.getAttributes();

                return [data, info, subscribers]
            })
            //test entity for title and email
            .spread((data, info, subscribers)=> {

                let emails = [];

                if (h.isset(info.title) && h.isset(info.body)) {

                    let subject = f.unescape(`${EMAIL_SUBJECT} ${module}: ${info.title}`);
                    let body = f.unescape(info.body);

                    h.each(subscribers, (subscriber, key)=> {
                        emails.push(Email.send(subscriber.email, subject, body));
                    });

                }
                else {
                    console.log('newsletter : no title and body has been set for ' + module);
                }

                return [data, b.all(emails)];
            })
            //return data
            .spread((data, emails)=> {

                if (emails) {
                    console.log('Email error', emails);
                }

                return data;
            })

    }

};