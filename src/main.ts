import { APP_INITIALIZER, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app/app.component';
import { routes } from './app/routing/app.routes';
import { LanguageService } from './app/services/language.service';

export function initializeLanguage(languageService: LanguageService): () => Promise<void> {
  return () => languageService.init();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideHttpClient(),
    importProvidersFrom(
      RouterModule.forRoot(routes),
      TranslateModule.forRoot({
        loader: provideTranslateHttpLoader({
          prefix: './assets/i18n/',
          suffix: '.json'
        }),
        fallbackLang: 'en-us'
      })
    ),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeLanguage,
      deps: [LanguageService]
    }
  ]
}).catch(err => console.error(err));
