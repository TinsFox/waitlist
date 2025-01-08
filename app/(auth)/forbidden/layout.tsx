export default function ForbiddenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-white">
      {children}
    </div>
  )
}