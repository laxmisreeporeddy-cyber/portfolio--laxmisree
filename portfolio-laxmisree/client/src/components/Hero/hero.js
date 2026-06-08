function Hero() {
  return (
    <>
      <style>
        {`
          .hero{
            min-height:90vh;
            display:flex;
            justify-content:space-around;
            align-items:center;
            padding:50px;
            background:linear-gradient(135deg,#0f172a,#1e293b);
            color:white;
          }

          .hero-content{
            max-width:600px;
          }

          .hero-content h4{
            color:#38bdf8;
            margin-bottom:10px;
            font-size:20px;
          }

          .hero-content h1{
            font-size:60px;
            margin-bottom:10px;
          }

          .hero-content h2{
            color:#38bdf8;
            margin:15px 0;
          }

          .hero-content p{
            line-height:1.8;
            color:#cbd5e1;
            margin-bottom:20px;
          }

          .hero-buttons{
            margin-top:20px;
          }

          .hero-buttons button{
            padding:12px 25px;
            margin-right:15px;
            border:none;
            border-radius:10px;
            cursor:pointer;
            font-size:16px;
            font-weight:600;
            transition:0.3s;
          }

          .hero-buttons button:first-child{
            background:#38bdf8;
            color:black;
          }

          .hero-buttons button:last-child{
            background:transparent;
            border:2px solid #38bdf8;
            color:#38bdf8;
          }

          .hero-buttons button:hover{
            transform:translateY(-3px);
          }

          .hero-image img{
            width:320px;
            border-radius:50%;
            border:5px solid #38bdf8;
            box-shadow:0 0 25px rgba(56,189,248,0.5);
          }

          @media(max-width:768px){
            .hero{
              flex-direction:column;
              text-align:center;
              padding:30px;
            }

            .hero-content h1{
              font-size:42px;
            }

            .hero-image img{
              width:250px;
              margin-top:30px;
            }

            .hero-buttons{
              display:flex;
              justify-content:center;
              flex-wrap:wrap;
              gap:10px;
            }
          }
        `}
      </style>

      <section className="hero">

        <div className="hero-content">

          <h4>👋 Hello, I'm</h4>

          <h1>Poreddy Laxmisree</h1>

          <h2>Full-Stack Developer | AI Enthusiast</h2>

          <p>
            Creating smarter solutions for real-world challenges
            through web development, AI technologies, and innovative
            digital experiences.
          </p>

          <div className="hero-buttons">
            <button>View Projects</button>
            <a href="/Resume.pdf" download="Poreddy_Laxmisree_Resume.pdf"><button>Download Resume</button></a>
          </div>

        </div>

        <div className="hero-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />
        </div>

      </section>
    </>
  );
}

export default Hero;