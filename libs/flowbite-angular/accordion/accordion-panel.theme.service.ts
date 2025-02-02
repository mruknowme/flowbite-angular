import type {
  AccordionPanelClass,
  AccordionPanelProperties,
  AccordionPanelTheme,
} from './accordion-panel.theme';
import type { AccordionClass } from './accordion.theme';

import type { FlowbiteThemeService } from 'flowbite-angular';
import { mergeTheme } from 'flowbite-angular/utils';

import { inject, Injectable, InjectionToken } from '@angular/core';
import { twMerge } from 'tailwind-merge';

/**
 * `InjectionToken` used to import `AccordionPanelTheme` value
 *
 * @example
 * ```
 * var theme = inject(FLOWBITE_ACCORDION_PANEL_THEME_TOKEN)
 * ```
 */
export const FLOWBITE_ACCORDION_PANEL_THEME_TOKEN = new InjectionToken<AccordionPanelTheme>(
  'FLOWBITE_ACCORDION_PANEL_THEME_TOKEN'
);

@Injectable({
  providedIn: 'root',
})
export class AccordionPanelThemeService implements FlowbiteThemeService<AccordionPanelProperties> {
  private readonly baseTheme = inject(FLOWBITE_ACCORDION_PANEL_THEME_TOKEN);

  public getClasses(properties: AccordionPanelProperties): AccordionClass {
    const theme: AccordionPanelTheme = mergeTheme(this.baseTheme, properties.customStyle);

    const output: AccordionPanelClass = {
      rootClass: twMerge(theme.root.base),
    };

    return output;
  }
}
