# contribute

Guide etape par etape pour contribuer sur github

# start :
Tous d'abord, vous devez choisir un projet auquel contribuer. Je vous suggère de commencer par une bibliothèque que vous
utilisez actuellement car vous comprennez le but de la bibliotheque et que vous serez investi pour améliorer.

## Étape 1 : connectez-vous à GitHub
Sign into your GitHub account, or create a free GitHub account if you don't have one.

## Étape 2 : Forkez le référentiel du projet
Find the project's repository on GitHub, and then "fork" it by clicking the Fork button in the upper right corner.
This creates a copy of the project repository in your GitHub account.

## Etape 3: Clone your fork


## Etape 4 : accèder a votre référentiel local

Etant donné que le clone télécharger dans un sous-repertoire de votre répertire de travail vous pouve accèder a l'aide :
```
cd name_clone_project
```

## Étape 7 : Tirez les dernières modifications de l'amont vers votre référentiel local
Avant de commencer à apporter des modifications à vos fichiers locaux, il est conseillé de synchroniser d'abord votre
référentiel local avec le référentiel de projet. Utilisez git pull upstream masterpour "extraire" toutes les
modifications
de la branche "maître" de "l'amont" dans votre référentiel local.

Si vous avez forké et cloné le référentiel du projet il y a quelques minutes, il est très peu probable qu'il y ait des
changements, auquel cas Git signalera que votre référentiel local est "déjà à jour". Mais s'il y a des changements, ils
seront automatiquement fusionnés dans votre référentiel local.
## Etape 8 : Créer une nouvelle branche
Plutôt que d'apporter des modifications à la branche "principale" du projet, il est préférable de créer votre propre
branche. Cela crée un environnement pour votre travail qui est isolé de la branche principale.

Utilisez git checkout -b BRANCH_NAMEpour créer une nouvelle branche et y basculer immédiatement. Le nom de la branche
doit décrire brièvement ce sur quoi vous travaillez et ne doit contenir aucun espace.

Par exemple, je l'ai utilisé git checkout -b doc-fixesparce que je faisais de petites corrections à la documentation.

Utilisez git branchpour montrer vos succursales locales. Vous devriez voir votre nouvelle branche ainsi que "master", et
votre nouvelle branche doit avoir un astérisque à côté pour indiquer qu'elle est "extraite" (ce qui signifie que vous y
travaillez).

## Étape 9 : Apportez des modifications dans votre référentiel local
Utilisez un éditeur de texte ou un IDE pour apporter les modifications que vous avez prévues aux fichiers de votre
référentiel local. Étant donné que vous avez extrait une branche à l'étape précédente, toutes les modifications que vous
apportez n'affecteront que cette branche.

## Étape 10 : Validez vos modifications
Après avoir effectué un ensemble de modifications, utilisez git add -Apour mettre en scène vos modifications et git
commit -m "DESCRIPTION OF CHANGES"les valider.

Par exemple, j'ai utilisé git commit -m "fix typos in set_config docstring"pour l'un de mes commits.

Si vous effectuez plusieurs ensembles de modifications, il est recommandé d'effectuer une validation après chaque
ensemble.

## Étape 11 : Envoyez vos modifications à votre fourche
Lorsque vous avez terminé toutes vos modifications, téléchargez ces modifications sur votre fork à l'aide de git push
origin BRANCH_NAME. Cela "pousse" vos modifications vers la branche "BRANCH_NAME" de "l'origine" (qui est votre fork sur
GitHub).

Par exemple, j'ai utilisé git push origin doc-fixes.