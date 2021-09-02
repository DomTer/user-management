import GraphQLJSON from 'graphql-type-json'
import shortid from 'shortid'

export default {
  JSON: GraphQLJSON,
/*
  validateItemsByIds: (idArray, collection, {db}) => {
    const dbCollection = db.chain.get(collection);
    const results = idArray.map(input => dbCollection
        .find({id: input.id}).value());

    if(results.some(result => !result)) {
      throw new Error(`Error: one or more items cant be found in '${collection}'`)
    }
    return results.map('id')
  },
*/
  Query: {
    permission: (root, {input}, {db}) => db.get('permissions').find({ id: input.id }).value(),
    role: (root, {input}, {db}) => db.get('roles').find({ id: input.id }).value(),
    user: (root, {input}, {db}) => db.get('users').find({ id: input.id }).value(),
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
      console.log(
          db
              .get('permissions')
              .push(permission)
              .last()
              .write()
      )
      return permission
    },

    updatePermission: (root, {input}, {db}) => {
      const dbPermission = db.get('permissions').find({ id: input.id }).value()

      if (!dbPermission) {
        throw new Error('Error: Permission not found.')
      }

      const updatedPermission = {
        id:           input.id,
        name:         input.name        || dbPermission.name,
        description:  input.description || dbPermission.description
      }

      db
          .get('permissions')
          .find({ id: input.id })
          .assign(updatedPermission)
          .write()

      return updatedPermission
    },

    deletePermission: (root, {input}, {db}) => {
      const permission = db.get('permissions').find({ id: input.id }).value()

      if (!permission) {
        throw new Error('Error: Permission not found.')
      }

      db.get('permissions')
          .remove({ id: input.id })
          .write()

      return permission
    },

    createRole: (root, {input}, {db}) => {
      const dbPermissions = db.get('permissions');
      const permissions = input.permissions.map(permissionInput => dbPermissions
          .find({id: permissionInput.id}).value());

      if(permissions.some(permission => !permission)) {
        throw new Error('Error: One or more permission(s) not found.')
      }

      //TODO: accept only unique names

      const role = {
        id: shortid.generate(),
        name: input.name,
        permissions: input.permissions
      }
      db
          .get('roles')
          .push(role)
          .last()
          .write()

      return role
    },

    updateRole: (root, {input}, {db}) => {
      const dbRole = db.get('roles').find({ id: input.id }).value()

      if (!dbRole) {
        throw new Error('Error: role not found.')
      }

      const dbPermissions = db.get('permissions');
      const permissions = input.permissions.map(permissionInput => dbPermissions
          .find({id: permissionInput.id}).value());

      if(permissions.some(permission => !permission)) {
        throw new Error('Error: One or more permission(s) not found.')
      }

      const updatedRole = {
        id: input.id,
        name: input.name || dbRole.name,
        permissions: input.permissions || dbRole.permissions
      }
      db.get('roles').find({ id: input.id }).assign(updatedRole).write()

      return updatedRole
    },

    deleteRole: (root, {input}, {db}) => {
      const role = db.get('roles').find({ id: input.id }).value()

      if (!role) {
        throw new Error('Error: role not found.')
      }

      db.get('roles')
          .remove({ id: input.id })
          .write()

      return role
    },

    createUser: (root, {input}, {db}) => {
      const dbRoles = db.get('roles');
      const roles = input.roles.map(roleInput => dbRoles
          .find({id: roleInput.id}).value());

      if(roles.some(role => !role)) {
        throw new Error('Error: One or more role(s) not found.')
      }

      const user = {
        id:         shortid.generate(),
        forename:   input.forename,
        surname:    input.surname,
        mail:       input.mail,
        phone:      input.phone,
        password:   input.password,
        roles:      input.roles
      }
      db.get('users')
          .push(user)
          .last()
          .write()

      return user
    },

    updateUser: (root, {input}, {db}) => {
      const dbUser = db.get('users').find({ id: input.id }).value()
      if (!dbUser) {
        throw new Error('Error: User not found.')
      }

      const dbRoles = db.get('roles');
      const roles = input.roles.map(roleInput => dbRoles
          .find({id: roleInput.id}).value());

      if(roles.some(role => !role)) {
        throw new Error('Error: One or more role(s) not found.')
      }

      const updatedUser = {
        id:         input.id,
        forename:   input.forename  || dbUser.forename,
        surname:    input.surname   || dbUser.surname,
        mail:       input.mail      || dbUser.mail,
        phone:      input.phone     || dbUser.phone,
        password:   input.password  || dbUser.password,
        roles:      input.roles     || dbUser.roles
      }
      db
          .get('users')
          .find({ id: input.id })
          .assign(updatedUser)
          .write()

      return updatedUser
    },

    deleteUser: (root, {input}, {db}) => {
      const user = db.get('users').find({ id: input.id }).value()

      if (!user) {
        throw new Error('Error: User not found.')
      }

      db
          .get('users')
          .remove({ id: input.id })
          .write()

      return user
    },
  },
}