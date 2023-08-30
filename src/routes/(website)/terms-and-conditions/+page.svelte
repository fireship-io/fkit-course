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
        <h1>Terms of Service</h1>
        <h2>Effective Date: August 31 2023</h2>
        <p>These Terms of Use (&quot;Terms&quot;) of Batlas and its affiliate companies (&quot;Batlas,&quot; &quot;we,&quot; &quot;us,&quot; and &quot;our&quot;) apply to all contents and information available within the domain batlas.art (the &quot;Site&quot;). You agree, on behalf of yourself, to be legally bound by these Terms when you access or use the Site.</p>
        <p>PLEASE REVIEW THESE TERMS CAREFULLY. BY USING THE SITE, YOU ACKNOWLEDGE THAT YOU ACCEPT THE TERMS SET FORTH HEREIN. IF YOU DO NOT ACCEPT SUCH TERMS, YOU MAY NOT ACCESS THE SITE.</p>
        <h2>Changes to Terms</h2>
        <p>The Effective Date of these Terms is set forth at the top of this webpage. We may change these Terms from time to time at our discretion. Changes will be posted to this webpage. We encourage you to return to this webpage frequently so that you are aware of our current Terms.</p>
        <p>Your continued use of the Site after the Effective Date constitutes your acceptance of the amended Terms. The amended Terms supersede all previous versions.</p>
        <h2>Intellectual Property</h2>
        <p>The Site, and all other information, files, documents, text, photographs, images, audio, and video which it contains and any material made available for download on the Site (collectively, the &quot;Content&quot;) are the property of us or our licensors, as applicable. The Site and Contents are protected by United States and international copyright and trademark laws. The Content may not be copied, distributed, modified, reproduced, published or used, in whole or in part, except for purposes authorized or approved in writing by us. All rights not expressly granted herein are reserved to us and our licensors.</p>
        <h2>License</h2>
        <p>Batlas grants you a revocable limited license to access and make personal use of the Site subject to these Terms. Notwithstanding anything to the contrary, Batlas reserves the right to limit, restrict or revoke this license and/or use or access to the Site in our sole and absolute discretion, for any reason or no reason. The Site and any part of it may not be reproduced, copied, framed or otherwise exploited for any purpose without the express prior written consent of Batlas.</p>
        <h2>Privacy</h2>
        <p>Please review our Privacy Policy (&quot;Privacy Policy&quot;) which also applies to your use of the Site.</p>
        <h2>Language Usage</h2>
        <p>You may not use of foul, abusive, discriminatory, offensive, sexual, or hateful language on the Site. Batlas handles each case individually and will determine the consequences of the violation on a case by case basis. Consequences could range anywhere from language deletion to account termination. If you would like to appeal one of our decisions, please send an email to support@batlas.art.</p>
        <h2>Impersonation</h2>
        <p>You may not impersonate individuals, groups, or organizations to mislead, confuse, or deceive others, nor use a fake identity in a manner that disrupts the experience of others on the Site. Batlas handles each case individually and will determine the consequences of the violation on a case by case basis. Consequences could range anywhere from a written warning to account termination or Site banning.</p>
        <h2>Links to Third Party Sites</h2>
        <p>The Site may contain links to third-party websites, or may give you access to applications, software, or products provided by third parties. Please understand that those third-party websites and products may have different terms of use and privacy policies, and that Batlas does not control and is not responsible for the content of such websites or the privacy practices of such third parties. The information collected by such third-party websites is not covered by the Privacy Policy.</p>
        <h2>Security and Restrictions</h2>
        <p>You are prohibited from violating or attempting to violate the security of the Site, including, without limitation, by (a) accessing data not intended for such user or logging onto a server or an account which the user is not authorized to access; (b) attempting to probe, scan or test the vulnerability of a system or network or to breach security or authentication measures without proper authorization; (c) accessing or using the Site or any portion thereof without authorization; or (d) introducing any viruses, Trojan horses, worms, logic bombs or other material which is malicious or technologically harmful.</p>
        <p><strong>You agree not to use the Site:</strong></p>
        <ul>
        <li>In any way that violates any applicable federal, state, local or international law or regulation;</li>
        <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Site, or which, as determined by us, may harm us or users of the Site or expose them to liability;</li>
        <li>Use the Site in any manner that could disable, overburden, damage, or impair the Site or interfere with any other party's use of the Site;</li>
        <li>Use any robot, spider or other automatic device, process or means to access the Site for any purpose, including monitoring or copying any of the material on the Site;</li>
        <li>Use any manual process to monitor or copy any of the material on the Site or for any other unauthorized purpose without our prior written consent;</li>
        <li>Use any device, software or routine that interferes with the proper working of the Site; or
        Otherwise attempt to interfere with the proper working of the Site.</li>
        </ul>
        <h2>Disclaimer and Limitation of Liability</h2>
        <p>WE DO NOT WARRANT THAT ACCESS TO OR USE OF THE WEBSITE WILL BE UNINTERRUPTED OR ERROR-FREE OR THAT DEFECTS IN THE WEBSITE WILL BE CORRECTED. THE WEBSITE IS PROVIDED BY BATLAS ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, BATLAS MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OR SECURITY OF THE WEBSITE OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED ON THE WEBSITE. EXCEPT TO THE EXTENT PROHIBITED BY APPLICABLE LAW, IN NO EVENT WILL BATLAS OR ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS OR OTHER REPRESENTATIVES BE LIABLE FOR ANY INDIRECT, SPECIAL, PUNITIVE, EXEMPLARY OR CONSEQUENTIAL LOSSES OR DAMAGES OF WHATSOEVER KIND ARISING OUT OF ACCESS TO OR USE OF THE WEBSITE, WEBSITE-RELATED SERVICES OR ANY INFORMATION, CONTENT OR MATERIALS COLLECTED BY OR INCLUDED ON THE WEBSITE.</p>
        <p>YOUR SOLE REMEDY FOR DISSATISFACTION WITH THE SITE, CONTENT, INFORMATION CONTAINED WITHIN THE SITE, ANY LINKED SITE, OR ANY PRODUCTS OR SERVICES PURCHASED THROUGH THE SITE IS TO STOP USING THE SITE AND/OR THOSE PRODUCTS OR SERVICES. TO THE EXTENT ANY ASPECTS OF THE FOREGOING LIMITATIONS OF LIABILITY ARE NOT ENFORCEABLE, OUR MAXIMUM LIABILITY TO YOU WITH RESPECT TO YOUR USE OF THIS SITE AND ANY PRODUCTS OR SERVICES PURCHASED BY YOU THROUGH THE SITE IS ONE HUNDRED DOLLARS ($100.00). THE FOREGOING LIMITATIONS APPLY EVEN IF THE REMEDIES UNDER THESE TERMS OF USE FAIL OF THEIR ESSENTIAL PURPOSE.</p>
        <p>Any claims arising in connection with your use of the Site or any products or services purchased through the Site must be brought within one (1) year of the date of the event giving rise to such action occurred.</p>
        <h2>Miscellaneous</h2>
        <p>These Terms shall be governed by the laws of the Commonwealth of Australia, and you agree to submit to the exclusive jurisdiction of the courts of New South Wales, Australia in respect of any disputes arising under or in connection with these Terms.</p>
        <p>You represent and warrant that you shall comply with all laws and regulations that apply to your access and use of the Site and any Site-related services, including, but not limited to, any applicable national laws that prohibit the export or transmission of technical data or software to certain territories or jurisdictions.</p>
        <p>We reserve the right to seek all remedies available at law and in equity for violations of these Terms, including the right to remove your account and any contents generated by you on the Site, block your access to the Site, block IP addresses.</p>
        <p>You agree to indemnify, defend and hold harmless us and our affiliates, and our respective officers, directors, employees, agents and representatives from and against all losses, expenses, damages, and costs, including reasonable attorney fees, resulting from any violation by you of these Terms or from our termination of your access to or use of the Site. Such termination will not affect either party's rights or obligations, which accrued before the termination.</p>
        <p>If any provision of these Terms is held to be unenforceable, the remaining Terms shall remain in full force and effect, and the unenforceable provision shall be replaced by an enforceable provision that comes closest to the intention underlying the unenforceable provision.</p>
        <p>No waiver by us of any term or condition set forth in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition. Our failure to insist upon or enforce strict performance of any provision of these Terms shall not be construed as a waiver of any right.</p>
        <h2>How to Contact Us</h2>
        <p>If you have any questions, comments or notices regarding these Terms, you may email us at support@batlas.art.</p>
    </div>
  </main>

  