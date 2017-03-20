let ActivityRepositoriy = require('../app/repositories/questActivitiesRepository');
let SharesRepository = require('../app/repositories/sharesRepository');
let ActivitiesRepository = require('../app/repositories/activitiesRepository');
let h = require(_namespace.app_path() + "/dashboard/administrator/helpers");
module.exports = action_id => (req, res, next) => {
    let activities = new ActivityRepositoriy();
    if(action_id == req.body.action){
        (new SharesRepository())
        .getShare(req.body)
        .then(share => {
            if(!h.is_empty(share)) {
                (new ActivitiesRepository()).getActivityIdByName(req.body.action).then((action) => {
                   if(!h.is_empty(action)){
                       console.log(share.getAttribute('id'));
                       activities.watchShares(
                           req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                           action.getAttribute('id'),
                           req.body.action + 's',
                           share.getAttribute('id')
                       ).then((acts) => {
                           if (h.is_empty(acts)){
                               next();
                           }
                       });
                   }
                });
            } else next();
        });
    }else next();
};