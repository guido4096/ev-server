import CreatedUpdatedProps from '../CreatedUpdatedProps';
import { OicpBusinessDetails } from '../Setting';

export default interface OICPEndpoint extends CreatedUpdatedProps {
  id: string;
  role: string;
  name: string;
  baseUrl: string;
  countryCode: string;
  partyId: string;
  backgroundPatchJob: boolean;
  status?: string;
  businessDetails?: OicpBusinessDetails;
  availableEndpoints?: OICPEndpoint[];
  lastPatchJobOn?: Date;
  lastPatchJobResult?: {
    successNbr: number;
    failureNbr: number;
    totalNbr: number;
    chargeBoxIDsInFailure?: string[];
    chargeBoxIDsInSuccess?: string[];
  };
}

