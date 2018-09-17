import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private prefix : string = "";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  doSearch() {
    this.router.navigate(['/search', this.prefix])
  }

}
