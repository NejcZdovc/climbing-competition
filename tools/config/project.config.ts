import {join} from 'path';
import {SeedConfig} from './seed.config';
import {InjectableDependency} from './seed.config.interfaces';

export class ProjectConfig extends SeedConfig {
  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    this.APP_TITLE = 'Climbing';
    let additional_deps: InjectableDependency[] = [
        {src: 'jquery/dist/jquery.min.js', inject: 'libs'}
    ];

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);

    this.APP_ASSETS = [
      { src: `${this.ASSETS_SRC}/main.css`, inject: true },
      { src: `${this.ASSETS_SRC}/bootstrap.min.js`, inject: 'libs' },
    ];
  }
}
