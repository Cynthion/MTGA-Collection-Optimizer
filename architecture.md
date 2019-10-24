# Electron Security & Preload
The following works for running Electron local (npm run electron:local):
- preload.js script needs to be part of Angular src/ folder.
- angular.json needs to be configured to copy the preload.js to the /dist folder (under assets).
- main.ts needs to find the preload.js via 'preload: path.join(__dirname, 'dist/preload.js')'
- nodeIntegration can be set to false?

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