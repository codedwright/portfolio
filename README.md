Joseph Wright's Portfolio
=========================

**Goals:** Examine situations in which I was able to solve business problems, overcome creative challenges or generate positive results despite limited resources. Included in this portfolio: experiences relevant to the prospective employer’s needs, how these projects solved business objectives, how the results from the work were measured, any quantifiable data able to be shared, and any aspects that make it especially memorable or interesting.

Table Of Contents
=================

- [Setup](#setup)
- [Automated Tasks](#automated-tasks)
- [Known Issues](#known-issues)
- [Storboard](#storyboard)
- [Database Topology](#setup)

# Setup

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

# Automated Tasks

After making changes:
-  Watch for file saves with `grunt watch` 
    - Concatenates JavaScript and runs Compass for Sass preprocessing  
- `grunt concat` concatenates JavaScript into portfolio.js and scripts.js
- `grunt compass` preprocesses Sass and .scss files into styles.css
1. After changes are made and files are saved stage changes to git
2. Write commit message according to [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
3. Enforce [semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning) with: `grunt bump:patch`, `grunt bump:minor`, `grunt bump:major` 
4. Deploy with `grunt deploy`

# Known Issues

[**Spread in object literals**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Browser_compatibility)
The Rest/Spread Properties for ECMAScript proposal (stage 4) adds spread properties to object literals.
Support is limited to Chrome v60+ (current 65) and Firefox v55+, without current support for Edge, IE, or Safari 

# Storyboard

- About
- Resume
	- Link To Google Docs Resume
- Services
- Portfolio
	- Portfolio Entries
	- Live Demo Links
		- Portfolio Page
- Blog
	- Blog Entries
		- Portfolio Post
-   Contact
	- Form To Submit Email
- Admin*
	- Portfolio
		- Create
		- Update
		- Delete
	- Blog
		- Create
		- Update
		- Delete

# Database Topology

Using MySQL database with CPanel from Bluehost.

## Tables
- portfolio
    - portfolioID
    - title
    - thumbnail
    - excerpt
    - content
    - link
    - tags
    - demo
- blog
    - blogID
    - title
    - thumbnail
    - date
    - excerpt
    - content
    - tags
    - link

<small>Written on https://stackedit.io</small>
