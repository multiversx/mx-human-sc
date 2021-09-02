import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';
import { PublicKey } from 'eciesjs';

export function isEciesPublicKey(value: unknown): boolean {
    if (!(typeof value === 'string')) {
        return false;
    }
    try {
        PublicKey.fromHex(value);
        return true;
    }
    catch (error) {
        return false;
    }
}

export function IsEciesPublicKey(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: isEciesPublicKey.name,
            validator: {
                validate: (value, _args): boolean => isEciesPublicKey(value),
                defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property must be an ECIES public key', validationOptions),
            },
        },
        validationOptions
    );
}
