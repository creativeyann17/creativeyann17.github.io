# Introduction

Hello, this repository contains the source-code of my web-site [creativeyann17.github.io](https://creativeyann17.github.io/). The purpose of this web-site is to showcase some of my acquired skills and knowledge in web and software development. The following readme gives some details about of the choices done to develop it.

# Changelog

You can see the last changes here: [CHANGELOG.md](https://github.com/creativeyann17/creativeyann17.github.io/blob/main/CHANGELOG.md)

# Technologies

This project is built on the following stack:

| Technology       | Type                   | Reason of the choice                                                                                                                                                                                                                                                                                                                                         |
| ---------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GitHub           | Repository             | Most of my others projects are located here, it's free and provide a lot of features.                                                                                                                                                                                                                                                                        |
| GitHub Pages     | Server                 | At first I didn't know it was a thing! But the fact that it's well integrated, easy to use and free made me choose it instead of another provider.                                                                                                                                                                                                           |
| GitHub Actions   | Continuous integration | At first I was using a React third party library named [gh-pages](https://github.com/tschaub/gh-pages) to build and deploy in local, it worked really well, until I was in need of a real CI to define env. variables and secrets.                                                                                                                           |
| React.js         | Library                | Since I learned it for my first employment after arriving at Montreal it's difficult to imagine working with another user interfaces builder. Some really well known libraries are used too: react-router, react-redux, react-saga, react-bootstrap, prop-types, lodash, typescript and more ...                                                             |
| Bootstrap        | Library (UI/UX)        | Developing is already time consuming so I was in need of a library with a lot of components responsive-ready and some CSS helpers. I chose bootstrap because I worked with before. The react library [react-bootstrap](https://react-bootstrap.netlify.app/).                                                                                                |
| Markdown         | Styling                | One of the web-site feature is to provide a list of articles the user can read, like tutorials ... In order to avoid writing everything inside the code itself the idea is to write independent markdown files that will be retrieved from the server. The react library used to read markdown [react-markdown](https://github.com/remarkjs/react-markdown). |
| Google Analytics | Analytics              | Always nice to have some information about the visitors like the devices they used, from which country, what pages they look the most ...                                                                                                                                                                                                                    |
