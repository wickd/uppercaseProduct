// more info check for npm 'slug'
let slug = require('slug');
let h = require('../../administrator/helpers');

/**
 * Sluggable mixin.
 *
 * Available options:
 *     replacement: '-',               // replace spaces with replacement
 *     symbols: true,                  // replace unicode symbols or not
 *     remove: null,                   // (optional) regex to remove characters
 *     lower: true,                    // result in lower case
 *     charmap: slug.charmap,          // replace special characters
 *     multicharmap: slug.multicharmap // replace multi-characters
 * for more information, check https://github.com/dodo/node-slug
 */
module.exports = superclass => class extends superclass {
    /**
     * Boot mixins.
     */
    boot()
    {
        if (super.boot) super.boot();

        // sluggable fields.
        this.sluggable = [ 'slug' ];

        // sluggable options.
        this.sluggifyOptions = {
            slug: {
                from: 'title',
                // sluggify: 'create',
                options: {lower: true}
            }
        };
    }

    /**
     * Sluggify field process.
     *
     * @param field
     * @return {string}
     */
    sluggify(field)
    {
        let options = this.getSluggifyOptions()[field];

        if(options && options.from && this.hasAttribute(options.from))
        {
            return slug(this.getAttribute(options.from), this.cleanSluggableOptions(options.options));
        } else {
            h.print(`Can't sluggify attribute ${field}`);

            return '';
        }
    }

    /**
     * Clean sluggable options.
     *
     * @param options
     * @return {{}}
     */
    cleanSluggableOptions(options)
    {
        let available = [ 'replacement', 'symbols', 'remove', 'lower', 'charmap', 'multicharmap' ];

        return h.object_filter(options, (value, key) => {
            return h.in_object(key, available);
        });
    }

    /**
     * Override extend method to handle sluggalble interface.
     *
     * @return this
     */
    save()
    {
        let sluggable = this.getSluggable();

        if(sluggable)
        {
            h.each(sluggable, (field) => {
                if(h.empty(this[field]) || ! this.exists())
                {
                    super.setAttribute(field, this.sluggify(field));
                }
            });
        }

        return super.save();
    }

    /**
     * Get sluggable fields, which will be sluggify on save.
     *
     * @return {Array|[string]}
     */
    getSluggable()
    {
        return this.sluggable;
    }

    /**
     * Get sluggable options, which will be used for sluggify.
     *
     * @return {{slug: {from: string, options: {lower: boolean}}}|*}
     */
    getSluggifyOptions()
    {
        return this.sluggifyOptions;
    }
};