# Features / Backlog

## MVP
- [ ] show where to spend available wildcards
- [ ] sound bleep upon required card is added to collection, as an effect
- [ ] connection --> retry
- [ ] make decks clickable to only show their cards in table / same for cards?
- [ ] show deck worth and make columns sortable by it
- [ ] show message on empty tables/filter data
- [X] make history-tab sortable and searchable
- [X] load default settings from backend
- [X] parse newly created decks (<== Deck.CreateDeckV3)
- [X] parse newly updated decks (<== Deck.UpdateDeckV3)
- [X] parse newly deleted decks (==> Deck.DeleteDeck)
- [X] sort columns by incompleteness
- [X] show owned and missing count in history-tab
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
- [X] Check for DETAILED LOGS: ENABLED (https://mtgarena-support.wizards.com/hc/en-us/articles/360000726823-Creating-Log-Files)

## Game Data Import
- [X] make model loading async
- [X] add 'requiredForDecks' property on CollectionCard? (optimized calc for decks-table and history?)
- [X] business logic should not be done in reducers -> move to backend
- [X] make file locations configurable via settings
- [X] load model data from game: G:\MTGArenaLive\MTGA_Data\Downloads\Data

## Images
- [ ] use images (G:\MTGArenaLive\MTGA_Data\Downloads\AssetBundle --> https://www.slightlymagic.net/forum/viewtopic.php?f=65&t=22102 --> https://github.com/DerPopo/UABE)
- via G:\MTGArenaLive\MTGA_Data\Downloads\Data\data_cards_f9ac58c15b8b74fe8c6604c1941b65ac --> JSON
- lookup grpId (=mtgaId), take artId --> prefix of cardart file in G:\MTGArenaLive\MTGA_Data\Downloads\AssetBundle
- [ ] use deck.deckTileId (= mtgaId format) to show deck image
- [X] show set icons

## Bugs
- [ ] fix error if log is empty (e.g., after patch/before first game start, before game is installed)
- [X] fix active tab (visual representation)
- [X] fix lazy loading of tabs
- [X] fix ownedCount of basic lands --> infinite number of copies provided by MTGA
- [X] fix deck sorting
- [X] fix completeness
- [X] fix UI subheader glitch

## Production
- [ ] rename application to something better
- [ ] change ports for production
- [ ] add License
- [X] update maximegris/angular-electron version (Angular 8)
- [X] update to .NET Core 3.0
  - [ ] use IL linker to throw away unnecessary framework code
  - [X] make use of new JSON API with Span<T>, use UTF-8 version
  - [X] use appsettings.json
- [ ] handle connection refused with separate api error code
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
- [ ] preload decks-tab module (https://angular.io/guide/router#custom-preloading-strategy)
- [ ] parse log file async
- [ ] parse log file from end of file -> maybe not working for deck create/update/delete
- [ ] npm command to restore, build and copy backend .exe to Angular dist folder during development
- [ ] minify the bundle with browserify: http://maxgfeller.com/blog/2016/08/30/electron-browserify/
- [X] improve ngrx/rxjs stuff (.subscription bodys not dispatching actions, etc.)
- [X] remove file storage and set loader
