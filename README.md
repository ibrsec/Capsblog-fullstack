

<a name="readme-top"></a>
 
 
<!-- PROJECT LOGO -->
<br />
<div align="center"> 
   
  <a href="https://github.com/ibrsec/Capsblog-fullstack">
    <img src="./client/public/logo.png" alt="Logo" width="250"   >
  </a>

  <h3 align="center">Full stack Caps Blog App</h3>

  <p align="center">
    An awesome Full stack Caps Blog App
    <!-- <a href="https://github.com/ibrsec/stock-app"><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <a href="https://capsblog-fs-express-react.onrender.com/">View Demo</a>
    ·
    <a href="https://github.com/ibrsec/Capsblog-fullstack/tree/master/client">Frontend Repo</a>
    ·
    <a href="https://capsblog-fs-express-react.onrender.com/api/documents/swagger">Backend Swagger</a>
    ·
    <a href="https://capsblog-fs-express-react.onrender.com/api/documents/redoc">Backend Redoc</a>
    ·
    <a href="https://github.com/ibrsec/Capsblog-fullstack/issues">Report Bug</a>
    ·
    <a href="https://github.com/ibrsec/Capsblog-fullstack/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>📎 Table of Contents 📎 </summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
     <!-- <li><a href="#figma">Figma</a></li> -->
     <li><a href="#overview">Overview</a></li>
     <li><a href="#quick-setup">Quick Setup</a></li>
     <li><a href="#directory-structure">Directory structure</a></li>
     <li><a href="#built-with">Built With</a></li>
    <!-- <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li> -->

    
  </ol>
</details>





---
 
<!-- ABOUT THE PROJECT -->
<a name="about-the-project"></a>
## ℹ️ About The Project

