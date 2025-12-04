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
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.7;
            color: #2c3e50;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem 0;
        }
        .container { max-width: 1400px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 3rem; }
        .logo { max-width: 200px; height: auto; margin-bottom: 1.5rem; filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3)); }
        .hero-section { text-align: center; margin-bottom: 4rem; }
        .hero-image { width: 100%; max-width: 1200px; height: auto; max-height: 600px; object-fit: cover; border-radius: 25px; box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4); margin-bottom: 2.5rem; }
        h1 { font-size: 4rem; font-weight: 700; margin-bottom: 1rem; color: white; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }
        .tagline { font-size: 1.5rem; color: rgba(255, 255, 255, 0.95); font-weight: 300; margin-bottom: 3rem; }
        .card { background: white; border-radius: 25px; padding: 4rem 3rem; box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3); margin-bottom: 3rem; }
        .brand-description { font-size: 1.3rem; color: #444; line-height: 2; text-align: center; max-width: 900px; margin: 0 auto 3rem; font-weight: 300; }
        .services { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 3rem; }
        .service { text-align: center; padding: 2rem; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 15px; transition: transform 0.3s ease; }
        .service:hover { transform: translateY(-8px); box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2); }
        .service-icon { font-size: 3rem; margin-bottom: 1rem; }
        .service h3 { color: #667eea; margin-bottom: 0.8rem; font-size: 1.5rem; }
        .image-section { margin: 4rem 0; }
        .image-with-text { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; margin-bottom: 4rem; background: white; border-radius: 25px; padding: 2rem; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2); }
        .image-with-text.reverse { direction: rtl; }
        .image-with-text.reverse > * { direction: ltr; }
        .image-with-text img { width: 100%; height: 400px; object-fit: cover; border-radius: 20px; box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2); }
        .image-description { padding: 2rem; }
        .image-description h3 { color: #667eea; font-size: 1.8rem; margin-bottom: 1rem; }
        .image-description p { color: #555; font-size: 1.1rem; line-height: 1.8; }
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem; }
        .gallery-item { position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2); transition: transform 0.3s ease; }
        .gallery-item:hover { transform: scale(1.05); }
        .gallery-item img { width: 100%; height: 350px; object-fit: cover; display: block; }
        .gallery-item .overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); color: white; padding: 2rem; transform: translateY(100%); transition: transform 0.3s ease; }
        .gallery-item:hover .overlay { transform: translateY(0); }
        .cta-section { text-align: center; padding: 4rem 2rem; background: white; border-radius: 25px; box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3); }
        .cta-button { display: inline-block; padding: 1.2rem 3rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 1.1rem; transition: transform 0.3s ease; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4); margin-top: 2rem; }
        .cta-button:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6); }
        @media (max-width: 968px) {
            h1 { font-size: 2.5rem; }
            .image-with-text { grid-template-columns: 1fr; }
            .image-with-text.reverse { direction: ltr; }
            .card { padding: 2.5rem 2rem; }
            .brand-description { font-size: 1.1rem; }
        }
        @media (max-width: 768px) {
            .container { padding: 1rem; }
            h1 { font-size: 2rem; }
            .logo { max-width: 150px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="/imgs/data-logo.png" alt="DadaBerry Logo" class="logo">
        </div>
        
        <div class="hero-section">
            <img src="/imgs/mainpageimage.jpeg" alt="Dada - The Creative Muse" class="hero-image">
            <h1>DadaBerry</h1>
            <p class="tagline">Where Creativity Meets Purrfection</p>
        </div>
        
        <div class="card">
            <p class="brand-description">
                Welcome to DadaBerry—a creative studio where imagination knows no bounds. 
                We specialize in crafting extraordinary visual experiences through creative design, 
                photography, digital artworks, and innovative visual storytelling. Every project 
                is an opportunity to transform ideas into captivating realities, blending artistic 
                vision with technical excellence. Whether you're looking for stunning photography, 
                bespoke designs, or unique artworks, we bring your creative vision to life with 
                passion, precision, and a touch of the unexpected.
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
        
        <div class="image-section">
            <div class="image-with-text">
                <img src="/imgs/IMG_5506.jpeg" alt="Dada - Creative Inspiration">
                <div class="image-description">
                    <h3>The Art of Observation</h3>
                    <p>Every detail matters. Through careful observation and artistic vision, we capture 
                    the essence of moments that might otherwise go unnoticed. Our photography celebrates 
                    the beauty in the everyday, transforming ordinary scenes into extraordinary visual narratives.</p>
                </div>
            </div>
            
            <div class="image-with-text reverse">
                <img src="/imgs/IMG_5580.jpeg" alt="Dada - Artistic Expression">
                <div class="image-description">
                    <h3>Creative Expression</h3>
                    <p>Art is not just what you see—it's what you feel. Our digital artworks are born from 
                    a deep understanding of color, composition, and emotion. Each piece tells a story, 
                    inviting viewers to explore new perspectives and discover hidden meanings.</p>
                </div>
            </div>
            
            <div class="image-with-text">
                <img src="/imgs/IMG_8747.jpeg" alt="Dada - Visual Storytelling">
                <div class="image-description">
                    <h3>Visual Storytelling</h3>
                    <p>Great design communicates without words. We craft visual narratives that resonate 
                    with audiences, combining aesthetic beauty with functional elegance. From brand identities 
                    to digital experiences, every project is a carefully woven story waiting to be told.</p>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h2 style="text-align: center; margin-bottom: 2rem; color: #667eea; font-size: 2.5rem;">Our Creative Gallery</h2>
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
        
        <div class="cta-section">
            <h2 style="color: #667eea; margin-bottom: 1rem; font-size: 2.5rem;">Ready to Create Something Amazing?</h2>
            <p style="color: #666; font-size: 1.2rem; margin-bottom: 2rem;">
                Let's bring your creative vision to life. Get in touch and let's start your next project.
            </p>
            <a href="#contact" class="cta-button">Start Your Project</a>
        </div>
    </div>
</body>
</html>
    `);
  }

  @Get('api/health')
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
