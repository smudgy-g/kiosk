import { Lato as FontSans, Abril_Fatface as FontSerif } from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  style: ['italic', 'normal'],
  variable: '--font-sans',
})

export const fontSerif = FontSerif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  variable: '--font-serif',
})
