<?php 
session_start();
require "admin/db_config.php";



?>
<html>

    <head>
        <title>Malls | Media | Dynapix</title>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
        <link rel="shortcut icon" href="images/favicon.png" type="image/x-icon">
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.css" />
        <link rel="stylesheet" href="css/style.css">
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    </head>
    
    <body class="dark">
       
       <header>
           <div class="container">
               <div class="row">
                  <div class="col-12">
                      <div class="row">
                          <div class="col-5 col-lg-2">
                               <a href="index.html" class="logo"><img src="images/dynapix-logo-dark.png"></a>
                           </div>
                           <div class="col-7 col-lg-10">
                               <ul class="main-menu d-none d-lg-flex">
                                   <li><a href="index.html" class="menuitem">Home</a></li>
                                   <li><a href="about.html" class="menuitem">About Us</a></li>
                                   <li><a href="media.html" class="menuitem">Media</a></li>
                                   <li><a href="careers.html" class="menuitem">Careers</a></li>
                                   <li><a href="contact.html" class="menuitem">Contact Us</a></li>
                                   <li><a class="menuitem">Brand Stories</a></li>
                                   <span class="btn rg-btn"><i class="fas fa-phone"></i> Call Now</span>
                               </ul>
                               <div class="d-lg-none mobmenu">
                                   <span class="menuicon" data-bs-toggle="modal" data-bs-target="#mobilemenu"><i class="fas fa-bars"></i></span>
                                   <span class="btn rg-btn"><i class="fas fa-phone"></i> Call Now</span>
                               </div>
                           </div>
                      </div>
                  </div>
                   
               </div>
           </div>
       </header>
        
        
        <section class="breadcrumbs">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <a href="index.html">Home</a> > Malls
                    </div>
                </div>
            </div>
        </section>
        
        
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="selectbar">
                            <h1 class="title"><span class="headingbg">Malls</span></h1>
                            <select>
                                <option>Location</option>
                            </select>
                            <select>
                                <option>AD Options</option>
                            </select>
                            <select>
                                <option>Category</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mediawrap">
                            <a href="sarath-city-capital-mall.html" class="wrap">
                                <img src="images/category/img154.jpg">
                                <div class="content">
                                    <h2 class="title">Sarath City Capital Mall</h2>
                                    <div class="stats">
                                        <div class="wrap"><i class="fas fa-map-pin"></i> Hyderabad</div>
                                        <div class="wrap"><i class="fas fa-display"></i> 107</div>
                                    </div>
                                </div>
                            </a>
                            <a href="asian-satyam-mall.html" class="wrap">
                                <img src="images/category/img178.jpg">
                                <div class="content">
                                    <h2 class="title">Asian Satyam Mall</h2>
                                    <div class="stats">
                                        <div class="wrap"><i class="fas fa-map-pin"></i> Ameerpet</div>
                                        <div class="wrap"><i class="fas fa-display"></i> 1</div>
                                    </div>
                                </div>
                            </a>
                            <a href="ashoka-one-mall.html" class="wrap">
                                <img src="images/category/img203.jpg">
                                <div class="content">
                                    <h2 class="title">Ashoka One Mall</h2>
                                    <div class="stats">
                                        <div class="wrap"><i class="fas fa-map-pin"></i> Kukatpally</div>
                                        <div class="wrap"><i class="fas fa-display"></i> 11</div>
                                    </div>
                                </div>
                            </a>
                            <a href="aparna-neo-mall.html" class="wrap">
                                <img src="images/inventory/inv-anm-2.jpeg">
                                <div class="content">
                                    <h2 class="title">Aparna Neo Mall</h2>
                                    <div class="stats">
                                        <div class="wrap"><i class="fas fa-map-pin"></i> Hyderabad</div>
                                        <div class="wrap"><i class="fas fa-display"></i> 9</div>
                                    </div>
                                </div>
                            </a>
                            <a href="fun-city-mall.html" class="wrap">
                                <img src="images/category/img357.jpg">
                                <div class="content">
                                    <h2 class="title">Fun City Mall</h2>
                                    <div class="stats">
                                        <div class="wrap"><i class="fas fa-map-pin"></i> Lucknow</div>
                                        <div class="wrap"><i class="fas fa-display"></i> 9</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <footer>
            <div class="container">
                <div class="row">
                   <div class="col-12">
                       <div class="row">
                           <div class="col-12 col-lg-4">
                                <img src="images/logo-white.png" class="logo">
                                <p>Dynapix provides digital advertising solutions to businesses. We use the latest technology to deliver dynamic, engaging content to consumers on-the-go.</p>
                            </div>
                            <div class="col-6 col-md-4 col-lg-2">
                                <div class="title">Quick Links</div>
                                <div class="footlinks">
                                    <a href="index.html">Home</a>
                                    <a href="about.html">About Us</a>
                                    <a href="media.html">Media</a>
                                    <a href="careers.html">Careers</a>
                                    <a href="contact.html">Contact Us</a>
                                    <a>Brand Stories</a>
                                </div>
                            </div>
                            <div class="col-6 col-md-4 col-lg-2">
                                <div class="title">Policies</div>
                                <div class="footlinks">
                                    <a>Privacy Policy</a>
                                    <a>Terms & Conditions</a>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 col-lg-3">
                                <div class="title">Get in Touch</div>
                                <div class="addrwrap mb-3">
                                    <span>
                                        <strong class="d-block mb-1">Dynapix Advertising</strong>
                                        1st Floor, Modern Profound Tech Park, Sy. No. 12, Whitefield Road, Kondapur, Telangana - 500084
                                   </span>
                                </div>
                                <div class="addrwrap">
                                    <i class="fas fa-phone"></i>
                                    <span>+434 43242232</span>
                                </div>
                                <div class="addrwrap">
                                    <i class="fas fa-envelope"></i>
                                    <span>info@dynapix.com</span>
                                </div>
                            </div>
                            <div class="col-12 text-center">Copyright &copy;2024 Dynapix. <span class="d-inline-block">All Rights Reserved.</span></div>
                       </div>
                   </div>
                </div>
            </div>
        </footer>
        
        <div class="modal" id="mobilemenu" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="termsLabel">
           <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                     <div class="mobmainmenu">
                         <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close" id="btnclose"><i class="fas fa-times"></i></button>
                         <ul class="mobmenulist">
                           <li><a href="index.html" class="menuiitem">Home</a></li>
                           <li><a href="about.html" class="menuiitem">About Us</a></li>
                           <li><a href="media.html" class="menuiitem">Media</a></li>
                           <li><a href="careers.html" class="menuiitem">Careers</a></li>
                           <li><a href="contact.html" class="menuiitem">Contact Us</a></li>
                           <li><a class="menuiitem">Brand Stories</a></li>
                         </ul>
                     </div>
                  </div>
               </div>
            </div>
        </div>
        
        <script>
        
             $(document).on("click",".menuiitem", function(){
                $("#btnclose").trigger("click");
            })

        </script>
        
    </body>

</html>