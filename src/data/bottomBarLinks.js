import { FiHome, FiCreditCard, FiList } from 'react-icons/fi'
const bottomBarLinks = [
    {
        label: 'Dashboard',
        icon: <FiHome size={24} />,
        href: '/',
    },
    {
        label: 'Transactions',
        icon: <FiList size={24} />,
        href: '/transactions',
    },
    {
        label: 'Accounts',
        icon: <FiCreditCard size={24} />,
        href: '/accounts',
    }
]
export default bottomBarLinks