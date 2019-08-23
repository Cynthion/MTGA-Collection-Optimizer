import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavLink } from './tabs.state';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  public navLinks: NavLink[] = [
    {
      label: 'DECKS',
      path: '/decks-tab'
    },
  ];
}
