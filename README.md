# epm-cli

[Epm](https://github.com/Dte-ba/epm)'s command line interface

# Usage

Disponible en [NPM Repository](https://www.npmjs.org/package/epm-cli)

```
npm install -g epm-cli
```

```
Usage: epm [options] <command> [<args>]

Commands:

  init [path] [name]     initialize an epm repository on [path] (./) named [name] (main)
  status                 show info about the repository
  show                   gets repository data
  remote                 manage the remote repositories
  clone <url> [path] [name] clone a remote repository on [path] (./) as [name] (main)
  fetch <remote>         retrieves info about a <remote> repository
  pull <remote>          sync with a <remote> repository
  serve [path] [port]    serve [path] (./) repositories on [port] (3220)

Options:

  -h, --help       output usage information
  -V, --version    output the version number
  --verbose        Verbose mode
```

Entorno visual

[epm-viewer](https://github.com/Dte-ba/epm-viewer)

## Licencia

Copyright(c) 2014 Dirección de Tecnología Educativa de Buenos Aires (Dte-ba)

Distrubuido bajo la licencia [GNU GPL v3](http://www.gnu.org/licenses/gpl-3.0.html)