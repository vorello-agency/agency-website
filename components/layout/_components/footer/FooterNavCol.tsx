"use client";

import React from "react";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

interface FooterNavColProps {
  title: string;
  links: NavLink[];
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const linkClass =
  "group/link relative inline-flex items-center text-sm text-copy-muted hover:text-chrome-highlight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded py-1";

const underlineSpan =
  "absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-electric-violet/60 transition-transform duration-300 group-hover/link:scale-x-100";

export default function FooterNavCol({ title, links, onLinkClick }: FooterNavColProps) {
  return (
    <div className="footer-col flex flex-col gap-4">
      <h3 className="text-chrome-highlight font-mono text-[11px] font-semibold tracking-[0.15em] uppercase">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              onClick={(e) => onLinkClick(e, link.href)}
              className={linkClass}
            >
              <span>{link.label}</span>
              <span className={underlineSpan} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
