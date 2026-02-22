const fs = require('fs');
const path = require('path');

const dir = '../src/components/public';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace colors
    content = content.replace(/teal/g, 'cyan');
    
    // Replace specific hardcoded texts
    if (file === 'HeroSection.tsx') {
      content = content.replace(/Abogados de derecho familiar en/g, 'Servicio de lavandería profesional en');
    }
    if (file === 'ServicesGrid.tsx') {
      content = content.replace(/Podemos ayudarle con sus asuntos de divorcio y derecho familiar\./g, 'Nuestros servicios de lavandería, planchado y cuidado textil.');
      content = content.replace(/No tienes que hacerlo solo/g, 'Cuidamos tu ropa');
    }
    if (file === 'AboutSection.tsx') {
      content = content.replace(/Derecho de Familia de/g, 'Servicios de Lavandería de');
      content = content.replace(/Somos una firma de\{' '\}\\n              <span className="text-cyan-600">derecho de familia<\/span>\{' '\}\\n              en/g, 'Somos una <br/><span className="text-cyan-600">lavandería moderna</span> en');
      content = content.replace(/Somos una firma de\{\' \'\}\n              <span className="text-cyan-600">derecho de familia<\/span>\{\' \'\}\n              en/, 'Somos una <span className="text-cyan-600">lavandería moderna</span> en');
    }
    if (file === 'TabbedContent.tsx') {
      content = content.replace(/Nuestro Enfoque Legal/g, 'Nuestro Enfoque de Cuidado');
      content = content.replace(/Conozca nuestras áreas de práctica/g, 'Conozca cómo tratamos sus prendas');
    }
    if (file === 'TestimonialsCarousel.tsx') {
      content = content.replace(/Casos de Éxito/g, 'Clientes Satisfechos');
      content = content.replace(/Lo que dicen nuestros clientes/g, 'Lo que dicen de nuestro servicio');
    }
    if (file === 'CTABanner.tsx') {
      content = content.replace(/¿Necesita asesoramiento legal\?/g, '¿Necesitas lavar tu ropa?');
      content = content.replace(/Nuestro equipo de abogados está listo para escuchar su caso y ofrecerle la mejor estrategia legal./g, 'Nuestro equipo está listo para recoger tus prendas y dejarlas como nuevas.');
      content = content.replace(/Agendar Consulta/g, 'Solicitar Recolección');
    }
    if (file === 'ContactSection.tsx') {
      content = content.replace(/Agendar una consulta/g, 'Programar recolección');
    }
    if (file === 'Footer.tsx') {
      // Any specific texts
    }

    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Update complete');
