function Stats() {
  return (
    <>
      <style>
        {`
          .stats{
            display:flex;
            justify-content:center;
            gap:30px;
            padding:50px;
            flex-wrap:wrap;
            background:#0f172a;
          }

          .card{
            width:220px;
            padding:25px;
            border-radius:15px;
            text-align:center;
            background:#1e293b;
            color:white;
            box-shadow:0 5px 15px rgba(0,0,0,0.3);
            transition:0.3s ease;
          }

          .card:hover{
            transform:translateY(-8px);
            box-shadow:0 10px 25px rgba(56,189,248,0.3);
          }

          .card h2{
            color:#38bdf8;
            font-size:2rem;
            margin-bottom:10px;
          }

          .card p{
            color:#cbd5e1;
            font-size:1rem;
          }

          @media(max-width:768px){
            .stats{
              padding:30px;
            }

            .card{
              width:100%;
              max-width:300px;
            }
          }
        `}
      </style>

      <section className="stats">

        <div className="card">
          <h2>90%</h2>
          <p>Academic Performance</p>
        </div>

        <div className="card">
          <h2>3+</h2>
          <p>Major Projects</p>
        </div>

        <div className="card">
          <h2>5+</h2>
          <p>Certifications</p>
        </div>

        <div className="card">
          <h2>100%</h2>
          <p>Dedication</p>
        </div>

      </section>
    </>
  );
}

export default Stats;