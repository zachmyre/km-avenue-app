
import Footer from "./navigation/Footer";
import Navbar from "./navigation/Navbar";
export default function Layout({ children }) {
const styles = {
  display: "flex",
  flexDirection: "row",
  minHeight: "100vh"
};

return (
  <>
       <Navbar />
        <main style={styles}>
           <section style={{ width: "1024px" }}>{children}</section>      
        </main>
       <Footer />
  </>
);}