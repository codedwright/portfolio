# Joseph Wright's Portfolio

**Goals:** Examine situations in which I was able to solve business problems, overcome creative challenges or generate positive results despite limited resources. Included in this portfolio: experiences relevant to the prospective employer’s needs, how these projects solved business objectives, how the results from the work were measured, any quantifiable data able to be shared, and any aspects that make it especially memorable or interesting.
## Setup

 - [Install VS Code](https://code.visualstudio.com/Download) (Or Preferred Code Editor)
 - [Install NodeJS](https://nodejs.org/en/download/) (v8.11.1)
 - [Install Git](git-scm.com/download/win) (2.16.2.windows.1)
 - [Install Grunt CLI Globally](https://gruntjs.com/getting-started) `npm install -g grunt-cli`
 - Clone Repo: 
    * `ctrl/cmd + shift + P` 
    * `Git: Clone Repo` 
    * `https://github.com/codedwright/portfolio.git`
 - Install packages `npm install` and make sure packages are updated
     * `npm install -g npm-check-updates` use `ncu` to check for updates and `ncu -u` and `npm i` to update
## Automated Tasks
After making changes:
-  Watch for file saves with `grunt watch` 
    - Concatenates JavaScript and runs Compass for Sass preprocessing  
- `grunt  concat` concatenates JavaScript into portfolio.js and scripts.js
- `grunt compass` preprocesses Sass and .scss files into styles.css
1. After changes are made and files are saved stage changes to git
2. Write commit message according to [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
3. Enforce [semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning) with: `grunt bump:patch`, `grunt bump:minor`, `grunt bump:major` 
4. Deploy with `grunt deploy`