[![stock-app](./client/public/project.gif)](https://capsblog-fs-express-react.onrender.com/)
---
<b>ERD:</b>
[![stock-app-erd](./erdBlogAPI.png)](https://capsblog-fs-express-react.onrender.com/)




<p align="right">(<a href="#readme-top">back to top</a>)</p>


---

<!-- ## Figma 

<a href="https://www.figma.com/file/ePyCHKsx2ODB32uLgyUEEd/bootstrap-home-page?type=design&node-id=0%3A1&mode=design&t=edDzadCB9Ev5FS1a-1">Figma Link</a>  

  <p align="right">(<a href="#readme-top">back to top</a>)</p>




--- -->
<a name="overview"></a>
## 👀 Overview

📦 A Fullstack CapsBlog App Project</br>
🏀 [Frontend Live](https://capsblog-fs-express-react.onrender.com/) || [Backend Swagger](https://capsblog-fs-express-react.onrender.com/api/documents/swagger) || [Backend Redoc](https://capsblog-fs-express-react.onrender.com/api/documents/redoc)</br></br>

<b>FRONTEND:</b> </br>

<b>🎯 React Development:</b>  Built a responsive and interactive blog interface using React.js to deliver a seamless user experience.

<b>🛠 State Management:</b>  Utilized Redux Toolkit and Persist for managing state and maintaining user sessions efficiently.

<b>🚀 React Router:</b>  Integrated React Router for smooth navigation between blog posts, categories, and user profiles.

<b>🔔 User Notifications:</b>  Implemented real-time notifications using React Toastify to inform users of actions like post creation or comments.

<b>🔍 Search Functionality:</b>  Enabled efficient search functionality for finding posts and filtering by category.

<b>📷 Image Upload:</b>  Supported profile picture and blog post image uploads for enhanced user profiles and content creation.

<b>🎨 UI Design:</b>  Designed a clean and modern UI using Tailwind CSS for responsive and consistent styling.
</br></br>
<b>BACKEND:</b></br>

<b>🎯 Express.js API:</b>  Developed a robust RESTful API with Express.js to handle blog content management, user authentication, and comments.

<b>🔒 Authentication:</b>  Implemented JWT and simple token for secure user authentication and authorization throughout the application.

<b>📄 API Documentation:</b>  Used Swagger and Redoc for comprehensive API documentation to facilitate testing and development.

<b>📊 Database Management:</b>  Utilized MongoDB and Mongoose for data modeling, storing user data, blog posts, comments, categories and emails.

<b>🛠 Middleware & Error Handling:</b>  Added custom middleware for validation, error handling, and file upload management using Multer.

<b>🖼️ File Uploads:</b>  Integrated Multer for secure handling of image uploads related to blog posts and user profiles.


----------------------------------------------------------------

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<a name="quick-setup"></a>
## 🛫 Quick Setup

```sh
# clone the project
git clone https://github.com/ibrsec/Capsblog-fullstack.git

# enter the project directory
cd Capsblog-fullstack

# install dependency
# linux
npm run setup-production
# windows
npm run setup-production-windows

# run
node index.js

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ## 🐞 Debug-->

 








<a name="directory-structure"></a>
## 📂 Directory structure 

```diff
+ Capsblog-fullstack  (folder)  
      |---client (folder)   
      |      |          
      |      |---public (folder) 
      |      |                
+     |      |---src (folder)  
      |      |     |---pages (folder)       
      |      |     |           
      |      |     |---components (folder) 
      |      |     |    
      |      |     |---app (folder) ---store.jsx            
      |      |          └---features (folder)(slices)         
      |      |     |          
      |      |     |---router (folder)         
      |      |     |          
      |      |     |---services (folder)              
      |      |     |          
      |      |     |---helper (folder)          
      |      |     |          
      |      |     |---App.js 
      |      |     |---Index.js
      |      |     └---Index.css
      |      |      
      |      |----package.json 
      |      |----tailwind.config.js 
      |      └----readme.md 
      |      
+     |---src (folder) 
      |     |---configs (folder)       
      |     |           
      |     |---controllers (folder) 
      |     |    
      |     |---errors (folder) 
      |     |    
      |     |---helpers (folder)      
      |     |          
      |     |---middlewares (folder)      
      |     |          
      |     |---models (folder)           
      |     |          
      |     └---routes (folder)  
      |   
      |----uploads (folder)    
      |----.env
      |----.gitignore
      |----index.js 
      |----package.json
      |----swaggerAutogen.js
      └----readme.md 
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a name="built-with"></a>
### 🏗️ Built With
<b>Frontend</b>
 
<!-- https://dev.to/envoy_/150-badges-for-github-pnk  search skills-->

 <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white">
 <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white&color=red"> 
 <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
 <!-- <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Vite-AB4BFE?style=for-the-badge&logo=vite&logoColor=FFC920">  -->
 <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> 
 <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"> 

 <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"> 
 <img src="https://img.shields.io/badge/Redux Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white"> 
 <img src="https://img.shields.io/badge/Redux--Persist -593D88?style=for-the-badge&logo=redux&logoColor=white"> 
 <!-- <img src="https://img.shields.io/badge/Context API-593D88?style=for-the-badge&logo=context&logoColor=white">  -->


 <img src="https://img.shields.io/badge/Axios-593D88?style=for-the-badge&logo=axios&logoColor=white"> 
 <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"> 

 <!-- <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Formik-172B4D?style=for-the-badge&logo=formik&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Yup-172B4D?style=for-the-badge&logo=yup&logoColor=white">  -->
 <img src="https://img.shields.io/badge/Toastify-45CC11?style=for-the-badge&logo=toastify-ui&logoColor=white"> 
 <img src="https://img.shields.io/badge/react_icons-black?style=for-the-badge&logo=react-icons-ui&logoColor=white"> 
 


---

<b>Backend</b>
<!-- https://dev.to/envoy_/150-badges-for-github-pnk  search skills-->

 
 <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 

 <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"> 
 <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"> 
 <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"> 
 <img src="https://img.shields.io/badge/Mongoose-4EA94B?style=for-the-badge&logo=mongoose&logoColor=white"> 
 <img src="https://img.shields.io/badge/jwt%20token-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink"> 
 <img src="https://img.shields.io/badge/Token%20authentication-000000?style=for-the-badge&logo=token&logoColor=white">  

<!-- swagger -->
 <img src="https://img.shields.io/badge/Swagger%20Autogen-4EA94B?style=for-the-badge&logo=swagger&logoColor=white"> 
 <img src="https://img.shields.io/badge/Swagger%20ui%20express-4EA94B?style=for-the-badge&logo=swagger&logoColor=white"> 
 <img src="https://img.shields.io/badge/Redoc-4EA94B?style=for-the-badge&logo=redoc&logoColor=white"> 


 <img src="https://img.shields.io/badge/Morgan-000000?style=for-the-badge&logo=morgan&logoColor=white"> 
 <img src="https://img.shields.io/badge/Express%20async%20errors-000000?style=for-the-badge&logo=expressasyncerrors&logoColor=white"> 
 <img src="https://img.shields.io/badge/dotenv-000000?style=for-the-badge&logo=dotenv&logoColor=white"> 
 <img src="https://img.shields.io/badge/cors-000000?style=for-the-badge&logo=cors&logoColor=white"> 
 

 <img src="https://img.shields.io/badge/onRender-000000?style=for-the-badge&logo=render&logoColor=white"> 
 <img src="https://img.shields.io/badge/multer-000000?style=for-the-badge&logo=multer&logoColor=white"> 
 <img src="https://img.shields.io/badge/nodemailer-000000?style=for-the-badge&logo=nodemailer&logoColor=white"> 



 
<p align="right">(<a href="#readme-top">back to top</a>)</p>


