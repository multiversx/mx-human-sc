import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';
import { PrivateKey } from 'eciesjs';

export function isEciesPrivateKey(value: unknown): boolean {
    if (!(typeof value === 'string')) {
        return false;
    }
    try {
        PrivateKey.fromHex(value);
        return true;
    }
    catch (error) {
        return false;
    }
}

/**
 * Checks if a value is an ECIES private key.
 */
export function IsEciesPrivateKey(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: isEciesPrivateKey.name,
            validator: {
                validate: (value, _args): boolean => isEciesPrivateKey(value),
                defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property must be an ECIES private key', validationOptions),
            },
        },
        validationOptions
    );
}
