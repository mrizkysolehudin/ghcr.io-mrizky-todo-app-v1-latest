import localFont from '@next/font/local'

const poppins = localFont({
  src: [
    {
      path: '../../../public/fonts/Poppins/Poppins-Regular.ttf',
      weight: '400'
    },
    {
      path: '../../../public/fonts/Poppins/Poppins-Bold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-poppins'
})

export {
  poppins
}