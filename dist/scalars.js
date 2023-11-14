import { GraphQLScalarType, Kind } from 'graphql';
export const DateTime = new GraphQLScalarType({
    name: 'DateTime',
    description: 'Represents a date time object',
    serialize(value) {
        if (!(value instanceof Date)) {
            throw new Error('DateTime cannot represent non-Date type');
        }
        return value.toISOString(); // Convert outgoing Date to ISOString for JSON
    },
    parseValue(value) {
        if (typeof value !== 'string') {
            throw new Error('DateTime cannot represent non-string type');
        }
        return new Date(value); // Convert incoming string to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value); // Convert hard-coded AST string to Date
        }
        return null; // Invalid hard-coded value (not a string)
    },
});
