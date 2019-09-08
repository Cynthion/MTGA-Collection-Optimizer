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
- Upon opening the settings dialog
  - settings are fetched from backend
  - dialog is opened

- Upon closing the settings dialog
  - settings are stored to backend, data is re-loaded
  - dialog is closed

- Backend verifies paths
  - upon storing to the backend
  - upon accessing files and throws ApiErrors if not valid