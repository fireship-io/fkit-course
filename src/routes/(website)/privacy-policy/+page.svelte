<style>

    h1{
      text-transform: uppercase;
    }

    a:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    p {
      font-size: 1em;
    }
  
    .header {
      display:grid;
      grid-template-columns: 1fr 1fr 1fr;
      color: var(--batlas-white);
      background-color: var(--batlas-black);
      border: 0.2em solid var(--batlas-white);
      padding: 0em 1em;
      text-transform: uppercase;
      position: fixed;
      top: 0em;
      width: 100%;
    }

    .header a {
      color: var(--batlas-white);
      text-decoration: none;
      font-weight: 600;
      letter-spacing: 0.1em;;
    }

    .header a:hover{
      text-decoration: underline;
      cursor: pointer;
    }

    .header a:visited {
      color: var(--batlas-white);
      text-decoration: none;
    }

    .headerCenter {
      display: flex;
      justify-content: center;
    }

    .headerCenter img {
      width: 10rem;
      max-height: 1em;
      object-fit: cover;
      object-position: top center;
      overflow: visible;
    }

    .headerLeft {
      display: flex;
      justify-content: flex-start;
      padding: 0.5em;
      gap: 3em;
    }

    .headerRight {
      display: flex;
      justify-content: flex-end;
      padding: 0.5em;
      gap: 3em;
    }


    .batlasSection {
      display: grid;
      grid-template-columns: 1fr 1fr;
      background-color: var(--batlas-black);
      color: var(--batlas-white);
      padding: 9em 2em;
      width: 100%;
      max-width: 1240px;
      margin-left: auto;
      margin-right: auto;
    }

    
    .batlasHero {
      padding-top: 18em;
    }


    .batlasColumn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }

    .batlasColumn img {
      width: 90%;
      max-width: 40em;
      object-fit: cover;
      object-position: right center;
      overflow: visible;
    }

    .batlasColumn video {
      width: 70%;
      max-width: 40em;
      object-fit: cover;
      object-position: right center;
      overflow: visible;
    }

    .batlasColumn h1 {
      font-size: 2em;
      font-weight: 900;
      margin-bottom: 0.5em;
    }

    .batlasColumn h2 {
      font-family: 'Poppins', sans-serif;
      text-transform: uppercase;
      line-height: 1.2em;
      letter-spacing: 0.05em;
      font-size: 2.8em;
      font-weight: 800;
      margin-bottom: 0.5em;
      margin-top: 3em;
    }

    .singleColumn {
      grid-template-columns: 1fr;
    }

    .imageColumn {
      align-items: flex-end;
    }

    .CTA {
      font-size: 2em;
      border: 0.2em solid var(--batlas-white);
      padding: 1em;
      text-transform: uppercase;
    }

    .footer {
      display:grid;
      grid-template-columns: 1fr 1fr 1fr;
      color: var(--batlas-white);
      background-color: var(--batlas-black);
      border: 0.2em solid var(--batlas-white);
      padding: 0em 1em;
      text-transform: uppercase;
    }

    .footer p {
      margin: 0em;
    }

    .footerCenter {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .footerCenter img {
      width: 10rem;
      max-height: 1em;
      object-fit: cover;
      object-position: bottom center;
      overflow: visible;
    }

    .footerLeft {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      padding: 0.5em;
      gap: 3em;
    }

    .footerRight {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      padding: 0.5em;
      gap: 3em;
    }

    .underline {
      border-bottom: 0.1em solid var(--batlas-white)
    }

    .monsterGen {
      justify-content: flex-start;
      align-items: flex-start;
      padding-left: 3em;
      font-size: 3em;
      font-weight: 600;
      text-transform: uppercase;
      line-height: 1em;
    }

    .monsterGen p {
      margin: 0.3em;
    }

    .monsterGen .promptText {
      color: var(--batlas-black);
      -webkit-text-stroke: 0.01em var(--batlas-white);
    }

    .promptInvisible {
      display:none;
    }

    .promptVisible {
      display: inline;
    }

    .line {
    width: 100%;
    height: 0.3em;
    background-color: white;
    overflow: hidden;
    animation: expandLine 4s linear infinite;
    }

  @keyframes expandLine {
    0% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }

  .mapMaker {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .mapMaker .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 3.025em;
  }

    @media screen and (max-width: 1500px) {
    h2 {
      color: var(--batlas-white);
    }

  }

    @media screen and (max-width: 900px) {

      .batlasHero h2{
        font-size: 8em;
      }

      .batlasHero video {
        width: 100%;
        max-width: 100%;
      }

      p {
        font-size: 2.5em;
      }
      .batlasSection {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        padding: 12em 2em;
        max-width: 900px;
        gap: 6em;
      }

      .batlasColumn {
        align-items: flex-start;
      }

      .imageColumn {
        justify-content: center;
        align-items: center;
      }

      .mapMaker {
        padding-top: 8em;
      }

      .mapMaker .row {
        height: 6.05em;

      }

      .monsterGen {
        width: 100%;
        padding-left: 0em;
        letter-spacing: 0.1em;
        text-align: center;
      }

      .monsterGen p, .promptText {
        font-size: 1em;
        line-height: normal;
      }

      .monsterGen .promptText {
      color: var(--batlas-black);
      -webkit-text-stroke: 0.03em var(--batlas-white);
      }
    }

  </style>
  
  <svelte:head>
    <title>Batlas - Privacy Policy</title>
    <meta name="description" content="Isometric Adventure Generator and TTRPG" />
  </svelte:head>
  

  <main class="batlasSection singleColumn">
    <div class="batlasColumn">
        <h1>Privacy Policy</h1>
        <h2>Effective Date: August 31, 2023</h2>
        <p>Batlas and its affiliate companies (&quot;Batlas,&quot; &quot;we,&quot; &quot;us&quot; or &quot;our&quot;) recognizes the importance of protecting the privacy of our online visitors. It is our intent to balance our legitimate business interests in collecting and using information received from and about you with your reasonable expectations of privacy. The following privacy policy (&quot;Privacy Policy&quot;) is the way we handle information learned about you from your visits to our website available at https://www.batlas.art (the &quot;Service&quot;).</p>
        <p>PLEASE REVIEW THIS PRIVACY POLICY CAREFULLY. When you submit information to or through the Service, you consent to the collection and processing of your information as described in this Privacy Policy. By using the Service, you accept the terms of this Privacy Policy and our Terms of Use, and consent to our collection, use, disclosure and retention of your information as described in this Privacy Policy. We, and our Service visitors, are bound by laws in the United States. IF YOU DO NOT AGREE WITH ANY PART OF THIS PRIVACY POLICY, YOU ARE NOT AUTHORIZED TO USE THE SERVICE.</p>
        <h2>Information Collected Automatically</h2>
        <p>Information about your device hardware and software is automatically collected by Batlas when you use the Service. This information may include: your IP address, browser type, domain names, access times, geographic location, referring website addresses and other technical information such as protocol status and sub-status, bytes sent and received, and server information. We may also collect information about how you interact with the Service. This information is used by Batlas for its business purposes, including for the operation and improvement of the Service, for technical troubleshooting, to maintain quality of the Service and to provide general statistics regarding use of the Service.</p>
        <p>We may use third-party advertising companies to serve ads when you use the Service. These companies may use aggregated information (not including your name, address, email address or telephone number) about your visits to this and other Web sites in order to provide advertisements about goods and services of interest to you. If you would like more information about this practice and to know your choices about not having this information used by these companies,click here.</p>
        <h2>Cookies and Other Information Collection Tools</h2>
        <p><strong>What are cookies?</strong> A cookie is a small file containing a string of characters that is sent to your computer when you visit a website or use an online service. When you visit the website or use the service again, the cookie allows that website or online service to recognize your browser or device. Cookies may store unique identifiers, user preferences and other information.</p>
        <p><strong>Why do we use them?</strong> Cookies help us improve the Service by providing us with information about which parts of the Service are most popular, enabling us to analyze technical and navigational information about the Service, and helping us to detect and prevent fraud. We also use cookies and other data collection tools (such as web beacons and server logs) to help improve your experience with the Service. For example, we use analytics services to help analyze how users use the Service. These tools use cookies to collect standard Internet log information and visitor behavior information in an anonymous form. The information generated by the cookie about your use of the Service (including IP address) is transmitted to our data collection tool service providers. This information is then used by us to evaluate visitors' use of the Service and to compile statistical reports on website activity for Batlas. We also may use third party advertisements on the Service. Some of these advertisers may use technology such as cookies and web beacons when they advertise on the Service, which will also send these advertisers (such as Google through the Google AdSense program) information including your IP address, your ISP, the browser you used to visit our site, and in some cases, whether you have Flash installed. This is generally used for geotargeting purposes or showing certain ads based on specific sites visited (such as showing cooking ads to someone who frequents cooking sites).</p>
        <p><strong>How do I control cookies?</strong> Web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to manage and delete cookies, visit www.allaboutcookies.org. Some web browsers provide settings that allow a user to reject cookies or to alert a user when a cookie is placed on the user's computer, tablet or mobile device. Most mobile devices also offer settings to reject mobile device identifiers. Although users are not required to accept cookies or mobile device identifiers, blocking or rejecting them may prevent access to some features available through the Service.</p>
        <h2>Security</h2>
        <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
        <h2>Links to External Websites</h2>
        <p>Our Service may contain links to third party websites. Any access to and use of such third party websites is not governed by this Privacy Policy, but is instead governed by the privacy policies of those third party websites, and we are not responsible for the information practices of such third party websites.</p>
        <h2>Questions</h2>
        <p>If you have any questions regarding this Privacy Policy, please contact us at support@batlas.art</p>
        <h2>Notification of Changes</h2>
        <p>Any changes to our Privacy Policy will be posted to this page so users are always aware of the information we collect and how we use it. Accordingly, please refer back to this Privacy Policy frequently as it may change.</p>
    </div>
  </main>

  