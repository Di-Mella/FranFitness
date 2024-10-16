// src/app/components/user-overview/user-overview.component.ts

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
})
export class UserOverviewComponent {
  @Input() nombre!: string;
  @Input() email!: string;
  @Input() avatar!: string;

  constructor() { }

  ngOnInit() {}

}
