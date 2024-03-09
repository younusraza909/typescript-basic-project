interface validatableData {
    value?: string | number;
    required?: boolean;
    minLenght?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

export function validate(data: validatableData): boolean {
    let isValid = true;

    if (data.required) {
        isValid = isValid && data.value?.toString().trim().length !== 0;
    }

    if (!data.required && data.value?.toString().trim().length === 0) {
        return isValid;
    }

    if (data.minLenght && typeof data.value === "string") {
        isValid = isValid && data.value.length >= data.minLenght;
    }

    if (data.min && typeof data.value === "number") {
        isValid = isValid && data.value >= data.min;
    }

    if (data.max && typeof data.value === "number") {
        isValid = isValid && data.value <= data.max;
    }

    if (data.maxLength && typeof data.value === "string") {
        isValid = isValid && data.value.length >= data.maxLength;
    }

    return isValid;
}