<script>
    import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";

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
      }
  
      section {
          max-width: 1000px;
          padding: 5rem 2rem;
          color: var(--batlas-white);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-content: center;
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
            width: 100%;
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
  
  <Header />
  
  <div class="container">
      <section class="blog">
          <h1>The Batlas Blog</h1>
          <div class="narrow">
            <p>Heya, I'm Tanner the guy behind Batlas. I'm building a platform to create and play isometric adventures. Here you can read about the journey of building Batlas and what I've learned along the way.</p>
            <div class="emailSignup">
                  <input type="email" placeholder="Your email address">
                  <button class="whiteButton">Subscribe</button>
            </div>
            </div>
            {#each data.posts as post}
                    <div class="narrow blogTile">
                        <p>{post.meta.date}</p>
                        <h2>{post.meta.title}</h2>
                        <p>{post.meta.excerpt}</p>
                        <a class="whiteButton" href="/blog/{post.path}">Read more</a>
                  </div>
            {/each}
          
      </section>
      <section>
          <h1>Ready to dive into the dungeon?</h1>
          <p>Free forever.</p>
          <a href="/login" class="whiteButton">Get started</a>
      </section>
  </div>
  <Footer />
  
  