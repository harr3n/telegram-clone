const { SchemaDirectiveVisitor } = require('graphql-tools')
const { defaultFieldResolver } = require('graphql')

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const requiredRole = this.args.role;
    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = (...args) => {
      const ctx = args[2];
      if (!ctx.userId) throw new Error("U need 2 b logged in")
      return originalResolve.apply(this, args);
    };
  }
}

module.exports = AuthDirective;
