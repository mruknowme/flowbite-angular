import type {
  AccordionTitleClass,
  AccordionTitleProperties,
  AccordionTitleTheme,
} from './accordion-title.theme';

import type { FlowbiteThemeService } from 'flowbite-angular';
import { mergeTheme } from 'flowbite-angular/utils';

import { inject, Injectable, InjectionToken } from '@angular/core';
import { twMerge } from 'tailwind-merge';

/**
 * `InjectionToken` used to import `AccordionTitleTheme` value
 *
 * @example
 * ```
 * var theme = inject(FLOWBITE_ACCORDION_TITLE_THEME_TOKEN)
 * ```
 */
export const FLOWBITE_ACCORDION_TITLE_THEME_TOKEN = new InjectionToken<AccordionTitleTheme>(
  'FLOWBITE_ACCORDION_TITLE_THEME_TOKEN'
);

@Injectable({
  providedIn: 'root',
})
export class AccordionTitleThemeService implements FlowbiteThemeService<AccordionTitleProperties> {
  private readonly baseTheme = inject(FLOWBITE_ACCORDION_TITLE_THEME_TOKEN);

  public getClasses(properties: AccordionTitleProperties): AccordionTitleClass {
    const theme: AccordionTitleTheme = mergeTheme(this.baseTheme, properties.customStyle);

    const output: AccordionTitleClass = {
      rootClass: twMerge(
        theme.root.base,
        theme.root.color[properties.color],
        theme.root.isFlush[properties.isFlush],
        theme.root.isOpen[properties.isOpen]
      ),
      textClass: twMerge(theme.text.base),
    };

    return output;
  }
}
