import "@/src/style/globals.css";

export const metadata = {
  title: 'Tracking Expense Test',
  description: 'Developed by ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
