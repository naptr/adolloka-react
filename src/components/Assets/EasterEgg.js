import { Link } from 'react-router-dom';


const EasterEgg = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: 100+'vw', 
      height: 100+'vh'}}>
      <h1>Wah, kamu menemukanku :D. Hebat!</h1>
      <span>Kembali ke halaman<Link to="/register" style={{color: '#3A86FF'}}> Register</Link></span>
    </div>
  )
}

export default EasterEgg;