# Features / Backlog

## MVP
- [X] enable CORS for electron
- [X] fix electron window height
- [X] make window borderless and draggable
- [X] avoid log file lock by MTGA
- [X] add filter clear button
- [X] add loading bar
- [X] integrate player inventory to UI
- [X] improve theming
- [ ] show application name
- [ ] rename application to 'Collection Optimizer'
- [ ] repeatedly call backend
- [ ] show set completeness
- [ ] settings via REST call
- [ ] SQLite/Electron Store (https://github.com/sindresorhus/electron-store) store for settings
- [ ] show where to spend available wildcards
- [ ] sound bleep upon required card is added to collection
- [ ] detect changes and push from backend with Server Sent Events (SSE)
- [ ] change ports for production
- [ ] add License info (https://company.wizards.com/fancontentpolicy)

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
