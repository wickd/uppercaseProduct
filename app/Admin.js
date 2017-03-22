let Repository = require('./dashboard/administrator/repository');
// let AdminPresenter = require('../../library/presenterable/presenters/adminPresenter');
// let Presenterable = require('../../library/presenterable/hasPresenter');

// class Admin extends Presenterable(Repository)
class Admin extends Repository
{
    constructor()
    {
        super();

        this.table = 'admins';
        this.guarded = [ 'id' ];
        this.fillable = [
            'id',
            'email',
            'name',
            'password',
            'remember_token',
            'created_at'
        ];

        // this.presenter = AdminPresenter;
    }
}

module.exports = Admin;