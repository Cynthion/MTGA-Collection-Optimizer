import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const { allCards } = require('mtga');
const card = allCards.findCard(67134);
console.log(card.get('prettyName'));

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
