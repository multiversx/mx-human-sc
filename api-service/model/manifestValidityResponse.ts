import { ErrorParameterResponse } from './errorParameterResponse';

export class ManifestValidityResponse {
    valid: boolean;
    errors: Array<ErrorParameterResponse>;
}

