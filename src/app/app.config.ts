import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TerminalModule } from 'primeng/terminal';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes),TerminalModule]
};
