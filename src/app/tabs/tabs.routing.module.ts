import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';


const routes: Routes = [
    {
      path: 'tabs',
      component: TabsPage,
      children: [
        {
          path: 'home',
          children: [
            {
              path: '',
              loadChildren: '../home/home.module#HomePageModule'
            }
          ]
        },
        {
          path: 'main',
          children: [
            {
              path: '',
              loadChildren: '../main/main.module#MainPageModule'
            }
          ]
        },
        {
          path: 'local-file',
          children: [
            {
              path: '',
              loadChildren: '../local-file/local-file.module#LocalFilePageModule'
            }
          ]
        },
        {
          path: '',
          redirectTo: '/tabs/main',
          pathMatch: 'full'
        }
      ]
    },
    {
      path: '',
      redirectTo: '/tabs/main',
      pathMatch: 'full'
    }
  ];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class TabsPageRoutingModule {}
