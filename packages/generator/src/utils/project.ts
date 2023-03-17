import { Project, ScriptTarget, ModuleKind, CompilerOptions } from 'ts-morph';

// typescript utils to parse data from files and write code to files
// find variable names, if a variable is exported, add imports, etc...
const compilerOptions: CompilerOptions = {
  target: ScriptTarget.ES2018,
  module: ModuleKind.CommonJS,
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  esModuleInterop: true,
};

export const project = new Project({
  compilerOptions: {
    ...compilerOptions,
  },
});
