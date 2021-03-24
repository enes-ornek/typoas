import { TypeNode } from 'typescript';
import { Context } from '../../context';
import { ParameterObject, ReferenceObject } from 'openapi3-ts';
import { createTypeFromSchema } from '../utils/types';

export function createSchemaTypeFromParameters(
  parameterOrRef: ParameterObject | ReferenceObject,
  ctx: Context,
): TypeNode {
  if (parameterOrRef.$ref) {
    const ref = ctx.resolveReference('parameters', parameterOrRef.$ref);
    if (!ref) {
      throw new Error(`$ref '${parameterOrRef.$ref}' wasn't found`);
    }
    return createTypeFromSchema(ref.spec.schema, ctx);
  }
  const parameter = parameterOrRef as ParameterObject;

  return createTypeFromSchema(parameter.schema, ctx);
}

export function getParameterName(
  parameterOrRef: ParameterObject | ReferenceObject,
  ctx: Context,
): string {
  if (parameterOrRef.$ref) {
    const ref = ctx.resolveReference('parameters', parameterOrRef.$ref);
    if (!ref) {
      throw new Error(`$ref '${parameterOrRef.$ref}' wasn't found`);
    }
    return ref.spec.name;
  }
  return (parameterOrRef as ParameterObject).name;
}

export function isParameterRequired(
  parameterOrRef: ParameterObject | ReferenceObject,
  ctx: Context,
): boolean {
  if (parameterOrRef.$ref) {
    const ref = ctx.resolveReference('parameters', parameterOrRef.$ref);
    if (!ref) {
      throw new Error(`$ref '${parameterOrRef.$ref}' wasn't found`);
    }
    return !!ref.spec.required;
  }
  return !!(parameterOrRef as ParameterObject).required;
}