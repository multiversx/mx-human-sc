import { Address } from '@elrondnetwork/erdjs';
import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';

export function isAddress(value: unknown): boolean {
    if (!(typeof value === 'string')) {
        return false;
    }
    try {
        new Address(value);
        return true;
    }
    catch (error) {
        return false;
    }
}

export function IsAddress(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: isAddress.name,
            validator: {
                validate: (value, _args): boolean => isAddress(value),
                defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property must be an address (bech32 or hex pubkey)', validationOptions),
            },
        },
        validationOptions
    );
}
