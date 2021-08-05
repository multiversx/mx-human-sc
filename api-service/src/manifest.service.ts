import { Injectable, NotImplementedException } from '@nestjs/common';
import { ManifestValidityBody } from 'model/manifestValidityBody';
import { ManifestValidityResponse } from 'model/manifestValidityResponse';

@Injectable()
export class ManifestService {
    public validate(manifestValidityBody: ManifestValidityBody): Promise<ManifestValidityResponse> {
        throw new NotImplementedException();
    }
}
