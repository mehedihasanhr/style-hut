import Navigation from "./Navigation";
import TopSubNavigation from "./TopSubNavigation";

const Layout = ({ children }) => {
   return(
    <>
      <header className="border-b border-gray-300">
        <TopSubNavigation />
        <Navigation />
      </header>
      <main className="container">
        {children}
      </main>
    </>
  )
}


export default Layout;
