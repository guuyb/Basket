import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket-link',
  templateUrl: './basket-link.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketLinkComponent implements OnInit {

  @Input() count: number | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
