import { OCPPProtocol, OCPPVersion } from './OCPPServer';

export interface OCPPHeader {
  ocppVersion?: OCPPVersion;
  ocppProtocol?: OCPPProtocol;
  chargeBoxIdentity?: string;
  currentIPAddress?: string|string[];
  currentServerLocalIPAddressPort?: string;
  tenantID?: string;
  token?: string;
  chargingStationURL?: string;
  From?: {
    Address: string|string[];
  };
}
