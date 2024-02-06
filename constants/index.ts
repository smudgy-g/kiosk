import { NavLink } from '@/types'
import { PersonIcon, ReaderIcon, RocketIcon } from '@radix-ui/react-icons'

export const NAV_LINKS: NavLink[] = [
  {
    icon: PersonIcon,
    route: '/dashboard/profile',
    label: 'Profile',
  },

  {
    icon: ReaderIcon,
    route: '/dashboard/order',
    label: 'Orders',
  },
  {
    icon: RocketIcon,
    route: '/dashboard/supplier',
    label: 'Suppliers',
  },
  // {
  //   icon: <RocketIcon />,
  //   route: '/dashboard/product',
  //   label: 'Products',
  // },
]

export const PRODUCT_TYPES = [
  'Fruit',
  'Vegetable',
  'Meat',
  'Seafood',
  'Dairy',
  'Beer',
  'Wine',
  'Spirit',
  'Non-Alcoholic',
  'Other',
]
