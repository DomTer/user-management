import GraphQLJSON from 'graphql-type-json'
import shortid from 'shortid'
import lodash from 'lodash'

export default {
  JSON: GraphQLJSON,
  Query: {
    users: (root, args, {db}) => db.get('users').value(),
    roles: (root, args, {db}) => db.get('roles').value(),
    permissions: (root, args, {db}) => db.get('permissions').value()
  },

  Mutation: {
    createPermission: (root, {input}, {db}) => {
      const permission = {
        id: shortid.generate(),
        name: input.name,
        description: input.description
      }
      db
          .get('permissions')
          .push(permission)
          .last()
          .write()

      return permission
    },

    createRole: (root, {input}, {db}) => {
      db.chain = lodash.chain(db.data)


     // const permissions = db.get('permissions')
     //     .filter(permission => input.permissions.includes(permission.id));

      const permissions = db.chain.get('permissions');
      const whaterver = input.permissions.map(permissionInput => permissions.find({id: permissionInput.id}).value())
      if(whaterver.some(permission => permission === null)) {
        throw new Error('nope!')
      }

      const test = db.chain.get('permissions').find({id: '7c980c8f-76bc-4a46-a8b6-647dc8dad5dc'}).value()

      console.log(whaterver);
      console.log(test)
      const role = {
        id: shortid.generate(),
        name: input.name,
        permissions: whaterver
      }
      db
          .get('roles')
          .push(role)
          .last()
          .write()

      return role
    },

    createUser: (root, {input}, {db}) => {
      const user = {
        forename: input.forename,
        surname: input.surname,
        mail: input.mail,
        phone: input.phone,
        password: input.password
        // roles: input.roles
      }

      db
          .get('users')
          .push(user)
          .last()
          .write()

      return user
    },
  },
}