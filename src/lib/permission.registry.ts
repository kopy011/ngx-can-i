export interface PermissionTypeRegistry {}

export type Action = PermissionTypeRegistry extends { Action: infer A } ? A : never;
export type Entity = PermissionTypeRegistry extends { Entity: infer E } ? E : never;
export type Role = PermissionTypeRegistry extends { Role: infer R } ? R : never;

export type PermissionKey<A extends Action = Action, E extends Entity = Entity> = `${A}:${E}`;

export function toKey<A extends Action, E extends Entity>(a: A, e: E): PermissionKey<A, E> {
  return `${a}:${e}`;
}
