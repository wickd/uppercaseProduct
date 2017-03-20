/**
 * Merge arrays or objects.
 *
 * @param object1
 * @param object2
 * @return {*}
 */
exports.merge = (object1, object2) => {

    for (let [key, value] in object2)
    {
        object1[key] = value;
    }

    return object1;
};


exports.routeMiddleware = ()=>{

}