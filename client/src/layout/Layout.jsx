import TopSubNavigation from "./TopSubNavigation";

const Layout = ({ children }) => {
  return(
    <>
      <TopSubNavigation />
      <main className="container">
        {children}
      </main>
    </>
  )
}


export default Layout;
