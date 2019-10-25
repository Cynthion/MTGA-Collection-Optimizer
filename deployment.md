# Publish Size-Optimized, Self-Contained App
- In the start-up project (MtgaDeckBuilder.Api.csproj):
  - Create a publish profile in the /Properties folder.
  - Set <PublishTrimmed> property to true in start-up project to make use of assembly linking that throws away unnecessary framework dll's
- Execute the following command on project level by providing the path to the .csproj file in order to publish the optimized project:
  'dotnet publish "MtgaDeckBuilder.Api.csproj" -r win-x64 -c Release'
- In the UI pipeline, this can look like this:
  'dotnet publish "..\MtgaDeckBuilder.Api\MtgaDeckBuilder.Api.csproj" -c Release -r win-x64 -o "../UI/netcore-backend"'

# electron-builder
- Currently, the /netcore-backend folder needs to be copied manually to the /dist folder (the one configured in angular.json under build.options.outputPath)
--> if this step is required automatically, introduce a build step in npm scripts after ng build and before electron-builder
