import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu/menu.component';
import { PageComponent } from './page/page/page.component';
import { SectionGeneralComponent } from './section/section-general/section-general.component';
import { SectionPagesComponent } from './section/section-pages/section-pages.component';
import { SectionComponent } from './section/section/section.component';
import { VersionGeneralComponent } from './version/version-general/version-general.component';
import { VersionSectionsComponent } from './version/version-sections/version-sections.component';
import { VersionComponent } from './version/version/version.component';
import { VersionsListComponent } from './version/versions-list/versions-list.component';

const routes: Routes = [
  {
    path: 'versions',
    component: VersionsListComponent,
  },
  {
    path: 'versions/:versionId',
    component: VersionComponent,
    children: [
      {
        path: '',
        component: VersionGeneralComponent,
      },
      {
        path: 'sections',
        component: VersionSectionsComponent,
      },
      {
        path: 'sections/:sectionId',
        component: SectionComponent,
        children: [
          {
            path: '',
            component: SectionGeneralComponent,
          },
          {
            path: 'menu',
            component: MenuComponent,
          },
          {
            path: 'pages',
            component: SectionPagesComponent,
          },
          {
            path: 'pages/:pageId',
            component: PageComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
