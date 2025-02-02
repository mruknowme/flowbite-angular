import type { SidebarItemGroupClass, SidebarItemGroupTheme } from './sidebar-item-group.theme';
import { SidebarItemGroupThemeService } from './sidebar-item-group.theme.service';
import { SidebarItemComponent } from './sidebar-item.component';
import { SidebarMenuComponent } from './sidebar-menu.component';
import type { SidebarColors } from './sidebar.theme';

import type { DeepPartial } from 'flowbite-angular';
import { BaseComponent } from 'flowbite-angular';
import { IconComponent, IconRegistry } from 'flowbite-angular/icon';
import { CHEVRON_DOWN_SVG_ICON } from 'flowbite-angular/utils';

import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  inject,
  model,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @see https://flowbite.com/docs/components/sidebar/
 */
@Component({
  standalone: true,
  imports: [NgClass, NgIf, IconComponent],
  selector: 'flowbite-sidebar-item-group',
  template: `
    <span
      [class]="contentClasses().spanClass"
      (click)="toggleVisibility()">
      <h4>{{ title() }}</h4>
      <flowbite-icon
        svgIcon="flowbite-angular:chevron-down"
        class="h-6 w-6 shrink-0 duration-200"
        [class.rotate-180]="!isOpen()" />
    </span>
    <ng-content *ngIf="isOpen()" />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemGroupComponent extends BaseComponent<SidebarItemGroupClass> {
  /**
   * Service injecteed used to generate class
   */
  public readonly themeService = inject(SidebarItemGroupThemeService);
  /**
   * `IconRegistry` service
   */
  public readonly iconRegistry = inject(IconRegistry);
  /**
   * `DomSanitizer` service
   */
  public readonly domSanitizer = inject(DomSanitizer);
  /**
   * The parent `SidebarMenuComponent`
   */
  public readonly sidebarMenuComponent = inject(SidebarMenuComponent);
  /**
   * List of `SidebarItemComponent`
   */
  public readonly sidebarItemChildren = contentChildren(SidebarItemComponent);

  //#region properties
  /**
   * Set if the sidebar item group is open
   *
   * @default One of children is active
   * @default false
   */
  public isOpen = model<boolean>(
    this.sidebarItemChildren().some((x) => x.flowbiteRouterLinkActive?.isActive() ?? false)
  );
  /**
   * Set the sidebar item group color
   *
   * @default `SidebarMenuComponent`'s color
   */
  public color = model<keyof SidebarColors>(this.sidebarMenuComponent.color());
  /**
   * Set the sidebar item group title
   */
  public title = model.required<string>();
  /**
   * Set the custom style for this sidebar item group
   */
  public customStyle = model<DeepPartial<SidebarItemGroupTheme>>({});
  //#endregion

  //#region BaseComponent implementation
  public override fetchClass(): SidebarItemGroupClass {
    return this.themeService.getClasses({
      color: this.color(),
      customStyle: this.customStyle(),
    });
  }

  public override verify(): void {
    if (this.sidebarItemChildren().length === 0) {
      throw new Error('No SidebarItemComponent available');
    }
  }

  public override init(): void {
    this.iconRegistry.addRawSvgIconInNamepsace(
      'flowbite-angular',
      'chevron-down',
      this.domSanitizer.bypassSecurityTrustHtml(CHEVRON_DOWN_SVG_ICON)
    );
  }
  //#endregion

  /**
   * Toggle isOpen value
   *
   * @param isOpen If provided force isOpen value
   */
  public toggleVisibility(isOpen?: boolean): void {
    if (isOpen === undefined) {
      isOpen = untracked(() => !this.isOpen());
    }

    this.isOpen.set(isOpen);
  }
}
