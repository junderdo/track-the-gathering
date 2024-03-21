import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run track-the-gathering-web:serve',
        production: 'nx run track-the-gathering-web:preview',
      },
      ciWebServerCommand: 'nx run track-the-gathering-web:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
