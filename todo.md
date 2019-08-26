# Features / Backlog

## MVP
- [ ] sort columns by incompleteness and worthiness
- [ ] show where to spend available wildcards
- [ ] sound bleep upon required card is added to collection
- [ ] connection --> retry
- [ ] make decks clickable to only show their cards in table / same for cards?
- [X] show required wildcards
- [X] add About info
- [X] show deck completeness
- [X] add loading bar
- [X] API error handling
- [X] settings menu
- [X] settings via REST call
- [X] persist window state
- [X] enable CORS for electron
- [X] fix electron window height
- [X] make window borderless and draggable
- [X] avoid log file lock by MTGA
- [X] add filter clear button
- [X] integrate player inventory to UI
- [X] improve theming
- [X] show application name
- [X] repeatedly call backend / polling
- [X] detect changes and push from backend with Server Sent Events (SSE)
- [X] try to auto-detect output log file with default path

## Bugs
- [ ] fix error if log is empty (e.g., after patch/before first game start)
- [X] fix lazy loading of tabs
- [X] fix ownedCount of basic lands --> infinite number of copies provided by MTGA
- [X] fix deck sorting
- [X] fix completeness
- [X] fix UI subheader glitch

## Production
- [ ] rename application to something better
- [ ] change ports for production
- [ ] add License
- [ ] update maximegris/angular-electron version (Angular 8)
- [X] check lazy loading (module dependencies, e.g. domain / Rarity)
- [X] add Fan Content Policy info (https://company.wizards.com/fancontentpolicy)
- [X] fix window menu (WinRef) for electron
- [X] use Angular enableProdMode()
- [X] custom favicon

## Future Releases
- [ ] make deck columns moveable
- [ ] make deck columns sortable -> store setting
- [ ] drop location for new Card Set json file -> automatic installation
- [ ] filter by type (creature, enchantment, etc.)
- [ ] filter by class (vampire, etc.)
- [X] more beautiful owned/missing indicator

# Future Features
- [ ] read the long logs (has separate folder)
- [ ] booster advisor
- [ ] collection progresses

# Optimization / Refactoring
- [X] remove file storage and set loader
- [ ] preload decks-tab module (https://angular.io/guide/router#custom-preloading-strategy)
- [ ] parse log file async
- [ ] parse log file from end of file
- [ ] npm command to restore, build and copy backend .exe to Angular dist folder during development
- [ ] business logic should not be done in reducers
- [ ] minify the bundle with browserify: http://maxgfeller.com/blog/2016/08/30/electron-browserify/
