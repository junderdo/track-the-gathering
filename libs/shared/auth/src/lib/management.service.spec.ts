import { Test, TestingModule } from '@nestjs/testing';
import { ManagementService } from './management.service';
import { EnvTestUtil } from '@track-the-gathering/shared/env';
import { ManagementClient } from 'auth0';

describe('ManagementService', () => {
  const envTestUtil = new EnvTestUtil();
  let service: ManagementService;
  let managers: ManagementClient;
  const mockOrgId = 'mock-org-id';
  const mockOrgConnectionId = 'mock-org-connection-id';
  const mockClientId = 'mock-client-id';
  const mockConnection = {
    enabled_clients: [mockClientId],
  };
  const mockClient = {
    client_id: mockClientId,
    client_metadata: {
      application_type: 'saml',
      org_id: mockOrgId,
    },
  };

  beforeEach(() => {
    jest.resetModules();
    envTestUtil.setMockEnvVars();
  });

  afterAll(() => {
    envTestUtil.resetEnv();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagementService],
    }).compile();

    service = module.get<ManagementService>(ManagementService);
    managers = Reflect.get(service, 'managers');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserApplications', () => {
    let getOrganizationConnectionIdsSpy: jest.SpyInstance;
    let getConnectionsSpy: jest.SpyInstance;
    let getClientsSpy: jest.SpyInstance;
    beforeEach(() => {
      getOrganizationConnectionIdsSpy = jest.spyOn(
        service,
        'getOrganizationConnectionIds'
      );
      getConnectionsSpy = jest.spyOn(service, 'getConnections');
      getClientsSpy = jest.spyOn(service, 'getClients');
    });

    it('should call getOrganizationConnectionIds, getConnections, getClients', async () => {
      getOrganizationConnectionIdsSpy.mockResolvedValue([mockOrgConnectionId]);
      getConnectionsSpy.mockResolvedValue([mockConnection]);
      getClientsSpy.mockResolvedValue([mockClient]);

      const clients = await service.getUserApplications(mockOrgId);

      expect(getOrganizationConnectionIdsSpy).toHaveBeenCalledWith(mockOrgId);
      expect(getConnectionsSpy).toHaveBeenCalledWith([mockOrgConnectionId]);
      expect(getClientsSpy).toHaveBeenCalledTimes(1);

      expect(clients).toStrictEqual([mockClient]);
    });

    it('should throw error when orgId param undefined', async () => {
      let undefinedOrgId: string;
      let caughtException;
      try {
        await service.getUserApplications(undefinedOrgId!);
      } catch (err) {
        caughtException = err;
      }

      expect(caughtException).toEqual(new Error('Org ID must be provided'));
    });
  });

  describe('getOrganizationConnectionIds', () => {
    let getEnabledConnectionsSpy: jest.SpyInstance;
    beforeEach(() => {
      getEnabledConnectionsSpy = jest.spyOn(
        managers.organizations,
        'getEnabledConnections'
      );
    });

    it('should call managers.organizations.getEnabledConnections', async () => {
      getEnabledConnectionsSpy.mockResolvedValue({
        status: 200,
        statusText: 'OK',
        data: [
          {
            connection_id: mockOrgConnectionId,
          },
        ],
      });

      const orgConnectionIds = await service.getOrganizationConnectionIds(
        mockOrgId
      );

      expect(getEnabledConnectionsSpy).toHaveBeenCalledWith({
        id: mockOrgId,
        per_page: 100,
      });
      expect(orgConnectionIds).toStrictEqual([mockOrgConnectionId]);
    });

    it('should throw error when orgId param undefined', async () => {
      const errorResponse = {
        status: 400,
        statusText: 'Bad Request',
      };
      getEnabledConnectionsSpy.mockResolvedValue(errorResponse);

      let caughtException;
      try {
        await service.getOrganizationConnectionIds(mockOrgId);
      } catch (err) {
        caughtException = err;
      }

      expect(caughtException).toEqual(
        new Error(
          `Failed to get connections from managment api: ` +
            `HTTP status ${errorResponse.status} ${errorResponse.statusText}`
        )
      );
    });
  });

  describe('getConnections', () => {
    let getSpy: jest.SpyInstance;
    beforeEach(() => {
      getSpy = jest.spyOn(managers.connections, 'get');
    });

    it('should call managers.connections.get', async () => {
      getSpy.mockResolvedValue({
        status: 200,
        statusText: 'OK',
        data: mockConnection,
      });

      const connections = await service.getConnections([mockOrgConnectionId]);

      expect(getSpy).toHaveBeenCalledWith({ id: mockOrgConnectionId });
      expect(connections).toStrictEqual([mockConnection]);
    });

    it('should throw error on management API error response', async () => {
      const errorResponse = {
        status: 400,
        statusText: 'Bad Request',
      };
      getSpy.mockResolvedValue(errorResponse);

      let caughtException;
      try {
        await service.getConnections([mockOrgConnectionId]);
      } catch (err) {
        caughtException = err;
      }

      expect(caughtException).toEqual(
        new Error(
          `Failed to get connections from managment api: ` +
            `HTTP status ${errorResponse.status} ${errorResponse.statusText}`
        )
      );
    });
  });

  describe('getClients', () => {
    let getAllSpy: jest.SpyInstance;
    beforeEach(() => {
      getAllSpy = jest.spyOn(managers.clients, 'getAll');
    });

    it('should call managers.clients.getAll', async () => {
      getAllSpy.mockResolvedValue({
        status: 200,
        statusText: 'OK',
        data: [mockClient],
      });

      const clients = await service.getClients();

      expect(getAllSpy).toHaveBeenCalledWith({
        per_page: 100,
      });
      expect(clients).toStrictEqual([mockClient]);
    });

    it('should throw error on management API error response', async () => {
      const errorResponse = {
        status: 400,
        statusText: 'Bad Request',
      };
      getAllSpy.mockResolvedValue(errorResponse);

      let caughtException;
      try {
        await service.getClients();
      } catch (err) {
        caughtException = err;
      }

      expect(caughtException).toEqual(
        new Error(
          `Failed to get client applications from managment api: ` +
            `HTTP status ${errorResponse.status} ${errorResponse.statusText}`
        )
      );
    });
  });
});
