# Features / Backlog

## MVP
- [ ] show where to spend available wildcards
- [ ] sound bleep upon required card is added to collection
- [ ] make deck columns moveable
- [ ] make deck columns sortable -> store setting
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
- [X] fix UI subheader glitch
- [ ] fix deck sorting

## Production
- [ ] rename application to 'Collection Optimizer'
- [ ] change ports for production
- [ ] add License
- [X] add Fan Content Policy info (https://company.wizards.com/fancontentpolicy)
- [X] fix window menu (WinRef) for electron
- [X] use Angular enableProdMode()
- [X] custom favicon

## Future Releases
- [ ] drop location for new Card Set json file -> automatic installation
- [ ] filter by type (creature, enchantment, etc.)
- [ ] filter by class (vampire, etc.)
- [ ] progess tab (unique/all cards)
- [ ] paginator: show all items
- [X] more beautiful owned/missing indicator

# Optimization / Refactoring
- [X] remove file storage and set loader
- [ ] parse log file async
- [ ] parse log file from end of file
- [ ] npm command to restore, build and copy backend .exe to Angular dist folder during development
- [ ] minify the bundle with browserify: http://maxgfeller.com/blog/2016/08/30/electron-browserify/
