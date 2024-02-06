import {
  Inter as FontSans,
  DM_Serif_Display as FontSerif,
} from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontSerif = FontSerif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif',
})
