# Ngx Can I?

## Introduction

This is a package created for angular developers to help them deal with permissions, router permissions using pipes, guards etc. At some points Casl inspired me since it was the package i used for this purpose for years.

## Quick start

Install the package:

```
npm i -D ngx-can-i
```

Provide it at the root:

```
import { provideCanI } from 'ngx-can-i';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [,
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideCanI(),
  ],
};
```

## Basic Usage

### Types

You can declare your own types, create a .d.ts for example in src/types and declare your own Action and Entity union types;

```
import 'ngx-can-i';

declare module 'ngx-can-i' {
  interface PermissionTypeRegistry {
    Action: 'read' | 'write';
    Entity: 'User' | 'BlogPost';
  }
}
```

From now on the package will only accept 'read' or 'write' as actions and only 'User' and 'BlogPost' as entities.

### Building permissions

You can inject CanIService anywhere you want and build your own permissions using grant() function.

```
import { CanIService } from 'ngx-can-i';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  readonly canIService = inject(CanIService); //inject the service

  ngOnInit(): void {
    this.canIService.grant('read', 'BlogPost'); // read + BlogPost is a valid combo

    this.canIService.grant('update', 'Blog'); // invalid combo, you'll get a ts error
  }
}
```

You can use the PermissionKey (`${action}:${entity}`) overload:

```
    this.canIService.grant('read:BlogPost'); // it is a valid combo

    this.canIService.grant('update:Blog'); // invalid combo --> ts error
```

You can revoke your permissions using .revoke(action, entity) or .revokeAll() functions

```
this.canIService.revoke('read', 'BlogPost');
this.canIService.revoke('read:BlogPost');
this.canIService.revokeAll();
```

You can even chain these functions together for more fluent permission building:

```
this.canIService.revokeAll().grant('read', 'BlogPost').grant('write:User');
```

### Usage in templates

In your template code you can use the built in canI pipe to display components based on the permissions defined previously.

```
@if("read" | canI : "BlogPost"){
  <span> It's a blog post! </span>
}
```

## Routes

### Building route permissions

You can grant route permissions to define wether the current user can access your page/component or not.

```
this.canIService.grantRoute('test');
```

You can revoke your granted routes too

```
this.canIService.revokeRoute('test');
```

After you have defined all your granted routes you can use CanIVisitGuard on routes you want to protect from unwanted access.

```
import { canIVisitGuard } from 'ngx-can-i';

export const routes: Routes = [
  {
    path: 'test',
    component: Test,
    canActivate: [canIVisitGuard],
  },
];
```
