"use client"

import Link from 'next/link'
import {usePathname} from "next/navigation"
export default function Header() {


    const pathname = usePathname();

    const navItems = [
        {
            label: 'Home',
            href: '/'
        },

        {
            label: 'Product',
            href: '/product'
        },

        {
            label: 'About',
            href: '/about'
        },


        {
            label: 'Faq',
            href: '/about/faq'
        },

        {
            label: 'Post',
            href: '/post'
        },

        {
            label: 'Search',
            href: '/search'
        },
    ]
    return (
        <div>
            <ul className='flex gap-3'>
                {
                    navItems.map((link, index) => (
                        <li key={index}>
                            <Link className={pathname === `${link.href}` ? 'text-teal-500 font-bold' : ""} href={link.href}>{link.label}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
