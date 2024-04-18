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
        margin-bottom: 3em;;
          width: 100%;
      }
  
      .exampleSubsection {
          margin-top: 0em;
      }

      .ruleSubtitle {
          margin-top: 0.5em;
          font-size: 1em;
      }

      .ruleTitle h2 {
            margin-top: 0.5em;
            font-size: 1.5em;
      }

  </style>

{#if rule.examples}
{#each rule.examples as example, i}
    <div class="exampleContainer">
        <div class="ruleTitle">
            <h2>{example.title}</h2>
        </div>
        <div class="ruleSubtitle">
            <h4>{example.subtitle}</h4>
        </div>
        <div class="exampleSubsection">
            <div class="exampleContent" id="exampleContainer{i}">
                {@html example.content}
            </div>
        </div>
    </div>
{/each}
{/if}
  