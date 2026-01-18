import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler, Calendar, Heart } from "lucide-react";
import { Link } from "wouter";

interface HorseProps {
  id: string;
  name: string;
  price: string;
  currency: string;
  image: string | null;
  location: string;
  age: number;
  height: string; // "1.56 m" or "15.2 hands"
  sex: "Mare" | "Gelding" | "Stallion" | "Yegua" | "Castrado" | "Padrillo";
  type: "Venta" | "Arriendo";
  tags?: string[];
}

export function HorseCard({ horse }: { horse: HorseProps }) {
  return (
    <Link href={`/horse/${horse.id}`}>
      <Card className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-none bg-white">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {horse.image ? (
            <img
              src={horse.image}
              alt={horse.name}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">
              🐴
            </div>
          )}
          <div className="absolute top-3 right-3">
             <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white transition-colors text-white hover:text-red-500">
               <Heart className="w-4 h-4" />
             </button>
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant={horse.type === "Venta" ? "default" : "secondary"} className="uppercase tracking-wide text-[10px] font-bold">
              {horse.type}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-serif text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                {horse.name}
              </h3>
              <div className="flex items-center text-muted-foreground text-sm mt-1 gap-1">
                <MapPin className="w-3 h-3" />
                {horse.location}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/50 my-3">
            <div className="text-center">
              <span className="block text-[10px] uppercase text-muted-foreground tracking-wider">Edad</span>
              <span className="font-medium text-sm">{horse.age} años</span>
            </div>
            <div className="text-center border-l border-border/50">
              <span className="block text-[10px] uppercase text-muted-foreground tracking-wider">Alzada</span>
              <span className="font-medium text-sm">{horse.height}</span>
            </div>
            <div className="text-center border-l border-border/50">
              <span className="block text-[10px] uppercase text-muted-foreground tracking-wider">Sexo</span>
              <span className="font-medium text-sm">{horse.sex}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="px-5 pb-5 pt-0 flex justify-between items-center">
          <div className="font-serif text-lg font-bold text-primary">
            {horse.currency} {horse.price}
          </div>
          <span className="text-xs font-medium text-secondary hover:underline cursor-pointer">
            Ver detalles →
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}