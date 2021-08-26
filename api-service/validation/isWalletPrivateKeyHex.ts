import { UserSecretKey } from '@elrondnetwork/erdjs';
import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';

export function isWalletPrivateKeyHex(value: unknown): boolean {
    if (!(typeof value === 'string')) {
        return false;
    }
    try {
        UserSecretKey.fromString(value);
        return true;
    }
    catch (error) {
        return false;
    }
}

/**
 * Checks if a value is a wallet private key.
 */
export function IsWalletPrivateKeyHex(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: isWalletPrivateKeyHex.name,
            validator: {
                validate: (value, _args): boolean => isWalletPrivateKeyHex(value),
                defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property must be a wallet secret key in hex format', validationOptions),
            },
        },
        validationOptions
    );
}
