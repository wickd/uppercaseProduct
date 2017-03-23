let Repository = require('./repository');
let Career = require(_namespace.app_path() + '/CareerRequest');
let AttachmentRepository = require(_namespace.app_path() + '/repositories/attachmentRepository');
let h = require('../dashboard/administrator/helpers');
let upload = require(_namespace.helpers_path() + '/upload');
const UPLOAD_CV_PATH = "uploads/documentsfiles";
const CV_TYPE = 'cv';

class CareersRepository extends Repository {

    /** 
     * CareersRepository constructor
     *
     * @return {CareersRepository}
     */
    constructor()
    {
        super();
    }

    /**
     * Get repository main model.
     *
     * @return {Career}
     */
    getModel()
    {
        return new Career();
    }

    /**
     * Get public socials.
     *
     * @return {Collection|null}
     */
    getPublic()
    {
        return this.getModel()
            .getPublic();
    }

    /**
     * Create contact model.
     * 
     * @param {Object} data
     * @param {Array} files
     * @return {Boolean}
     */
    create(data, files)
    {
        return this.getModel()
            .create({
                position_id : data['position_id'],
                firstname : data['firstname'] ? data['firstname'] : '',
                lastname : data['lastname'] ? data['lastname'] : '',
                email : data['email'] ? data['email'] : '',
                active : 1
            }).then(career => {
                let uploaded = null;
                let file = null;

                if(files && files.length)
                {
                    file = files[0];

                    uploaded = upload.move(file, UPLOAD_CV_PATH);
                }

                return [ career, uploaded, file ];
            }).spread((career, uploaded, file) => {
                let attachment = null;
                if(uploaded)
                {
                    // console.log('file is uploaded');
                    
                    attachment = this.getAttachmentRepository()
                        .create(career, file, CV_TYPE, UPLOAD_CV_PATH);

                } else {
                    // console.log('file is not uploaded');
                }

                return [ career, attachment ];
            }).spread((career, attachment) => {
                // done.
                return career;
            });
    }

    /**
     * Get attachment repository.
     *
     * @return {AttachmentRepository}
     */
    getAttachmentRepository()
    {
        return new AttachmentRepository();
    }
}

module.exports = CareersRepository;