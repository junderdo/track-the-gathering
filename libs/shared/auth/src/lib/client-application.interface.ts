import { Client } from 'auth0';

export interface ClientApplication extends Partial<Client> {
  client_id: string;
  tenant: string;
  name: string;
  logo_uri: string;
  initiate_login_uri: string;
  client_metadata: ClientApplicationMetadata;
}

export interface ClientApplicationMetadata {
  application_type?: string;
  idp_callback?: string;
}
