# Hosting Scenarios

## Local (Development)
App Server (node)
 <!-- Env Variables (.env files) -->
DB server (mongodb, postgres)


## Remote (Production Deploy)
App Server (App code BUT on a Cloud Provider's remote machine, e.g. Railway or Vercel(serverless/ Next))
 <!-- Env Variables (held in host's dashboard) -->
DB server (mongodb ATLAS, postgres)

```js
const db = {
  name: "james"
}

db.name

const vector = [1,3]
const matrix = [
  [1,2],
  [1,2],
];
const tensor = [
  [
    [],
    [],
  ]
]
```

```js
const db = {
  cars: [{ name: 'jhames'}, {}],
  owners: []
}
```