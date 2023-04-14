# Me Loger Sur Bordeaux
Projet personnel afin de m'aider dans ma recherche d'appart.

### Objectif fonctionnel
Suivi, historisation, géolocalisation et analyse spatiale de l'offre immobilière sur Bordeaux.

### Objectif technique
Déploiement de la MEAN Stack sur Azure.

### Stack
* Angular 12
* NodeJs
* Express
* Mongoose
* MongoDB Atlas
* Azure
* Un ordinateur

### Deployment Notes
* npm ci
* `nodemon server.js` | `npm run start:dev`

### Working with Docker and Azure
#### Building the local docker image
> docker build -t me-loger-app .
#### Running it locally
> docker run -d --name me-loger-container -p 3000:3000 me-loger-app
#### Building an ISO image with <azure registry url>/<name>:<tag>
> docker tag me-loger-app meloger.azurecr.io/meloger:latest
#### Connecting to Azure via the CLI
##### Following the documentations
* [container-registry](https://learn.microsoft.com/fr-fr/azure/container-registry/container-registry-get-started-portal?tabs=azure-cli)
* [app-service](https://learn.microsoft.com/fr-fr/azure/app-service/quickstart-custom-container?tabs=dotnet&pivots=container-linux-azure-portal)
##### Check CLI
> az --version

> az login

> az acr login --name meloger

#### Push to the Azure registry
> docker push meloger.azurecr.io/meloger

#### Deleting the ISO
> docker rmi meloger.azurecr.io/meloger


### Gallery
![Map](https://user-images.githubusercontent.com/15570932/231195956-13528610-c3b4-42cb-964d-4187e45e5424.png "Map")
![Charts](https://user-images.githubusercontent.com/15570932/231196486-2c51a144-493f-4788-8d66-0650185f130e.png "Charts")
![List](https://user-images.githubusercontent.com/15570932/231197032-93558367-8714-4a7f-b8d6-99b31796a915.png "List")
![Form to fill](https://user-images.githubusercontent.com/15570932/231197366-71a30aa7-f693-4476-952f-d58cc95fd8fd.png "Form to fill")
![Form filled](https://user-images.githubusercontent.com/15570932/231197383-e842b5fe-bcf9-4b25-b918-641828d6f500.png "Form filled")
![Update](https://user-images.githubusercontent.com/15570932/231197905-aa752c12-96f9-48d5-bcfa-d0254b7bf5b7.png "Update")
