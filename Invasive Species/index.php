<!DOCTYPE html>
<html lang="en">
<head>
    <title>The Invaders: Home</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="style.css" rel="stylesheet" type="text/css">
    
    <script src="HiUser.js"></script>
    <style>
        .intro {
            text-align: left;
            margin: 0em 4em 2em 4em;
            font-family: 'Abel', serif;
        }  
        p {
            font-size: 24px;
            text-indent:30px;
        }
        h2 {
            font-size: 34px;
        }
    </style>
</head>

<body>

    <!-- Header -->
    <?php include 'header.php';?>
       

    <!-- Content -->
    <!-- Carousel -->
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner" style="height:260px">
            <div class="carousel-item active">
                <img style="height:260px" class="d-block w-100" src="./images/introCard.jpg" alt="intro">
            </div>

            <div class="carousel-item">
                <img style="height:260px" class="d-block w-100" src="./images/rabbits.jpg" alt="European Rabbit">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Common European Rabbit</h5>
                    <h6>Native to Southern Europe and North Africa</h6>
                    <h6>Introduced to every continent except Antarctica and Asia</h6>
                </div>
            </div>

            <div class="carousel-item">
                <img style="height:260px" class="d-block w-100" src="./images/honeysuckle.jpg" alt="Japanese Honeysuckle">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Japanese Honeysuckle</h5>
                    <h6>Native to Japan</h6>
                    <h6>Introduced to East United States</h6>
                </div>
            </div>
        </div>
    </div>

    <!-- Text -->
    <div class="intro">
        <br>
        <br>
        <h2 style="font-family:Coustard;">What's all this about?</h2>
        <br>
        <p>Just like you may have travelled to a foreign country, animals, plants, and bugs have too! Unlike you however, some of them 
        never went back home. These permanent visitors spread easily, sometimes hurting humans and the native plants and animals. 
        They began to thrive in the new land they arrived in, living and eating, making families. They began competing for food and 
        living space with those already living there, and they can even wipe out whole native species. An invasive is something that 
        is not naturally found in an area or region. They go by names like “exotic,” “non-native,” or “introduced species.” However, 
        even native plants, like poison ivy, can be called invasive if they invade disturbed areas or new places if climate changes.
            </p>

        <p>Find out more about invasive species but clicking on the learn section through the navigation bar at the top of page. 
            Through the learn section, you can access a printable pdf about invasive species and a printable version of the game,
            real world examples of invasive species in different parts of the world, and flashcards to help you learn important
            information about invasives.
        </p>
    
        <p>Have some fun and click on the game link in the navigation bar to play an exciting game about invasive species! Through 
            playing the game, you'll experience scenarios about how invasive species spread, can be prevented, and the cost they
            can have. Trivia questions in the game will test your knowledge about invasive species.
        </p>  
     </div>
</body>
</html>