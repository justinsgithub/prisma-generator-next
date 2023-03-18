import path from 'path'

/**
  importing = the file containing the import statement
  exporting = the file containing the export statment
  IMPORTANT: use path.resolve to get full file path
*/
export function getImportPath(importing: string, exporting: string) {
  let relativePath = path.posix.relative(path.dirname(importing), exporting)
  // need paths in same directory to start with ./
  if (relativePath[0] !== '.') {
    relativePath = './' + relativePath
  }

  // .js needs to stay to import js into typescript file (just incase prisma is imported from user js file)
  /* const importPath = relativePath.replace(/.tsx$|.ts$|.js$|.jsx$/,'') */
  const importPath = relativePath.replace(/.tsx$|.ts$/, '')
  return importPath
}
