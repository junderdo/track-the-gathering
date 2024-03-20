import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run track-the-gathering:serve',
        production: 'nx run track-the-gathering:preview',
      },
      ciWebServerCommand: 'nx run track-the-gathering:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
