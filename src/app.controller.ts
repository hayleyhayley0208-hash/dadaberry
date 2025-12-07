import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream, existsSync } from 'fs';

@Controller()
export class AppController {
  @Get('/imgs/:filename')
  serveImage(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'imgs', filename);
    if (existsSync(filePath)) {
      const stream = createReadStream(filePath);
      if (filename.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      } else {
        res.setHeader('Content-Type', 'image/jpeg');
      }
      stream.pipe(res);
    } else {
      res.status(404).send('Image not found');
    }
  }

  @Get()
  getLandingPage(@Res() res: Response) {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DadaBerry — Creative Studio</title>
    <link rel="icon" type="image/png" href="/imgs/dadaberry- favicon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.7;
            color: #2c3e50;
            background: linear-gradient(135deg, #986DB2 0%, #7A5A8F 100%);
            min-height: 100vh;
            padding: 0;
            margin: 0;
            overflow-x: hidden;
        }
        .main-header {
            background: white;
            padding: 1rem 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
        }
        .header-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header-logo {
            height: 100px;
            width: auto;
        }
        .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
        }
        .nav-links a {
            color: #2c3e50;
            text-decoration: none;
            font-size: 1.1rem;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        .nav-links a:hover {
            color: #986DB2;
        }
        .carousel-section {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 85vh;
            margin: 0;
            overflow: hidden;
            z-index: 1;
            opacity: 1;
            transition: opacity 0.5s ease-out;
        }
        .carousel-section.fade-out {
            opacity: 0;
            pointer-events: none;
        }
        .carousel-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .carousel-wrapper {
            display: flex;
            width: 100%;
            height: 100%;
            transition: transform 0.6s ease-in-out;
        }
        .carousel-wrapper.no-transition {
            transition: none;
        }
        .carousel-slide {
            min-width: 100%;
            width: 100%;
            height: 100%;
            flex-shrink: 0;
        }
        .carousel-slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .carousel-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.8);
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.5rem;
            color: #986DB2;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 10;
        }
        .carousel-nav:hover {
            background: white;
            transform: translateY(-50%) scale(1.1);
        }
        .carousel-nav.prev {
            left: 20px;
        }
        .carousel-nav.next {
            right: 20px;
        }
        .carousel-dots {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 10;
        }
        .carousel-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            border: 2px solid white;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .carousel-dot.active {
            background: #986DB2;
            border-color: #986DB2;
        }
        .slogan-section {
            position: relative;
            background: white;
            padding: 3rem 2rem;
            text-align: center;
            width: 100%;
            z-index: 2;
            margin-top: 85vh;
            min-height: 200px;
        }
        .slogan-text {
            color: #986DB2;
            font-family: 'Poppins', sans-serif;
            font-size: 4rem;
            font-weight: 700;
            font-style: normal;
            margin: 0;
            max-width: 1200px;
            margin: 0 auto;
            line-height: 1.2;
            text-shadow: none;
        }
        .dada-image-section {
            width: 100%;
            height: 500px;
            overflow: hidden;
            position: relative;
            margin: 0;
            padding: 0;
        }
        .dada-image-section img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            margin: 0;
            padding: 0;
        }
        .container { 
            max-width: 1400px; 
            margin: 0 auto; 
            padding: 2rem; 
            position: relative;
            z-index: 2;
        }
        .hero-section { text-align: center; margin-bottom: 4rem; }
        .hero-image { width: 100%; max-width: 1200px; height: auto; max-height: 600px; object-fit: cover; border-radius: 25px; box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4); margin-bottom: 2.5rem; }
        h1 { font-size: 4rem; font-weight: 700; margin-bottom: 1rem; color: white; text-shadow: none; font-family: 'Poppins', sans-serif; }
        .tagline { font-size: 1.5rem; color: rgba(255, 255, 255, 0.95); font-weight: 300; margin-bottom: 3rem; font-family: 'Poppins', sans-serif; }
        .card { background: white; border-radius: 0; padding: 4rem 3rem; box-shadow: none; margin-bottom: 3rem; }
        .intro-card { background: white; border-radius: 0; padding: 4rem 3rem; box-shadow: none; margin-bottom: 3rem; width: 100%; max-width: 100%; }
        .gallery-card { 
            background: white; 
            border-radius: 0; 
            padding: 4rem 3rem; 
            box-shadow: none; 
            margin-bottom: 3rem; 
            width: 100%;
            position: relative;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
        }
        .brand-description { font-size: 1.3rem; color: #444; line-height: 2; text-align: center; max-width: 900px; margin: 0 auto 3rem; font-weight: 300; }
        .what-you-get-section {
            background: white;
            width: 100%;
            padding: 4rem 3rem;
            margin-bottom: 3rem;
        }
        .what-you-get-section h2 {
            font-family: 'Poppins', sans-serif;
            font-size: 2.5rem;
            font-weight: 700;
            color: #986DB2;
            text-align: center;
            margin-bottom: 3rem;
        }
        .what-you-get-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 3rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        .what-you-get-item {
            text-align: center;
        }
        .what-you-get-item h3 {
            font-family: 'Poppins', sans-serif;
            font-size: 1.5rem;
            font-weight: 600;
            color: #986DB2;
            margin-bottom: 1rem;
        }
        .what-you-get-item p {
            font-size: 1.1rem;
            color: #555;
            line-height: 1.8;
        }
        .services { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 3rem; }
        .service { text-align: center; padding: 2rem; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 15px; transition: transform 0.3s ease; }
        .service:hover { transform: translateY(-8px); box-shadow: 0 15px 40px rgba(152, 109, 178, 0.2); }
        .service-icon { font-size: 3rem; margin-bottom: 1rem; }
        .service h3 { color: #986DB2; margin-bottom: 0.8rem; font-size: 1.5rem; }
        .image-section { margin: 4rem 0; }
        .image-with-text { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; margin-bottom: 4rem; background: white; border-radius: 25px; padding: 2rem; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2); }
        .image-with-text.reverse { direction: rtl; }
        .image-with-text.reverse > * { direction: ltr; }
        .image-with-text img { width: 100%; height: 400px; object-fit: cover; border-radius: 20px; box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2); }
        .image-description { padding: 2rem; }
        .image-description h3 { color: #986DB2; font-size: 1.8rem; margin-bottom: 1rem; }
        .image-description p { color: #555; font-size: 1.1rem; line-height: 1.8; }
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem; }
        .gallery-item { position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2); transition: transform 0.3s ease; }
        .gallery-item:hover { transform: scale(1.05); }
        .gallery-item img { width: 100%; height: 350px; object-fit: cover; display: block; }
        .gallery-item .overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); color: white; padding: 2rem; transform: translateY(100%); transition: transform 0.3s ease; }
        .gallery-item:hover .overlay { transform: translateY(0); }
        .cta-section { text-align: center; padding: 4rem 2rem; background: transparent; border-radius: 0; box-shadow: none; }
        .cta-button { display: inline-block; padding: 1.2rem 3rem; background: white; color: #986DB2; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 1.1rem; transition: transform 0.3s ease; box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3); margin-top: 2rem; }
        .cta-button:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(255, 255, 255, 0.5); }
        @media (max-width: 1200px) {
            .container { max-width: 95%; }
            .carousel-section { max-width: 100%; }
            .header-container { padding: 0 1.5rem; }
            .slogan-text { font-size: 3.5rem; }
        }
        @media (max-width: 1024px) {
            .slogan-text { font-size: 3.2rem; }
            .dada-image-section { height: 450px; }
        }
        @media (max-width: 968px) {
            h1 { font-size: 2.5rem; }
            .tagline { font-size: 1.3rem; }
            .image-with-text { grid-template-columns: 1fr; gap: 2rem; }
            .image-with-text.reverse { direction: ltr; }
            .card { padding: 2.5rem 2rem; }
            .brand-description { font-size: 1.1rem; }
            .services { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
            .gallery-grid { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
            .carousel-container { height: 60vh; }
            .carousel-section { height: 60vh; }
            .slogan-section { margin-top: 60vh; padding: 2.5rem 1.5rem; }
            .slogan-text { font-size: 3.2rem; }
            .dada-image-section { height: 60vh; }
            .cta-section { padding: 3rem 1.5rem; }
            .what-you-get-section { padding: 3rem 2rem; }
            .what-you-get-section h2 { font-size: 2rem; }
            .what-you-get-grid { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
        }
        @media (max-width: 768px) {
            .container { padding: 1rem; }
            h1 { font-size: 2rem; }
            .tagline { font-size: 1.1rem; margin-bottom: 2rem; }
            .main-header { padding: 0.5rem 0; }
            .header-container { padding: 0 1rem; flex-wrap: wrap; }
            .header-logo { height: 50px; }
            .nav-links { gap: 1rem; flex-wrap: wrap; justify-content: center; }
            .nav-links a { font-size: 0.95rem; padding: 0.5rem; }
            .carousel-container { height: 50vh; }
            .carousel-section { height: 50vh; }
            .carousel-nav { width: 40px; height: 40px; font-size: 1.2rem; }
            .slogan-section { margin-top: 50vh; padding: 2rem 1rem; }
            .slogan-text { font-size: 2.8rem; line-height: 1.1; }
            .dada-image-section { height: 400px; }
            .carousel-nav.prev { left: 10px; }
            .carousel-nav.next { right: 10px; }
            .carousel-dots { bottom: 15px; }
            .carousel-dot { width: 10px; height: 10px; }
            .card { padding: 2rem 1.5rem; margin-bottom: 2rem; }
            .brand-description { font-size: 1rem; line-height: 1.6; }
            .services { grid-template-columns: 1fr; gap: 1.5rem; margin-top: 2rem; }
            .service { padding: 1.5rem; }
            .service h3 { font-size: 1.3rem; }
            .image-with-text { margin-bottom: 2rem; padding: 1.5rem; }
            .image-with-text img { height: 300px; }
            .image-description { padding: 1.5rem; }
            .image-description h3 { font-size: 1.5rem; }
            .image-description p { font-size: 1rem; }
            .gallery-grid { grid-template-columns: 1fr; gap: 1.5rem; }
            .gallery-item img { height: 300px; }
            .cta-section { padding: 2.5rem 1.5rem; }
            .cta-section h2 { font-size: 2rem; }
            .cta-button { padding: 1rem 2.5rem; font-size: 1rem; }
            .hero-section { margin-bottom: 2rem; }
            .hero-image { max-height: 400px; }
            .what-you-get-section { padding: 2.5rem 1.5rem; }
            .what-you-get-section h2 { font-size: 1.75rem; margin-bottom: 2rem; }
            .what-you-get-grid { grid-template-columns: 1fr; gap: 2rem; }
            .what-you-get-item h3 { font-size: 1.3rem; }
            .what-you-get-item p { font-size: 1rem; }
        }
        @media (max-width: 480px) {
            .container { padding: 0.75rem; }
            h1 { font-size: 1.75rem; }
            .tagline { font-size: 1rem; }
            .header-logo { height: 40px; }
            .nav-links { gap: 0.75rem; }
            .nav-links a { font-size: 0.85rem; padding: 0.4rem; }
            .carousel-container { height: 40vh; }
            .carousel-section { height: 40vh; }
            .carousel-nav { width: 35px; height: 35px; font-size: 1rem; }
            .slogan-section { margin-top: 40vh; padding: 1.5rem 1rem; }
            .slogan-text { font-size: 2.4rem; line-height: 1.1; }
            .dada-image-section { height: 300px; }
            .carousel-nav.prev { left: 5px; }
            .carousel-nav.next { right: 5px; }
            .carousel-dot { width: 8px; height: 8px; }
            .card { padding: 1.5rem 1rem; }
            .brand-description { font-size: 0.95rem; }
            .service { padding: 1.25rem; }
            .service-icon { font-size: 2.5rem; }
            .service h3 { font-size: 1.2rem; }
            .image-with-text { padding: 1rem; }
            .image-with-text img { height: 250px; }
            .image-description { padding: 1rem; }
            .image-description h3 { font-size: 1.3rem; }
            .image-description p { font-size: 0.95rem; }
            .gallery-item img { height: 250px; }
            .cta-section { padding: 2rem 1rem; }
            .cta-section h2 { font-size: 1.75rem; }
            .cta-button { padding: 0.9rem 2rem; font-size: 0.95rem; }
            .hero-section { margin-bottom: 1.5rem; }
            .hero-image { max-height: 300px; }
            .what-you-get-section { padding: 2rem 1rem; }
            .what-you-get-section h2 { font-size: 1.5rem; margin-bottom: 1.5rem; }
            .what-you-get-grid { gap: 1.5rem; }
            .what-you-get-item h3 { font-size: 1.2rem; }
            .what-you-get-item p { font-size: 0.95rem; }
        }
    </style>
    <script>
        let currentSlideIndex = 1; // Start at the real first slide (index 1, which is the first real slide)
        let wrapper, dots;
        let autoPlayInterval;
        let totalSlides = 4; // Real slides count
        let isTransitioning = false;
        
        function initCarousel() {
            wrapper = document.querySelector('.carousel-wrapper');
            dots = document.querySelectorAll('.carousel-dot');
            // Start at index 1 (first real slide, after the cloned last slide)
            currentSlideIndex = 1;
            showSlide(1, false);
            
            // Auto-play carousel
            autoPlayInterval = setInterval(() => {
                if (!isTransitioning) {
                    currentSlideIndex++;
                    showSlide(currentSlideIndex, true);
                }
            }, 5000);
        }
        
        function showSlide(index, animate = true) {
            if (!wrapper || !dots) return;
            
            // Remove no-transition class if it exists
            wrapper.classList.remove('no-transition');
            
            // Handle seamless looping - allow smooth slide to cloned slide first
            if (index > totalSlides) {
                // Smoothly slide to cloned first slide (index 5)
                const translateX = -index * 100;
                wrapper.style.transform = 'translateX(' + translateX + '%)';
                updateDots(0); // Show first dot
                
                // After transition completes, instantly jump to real first slide
                setTimeout(() => {
                    wrapper.classList.add('no-transition');
                    currentSlideIndex = 1;
                    wrapper.style.transform = 'translateX(-100%)';
                    setTimeout(() => {
                        wrapper.classList.remove('no-transition');
                    }, 50);
                }, 600); // Wait for transition to complete
                return;
            } else if (index < 1) {
                // Smoothly slide to cloned last slide (index 0)
                const translateX = -index * 100;
                wrapper.style.transform = 'translateX(' + translateX + '%)';
                updateDots(totalSlides - 1); // Show last dot
                
                // After transition completes, instantly jump to real last slide
                setTimeout(() => {
                    wrapper.classList.add('no-transition');
                    currentSlideIndex = totalSlides;
                    wrapper.style.transform = 'translateX(-' + (totalSlides * 100) + '%)';
                    setTimeout(() => {
                        wrapper.classList.remove('no-transition');
                    }, 50);
                }, 600); // Wait for transition to complete
                return;
            }
            
            // Calculate translateX based on current slide index
            // Index 0 = cloned last, Index 1-4 = real slides, Index 5 = cloned first
            const translateX = -currentSlideIndex * 100;
            wrapper.style.transform = 'translateX(' + translateX + '%)';
            
            // Update dots (map slide index to dot index: 1->0, 2->1, 3->2, 4->3)
            updateDots(currentSlideIndex - 1);
        }
        
        function updateDots(dotIndex) {
            dots.forEach((dot, i) => {
                if (i === dotIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        function changeSlide(direction) {
            if (isTransitioning) return;
            isTransitioning = true;
            currentSlideIndex += direction;
            showSlide(currentSlideIndex, true);
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }
        
        function currentSlide(index) {
            if (isTransitioning) return;
            isTransitioning = true;
            currentSlideIndex = index; // index is 1-4, which maps to slide indices 1-4
            showSlide(currentSlideIndex, true);
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }
        
        // Initialize on load
        document.addEventListener('DOMContentLoaded', initCarousel);
        
        // Scroll effect to fade out carousel
        function initScrollEffect() {
            const carouselSection = document.querySelector('.carousel-section');
            if (!carouselSection) return;
            
            let ticking = false;
            
            function handleScroll() {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const scrollY = window.scrollY || window.pageYOffset;
                        const viewportHeight = window.innerHeight;
                        const carouselHeight = viewportHeight * 0.85; // 85vh
                        const fadeStart = carouselHeight * 0.3; // Start fading at 30% of carousel height
                        const fadeEnd = carouselHeight * 0.7; // Fully faded at 70% of carousel height
                        
                        if (scrollY <= fadeStart) {
                            // Fully visible
                            carouselSection.style.opacity = '1';
                            carouselSection.classList.remove('fade-out');
                        } else if (scrollY >= fadeEnd) {
                            // Fully faded out
                            carouselSection.style.opacity = '0';
                            carouselSection.classList.add('fade-out');
                        } else {
                            // Fading transition
                            const fadeProgress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
                            const opacity = 1 - fadeProgress;
                            carouselSection.style.opacity = opacity;
                            if (opacity < 0.1) {
                                carouselSection.classList.add('fade-out');
                            } else {
                                carouselSection.classList.remove('fade-out');
                            }
                        }
                        ticking = false;
                    });
                    ticking = true;
                }
            }
            
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // Initial call
        }
        
        document.addEventListener('DOMContentLoaded', initScrollEffect);
    </script>
</head>
<body>
    <header class="main-header">
        <div class="header-container">
            <a href="/"><img src="/imgs/dadaberry-logo.png" alt="DadaBerry Logo" class="header-logo"></a>
            <nav class="nav-links">
                <a href="/">Home</a>
                <a href="/services">Services</a>
                <a href="#portfolio">Portfolio</a>
                <a href="/contact">Contact Us</a>
            </nav>
        </div>
    </header>
    
    <section class="carousel-section">
        <div class="carousel-container">
            <div class="carousel-wrapper">
                <div class="carousel-slide" data-slide="4">
                    <img src="/imgs/carousel-4.JPG" alt="Carousel Image 4">
                </div>
                <div class="carousel-slide" data-slide="1">
                    <img src="/imgs/carousel-1.jpg" alt="Carousel Image 1">
                </div>
                <div class="carousel-slide" data-slide="2">
                    <img src="/imgs/carousel-2.jpg" alt="Carousel Image 2">
                </div>
                <div class="carousel-slide" data-slide="3">
                    <img src="/imgs/carousel-3.JPG" alt="Carousel Image 3">
                </div>
                <div class="carousel-slide" data-slide="4">
                    <img src="/imgs/carousel-4.JPG" alt="Carousel Image 4">
                </div>
                <div class="carousel-slide" data-slide="1">
                    <img src="/imgs/carousel-1.jpg" alt="Carousel Image 1">
                </div>
            </div>
            <button class="carousel-nav prev" onclick="changeSlide(-1)">‹</button>
            <button class="carousel-nav next" onclick="changeSlide(1)">›</button>
            <div class="carousel-dots">
                <span class="carousel-dot active" onclick="currentSlide(1)"></span>
                <span class="carousel-dot" onclick="currentSlide(2)"></span>
                <span class="carousel-dot" onclick="currentSlide(3)"></span>
                <span class="carousel-dot" onclick="currentSlide(4)"></span>
            </div>
        </div>
    </section>
    
    <section class="slogan-section">
        <h1 class="slogan-text">"The world plays,<br>and I press the shutter."</h1>
    </section>
    
    <section class="dada-image-section">
        <img src="/imgs/dada.JPG" alt="Dada">
    </section>
    
        <div class="container">
        <div class="hero-section">
            <h1>DadaBerry</h1>
            <p class="tagline">Where Creativity Meets Purrfection</p>
        </div>
        </div>
        
        <div class="intro-card">
            <div class="container">
            <p class="brand-description">
                Welcome to Dadaberry, a small studio where photography meets gentle aesthetics.

                I capture portraits, products and the beauty hidden in everyday moments, using light, color and emotion to tell a story.

                I also work on simple graphic design such as posters, layouts and visual content that look clean, soft and pleasant to the eye.

                This is where I keep moments worth remembering and turn visuals into something warm and meaningful.
            </p>
            
            <div class="services">
                <div class="service">
                    <div class="service-icon">🎨</div>
                    <h3>Creative Design</h3>
                    <p>Bespoke visual identities and design solutions that tell your story</p>
                </div>
                <div class="service">
                    <div class="service-icon">📸</div>
                    <h3>Photography</h3>
                    <p>Capturing moments and emotions through the lens of artistic vision</p>
                </div>
                <div class="service">
                    <div class="service-icon">🖼️</div>
                    <h3>Digital Artworks</h3>
                    <p>Original digital creations that push the boundaries of visual expression</p>
                </div>
                <div class="service">
                    <div class="service-icon">✨</div>
                    <h3>Creative Solutions</h3>
                    <p>Innovative approaches to any creative challenge you can imagine</p>
                </div>
            </div>
            </div>
        </div>
        
        <div class="container">
        <div class="image-section">
            <h2 style="text-align: center; margin-bottom: 3rem; color: white; font-size: 2.5rem; font-family: 'Poppins', sans-serif; font-weight: 700;">What You'll Get at Dadaberry</h2>
            <div class="image-with-text">
                <img src="/imgs/IMG_5506.jpeg" alt="Dada - Creative Inspiration">
                <div class="image-description">
                    <h3>Beautiful, natural photography</h3>
                    <p>You will receive portraits or product photos that feel warm, authentic and visually pleasing.</p>
                </div>
            </div>
            
            <div class="image-with-text reverse">
                <img src="/imgs/IMG_5580.jpeg" alt="Dada - Artistic Expression">
                <div class="image-description">
                    <h3>Clean and simple graphic visuals</h3>
                    <p>I create posters, social media graphics and light branding materials with a neat and aesthetic layout.</p>
                </div>
            </div>
            
            <div class="image-with-text">
                <img src="/imgs/IMG_8747.jpeg" alt="Dada - Visual Storytelling">
                <div class="image-description">
                    <h3>A smooth and friendly creative experience</h3>
                    <p>From communication to retouching and final delivery, everything is handled with care so you can relax and enjoy the results.</p>
                </div>
            </div>
        </div>
        </div>
        
        <div class="gallery-card">
            <div class="container">
                <h2 style="text-align: center; margin-bottom: 2rem; color: #986DB2; font-size: 2.5rem;">Our Creative Gallery</h2>
                <div class="gallery-grid">
                    <div class="gallery-item">
                        <img src="/imgs/IMG_5578.jpeg" alt="Creative Work 1">
                        <div class="overlay">
                            <h3>Moment of Serenity</h3>
                            <p>Capturing tranquility in motion</p>
                        </div>
                    </div>
                    <div class="gallery-item">
                        <img src="/imgs/IMG_8775.jpeg" alt="Creative Work 2">
                        <div class="overlay">
                            <h3>Playful Elegance</h3>
                            <p>Where grace meets spontaneity</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="container">
        <div class="cta-section">
            <h2 style="color: white; margin-bottom: 1rem; font-size: 2.5rem;">Ready to Create Something Amazing?</h2>
            <p style="color: white; font-size: 1.2rem; margin-bottom: 2rem;">
                Let's bring your creative vision to life. Get in touch and let's start your next project.
            </p>
            <a href="/contact" class="cta-button">Start Your Project</a>
        </div>
    </div>
</body>
</html>
    `);
  }

  @Get('services')
  getServicesPage(@Res() res: Response) {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Services — DadaBerry</title>
    <link rel="icon" type="image/png" href="/imgs/dadaberry- favicon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Poppins', sans-serif;
            background: #2a2a2a;
            color: white;
            min-height: 100vh;
            overflow-x: hidden;
        }
        .main-header {
            background: white;
            padding: 1rem 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
        }
        .header-line {
            position: fixed;
            top: 120px;
            left: 0;
            width: 100%;
            height: 3px;
            background: #986DB2;
            z-index: 999;
        }
        .header-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header-logo {
            height: 100px;
            width: auto;
        }
        .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
        }
        .nav-links a {
            color: #2c3e50;
            text-decoration: none;
            font-size: 1.1rem;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        .nav-links a:hover {
            color: #986DB2;
        }
        .services-hero-section {
            padding-top: 123px;
            padding-bottom: 4rem;
            min-height: 100vh;
            position: relative;
            background: white;
        }
        .services-hero {
            max-width: 1400px;
            margin: 0 auto;
            padding: 4rem 2rem;
            display: flex;
            align-items: center;
            gap: 4rem;
        }
        .services-hero-text {
            flex: 1;
        }
        .services-hero-title {
            font-family: 'Poppins', sans-serif;
            font-size: 5rem;
            font-weight: 700;
            color: #000000;
            margin-bottom: 2rem;
            line-height: 1.1;
        }
        .services-carousel-section {
            padding: 4rem 0;
            text-align: center;
            background: #986DB2;
        }
        .portrait-section {
            background: #986DB2;
            padding: 6rem 0;
        }
        .portrait-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            flex-direction: column;
            gap: 4rem;
        }
        .portrait-text {
            text-align: center;
        }
        .portrait-title {
            font-family: 'Poppins', sans-serif;
            font-size: 5rem;
            font-weight: 700;
            color: white;
            margin-bottom: 0;
            line-height: 1.1;
        }
        .portrait-images {
            display: flex;
            flex-direction: row;
            gap: 2rem;
            align-items: stretch;
        }
        .portrait-images img {
            flex: 1;
            width: 0;
            height: auto;
            object-fit: cover;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        .portrait-images img:hover {
            transform: scale(1.1);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
            z-index: 10;
        }
        @media (max-width: 968px) {
            .portrait-title {
                font-size: 4rem;
            }
            .portrait-images {
                flex-direction: column;
            }
            .portrait-images img {
                width: 100%;
            }
        }
        @media (max-width: 768px) {
            .portrait-title {
                font-size: 3rem;
            }
        }
        .retouching-section {
            background: #f5f5f5;
            padding: 6rem 0;
        }
        .retouching-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            flex-direction: column;
            gap: 4rem;
        }
        .retouching-text {
            text-align: center;
        }
        .retouching-title {
            font-family: 'Poppins', sans-serif;
            font-size: 5rem;
            font-weight: 700;
            color: #000000;
            margin-bottom: 0;
            line-height: 1.1;
        }
        .before-after-container {
            position: relative;
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
            cursor: col-resize;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }
        .before-after-wrapper {
            position: relative;
            width: 100%;
            padding-top: 60%;
        }
        .before-after-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            pointer-events: none;
        }
        .before-image {
            z-index: 1;
        }
        .after-image {
            z-index: 2;
            clip-path: inset(0 50% 0 0);
        }
        .before-after-slider {
            position: absolute;
            top: 0;
            left: 50%;
            width: 4px;
            height: 100%;
            background: white;
            z-index: 3;
            transform: translateX(-50%);
            cursor: col-resize;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }
        .before-after-slider::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            border: 3px solid #986DB2;
        }
        .before-after-slider::after {
            content: '◀ ▶';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #986DB2;
            font-size: 14px;
            font-weight: bold;
        }
        .before-after-labels {
            position: absolute;
            top: 20px;
            z-index: 4;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 1.2rem;
            padding: 0.5rem 1.5rem;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 25px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        .before-label {
            left: 20px;
            color: #666;
        }
        .after-label {
            right: 20px;
            color: #986DB2;
        }
        @media (max-width: 968px) {
            .retouching-title {
                font-size: 4rem;
            }
        }
        @media (max-width: 768px) {
            .retouching-title {
                font-size: 3rem;
            }
            .before-after-labels {
                font-size: 1rem;
                padding: 0.4rem 1rem;
            }
        }
        .film-section {
            background: white;
            padding: 6rem 0;
        }
        .film-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: start;
        }
        .film-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .film-title {
            font-family: 'Poppins', sans-serif;
            font-size: 5rem;
            font-weight: 700;
            color: #000000;
            margin-bottom: 2rem;
            line-height: 1.1;
        }
        .film-images {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        .film-images img {
            position: relative;
        }
        .film-images img {
            width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        .film-images img:hover {
            transform: scale(1.1);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
            z-index: 10;
        }
        @media (max-width: 968px) {
            .film-content {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
            .film-title {
                font-size: 4rem;
                text-align: center;
            }
        }
        @media (max-width: 768px) {
            .film-title {
                font-size: 3rem;
            }
        }
        .product-section {
            background: #f5f5f5;
            padding: 6rem 0;
        }
        .product-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            flex-direction: column;
            gap: 4rem;
        }
        .product-text {
            text-align: center;
        }
        .product-title {
            font-family: 'Poppins', sans-serif;
            font-size: 5rem;
            font-weight: 700;
            color: #000000;
            margin-bottom: 0;
            line-height: 1.1;
        }
        .product-images {
            display: flex;
            flex-direction: row;
            gap: 2rem;
            align-items: stretch;
        }
        .product-images img {
            position: relative;
        }
        .product-images img {
            flex: 1;
            width: 0;
            height: auto;
            object-fit: cover;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        .product-images img:hover {
            transform: scale(1.1);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
            z-index: 10;
        }
        @media (max-width: 968px) {
            .product-title {
                font-size: 4rem;
            }
            .product-images {
                flex-direction: column;
            }
            .product-images img {
                width: 100%;
            }
        }
        @media (max-width: 768px) {
            .product-title {
                font-size: 3rem;
            }
        }
        .article-section {
            background: white;
            padding: 6rem 0;
        }
        .article-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: start;
        }
        .article-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .article-title {
            font-family: 'Poppins', sans-serif;
            font-size: 5rem;
            font-weight: 700;
            color: #000000;
            margin-bottom: 2rem;
            line-height: 1.1;
        }
        .article-images {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        .article-images img {
            position: relative;
            width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        .article-images img:hover {
            transform: scale(1.1);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
            z-index: 10;
        }
        @media (max-width: 968px) {
            .article-content {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
            .article-title {
                font-size: 4rem;
                text-align: center;
            }
        }
        @media (max-width: 768px) {
            .article-title {
                font-size: 3rem;
            }
        }
        .services-cta-section {
            text-align: center;
            padding: 4rem 2rem;
            background: linear-gradient(135deg, #986DB2 0%, #7A5A8F 100%);
            border-radius: 0;
            box-shadow: none;
        }
        .services-cta-section h2 {
            color: white;
            margin-bottom: 1rem;
            font-size: 2.5rem;
            font-family: 'Poppins', sans-serif;
        }
        .services-cta-section p {
            color: white;
            font-size: 1.2rem;
            margin-bottom: 2rem;
        }
        .services-cta-button {
            display: inline-block;
            padding: 1.2rem 3rem;
            background: white;
            color: #986DB2;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: transform 0.3s ease;
            box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
            margin-top: 2rem;
            font-family: 'Poppins', sans-serif;
        }
        .services-cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(255, 255, 255, 0.5);
        }
        @media (max-width: 768px) {
            .services-cta-section {
                padding: 3rem 1.5rem;
            }
            .services-cta-section h2 {
                font-size: 2rem;
            }
            .services-cta-button {
                padding: 1rem 2.5rem;
                font-size: 1rem;
            }
        }
        .services-title {
            font-family: 'Poppins', sans-serif;
            font-size: 4rem;
            font-weight: 700;
            color: white;
            margin-bottom: 4rem;
        }
        .services-carousel-container {
            position: relative;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        .services-carousel-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            overflow: hidden;
        }
        .services-carousel-slide {
            flex: 0 0 auto;
            width: 270px;
            height: 405px;
            transition: all 0.5s ease;
            cursor: pointer;
            position: relative;
        }
        .services-carousel-slide.active {
            width: 270px;
            height: 405px;
            transform: scale(1);
        }
        .services-carousel-slide:hover {
            transform: scale(1.15);
            z-index: 10;
        }
        .services-carousel-slide.active:hover {
            transform: scale(1.15);
        }
        .services-carousel-slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
            box-shadow: none;
            transition: transform 0.3s ease;
        }
        .services-carousel-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.5rem;
            color: #2a2a2a;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 10;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        .services-carousel-nav:hover {
            transform: translateY(-50%) scale(1.1);
            background: #f0f0f0;
        }
        .services-carousel-nav.prev {
            left: 20px;
        }
        .services-carousel-nav.next {
            right: 20px;
        }
        .timeline {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            display: flex;
            justify-content: space-between;
            padding: 0 5%;
            z-index: 100;
        }
        .timeline-tick {
            width: 2px;
            height: 10px;
            background: rgba(255, 255, 255, 0.5);
        }
        @media (max-width: 968px) {
            .services-hero-title { font-size: 4rem; }
            .services-title { font-size: 3rem; }
            .services-carousel-slide { width: 225px; height: 337.5px; }
            .services-carousel-slide.active { width: 225px; height: 337.5px; }
        }
        @media (max-width: 768px) {
            .services-hero { flex-direction: column; padding: 2rem 1rem; }
            .services-hero-title { font-size: 3rem; text-align: center; }
            .services-title { font-size: 2.5rem; margin-bottom: 2rem; }
            .services-carousel-slide { width: 180px; height: 270px; }
            .services-carousel-slide.active { width: 180px; height: 270px; }
            .services-carousel-nav { width: 40px; height: 40px; font-size: 1.2rem; }
            .services-carousel-nav.prev { left: 10px; }
            .services-carousel-nav.next { right: 10px; }
        }
    </style>
    <script>
        function initBeforeAfter() {
            const container = document.getElementById('beforeAfterContainer');
            const slider = document.getElementById('slider');
            const afterImage = document.getElementById('afterImage');
            
            if (!container || !slider || !afterImage) return;
            
            let isDragging = false;
            let startX = 0;
            let currentX = 0;
            let sliderPosition = 50;
            
            function updateSlider(position) {
                sliderPosition = Math.max(0, Math.min(100, position));
                slider.style.left = sliderPosition + '%';
                const clipValue = 100 - sliderPosition;
                afterImage.style.clipPath = 'inset(0 ' + clipValue + '% 0 0)';
            }
            
            function handleStart(e) {
                isDragging = true;
                startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
                container.style.cursor = 'col-resize';
            }
            
            function handleMove(e) {
                if (!isDragging) return;
                e.preventDefault();
                currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
                const rect = container.getBoundingClientRect();
                const x = currentX - rect.left;
                const percentage = (x / rect.width) * 100;
                updateSlider(percentage);
            }
            
            function handleEnd() {
                isDragging = false;
                container.style.cursor = 'col-resize';
            }
            
            function preventDefault(e) {
                e.preventDefault();
            }
            
            slider.addEventListener('mousedown', handleStart);
            container.addEventListener('mousedown', handleStart);
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleEnd);
            
            slider.addEventListener('touchstart', handleStart, { passive: false });
            container.addEventListener('touchstart', handleStart, { passive: false });
            document.addEventListener('touchmove', handleMove, { passive: false });
            document.addEventListener('touchend', handleEnd);
            
            // Prevent image selection
            container.addEventListener('dragstart', preventDefault);
            container.addEventListener('selectstart', preventDefault);
            
            // Initialize at 50%
            updateSlider(50);
        }
        
        document.addEventListener('DOMContentLoaded', initBeforeAfter);
    </script>
</head>
<body>
    <header class="main-header">
        <div class="header-container">
            <a href="/"><img src="/imgs/dadaberry-logo.png" alt="DadaBerry Logo" class="header-logo"></a>
            <nav class="nav-links">
                <a href="/">Home</a>
                <a href="/services">Services</a>
                <a href="/#portfolio">Portfolio</a>
                <a href="/#contact">Contact Us</a>
            </nav>
        </div>
    </header>
    <div class="header-line"></div>
    
    <section class="services-hero-section">
        <div class="services-hero">
            <div class="services-hero-text">
                <h1 class="services-hero-title">Our services</h1>
            </div>
        </div>
        
        <div class="portrait-section">
            <div class="portrait-content">
                <div class="portrait-text">
                    <h2 class="portrait-title">Portrait Photography</h2>
                </div>
                <div class="portrait-images">
                    <img src="/imgs/id-1.JPG" alt="Portrait Photography 1">
                    <img src="/imgs/id-2.jpeg" alt="Portrait Photography 2">
                    <img src="/imgs/id-3.jpg" alt="Portrait Photography 3">
                </div>
            </div>
        </div>
        
        <div class="retouching-section">
            <div class="retouching-content">
                <div class="retouching-text">
                    <h2 class="retouching-title">Photo Retouching & Finishing</h2>
                </div>
                <div class="before-after-container" id="beforeAfterContainer">
                    <div class="before-after-wrapper">
                        <img src="/imgs/after.jpg" alt="After" class="before-after-image before-image">
                        <img src="/imgs/before.JPG" alt="Before" class="before-after-image after-image" id="afterImage">
                        <div class="before-after-slider" id="slider"></div>
                        <div class="before-after-labels before-label">Before</div>
                        <div class="before-after-labels after-label">After</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="film-section">
            <div class="film-content">
                <div class="film-text">
                    <h2 class="film-title">35MM FILM</h2>
                </div>
                <div class="film-images">
                    <img src="/imgs/35mm-1.jpg" alt="35mm Film 1">
                    <img src="/imgs/35mm-2.jpg" alt="35mm Film 2">
                    <img src="/imgs/35mm-3.jpg" alt="35mm Film 3">
                </div>
            </div>
        </div>
        
        <div class="product-section">
            <div class="product-content">
                <div class="product-text">
                    <h2 class="product-title">Product Photography & Visual Design</h2>
                </div>
                <div class="product-images">
                    <img src="/imgs/Product-1.JPG" alt="Product Photography 1">
                    <img src="/imgs/Product-2.JPG" alt="Product Photography 2">
                    <img src="/imgs/Product-3.JPG" alt="Product Photography 3">
                </div>
            </div>
        </div>
        
        <div class="article-section">
            <div class="article-content">
                <div class="article-text">
                    <h2 class="article-title">Article Writing<br>& Page Layout</h2>
                </div>
                <div class="article-images">
                    <img src="/imgs/content-1.jpg" alt="Article Writing 1">
                    <img src="/imgs/content-2.jpg" alt="Article Writing 2">
                    <img src="/imgs/content-3.jpg" alt="Article Writing 3">
                    <img src="/imgs/content-4.jpg" alt="Article Writing 4">
                </div>
            </div>
        </div>
        
        <div class="services-cta-section">
            <h2>Ready to Create Something Amazing?</h2>
            <p>
                Let's bring your creative vision to life. Get in touch and let's start your next project.
            </p>
            <a href="/contact" class="services-cta-button">Start Your Project</a>
        </div>
    </section>
</body>
</html>
    `);
  }

  @Get('contact')
  getContactPage(@Res() res: Response) {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us — DadaBerry</title>
    <link rel="icon" type="image/png" href="/imgs/dadaberry- favicon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Poppins', sans-serif;
            background: white;
            color: #2c3e50;
            min-height: 100vh;
            padding-top: 0;
        }
        .main-header {
            background: white;
            padding: 1rem 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
        }
        .header-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header-logo {
            height: 100px;
            width: auto;
        }
        .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
        }
        .nav-links a {
            color: #2c3e50;
            text-decoration: none;
            font-size: 1.1rem;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        .nav-links a:hover {
            color: #986DB2;
        }
        .contact-hero-section {
            padding-top: 123px;
            padding-bottom: 0;
            position: relative;
            background: white;
        }
        .contact-hero {
            max-width: 1400px;
            margin: 0 auto;
            padding: 4rem 2rem;
            display: flex;
            align-items: center;
            gap: 4rem;
        }
        .contact-hero-text {
            flex: 1;
        }
        .contact-hero-title {
            font-family: 'Poppins', sans-serif;
            font-size: 5rem;
            font-weight: 700;
            color: #000000;
            margin-bottom: 2rem;
            line-height: 1.1;
        }
        .contact-container {
            width: 100%;
            padding: 6rem 0;
            background: #986DB2;
        }
        .contact-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: stretch;
        }
        .contact-form {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
        }
        .contact-form-text {
            margin-top: 2rem;
            font-size: 1.2rem;
            color: #000000;
            line-height: 1.8;
            margin-bottom: 0;
        }
        .contact-image-section {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            height: 100%;
        }
        .contact-image-section img {
            width: 100%;
            height: auto;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .form-group {
            margin-bottom: 2rem;
        }
        .form-group label {
            display: block;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 0.5rem;
            font-size: 1rem;
        }
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-family: 'Poppins', sans-serif;
            font-size: 1rem;
            background: white;
            transition: border-color 0.3s ease;
        }
        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #986DB2;
        }
        .form-group textarea {
            min-height: 150px;
            resize: vertical;
        }
        .submit-button {
            width: 100%;
            padding: 1.2rem;
            background: #986DB2;
            color: white;
            border: none;
            border-radius: 50px;
            font-family: 'Poppins', sans-serif;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
            box-shadow: 0 8px 25px rgba(152, 109, 178, 0.4);
        }
        .submit-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(152, 109, 178, 0.6);
        }
        .submit-button:active {
            transform: translateY(-1px);
        }
        .contact-info {
            margin-top: 1rem;
        }
        .contact-info p {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            color: white;
        }
        .contact-info a {
            color: white;
            text-decoration: underline;
            font-weight: 600;
        }
        @media (max-width: 968px) {
            .contact-hero-title { font-size: 4rem; }
            .contact-content { grid-template-columns: 1fr; gap: 3rem; padding: 0 1rem; }
        }
        @media (max-width: 768px) {
            .contact-hero { flex-direction: column; padding: 2rem 1rem; }
            .contact-hero-title { font-size: 3rem; text-align: center; }
            .contact-container { padding: 2rem 0; }
            .contact-content { padding: 0 1rem; }
            .contact-form { padding: 2rem 1.5rem; }
            .header-logo { height: 50px; }
            .nav-links { gap: 1rem; }
            .nav-links a { font-size: 0.95rem; }
        }
        @media (max-width: 480px) {
            .contact-hero-title { font-size: 2.5rem; }
            .contact-form { padding: 1.5rem 1rem; }
            .header-logo { height: 40px; }
        }
    </style>
