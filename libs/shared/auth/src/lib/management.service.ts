import { HttpStatus, Injectable } from '@nestjs/common';
import {
  Client,
  Connection,
  GetEnabledConnections200ResponseOneOfInner,
  ManagementClient,
  // UserGrant,
} from 'auth0';

@Injectable()
export class ManagementService {
  private managers: ManagementClient;

  constructor() {
    if (!process.env['AUTH0_DOMAIN']) {
      throw new Error('AUTH0_DOMAIN environment variable not defined');
    }
    if (!process.env['AUTH0_MANAGEMENT_CLIENT_ID']) {
      throw new Error(
        'AUTH0_MANAGEMENT_CLIENT_ID environment variable not defined'
      );
    }
    if (!process.env['AUTH0_MANAGEMENT_CLIENT_SECRET']) {
      throw new Error(
        'AUTH0_MANAGEMENT_CLIENT_SECRET environment variable not defined'
      );
    }

    this.managers = new ManagementClient({
      domain: process.env['AUTH0_DOMAIN'],
      clientId: process.env['AUTH0_MANAGEMENT_CLIENT_ID'],
      clientSecret: process.env['AUTH0_MANAGEMENT_CLIENT_SECRET'],
    });
  }

  /**
   * @description gets a list of all applications to which the given user is assigned
   * @param orgId the org for which applications will be requested
   * @returns applications assigned to this user in Auth0
   */
  public async getUserApplications(orgId: string): Promise<Client[]> {
    if (!orgId) {
      throw new Error('Org ID must be provided');
    }
    const orgConnectionIds = await this.getOrganizationConnectionIds(orgId);
    const connections = await this.getConnections(orgConnectionIds);
    const clientIds = [];
    for (const c of connections) {
      // TODO: the auth0 Connection interface is missing this property
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      clientIds.push(...(c as any).enabled_clients);
    }
    // TODO: filter the applcations in the request to management api -- currently there is no way to
    // do that by orgId or connection id
    const applications = await this.getClients();
    const assignedApps: Client[] = [];
    for (const app of applications) {
      if (
        clientIds.includes(app.client_id) &&
        app.client_metadata &&
        (app.client_metadata['application_type'] as string) === 'saml' &&
        (app.client_metadata['org_id'] as string) === orgId
      ) {
        assignedApps.push(app);
      }
    }
    return assignedApps;
  }

  /**
   * @description gets the organization for the given user
   * @param orgId
   * @returns applications in Auth0
   */
  public async getOrganizationConnectionIds(orgId: string): Promise<string[]> {
    const response = await this.managers.organizations.getEnabledConnections({
      id: orgId,
      per_page: 100,
    });
    if (response.status !== HttpStatus.OK) {
      throw new Error(
        `Failed to get connections from managment api: ` +
          `HTTP status ${response.status} ${response.statusText}`
      );
    }
    return response.data.map(
      (connections: GetEnabledConnections200ResponseOneOfInner) => {
        return connections.connection_id;
      }
    );
  }

  /**
   * @description gets the connection clients for the given connection ids
   * @param connectionIds
   * @returns applications in Auth0
   */
  public async getConnections(connectionIds: string[]): Promise<Connection[]> {
    const clients = [];
    // TODO: getAll does not allow for filtering and also cannot not retrieve all fields
    //    so we must mke a request for each connection
    // console.log(await this.managers.connections.getAll());
    for (const id of connectionIds) {
      const response = await this.managers.connections.get({ id });
      if (response.status !== HttpStatus.OK) {
        throw new Error(
          `Failed to get connections from managment api: ` +
            `HTTP status ${response.status} ${response.statusText}`
        );
      }
      clients.push(response.data);
    }
    return clients;
  }

  /**
   * @description gets a list of all clients (applications and SSO integrations) for the given user
   * @returns applications in Auth0
   */
  public async getClients(): Promise<Client[]> {
    // TODO: clients.getAll does not have filtering
    // TODO: page through all pages -- there is no indicator of a next page
    // do {
    // } while (response.next)
    const response = await this.managers.clients.getAll({
      per_page: 100,
    });

    if (response.status !== HttpStatus.OK) {
      throw new Error(
        `Failed to get client applications from managment api: ` +
          `HTTP status ${response.status} ${response.statusText}`
      );
    }
    return response.data;
  }

  // /**
  //  * @description gets a list of all grants for applications for the given user
  //  * @param userId the user for which grants will be requested
  //  * @returns grants assigned to this user in Auth0
  //  */
  // public async getUserGrants(userId: string): Promise<UserGrant[]> {
  //   const response = await this.managers.grants.getAll({
  //     user_id: userId,
  //   });
  //   if (response.status !== HttpStatus.OK) {
  //     throw new Error(
  //       `Failed to get user's grants from managment api: `+
  //        `HTTP status ${response.status} ${response.statusText}`
  //     );
  //   }
  //   return response.data;
  // }
}
