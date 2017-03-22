let ServiceProvider = require(_namespace.core_path() + '/foundation/providers/viewComposerServiceProvider');

class ViewComposerServiceProvider extends ServiceProvider
{
    /**
     * ViewComposerServiceProvider constructor
     * 
     * @return ViewComposerServiceProvider
     */
    constructor(app)
    {
        super(app);
    }

    compose(view)
    {
        view.nav_menu = this.app().get('navigation');

        view.test = 10;
    }
}

module.exports = ViewComposerServiceProvider;