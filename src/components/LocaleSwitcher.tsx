'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale = locale === 'en' ? 'zh' : 'en';

  return (
    <button
      className="locale-switch"
      type="button"
      onClick={() => router.replace(pathname, {locale: nextLocale})}
      aria-label={locale === 'en' ? '切换至中文' : 'Switch to English'}
    >
      <span className={locale === 'zh' ? 'active' : ''}>中文</span>
      <i aria-hidden="true">·</i>
      <span className={locale === 'en' ? 'active' : ''}>EN</span>
    </button>
  );
}
