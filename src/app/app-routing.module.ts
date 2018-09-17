import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { CharacterComponent } from './components/characters-list/character/character.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { SearchComponent } from './components/characters-list/search/search.component';

const appRoutes: Routes = [
    { path: 'characters', component: CharactersListComponent},
    { path: 'character/:id/info', component: CharacterComponent},
    { path: 'search/:prefix', component: SearchComponent},
    { path: '', redirectTo: '/characters', pathMatch: 'full' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}