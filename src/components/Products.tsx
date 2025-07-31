import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import collectionImage from "@/assets/perfume-collection.jpg";

const Products = () => {
  const collections = [
    {
      name: "Esencia Minimalista",
      description: "Fragancias puras y directas que hablan desde la sutileza",
      notes: ["Bergamota", "Cedro", "Almizcle Blanco"],
      category: "Unisex",
      intensity: "Sutil"
    },
    {
      name: "Ritual Íntimo",
      description: "Para momentos de conexión personal y presencia",
      notes: ["Rosa Damascena", "Sándalo", "Vainilla"],
      category: "Femenino",
      intensity: "Moderada"
    },
    {
      name: "Elegancia Atemporal",
      description: "Sofisticación que trasciende tendencias y épocas",
      notes: ["Vetiver", "Bergamota", "Cuero"],
      category: "Masculino",
      intensity: "Intensa"
    }
  ];

  const classifications = [
    {
      type: "Por Intensidad",
      categories: ["Sutil", "Moderada", "Intensa"]
    },
    {
      type: "Por Momento",
      categories: ["Día", "Noche", "Ocasión Especial"]
    },
    {
      type: "Por Personalidad",
      categories: ["Minimalista", "Sofisticado", "Auténtico"]
    }
  ];

  return (
    <section id="productos" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-primary text-4xl md:text-5xl font-bold text-primary mb-6">
            Nuestros Productos
          </h2>
          <p className="font-secondary text-lg md:text-xl font-light text-muted-foreground max-w-3xl mx-auto">
            Cada fragancia es una obra sensorial creada para acompañar tu ritual más íntimo
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <div 
            className="h-96 bg-cover bg-center rounded-lg shadow-lg"
            style={{ backgroundImage: `url(${collectionImage})` }}
          >
            <div className="h-full bg-black/20 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="font-primary text-3xl font-bold mb-4">Colección NUVÓ</h3>
                <p className="font-secondary text-lg font-light">Esencias que hablan sin palabras</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Collections */}
        <div className="mb-16">
          <h3 className="font-primary text-3xl font-semibold text-center text-primary mb-12">
            Nuestras Colecciones
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {collections.map((product, index) => (
              <Card key={index} className="bg-subtle border-border hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="font-primary text-xl font-semibold text-primary">
                      {product.name}
                    </CardTitle>
                    <Badge variant="secondary" className="font-secondary text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="w-fit font-secondary text-xs">
                    {product.intensity}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="font-secondary text-sm text-foreground mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="font-secondary text-sm font-medium text-primary mb-2">Notas principales:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.map((note, noteIndex) => (
                        <Badge key={noteIndex} variant="outline" className="font-secondary text-xs">
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full font-secondary">
                    Conocer más
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Classifications */}
        <div className="mb-16">
          <h3 className="font-primary text-3xl font-semibold text-center text-primary mb-12">
            Clasificación de Perfumes
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {classifications.map((classification, index) => (
              <Card key={index} className="bg-background border-border">
                <CardContent className="p-6">
                  <h4 className="font-primary text-lg font-semibold text-primary mb-4">
                    {classification.type}
                  </h4>
                  <div className="space-y-2">
                    {classification.categories.map((category, catIndex) => (
                      <div key={catIndex} className="font-secondary text-sm text-foreground p-2 bg-subtle rounded">
                        {category}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Product Section */}
        <div className="text-center">
          <Card className="bg-elegant text-elegant-foreground max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="font-primary text-2xl font-semibold mb-4">
                ¿Tienes una fragancia especial?
              </h3>
              <p className="font-secondary text-base font-light mb-6">
                Nos encantaría conocer tu esencia única y considerarla para nuestra colección
              </p>
              <Button variant="secondary" className="font-secondary">
                Proponer Fragancia
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Products;