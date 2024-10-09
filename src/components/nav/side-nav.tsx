'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Treeview, TreeNodeType } from '@/components/ui/treeview'
import PoweredBy from '@/components/nav/powered-by';
import HSpacer from '@/components/ui/h-spacer';
import MobileLogout from '@/components/nav/mobile-logout';
import { AboutMenu, DashboardMenu, TimeMenu, LeaveMenu, EthicsMenu, ContactMenu, AdminMenu, HRMenu, HolidayMenu, LeavePolicyMenu, PMMenu } from '@/src/lib/menus';
import { useSession } from 'next-auth/react';

export default function SideNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, select] = useState<string | null>(null)
    const { data: session } = useSession();
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false); // Close the navigation panel
    }, [ pathname ]);
    let data: TreeNodeType[] = [];
    data.push(DashboardMenu);
    data.push(TimeMenu);    
    data.push(HolidayMenu);
    if(session?.user.roles.includes('Admin')){
        data.push(LeaveMenu);
        data.push(AdminMenu);
        data.push(LeavePolicyMenu);
    }  
    if(session?.user.roles.includes('EngagementManager')) {
        data.push(PMMenu);
    }
    data.push(HRMenu);    
    data.push(EthicsMenu);
    data.push(AboutMenu);
    data.push(ContactMenu);
    return(
        <nav className="w-full md:w-72">
            <div className="w-full flex">
            <div className="flex items-center flex-shrink-0 text-white mr-6 pt-4 pl-3 pr-3 pb-4 md:pb-0 text-2xl">
                <i className="fa-regular fa-address-card  mr-2 text-blue-400 justify-items-start"></i>                
                <Link href={"/"} className = "justify-items-start text-blue-400">
                    <span className="text-white">Employee </span>
                    <span className="text-blue-400">Portal</span>
                </Link>
            </div>
            <div className="w-full flex md:hidden justify-end md:justify-normal">
                <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-3 py-2 rounded text-blue-400 hover:text-blue-300 pt-5 pl-3 pr-5 pb-4 md:pb-0"
                >
                <svg
                    className={`fill-current h-5 w-5 ${isOpen ? "hidden" : "block"}`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
                <svg
                    className={`fill-current h-5 w-5 ${isOpen ? "block" : "hidden"}`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                </svg>
                </button>
            </div>
            </div>
            <div className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`} id="navbar-default">
                <HSpacer />                
                <Treeview.Root
                    value={selected}
                    onChange={select}
                    className="w-84 h-full m-2 text-slate-100 text-sm"
                    >
                    {data.map(node => (
                        <Treeview.Node node={node} key={node.id} />
                    ))}
                </Treeview.Root>
                <MobileLogout />
                <HSpacer />
                <PoweredBy color={"white"} />
            </div>
        </nav>
    );
}