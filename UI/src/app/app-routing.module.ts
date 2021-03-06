import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
   // default path for the application, the place to go when the path in the URL is empty,
   // as it typically is at the start
    path: '',
    pathMatch: 'full', // matches against the entire URL. It is important to do this when redirecting empty-path routes. Otherwise, because an empty path is a prefix of any URL, the router would apply the redirect even when navigating to the redirect destination, creating an endless loop
    redirectTo: 'decks-tab', // absolute if the URL begins with a slash (/)
  },
  // TODO currently wildcard doesn't work (always resets to deck-card), fix navigation to work properly
  // {
  //   // wildcard route: the router will select this route if the requested URL doesn't match any
  //   // paths for routes defined earlier in the configuration. This is useful for displaying a
  //   // "404 - Not Found" page or redirecting to another route
  //   path: '**',
  //   redirectTo: 'decks-tab',
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
