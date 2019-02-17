# Features / Backlog

## MVP
- [ ] settings via REST call
- [ ] add loading bar
- [ ] rename application to 'Collection Optimizer'
- [ ] show set completeness
- [ ] SQLite/Electron Store (https://github.com/sindresorhus/electron-store) store for settings
- [ ] remove file storage and set loader
- [ ] show where to spend available wildcards
- [ ] sound bleep upon required card is added to collection
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

## Production
- [ ] use Angular enableProdMode()
- [ ] change ports for production
- [ ] add License info (https://company.wizards.com/fancontentpolicy)
- [ ] fix window menu (WinRef) for electron

## Future Releases
- [ ] drop location for new Card Set json file -> automatic installation
- [ ] filter by type (creature, enchantment, etc.)
- [ ] filter by class (vampire, etc.)
- [ ] progess tab (unique/all cards)
- [ ] more beautiful owned/missing indicator
- [ ] make deck columns sortable/moveable

# Bugs
- [X] check 'Blood Crypt' quantity
- [X] quit Electron and process correctly

# Optimization
- [ ] parse log file async
- [ ] parse log file from end of file
- [ ] npm command to restore, build and copy backend .exe to Angular dist folder
