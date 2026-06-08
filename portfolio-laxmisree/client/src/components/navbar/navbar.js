import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <style>
        {`
          .navbar{
            display:flex;
            justify-content:flex-end;
            align-items:center;
            padding:20px 80px;
            background:#0f172a;
            position:sticky;
            top:0;
            z-index:1000;
          }

          .navbar ul{
            display:flex;
            list-style:none;
            gap:30px;
          }

          .navbar a{
            text-decoration:none;
            color:white;
            font-size:18px;
            transition:0.3s;
          }

          .navbar a:hover{
            color:#38bdf8;
          }

          @media(max-width:768px){
            .navbar{
              flex-direction:column;
              padding:20px;
              justify-content:center;
            }

            .navbar ul{
              margin-top:15px;
              gap:15px;
              flex-wrap:wrap;
              justify-content:center;
            }
          }
        `}
      </style>

      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
