

const title = document.querySelector('.hero-content h1');

title.addEventListener('mouseover', () => {

    title.style.textShadow =
    "0 0 10px #fff, 0 0 20px #caa24f";

});

title.addEventListener('mouseout', () => {

    title.style.textShadow = "none";

});
/* MOBILE */

@media (max-width: 768px){

    nav{
        padding:15px 20px;
        flex-direction:column;
        gap:15px;
    }

    .logo{
        width:70px;
    }

    nav ul{
        gap:15px;
        flex-wrap:wrap;
        justify-content:center;
    }

    nav a{
        font-size:14px;
    }

    .hero{

        min-height:100vh;

        background-position:center;

        padding:120px 20px 50px 20px;
    }

    .hero-content{

        margin-left:0;

        max-width:100%;

        text-align:center;
    }

    .hero-content h2{

        font-size:30px;
    }

    .hero-content h1{

        font-size:60px;

        line-height:1;
    }

    .hero-content p{

        font-size:18px;
    }

    button{

        width:100%;

        max-width:320px;
    }

}