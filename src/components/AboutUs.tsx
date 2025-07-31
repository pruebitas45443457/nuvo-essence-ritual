import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  const values = [
    {
      title: "SUTILEZA",
      description: "Creemos que el lujo no necesita anunciarse. NUVÓ es elegancia que se percibe, no que se impone."
    },
    {
      title: "RITUALIDAD",
      description: "Cada fragancia es un ritual íntimo, una experiencia que se integra a la piel y a la memoria."
    },
    {
      title: "AUTENTICIDAD",
      description: "No seguimos tendencias. Creamos esencias atemporales, hechas para quienes buscan la verdad en lo simple."
    }
  ];

  return (
    <section id="nosotros" className="py-20 bg-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-primary text-4xl md:text-5xl font-bold text-primary mb-6">
            Quiénes Somos
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-secondary text-lg md:text-xl font-light text-foreground leading-relaxed mb-8">
              NUVÓ existe para resignificar el perfume como una experiencia íntima, artística y atemporal.
            </p>
            <p className="font-secondary text-base md:text-lg font-extralight text-muted-foreground leading-relaxed">
              No elegimos una fragancia solo por apariencia, sino para evocar recuerdos, conectar con lo auténtico 
              y acompañar el ritual de habitar el cuerpo.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <Card className="bg-background border-border">
            <CardContent className="p-8">
              <h3 className="font-primary text-2xl font-semibold text-primary mb-4">MISIÓN</h3>
              <p className="font-secondary text-base font-light text-foreground leading-relaxed">
                Redefinir el perfume como una obra sensorial atemporal, íntima y auténtica. 
                Crear experiencias que acompañen momentos personales, desde lo sutil y lo esencial 
                sin artificios ni excesos.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background border-border">
            <CardContent className="p-8">
              <h3 className="font-primary text-2xl font-semibold text-primary mb-4">VISIÓN</h3>
              <p className="font-secondary text-base font-light text-foreground leading-relaxed">
                Ser una casa de perfumes reconocida por su elegancia y su conexión emocional con quienes 
                eligen vivir la belleza como una experiencia auténtica. Queremos que NUVÓ sea sinónimo 
                de arte, esencia y presencia.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div>
          <h3 className="font-primary text-3xl font-semibold text-center text-primary mb-12">
            Nuestros Valores
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-background border-border hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <h4 className="font-primary text-xl font-semibold text-primary mb-4">
                    {value.title}
                  </h4>
                  <p className="font-secondary text-sm font-light text-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Brand Story */}
        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="font-secondary text-lg font-light text-foreground leading-relaxed mb-6">
              Aplicar una esencia es también un acto de presencia. Una forma sutil de decir "estoy acá", 
              de ser fiel a lo que somos y permitir que los demás lo intuyan.
            </p>
            <p className="font-primary text-xl font-medium text-primary">
              No buscamos impresionar. Buscamos conmover.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;