<script>
    import AdventureTools from './AdventureTools.svelte';
      import { screenChoice } from '$lib/dashboardState';
      import { currentAdventure } from '$lib/adventureData';
      import { activeRule } from '$lib/dashboardState';
      import { map } from '$lib/mapGen';
      $currentAdventure;
      $activeRule
      $screenChoice
  
      export let example;
  
      function stringToHTML(str) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(str, 'text/html');
          let subsectionContent = doc.body;
          console.log(subsectionContent);
  
          let subsectionContainer = document.getElementById('exampleContainer');
          console.log(subsectionContainer);
          if (subsectionContainer) {
          subsectionContainer.innerHTML = '<p></p>';
              for (let i = 0; i < subsectionContent.childNodes.length; i++) {
                  subsectionContainer?.appendChild(subsectionContent.childNodes[i].cloneNode(true));
              }
          }
      };
  
  </script>
  
  <style>
      .exampleContainer {
          padding: 1em;
      }
  
      .exampleSubsection {
          padding: 1em;
          margin-top: 2em;
      }
  </style>
  <div class="exampleContainer dungeonBorder">
      <div class="ruleTitle">
          <h2>{example.title}</h2>
      </div>
      <div class="ruleTitle">
          <h2>Hello{example.subtitle}</h2>
      </div>
      <div class="exampleSubsection">
          <div id="exampleContainer"> 
              {stringToHTML(example.content) ? stringToHTML(example.content) : ''}
          </div>
      </div>
  </div>
  