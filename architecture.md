# Electron Security & Preload
The following works for running Electron local (npm run electron:local):
- preload.js and storage.js script need to be part of Angular src/ folder.
- angular.json needs to be configured to copy the preload.js and storage.js to the /dist folder (under assets).
- main.ts needs to find the preload.js via 'preload: path.join(__dirname, 'dist/preload.js')'
- main.ts needs to find the storage.js via 'const storage = require('./dist/storage');'
- nodeIntegration can be set to false? // TODO
- .gitignore needs to specify the two .js scripts to not be ignored

# Modules
- App Module
|-- about
|-- api-error
|-- providers
|-- settings
|-- util
|-- Layout Module
| |-- Inventory
| |-- Tabs
|   |-- Decks Tab Module (lazy loaded)
|   |-- Wildcard Path Module (lazy loaded)
|   |-- History Tab Module
|-- Shared Module (?)

# Settings
## Electron
- The settings path is determined statically. // TODO
- The storage.js script needs to be on the same level as preload.js since it is referenced by it.
- Electron's main.ts calls the storage.js directly by providing the settings path.
- Angular calls the storage.js via the preload.js bridge. The preload.js script determines the settings path.

## Angular
- UI initial settings are empty
- Backend defines default settings
- Before first data load, user settings are stored on backend
- Upon opening the settings dialog
  - backend settings are fetched
  - user settings are fetched
  - both are merged
  - dialog is opened

- Upon closing the settings dialog
  - settings are stored to backend, data is re-loaded
  - settings are stored to user settings
  - dialog is closed

- Backend verifies paths
  - upon storing to the backend
  - upon accessing files and throws ApiErrors if not valid