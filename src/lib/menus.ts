import { TreeNodeType } from '@/components/ui/treeview'

export const DashboardMenu: TreeNodeType = {
    id: '0',
    name: 'Dashboard',
    url: '/',
}
export const TimeMenu: TreeNodeType = {
    id: '1',
    name: 'Time',
    url: '/time',
}
export const LeaveMenu: TreeNodeType = {
    id: '2',
    name: 'Leave',
    url: '/leave',
}
export const EthicsMenu: TreeNodeType = {
    id: '3',
    name: 'Ethics & Code of Conduct',
    url: '',
    children:[
        {
            id: '31',
            name: 'Workplace Professionalism',
            url: '/encc/workplace-professionalism',
        },
        {
            id: '32',
            name: 'Daily Activities',
            url: '/encc/daily-activities',
        },
        {
            id: '33',
            name: 'Use of Company Property',
            url: '/encc/use-of-company-property',
        },
    ]
}
export const AboutMenu: TreeNodeType =  {
    id: '4',
    name: 'About',
    url: '',
    children:[
        {
            id: '41',
            name: 'Company',
            url: '/about/company',
        },
        {
            id: '42',
            name: 'Mission',
            url: '/about/mission',
        },
        {
            id: '43',
            name: 'Vision',
            url: '/about/vision',
        },
    ]
}
export const ContactMenu: TreeNodeType = {
    id: '5',
    name: 'Contact',
    url: '/contact',
}
export const AdminMenu: TreeNodeType =  {
    id: '6',
    name: 'Admin',
    url: '',
    children:[        
        {
            id: '61',
            name: 'Approve Time',
            url: '/admin/approve-time',
        },
        {
            id: '62',
            name: 'Approve Leave',
            url: '/admin/approve-leave',
        },
        {
            id: '63',
            name: 'Time Reports',
            url: '/admin/time-report',
        },
        {
            id: '64',
            name: 'Leave Reports',
            url: '/admin/leave-report',
        },
    ]
}
export const PMMenu: TreeNodeType =  {
    id: '6',
    name: 'Admin',
    url: '',
    children:[        
        {
            id: '61',
            name: 'Approve Time',
            url: '/admin/approve-time',
        },
        {
            id: '63',
            name: 'Time Reports',
            url: '/admin/time-report',
        },
    ]
}
export const HolidayMenu: TreeNodeType = {
    id: '7',
    name: 'Holiday Schedule',
    url: '/holiday-schedule',
}

export const HRMenu: TreeNodeType = {
    id: '8',
    name: 'Human Resources',
    url: '/human-resources',
}

export const LeavePolicyMenu: TreeNodeType = {
    id: '9',
    name: 'Leave Policy',
    url: '/leave-policy',
}