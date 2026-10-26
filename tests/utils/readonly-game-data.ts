import { types } from 'util';

const mapMutators = ['set', 'delete', 'clear'];
const setMutators = ['add', 'delete', 'clear'];
const dateMutators = Object.getOwnPropertyNames(Date.prototype).filter(name => name.startsWith('set'));

const rejectMutation = (): never => {
  throw new TypeError('Cannot mutate readonly prepared game data');
};

const guardMethods = (value: object, names: string[]): void => {
  for (const name of names) {
    Object.defineProperty(value, name, {
      value: rejectMutation,
      configurable: false,
      enumerable: false,
      writable: false,
    });
  }
};

/** Freeze prepared account state without changing its object or constructor identities. */
export const guardAndFreeze = <T>(root: T): T => {
  const seen = new WeakSet<object>();

  const visit = (value: unknown): void => {
    if (value === null || (typeof value !== 'object' && typeof value !== 'function') || seen.has(value)) {
      return;
    }
    seen.add(value);

    // Object.freeze does not block changes to collection entries or Date values.
    if (types.isMap(value)) {
      guardMethods(value, mapMutators);
      for (const [key, member] of Map.prototype.entries.call(value)) {
        visit(key);
        visit(member);
      }
    } else if (types.isSet(value)) {
      guardMethods(value, setMutators);
      for (const member of Set.prototype.values.call(value)) {
        visit(member);
      }
    } else if (types.isDate(value)) {
      guardMethods(value, dateMutators);
    }

    for (const key of Reflect.ownKeys(value)) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key)!;
      if ('value' in descriptor) {
        visit(descriptor.value);
      }
    }

    Object.freeze(value);
  };

  visit(root);
  return root;
};
