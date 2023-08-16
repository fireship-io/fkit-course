<script>
      import { screenChoice } from '$lib/dashboardState';
      import { currentAdventure } from '$lib/adventureData';
      import { activeRule } from '$lib/dashboardState';

      $currentAdventure;
      $activeRule
      $screenChoice

      export let rule;
  
  
      function stringToHTML(str) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(str, 'text/html');
          let subsectionContent = doc.body;
          return subsectionContent;
      };

  
  </script>
  
  <style>
      .exampleContainer {
          padding: 1em;
          width: 100%;
      }
  
      .exampleSubsection {
          padding: 1em;
          margin-top: 2em;
      }
  </style>

{#if rule.examples}
{#each rule.examples as example, i}
    <div class="exampleContainer">
        <div class="ruleTitle">
            <h2>{example.title}</h2>
        </div>
        <div class="exampleSubsection">
            <div id="exampleContainer{i}">
                {@html example.content}
            </div>
        </div>
    </div>
{/each}
{/if}
  