'use client'
import React, { ReactNode } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

type TBreadCrumbProps = {
    homeElement: ReactNode,
    separator: ReactNode,
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean
}

const BreadCrumb = ({homeElement, separator, containerClasses, listClasses, activeClasses, capitalizeLinks}: TBreadCrumbProps) => {

    const paths = usePathname()
    const pathNames = paths.split('/').filter( path => path )

    return (
        <ul className={containerClasses}>
            <li className={listClasses}><i className="fa fa-home"/> <Link href={'/'}>{homeElement}</Link></li>
            {pathNames.length > 0 && separator}
        {
            pathNames.map( (link, index) => {
                let href = `/${pathNames.slice(0, index + 1).join('/')}`
                let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                return (
                    <React.Fragment key={index}>
                        <li className={itemClasses} >
                            {pathNames.length !== index + 1 ?
                                <Link href={href}>{itemLink.replace(/%20/g, ' ')}</Link>
                                :
                                <>{itemLink.replace(/%20/g, ' ')}</>
                            }
                        </li>
                        {pathNames.length !== index + 1 && separator}
                    </React.Fragment>
                )
            })
        }
        </ul>
    )
}

export default BreadCrumb