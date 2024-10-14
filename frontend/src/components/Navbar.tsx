import Link from "next/link"

const Navbar = () => {
  return (
    <div className="w-full h-24 bg-slate-100 px-12  flex justify-between items-center">
      <Link href={'/'} className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white">Home</Link>
      <Link href={'/register'} className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white">register</Link>
      <Link href={'/login'} className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white">login</Link>
      <Link href={'/dashboard'} className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white">dashboard</Link>
      <Link href={'/change-password'} className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white">change-password</Link>
      <Link href={'/forgot-password'} className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white">forgot-password</Link>
      <Link href={'/logout'} className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white">logout</Link>
    </div>
  )
}
export default Navbar