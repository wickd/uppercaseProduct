const FILEPATH = 'filepath';
const FILENAME = 'filename';
const ORIGINAL = 'original_name';
const MIME = 'mime';
const TYPE = 'type';

module.exports = superclass => class extends superclass {

    /**
     * Boot another possible mixins.
     *
     * @return void
     */
    boot()
    {
        if (super.boot) super.boot();
    }

    /**
     * Generate image full path against uploaded folder.
     *
     * @param type
     * @return Promise
     */
    cover(type = 'cover_image')
    {
        return this.model.cover(type)
            .then(att => {
                if(att)
                {
                    return this.helper()
                    .sprintf('/%s/%s',
                        att.getAttribute(FILEPATH),
                        att.getAttribute(FILENAME)
                    );
                }
                
                return this.getDefaultImage();
            });
    }

    /**
     * Generate html image
     *
     * @param image
     * @param sizes
     */
    image(image, sizes = {w : 150, h : 150})
    {
        //
    }

    /**
     * Get default image of model.
     *
     * @return {String} [description]
     */
    getDefaultImage()
    {
        return '/assets/images/no-image.jpg';
    }
};