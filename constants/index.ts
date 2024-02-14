import { NavLink } from '@/types'
import {
  PersonIcon,
  ReaderIcon,
  RocketIcon,
  MixIcon,
} from '@radix-ui/react-icons'

export const NAV_LINKS: NavLink[] = [
  {
    icon: MixIcon,
    route: '/dashboard',
    label: 'Dashboard',
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
  {
    icon: PersonIcon,
    route: '/dashboard/profile',
    label: 'Profile',
  },
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

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
