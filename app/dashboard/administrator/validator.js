let validator = require('validatorjs')
// let baseModel = require('./baseModel')

// todo rework for eloquent.
// validator.registerAsync('valid_id', (id, table, req, passes) => {
//     if(parseInt(id)){
//         baseModel
//             .getRecordById({table:table, id:id})
//             .done((record) => {
//                 if(record){
//                     passes();
//                 }
//                 else{
//                     passes(false, req.replace('_id', '') + ' with id ' + id + ' does not exist')
//                 }
//             })
//     }
//     else{
//         passes(false, req.replace('_id', '') + ' with id ' + id + ' does not exist')
//     }
// });

// //unique for all users
// validator.registerAsync('unique', (value, tableName, req, passes) => {
//     if(value){
//         baseModel
//             .getRecordByField({
//                 table: tableName,
//                 field: req,
//                 value: value
//             })
//             .done((record) => {
//                 if(record){
//                     passes(false, req+' must be unique in the system')
//                 }
//                 else{
//                     passes()
//                 }
//             })
//     }
//     else{
//         passes(false. fieldName+' is required')
//     }
// })

// //when user creates a record that have to contain unique field
// validator.registerAsync('user_unique', (value, data, req, passes) => {
//     let userId = data.split(',')[0]
//     let tableName = data.split(',')[1]
//     if(value){
//         baseModel
//             .getRecordByFieldAndUser({
//                 userId: userId,
//                 table: tableName,
//                 field: req,
//                 value: value
//             })
//             .done((record) => {
//                 if(record){
//                     passes(false, req+' must be unique for each user')
//                 }
//                 else{
//                     passes()
//                 }
//             })
//     }
//     else{
//         passes(false, req+' is required')
//     }
// })

// // when user wants to update something, he can't choose a name that is already in database
// validator.registerAsync('user_unique_update', (value, data, req, passes) => {
//     let userId = data.split(',')[0]
//     let tableName = data.split(',')[1]
//     let exceptId = data.split(',')[2]
//     if(value){
//         baseModel
//             .getRecordByFieldAndUserExceptId({
//                 userId: userId,
//                 table: tableName,
//                 field: req,
//                 value: value,
//                 exceptId: exceptId
//             })
//             .done((record) => {
//                 if(record){
//                     passes(false, 'this '+req+' already exist')
//                 }
//                 else{
//                     passes()
//                 }
//             })
//     }
//     else{
//         passes(false, req+' is required')
//     }
// })

// // when user wants to update something, he can't choose a name that is already in database
// validator.registerAsync('unique_update', (value, data, req, passes) => {
//     let tableName = data.split(',')[0]
//     let exceptId = data.split(',')[1]
//     if(value){
//         baseModel
//             .getRecordByFieldExceptId({
//                 table: tableName,
//                 field: req,
//                 value: value,
//                 exceptId: exceptId
//             })
//             .done((record) => {
//                 if(record){
//                     passes(false, 'this '+req+' already exist')
//                 }
//                 else{
//                     passes()
//                 }
//             })
//     }
//     else{
//         passes(false, req+' is required')
//     }
// })

// //if this record is assigned to current user
// validator.registerAsync('belongs_to_user', (value, data, req, passes) => {
//     let userId = data.split(',')[0]
//     let tableName = data.split(',')[1]
//     if(value){
//         baseModel
//             .getRecordByUser({
//                 userId: userId,
//                 table: tableName,
//                 value: value
//             })
//             .done((record) => {
//                 if(record){
//                     passes()
//                 }
//                 else{
//                     passes(false, 'this '+req.replace('_id', '')+' does not belong to current user')
//                 }
//             })
//     }
//     else{
//         passes(false, req+' is required')
//     }
// })

// /**
//  * validates an array of objects
//  */
// validator.registerAsync('valid_json_array', (array, attribute, req, passes) => {

//     let json_array = [];
//     let attributes = [];

//     try {
//         json_array = JSON.parse(array);
//         attributes = JSON.parse(attribute);
//     }
//     catch (e) {
//         passes(false,'Invalid data provided!')
//         return
//     }

//     for(let i=0;i<json_array.length;i++) {
//         for (let j = 0; j < attributes.length; j++) {
//             let param = attributes[j]
//             if (!json_array[i][param]) {
//                 passes(false, `Missing ${param} for row ${i}!`)
//             }
//         }
//     }

//     passes();

// });

module.exports = validator