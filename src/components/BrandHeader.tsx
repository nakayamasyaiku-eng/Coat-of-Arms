'use client';

import Image from 'next/image';
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {LocaleSwitcher} from './LocaleSwitcher';

const links = [
  ['/collection', 'collection'], ['/cities', 'cities'], ['/craft', 'craft'],
  ['/about', 'about'], ['/contact', 'contact']
] as const;

export function BrandHeader() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="announcement">{useTranslations()('Announcement')}</div>
      <header className="site-header">
        <Link href="/" className="brand-mark" onClick={() => setOpen(false)}>
          <span className="brand-logo-lockup">
            <span className="brand-logo-emblem">
              <Image
                className="brand-logo"
                src="/brand/coat-of-arms-emblem.svg"
                alt=""
                aria-hidden="true"
                width={985}
                height={1011}
                priority
                unoptimized
              />
            </span>
            <span className="brand-logo-copy">
              <strong>Coat of Arms</strong>
              <small>European Copper Plate Archive</small>
            </span>
          </span>
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
          {open ? t('close') : t('menu')}<span aria-hidden="true">{open ? '×' : '☰'}</span>
        </button>
        <nav id="main-navigation" className={open ? 'main-nav open' : 'main-nav'} aria-label="Primary navigation">
          {links.map(([href, key]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={pathname === href ? 'active' : ''}>{t(key)}</Link>)}
          <LocaleSwitcher />
        </nav>
      </header>
    </>
  );
}
