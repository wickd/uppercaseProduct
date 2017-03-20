/**
 * Contract mixin
 * @param superclass
 */
module.exports = superclass => class extends superclass {

    boot()
    {
        if (super.boot) super.boot();
    }


    /**
     * Check if method's exists in this case of instance.
     * behaviour like interfaces.
     * 
     * @param  {Array|String} method
     * @return {null}
     */
    __implementMethods(method)
    {
        let check = (instance, method) => 
        {
            if(! instance[method] && typeof instance[method] != 'function')
            {
                throw new Error(`${instance.constructor.name} abstract method "${method}" does not exists.`);
            }
        };

        switch(typeof method)
        {
            case 'string' :
                check(this, method);
                break;

            case 'object' :
                for(let i = 0; i < method.length; i++)
                {
                    check(this, method[i]);
                }
                break;
        }
    }
};