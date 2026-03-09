export const metadata = {
  title: 'DevLog',
  description: '프론트엔드 개발자 블로그',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}