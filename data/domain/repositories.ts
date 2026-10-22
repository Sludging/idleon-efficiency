import { repositoryFactories, RepositoryName, RepositoryRecords } from './repositories.generated';

export type DeepReadonly<T> = T extends (...args: never[]) => unknown
    ? T
    : T extends readonly unknown[]
        ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
        : T extends object
            ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
            : T;

function deepFreeze<T>(value: T, seen = new WeakSet<object>()): DeepReadonly<T> {
    if (value === null || (typeof value !== 'object' && typeof value !== 'function')) return value as DeepReadonly<T>;

    const object = value as object;
    if (seen.has(object)) return value as DeepReadonly<T>;
    seen.add(object);

    for (const key of Reflect.ownKeys(object)) {
        const descriptor = Object.getOwnPropertyDescriptor(object, key);
        if (descriptor && 'value' in descriptor) deepFreeze(descriptor.value, seen);
    }

    Object.freeze(object);
    return value as DeepReadonly<T>;
}

export class StaticRepositories {
    private readonly cache = Object.create(null) as Partial<Record<RepositoryName, unknown>>;

    get<K extends RepositoryName>(name: K): DeepReadonly<RepositoryRecords<K>> {
        if (!Object.hasOwn(this.cache, name)) {
            this.cache[name] = deepFreeze(repositoryFactories[name]());
        }

        return this.cache[name] as DeepReadonly<RepositoryRecords<K>>;
    }
}
