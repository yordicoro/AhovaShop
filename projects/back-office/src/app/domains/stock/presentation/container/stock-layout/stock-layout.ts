import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Navbar } from "../../../../../shared/ui/templates/components/navbar/navbar";


@Component({
  selector: 'stock-layout',
  imports: [RouterOutlet, Navbar],
  templateUrl: './stock-layout.html',
  styleUrl: './stock-layout.css',
})
export class StockLayout {

}
