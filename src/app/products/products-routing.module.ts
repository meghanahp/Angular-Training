import { NgClass } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Path } from "../models";
import { AuthGuard } from "../security/auth.guard";
import { AddEditComponent } from "./add-edit/add-edit.component";
import { ListComponent } from "./list/list.component";
import { ProductResolverService } from "./product-resolver.service";
import { ProductsComponent } from "./products.component";
const routes: Routes = [
    {
        path: Path.HOME,
        component: ProductsComponent,
        canActivate: [AuthGuard],
        children: [ 
            {
                path: Path.HOME,
                component: ListComponent,
                resolve: {products: ProductResolverService}
            },   
            {
            path: Path.PRODUCTADDEDIT,
            component: AddEditComponent,
            canActivate: [AuthGuard]
        }]
    },

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProductsRoutingModule {}