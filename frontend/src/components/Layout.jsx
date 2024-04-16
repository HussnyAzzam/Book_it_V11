import { Link, Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const location = useLocation()
  console.log(location.pathname)
  const isActiveRoute = (route) => {
    return route === location.pathname
  }
  return (
    <main className='px-20 flex relative py-10'>
      <div className='sticky top-10'>
        <div className='flex flex-col gap-y-3 mr-20'>
          {sideBarLinks.map((link) => (
            <Link to={link.link} key={link.name} className={`border-2 p-3 w-[200px] rounded-lg cursor-pointer border-gray-300 hover:bg-blue-400 hover:text-white hover:border-none ${isActiveRoute(link.link) ? 'bg-blue-700 text-white' : ''} `}>
              <p className=''>{link.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className='flex-1'>
        <Outlet />
      </div>
    </main>
  )
}

export default Layout

const sideBarLinks = [
  {
    name: "Categories",
    link: "/categories"
  },
  {
    name: "Business",
    link: "/business"
  },
  {
    name: "Person",
    link: "/persons"
  },
  {
    name: "Business Branch",
    link: "/business-branch"
  },
  {
    name: "Package",
    link: "/package"
  },
  {
    name: "Services",
    link: "/services"
  },
  {
    name: "Users",
    link: "/users"
  },
  {
    name: "Admin User",
    link: "/admin-user"
  },
  {
    name: "Appointment",
    link: "/appointment"
  },
  {
    name: "Dictionary",
    link: "/dictionary"
  },
  {
    name: "External Customers",
    link: "/external-customers"
  },
]