
<script>
  	export let data;
  </script>
  
  <style>
  
      body {
          scroll-behavior: smooth;
          width: 100vw;
      }
  
      body::-webkit-scrollbar {
          display: none;
          width: 0rem;
          overflow-x: hidden;
      }
  
      h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 2rem;
      }
  
      h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0rem;
          color: var(--batlas-white);
      }
  
      .underline {
          border-bottom: 2px solid var(--batlas-white);
      }

      .blog {
            display: flex;
            flex-direction: column;
            gap: 3rem;
      }
  
      .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: auto;
          background-color: var(--batlas-black);
          padding: 10rem 0;
          width: 100%;
          color: var(--batlas-white);
      }

      .postContent *{
          color: var(--batlas-white);
      }
  
      section {
          max-width: 800px;
          padding: 5rem 2rem;
          color: var(--batlas-white);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-content: center;
      }

      img {
        max-width: 1000px;
        margin-bottom: 3rem;
      }
  
      .narrow {
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-content: center;
          gap: 0.5rem;
      }
  
      video {
          margin-top: 2rem;
          width: 100%;
          max-width: 600px;
          border-radius: 10px;
          box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
      }
  
      .threeColumn {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 2rem;
          margin-top: 2rem;
      }
  
      .testimonial {
          padding: 2rem;
          border-radius: 1rem;
          background-color: var(--batlas-white);
          color: var(--batlas-black);
          font-size: 1.2rem;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          gap: 1rem;
      }
  
      .testimonial p {
          margin: 0;
      }
  
      .testimonialAttribute {
          font-size: 1.2rem;
          font-weight: 700;
          text-align: right;
      }
  
      .whyUseAttribute {
          font-size: 1.2rem;
          font-weight: 700;
          text-align: left;
      }
  
      .whiteButton {
          background-color: var(--batlas-white);
          color: var(--batlas-black);
          padding: 1rem 2rem;
          border-radius: 1rem;
          font-size: 1.2rem;
          font-weight: 700;
          text-decoration: none;
          margin-top: 2rem;
          transition: all 0.2s ease-in-out;
          border: none;
      }
  
      .blackButton {
          background-color: var(--batlas-black);
          border: 0.2rem solid var(--batlas-white);
          color: var(--batlas-white);
          padding: 1rem 2rem;
          border-radius: 1rem;
          font-size: 1.2rem;
          font-weight: 700;
          text-decoration: none;
          margin-top: 2rem;
          transition: all 0.2s ease-in-out;
  
      }
  
      .whiteButton:hover {
          background-color: var(--batlas-black);
          color: var(--batlas-white);
      }
  
      .blackButton:hover {
          background-color: var(--batlas-white);
          color: var(--batlas-black);
      }
  
      .tinyText {
          font-size: 0.8rem;
      }
  
      .whyUse {
          padding: 2rem;
          border-radius: 1rem;
          background-color: var(--batlas-black);
          color: var(--batlas-white);
          border: 0.2rem solid var(--batlas-white);
          font-size: 1rem;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          gap: 1rem;
      }
  
      .mapMaker {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 200px;
          max-width: 600px;
      }
  
      .mapMaker .row {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin-top: -120px;
      }

      input {
            padding: 1rem;
            border-radius: 1rem;
            border: 0.2rem solid var(--batlas-white);
            font-size: 1.2rem;
            color: var(--batlas-black);
            margin-top: 2rem;
            width: 100%;
      }

      .blogTile {
            background-color: var(--batlas-black);
            border: 0.2rem solid var(--batlas-white);
            padding: 2rem;
            border-radius: 1rem;
            text-align: left;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            height: 100%;
            gap: 0rem;
      }
  
      @media only screen and (max-width: 900px) {
  
          h1 {
              font-size: 2.4rem;
          }
  
          h2 {
              font-size: 1.8rem;
          }
  
          .threeColumn {
              grid-template-columns: 1fr;
          }
  
          .container {
              padding: 2rem;
          }
  
          section {
              padding: 2rem 0rem;
          }
      }
  
  </style>

<div class="container">
    <section>
    <div class="metaInfo narrow">
    <a href="/blog">All posts</a>
	<h1>{data.title}</h1>
	<p>{data.date} by {data.author}</p>
</div>
    <img src={data.image || "/blog/fallback.png"} alt={data.title} />
<div class="postContent narrow">
    <svelte:component this={data.content} />
</div>
</section>
</div> 