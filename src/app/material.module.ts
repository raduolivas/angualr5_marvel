import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, 
        MatToolbarModule, 
        MatInputModule, 
        MatProgressSpinnerModule, 
        MatCardModule,
        MatExpansionModule,
        MatGridListModule,
        MatListModule} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatInputModule, 
        MatProgressSpinnerModule,
        MatCardModule,
        MatExpansionModule,
        MatGridListModule,
        MatListModule
        
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatExpansionModule,
        MatGridListModule,
        MatListModule
    ],
})

export class MaterialModule {}