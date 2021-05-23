import Nav from './Nav';
import Footer from './Footer';

export default function Main({ children }) {
  return (
    <>
      <Nav />
      <div>
        <main className='main container'>
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}
