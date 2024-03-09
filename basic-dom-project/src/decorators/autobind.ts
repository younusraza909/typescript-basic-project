export function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    const adjMethod: PropertyDescriptor = {
        configurable: true,
        enumerable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };

    return adjMethod;
}