</head>
<body>
    <header class="main-header">
        <div class="header-container">
            <a href="/"><img src="/imgs/dadaberry-logo.png" alt="DadaBerry Logo" class="header-logo"></a>
            <nav class="nav-links">
                <a href="/">Home</a>
                <a href="/services">Services</a>
                <a href="/#portfolio">Portfolio</a>
                <a href="/contact">Contact Us</a>
            </nav>
        </div>
    </header>
    <div class="header-line"></div>
    
    <section class="contact-hero-section">
        <div class="contact-hero">
            <div class="contact-hero-text">
                <h1 class="contact-hero-title">Contact Us</h1>
            </div>
        </div>
    </section>
    
    <div class="contact-container">
        <div class="contact-content">
            <form class="contact-form" id="contactForm" onsubmit="handleSubmit(event)">
                <div class="form-group">
                    <label for="name">Name *</label>
                    <input type="text" id="name" name="name" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="subject">Subject</label>
                    <input type="text" id="subject" name="subject">
                </div>
                
                <div class="form-group">
                    <label for="message">Message *</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                
                <button type="submit" class="submit-button">Send Message</button>
                <p class="contact-form-text">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </form>
            
            <div class="contact-image-section">
                <img src="/imgs/contact.jpg" alt="Contact">
            </div>
        </div>
    </div>
    
    <script>
        function handleSubmit(event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            // For now, we'll just show an alert
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        }
    </script>
</body>
</html>
    `);
  }

  @Get('api/health')
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
